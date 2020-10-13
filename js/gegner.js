//Konstructor für objekt vom typ gegner
function Gegner(id, typ, localLebenMult) {
	var spawnZeit = new Date();
	this.letztesFeuer = roundTime; //wann wurde der gegener das letzte mal von feuerschadentick getroffen
	this.letztesGift = roundTime; //wann wurde der gegener das letzte mal von giftschadentick getroffen
	this.letzterEffeckt = []; //wann hat der Gegner das letzte mal seinen effekt genutzt
	this.id = id; //nummer in gegner array
	this.typ = typ;
	this.leben = gegnertypen[typ][1] * localLebenMult;
	this.maxHP = this.leben;
	this.lebenMult = localLebenMult;
	this.imunität = copyObj(gegnertypen[typ][3]); //welche immunitäten/effeckte hat der gegner in array  (.copyObj wird hier benötigt um nicht eine verküpfung des arrays zu erstellen sondern eine unabhängige kopie)
	this.imunitätStärke = copyObj(gegnertypen[typ][4]); //wie stark sind die immunitäten
	for (var i = 0; i < this.imunität.length; i++) {
		this.letzterEffeckt[i] = roundTime - this.imunitätStärke[i][0];
		if (this.imunität[i] == 12) {
			this.shieldAmount = this.imunitätStärke[i][0] * this.leben / 100;
		}
	}
	this.effektTyp = []; //welche efeckte betreffen den gegner momentan (hier wird slow gift feuer und stunn abgespeichert)
	this.effektStaerke = []; //wie stark ist der jeweilige effeckt
	this.effektStart = []; //wann wurde der effekt erzeugt
	this.effektZeit = []; //wie lang gilt der effeckt
	this.effektUrsprung = []; //welcher turm hat den effeckt erzeugt (für dmg dealed anzeige)
	this.permaEffektStaerke = [0]; //wie stark ist der jeweilige dauerhafteEffeckt (index 0 = permaslow)
	this.shieldedFrom = [];
	this.strecke = 0; // wie weit hat sich der gegner auf der map bewegt (für überprüfung welcher der weiteste gegner ist)
	if (multiStartTyp == 2) {
		var spawnPoint = Math.floor(Math.random() * start[0].length);
		this.mapx = start[1][spawnPoint]; //koordinatendes momentanen mapfeldes spalte und zeile
		this.mapy = start[0][spawnPoint];
	}
	else {
		this.mapx = start[1][spawnPointNumber]; //koordinatendes momentanen mapfeldes spalte und zeile
		this.mapy = start[0][spawnPointNumber];
	}
	this.posx = this.mapx * size; //koordinaten des gegners
	this.posy = this.mapy * size; //koordinaten des gegners
	this.wert = gegnertypen[typ][5]; //wie viel geld ist der gegner on kill wert
	this.bewegt = 0; //wie weit hat sich der gegner auf dem mapfeld schon bewegt zur überprüfung wann der gegner ein neues mapfeld erreicht hat
	this.baseSpeed = gegnertypen[typ][2]; //wie schnell bewegt sich der gegner
	this.speedBuff = 1;
	this.richtung = map[this.mapy][this.mapx][0] % 4; //in welche richtung schaut der gegner momentan
	this.src = gegnertypen[typ][0]; //url des gegnerbildes
	this.bewegen = function () { //gametick für gegner
		for (var i = 0; i < this.imunität.length; i++) {
			switch (this.imunität[i]) {
				case 8:
					if (this.letzterEffeckt[i] <= roundTime - this.imunitätStärke[i][0]) {
						this.letzterEffeckt[i] += this.imunitätStärke[i][0];
						var spawnId = spawn(this.imunitätStärke[i][1], this.lebenMult);
						gegner[spawnId].strecke = this.strecke;
						gegner[spawnId].mapx = this.mapx;
						gegner[spawnId].mapy = this.mapy;
						gegner[spawnId].posx = this.posx;
						gegner[spawnId].posy = this.posy;
						gegner[spawnId].richtung = this.richtung;
						gegner[spawnId].bewegt = this.bewegt;
						gegner[spawnId].wert = 0;
					}
					break;
				case 10:
					if (this.letzterEffeckt[i] <= roundTime - this.imunitätStärke[i][0]) {
						gegner.forEach((item, j) => {
							if (item != undefined) {
								var entfernung = getEntfernung(item, this);
								if (entfernung <= this.imunitätStärke[i][1]) {
									var alteLeben = item.leben;
									item.leben = Math.min(item.maxHP, item.leben + item.maxHP * this.imunitätStärke[i][2] / 100);
									if (alteLeben != item.leben) {
										numbers("▲ " + round(item.leben - alteLeben, 3), item.posx, item.posy, "pink");
									}
								}
							}
						});
						this.letzterEffeckt[i] += this.imunitätStärke[i][0];
					}
					break;
				case 11:
					if (this.letzterEffeckt[i] <= roundTime - this.imunitätStärke[i][0]) {
						gegner.forEach((item, j) => {
							if (item != undefined) {
								var entfernung = getEntfernung(item, this);
								if (entfernung <= this.imunitätStärke[i][1]) {
									item.speedBuff += this.imunitätStärke[i][0] / 100;
								}
							}
						});
					}
					break;
				case 12:
					if (this.shieldAmount > 0) {
						gegner.forEach((item, j) => {
							if (item != undefined) {
								var entfernung = getEntfernung(item, this);
								if (entfernung <= this.imunitätStärke[i][1]) {
									item.shieldedFrom.push(this.id);
								}
							}
						});
					}
					break;
				case 13:
					tuerme.forEach((item, j) => {
						if (item != undefined) {
							var entfernung = getEntfernung(item, this);
							if (entfernung <= this.imunitätStärke[i][1]) {
								item.towerSlow += this.imunitätStärke[i][0] / 100;
							}
						}
					});
					break;
				case 14:
					if (this.letzterEffeckt[i] <= roundTime - this.imunitätStärke[i][0]) {
						var inRange = [];
						var countInRange = 0;
						tuerme.forEach((item, j) => {
							if (item != undefined) {
								var entfernung = getEntfernung(item, this);
								if (entfernung <= this.imunitätStärke[i][1]) {
									countInRange++;
									inRange.push(j);
								}
							}
						});
						if (countInRange > 0) {
							var target = inRange[Math.floor(Math.random() * countInRange)];
							tuerme[target].towerStun = Math.max(tuerme[target].towerStun, this.imunitätStärke[i][2]);
						}
						this.letzterEffeckt[i] += this.imunitätStärke[i][0];
					}
					break;
			}
		}
		var effektStaerken = []; //erzeuge ein array zum abspeichern des stärksten effeckts von jedem typ
		var effektUrsprung = []; //turm der den effeckt erzeugthat
		for (var i = 0; i < anzahlEffeckte; i++) {
			effektStaerken[i] = 0;
		}
		effektStaerken[15] = 0;
		for (var i = 0; i < this.effektTyp.length; i++) { //gehe jeden effeckt durch der den gegner momentan betrifft
			if (this.effektTyp[i] != undefined) { //skip falls effeckt gelöscht wurde
				if (roundTime - this.effektStart[i] <= this.effektZeit[i]) { //skip falls efecktzeit abgelaufen ist
					if (this.effektStaerke[i] > effektStaerken[this.effektTyp[i]]) { //wenn es der bisher stärkste effeckt von diesem typ ist
						effektStaerken[this.effektTyp[i]] = this.effektStaerke[i]; //wird er abgespeichert
						effektUrsprung[this.effektTyp[i]] = this.effektUrsprung[i];
					}
				}
				else { //lösche effeckt wenn zeit abgelaufen ist
					this.effektTyp[i] = undefined;
					this.effektStaerke[i] = undefined;
					this.effektStart[i] = undefined;
					this.effektZeit[i] = undefined;
					this.effektUrsprung[i] = undefined;
				}
			}
		}
		if (effektStaerken[1] > 0) {
			var speed = 0.1;
		}
		else {
			//berechne geschwindigkeit des gegners      hier speed durch slowstärke      hier speed durch permaslowstärke
			var speed = gameSpeed * tickSpeed * this.baseSpeed * this.speedBuff / Math.max(1, effektStaerken[0] + 1) / Math.max(1, this.permaEffektStaerke[0] + 1) * (size / 70);
			this.speedBuff = 1;
		}
		if (effektStaerken[0] !=
			0) { //wenn der gegner geslowed wurde bekommt der erzeugende slowturm hier die credits dafür
			if (tuerme[effektUrsprung[0]] != undefined) {
				tuerme[effektUrsprung[0]].dmgDealed += gameSpeed * tickSpeed;
			}
		}
		if (roundTime - this.letztesFeuer >= 50 && effektStaerken[2] >
			0) { //wenn der letzte feuerdmgtick mehr als eine halbe sec her ist und ein feuerreffeckt auf dem gegner ist
			if (roundTime - this.letztesFeuer - gameSpeed * tickSpeed < 50) { //setzen der zeit für letzten feuertick
				this.letztesFeuer += 50;
			}
			else {
				this.letztesFeuer = roundTime;
			}
			this.damage(effektStaerken[2] / 2, [], [], [], effektUrsprung[2], "orange", true); //füge schaden für feuertick zu
			if (this.leben <= 0) {
				return; //beende tick wenn gegner tot
			}
		}
		//wiederholung für gift
		if (roundTime - this.letztesGift >= 50 && (effektStaerken[3] > 0 || effektStaerken[15] > 0)) {
			if (roundTime - this.letztesGift - gameSpeed * tickSpeed < 50) {
				this.letztesGift += 50;
			}
			else {
				this.letztesGift = roundTime;
			}
			var giftSchaden = 0;
			for (var i = 0; i < this.effektTyp.length; i++) {
				if (this.effektTyp[i] == 15) {
					giftSchaden += this.effektStaerke[i];
					if (this.effektUrsprung[i] == effektUrsprung[3]) {
						giftSchaden -= Math.min(effektStaerken[3], this.effektStaerke[i]);
					}
				}
			}
			giftSchaden += effektStaerken[3];
			this.damage(giftSchaden / 2, [], [], [], effektUrsprung[3], "green", true);
			if (this.leben <= 0) {
				return;
			}
		} //bewege gegner
		switch (this.richtung) {
			case 0:
				this.posy += -1 * speed;
				break;
			case 1:
				this.posx += 1 * speed;
				break;
			case 2:
				this.posy += 1 * speed;
				break;
			case 3:
				this.posx += -1 * speed;
				break;
		}
		this.bewegt += speed;
		this.strecke += speed;
		if (this.bewegt >= size) { //wenn gegner auf neuem mapfeld kommt
			this.bewegt -= size;
			switch (this.richtung) { //berechne neues mapfeld
				case 0:
					this.mapy += -1;
					break;
				case 1:
					this.mapx += 1;
					break;
				case 2:
					this.mapy += 1;
					break;
				case 3:
					this.mapx += -1;
					break;
			}
			if (map[this.mapy][this.mapx][0] >= 13 && map[this.mapy][this.mapx][0] <= 20) {
				if (map[this.mapy][this.mapx][0] <= 16) {
					portalNummer = -1;
					for (var i = 0; i < portal1[0].length; i++) {
						if (portal1[0][i] == this.mapx && portal1[1][i] == this.mapy) {
							portalNummer = i;
							break;
						}
					}
					if (portal1[2][portalNummer] != undefined) {
						portalNummer = portal1[2][portalNummer];
					}
					else {
						portalNummer++;
						if (portalNummer >= portal1[0].length) {
							portalNummer = 0;
						}
					}
					this.mapx = portal1[0][portalNummer];
					this.mapy = portal1[1][portalNummer];
				}
				else {
					portalNummer = -1;
					for (var i = 0; i < portal1[0].length; i++) {
						if (portal2[0][i] == this.mapx && portal2[1][i] == this.mapy) {
							portalNummer = i;
							break;
						}
					}
					if (portal2[2][portalNummer] != undefined) {
						portalNummer = portal2[2][portalNummer];
					}
					else {
						portalNummer++;
						if (portalNummer >= portal2[0].length) {
							portalNummer = 0;
						}
					}
					this.mapx = portal2[0][portalNummer];
					this.mapy = portal2[1][portalNummer];
				}
			}
			if (map[this.mapy][this.mapx][0] != -2) { //wenn nicht kreuzung
				this.richtung = map[this.mapy][this.mapx][0] % 4; //setze neue richtung
			}
			this.posx = this.mapx * size; //setze gegner auf mitte des mapfelds
			this.posy = this.mapy * size;
			switch (this.richtung) { //und setze restliche bewegung dann fort
				case 0:
					this.posy += -1 * (this.bewegt);
					break;
				case 1:
					this.posx += 1 * (this.bewegt);
					break;
				case 2:
					this.posy += 1 * (this.bewegt);
					break;
				case 3:
					this.posx += -1 * (this.bewegt);
					break;
			}
		}
		if (map[this.mapy][this.mapx][0] >= 9 && map[this.mapy][this.mapx][0] <= 12) { //wenn mapfeld das zielfeld
			if (schwierigkeit != 0) {
				spielerLeben -= gegnertypen[this.typ][6]; //schade spieler
			}
			document.getElementById("Leben").innerHTML = spielerLeben; //update lebensanzeige
			this.kill(true); //lösche gegner
			if (spielerLeben <= 0) { //verloren nachricht wenn leben = 0;
				alert("Du hast das Spiel Verloren!");
				spielEnde = true;
				localStorage.removeItem("saveCode");
			}
		}
	}
	//funktion um schaden/effeckte am gegner zu berechnen
	this.damage = function (points, effekt, effektStaerke, effektZeit, ursprung, farbe = "white", ignoreShield = false) {
		var stopEffekt = false
		var orginalPoints = points;
		if (this.shieldedFrom.length > 0 && !ignoreShield) {
			for (var i = 0; i < this.shieldedFrom.length; i++) {
				if (gegner[this.shieldedFrom[i]] != undefined) {
					gegner[this.shieldedFrom[i]].shieldAmount -= points;
					if (points > 0) { //erzeuge schadensanzeige
						numbers("⛨ " + round(points, 3), this.posx, this.posy, "yellow");
					}
					if (gegner[this.shieldedFrom[i]].shieldAmount <= 0) {
						points = -gegner[this.shieldedFrom[i]].shieldAmount;
						gegner[this.shieldedFrom[i]].shieldAmount = 0;
					}
					else {
						stopEffekt = true;
						points = 0;
						break;
					}
				}
			}
		}
		if (!stopEffekt) {
			for (var i = 0; i < effekt.length; i++) { //gehe alle effekte durch für aoe, tessla und immunitäten
				if (effekt[i] == 6) { //suche TeslaEffekt effeckt
					teslaEffekt(points, effektStaerke[i], effektZeit[i], ursprung, copyObj(gegner), this, false);
				}
				if (effekt[i] == 5) { //suche AoE effeckt
					var anzalHits = 0;
					for (var j = gegner.length - 1; j >= 0; j--) {
						if (gegner[j] != undefined) {
							var entfernung = getEntfernung(gegner[j], this); //abstand zu getroffenem gegner
							if (entfernung <= effektZeit[i]) { //wenn in AoE range
								uebergabeEffekt = copyObj(effekt);
								uebergabeEffektStaerke = copyObj(effektStaerke);
								uebergabeEffektTime = copyObj(effektZeit);
								uebergabeEffekt.splice(i, 1);
								uebergabeEffektStaerke.splice(i, 1);
								uebergabeEffektTime.splice(i, 1);
								gegner[j].damage(effektStaerke[i], uebergabeEffekt, uebergabeEffektStaerke, uebergabeEffektTime,
									ursprung); //füge gegner den effektschaden zu
								anzalHits++;
								if (anzalHits >= 40) {
									break;
								}
							}
						}
					}
					//kommt weg
					if (maxHit < anzalHits) {
						maxHit = anzalHits;
						console.log("rocket: " + maxHit);
					}
					if (this.leben <= 0) {
						return false; //beende funktion wenn gegner tot ist (damit keine aktionen am nicht existierenden gegner mehr ausgeführt werden)
					}
				}
				for (var j = 0; j < this.imunität.length; j++) { //gehe alle immunitäten des gegners durch
					if (this.imunität[j] == effekt[i]) { //betrifft diese immunität diesen effeckt?
						effektStaerke[i] *= Math.max(1 - this.imunitätStärke[j] / 100, 0); //reduziere effecktstärke je nach immunität
						if (this.imunität[j] == 2 && effekt[i] == 2) { //wenn feuerschaden reduziere den schaden je nach immunität
							points *= Math.max(1 - this.imunitätStärke[j] / 100, 0);
						}
						if (this.imunität[j] == 3 && effekt[i] == 3) { //wenn giftschaden reduziere den schaden je nach immunität
							points *= Math.max(1 - this.imunitätStärke[j] / 100, 0);
						}
						break;
					}
					if (this.imunität[j] == 0 && effekt[i] == 4) { //slow imunität wirkt auf permaslow
						effektStaerke[i] *= Math.max(1 - this.imunitätStärke[j] / 100, 0);
					}
					if (this.imunität[j] == 3 && effekt[i] == 15) { //gift immunität wirkt auf stackbares Gift
						effektStaerke[i] *= Math.max(1 - this.imunitätStärke[j] / 100, 0);
					}
				}
			}
			for (var j = 0; j < this.imunität.length; j++) {
				if (this.imunität[j] == 6 && farbe == "white") { //wenn normalschaden und %dmg mitigation
					points *= Math.max(1 - this.imunitätStärke[j] / 100, 0);
				}
				else if (this.imunität[j] == 5 && farbe == "white") { //wenn normalschaden und flat dmg mitigation
					points = Math.max(points - this.imunitätStärke[j], 0);
				}
			}
			points = round(points, 2)
			var anzeige = points; //was für eine schadensanzeige wird erzeugt
			switch (effekt[0]) {
				case 0:
					anzeige = "❄";
					if (points !== 0) {
						anzeige += " " + points;
					}
					farbe = "#7070ff";
					break;
				case 1:
					anzeige = "🛑";
					if (points !== 0) {
						anzeige += " " + points;
					}
					farbe = "#ccffff";
					break;
				case 2:
					farbe = "red";
					break;
				case 3:
					farbe = "green";
					break;
			}
			switch (farbe) {
				case "white":
					anzeige = "▼ " + anzeige;
					break;
				case "red":
					anzeige = "▼ " + anzeige;
					break;
				case "orange":
					anzeige = "🔥 " + anzeige;
					break;
				case "green":
					anzeige = "🕱 " + anzeige;
					break;
			}
			if (points !== 0 || (anzeige === "🛑" || anzeige === "❄")) { //erzeuge schadensanzeige
				numbers(anzeige, this.posx, this.posy, farbe);
			}
			for (var i = 0; i < effekt.length; i++) { //wurden beim schaden effeckte mitgegeben wurde
				if (effekt[i] > 10 || effekt[i] <
					4) { // 4=permaslow und die anderen efeckte werden nicht im gegner gespeichert extra behandelt
					var handeled = false; //effeckt schon abgehandelt (bei überschreiben von altem effeckt)
					for (var j = 0; j < this.effektTyp.length; j++) { //gehe alle effeckte durch ob dieser efeckt schon vom gleichen ursprung mit gleicher stärke schon existiert
						if (this.effektTyp[j] == effekt[i] && this.effektStaerke[j] <= effektStaerke[i] && this.effektUrsprung[j] == ursprung) {
							this.effektZeit[j] = Math.max(effektZeit[i] + roundTime - this.effektStart[j], this.effektZeit[j]); //wenn ja verängere nur efeckt zeit
							handeled = true;
							break;
						}
					}
					if (!handeled) { //wenn efeckt so noch nicht existiert hat
						var num = 0; //suche erste freie stelle im efecktarray
						while (this.effektTyp[num] != undefined) {
							num++;
						}
						this.effektTyp[num] = effekt[i]; //und schreibe den effeckt mit daten rein
						this.effektStaerke[num] = effektStaerke[i];
						this.effektStart[num] = roundTime;
						this.effektZeit[num] = effektZeit[i];
						this.effektUrsprung[num] = ursprung;
					}
				}
				else if (effekt[i] == 4) {
					if (this.permaEffektStaerke[0] < 1) {
						this.permaEffektStaerke[0] = Math.min(1, this.permaEffektStaerke[0] + effektStaerke[i]);
						if (tuerme[ursprung] != undefined) {
							tuerme[ursprung].effecktStacks++;
						}
					}
				}
			}
			if (tuerme[ursprung] != undefined) {
				tuerme[ursprung].dmgDealed += Math.min(points, this.leben); //schaden zugefügt wird bei erzeugerturm aufgerechnet
			}
			this.leben -= points; //leben werden abgezogen
			if (this.leben <= 0) { //wenn gegner keine leben mehr hat
				addGeld(this.wert); //geld für kill hinzufügen
				this.kill(); //gegner entfernen
				return false;
			}
			else {
				return true;
			}
		}
	}
	this.kill = function (amZiel = false) { //wenn gegner tot oder am ziehl ist entfernen
		tuerme.forEach((item, i) => {
			if (item != undefined && item.typ == 5 && item.upgradeStufe == maxUpgrade && towertypen[item.typ][12]) {
				if (item.target == this.id) {
					item.target = -1;
				}
				else if (item.target > this.id) {
					item.target--;
				}
			}
		});
		gegner.splice(this.id, 1); //aus liste löschen
		for (var i = this.id; i < gegner.length; i++) {
			gegner[i].id--; //gegnerid von anderen gegnern anpassen (damit sie weiterhin vortlaufend ist)
		}
		if (!amZiel) {
			for (var i = 0; i < this.imunität.length; i++) {
				if (this.imunität == 7) {
					for (var j = 0; j < this.imunitätStärke[i]; j++) {
						var spawnId = spawn(11, this.lebenMult);
						var posDifference = 20;
						gegner[spawnId].strecke = this.strecke - j * posDifference / 70 * size;
						gegner[spawnId].mapx = this.mapx;
						gegner[spawnId].mapy = this.mapy;
						gegner[spawnId].posx = this.posx;
						gegner[spawnId].posy = this.posy;
						gegner[spawnId].richtung = this.richtung;
						gegner[spawnId].bewegt = this.bewegt - j * posDifference / 70 * size;
						switch (this.richtung) {
							case 0:
								gegner[spawnId].posy += 1 * (j * posDifference / 70 * size);
								break;
							case 1:
								gegner[spawnId].posx += -1 * (j * posDifference / 70 * size);
								break;
							case 2:
								gegner[spawnId].posy += -1 * (j * posDifference / 70 * size);
								break;
							case 3:
								gegner[spawnId].posx += 1 * (j * posDifference / 70 * size);
								break;
						}
					}
				}
			}
		}
	}
}
