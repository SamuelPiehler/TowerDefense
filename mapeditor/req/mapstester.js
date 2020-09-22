var mapchecker = new class {
	animationspeed = 4000;
	animationplay = true;
	gegnerall = [];
	player(array) {
		const self = this;
		return new class {
			constructor() {
				this.animationplay = true;
				this.animationspeed = settings.animationspeed;
				if(!settings.animationspeed){
					settings.animationspeed = 40;
				}
				console.log(settings);
				this.steps = 0;
				this.array = array;
				this.index = 0;
				this.x = 0;
				this.y = 0;
				this.lastcoord = array[0];
				this.player = (() => {
					var doc = document.createElement("img");
					doc.src = "../Bilder/Gegner/gegner01BonusHp.png";
					doc.style.height = size;
					doc.style.width = size;
					doc.width = size;
					doc.height = size;
					doc.style.top = document.getElementById("allall").getBoundingClientRect().top + this.array[0][0] * size + "px";
					this.y = document.getElementById("allall").getBoundingClientRect().top + this.array[0][0] * size;
					doc.style.left = document.getElementById("allall").getBoundingClientRect().left + this.array[0][1] * size + "px";
					this.x = document.getElementById("allall").getBoundingClientRect().left + this.array[0][1] * size;
					doc.style.zIndex = 4;
					doc.style.position = "absolute";
					document.body.appendChild(doc);
					return doc;
				})();
			}
			ani = (steps, time,array)=>{
				if( this.steps < steps){
					this.y = this.y - ((array[0] / steps) * size) ;
					this.player.style.top = this.y + "px";
					this.x = this.x - ((array[1] / steps) * size) ;
					this.player.style.left = this.x + "px";
					this.steps++;
					setTimeout(this.ani.bind(null,steps,time,array), time / steps);
				}
				else{
					console.log(this.y);
					this.steps = 0;
			this.animate();
		}

			}
			animate = () => {
				if(this.animationplay){
					if(this.index < this.array.length){
						var movement = [ this.lastcoord[0] - array[this.index][0],this.lastcoord[1] - array[this.index][1]];
						console.log(movement,array[this.index]);
						this.lastcoord = array[this.index];
						if(!settings.steps)
						settings.steps = 20;
						this.ani(settings.steps,this.animationspeed,movement);
						this.index++;
					}else{
						this.index = 0;
						this.animationplay = false;
			this.animate();
		}
				}else{
					this.animationplay = true;
				}
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
	ma() {
		this.resettiles();
		this.starts = tile_manager.getStartpoints();
		this.movearrays = [];
		this.starts.forEach(el => {
			//console.log(el)
			tiles.forEach(
			tile => {
				tile.footprints = 0;
			}
			)
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
			this.movearrays.push(move_sub_array);
		});
		return this.movearrays;
	}
	start(){
		var all = this.ma();
		this.gegnerall.forEach(gegner=> {
			gegner.player.remove();
		});
		this.gegnerall = [];
		all.forEach(arr =>{
			var gegner = this.player(arr);
			this.gegnerall.push(gegner);
		});
		this.gegnerall.forEach(gegner =>{
			gegner.animate();
		})
	}

}();
var tile_manager = new class {
	next_override = false;
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
			if (tile.rtile >= 13 && tile.rtile <= 16) {// Wenn portal
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
			this.next_override = res;
				return [ressultb[0] - coords[0], ressultb[1] - coords[1]];
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
		if(!this.next_override)
		var res = this.move_coords(coords);
		
		if(this.skip){
		var movecoords = [res[0] + coords[0], res[1] + coords[1]];
		console.log( movecoords)
			this.skip = false;
			//console.log(this.move_coords(coords));
			return tilebyId("" + movecoords[0] + "," + movecoords[1]);
	}else
		if(this.next_override){
		var movecoords = [this.next_override[0] + coords[0], this.next_override[1] + coords[1]];
			this.next_override = false;
		return tilebyId("" + movecoords[0] + "," + movecoords[1]);
		}
			else
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
var loadme = new class{
	array =[];
	add(func, time = 0){
		this.array.push([func, time]);
	}
};
window.onload = (event) =>{
	loadme.array.forEach( func=> {
		setTimeout(func[0].bind(null,event), func[1]);
	});
}
var gegner = null;
//loadme.add(() => {gegner = mapchecker.player(mapchecker.start()[0]);},10);