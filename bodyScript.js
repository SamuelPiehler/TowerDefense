
//setzt die map größe und map part größe
var size = Math.floor(resizekoords(map[0].length, map.length));
var mapMaxX = size * map[0].length;
var mapMaxY = size * map.length;

//Canvas in dem alle Gegner Angezeigt werden
var gegnerBild = document.createElement('canvas');
document.body.appendChild(gegnerBild);
gegnerBild.width = size*map[0].length;
gegnerBild.height = size*map.length;
gegnerBild.style.position = 'absolute';
gegnerBild.style.left = '10px';
gegnerBild.style.top = '50px';
gegnerBild.style.zIndex = 1;
gegnerBild.style.pointerEvents = "none";
//canvas zur zeichnung aller gegner wird nicht selbst angezeigt sondern nur wenn fertig gezeichnet in gegnerbild kopiert verhinder blinken von gegnern beim löschen und neuzeichnen
var gegnerBildHidden = document.createElement('canvas');
gegnerBildHidden.width = size*map[0].length;
gegnerBildHidden.height = size*map.length;

//erzeugt den Tower select bereich
var towerSelect = [];
if (size*1.7*6+100+size < screen.height) {
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
    var y = selectSize*1.7*i+100;
    if (i >= 6) {
      x += 120;
      y -= 6*selectSize*1.7;
    }
    towerSelect[i][j].style.left = x +'px';
    towerSelect[i][j].style.top = y +'px';
    towerSelect[i][j].style.zIndex = j;
  }
  ladeBild(towertypen[i][1], towerSelect[i][1], 0, false, 0, 0, undefined, selectSize);
  towerSelect[i][1].name = i;
  towerSelect[i][1].addEventListener('click', select);
  towerSelect[i][1].addEventListener('mouseover', function(evt){showStats(evt, this);});
  towerSelect[i][1].addEventListener('mouseleave', function(){hideStats();});
}

//erzeugt start/pause button mit eventlistener
var startButton = document.createElement("img");
document.body.appendChild(startButton);
startButton.src = "Bilder/Buttons/start.png";
startButton.className  = "button";
startButton.style.position = 'absolute';
startButton.style.left = (size * map[0].length) + Math.min(document.body.offsetWidth - size * map[0].length - (45 + 77 + 123), selectSize*3) / 4 + 5 + 'px';
// startButton.style.left = (size * (map[0].length+1.5))+'px';
startButton.style.top = 50+'px';
startButton.addEventListener("click", function(){
  startAndPause();  //funktion zum wechseln zwischen start und pause (anzeige von button und pause variable)
});
startButton.addEventListener("mouseover", function(){
  startHover = true;
  if (wellenEnde == 0 || gamePause) {
    startButton.src = "Bilder/Buttons/startHover.png";
  }
  else {
    startButton.src = "Bilder/Buttons/pauseHover.png";
  }
});
startButton.addEventListener("mouseleave", function(){
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
  if (wellenEnde == 0) {    //wenn zwischen den wellen
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
speedButton.className  = "button";
speedButton.style.position = 'absolute';
speedButton.style.left = (size * map[0].length) + Math.min(document.body.offsetWidth - size * map[0].length - (45 + 77 + 123), selectSize*3) / 2 + 45 + 5 + 'px';
// speedButton.style.left = (size * (map[0].length+2) + 45)+'px';
speedButton.style.top = 50+'px';
speedButton.addEventListener("click", function(){
  changeGameSpeed();
});
speedButton.addEventListener("mouseover", function(){
  speedHover = true;
  if (gameSpeed == 2) {
    speedButton.src = "Bilder/Buttons/speedx1Hover.png";
  }
  else {
    speedButton.src = "Bilder/Buttons/speedx3Hover.png";
  }
});
speedButton.addEventListener("mouseleave", function(){
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
autoStartButton.className  = "button";
autoStartButton.style.position = 'absolute';

autoStartButton.style.left = (size * map[0].length) + Math.min(document.body.offsetWidth - size * map[0].length - (45 + 77 + 123), selectSize*3) / 4 * 3 + 45 + 77 + 5 + 'px';
// autoStartButton.style.left = (size * (map[0].length+2.5) + 45 + 77)+'px';
autoStartButton.style.top = 50+'px';
autoStartButton.addEventListener("click", function(){
  autoStart = !autoStart;
  if (autoStart) {
    autoStartButton.src = "Bilder/Buttons/autoStartAnHover.png";
  }
  else {
    autoStartButton.src = "Bilder/Buttons/autoStartAusHover.png";
  }
});
autoStartButton.addEventListener("mouseover", function(){
  if (autoStart) {
    autoStartButton.src = "Bilder/Buttons/autoStartAnHover.png";
  }
  else {
    autoStartButton.src = "Bilder/Buttons/autoStartAusHover.png";
  }
});
autoStartButton.addEventListener("mouseleave", function(){
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
      if (evt.key*1 >= 1 && evt.key*1 <= 9) { //wählt tower zum bauen aus je nach gedückter zahl
        select(false, evt.key-1);
      }
      break;
  }
}
function tasteLosgelassen(evt) {
  if (evt.key == "Shift") {
    shift = false;
  }
}
//die maps werde nach dem  Neuen Formart  gelanden
function buildMapNeu() {
  for (var i = 0; i < map.length; i++) {  //mapzeile
    for (var j = 0; j < map[i].length; j++) { //mapspalte
      map[i][j][2] = document.createElement('canvas');
      mapDiv.appendChild(map[i][j][2]);
      map[i][j][2].width = size;
      map[i][j][2].height = size;
      map[i][j][2].style.position = 'absolute';
      map[i][j][2].style.left = (size*j)+'px';
      map[i][j][2].style.top = (size*i)+'px';
      if (Array.isArray(map[i][j][1])) {
        ladeBild(map[i][j][1][0], map[i][j][2], parseInt(Math.random()*4)*90);
        map[i][j][3] = document.createElement('canvas');
        mapDiv.appendChild(map[i][j][3])
        map[i][j][3].width = size;
        map[i][j][3].height = size;
        map[i][j][3].style.position = 'absolute';
        map[i][j][3].style.left = (size*j)+'px';
        map[i][j][3].style.top = (size*i)+'px';
        ladeBild(map[i][j][1][1], map[i][j][3], 0);
      }
      else {
        ladeBild(map[i][j][1], map[i][j][2], parseInt(Math.random()*4)*90);
      }
      if (map[i][j][0] >= 5 && map[i][j][0] <= 8) {
        start[0].push(i);
        start[1].push(j);
      }
      else if (map[i][j][0] == 0) {
        map[i][j][2].name = j+','+i;
        map[i][j][2].addEventListener('click', build);
      }
    }
  }
}
//
//erzeuge mapbild
function buildMap() {
  for (var i = 0; i < map.length; i++) {  //mapzeile
    for (var j = 0; j < map[i].length; j++) { //mapspalte
      map[i][j][2] = document.createElement('canvas');
      mapDiv.appendChild(map[i][j][2]);
      map[i][j][2].width = size;
      map[i][j][2].height = size;
      map[i][j][2].style.position = 'absolute';
      map[i][j][2].style.left = (size*j)+'px';
      map[i][j][2].style.top = (size*i)+'px';
      if (map[i][j][0] >= 1 && map[i][j][0] <= 4) {
        ladeBild('Bilder/Map/weg1.jpg', map[i][j][2], 0);
      }
      else if (map[i][j][0] >= 5 && map[i][j][0] <= 8) {
        ladeBild('Bilder/Map/start.png', map[i][j][2], 0);
        start[0].push(i);
        start[1].push(j);
      }
      else if (map[i][j][0] >= 9 && map[i][j][0] <= 12) {
        ladeBild('Bilder/Map/ziel1.png', map[i][j][2], 0);
      }
      else if (map[i][j][0] == 0) {
        ladeBild('Bilder/Map/feld1.jpg', map[i][j][2], 0);
        map[i][j][2].name = j+','+i;
        map[i][j][2].addEventListener('click', build);
      }
      else if (map[i][j][0] == -1) {
        ladeBild('Bilder/Map/feld1.jpg', map[i][j][2], 0);
        map[i][j][3] = document.createElement('canvas');
        mapDiv.appendChild(map[i][j][3])
        map[i][j][3].width = size;
        map[i][j][3].height = size;
        map[i][j][3].style.position = 'absolute';
        map[i][j][3].style.left = (size*j)+'px';
        map[i][j][3].style.top = (size*i)+'px';
        var bildNummer = parseInt(Math.random()*3+1);
        ladeBild('Bilder/Map/stein' + bildNummer + '.png', map[i][j][2], 0);
      }
      else if (map[i][j][0] == -2) {
        ladeBild('Bilder/Map/weg1.jpg', map[i][j][2], 0);
      }
    }
  }
}

//warte bis bild geladen und zeichne es dann (um this. variablen für onload vorzubereiten weil this.bei onload eine andere bedeutung hat)
function ladeBild(src, canvas, richtung, clear = false, x = 0, y = 0, richtung2 = undefined, bildSize = size) {
  if (bildBuffer[src] == undefined) {     //wenn das bild noch nicht im buffer
    bildBuffer[src] = document.createElement('canvas');   //erzeuge neues kanvas im buffer in dem das bild dann abgespeichert wird
    bildBuffer[src].width = 70;
    bildBuffer[src].height = 70;
    bild = new Image();
    loading++;
    bild.onload = function(){
      zeichneBufferBild(bildBuffer[src], this, 0);    //zeiche das bild in den buffer
      zeicheBild(canvas, bildBuffer[src], richtung, clear, x, y, richtung2, bildSize);    //hole das bild aus dem buffer und zeichne es
      if (loading == 1) {   //wenn alle buffer bilder fertig geladen sind
        waitForBildLoad.forEach((item, i) => {    //zeichne alle bilder in der warteliste
          item();
        });
        waitForBildLoad = [];
        if (updateFinish && !spielEnde) {
          window.requestAnimationFrame(update);
        }
      }
      loading--;    //gibt an das ein weiteres bufferbild fertig geladen hat
    };
    bild.src = src;
    bild.onerror = function () {
      console.error("missing img!!", src, "loading = " + loading);
      if (loading == 1) {   //wenn alle buffer bilder fertig geladen sind
        waitForBildLoad.forEach((item, i) => {    //zeichne alle bilder in der warteliste
          item();
        });
        waitForBildLoad = [];
        if (updateFinish && !spielEnde) {
          window.requestAnimationFrame(update);
        }
      }
      loading--;    //gibt an das ein weiteres bufferbild fertig geladen hat
    };
  }
  else {
    if (loading == 0) {
      zeicheBild(canvas, bildBuffer[src], richtung, clear, x, y, richtung2, bildSize);
    }
    else {    //wenn buffer gerade ein neues bild läd warte bis dieser fertig ist und zeichne das bild erst dann
      waitForBildLoad.push(function(){zeicheBild(canvas, bildBuffer[src], richtung, clear, x, y, richtung2, bildSize)});
    }
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
  var nummer = teilWellenNummer;  //nummer der zu behandelnden Teilwelle
  do {
    wellenEnde = Math.max(wellenEnde, roundTime + warten + ((gegnerWellen[nummer][4]+2) * 100));  //setzt eine zeit wann die welle frühestens zuende sein kann (wann startet letzte teilwelle + 2 sec sicherheit 1sec bei letzter teilwelle einer gesamtwelle)
    timers.push([spawnTeilWelle, roundTime + warten]);  //setzt einen timer wann die teilwellen gestartet werden sollen
    warten += Math.max(0, gegnerWellen[nummer][4] * 100);
    nummer++;
  } while (gegnerWellen[nummer-1][4] != -1);  //ist die teilwelle die letzte der gesamtwelle?
}

//spawned gegner der Teilwelle
function spawnTeilWelle() {
  var welle = gegnerWellen[teilWellenNummer];
  wellenEnde = Math.max(wellenEnde, roundTime + (welle[3]*100*(welle[2]-0.5)));  //setzt eine zeit wann die welle frühestens zuende sein kann (wann spawned letzter gegner der teilwelle)
  spawn(welle[0], welle[1]);  //spawned ersten gegner der teilwelle
  if (welle[2] > 1) {
    intervals.push([function(übergabe){spawn(übergabe[0], übergabe[1]);}, [welle[0], welle[1]], roundTime, welle[3]*100, welle[2] - 1]);  //intervall wann gegner dieser teilwelle spawnen
  }
  teilWellenNummer++;
}

//statfenster für das towerselect menü wenn tower gehovert werden zum bauen
function showStats(evt, object) {
  statFenster = document.createElement("div");
  document.body.appendChild(statFenster);
  statFenster.style.position = 'absolute';
  var x = evt.srcElement.offsetLeft + selectSize*0.9;
  var y = evt.srcElement.offsetTop + selectSize*0.85;
  statFenster.style.backgroundColor  = '#d5d0ff';
  statFenster.style.zIndex = 10;
  statFenster.innerHTML = towertypen[object.name][10] + "<br>";
  if (object.name == towertypen.length - 1) {
    var preis = 0;
    for (var i = 0; i < towertypen.length - 1; i++) {
      preis += parseInt(towertypen[i][6]*preisMult);
    }
    preis = parseInt(preis/(towertypen.length-1)*0.95);
  }
  else {
    var preis =  parseInt(towertypen[object.name][6]*preisMult);
  }
  if (geld >= preis) {   //preisfarbe je nach dem ob mans kaufen kann
    var preisFarbe = "'darkgreen'";
  }
  else {
    var preisFarbe = "'red'";
  }
  statFenster.innerHTML += "Preis: <font color=" + preisFarbe + " class=preisFarbe>" + preis + "</font><br>";
  if (object.name != towertypen.length - 1) {
    statFenster.innerHTML += "Damage: " + towertypen[object.name][2] + "<br>";
    statFenster.innerHTML += "Nachladezeit: " + towertypen[object.name][5] + " sec <br>";
    statFenster.innerHTML += "Reichweite: " + towertypen[object.name][4] + "<br>";
    if (towertypen[object.name][3] != 0) {
      statFenster.innerHTML += "Drehgeschwindigkeit: " + (towertypen[object.name][3]*100) + " Grad/sec <br>";
    }
    else if (object.name == 9) {
      statFenster.innerHTML += "Buffed alle Türme in Reichweite! <br>";
    }
    else {
      statFenster.innerHTML += "Trifft alle Gegner in Reichweite! <br>";
    }
    for (var i = 0; i < towertypen[object.name][7].length; i++) {   //hat der Turm zusatzefeckte
      switch (towertypen[object.name][7][i]) {
        case 0:
          statFenster.innerHTML += "Verlangsamt Gegner auf die " + (1 / (towertypen[object.name][8][i] + 1)) + " fache Geschwindigkeit. <br>";
          break;
        case 1:
          statFenster.innerHTML += "Stunned Gegner <br>";
          break;
        case 2:
          statFenster.innerHTML += "Verbrennt Gegner für " + towertypen[object.name][8][i] + " Schaden/sec. <br>";
          break;
        case 3:
          statFenster.innerHTML += "Vergiftet Gegner für " + towertypen[object.name][8][i] + " Schaden/sec. <br>";
          break;
        case 5:
          statFenster.innerHTML += "Trifft nahe Gegner zusätzlich für " + towertypen[object.name][8][i] + " Schaden. <br>";
          break;
        case 6:
          statFenster.innerHTML += "Springt zusätzlich bis zu " + towertypen[object.name][8][i] + " mal auf nahe Gegner über. <br>";
          break;
        case 7:
          statFenster.innerHTML += "Verbesstert den Damage von nahen Türmen um " + towertypen[object.name][8][i] + "%. <br>";
          break;
        case 8:
          statFenster.innerHTML += "Oder: Verbesstert die Angriffsgeschwindigkeit von nahen Türmen um " + towertypen[object.name][8][i] + "%. <br>";
          break;
        case 9:
          statFenster.innerHTML += "Oder: Verbesstert die Effektstärke, -dauer und -reichweite von nahen Türmen um " + towertypen[object.name][8][i] + "%. <br>";
          break;
        case 10:
          statFenster.innerHTML += "Oder: Verbesstert die Drehgeschwindigkeit und Reichweite von nahen Türmen um " + towertypen[object.name][8][i] + "%. <br>";
          break;
      }
      if (towertypen[object.name][7][i] >= 5 && towertypen[object.name][7][i] <= 9) {
        statFenster.innerHTML += "Effektreichweite: " + towertypen[object.name][9][i] + " <br>";
      }
      else {
        statFenster.innerHTML += "Effektdauer: " + towertypen[object.name][9][i] + "sec <br>";
      }
    }
  }
  if (x + statFenster.offsetWidth > document.body.offsetWidth) {
    x -= statFenster.offsetWidth + selectSize*0.8;
    if (x < 0) {
      statFenster.style.left = '0px';
    }
    else {
      statFenster.style.left = x+'px';
    }
  }
  else {
    statFenster.style.left = x+'px';
  }
  if (y + 100 + statFenster.offsetHeight > screen.height) {
    statFenster.style.bottom = '0px';
  }
  else {
    statFenster.style.top = y+'px';
  }
}

//lösche des statfenster wenn der tower nicht mehr gehovert wird
function hideStats() {
  statFenster.remove();
  statFenster = undefined;
}

// zeige reichweite des gehoverten turms
function showRange(evt, object, id) {
  range = tuerme[id].reichweite*(1+tuerme[id].buffStaerken[3]/100);
  rangeDiv = document.createElement("div");
  document.body.appendChild(rangeDiv);
  rangeDiv.style.position = 'absolute';
  rangeDiv.style.left = (evt.srcElement.offsetLeft + size/2 - (range*size/70))+'px';
  rangeDiv.style.top = (evt.srcElement.offsetTop + size/2 - (range*size/70))+'px';
  rangeDiv.style.width = (range*size/35)+'px';
  rangeDiv.style.height = (range*size/35)+'px';
  rangeDiv.style.borderRadius = (range*size/35)+'px';
  rangeDiv.style.backgroundColor  = '#a0a0a050';
  rangeDiv.style.borderStyle = 'solid';
  rangeDiv.style.borderWidth = '1px';
  rangeDiv.style.borderColor = '#000000';
  rangeDiv.style.zIndex = 4;
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
  upgradeFenster.style.backgroundColor  = '#d5d0ffd0';
  upgradeFenster.style.zIndex=6;
  upgradeFenster.innerHTML += towertypen[typ][10] + "<br>";
  if (tuerme[id].upgradeStufe < maxUpgrade) {   //ist der Turm auf der maximalen upgradestufe
    if (tuerme[id].upgradeStufe == maxUpgrade - 1) {
      var preis = parseInt(towertypen[typ][6]*preisMult)*2;
    }
    else {
      var preis = parseInt(parseInt(towertypen[typ][6]*preisMult)*(25+10*tuerme[id].upgradeStufe)/100);
    }
    upgradeFenster.innerHTML += "Upgradestufe: " + tuerme[id].upgradeStufe + " <font color=ff0000>+1</font><br>";
    if (preis <= geld) {    //preis farbe je nach dem ob man das geld hat
      preisFarbe = "'darkgreen'";
    }
    else {
      preisFarbe = "'red'";
    }
    upgradeFenster.innerHTML += "Upgrade Preis: <font color=" + preisFarbe + " class=preisFarbe>" + preis + "</font><br>";
    upgradeFenster.innerHTML += "Verkaufswert: " + tuerme[id].wert + " <font color=ff0000>+" + parseInt(preis*0.8) + " </font><br>";
    upgradeFenster.innerHTML += "Damage: " + round(tuerme[id].schaden*(1+tuerme[id].buffStaerken[0]/100), 3) + " <font color=ff0000>+" + round(towertypen[typ][2]/10*(1+tuerme[id].buffStaerken[0]/100), 3) + " </font><br>";
    if (typ == 10) {
    upgradeFenster.innerHTML += "Nachladezeit: " + round(tuerme[id].angriffsZeit/(1+tuerme[id].buffStaerken[1]/100), 3) + " sec <br>";
    upgradeFenster.innerHTML += "Reichweite: " + round(tuerme[id].reichweite*(1+tuerme[id].buffStaerken[3]/100), 3) + " <br>";
    }
    else {
        upgradeFenster.innerHTML += "Nachladezeit: " + round(tuerme[id].angriffsZeit/(1+tuerme[id].buffStaerken[1]/100), 3) + " <font color=ff0000>-" + round(towertypen[typ][5]/10/(1+tuerme[id].buffStaerken[0]/100), 3) + "</font> sec <br>";
        if (typ == 9) {
          upgradeFenster.innerHTML += "Reichweite: " + round(tuerme[id].reichweite*(1+tuerme[id].buffStaerken[3]/100), 2) + " <font color=ff0000>+" + round(towertypen[typ][9][tuerme[id].effekt[0]-7]*0.1*(1+tuerme[id].buffStaerken[2]/100), 2) + " </font><br>";
        }
        else {
          upgradeFenster.innerHTML += "Reichweite: " + round(tuerme[id].reichweite*(1+tuerme[id].buffStaerken[3]/100), 2) + " <font color=ff0000>+" + round(towertypen[typ][4]/10*(1+tuerme[id].buffStaerken[3]/100), 2) + " </font><br>";
        }
    }
    if (tuerme[id].drehGeschw != 0) {
      upgradeFenster.innerHTML += "Drehgeschwindigkeit: " + round(tuerme[id].drehGeschw*100*(1+tuerme[id].buffStaerken[3]/100), 2) + " <font color=ff0000>+" + round(towertypen[typ][3]*10*(1+tuerme[id].buffStaerken[3]/100), 2) + " </font> Grad/sec <br>";
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
          var speedChange = (1 / (tuerme[id].effektStaerke[i]*(1+tuerme[id].buffStaerken[2]/100)+towertypen[typ][8][i]*0.1*(1+tuerme[id].buffStaerken[2]/100) + 1)) - (1 / (tuerme[id].effektStaerke[i]*(1+tuerme[id].buffStaerken[2]/100) + 1));
          upgradeFenster.innerHTML += "Verlangsamt Gegner auf die " + round(1 / (tuerme[id].effektStaerke[i]*(1+tuerme[id].buffStaerken[2]/100) + 1), 4) + " <font color=ff0000>" + round(speedChange, 4) + " </font> fache Geschwindigkeit. <br>";
          break;
        case 1:
          upgradeFenster.innerHTML += "Stunned Gegner <br>";
          break;
        case 2:
          upgradeFenster.innerHTML += "Verbrennt Gegner für " + round(tuerme[id].effektStaerke[i]*(1+tuerme[id].buffStaerken[2]/100), 3) + " <font color=ff0000>+" + round(towertypen[typ][8][i]*0.1*(1+tuerme[id].buffStaerken[2]/100), 3) + " </font> Schaden/sec. <br>";
          break;
        case 3:
          upgradeFenster.innerHTML += "Vergiftet Gegner für " + round(tuerme[id].effektStaerke[i]*(1+tuerme[id].buffStaerken[2]/100), 3) + " <font color=ff0000>+" + round(towertypen[typ][8][i]*0.1*(1+tuerme[id].buffStaerken[2]/100), 3) + " </font> Schaden/sec. <br>";
          break;
        case 5:
          upgradeFenster.innerHTML += "Trifft nahe Gegner zusätzlich für " + round(tuerme[id].effektStaerke[i]*(1+tuerme[id].buffStaerken[2]/100), 3) + " <font color=ff0000>+" + round(towertypen[typ][8][i]*0.1*(1+tuerme[id].buffStaerken[2]/100), 3) + " </font> Schaden. <br>";
          break;
        case 6:
          upgradeFenster.innerHTML += "Springt zusätzlich bis zu " +tuerme[id].effektStaerke[i] + " <font color=ff0000>+1 </font> mal auf nahe Gegner über. <br>";
          break;
        case 7:
          upgradeFenster.innerHTML += "Verbesstert den Damage von nahen Türmen um (" + round(tuerme[id].effektStaerke[i]*(1+tuerme[id].buffStaerken[2]/100), 3) + " <font color=ff0000>+" + round(towertypen[typ][8][tuerme[id].effekt[i]-7]*0.1*(1+tuerme[id].buffStaerken[2]/100), 3) + " </font>)%. <br>";
          break;
        case 8:
          upgradeFenster.innerHTML += "Verbesstert die Angriffsgeschwindigkeit von nahen Türmen um (" + round(tuerme[id].effektStaerke[i]*(1+tuerme[id].buffStaerken[2]/100), 3) + " <font color=ff0000>+" + round(towertypen[typ][8][tuerme[id].effekt[i]-7]*0.1*(1+tuerme[id].buffStaerken[2]/100), 3) + " </font>)%. <br>";
          break;
        case 9:
          upgradeFenster.innerHTML += "Verbesstert die Effektstärke, -dauer und -reichweite von nahen Türmen um (" + round(tuerme[id].effektStaerke[i]*(1+tuerme[id].buffStaerken[2]/100), 3) + " <font color=ff0000>+" + round(towertypen[typ][8][tuerme[id].effekt[i]-7]*0.1*(1+tuerme[id].buffStaerken[2]/100), 3) + " </font>)%. <br>";
          break;
        case 10:
          upgradeFenster.innerHTML += "Verbesstert die Drehgeschwindigkeit und Reichweite von nahen Türmen um (" + round(tuerme[id].effektStaerke[i]*(1+tuerme[id].buffStaerken[2]/100), 3) + " <font color=ff0000>+" + round(towertypen[typ][8][tuerme[id].effekt[i]-7]*0.1*(1+tuerme[id].buffStaerken[2]/100), 3) + " </font>)%. <br>";
          break;
      }
      if (tuerme[id].effekt[i] >= 5 && tuerme[id].effekt[i] <= 10) {
        if (typ != 9) {
          upgradeFenster.innerHTML += "Effektreichweite: " + round(tuerme[id].effektTime[i]*(1+tuerme[id].buffStaerken[2]/100), 4) + " <font color=ff0000>+" + round(towertypen[typ][9][i]*0.1*(1+tuerme[id].buffStaerken[2]/100), 4) + " </font> <br>";
        }
      }
      else {
        upgradeFenster.innerHTML += "Effektdauer: " + round(tuerme[id].effektTime[i]/100*(1+tuerme[id].buffStaerken[2]/100), 4) + " <font color=ff0000>+" + round(towertypen[typ][9][i]*0.1*(1+tuerme[id].buffStaerken[2]/100), 4) + " </font> sec <br>";
      }
    }
    if (tuerme[id].typ != 2) {
      upgradeFenster.innerHTML += "Verursachter Schaden: " + round(tuerme[id].dmgDealed, 3) + "<br>";
    }
    else {
      upgradeFenster.innerHTML += "Gegner wurden von diesem Turm insgesamt für " + round(tuerme[id].dmgDealed/100, 1) + "sec verlangsamt<br>";
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
    var upgradeButton = document.createElement("button"); //button um den turm upzugraden
    upgradeFenster.appendChild(upgradeButton);
    upgradeButton.innerHTML = "Upgrade";
    upgradeButton.style.position = 'relative';
    upgradeButton.style.left = (20)+'px';
    upgradeButton.style.top = (0)+'px';
    upgradeButton.addEventListener("click", function(){tuerme[id].upgrade();});
  }
  else {    //wenn der turm auf maximaler stufe ist
    upgradeFenster.innerHTML += "Upgradestufe: " + tuerme[id].upgradeStufe + " <font color=ff0000>Max</font><br>";
    upgradeFenster.innerHTML += "Verkaufswert: " + tuerme[id].wert + "<br>";
    upgradeFenster.innerHTML += "Damage: " + round(tuerme[id].schaden*(1+tuerme[id].buffStaerken[0]/100), 3) + "<br>";
    upgradeFenster.innerHTML += "Nachladezeit: " + round(tuerme[id].angriffsZeit/(1+tuerme[id].buffStaerken[1]/100), 3) + " sec <br>";
    upgradeFenster.innerHTML += "Reichweite: " + round(tuerme[id].reichweite*(1+tuerme[id].buffStaerken[3]/100), 2) + " <br>";
    if (tuerme[id].drehGeschw != 0) {
      upgradeFenster.innerHTML += "Drehgeschwindigkeit: " + round(tuerme[id].drehGeschw*100*(1+tuerme[id].buffStaerken[3]/100), 2) + " Grad/sec <br>";
    }
    else if (typ != 9) {
      upgradeFenster.innerHTML += "Trifft alle Gegner in Reichweite! <br>";
    }
    for (var i = 0; i < tuerme[id].effekt.length; i++) {
      switch (tuerme[id].effekt[i]) {
        case 0:
          upgradeFenster.innerHTML += "Verlangsamt Gegner auf die " + round(1 / (tuerme[id].effektStaerke[i]*(1+tuerme[id].buffStaerken[2]/100) + 1), 4) + " fache Geschwindigkeit. <br>";
          break;
        case 1:
          upgradeFenster.innerHTML += "Stunned Gegner <br>";
          break;
        case 2:
          upgradeFenster.innerHTML += "Verbrennt Gegner für " + round(tuerme[id].effektStaerke[i]*(1+tuerme[id].buffStaerken[2]/100), 3) + " Schaden/sec. <br>";
          break;
        case 3:
          upgradeFenster.innerHTML += "Vergiftet Gegner für " + round(tuerme[id].effektStaerke[i]*(1+tuerme[id].buffStaerken[2]/100), 3) + " Schaden/sec. <br>";
          break;
        case 5:
          upgradeFenster.innerHTML += "Trifft nahe Gegner zusätzlich für " + round(tuerme[id].effektStaerke[i]*(1+tuerme[id].buffStaerken[2]/100), 3) + " Schaden. <br>";
          break;
        case 6:
          upgradeFenster.innerHTML += "Springt zusätzlich bis zu " +tuerme[id].effektStaerke[i] + " mal auf nahe Gegner über. <br>";
          break;
        case 7:
          upgradeFenster.innerHTML += "Verbesstert den Damage von nahen Türmen um " + round(tuerme[id].effektStaerke[i]*(1+tuerme[id].buffStaerken[2]/100), 3) + "%. <br>";
          break;
        case 8:
          upgradeFenster.innerHTML += "Verbesstert die Angriffsgeschwindigkeit von nahen Türmen um " + round(tuerme[id].effektStaerke[i]*(1+tuerme[id].buffStaerken[2]/100), 3) + "%. <br>";
          break;
        case 9:
          upgradeFenster.innerHTML += "Verbesstert die Effektstärke, -dauer und -reichweite von nahen Türmen um " + round(tuerme[id].effektStaerke[i]*(1+tuerme[id].buffStaerken[2]/100), 3) + "%. <br>";
          break;
        case 10:
          upgradeFenster.innerHTML += "Verbesstert die Drehgeschwindigkeit und Reichweite von nahen Türmen um " + round(tuerme[id].effektStaerke[i]*(1+tuerme[id].buffStaerken[2]/100), 3) + "%. <br>";
          break;
        case 15:
          upgradeFenster.innerHTML += "Vergiftet Gegner für " + round(tuerme[id].effektStaerke[i]*(1+tuerme[id].buffStaerken[2]/100), 3) + " Schaden/sec (kann mit Gift von anderen Türmen stacken). <br>";
          break;
      }
      if (tuerme[id].effekt[i] >= 5 && tuerme[id].effekt[i] <= 10) {
        upgradeFenster.innerHTML += "Effektreichweite: " + round(tuerme[id].effektTime[i]*(1+tuerme[id].buffStaerken[2]/100), 4) + " <br>";
      }
      else {
        upgradeFenster.innerHTML += "Effektdauer: " + round(tuerme[id].effektTime[i]/100*(1+tuerme[id].buffStaerken[2]/100), 4) + " sec <br>";
      }
    }
    if (tuerme[id].typ != 2) {
      upgradeFenster.innerHTML += "Verursachter Schaden: " + tuerme[id].dmgDealed + "<br>";
    }
    else {
      upgradeFenster.innerHTML += "Gegner wurden von diesem Turm insgesamt für " + (tuerme[id].dmgDealed/100) + "sec verlangsamt<br>";
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
    var targetButton = document.createElement("button");  //button um das turm target zu ändern
    upgradeFenster.appendChild(targetButton);
    targetButton.innerHTML = "Target";
    targetButton.style.position = 'relative';
    if (tuerme[id].upgradeStufe < maxUpgrade) {
      targetButton.style.left = (50)+'px';
    }
    else {
      targetButton.style.left = (20)+'px';
    }
    targetButton.style.bottom = (0)+'px';
    targetButton.addEventListener("click", function(){tuerme[id].changeTarget();});
  }
  var sellButton = document.createElement("button");  //button um den turm zu verkaufen
  upgradeFenster.appendChild(sellButton);
  sellButton.innerHTML = "Sell";
  sellButton.style.position = 'absolute';
  sellButton.style.right = (20)+'px';
  sellButton.style.bottom = (0)+'px';
  sellButton.addEventListener("click", function(){tuerme[id].sell();});
  var closeButton = document.createElement("button");   //button um das upgradefenster zu schliesen
  upgradeFenster.appendChild(closeButton);
  closeButton.innerHTML = "x";
  closeButton.style.position = 'absolute';
  closeButton.style.left = (upgradeFenster.scrollWidth-23)+'px';
  closeButton.style.top = (0)+'px';
  closeButton.addEventListener("click", function(){hideUpgrade();});
  var upgradeFehlerDiv = document.createElement("div");   //anzeige wenn evrsucht wird den turm upzugraden aber nicht genug geld vorhanden ist
  upgradeFehlerDiv.id = "fehler"+id;
  upgradeFehlerDiv.color = "red";
  upgradeFehlerDiv.innerHTML = "<font color=ff0000>Sie haben nicht genug Geld, <br>um diesen Turm upzugraden</font>";
  upgradeFenster.appendChild(upgradeFehlerDiv);
  upgradeFehlerDiv.hidden = true;


  if (x + upgradeFenster.offsetWidth > mapMaxX) {
    x -= upgradeFenster.offsetWidth + 50;
  }
  if (x >= 0) {
    upgradeFenster.style.left = x+'px';
  }
  else {
    upgradeFenster.style.right = '0px';
  }
  if (y + 100 + upgradeFenster.offsetHeight > screen.height) {
    upgradeFenster.style.bottom = '0px';
  }
  else {
    upgradeFenster.style.top = y+'px';
  }
}


//funktion zum schliesen der Stats/Upgradestats/-kosten anzeige
function hideUpgrade(){
  if (upgradeFenster != undefined) {
    upgradeFenster.remove();
    upgradeFenster = undefined;
  }
}

function zeicheBild(canvas, objImg, winkel, clear, x = 0, y = 0, richtung2 = undefined, bildSize){
  objContext = canvas.getContext('2d');   //wähle inhalt des canvas zum verändern aus
  objContext.translate(bildSize/2*Math.sqrt(2)*Math.sin((winkel-45)*Math.PI/180), -bildSize/2*Math.sqrt(2)*Math.cos((winkel-45)*Math.PI/180));           // Ursprung verschieben damit bei drehung um den ursprung die mitte des bildes an der gewollten position bleibt
  objContext.translate(x+bildSize/2, y+ bildSize/2);           // Ursprung verschieben um angegebene koordinaten +35 damit das bild in der mitte eines 70x70 felden ist
  objContext.rotate(winkel*Math.PI/180);  // Context drehen
  if (clear) {
    objContext.clearRect(0, 0, bildSize, bildSize);   //löschen des inhalts des canvas wenn gewollt
  }
  objContext.drawImage(objImg, 0, 0, objImg.width, objImg.height,0, 0, bildSize, bildSize);   // Bild zeichnen
  objContext.rotate(-winkel*Math.PI/180);  // objektContext zurücksetzen um die funktion bei dem nächsten aufrufen nicht verändern zu müssen (canvas speicher drehungen und verschiebungen und es gilt für jedes zeichnen nach der drehung/verschiebung)
  objContext.translate(-x-bildSize/2, -y-bildSize/2);           // deswegen müssen die drehungen und verschiebungen genau um die negative zahl nochmal ausgeführt werden um es zu resetten
  objContext.translate(-bildSize/2*Math.sqrt(2)*Math.sin((winkel-45)*Math.PI/180), bildSize/2*Math.sqrt(2)*Math.cos((winkel-45)*Math.PI/180));
  if (richtung2 != undefined) {   //für basic turm upgradestufe 5 bild wird 2 mal gezeichnet mit unterschiedlichen richtungen
    objContext.translate(bildSize/2*Math.sqrt(2)*Math.sin((richtung2-45)*Math.PI/180), -bildSize/2*Math.sqrt(2)*Math.cos((richtung2-45)*Math.PI/180));
    objContext.translate(x+bildSize/2, y+bildSize/2);   //gleiche verschiebungen/drehungen wie oben
    objContext.rotate(richtung2*Math.PI/180);
    objContext.drawImage(objImg, 0, 0, bildSize, bildSize);
    objContext.rotate(-richtung2*Math.PI/180);
    objContext.translate(-x-bildSize/2, -y-bildSize/2);
    objContext.translate(-bildSize/2*Math.sqrt(2)*Math.sin((richtung2-45)*Math.PI/180), bildSize/2*Math.sqrt(2)*Math.cos((richtung2-45)*Math.PI/180));
  }
}
function zeichneBufferBild(canvas, objImg, winkel, clear = false, x = 0, y = 0, richtung2){
  objContext = canvas.getContext('2d');   //wähle inhalt des canvas zum verändern aus
  objContext.translate(objImg.width/2*Math.sqrt(2)*Math.sin((winkel-45)*Math.PI/180), -objImg.width/2*Math.sqrt(2)*Math.cos((winkel-45)*Math.PI/180));           // Ursprung verschieben damit bei drehung um den ursprung die mitte des bildes an der gewollten position bleibt
  objContext.translate(x+35, y+35);           // Ursprung verschieben um angegebene koordinaten +35 damit das bild in der mitte eines 70x70 felden ist
  objContext.rotate(winkel*Math.PI/180);  // Context drehen
  if (clear) {
    objContext.clearRect(0, 0, 70, 70);   //löschen des inhalts des canvas wenn gewollt
  }
  objContext.drawImage(objImg, 0, 0);   // Bild zeichnen
  objContext.rotate(-winkel*Math.PI/180);  // objektContext zurücksetzen um die funktion bei dem nächsten aufrufen nicht verändern zu müssen (canvas speicher drehungen und verschiebungen und es gilt für jedes zeichnen nach der drehung/verschiebung)
  objContext.translate(-x-35, -y-35);           // deswegen müssen die drehungen und verschiebungen genau um die negative zahl nochmal ausgeführt werden um es zu resetten
  objContext.translate(-objImg.width/2*Math.sqrt(2)*Math.sin((winkel-45)*Math.PI/180), objImg.width/2*Math.sqrt(2)*Math.cos((winkel-45)*Math.PI/180));
  if (richtung2 != undefined) {   //für basic turm upgradestufe 5 bild wird 2 mal gezeichnet mit unterschiedlichen richtungen
    objContext.translate(objImg.width/2*Math.sqrt(2)*Math.sin((richtung2-45)*Math.PI/180), -objImg.width/2*Math.sqrt(2)*Math.cos((richtung2-45)*Math.PI/180));
    objContext.translate(x+35, y+35);   //gleiche verschiebungen/drehungen wie oben
    objContext.rotate(richtung2*Math.PI/180);
    objContext.drawImage(objImg, 0, 0);
    objContext.rotate(-richtung2*Math.PI/180);
    objContext.translate(-x-35, -y-35);
    objContext.translate(-objImg.width/2*Math.sqrt(2)*Math.sin((richtung2-45)*Math.PI/180), objImg.width/2*Math.sqrt(2)*Math.cos((richtung2-45)*Math.PI/180));
  }
}
//funktion zum auswählen eines towers um ihn zu bauen
function select(evt, id) {      //id enthält entweder die id des zu wählenden towers oder undefined wennn aufruf durch eventlistener (dann ist unter this. das objekt des angeklickten events abgespeichert und id wird dann aus dessen namen gelesen)
  deselect();   //falls schon anderer tower augewählt ist lösche die auswahl
  if (id == undefined) {    //erkennung der id und abspeichern in selected
    selected = this.name*1;
  }
  else {
    selected = id;
  }
  if (selected == towertypen.length - 1) {
    var preis = 0;
    for (var i = 0; i < towertypen.length - 1; i++) {
      preis += parseInt(towertypen[i][6]*preisMult);
    }
    preis = parseInt(preis/(towertypen.length-1)*0.95);
  }
  else {
    var preis =  parseInt(towertypen[selected][6]*preisMult);
  }
  if (preis <= geld) {    //ist genug geld vorhanden
    ladeBild('Bilder/Tower/base2.png', towerSelect[selected][0], 0);     //zeichne bild zum anzeigen was ausgewählt ist
  }
  else {    //falls nichts ausgewählt werden konnte wegen zu wenig geld (oder verlerhafter aufruf der funktion)
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
  if (selected != -1) {   //ist ein turmtyp ausgewählt?
    if (selected == towertypen.length - 1) {
      selectRandom = true;
      var preis = 0;
      for (var i = 0; i < towertypen.length - 1; i++) {
        preis += parseInt(towertypen[i][6]*preisMult);
      }
      preis = parseInt(preis/(towertypen.length-1)*0.95);
    }
    else {
      var preis =  parseInt(towertypen[selected][6]*preisMult);
    }
    if (preis <= geld) {    //ist genug geld vorhanden?
      var coordinaten = this.name.split(',');     //coordinaten werden aus dem angeklickten map canvas gelesen (jedes mapbild enthält im namen spaltennummer und zeilennummer mit komma getrennt)
      if (selected == 9) {    //wenn Supporttower öffne place menü
        upgradeFenster = document.createElement("div");
        document.body.appendChild(upgradeFenster);
        upgradeFenster.style.position = 'absolute';
        var x = coordinaten[0]*(size-1.2);
        var y = coordinaten[1]*(size-1.2);
        upgradeFenster.style.backgroundColor  = '#d5d0ffd0';
        upgradeFenster.style.zIndex=6;
        upgradeFenster.innerHTML += "<img id='typ0' src='Bilder/Icons/schaden.png' title='Schaden'><img id='typ1' src='Bilder/Icons/angriffsGeschwindikeit.png' title='Angriffsgeschwindigkeit'><br>";
        upgradeFenster.innerHTML += "Welchen Suportturm<br>willst du bauen?<br>";
        upgradeFenster.innerHTML += "<img id='typ2' src='Bilder/Icons/effeckt.png' title='Effeckt'><img id='typ3' src='Bilder/Icons/reichweite.png' title='Reichweite und Drehgeschwindigkeit'><br>";
        for (var i = 0; i < 4; i++) {
          document.getElementById("typ"+i).addEventListener("click", function () {
            addGeld(-preis);    //kosten abziehen
            var number = 0;   //überprüfe im tuerme array welcher index der kleinste freie ist
            while (tuerme[number] != undefined) {
              number++;
            }
            var spezialisierung = this.id.charAt(3);
            tuerme[number] = new Turm(coordinaten[0], coordinaten[1], 9, number, spezialisierung);
            hideUpgrade(); //
          });
        }
        var closeButton = document.createElement("button");   //button um das fenster zu schliesen
        upgradeFenster.appendChild(closeButton);
        closeButton.innerHTML = "x";
        closeButton.style.position = 'absolute';
        closeButton.style.right = '0px';
        closeButton.style.top = '0px';
        closeButton.addEventListener("click", function(){hideUpgrade();});
        if (x + upgradeFenster.offsetWidth > mapMaxX) {
          upgradeFenster.style.right = '0px';
        }
        else {
          upgradeFenster.style.left = x+'px';
        }
        if (y + 100 + upgradeFenster.offsetHeight > screen.height) {
          upgradeFenster.style.bottom = '0px';
        }
        else {
          upgradeFenster.style.top = y+'px';
        }
      }
      else {  //ansonste plaziere turm
        if (selected == towertypen.length - 1) {
          selected = Math.floor(Math.random()*(towertypen.length - 1));
        }
        addGeld(-preis);    //kosten abziehen
        var number = 0;   //überprüfe im tuerme array welcher index der kleinste freie ist
        while (tuerme[number] != undefined) {
          number++;
        }
        if (selected == 9) {
          tuerme[number] = new Turm(coordinaten[0], coordinaten[1], selected, number, Math.floor(Math.random()*4));
        }
        else {
          tuerme[number] = new Turm(coordinaten[0], coordinaten[1], selected, number);    //erstelle neuen turm mit koordinaten typ und id
        }
        //if 1/1000 chance full upgraded bei randomturm??
      }
      tuerme.forEach((item, i) => {
        if (item != undefined && item.typ == 9) {
          item.buffTuerme();
        }
      });
    }
    if (!shift || geld < preis) {   //wenn shift nicht gedrückt ist wird die auswahl des towers gelöscht nach bau
      deselect();
    }
    else if (selectRandom) {
      selected = towertypen.length - 1;
    }
  }
}

//spawned einen gegner
function spawn(typ, lebenMult) {
  var number = 0;   //überprüfe im gegner array welcher index der kleinste freie ist
  while (gegner[number] != undefined) {
    number++;
  }
  gegner[number] = new Gegner(number, typ, lebenMult);    //erzeugt einen neuen gegner und übergiebt id, typ und lebensmultiplikator
  if (multiStartTyp == 0 || multiStartTyp == 3) {
    spawnPointNumber++;
    if (spawnPointNumber >= start[0].length) {
      spawnPointNumber = 0;
    }
    else {
      if (multiStartTyp == 3) {
        spawn(typ, lebenMult);
      }
    }
  }
  return number;
}

//funktion um geld zu bekommen/zu zahlen
function addGeld(amount) {
  geld += amount;   //speichere neuen geld wert ab
  if (amount > 0) {  //bekommt der spieler geld?
    elemente = document.getElementsByClassName("preisFarbe");   //lade alle anzeige objekte die sich auf einen preis beziehen
    for (var i = 0; i < elemente.length; i++) {
      if (elemente[i].innerHTML*1 <= geld) {
        elemente[i].color = "darkgreen";    //und wechsle die farbe auf grün wenn nach dem geld bekommen nun genug geld da ist um es sich zu leisten
      }
    }
  }
  else if (amount < 0) {
    if (geld < 0) {   //wenn man mehr geld gezahlt hat als vorhanden war (sollte nicht vorkommen auser durch aufruf in der konsole)
      console.log("Zu wenig Geld!!!");
      geld = 0;
    }
    elemente = document.getElementsByClassName("preisFarbe");   //lade alle anzeige objekte die sich auf einen preis beziehen
    for (var i = 0; i < elemente.length; i++) {
      if (elemente[i].innerHTML*1 > geld) {
        elemente[i].color = "red";    //und wechsle die farbe auf rot wenn nach dem zahlen nun nicht mehr genug geld da ist um es sich zu leisten
      }
    }
  }
  document.getElementById("Geld").innerHTML = geld;   //update geldanzeige
}


window.requestAnimationFrame(update);   //intervall für die spielupdates (50 mal in der sec)

//funktion für einen spieltick
function update() {
  updateFinish = false;
  if (!gamePause && wellenEnde != 0) {   //keine ausführung wenn das spiel pausiert ist oder zwischen den wellen
    for (var i = gegner.length-1; i >= 0; i--) {   //gegner tick
      if (gegner[i] != undefined) {
        gegner[i].bewegen();
        if (spielerLeben <= 0) {    //beendet das update wenn das spiel verlohren ist
          return;
        }
      }
    }
    tuerme.forEach((item, i) => {   //turm tick
      if (item != undefined) {
        item.zielen()
      }
    });
    gegner.forEach((item, i) => {
      if (item != undefined) {
        item.shieldedFrom = [];
      }
    });
    if (gegner.length == 0 && roundTime > wellenEnde) {   //wenn welle zuende ist (alle gegener tot)
      if (startHover) {   //pausebutton wird zum startbutton
        startButton.src = "Bilder/Buttons/startHover.png";
      }
      else {
        startButton.src = "Bilder/Buttons/start.png";
      }
      if (teilWellenNummer == gegnerWellen.length) {    //wenn die lettze teilwelle um ist nachricht dass das spiel gewonnen ist
        alert("Du hast das Spiel Gewonnen!");
        clearInterval(updateGame);
      }
      else {
        objContext = gegnerBild.getContext('2d');   //löschen des gegnerbildes
        objContext.clearRect(0, 0, gegnerBild.width, gegnerBild.height);
        objContext = gegnerBildHidden.getContext('2d');
        objContext.clearRect(0, 0, gegnerBild.width, gegnerBild.height);
        addGeld(parseInt(10 * Math.pow(1.04, wellenNummer)));   //runden geld bonus wird vergeben
        wellenNummer++;
        document.getElementById("Welle").innerHTML = wellenNummer + "/" + anzahlWellen;   //update wellenanzeige
        wellenEnde = 0;   //stelle werte auf zwischen den wellen
        roundTime = -1000;
        tuerme.forEach((item, i) => {   //resette angriffsZeit aller türme
          if (item != undefined) {
            item.letzterAngriff = -1000;
          }
        });
        if (autoStart) {    //wenn autostart ausgewählt wurde starte nächste welle
          startAndPause();
        }
      }
    }
    if (roundTime >= 0) {   //wenn welle nicht vorbei ist
      draw();   //zeine gegner neu
      roundTime += gameSpeed;   //updade rundenzeit
      for (var i = timers.length - 1; i >= 0; i--) {   //ausführung aller timer
        item = timers[i];
          if (item[1] <= roundTime) {   //wenn timerzeit abgelaufen ist
            item[0]();    //füge gespeicherte funktion aus
            timers.splice(i, 1);  //lösche timer
          }
      }
      for (var i = intervals.length - 1; i >= 0 ; i--) {    //ausführung aller intervalle
        item = intervals[i];
        if (item[2] + item[3] <= roundTime) {   //wenn nächster aufruf des interwalls fällig ist
          item[0](item[1]);   //führe funktion des intervalls aus mit übergabewerte
          item[2] += item[3]; //update letzte ausführungszeit
          item[4]--;    //update anzahl der aufrufe
          if (item[4] <= 0) {   //wenn anzahl verblibener aufrufe = 0
            intervals.splice(i, 1);   //lösche intervall
          }
        }
      }
    }
  }
  if (loading == 0 && !spielEnde) {
    window.requestAnimationFrame(update);
  }
  else {
    updateFinish = true;
  }
}

//zeichne gegner
function draw(){
  objContext = gegnerBild.getContext('2d');
  //lösche altes gegnerBild
  objContext.clearRect(0, 0, gegnerBild.width, gegnerBild.height);
  //bilde neues gegnerBild aus zwischenspeicher ab (update des bildes ist um einen spieltick verzögert damit der zwischenspeicher zeit hat die teilbilder zu laden daher vor update des zwischenspeichers)
  objContext.drawImage(gegnerBildHidden, 0, 0);
  objContext2 = gegnerBildHidden.getContext('2d');
  //lösche bild im zwischenspeicher
  objContext2.clearRect(0, 0, gegnerBild.width, gegnerBild.height);
  gegner.forEach((item, i) => {   //lade jedes gegner bild in den zwischenspeicher
    if (gegner[i] != undefined) {
      ladeBild(item.src, gegnerBildHidden, item.richtung*90, false, item.posx, item.posy);
    }
  });
}

//funktion um zahlen auf x nachkommastellen zu runden
function round(zahl, stellen) {
  mult = Math.pow(10, stellen);
  zahl *= mult;
  zahl = Math.round(zahl);
  zahl /= mult;
  return zahl;
}

//erzeugen einer neuen schadensnummer mit laden von standartwerten
function numbers(num = false, x = 0, y = 0, color = "white", css = "") {
  if (num != false) { //wenn anzeige nicht lehr
    var el = document.createElement("div");   //erzeuge eine div in der die nummer abgebildet wird
    el.style.pointerEvents = "none";    //ignoriert klicks damit objeklte dahinter angeklickt werden können
    el.innerHTML = "<div class=floating_number>" + num + "</div>";    //schreibe den nummerntext in eine div in der der text bewegt wird mit entsprechnder klasse
    el.setAttribute("style", "position: absolute !important; top:" + (y+numberallsum[1]) + "px; left: " + (x+numberallsum[0]) + "px; color:" + color + ";" + css);    //css atribute setzen
    document.body.appendChild(el);
    setTimeout(function(el) {   //lösche nach 2 sec
        el.remove();
    }.bind(null, el), 2000);
  }
}

function teslaEffekt(points, effektStaerke, effektReichweite, ursprung, targetGegner, momentanerGegner, schaden = true){
  var target = -1;
  var targetEntfernung = -1;
  for (var i = targetGegner.length -1; i >= 0; i--) {     //überprüfe jeden gegner
    if (targetGegner[i] != undefined && targetGegner[i].leben >= 0 && targetGegner[i].id != momentanerGegner.id) {
      var entfernung = getEntfernung(targetGegner[i], momentanerGegner);    //entfernung zum gegner
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
      teslaEffekt(points, effektStaerke, effektReichweite, ursprung, targetGegner, gegner[target]);
    }
  }
  if (schaden) {
    momentanerGegner.damage(points, [], [], [], ursprung);
  }
}

function getEntfernung(obj1, obj2) {
  return Math.sqrt(Math.pow((obj1.posx - obj2.posx), 2) + Math.pow((obj1.posy - obj2.posy), 2))*70/size;
}

function resizekoords(x,y){
  var wi = 0;
  var hei = 0;
  wi = window.innerWidth*0.98 - Math.max((45 + 77 + 123)*1.07, window.innerWidth*0.3);
  hei = window.innerHeight*0.98 - 50;
  return Math.floor(wi / x > hei /y ? hei / y : wi /x);
  //diese Funktion gibt die richtige Grösse aus
}
