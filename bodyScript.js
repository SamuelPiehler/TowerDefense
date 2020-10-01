//setzt die map größe und map part größe
var size = Math.floor(resizekoords(map[0].length, map.length));
var TCN = new TextCanvas();
const queue = new UpdateQueue();
queue.queue.push(TCN);
//Canvas in dem alle Gegner Angezeigt werden
var gegnerBild = document.createElement('canvas');
document.body.appendChild(gegnerBild);
gegnerBild.width = size * map[0].length;
gegnerBild.height = size * map.length;
gegnerBild.style.position = 'absolute';
gegnerBild.style.left = '10px';
gegnerBild.style.top = '50px';
gegnerBild.style.zIndex = 5;
gegnerBild.style.pointerEvents = "none";

TCN.width = size * map[0].length;
TCN.height = size * map.length;

//canvas zur zeichnung aller gegner wird nicht selbst angezeigt sondern nur wenn fertig gezeichnet in gegnerbild kopiert verhinder blinken von gegnern beim löschen und neuzeichnen
var gegnerBildHidden = document.createElement('canvas');
gegnerBildHidden.width = size * map[0].length;
gegnerBildHidden.height = size * map.length;

//erzeugt den Tower select bereich
var towerSelect = [];
if (size * 1.7 * 6 + 100 + size < screen.height) {
	var selectSize = size;
}
else {
	var selectSize = (screen.height - 100) / (1.7 * 6 + 1);
}
for (var i = 0; i < towertypen.length; i++) {
	towerSelect[i] = [];
	for (var j = 0; j < 2; j++) {
		towerSelect[i][j] = document.createElement("canvas");
		document.body.appendChild(towerSelect[i][j]);
		towerSelect[i][j].width = selectSize;
		towerSelect[i][j].height = selectSize;
		towerSelect[i][j].style.position = 'absolute';
		var x = size * map[0].length + 90;
		var y = selectSize * 1.7 * i + 100;
		if (i >= 6) {
			x += 120;
			y -= 6 * selectSize * 1.7;
		}
		towerSelect[i][j].style.left = x + 'px';
		towerSelect[i][j].style.top = y + 'px';
		towerSelect[i][j].style.zIndex = j;
	}
	ladeBild(towertypen[i][1], towerSelect[i][1], 0, false, 0, 0, undefined, selectSize);
	towerSelect[i][1].name = i;
	towerSelect[i][1].addEventListener('click', select);
	towerSelect[i][1].addEventListener('mouseover', function (evt) {
		showStats(evt, this);
	});
	towerSelect[i][1].addEventListener('mouseleave', function () {
		hideStats();
	});
}

//erzeugt start/pause button mit eventlistener
var startButton = document.createElement("img");
document.body.appendChild(startButton);
startButton.src = "Bilder/Buttons/start.png";
startButton.className = "button";
startButton.style.position = 'absolute';
startButton.style.left = (size * map[0].length) + Math.min(document.body.offsetWidth - size * map[0].length - (45 + 77 +
	123), selectSize * 3) / 4 + 5 + 'px';
// startButton.style.left = (size * (map[0].length+1.5))+'px';
startButton.style.top = 50 + 'px';
startButton.addEventListener("click", function () {
	startAndPause(); //funktion zum wechseln zwischen start und pause (anzeige von button und pause variable)
});
startButton.addEventListener("mouseover", function () {
	startHover = true;
	if (wellenEnde == 0 || gamePause) {
		startButton.src = "Bilder/Buttons/startHover.png";
	}
	else {
		startButton.src = "Bilder/Buttons/pauseHover.png";
	}
});
startButton.addEventListener("mouseleave", function () {
	startHover = false;
	if (wellenEnde == 0 || gamePause) {
		startButton.src = "Bilder/Buttons/start.png";
	}
	else {
		startButton.src = "Bilder/Buttons/pause.png";
	}
});

//funktion zum wechseln zwischen start und pause (anzeige von button und pause variable)
function startAndPause() {
	if (wellenEnde == 0) { //wenn zwischen den wellen
		spawnWelle();
		if (startHover) {
			startButton.src = "Bilder/Buttons/pauseHover.png";
		}
		else {
			startButton.src = "Bilder/Buttons/pause.png";
		}
	}
	else {
		if (gamePause) {
			if (startHover) {
				startButton.src = "Bilder/Buttons/pauseHover.png";
			}
			else {
				startButton.src = "Bilder/Buttons/pause.png";
			}
		}
		else {
			if (startHover) {
				startButton.src = "Bilder/Buttons/startHover.png";
			}
			else {
				startButton.src = "Bilder/Buttons/start.png";
			}
		}
		gamePause = !gamePause;
	}
}

//erzeugt geschwindigkeits button mit eventlistener
var speedButton = document.createElement("img");
document.body.appendChild(speedButton);
speedButton.src = "Bilder/Buttons/speedx1.png";
speedButton.className = "button";
speedButton.style.position = 'absolute';
speedButton.style.left = (size * map[0].length) + Math.min(document.body.offsetWidth - size * map[0].length - (45 + 77 +
	123), selectSize * 3) / 2 + 45 + 5 + 'px';
// speedButton.style.left = (size * (map[0].length+2) + 45)+'px';
speedButton.style.top = 50 + 'px';
speedButton.addEventListener("click", changeGameSpeed);
speedButton.addEventListener("mouseover", function () {
	speedHover = true;
	if (gameSpeed == 2) {
		speedButton.src = "Bilder/Buttons/speedx1Hover.png";
	}
	else {
		speedButton.src = "Bilder/Buttons/speedx3Hover.png";
	}
});
speedButton.addEventListener("mouseleave", function () {
	speedHover = false;
	if (gameSpeed == 2) {
		speedButton.src = "Bilder/Buttons/speedx1.png";
	}
	else {
		speedButton.src = "Bilder/Buttons/speedx3.png";
	}
});

//erzeugt geschwindigkeits button mit eventlistener
var autoStartButton = document.createElement("img");
document.body.appendChild(autoStartButton);
autoStartButton.src = "Bilder/Buttons/autoStartAus.png";
autoStartButton.className = "button";
autoStartButton.style.position = 'absolute';

autoStartButton.style.left = (size * map[0].length) + Math.min(document.body.offsetWidth - size * map[0].length - (45 +
	77 + 123), selectSize * 3) / 4 * 3 + 45 + 77 + 5 + 'px';
// autoStartButton.style.left = (size * (map[0].length+2.5) + 45 + 77)+'px';
autoStartButton.style.top = 50 + 'px';
autoStartButton.addEventListener("click", function () {
	autoStart = !autoStart;
	if (autoStart) {
		autoStartButton.src = "Bilder/Buttons/autoStartAnHover.png";
	}
	else {
		autoStartButton.src = "Bilder/Buttons/autoStartAusHover.png";
	}
});
autoStartButton.addEventListener("mouseover", function () {
	if (autoStart) {
		autoStartButton.src = "Bilder/Buttons/autoStartAnHover.png";
	}
	else {
		autoStartButton.src = "Bilder/Buttons/autoStartAusHover.png";
	}
});
autoStartButton.addEventListener("mouseleave", function () {
	if (autoStart) {
		autoStartButton.src = "Bilder/Buttons/autoStartAn.png";
	}
	else {
		autoStartButton.src = "Bilder/Buttons/autoStartAus.png";
	}
});

//frägt ab ob eine Tastatur Taste gedückt oder losgelassen wird
document.querySelector("body").addEventListener("keydown", tasteGedrueckt);
document.querySelector("body").addEventListener("keyup", tasteLosgelassen);

function tasteGedrueckt(evt) {
	switch (evt.key) {
		case "Shift":
			shift = true;
			break;
		case "Control":
			strg = true;
			break;
		case "Escape":
			deselect();
			hideUpgrade();
			break;
		case " ":
			startAndPause();
			break;
		case "s":
			changeGameSpeed();
			break;
		case "S":
			changeGameSpeed();
			break;
		case "!":
			select(false, 0);
			break;
		case '"':
			select(false, 1);
			break;
		case '§':
			select(false, 2);
			break;
		case '$':
			select(false, 3);
			break;
		case '%':
			select(false, 4);
			break;
		case '&':
			select(false, 5);
			break;
		case '/':
			select(false, 6);
			break;
		case '(':
			select(false, 7);
			break;
		case ')':
			select(false, 8);
			break;
		case '=':
			select(false, 9);
		case '0':
			select(false, 9);
			break;
		case '?':
			select(false, 10);
		case 'ß':
			select(false, 10);
			break;
		case 'Dead':
			select(false, 11);
			break;
		default:
			if (evt.key * 1 >= 1 && evt.key * 1 <= 9) { //wählt tower zum bauen aus je nach gedückter zahl
				select(false, evt.key - 1);
			}
			break;
	}
}

function tasteLosgelassen(evt) {
	switch (evt.key) {
		case "Control":
			strg = false;
			break;
		case "Shift":
			shift = false;
			break;
	}
}

//die maps werde nach dem  Neuen Formart  gelanden
function buildMapNeu() {
	for (var i = 0; i < map.length; i++) { //mapzeile
		for (var j = 0; j < map[i].length; j++) { //mapspalte
			map[i][j]["map"] = document.createElement('canvas');
			mapDiv.appendChild(map[i][j]["map"]);
			map[i][j]["map"].width = size;
			map[i][j]["map"].height = size;
			map[i][j]["map"].style.position = 'absolute';
			map[i][j]["map"].style.left = (size * j) + 'px';
			map[i][j]["map"].style.top = (size * i) + 'px';
			if (Array.isArray(map[i][j][1])) {
				ladeBild(map[i][j][1][0], map[i][j]["map"], parseInt(Math.random() * 4) * 90);
				map[i][j]["object"] = document.createElement('canvas');
				mapDiv.appendChild(map[i][j]["object"])
				map[i][j]["object"].width = size;
				map[i][j]["object"].height = size;
				map[i][j]["object"].style.position = 'absolute';
				map[i][j]["object"].style.left = (size * j) + 'px';
				map[i][j]["object"].style.top = (size * i) + 'px';
				ladeBild(map[i][j][1][1], map[i][j]["object"], 0);
			}
			else {
				ladeBild(map[i][j][1], map[i][j]["map"], parseInt(Math.random() * 4) * 90);
			}
			if (map[i][j][0] >= 5 && map[i][j][0] <= 8) {
				start[0].push(i);
				start[1].push(j);
			}
			else if (map[i][j][0] == 0) {
				map[i][j]["map"].name = j + ',' + i;
				map[i][j]["map"].addEventListener('click', build);
			}
			else if (map[i][j][0] >= 13 && map[i][j][0] <= 16) {
				if (!isNaN(map[i][j][2])) {
					portal1[0][parseInt(map[i][j][2])] = j;
					portal1[1][parseInt(map[i][j][2])] = i;
					if (!isNaN(map[i][j][3])) {
						portal1[2][parseInt(map[i][j][2])] = parseInt(map[i][j][3]);
					}
				}
				else {
					portal1[0].push(j);
					portal1[1].push(i);
				}
			}
		}
	}
}

function save() {
	var prüf1 = 0;
	var prüf2 = 0;
	var prüf3 = 1;
	var saveCode = nextChars(mapId);
	saveCode += nextChars(schwierigkeit);
	saveCode += nextChars(spielerLeben, 2)
	saveCode += nextChars(geld, 3);
	saveCode += nextChars(wellenNummer, 2);
	for (var i = 0; i < tuerme.length; i++) {
		if (tuerme[i] == undefined) {
			for (var j = 0; j < 22; j++) {
				saveCode += nextChars((92 - 3 * j) % 94);
			}
			continue;
		}
		if (tuerme[i].spezialisierung == undefined) {
			saveCode += nextChars(93);
		}
		else {
			saveCode += nextChars(tuerme[i].spezialisierung * 1);
		}
		saveCode += nextChars(tuerme[i].typ);
		saveCode += nextChars(tuerme[i].upgradeStufe);
		saveCode += nextChars(tuerme[i].posx / size);
		saveCode += nextChars(tuerme[i].posy / size);
		while (tuerme[i].richtung1 < 0) {
			tuerme[i].richtung1 += 360;
		}
		while (tuerme[i].richtung1 > 360) {
			tuerme[i].richtung1 -= 360;
		}
		saveCode += nextChars(tuerme[i].richtung, 3);
		while (tuerme[i].richtung2 < 0) {
			tuerme[i].richtung2 += 360;
		}
		while (tuerme[i].richtung2 > 360) {
			tuerme[i].richtung2 -= 360;
		}
		saveCode += nextChars(tuerme[i].richtung2, 3);
		saveCode += nextChars(tuerme[i].targetPrio);
		saveCode += nextChars(tuerme[i].dmgDealed * 100, 6);
		saveCode += nextChars(tuerme[i].effecktStacks, 3);
		saveCode += nextChars(prüf2);
	}
	saveCode += nextChars(prüf1);
	saveCode += nextChars(prüf3);
	localStorage.setItem('saveCode', saveCode);

	function nextChar(content) {
		var string = "";
		for (var i = 0; i < content.length; i++) {
			prüf3 *= content[i] + 1;
			prüf3 %= 93;
			prüf2 += content[i] * prüf1;
			prüf2 %= 93;
			prüf1 += content[i] + 1;
			prüf1 %= 93;
			string += String.fromCharCode(33 + content[i]);
		}
		return string;
	}

	function nextChars(content, amount = 1) {
		amount--;
		contentNumX = [];
		for (var i = 0; i <= amount; i++) {
			contentNumX[i] = content;
			for (var j = 0; j < i; j++) {
				contentNumX[i] -= contentNumX[j] * Math.pow(94, amount - j)
			}
			contentNumX[i] = contentNumX[i] / Math.pow(94, amount - i);
			contentNumX[i] = Math.floor(contentNumX[i]);
			if (contentNumX[i] > 93) {
				console.log("zahl zu groß!!\n");
				console.log(content + " = content\n");
				console.log(amount + " = amount\n");
				console.log(i + " = i\n");
				console.log(contentNumX[i] + " = contentX\n");
				contentNumX[i] = 93;
			}
			else if (contentNumX[i] < 0) {
				console.log("zahl zu klein!!\n");
				console.log(content + " = content\n");
				console.log(amount + " = amount\n");
				console.log(i + " = i\n");
				console.log(contentNumX[i] + " = contentX\n");
				contentNumX[i] = 0;
			}
		}
		return nextChar(contentNumX);
	}
}

function ladeBild(src, canvas, richtung, clear = false, x = 0, y = 0, richtung2 = undefined, bildSize = size) {
	promise.push(new Promise((resolve, reject) => {
		ladeBildPromise(resolve, reject, src, canvas, richtung, clear, x, y, richtung2, bildSize)
	}));
}
//warte bis bild geladen und zeichne es dann (um this. variablen für onload vorzubereiten weil this.bei onload eine andere bedeutung hat)
async function ladeBildPromise(resolve, reject, src, canvas, richtung, clear = false, x = 0, y = 0, richtung2 =
	undefined, bildSize = size) {
	if (bildBuffer[src] == undefined) { //wenn das bild noch nicht im buffer
		bildBuffer[src] = document.createElement(
			'canvas'); //erzeuge neues kanvas im buffer in dem das bild dann abgespeichert wird
		bildBuffer[src].width = 70;
		bildBuffer[src].height = 70;
		bild = new Image();
		loading++;
		ladeBild(src, canvas, richtung, clear, x, y, richtung2, bildSize); //hole das bild aus dem buffer und zeichne es
		bild.onload = function () {
			zeichneBufferBild(bildBuffer[src], this, 0); //zeiche das bild in den buffer
			if (loading == 1) { //wenn alle buffer bilder fertig geladen sind
				waitForBildLoad.forEach((item, i) => { //zeichne alle bilder in der warteliste
					item();
				});
				waitForBildLoad = [];
				// if (updateFinish && !spielEnde) {
				//   window.requestAnimationFrame(update);
				// }
				scriptLoaded++;
			}
			loading--; //gibt an das ein weiteres bufferbild fertig geladen hat
			resolve();
		};
		bild.src = src;
		bild.onerror = function () {
			console.error("missing img!!", src, "loading = " + loading);
			if (loading == 1) { //wenn alle buffer bilder fertig geladen sind
				waitForBildLoad.forEach((item, i) => { //zeichne alle bilder in der warteliste
					item();
				});
				waitForBildLoad = [];
				// if (updateFinish && !spielEnde) {
				//   window.requestAnimationFrame(update);
				// }
			}
			loading--; //gibt an das ein weiteres bufferbild fertig geladen hat
			reject();
		};
	}
	else {
		if (loading == 0) {
			zeicheBild(canvas, bildBuffer[src], richtung, clear, x, y, richtung2, bildSize);
		}
		else { //wenn buffer gerade ein neues bild läd warte bis dieser fertig ist und zeichne das bild erst dann
			waitForBildLoad.push(function () {
				zeicheBild(canvas, bildBuffer[src], richtung, clear, x, y, richtung2, bildSize)
			});
		}
		resolve();
	}
}

//ändere spielgeschwindigkeit und button anzeige
function changeGameSpeed() {
	if (gameSpeed == 2) {
		if (speedHover) {
			speedButton.src = "Bilder/Buttons/speedx3Hover.png";
		}
		else {
			speedButton.src = "Bilder/Buttons/speedx3.png";
		}
		gameSpeed = 6;
	}
	else {
		if (speedHover) {
			speedButton.src = "Bilder/Buttons/speedx1Hover.png";
		}
		else {
			speedButton.src = "Bilder/Buttons/speedx1.png";
		}
		gameSpeed = 2;
	}
}

//startet nächste welle
function spawnWelle() {
	if (multiStartTyp == 1) {
		spawnPointNumber++;
		if (spawnPointNumber >= start[0].length) {
			spawnPointNumber = 0;
		}
	}
	roundTime = 0;
	var warten = 0;
	var nummer = teilWellenNummer; //nummer der zu behandelnden Teilwelle
	do {
		wellenEnde = Math.max(wellenEnde, roundTime + warten + ((gegnerWellen[nummer][4] + 2) *
			100
			)); //setzt eine zeit wann die welle frühestens zuende sein kann (wann startet letzte teilwelle + 2 sec sicherheit 1sec bei letzter teilwelle einer gesamtwelle)
		timers.push([spawnTeilWelle, roundTime + warten]); //setzt einen timer wann die teilwellen gestartet werden sollen
		warten += Math.max(0, gegnerWellen[nummer][4] * 100);
		nummer++;
	} while (gegnerWellen[nummer - 1][4] != -1); //ist die teilwelle die letzte der gesamtwelle?
}

//spawned gegner der Teilwelle
function spawnTeilWelle() {
	var welle = gegnerWellen[teilWellenNummer];
	wellenEnde = Math.max(wellenEnde, roundTime + (welle[3] * 100 * (welle[2] -
		0.5))); //setzt eine zeit wann die welle frühestens zuende sein kann (wann spawned letzter gegner der teilwelle)
	spawn(welle[0], welle[1]); //spawned ersten gegner der teilwelle
	if (welle[2] > 1) {
		intervals.push([function (übergabe) {
				spawn(übergabe[0], übergabe[1]);
			},
			[welle[0], welle[1]], roundTime, welle[3] * 100, welle[2] - 1
		]); //intervall wann gegner dieser teilwelle spawnen
	}
	teilWellenNummer++;
}

//statfenster für das towerselect menü wenn tower gehovert werden zum bauen
function showStats(evt, object) {
	statFenster = document.createElement("div");
	document.body.appendChild(statFenster);
	statFenster.style.position = 'absolute';
	var x = evt.srcElement.offsetLeft + selectSize * 0.9;
	var y = evt.srcElement.offsetTop + selectSize * 0.85;
	statFenster.style.backgroundColor = '#d5d0ff';
	statFenster.style.zIndex = 10;
	statFenster.innerHTML = towertypen[object.name][10] + "<br>";
	if (object.name == towertypen.length - 1) {
		var preis = 0;
		for (var i = 0; i < towertypen.length - 1; i++) {
			preis += parseInt(towertypen[i][6] * preisMult);
		}
		preis = parseInt(preis / (towertypen.length - 1) * 0.95);
	}
	else {
		var preis = parseInt(towertypen[object.name][6] * preisMult);
	}
	if (geld >= preis) { //preisfarbe je nach dem ob mans kaufen kann
		var preisFarbe = "darkgreen";
	}
	else {
		var preisFarbe = "red";
	}
	statFenster.innerHTML += `Preis: <span style="color: ${preisFarbe};" class="preisFarbe">${preis}</span><br>`;
	if (object.name != towertypen.length - 1) {
		statFenster.innerHTML += "Damage: " + round(towertypen[object.name][2], 3) + "<br>";
		statFenster.innerHTML += "Nachladezeit: " + round(towertypen[object.name][5], 3) + " sec <br>";
		statFenster.innerHTML += "Reichweite: " + round(towertypen[object.name][4], 3) + "<br>";
		if (towertypen[object.name][3] != 0) {
			statFenster.innerHTML += "Drehgeschwindigkeit: " + round(towertypen[object.name][3] * 100, 3) + " Grad/sec <br>";
		}
		else if (object.name == 9) {
			statFenster.innerHTML += "Buffed alle Türme in Reichweite! <br>";
		}
		else {
			statFenster.innerHTML += "Trifft alle Gegner in Reichweite! <br>";
		}
		for (var i = 0; i < towertypen[object.name][7].length; i++) { //hat der Turm zusatzefeckte
			switch (towertypen[object.name][7][i]) {
				case 0:
					statFenster.innerHTML += "Verlangsamt Gegner auf die " + round(1 / (towertypen[object.name][8][i] + 1), 3) +
						" fache Geschwindigkeit. <br>";
					break;
				case 1:
					statFenster.innerHTML += "Stunned Gegner <br>";
					break;
				case 2:
					statFenster.innerHTML += "Verbrennt Gegner für " + round(towertypen[object.name][8][i], 3) +
						" Schaden/sec. <br>";
					break;
				case 3:
					statFenster.innerHTML += "Vergiftet Gegner für " + round(towertypen[object.name][8][i], 3) +
						" Schaden/sec. <br>";
					break;
				case 5:
					statFenster.innerHTML += "Trifft nahe Gegner zusätzlich für " + round(towertypen[object.name][8][i], 3) +
						" Schaden. <br>";
					break;
				case 6:
					statFenster.innerHTML += "Springt zusätzlich bis zu " + round(towertypen[object.name][8][i], 3) +
						" mal auf nahe Gegner über. <br>";
					break;
				case 7:
					statFenster.innerHTML += "Verbesstert den Damage von nahen Türmen um " + round(towertypen[object.name][8][i],
						3) + "%. <br>";
					break;
				case 8:
					statFenster.innerHTML += "Oder: Verbesstert die Angriffsgeschwindigkeit von nahen Türmen um " + round(
						towertypen[object.name][8][i], 3) + "%. <br>";
					break;
				case 9:
					statFenster.innerHTML += "Oder: Verbesstert die Effektstärke, -dauer und -reichweite von nahen Türmen um " +
						round(towertypen[object.name][8][i], 3) + "%. <br>";
					break;
				case 10:
					statFenster.innerHTML += "Oder: Verbesstert die Drehgeschwindigkeit und Reichweite von nahen Türmen um " +
						round(towertypen[object.name][8][i], 3) + "%. <br>";
					break;
			}
			if (towertypen[object.name][7][i] >= 5 && towertypen[object.name][7][i] <= 10) {
				statFenster.innerHTML += "Effektreichweite: " + round(towertypen[object.name][9][i], 3) + " <br>";
			}
			else {
				statFenster.innerHTML += "Effektdauer: " + round(towertypen[object.name][9][i], 3) + "sec <br>";
			}
		}
	}
	if (x + statFenster.offsetWidth > document.body.offsetWidth) {
		x -= statFenster.offsetWidth + selectSize * 0.8;
		if (x < 0) {
			statFenster.style.left = '0px';
		}
		else {
			statFenster.style.left = x + 'px';
		}
	}
	else {
		statFenster.style.left = x + 'px';
	}
	if (y + 100 + statFenster.offsetHeight > screen.height) {
		statFenster.style.bottom = '0px';
	}
	else {
		statFenster.style.top = y + 'px';
	}
	geldAnzeige = document.getElementsByClassName(
		"preisFarbe"); //lade alle anzeige objekte die sich auf einen preis beziehen
}

//lösche des statfenster wenn der tower nicht mehr gehovert wird
function hideStats() {
	statFenster.remove();
	statFenster = undefined;
}

// zeige reichweite des gehoverten turms
function showRange(evt, object, id) {
	range = tuerme[id].reichweite * (1 + tuerme[id].buffStaerken[3] / 100);
	rangeDiv = document.createElement("div");
	document.getElementById("range").appendChild(rangeDiv);
	rangeDiv.style.position = 'absolute';
	rangeDiv.style.left = (evt.srcElement.offsetLeft + size / 2 - (range * size / 70)) + 'px';
	rangeDiv.style.top = (evt.srcElement.offsetTop + size / 2 - (range * size / 70)) + 'px';
	rangeDiv.style.width = (range * size / 35) + 'px';
	rangeDiv.style.height = (range * size / 35) + 'px';
	rangeDiv.style.borderRadius = (range * size / 35) + 'px';
	rangeDiv.style.backgroundColor = '#a0a0a050';
	rangeDiv.style.borderStyle = 'solid';
	rangeDiv.style.borderWidth = '1px';
	rangeDiv.style.borderColor = '#000000';
	rangeDiv.style.zIndex = 9;
	rangeDiv.style.overflow = "hidden";
}

//lösche reichweite des turms wenn er nicht mehr gehovert wird
function hideRange() {
	rangeDiv.remove();
	rangeDiv = undefined;
}

//zeige die Stats/Upgradestats/-kosten des angeklickten turms
function showUpgrade(object, id) {
	hideUpgrade();
	var typ = tuerme[id].typ;
	upgradeFenster = document.createElement("div");
	document.body.appendChild(upgradeFenster);
	upgradeFenster.style.position = 'absolute';
	var x = tuerme[id].posx + 75;
	var y = tuerme[id].posy + 110;
	upgradeFenster.style.backgroundColor = '#d5d0ffd0';
	upgradeFenster.style.maxWidth = '400px';
	upgradeFenster.style.zIndex = 10;
	upgradeFenster.innerHTML += towertypen[typ][10] + "<br>";
	if (tuerme[id].upgradeStufe < maxUpgrade) { //ist der Turm auf der maximalen upgradestufe
		if (tuerme[id].upgradeStufe == maxUpgrade - 1) {
			var preis = parseInt(towertypen[typ][6] * preisMult) * 2;
		}
		else {
			var preis = parseInt(parseInt(towertypen[typ][6] * preisMult) * (25 + 10 * tuerme[id].upgradeStufe) / 100);
		}
		upgradeFenster.innerHTML += "Upgradestufe: " + tuerme[id].upgradeStufe +
			" <span style='color: #ff0000'>+1</span><br>";
		if (preis <= geld) { //preis farbe je nach dem ob man das geld hat
			preisFarbe = "darkgreen";
		}
		else {
			preisFarbe = "red";
		}
		upgradeFenster.innerHTML +=
			`Upgrade Preis: <span style="color: ${preisFarbe};" class="preisFarbe">${preis}</span><br>`;
		upgradeFenster.innerHTML +=
			`Verkaufswert: ${tuerme[id].wert}<span style='color: #ff0000'> +${parseInt(preis*0.8)}</span><br>`;
		upgradeFenster.innerHTML +=
			`Damage: ${round(tuerme[id].schaden*(1+tuerme[id].buffStaerken[0]/100), 3)}<span style='color: #ff0000'> +${round(towertypen[typ][2]/10*(1+tuerme[id].buffStaerken[0]/100), 3)}</span><br>`;
		if (typ == 10) {
			upgradeFenster.innerHTML +=
				`Nachladezeit: ${round(tuerme[id].angriffsZeit/(1+tuerme[id].buffStaerken[1]/100), 3)} sec <br>`;
			upgradeFenster.innerHTML +=
				`Reichweite: ${round(tuerme[id].reichweite*(1+tuerme[id].buffStaerken[3]/100), 3)} <br>`;
		}
		else {
			if (typ == 2) {
				upgradeFenster.innerHTML += "Nachladezeit: " + round(tuerme[id].angriffsZeit / (1 + tuerme[id].buffStaerken[1] /
					100), 3) + " sec <br>";
			}
			else {
				upgradeFenster.innerHTML += "Nachladezeit: " + round(tuerme[id].angriffsZeit / (1 + tuerme[id].buffStaerken[1] /
					100), 3) + "<span style='color: #ff0000'> +" + round(towertypen[typ][5] / 10 / (1 + tuerme[id].buffStaerken[
					0] / 100), 3) + "</span> sec <br>";
			}
			if (typ == 9) {
				upgradeFenster.innerHTML += "Reichweite: " + round(tuerme[id].reichweite * (1 + tuerme[id].buffStaerken[3] /
					100), 2) + "<span style='color: #ff0000'> +" + round(towertypen[typ][9][tuerme[id].effekt[0] - 7] * 0.1 * (
					1 + tuerme[id].buffStaerken[2] / 100), 2) + " </span><br>";
			}
			else {
				upgradeFenster.innerHTML += "Reichweite: " + round(tuerme[id].reichweite * (1 + tuerme[id].buffStaerken[3] /
					100), 2) + "<span style='color: #ff0000'> +" + round(towertypen[typ][4] / 10 * (1 + tuerme[id].buffStaerken[
					3] / 100), 2) + " </span><br>";
			}
		}
		if (tuerme[id].drehGeschw != 0) {
			upgradeFenster.innerHTML += "Drehgeschwindigkeit: " + round(tuerme[id].drehGeschw * 100 * (1 + tuerme[id]
				.buffStaerken[3] / 100), 2) + "<span style='color: #ff0000'> +" + round(towertypen[typ][3] * 10 * (1 + tuerme[
				id].buffStaerken[3] / 100), 2) + " </span> Grad/sec <br>";
		}
		else if (typ == 9) {
			upgradeFenster.innerHTML += "Buffed alle Türme in Reichweite! <br>";
		}
		else {
			upgradeFenster.innerHTML += "Trifft alle Gegner in Reichweite! <br>";
		}
		for (var i = 0; i < tuerme[id].effekt.length; i++) {
			switch (tuerme[id].effekt[i]) {
				case 0:
					var speedChange = (1 / (tuerme[id].effektStaerke[i] * (1 + tuerme[id].buffStaerken[2] / 100) + towertypen[typ]
						[8][i] * 0.1 * (1 + tuerme[id].buffStaerken[2] / 100) + 1)) - (1 / (tuerme[id].effektStaerke[i] * (1 +
						tuerme[id].buffStaerken[2] / 100) + 1));
					upgradeFenster.innerHTML += "Verlangsamt Gegner auf die " + round(1 / (tuerme[id].effektStaerke[i] * (1 +
							tuerme[id].buffStaerken[2] / 100) + 1), 4) + "<span style='color: #ff0000'> " + round(speedChange, 4) +
						" </span> fache Geschwindigkeit. <br>";
					break;
				case 1:
					upgradeFenster.innerHTML += "Stunned Gegner <br>";
					break;
				case 2:
					upgradeFenster.innerHTML += "Verbrennt Gegner für " + round(tuerme[id].effektStaerke[i] * (1 + tuerme[id]
						.buffStaerken[2] / 100), 3) + "<span style='color: #ff0000'> +" + round(towertypen[typ][8][i] * 0.1 * (1 +
						tuerme[id].buffStaerken[2] / 100), 3) + " </span> Schaden/sec. <br>";
					break;
				case 3:
					upgradeFenster.innerHTML += "Vergiftet Gegner für " + round(tuerme[id].effektStaerke[i] * (1 + tuerme[id]
						.buffStaerken[2] / 100), 3) + "<span style='color: #ff0000'> +" + round(towertypen[typ][8][i] * 0.1 * (1 +
						tuerme[id].buffStaerken[2] / 100), 3) + " </span> Schaden/sec. <br>";
					break;
				case 5:
					upgradeFenster.innerHTML += "Trifft nahe Gegner zusätzlich für " + round(tuerme[id].effektStaerke[i] * (1 +
						tuerme[id].buffStaerken[2] / 100), 3) + "<span style='color: #ff0000'> +" + round(towertypen[typ][8][i] *
						0.1 * (1 + tuerme[id].buffStaerken[2] / 100), 3) + " </span> Schaden. <br>";
					break;
				case 6:
					upgradeFenster.innerHTML += "Springt zusätzlich bis zu " + tuerme[id].effektStaerke[i] +
						"<span style='color: #ff0000'> +1 </span> mal auf nahe Gegner über. <br>";
					break;
				case 7:
					upgradeFenster.innerHTML += "Verbesstert den Damage von nahen Türmen um (" + round(tuerme[id].effektStaerke[
						i] * (1 + tuerme[id].buffStaerken[2] / 100), 3) + "<span style='color: #ff0000'> +" + round(towertypen[
						typ][8][tuerme[id].effekt[i] - 7] * 0.1 * (1 + tuerme[id].buffStaerken[2] / 100), 3) + " </span>)%. <br>";
					break;
				case 8:
					upgradeFenster.innerHTML += "Verbesstert die Angriffsgeschwindigkeit von nahen Türmen um (" + round(tuerme[id]
							.effektStaerke[i] * (1 + tuerme[id].buffStaerken[2] / 100), 3) + " <span style='color: #ff0000'>+" +
						round(towertypen[typ][8][tuerme[id].effekt[i] - 7] * 0.1 * (1 + tuerme[id].buffStaerken[2] / 100), 3) +
						" </span>)%. <br>";
					break;
				case 9:
					upgradeFenster.innerHTML += "Verbesstert die Effektstärke, -dauer und -reichweite von nahen Türmen um (" +
						round(tuerme[id].effektStaerke[i] * (1 + tuerme[id].buffStaerken[2] / 100), 3) +
						"<span style='color: #ff0000'> +" + round(towertypen[typ][8][tuerme[id].effekt[i] - 7] * 0.1 * (1 + tuerme[
							id].buffStaerken[2] / 100), 3) + " </span>)%. <br>";
					break;
				case 10:
					upgradeFenster.innerHTML += "Verbesstert die Drehgeschwindigkeit und Reichweite von nahen Türmen um (" +
						round(tuerme[id].effektStaerke[i] * (1 + tuerme[id].buffStaerken[2] / 100), 3) +
						"<span style='color: #ff0000'> +" + round(towertypen[typ][8][tuerme[id].effekt[i] - 7] * 0.1 * (1 + tuerme[
							id].buffStaerken[2] / 100), 3) + " </span>)%. <br>";
					break;
			}
			if (tuerme[id].effekt[i] >= 5 && tuerme[id].effekt[i] <= 10) {
				if (typ != 9) {
					upgradeFenster.innerHTML += "Effektreichweite: " + round(tuerme[id].effektTime[i] * (1 + tuerme[id]
						.buffStaerken[2] / 100), 4) + "<span style='color: #ff0000'> +" + round(towertypen[typ][9][i] * 0.1 * (1 +
						tuerme[id].buffStaerken[2] / 100), 4) + " </span> <br>";
				}
			}
			else {
				upgradeFenster.innerHTML += "Effektdauer: " + round(tuerme[id].effektTime[i] / 100 * (1 + tuerme[id]
					.buffStaerken[2] / 100), 4) + "<span style='color: #ff0000'> +" + round(towertypen[typ][9][i] * 0.1 * (1 +
					tuerme[id].buffStaerken[2] / 100), 4) + " </span> sec <br>";
			}
		}
		if (tuerme[id].upgradeStufe == maxUpgrade - 1 && towertypen[typ][12]) { //wenn nächste stufe spezial upgrade
			upgradeFenster.innerHTML += "Turm Stufe 5 Spezialupgrade:<br>";
			switch (typ) {
				case 0:
					upgradeFenster.innerHTML +=
						"<span style='color: #ff0000'>Der Turm kann dann 2 Gegner gleichzeitig angreifen und zusätzliche 10 Reichweite</span><br>";
					break;
				case 1:
					upgradeFenster.innerHTML +=
						"<span style='color: #ff0000'>Der Turm kann dann durch Gegner hindurchschiesen und Trifft alle Gegner in einer Linie mit leich reduziertem Schaden je mehr Gegner vor im in der Linie sind</span><br>";
					break;
				case 2:
					upgradeFenster.innerHTML +=
						"<span style='color: #ff0000'>Der Turm erhält einen zusätzlichen permanenten Slow von 0,5% der sich bis zu 50% hochstacken kann (Stacked additiv)</span><br>";
					break;
				case 3:
					upgradeFenster.innerHTML += "<span style='color: #ff0000'>Der Turm erhält ein Stackbares Gift</span><br>";
					break;
				case 4:
					upgradeFenster.innerHTML +=
						"<span style='color: #ff0000'>Der Turm erhält zusätzlich eine 30% Chance einen zufälligen Gegner auf der Map mit 10fachem Feuerschaden und 5fachen Tickschaden anzugreifen</span><br>";
					break;
				case 5:
					upgradeFenster.innerHTML +=
						"<span style='color: #ff0000'>Der Turm erhält zusätzlich 100 Schaden je Hit auf den Selben Gegner außerdem versucht er nun immer den Gleichen Gegner anzugreifen und bekommt eine Stunzeit von 1,2 sec</span><br>";
					break;
				case 6:
					upgradeFenster.innerHTML +=
						"<span style='color: #ff0000'>Der Turm erhält einen Stunn der alle Gegner im Explosionsradius für 0,25 Sekunden stunnt</span><br>";
					break;
				case 7:
					upgradeFenster.innerHTML +=
						"<span style='color: #ff0000'>Der Turm erhält doppelten Schaden, doppelten Tickschaden und verliert dafür 33% der Effecktzeit</span><br>";
					break;
				case 8:
					upgradeFenster.innerHTML +=
						"<span style='color: #ff0000'>Der Turm erhält doppelten Schaden, doppelten Tickschaden und verliert dafür 33% der Effecktzeit</span><br>";
					break;
				case 9:
					switch (tuerme[id].spezialisierung) {
						case 0:
							upgradeFenster.innerHTML +=
								"<span style='color: #ff0000'>Der Turm erhält zusätzlich 6,25% Damagebuff und 37,5 Reichweite</span><br>";
							break;
						case 1:
							upgradeFenster.innerHTML +=
								"<span style='color: #ff0000'>Der Turm erhält zusätzlich 5% Attackspeedbuff und 37,5 Reichweite</span><br>";
							break;
						case 2:
							upgradeFenster.innerHTML +=
								"<span style='color: #ff0000'>Der Turm erhält zusätzlich 5% Effecktbuff und 37,5 Reichweite</span><br>";
							break;
						case 3:
							upgradeFenster.innerHTML +=
								"<span style='color: #ff0000'>Der Turm erhält zusätzlich 7,5% Reichweitenbuff und 50 Reichweite</span><br>";
							break;
					}
					break;
				case 10:
					upgradeFenster.innerHTML +=
						"<span style='color: #ff0000'>Der Angriff vom Turm kann doppelt so oft Überspringen</span><br>";
					break;
			}
		}
		if (typ != 2) {
			upgradeFenster.innerHTML += "Verursachter Schaden: " + round(tuerme[id].dmgDealed, 3) + "<br>";
		}
		else {
			upgradeFenster.innerHTML += "Gegner wurden von diesem Turm insgesamt für " + round(tuerme[id].dmgDealed / 100,
				1) + "sec verlangsamt<br>";
		}
		if (tuerme[id].drehGeschw != 0) {
			switch (tuerme[id].targetPrio) {
				case 0:
					var prio = "ersten"
					break;
				case 1:
					var prio = "letzten"
					break;
				case 2:
					var prio = "stärksten"
					break;
				case 3:
					var prio = "schwächsten"
					break;
				case 4:
					var prio = "schnellsten"
					break;
				case 5:
					var prio = "langsamsten"
					break;
			}
			upgradeFenster.innerHTML += "Der Turm ziehlt auf den " + prio + " Gegner<br>";
		}
		var upgradeButton = document.createElement("button"); //button um den turm upzugraden
		upgradeFenster.appendChild(upgradeButton);
		upgradeButton.innerHTML = "Upgrade";
		upgradeButton.style.position = 'relative';
		upgradeButton.style.left = (20) + 'px';
		upgradeButton.style.top = (0) + 'px';
		upgradeButton.addEventListener("click", function () {
			tuerme[id].upgrade();
		});
	}
	else { //wenn der turm auf maximaler stufe ist
		upgradeFenster.innerHTML += "Upgradestufe: " + tuerme[id].upgradeStufe +
			" <span style='color: #ff0000'>Max</span><br>";
		upgradeFenster.innerHTML += "Verkaufswert: " + tuerme[id].wert + "<br>";
		upgradeFenster.innerHTML += "Damage: " + round(tuerme[id].schaden * (1 + tuerme[id].buffStaerken[0] / 100), 3) +
			"<br>";
		upgradeFenster.innerHTML += "Nachladezeit: " + round(tuerme[id].angriffsZeit / (1 + tuerme[id].buffStaerken[1] /
			100), 3) + " sec <br>";
		upgradeFenster.innerHTML += "Reichweite: " + round(tuerme[id].reichweite * (1 + tuerme[id].buffStaerken[3] / 100),
			2) + " <br>";
		if (tuerme[id].drehGeschw != 0) {
			upgradeFenster.innerHTML += "Drehgeschwindigkeit: " + round(tuerme[id].drehGeschw * 100 * (1 + tuerme[id]
				.buffStaerken[3] / 100), 2) + " Grad/sec <br>";
		}
		else if (typ != 9) {
			upgradeFenster.innerHTML += "Trifft alle Gegner in Reichweite! <br>";
		}
		for (var i = 0; i < tuerme[id].effekt.length; i++) {
			switch (tuerme[id].effekt[i]) {
				case 0:
					upgradeFenster.innerHTML += "Verlangsamt Gegner auf die " + round(1 / (tuerme[id].effektStaerke[i] * (1 +
						tuerme[id].buffStaerken[2] / 100) + 1), 4) + " fache Geschwindigkeit. <br>";
					break;
				case 1:
					upgradeFenster.innerHTML += "Stunned Gegner <br>";
					break;
				case 2:
					upgradeFenster.innerHTML += "Verbrennt Gegner für " + round(tuerme[id].effektStaerke[i] * (1 + tuerme[id]
						.buffStaerken[2] / 100), 3) + " Schaden/sec. <br>";
					break;
				case 3:
					upgradeFenster.innerHTML += "Vergiftet Gegner für " + round(tuerme[id].effektStaerke[i] * (1 + tuerme[id]
						.buffStaerken[2] / 100), 3) + " Schaden/sec. <br>";
					break;
				case 5:
					upgradeFenster.innerHTML += "Trifft nahe Gegner zusätzlich für " + round(tuerme[id].effektStaerke[i] * (1 +
						tuerme[id].buffStaerken[2] / 100), 3) + " Schaden. <br>";
					break;
				case 6:
					upgradeFenster.innerHTML += "Springt zusätzlich bis zu " + tuerme[id].effektStaerke[i] +
						" mal auf nahe Gegner über. <br>";
					break;
				case 7:
					upgradeFenster.innerHTML += "Verbesstert den Damage von nahen Türmen um " + round(tuerme[id].effektStaerke[
						i] * (1 + tuerme[id].buffStaerken[2] / 100), 3) + "%. <br>";
					break;
				case 8:
					upgradeFenster.innerHTML += "Verbesstert die Angriffsgeschwindigkeit von nahen Türmen um " + round(tuerme[id]
						.effektStaerke[i] * (1 + tuerme[id].buffStaerken[2] / 100), 3) + "%. <br>";
					break;
				case 9:
					upgradeFenster.innerHTML += "Verbesstert die Effektstärke, -dauer und -reichweite von nahen Türmen um " +
						round(tuerme[id].effektStaerke[i] * (1 + tuerme[id].buffStaerken[2] / 100), 3) + "%. <br>";
					break;
				case 10:
					upgradeFenster.innerHTML += "Verbesstert die Drehgeschwindigkeit und Reichweite von nahen Türmen um " + round(
						tuerme[id].effektStaerke[i] * (1 + tuerme[id].buffStaerken[2] / 100), 3) + "%. <br>";
					break;
				case 15:
					upgradeFenster.innerHTML += "Vergiftet Gegner für " + round(tuerme[id].effektStaerke[i] * (1 + tuerme[id]
						.buffStaerken[2] / 100), 3) + " Schaden/sec (kann mit Gift von anderen Türmen stacken). <br>";
					break;
			}
			if (tuerme[id].effekt[i] >= 5 && tuerme[id].effekt[i] <= 11) {
				upgradeFenster.innerHTML += "Effektreichweite: " + round(tuerme[id].effektTime[i] * (1 + tuerme[id]
					.buffStaerken[2] / 100), 4) + " <br>";
			}
			else if (tuerme[id].effekt[i] != 4) {
				upgradeFenster.innerHTML += "Effektdauer: " + round(tuerme[id].effektTime[i] / 100 * (1 + tuerme[id]
					.buffStaerken[2] / 100), 4) + " sec <br>";
			}
		}
		if (towertypen[typ][12]) {
			switch (typ) {
				case 0:
					upgradeFenster.innerHTML += "Der Turm kann 2 Gegner gleichzeitig angreifen<br>";
					break;
				case 1:
					upgradeFenster.innerHTML +=
						"Der Turm kann durch Gegner hindurchschiesen und Trifft alle Gegner in einer Linie mit leich reduziertem Schaden je mehr Gegner vor im in der Linie sind<br>";
					break;
				case 2:
					upgradeFenster.innerHTML +=
						"Der Turm hat einen zusätzlichen permanenten Slow von 0,5% der sich bis zu Speed 50% hochstacken kann (Stacked additiv)<br>";
					upgradeFenster.innerHTML += "Der Turm hat insgesamt " + tuerme[id].effecktStacks +
						" permanente Slowstacks auf Gegner verteilt<br>";
					break;
				case 4:
					upgradeFenster.innerHTML +=
						"Der Turm hat zusätzlich eine 30% Chance einen zufälligen Gegner auf der Map mit 10fachem Feuerschaden und 5fachen Tickschaden anzugreifen<br>";
					break;
				case 5:
					upgradeFenster.innerHTML +=
						"Der Turm hat zusätzlich 100 Schaden je Hit auf den Selben Gegner außerdem versucht er nun immer den Gleichen Gegner anzugreifen<br>";
					break;
			}
		}
		if (tuerme[id].typ != 2) {
			upgradeFenster.innerHTML += "Verursachter Schaden: " + tuerme[id].dmgDealed + "<br>";
		}
		else {
			upgradeFenster.innerHTML += "Gegner wurden von diesem Turm insgesamt für " + (tuerme[id].dmgDealed / 100) +
				"sec verlangsamt<br>";
		}
		if (tuerme[id].drehGeschw != 0) {
			switch (tuerme[id].targetPrio) {
				case 0:
					var prio = "ersten"
					break;
				case 1:
					var prio = "letzten"
					break;
				case 2:
					var prio = "stärksten"
					break;
				case 3:
					var prio = "schwächsten"
					break;
			}
			upgradeFenster.innerHTML += "Der Turm ziehlt auf den " + prio + " Gegner<br>";
		}
	}
	if (tuerme[id].drehGeschw != 0) {
		var targetButton = document.createElement("button"); //button um das turm target zu ändern
		upgradeFenster.appendChild(targetButton);
		targetButton.innerHTML = "Target";
		targetButton.style.position = 'relative';
		if (tuerme[id].upgradeStufe < maxUpgrade) {
			targetButton.style.left = (50) + 'px';
		}
		else {
			targetButton.style.left = (20) + 'px';
		}
		targetButton.style.bottom = (0) + 'px';
		targetButton.addEventListener("click", function () {
			tuerme[id].changeTarget();
		});
	}
	var sellButton = document.createElement("button"); //button um den turm zu verkaufen
	upgradeFenster.appendChild(sellButton);
	sellButton.innerHTML = "Sell";
	sellButton.style.position = 'absolute';
	sellButton.style.right = (20) + 'px';
	sellButton.style.bottom = (0) + 'px';
	sellButton.addEventListener("click", function () {
		tuerme[id].sell();
	});
	var closeButton = document.createElement("button"); //button um das upgradefenster zu schliesen
	upgradeFenster.appendChild(closeButton);
	closeButton.innerHTML = "x";
	closeButton.style.position = 'absolute';
	closeButton.style.left = (upgradeFenster.scrollWidth - 23) + 'px';
	closeButton.style.top = (0) + 'px';
	closeButton.addEventListener("click", function () {
		hideUpgrade();
	});
	var upgradeFehlerDiv = document.createElement(
		"div"); //anzeige wenn evrsucht wird den turm upzugraden aber nicht genug geld vorhanden ist
	upgradeFehlerDiv.id = "fehler" + id;
	upgradeFehlerDiv.color = "red";
	upgradeFehlerDiv.innerHTML =
		"<span style='color: #ff0000'>Sie haben nicht genug Geld, <br>um diesen Turm upzugraden</span>";
	upgradeFenster.appendChild(upgradeFehlerDiv);
	upgradeFehlerDiv.hidden = true;

	if (x + upgradeFenster.offsetWidth > size * map[0].length) {
		x -= upgradeFenster.offsetWidth + 50;
	}
	if (x >= 0) {
		upgradeFenster.style.left = x + 'px';
	}
	else {
		upgradeFenster.style.right = '0px';
	}
	if (y + 100 + upgradeFenster.offsetHeight > screen.height) {
		upgradeFenster.style.bottom = '0px';
	}
	else {
		upgradeFenster.style.top = y + 'px';
	}
}

//funktion zum schliesen der Stats/Upgradestats/-kosten anzeige
function hideUpgrade() {
	if (upgradeFenster != undefined) {
		upgradeFenster.remove();
		upgradeFenster = undefined;
	}
}

function zeicheBild(canvas, objImg, winkel, clear, x = 0, y = 0, richtung2 = undefined, bildSize) {
	objContext = canvas.getContext('2d'); //wähle inhalt des canvas zum verändern aus
	objContext.translate(bildSize / 2 * Math.sqrt(2) * Math.sin((winkel - 45) * Math.PI / 180), -bildSize / 2 * Math.sqrt(
		2) * Math.cos((winkel - 45) * Math.PI /
		180
		)); // Ursprung verschieben damit bei drehung um den ursprung die mitte des bildes an der gewollten position bleibt
	objContext.translate(x + bildSize / 2, y + bildSize /
		2); // Ursprung verschieben um angegebene koordinaten +35 damit das bild in der mitte eines 70x70 felden ist
	objContext.rotate(winkel * Math.PI / 180); // Context drehen
	if (clear) {
		objContext.clearRect(0, 0, bildSize, bildSize); //löschen des inhalts des canvas wenn gewollt
	}
	objContext.drawImage(objImg, 0, 0, objImg.width, objImg.height, 0, 0, bildSize, bildSize); // Bild zeichnen
	objContext.rotate(-winkel * Math.PI /
		180
		); // objektContext zurücksetzen um die funktion bei dem nächsten aufrufen nicht verändern zu müssen (canvas speicher drehungen und verschiebungen und es gilt für jedes zeichnen nach der drehung/verschiebung)
	objContext.translate(-x - bildSize / 2, -y - bildSize /
		2
		); // deswegen müssen die drehungen und verschiebungen genau um die negative zahl nochmal ausgeführt werden um es zu resetten
	objContext.translate(-bildSize / 2 * Math.sqrt(2) * Math.sin((winkel - 45) * Math.PI / 180), bildSize / 2 * Math.sqrt(
		2) * Math.cos((winkel - 45) * Math.PI / 180));
	if (richtung2 !=
		undefined) { //für basic turm upgradestufe 5 bild wird 2 mal gezeichnet mit unterschiedlichen richtungen
		objContext.translate(bildSize / 2 * Math.sqrt(2) * Math.sin((richtung2 - 45) * Math.PI / 180), -bildSize / 2 * Math
			.sqrt(2) * Math.cos((richtung2 - 45) * Math.PI / 180));
		objContext.translate(x + bildSize / 2, y + bildSize / 2); //gleiche verschiebungen/drehungen wie oben
		objContext.rotate(richtung2 * Math.PI / 180);
		objContext.drawImage(objImg, 0, 0, bildSize, bildSize);
		objContext.rotate(-richtung2 * Math.PI / 180);
		objContext.translate(-x - bildSize / 2, -y - bildSize / 2);
		objContext.translate(-bildSize / 2 * Math.sqrt(2) * Math.sin((richtung2 - 45) * Math.PI / 180), bildSize / 2 * Math
			.sqrt(2) * Math.cos((richtung2 - 45) * Math.PI / 180));
	}
}

function zeichneBufferBild(canvas, objImg, winkel, clear = false, x = 0, y = 0, richtung2) {
	objContext = canvas.getContext('2d'); //wähle inhalt des canvas zum verändern aus
	objContext.translate(objImg.width / 2 * Math.sqrt(2) * Math.sin((winkel - 45) * Math.PI / 180), -objImg.width / 2 *
		Math.sqrt(2) * Math.cos((winkel - 45) * Math.PI / 180)
	); // Ursprung verschieben damit bei drehung um den ursprung die mitte des bildes an der gewollten position bleibt
	objContext.translate(x + 35, y +
		35); // Ursprung verschieben um angegebene koordinaten +35 damit das bild in der mitte eines 70x70 felden ist
	objContext.rotate(winkel * Math.PI / 180); // Context drehen
	if (clear) {
		objContext.clearRect(0, 0, 70, 70); //löschen des inhalts des canvas wenn gewollt
	}
	objContext.drawImage(objImg, 0, 0); // Bild zeichnen
	objContext.rotate(-winkel * Math.PI /
		180
		); // objektContext zurücksetzen um die funktion bei dem nächsten aufrufen nicht verändern zu müssen (canvas speicher drehungen und verschiebungen und es gilt für jedes zeichnen nach der drehung/verschiebung)
	objContext.translate(-x - 35, -y -
		35
		); // deswegen müssen die drehungen und verschiebungen genau um die negative zahl nochmal ausgeführt werden um es zu resetten
	objContext.translate(-objImg.width / 2 * Math.sqrt(2) * Math.sin((winkel - 45) * Math.PI / 180), objImg.width / 2 *
		Math.sqrt(2) * Math.cos((winkel - 45) * Math.PI / 180));
	if (richtung2 !=
		undefined) { //für basic turm upgradestufe 5 bild wird 2 mal gezeichnet mit unterschiedlichen richtungen
		objContext.translate(objImg.width / 2 * Math.sqrt(2) * Math.sin((richtung2 - 45) * Math.PI / 180), -objImg.width /
			2 * Math.sqrt(2) * Math.cos((richtung2 - 45) * Math.PI / 180));
		objContext.translate(x + 35, y + 35); //gleiche verschiebungen/drehungen wie oben
		objContext.rotate(richtung2 * Math.PI / 180);
		objContext.drawImage(objImg, 0, 0);
		objContext.rotate(-richtung2 * Math.PI / 180);
		objContext.translate(-x - 35, -y - 35);
		objContext.translate(-objImg.width / 2 * Math.sqrt(2) * Math.sin((richtung2 - 45) * Math.PI / 180), objImg.width /
			2 * Math.sqrt(2) * Math.cos((richtung2 - 45) * Math.PI / 180));
	}
}
//funktion zum auswählen eines towers um ihn zu bauen
function select(evt,
	id
	) { //id enthält entweder die id des zu wählenden towers oder undefined wennn aufruf durch eventlistener (dann ist unter this. das objekt des angeklickten events abgespeichert und id wird dann aus dessen namen gelesen)
	deselect(); //falls schon anderer tower augewählt ist lösche die auswahl
	if (id == undefined) { //erkennung der id und abspeichern in selected
		selected = this.name * 1;
	}
	else {
		selected = id;
	}
	if (selected == towertypen.length - 1) {
		var preis = 0;
		for (var i = 0; i < towertypen.length - 1; i++) {
			preis += parseInt(towertypen[i][6] * preisMult);
		}
		preis = parseInt(preis / (towertypen.length - 1) * 0.95);
	}
	else {
		var preis = parseInt(towertypen[selected][6] * preisMult);
	}
	if (preis <= geld) { //ist genug geld vorhanden
		ladeBild('Bilder/Tower/base2.png', towerSelect[selected][0], 0); //zeichne bild zum anzeigen was ausgewählt ist
	}
	else { //falls nichts ausgewählt werden konnte wegen zu wenig geld (oder verlerhafter aufruf der funktion)
		selected = -1;
	}
}

//funktion zum löschen der auswahl
function deselect() {
	selected = -1;
	for (var i = 0; i < towertypen.length; i++) {
		towerSelect[i][0].getContext('2d').clearRect(0, 0, size, size);
	}
}

//funktion zum bauen eines turmes
function build() {
	hideUpgrade();
	var selectRandom = false;
	if (selected != -1) { //ist ein turmtyp ausgewählt?
		if (selected == towertypen.length - 1) {
			selectRandom = true;
			var preis = 0;
			for (var i = 0; i < towertypen.length - 1; i++) {
				preis += parseInt(towertypen[i][6] * preisMult);
			}
			preis = parseInt(preis / (towertypen.length - 1) * 0.95);
		}
		else {
			var preis = parseInt(towertypen[selected][6] * preisMult);
		}
		if (preis <= geld) { //ist genug geld vorhanden?
			var coordinaten = this.name.split(
				','
				); //coordinaten werden aus dem angeklickten map canvas gelesen (jedes mapbild enthält im namen spaltennummer und zeilennummer mit komma getrennt)
			if (selected == 9) { //wenn Supporttower öffne place menü
				upgradeFenster = document.createElement("div");
				document.body.appendChild(upgradeFenster);
				upgradeFenster.style.position = 'absolute';
				var x = coordinaten[0] * (size - 1.2);
				var y = coordinaten[1] * (size - 1.2);
				upgradeFenster.style.backgroundColor = '#d5d0ffd0';
				upgradeFenster.style.zIndex = 10;
				upgradeFenster.innerHTML +=
					"<img id='typ0' src='Bilder/Icons/schaden.png' title='Schaden'><img id='typ1' src='Bilder/Icons/angriffsGeschwindikeit.png' title='Angriffsgeschwindigkeit'><br>";
				upgradeFenster.innerHTML += "Welchen Suportturm<br>willst du bauen?<br>";
				upgradeFenster.innerHTML +=
					"<img id='typ2' src='Bilder/Icons/effeckt.png' title='Effeckt'><img id='typ3' src='Bilder/Icons/reichweite.png' title='Reichweite und Drehgeschwindigkeit'><br>";
				for (var i = 0; i < 4; i++) {
					document.getElementById("typ" + i).addEventListener("click", function () {
						addGeld(-preis); //kosten abziehen
						var number = 0; //überprüfe im tuerme array welcher index der kleinste freie ist
						while (tuerme[number] != undefined) {
							number++;
						}
						var spezialisierung = this.id.charAt(3);
						tuerme[number] = new Turm(coordinaten[0], coordinaten[1], 9, number, spezialisierung);
						tuerme.forEach((item, i) => {
							if (item != undefined && item.typ == 9) {
								item.buffTuerme();
							}
						});
						if (strg) {
							tuerme[number].upgrade();
						}
						hideUpgrade(); //
					});
				}
				var closeButton = document.createElement("button"); //button um das fenster zu schliesen
				upgradeFenster.appendChild(closeButton);
				closeButton.innerHTML = "x";
				closeButton.style.position = 'absolute';
				closeButton.style.right = '0px';
				closeButton.style.top = '0px';
				closeButton.addEventListener("click", function () {
					hideUpgrade();
				});
				if (x + upgradeFenster.offsetWidth > size * map[0].length) {
					upgradeFenster.style.right = '0px';
				}
				else {
					upgradeFenster.style.left = x + 'px';
				}
				if (y + 100 + upgradeFenster.offsetHeight > screen.height) {
					upgradeFenster.style.bottom = '0px';
				}
				else {
					upgradeFenster.style.top = y + 'px';
				}
			}
			else { //ansonste plaziere turm
				if (selected == towertypen.length - 1) {
					selected = Math.floor(Math.random() * (towertypen.length - 1));
				}
				addGeld(-preis); //kosten abziehen
				var number = 0; //überprüfe im tuerme array welcher index der kleinste freie ist
				while (tuerme[number] != undefined) {
					number++;
				}
				if (selected == 9) {
					tuerme[number] = new Turm(coordinaten[0], coordinaten[1], selected, number, Math.floor(Math.random() * 4));
				}
				else {
					tuerme[number] = new Turm(coordinaten[0], coordinaten[1], selected,
						number); //erstelle neuen turm mit koordinaten typ und id
				}
				tuerme.forEach((item, i) => {
					if (item != undefined && item.typ == 9) {
						item.buffTuerme();
					}
				});
				if (strg) {
					for (var i = 0; i < maxUpgrade; i++) {
						tuerme[number].upgrade();
					}
					hideUpgrade();
				}
				//if 1/1000 chance full upgraded bei randomturm??
			}
		}
		if (!shift || geld < preis) { //wenn shift nicht gedrückt ist wird die auswahl des towers gelöscht nach bau
			deselect();
		}
		else if (selectRandom) {
			selected = towertypen.length - 1;
		}
	}
}

//spawned einen gegner
function spawn(typ, localLebenMult) {
	var number = 0; //überprüfe im gegner array welcher index der kleinste freie ist
	while (gegner[number] != undefined) {
		number++;
	}
	gegner[number] = new Gegner(number, typ, localLebenMult *
		lebenMult); //erzeugt einen neuen gegner und übergiebt id, typ und lebensmultiplikator
	if (multiStartTyp == 0 || multiStartTyp == 3) {
		spawnPointNumber++;
		if (spawnPointNumber >= start[0].length) {
			spawnPointNumber = 0;
		}
		else {
			if (multiStartTyp == 3) {
				spawn(typ, localLebenMult);
			}
		}
	}
	return number;
}

//funktion um geld zu bekommen/zu zahlen
function addGeld(amount) {
	geld += amount; //speichere neuen geld wert ab
	if (amount > 0) { //bekommt der spieler geld?
		for (var i = 0; i < geldAnzeige.length; i++) {
			if (geldAnzeige[i].innerHTML * 1 <= geld) {
				geldAnzeige[i].style.color =
					"darkgreen"; //und wechsle die farbe auf grün wenn nach dem geld bekommen nun genug geld da ist um es sich zu leisten
			}
		}
	}
	else if (amount < 0) {
		if (geld <
			0) { //wenn man mehr geld gezahlt hat als vorhanden war (sollte nicht vorkommen auser durch aufruf in der konsole)
			console.log("Zu wenig Geld!!!");
			geld = 0;
		}
		for (var i = 0; i < geldAnzeige.length; i++) {
			if (geldAnzeige[i].innerHTML * 1 > geld) {
				geldAnzeige[i].style.color =
					"red"; //und wechsle die farbe auf rot wenn nach dem zahlen nun nicht mehr genug geld da ist um es sich zu leisten
			}
		}
	}
	document.getElementById("Geld").innerHTML = geld; //update geldanzeige
}

window.requestAnimationFrame(update); //intervall für die spielupdates (50 mal in der sec)

//funktion für einen spieltick
async function update() {
	tickSpeed = Math.min(queue.delta.delta*60, 3);
	// console.log(tickSpeed);
	promise = [];
	updateFinish = false;
	if (!gamePause && wellenEnde != 0) { //keine ausführung wenn das spiel pausiert ist oder zwischen den wellen
		for (var i = gegner.length - 1; i >= 0; i--) { //gegner tick
			if (gegner[i] != undefined) {
				gegner[i].bewegen();
				if (spielerLeben <= 0) { //beendet das update wenn das spiel verlohren ist
					return;
				}
			}
		}
		tuerme.forEach((item, i) => { //turm tick
			if (item != undefined) {
				item.zielen()
			}
		});
		gegner.forEach((item, i) => {
			if (item != undefined) {
				item.shieldedFrom = [];
			}
		});
		if (gegner.length == 0 && roundTime > wellenEnde) { //wenn welle zuende ist (alle gegener tot)
			if (startHover) { //pausebutton wird zum startbutton
				startButton.src = "Bilder/Buttons/startHover.png";
			}
			else {
				startButton.src = "Bilder/Buttons/start.png";
			}
			if (teilWellenNummer == gegnerWellen.length ||
				(anzahlWellen == wellenNummer && schwierigkeit != 0)
				) { //wenn die lettze teilwelle um ist nachricht dass das spiel gewonnen ist
				localStorage.removeItem("saveCode");
				spielEnde = true;
				var gain = addCompletedMap();
				var text = "Du hast das Spiel Gewonnen!\n";
				if (gain[0] > 0) {
					text += "Für das Gewinnen der Map bekommst du " + gain[0] + " Skillpunkte.\n";
				}
				if (spielerLeben == 100 && gain[1] > 0) {
					text += "Für das Gewinnen ohne Leben zu verlieren bekommst du " + gain[1] + " Skillpunkte.";
				}
				alert(text);
			}
			else {
				objContext = gegnerBild.getContext('2d'); //löschen des gegnerbildes
				objContext.clearRect(0, 0, gegnerBild.width, gegnerBild.height);
				objContext = gegnerBildHidden.getContext('2d');
				objContext.clearRect(0, 0, gegnerBild.width, gegnerBild.height);
				addGeld(parseInt(10 * Math.pow(1.04, wellenNummer))); //runden geld bonus wird vergeben
				wellenNummer++;
				document.getElementById("Welle").innerHTML = wellenNummer + "/" + anzahlWellen; //update wellenanzeige
				wellenEnde = 0; //stelle werte auf zwischen den wellen
				roundTime = -1000;
				tuerme.forEach((item, i) => { //resette angriffsZeit aller türme
					if (item != undefined) {
						item.letzterAngriff = -1000;
						item.letzterAngriff2 = -1000;
					}
				});
				save();
				if (autoStart) { //wenn autostart ausgewählt wurde starte nächste welle
					startAndPause();
				}
			}
		}
		if (roundTime >= 0) { //wenn welle nicht vorbei ist
			draw(); //zeine gegner neu
			roundTime += gameSpeed * tickSpeed; //updade rundenzeit
			for (var i = timers.length - 1; i >= 0; i--) { //ausführung aller timer
				item = timers[i];
				if (item[1] <= roundTime) { //wenn timerzeit abgelaufen ist
					item[0](); //füge gespeicherte funktion aus
					timers.splice(i, 1); //lösche timer
				}
			}
			for (var i = intervals.length - 1; i >= 0; i--) { //ausführung aller intervalle
				item = intervals[i];
				if (item[2] + item[3] <= roundTime) { //wenn nächster aufruf des interwalls fällig ist
					item[0](item[1]); //führe funktion des intervalls aus mit übergabewerte
					item[2] += item[3]; //update letzte ausführungszeit
					item[4]--; //update anzahl der aufrufe
					if (item[4] <= 0) { //wenn anzahl verblibener aufrufe = 0
						intervals.splice(i, 1); //lösche intervall
					}
				}
			}
		}
	}
	if (!spielEnde) {
		Promise.all(promise).then(() => {
			window.requestAnimationFrame(update);
		});
	}
	queue.update();
	// if (loading == 0 && !spielEnde) {
	//   window.requestAnimationFrame(update);
	// }
	// else {
	//   updateFinish = true;
	// }
}

function addCompletedMap() {
	var gain = [0, 0]
	completedMaps = loadCompletedMaps();
	if (completedMaps[mapId - 1] < schwierigkeit) {
		gain[0] = skillPunkteBeiSchwierigkeit[schwierigkeit] - skillPunkteBeiSchwierigkeit[completedMaps[mapId - 1]];
		skillPunkte += gain[0];
		completedMaps[mapId - 1] = schwierigkeit;
		saveSkillTree()
	}
	localStorage.setItem('completedMaps', JSON.stringify(completedMaps));
	flawlessMaps = loadFlawlessMaps();
	if (spielerLeben == 100 && flawlessMaps[mapId - 1] < schwierigkeit) {
		gain[1] = skillPunkteBeiSchwierigkeit[schwierigkeit] - skillPunkteBeiSchwierigkeit[flawlessMaps[mapId - 1]];
		skillPunkte += gain[1];
		flawlessMaps[mapId - 1] = schwierigkeit;
		saveSkillTree()
	}
	localStorage.setItem('flawlessMaps', JSON.stringify(flawlessMaps));
	return gain;
}

function loadCompletedMaps() {
	var completedMapsString = localStorage.getItem('completedMaps');
	if (completedMapsString != null) {
		var completedMaps = JSON.parse(completedMapsString);
		if (anzahlMaps < completedMaps.length) {
			console.log("fehlerhafter completedMapsString");
			return;
		}
	}
	else {
		completedMaps = [];
	}
	for (var i = completedMaps.length; i < anzahlMaps; i++) {
		completedMaps[i] = 0;
	}
	return completedMaps;
}

function loadFlawlessMaps() {
	var flawlessMapsString = localStorage.getItem('flawlessMaps');
	if (flawlessMapsString != null) {
		var flawlessMaps = JSON.parse(flawlessMapsString);
		if (anzahlMaps < flawlessMaps.length) {
			console.log("fehlerhafter flawlessMapsString");
			return;
		}
	}
	else {
		flawlessMaps = [];
	}
	for (var i = flawlessMaps.length; i < anzahlMaps; i++) {
		flawlessMaps[i] = 0;
	}
	return flawlessMaps;
}

//zeichne gegner
function draw() {
	objContext = gegnerBild.getContext('2d');
	//lösche altes gegnerBild
	objContext.clearRect(0, 0, gegnerBild.width, gegnerBild.height);
	//bilde neues gegnerBild aus zwischenspeicher ab (update des bildes ist um einen spieltick verzögert damit der zwischenspeicher zeit hat die teilbilder zu laden daher vor update des zwischenspeichers)
	objContext.drawImage(gegnerBildHidden, 0, 0);
	objContext2 = gegnerBildHidden.getContext('2d');
	//lösche bild im zwischenspeicher
	objContext2.clearRect(0, 0, gegnerBild.width, gegnerBild.height);
	gegner.forEach((item, i) => { //lade jedes gegner bild in den zwischenspeicher
		if (gegner[i] != undefined) {
			ladeBild(item.src, gegnerBildHidden, item.richtung * 90, false, item.posx, item.posy);
		}
	});
}

//erzeugen einer neuen schadensnummer
function numbers(num, x, y, color = "white") {
	if (typeof num === "number")
		num = round(num, 2);
	if (num.toString !== undefined)
		num = num.toString();
	TCN.spawnText(num, x, y, color);
}

function UpdateQueue() {
	this.queue = [];
	this.delta = new Delta();
	this.update = () => {
		this.delta.step();
		this.queue.forEach(item => item.update());
	};
}

function Delta() {
	this.start = new Date().getTime();
	this.last = new Date().getTime();
	this.delta = 0;
	this.step = () => {
		const now = new Date().getTime();
		this.delta = (now - this.last) / 1000.0;
		this.last = now;
	}
}
// Source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function TextCanvas() {
	/// canvas besorgen
	this.canvas = document.querySelector("#NumberCanvas");
	this.canvas.width = size * map[0].length;
	this.canvas.offsetLeft = (this.canvas.height = size * map.length);
	this.ctx = this.canvas.getContext("2d");
	this.textElemente = [];
	this.spawnQueue = [];
	this.performanceLimiter = 200;
	this.spawnText = (text, x, y, color) => {
		this.spawnQueue.push(new(function () {
			this.text = text.toString().replace("<br>", "\n");
			this.progress = 1.0;
			this.curve = (prog = this.progress) => Math.sqrt(Math.sin(prog ** 2 * Math.PI));
			this.x = x;
			this.y = y + Math.random() * 5;
			this.color = resolveColor(color);
			this.st = (new Date().getTime() - queue.delta.start) / 1000 - Math.random() * 1000;
			this.colorize = () => `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.curve()})`;
		})());
	};
	this.update = () => {
		const delta = queue.delta.delta;
		shuffleArray(this.spawnQueue);
		this.spawnQueue.forEach((item,) => this.textElemente.push(item));
		this.spawnQueue = [];
		this.textElemente = this.textElemente
			.map((el) => {
				el.progress -= delta;
				return el;
			}).filter((el) => el.progress > 0)
			.filter((_, index) => index < this.performanceLimiter);

		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.font = size / 4 + "px 'Arial'";
		this.ctx.lineWidth = 3;

		const start = new Date().getTime();

		this.textElemente
			.map((el) => {
				const x = el.x + Math.sin(el.st + el.progress * 5) * size / 15 + size / 2;

				const yMod = el.curve(Math.min(el.progress, 0.7));
				const y = el.y - (1 - yMod) * size + size;

				const color = el.colorize();
				const offset = this.ctx.measureText(el.text).width / 2;
				return {
					el,
					x,
					y,
					color,
					offset
				}
			})
			.forEach((el) => {
				const x = Math.floor(el.x - el.offset);
				const y = Math.floor(el.y - size / 2);

				this.ctx.strokeStyle = `rgba(0, 0, 0, ${el.el.curve() / 1.5})`;
				this.ctx.strokeText(el.el.text, x, y);
				this.ctx.fillStyle = el.color;
				this.ctx.fillText(el.el.text, x, y);
			});

		const renderTime = (new Date().getTime() - start);
		if (renderTime > 0) {
			this.performanceLimiter = Math.max(Math.floor(Math.max(this.textElemente.length, 1) / renderTime) * 30, 20); // min ~33 fps
		}
		if (this.performanceLimiter === 0) {
			console.error("SCHEIßE");
		}
	};
}

function teslaEffekt(points, effektStaerke, effektReichweite, ursprung, targetGegner, momentanerGegner, schaden =
	true) {
	var target = -1;
	var targetEntfernung = -1;
	for (var i = targetGegner.length - 1; i >= 0; i--) { //überprüfe jeden gegner
		if (targetGegner[i] != undefined && targetGegner[i].leben >= 0 && targetGegner[i].id != momentanerGegner.id) {
			var entfernung = getEntfernung(targetGegner[i], momentanerGegner); //entfernung zum gegner
			if (entfernung <= effektReichweite) {
				if (gegner[target] == undefined || targetEntfernung > entfernung) {
					target = targetGegner[i].id;
					targetEntfernung = entfernung;
				}
			}
		}
		else {
			targetGegner.splice(i, 1);
		}
	}
	if (gegner[target] != undefined) {
		effektStaerke--;
		if (effektStaerke > 0) {
			bullet(momentanerGegner.posx, momentanerGegner.posy, gegner[target].posx, gegner[target].posy, 100 / gameSpeed);
			teslaEffekt(points, effektStaerke, effektReichweite, ursprung, targetGegner, gegner[target]);
		}
	}
	if (schaden) {
		momentanerGegner.damage(points, [], [], [], ursprung);
	}
}

function getEntfernung(obj1, obj2) {
	return Math.sqrt(Math.pow((obj1.posx - obj2.posx), 2) + Math.pow((obj1.posy - obj2.posy), 2)) * 70 / size;
}

function resizekoords(x, y) {
	var wi = 0;
	var hei = 0;
	wi = window.innerWidth * 0.98 - Math.max((45 + 77 + 123) * 1.07, window.innerWidth * 0.3);
	hei = window.innerHeight * 0.98 - 50;
	return Math.floor(wi / x > hei / y ? hei / y : wi / x);
	//diese Funktion gibt die richtige Grösse aus
}

scriptLoaded++;
