var mapchecker = new class {
	animationspeed = 40;
	player(array) {
		const self = this;
		return new class {
			constructor(array) {
				this.array = array;
				this.index = 0;
				this.x = 0;
				this.y = 0;
				this.player = (() => {
					var doc = document.createElement("img");
					doc.src = "../Bilder/Gegner/gegner01BonusHp.png";
					doc.style.height = size;
					doc.style.width = size;
					doc.width = size;
					doc.height = size;
					doc.style.top = document.getElementById("area").offsetTop + "px";
					doc.style.left = document.getElementById("area").offsetLeft + size / 4 + "px";
					doc.style.zIndex = 4;
					doc.style.position = "absolute";
					document.body.appendChild(doc);
					return doc;
				})();
			}

			animate() {

			}
		}();
	}
	starts = [];
	movearrays = [];
	resettiles() {
		tiles.forEach(
			tile => {
				tile.showError(true);
				tile.footprints = 0;
				tile_manager.skip = false;
			}
		)
	}
	start() {
		this.starts = tile_manager.getStartpoints();
		this.movearray = [];
		this.starts.forEach(el => {
			//console.log(el)
			var move_sub_array = [];
			var maxi_loop = tiles.length + settings.Xkoordinaten * settings.Ykoordinaten;
			var current_tile = el;
			for (var i = 0; i < maxi_loop; i++) {
				move_sub_array.push(current_tile);
				current_tile = tile_manager.next_tile_coords(current_tile);
				if (current_tile == 0 || current_tile == -1) {

					//console.log("tss", move_sub_array)
					break;
				}
			}
			var maxi = 0;
			if (current_tile != -1)
				tiles.forEach(
					tile => {
						if (tile.footprints > 1) {
							if (tile.rtile == -2) {
								if (tile.footprints > 2) {
									if (tile.footprints - 1 > maxi) {
										maxi = tile.footprints - 1;
									}
								}
							} else {
								if (tile.rtile >= 13 && tile.rtile <= 16) {
									if (tile.footprints > 4)
										maxi = tile.footprints - 4;
								} else
								if (tile.footprints - 1 > maxi) {
									maxi = tile.footprints - 1;
								}
							}
						}
					}
				)
			tiles.forEach(
				tile => {
					if (tile.footprints > 1) {
						if (tile.rtile == -2) {
							if (tile.footprints > 2) {
								tile.showError(false, "red", ((2 * (tile.footprints) / maxi) ** 10) / 2.2 ** 10)
							}
						} else {

							if (tile.rtile >= 13 && tile.rtile <= 16) {
								if (tile.footprints > 4)
									tile.showError(false, "red", ((2 * (tile.footprints) / maxi) ** 10) / 2.2 ** 10)
							} else
								tile.showError(false, "red", ((2 * (tile.footprints) / maxi) ** 10) / 2.2 ** 10)
						}
					}
				}
			)
			this.movearray.push(move_sub_array);
		});

	}


}();
var tile_manager = new class {
	skip = false;
	lastdirection = [0, 0]
	lastcoord = [-1, -1];
	move_coords(coords) {
		var tile = tilebyId("" + coords[0] + "," + coords[1]);
		var tile_id = tile.rtile;
		if (tile.rtile == 9 /*Ziel Pfeil*/ || (tile_id >= 5 && tile_id <= 8) /*Start Pfeil*/ || (tile_id >= 1 && tile_id <= 4) /* Normaler Weg*/ || tile_id == -2 || (tile.rtile >= 13 && tile.rtile <= 16)) {
			if (tile.rtile == 9 /*Ziel Pfeil*/ )
				return -1; // wenn momentanes Feld Das Ziel Ist Gib -1 zurück
			if (tile.rtile == -2)
				return this.lastdirection;
			if (tile.rtile >= 13 && tile.rtile <= 16) {
				var reesuullt = 0;
				if (tile.portallink != "unset")
					reesuullt = this.get_portal(tile.portallink);
				else
				return -3;
				if(reesuullt != -4 && reesuullt != -5){
				var ressultb = reesuullt.id.split(",").map(el => {
					el = 0 - -el;
					//console.log(el);
					return el;
				});
				this.skip = true;
				var res = [];
			switch (reesuullt.rotation) { // gibt relative koordinaten zum nächsten feld zurück
				//tile.rotation gibt an in welche Richtung Das tile zeigt : 3 => rechts | 0 => unten | 1 => links | 2 => oben;
				case 0:
					res = [0, 1];
					break;
				case 1:
					res = [1, 0];
					break;
				case 2:
					res = [0, -1];
					break;
				case 3:
					res = [-1, 0];
					break;
			}
			this.lastdirection = res;
				return [ressultb[0] - coords[0], ressultb[1] - coords[1]]
			}
				else
				return reesuullt;
			}else{
			console.log(tile.rotation)
			var res = [];
			switch (tile.rotation) { // gibt relative koordinaten zum nächsten feld zurück
				//tile.rotation gibt an in welche Richtung Das tile zeigt : 3 => rechts | 0 => unten | 1 => links | 2 => oben;
				case 0:
					res = [0, 1];
					break;
				case 1:
					res = [1, 0];
					break;
				case 2:
					res = [0, -1];
					break;
				case 3:
					res = [-1, 0];
					break;
			}
			this.lastdirection = res;
			return res
		}
		} else
			return 0; // gib 0 zurück wenn Feld kein GegnerFeld ist;

	}
	next_tile(coords) {
		var res = this.move_coords(coords);
		if(this.skip){
		var movecoords = [this.lastdirection[0] + coords[0], this.lastdirection[1] + coords[1]];
			//console.log(this.move_coords(coords));
			return tilebyId("" + movecoords[0] + "," + movecoords[1]);
	}
		if (res != -1 && res != 0) {	
			var movecoords = [res[0] + coords[0], res[1] + coords[1]];
			//console.log(this.move_coords(coords));
			return tilebyId("" + movecoords[0] + "," + movecoords[1]);
		} else {
			return res;
		}
	}
	next_tile_coords(coords) {
		var ld = this.next_tile(coords);
		if (ld == 0) {
			tilebyId("" + coords[0] + "," + coords[1]).showError(false, "blue", 0.5);
			try {
				tilebyId("" + this.lastcoord[0] + "," + this.lastcoord[1]).showError(false, "orange", 0.5);
			} catch (e) {}
		}
		if (ld == -1) {
			tilebyId("" + coords[0] + "," + coords[1]).showError(false, "green", 0.5);
		}
		if (ld == 0 || ld == -1) {
			this.lastcoord = coords;
			return ld;
		} else {
			tilebyId("" + coords[0] + "," + coords[1]).showError(false, "greenyellow", 0.5);
			tilebyId("" + coords[0] + "," + coords[1]).footprints++;
			return ld.id.split(",").map(el => {
				el = 0 - -el;
				//console.log(el);
				this.lastcoord = coords;
				return el;
			});
		}
		this.lastcoord = coords;
	}
	getStartpoints() {
		//Auslesen aller Felder und dann alle Startpunkte zurückgeben
		var points = [];
		tiles.forEach(element => {
			if (element.rtile >= 5 && element.rtile <= 8)
				points.push((() => {
					return element.id.split(",").map(el => {
						el = 0 - -el;
						//console.log(el);
						return el;
					})
				})());
		});
		if (points.length > 0)
			return points;
		else
			return -2; //wenn es keine Startpunkte gibt, gebe -2 zurück
	}
	get_portal(id, message = false) {
		var result = "";
		var all = -4;
		tiles.forEach(
			tile => {
				if (tile.pid == id) {
					result = tile;
					all++;
				}
			}
		)
		if (message) {
			if (all > 1) {
				alert("es gibt mehr als zwei Portale mit der Id " + id + ", weshalb auch immer?")
				return -5;
			} else return result;
		} else
			return result;
	}
}