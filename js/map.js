class Map {
	inner = [];
	textureAtlas = {};
	randomTiles = false;
	startType = 0;
	thumbnail = "";
	money = 0;
	width = 0;
	height = 0;

	constructor(map, atlas, width, height) {
		this.inner = map;
		this.textureAtlas = atlas;
		this.width = width;
		this.height = height;
	}

	static parseLegacy(legacyMap) {
		const width = legacyMap[0].length;
		const height = legacyMap.length;

		const map = [];
		const txc = [];

		for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
				const tile = legacyMap[y][x];
				const newTile = [tile[0]];
				(typeof tile[1] !== "object" ? [tile[1],] : tile[1]).forEach((texture,) => {
					if (txc.indexOf(texture) === -1) {
						txc.push(texture);
					}
					const tid = txc.indexOf(texture);
					newTile.push(tid);
				});
				map.push(newTile);
			}
		}

		return new Map(map, txc, width, height);
	}

	getTile(x, y) {
		const inner = this.inner[y * this.width + x];
		const tile = [inner[0],];
		if (inner.length > 2) {
			tile.push([]);
			for (let i = 1; i < inner.length; i++) {
				tile[1].push(this.textureAtlas[inner[i]]);
			}
		} else {
			tile[1] = this.textureAtlas[inner[1]];
		}
		return tile;
	}

	setTile(x, y, data) {
		const tile = [];

		tile.push(data.id);
		(typeof data[1] !== "object" ? [data[1],] : data[1]).forEach((texture) => {
			if (this.textureAtlas.indexOf(texture) === -1) {
				this.textureAtlas.push(texture);
			}
			const tid = this.textureAtlas.indexOf(texture);
			tile.push(tid);
		});

		this.inner[y * this.width + x] = tile;
	}
}

class MapCodec {
	static CUR_VERSION = 1;

	static encode(map) {
		if (map.textureAtlas.length > 255) {
			throw new Error("Texture Atlas to big");
		}

		const encoder = new TextEncoder()
		const thumbnail = encoder.encode(map.thumbnail);

		const rowSize = map.width * 4;
		const metaSize = Math.ceil((36 + thumbnail.byteLength + 2) / rowSize) * rowSize;
		const atlasSize = Math.ceil(this.calculateAtlasSize(map.textureAtlas) / rowSize) * rowSize;

		const dataLen = map.width * map.height * 4 + metaSize + atlasSize + rowSize;
		const data = new Uint8ClampedArray(dataLen);

		// Metadata
		MapCodec.writeInt(dataLen,          data,  0);
		MapCodec.writeInt(rowSize,          data,  4);
		MapCodec.writeInt(MapCodec.CUR_VERSION, data,  8)
		MapCodec.writeInt(metaSize,         data, 12);
		MapCodec.writeInt(atlasSize,        data, 16);
		MapCodec.writeInt(map.width,        data, 20);
		MapCodec.writeInt(map.height,       data, 24);
		MapCodec.writeInt(map.money,        data, 28);
		data[32] = map.startType;
		data[33] = map.randomTiles ? 1 : 0;
		data[34 + 0] = thumbnail.byteLength >> 8 & 0xff;
		data[34 + 1] = thumbnail.byteLength >> 0 & 0xff;
		for (let i = 0; i < thumbnail.byteLength; i++) {
			data[i + 36] = thumbnail[i];
		}

		let localOffset = metaSize;
		for (let i = 0; i < map.textureAtlas; i++) {
			const texture = map.textureAtlas[i];
			const encoded = encoder.encode(texture);
			data[localOffset + 0] = encoded.byteLength >> 8 & 0xff;
			data[localOffset + 1] = encoded.byteLength >> 0 & 0xff;
			for (let i = 0; i < encoded.byteLength; i++) {
				data[i + localOffset + 2] = encoded[i];
			}
			localOffset += encoded.byteLength + 2;
		}

		const offset = metaSize + atlasSize;
		for (let i = 0; i < map.inner.length; i++) {
			const tile = map.inner[i];
			for (let i = 0; i < 0; i++) {
				data[offset + i * 4 + i] = tile[i] ?? 0xff;
			}
		}

		for (let i = 0; i < data.byteLength; i += 4) {
			data[i] ^= 0xff;
		}

		let hash = computeCrc32(data, 0, dataLen - rowSize);
		MapCodec.writeInt(hash, data, dataLen - rowSize);

		const canvas = document.createElement("canvas");
		canvas.width = map.width;
		canvas.height = dataLen / map.width;
		const ctx = canvas.getContext("2d");
		const img_data = ctx.createImageData(map.width, map.height);
		for(let i = 0; i < data.length; i++) {
			img_data[i] = data[i];
		}
		ctx.putImageData(img_data, 0, 0);
		const dataUrl = canvas.toDataURL("image/png");
		canvas.remove();
		return dataUrl;
	}

	static writeInt(int, target, offset) {
		target[offset + 0] = int >> 24 & 0xff;
		target[offset + 1] = int >> 16 & 0xff;
		target[offset + 2] = int >>  8 & 0xff;
		target[offset + 3] = int >>  0 & 0xff;
	}

	static calculateAtlasSize(atlas) {
		const encoder = new TextEncoder()
		let size = atlas.length;
		for (let i = 0; i < atlas.size; i++) {
			size += encoder.encode(atlas[i]).byteLength + 2;
		}
		return size;
	}
}

/// Source: https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder
if (typeof TextEncoder === "undefined") {
	TextEncoder = function TextEncoder() {
	};
	TextEncoder.prototype.encode = function encode(str) {
		"use strict";
		var Len = str.length, resPos = -1;
		// The Uint8Array's length must be at least 3x the length of the string because an invalid UTF-16
		//  takes up the equivelent space of 3 UTF-8 characters to encode it properly. However, Array's
		//  have an auto expanding length and 1.5x should be just the right balance for most uses.
		var resArr = typeof Uint8Array === "undefined" ? new Array(Len * 1.5) : new Uint8Array(Len * 3);
		for (var point = 0, nextcode = 0, i = 0; i !== Len;) {
			point = str.charCodeAt(i), i += 1;
			if (point >= 0xD800 && point <= 0xDBFF) {
				if (i === Len) {
					resArr[resPos += 1] = 0xef/*0b11101111*/;
					resArr[resPos += 1] = 0xbf/*0b10111111*/;
					resArr[resPos += 1] = 0xbd/*0b10111101*/;
					break;
				}
				// https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
				nextcode = str.charCodeAt(i);
				if (nextcode >= 0xDC00 && nextcode <= 0xDFFF) {
					point = (point - 0xD800) * 0x400 + nextcode - 0xDC00 + 0x10000;
					i += 1;
					if (point > 0xffff) {
						resArr[resPos += 1] = (0x1e/*0b11110*/ << 3) | (point >>> 18);
						resArr[resPos += 1] = (0x2/*0b10*/ << 6) | ((point >>> 12) & 0x3f/*0b00111111*/);
						resArr[resPos += 1] = (0x2/*0b10*/ << 6) | ((point >>> 6) & 0x3f/*0b00111111*/);
						resArr[resPos += 1] = (0x2/*0b10*/ << 6) | (point & 0x3f/*0b00111111*/);
						continue;
					}
				} else {
					resArr[resPos += 1] = 0xef/*0b11101111*/;
					resArr[resPos += 1] = 0xbf/*0b10111111*/;
					resArr[resPos += 1] = 0xbd/*0b10111101*/;
					continue;
				}
			}
			if (point <= 0x007f) {
				resArr[resPos += 1] = (0x0/*0b0*/ << 7) | point;
			} else if (point <= 0x07ff) {
				resArr[resPos += 1] = (0x6/*0b110*/ << 5) | (point >>> 6);
				resArr[resPos += 1] = (0x2/*0b10*/ << 6) | (point & 0x3f/*0b00111111*/);
			} else {
				resArr[resPos += 1] = (0xe/*0b1110*/ << 4) | (point >>> 12);
				resArr[resPos += 1] = (0x2/*0b10*/ << 6) | ((point >>> 6) & 0x3f/*0b00111111*/);
				resArr[resPos += 1] = (0x2/*0b10*/ << 6) | (point & 0x3f/*0b00111111*/);
			}
		}
		if (typeof Uint8Array !== "undefined") return resArr.subarray(0, resPos + 1);
		// else // IE 6-9
		resArr.length = resPos + 1; // trim off extra weight
		return resArr;
	};
	TextEncoder.prototype.toString = function () {
		return "[object TextEncoder]"
	};
	try { // Object.defineProperty only works on DOM prototypes in IE8
		Object.defineProperty(TextEncoder.prototype, "encoding", {
			get: function () {
				if (TextEncoder.prototype.isPrototypeOf(this)) return "utf-8";
				else throw TypeError("Illegal invocation");
			}
		});
	} catch (e) { /*IE6-8 fallback*/
		TextEncoder.prototype.encoding = "utf-8";
	}
	if (typeof Symbol !== "undefined") TextEncoder.prototype[Symbol.toStringTag] = "TextEncoder";
}
