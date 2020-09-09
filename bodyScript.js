//setzt die map größe und map part größe
var size = Math.floor(resizekoords(map[0].length, map.length));
var TCN = new TextCanvas();
const queue = new UpdateQueue();
queue.queue.push(TCN);
queue.start();
//Canvas in dem alle Gegner Angezeigt werden
var gegnerBild = document.createElement('canvas');
document.body.appendChild(gegnerBild);
gegnerBild.width = size*map[0].length;
gegnerBild.height = size*map.length;
gegnerBild.style.position = 'absolute';
gegnerBild.style.left = '10px';
gegnerBild.style.top = '50px';
gegnerBild.style.zIndex = 5;
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
      if (evt.key*1 >= 1 && evt.key*1 <= 9) { //wählt tower zum bauen aus je nach gedückter zahl
        select(false, evt.key-1);
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
  for (var i = 0; i < map.length; i++) {  //mapzeile
    for (var j = 0; j < map[i].length; j++) { //mapspalte
      map[i][j]["map"] = document.createElement('canvas');
      mapDiv.appendChild(map[i][j]["map"]);
      map[i][j]["map"].width = size;
      map[i][j]["map"].height = size;
      map[i][j]["map"].style.position = 'absolute';
      map[i][j]["map"].style.left = (size*j)+'px';
      map[i][j]["map"].style.top = (size*i)+'px';
      if (Array.isArray(map[i][j][1])) {
        ladeBild(map[i][j][1][0], map[i][j]["map"], parseInt(Math.random()*4)*90);
        map[i][j]["object"] = document.createElement('canvas');
        mapDiv.appendChild(map[i][j]["object"])
        map[i][j]["object"].width = size;
        map[i][j]["object"].height = size;
        map[i][j]["object"].style.position = 'absolute';
        map[i][j]["object"].style.left = (size*j)+'px';
        map[i][j]["object"].style.top = (size*i)+'px';
        ladeBild(map[i][j][1][1], map[i][j]["object"], 0);
      }
      else {
        ladeBild(map[i][j][1], map[i][j]["map"], parseInt(Math.random()*4)*90);
      }
      if (map[i][j][0] >= 5 && map[i][j][0] <= 8) {
        start[0].push(i);
        start[1].push(j);
      }
      else if (map[i][j][0] == 0) {
        map[i][j]["map"].name = j+','+i;
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
      else if (map[i][j][0] >= 17 && map[i][j][0] <= 20) {
        if (!isNaN(map[i][j][2])) {
          portal2[0][parseInt(map[i][j][2])] = j;
          portal2[1][parseInt(map[i][j][2])] = i;
          if (!isNaN(map[i][j][3])) {
            portal2[2][parseInt(map[i][j][2])] = parseInt(map[i][j][3]);
          }
        }
        else {
          portal2[0].push(j);
          portal2[1].push(i);
        }
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

function save() {
  var saveCode = nextChar(mapId);
  saveCode += nextChar(schwierigkeit);
  var leben1 = Math.floor(spielerLeben/Math.pow(94,1));
  var leben0 = spielerLeben-leben1*Math.pow(94, 1);
  saveCode += nextChar(leben1, leben0);
  var geld2 = Math.floor(geld/Math.pow(94,2));
  var geld1 = Math.floor((geld-geld2*Math.pow(94, 2))/Math.pow(94,1));
  var geld0 = geld-geld2*Math.pow(94, 2)-geld1*Math.pow(94, 1);
  saveCode += nextChar(geld2, geld1, geld0);
  var welle1 = Math.floor(wellenNummer/Math.pow(94,1));
  var welle0 = wellenNummer-welle1*Math.pow(94, 1);
  saveCode += nextChar(welle1, welle0);
  for (var i = 0; i < tuerme.length; i++) {
    if (tuerme[i].spezialisierung == undefined) {
      saveCode += nextChar(93);
    }
    else {
      saveCode += nextChar(tuerme[i].spezialisierung);
    }
    saveCode += nextChar(tuerme[i].typ);
    saveCode += nextChar(tuerme[i].upgradeStufe);
    saveCode += nextChar(tuerme[i].posx/size);
    saveCode += nextChar(tuerme[i].posy/size);
    while (tuerme[i].richtung1 < 0) {
      tuerme[i].richtung1+360;
    }
    while (tuerme[i].richtung1 > 360) {
      tuerme[i].richtung1-360;
    }
    var richtung2 = Math.floor(tuerme[i].richtung/Math.pow(94,2));
    var richtung1 = Math.floor((tuerme[i].richtung-richtung2*Math.pow(94, 2))/Math.pow(94,1));
    var richtung0 = Math.floor(tuerme[i].richtung-richtung2*Math.pow(94, 2)-richtung1*Math.pow(94, 1));
    saveCode += nextChar(richtung2, richtung1, richtung0);
    while (tuerme[i].richtung2 < 0) {
      tuerme[i].richtung2+360;
    }
    while (tuerme[i].richtung2 > 360) {
      tuerme[i].richtung2-360;
    }
    richtung2 = Math.floor(tuerme[i].richtung2*100/Math.pow(94,2));
    richtung1 = Math.floor((tuerme[i].richtung2*100-richtung2*Math.pow(94, 2))/Math.pow(94,1));
    richtung0 = Math.floor(tuerme[i].richtung2*100-richtung2*Math.pow(94, 2)-richtung1*Math.pow(94, 1));
    saveCode += nextChar(richtung2, richtung1, richtung0);
    saveCode += nextChar(tuerme[i].targetPrio);
    var dmgDealed5 = Math.floor(tuerme[i].dmgDealed*100/Math.pow(94,5));
    var dmgDealed4 = Math.floor((tuerme[i].dmgDealed*100-dmgDealed5*Math.pow(94, 5))/Math.pow(94,4));
    var dmgDealed3 = Math.floor((tuerme[i].dmgDealed*100-dmgDealed5*Math.pow(94, 5)-dmgDealed4*Math.pow(94, 4))/Math.pow(94,3));
    var dmgDealed2 = Math.floor((tuerme[i].dmgDealed*100-dmgDealed5*Math.pow(94, 5)-dmgDealed4*Math.pow(94, 4)-dmgDealed3*Math.pow(94, 3))/Math.pow(94,2));
    var dmgDealed1 = Math.floor((tuerme[i].dmgDealed*100-dmgDealed5*Math.pow(94, 5)-dmgDealed4*Math.pow(94, 4)-dmgDealed3*Math.pow(94, 3)-dmgDealed2*Math.pow(94, 2))/Math.pow(94,1));
    var dmgDealed0 = Math.floor(tuerme[i].dmgDealed*100-dmgDealed5*Math.pow(94, 5)-dmgDealed4*Math.pow(94, 4)-dmgDealed3*Math.pow(94, 3)-dmgDealed2*Math.pow(94, 2)-dmgDealed1*Math.pow(94, 1));
    saveCode += nextChar(dmgDealed5, dmgDealed4, dmgDealed3, dmgDealed2, dmgDealed1, dmgDealed0);
    effecktStacks2 = Math.floor(tuerme[i].effecktStacks*100/Math.pow(94,2));
    effecktStacks1 = Math.floor((tuerme[i].effecktStacks*100-effecktStacks2*Math.pow(94, 2))/Math.pow(94,1));
    effecktStacks0 = Math.floor(tuerme[i].effecktStacks*100-effecktStacks2*Math.pow(94, 2)-effecktStacks1*Math.pow(94, 1));
    saveCode += nextChar(effecktStacks2, effecktStacks1, effecktStacks0);
  }
  localStorage.setItem('saveCode', saveCode);
  console.log(saveCode);
  function nextChar(...content) {
    var string = "";
    for (var i = 0; i < content.length; i++) {
      string += String.fromCharCode(33+content[i]);
    }
    return string;
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
      ladeBild(src, canvas, richtung, clear, x, y, richtung2, bildSize);    //hole das bild aus dem buffer und zeichne es
      if (loading == 1) {   //wenn alle buffer bilder fertig geladen sind
        waitForBildLoad.forEach((item, i) => {    //zeichne alle bilder in der warteliste
          item();
        });
        waitForBildLoad = [];
        if (updateFinish && !spielEnde) {
          window.requestAnimationFrame(update);
        }
        scriptLoaded++;
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
  document.getElementById("range").appendChild(rangeDiv);
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
  upgradeFenster.style.backgroundColor  = '#d5d0ffd0';
  upgradeFenster.style.zIndex = 10;
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


  if (x + upgradeFenster.offsetWidth > size * map[0].length) {
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
        upgradeFenster.style.zIndex = 10;
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
            if (strg) {
              for (var i = 0; i < maxUpgrade; i++) {
                tuerme[number].upgrade();
              }
            }
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
        if (x + upgradeFenster.offsetWidth > size * map[0].length) {
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
        if (strg) {
          for (var i = 0; i < maxUpgrade; i++) {
            tuerme[number].upgrade();
          }
          hideUpgrade();
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
        spielEnde = true;
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
            item.letzterAngriff2 = -1000;
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
  const e = 10 ** stellen;
  return Math.round(zahl * e) / e;
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
    window.requestAnimationFrame(this.update);
  };
  this.start = () => window.requestAnimationFrame(this.update);
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

function TextCanvas() {
  /// canvas besorgen
  this.canvas = document.querySelector("#NumberCanvas");
  this.canvas.width = size * map[0].length;
  this.canvas.offsetLeft =
      this.canvas.height = size * map.length;
  this.ctx = this.canvas.getContext("2d");
  this.textElemente = [];
  this.performanceLimiter = 200;
  this.spawnText = (text, x, y, color) => {
    this.textElemente.push(new (function() {
      this.text = text.toString().replace("<br>","\n");
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

          this.ctx.strokeStyle  = `rgba(0, 0, 0, ${el.el.curve() / 1.5})`;
          this.ctx.strokeText(el.el.text, x, y);
          this.ctx.fillStyle = el.color;
          this.ctx.fillText(el.el.text, x, y);
        });

    const renderTime = (new Date().getTime() - start);
    if (renderTime > 0)
      this.performanceLimiter = Math.floor(Math.max(this.textElemente.length, 1) / renderTime) * 30; // min ~33 fps
  };
}
// Source: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null;
}

function resolveColor(color) {
  if (color.startsWith("#")) {
    return hexToRgb(color);
  }
  switch (color.toLowerCase()) {
    case "aliceblue": return {"r":240,"g":248,"b":255}; break;
    case "antiquewhite": return {"r":250,"g":235,"b":215}; break;
    case "aqua": return {"r":0,"g":255,"b":255}; break;
    case "aquamarine": return {"r":127,"g":255,"b":212}; break;
    case "azure": return {"r":240,"g":255,"b":255}; break;
    case "beige": return {"r":245,"g":245,"b":220}; break;
    case "bisque": return {"r":255,"g":228,"b":196}; break;
    case "black": return {"r":0,"g":0,"b":0}; break;
    case "blanchedalmond": return {"r":255,"g":235,"b":205}; break;
    case "blue": return {"r":0,"g":0,"b":255}; break;
    case "blueviolet": return {"r":138,"g":43,"b":226}; break;
    case "brown": return {"r":165,"g":42,"b":42}; break;
    case "burlywood": return {"r":222,"g":184,"b":135}; break;
    case "cadetblue": return {"r":95,"g":158,"b":160}; break;
    case "chartreuse": return {"r":127,"g":255,"b":0}; break;
    case "chocolate": return {"r":210,"g":105,"b":30}; break;
    case "coral": return {"r":255,"g":127,"b":80}; break;
    case "cornflowerblue": return {"r":100,"g":149,"b":237}; break;
    case "cornsilk": return {"r":255,"g":248,"b":220}; break;
    case "crimson": return {"r":220,"g":20,"b":60}; break;
    case "cyan": return {"r":0,"g":255,"b":255}; break;
    case "darkblue": return {"r":0,"g":0,"b":139}; break;
    case "darkcyan": return {"r":0,"g":139,"b":139}; break;
    case "darkgoldenrod": return {"r":184,"g":134,"b":11}; break;
    case "darkgray": return {"r":169,"g":169,"b":169}; break;
    case "darkgrey": return {"r":169,"g":169,"b":169}; break;
    case "darkgreen": return {"r":0,"g":100,"b":0}; break;
    case "darkkhaki": return {"r":189,"g":183,"b":107}; break;
    case "darkmagenta": return {"r":139,"g":0,"b":139}; break;
    case "darkolivegreen": return {"r":85,"g":107,"b":47}; break;
    case "darkorange": return {"r":255,"g":140,"b":0}; break;
    case "darkorchid": return {"r":153,"g":50,"b":204}; break;
    case "darkred": return {"r":139,"g":0,"b":0}; break;
    case "darksalmon": return {"r":233,"g":150,"b":122}; break;
    case "darkseagreen": return {"r":143,"g":188,"b":143}; break;
    case "darkslateblue": return {"r":72,"g":61,"b":139}; break;
    case "darkslategray": return {"r":47,"g":79,"b":79}; break;
    case "darkslategrey": return {"r":47,"g":79,"b":79}; break;
    case "darkturquoise": return {"r":0,"g":206,"b":209}; break;
    case "darkviolet": return {"r":148,"g":0,"b":211}; break;
    case "deeppink": return {"r":255,"g":20,"b":147}; break;
    case "deepskyblue": return {"r":0,"g":191,"b":255}; break;
    case "dimgray": return {"r":105,"g":105,"b":105}; break;
    case "dimgrey": return {"r":105,"g":105,"b":105}; break;
    case "dodgerblue": return {"r":30,"g":144,"b":255}; break;
    case "firebrick": return {"r":178,"g":34,"b":34}; break;
    case "floralwhite": return {"r":255,"g":250,"b":240}; break;
    case "forestgreen": return {"r":34,"g":139,"b":34}; break;
    case "fuchsia": return {"r":255,"g":0,"b":255}; break;
    case "gainsboro": return {"r":220,"g":220,"b":220}; break;
    case "ghostwhite": return {"r":248,"g":248,"b":255}; break;
    case "gold": return {"r":255,"g":215,"b":0}; break;
    case "goldenrod": return {"r":218,"g":165,"b":32}; break;
    case "gray": return {"r":128,"g":128,"b":128}; break;
    case "grey": return {"r":128,"g":128,"b":128}; break;
    case "green": return {"r":0,"g":128,"b":0}; break;
    case "greenyellow": return {"r":173,"g":255,"b":47}; break;
    case "honeydew": return {"r":240,"g":255,"b":240}; break;
    case "hotpink": return {"r":255,"g":105,"b":180}; break;
    case "indianred": return {"r":205,"g":92,"b":92}; break;
    case "indigo": return {"r":75,"g":0,"b":130}; break;
    case "ivory": return {"r":255,"g":255,"b":240}; break;
    case "khaki": return {"r":240,"g":230,"b":140}; break;
    case "lavender": return {"r":230,"g":230,"b":250}; break;
    case "lavenderblush": return {"r":255,"g":240,"b":245}; break;
    case "lawngreen": return {"r":124,"g":252,"b":0}; break;
    case "lemonchiffon": return {"r":255,"g":250,"b":205}; break;
    case "lightblue": return {"r":173,"g":216,"b":230}; break;
    case "lightcoral": return {"r":240,"g":128,"b":128}; break;
    case "lightcyan": return {"r":224,"g":255,"b":255}; break;
    case "lightgoldenrodyellow": return {"r":250,"g":250,"b":210}; break;
    case "lightgray": return {"r":211,"g":211,"b":211}; break;
    case "lightgrey": return {"r":211,"g":211,"b":211}; break;
    case "lightgreen": return {"r":144,"g":238,"b":144}; break;
    case "lightpink": return {"r":255,"g":182,"b":193}; break;
    case "lightsalmon": return {"r":255,"g":160,"b":122}; break;
    case "lightseagreen": return {"r":32,"g":178,"b":170}; break;
    case "lightskyblue": return {"r":135,"g":206,"b":250}; break;
    case "lightslategray": return {"r":119,"g":136,"b":153}; break;
    case "lightslategrey": return {"r":119,"g":136,"b":153}; break;
    case "lightsteelblue": return {"r":176,"g":196,"b":222}; break;
    case "lightyellow": return {"r":255,"g":255,"b":224}; break;
    case "lime": return {"r":0,"g":255,"b":0}; break;
    case "limegreen": return {"r":50,"g":205,"b":50}; break;
    case "linen": return {"r":250,"g":240,"b":230}; break;
    case "magenta": return {"r":255,"g":0,"b":255}; break;
    case "maroon": return {"r":128,"g":0,"b":0}; break;
    case "mediumaquamarine": return {"r":102,"g":205,"b":170}; break;
    case "mediumblue": return {"r":0,"g":0,"b":205}; break;
    case "mediumorchid": return {"r":186,"g":85,"b":211}; break;
    case "mediumpurple": return {"r":147,"g":112,"b":219}; break;
    case "mediumseagreen": return {"r":60,"g":179,"b":113}; break;
    case "mediumslateblue": return {"r":123,"g":104,"b":238}; break;
    case "mediumspringgreen": return {"r":0,"g":250,"b":154}; break;
    case "mediumturquoise": return {"r":72,"g":209,"b":204}; break;
    case "mediumvioletred": return {"r":199,"g":21,"b":133}; break;
    case "midnightblue": return {"r":25,"g":25,"b":112}; break;
    case "mintcream": return {"r":245,"g":255,"b":250}; break;
    case "mistyrose": return {"r":255,"g":228,"b":225}; break;
    case "moccasin": return {"r":255,"g":228,"b":181}; break;
    case "navajowhite": return {"r":255,"g":222,"b":173}; break;
    case "navy": return {"r":0,"g":0,"b":128}; break;
    case "oldlace": return {"r":253,"g":245,"b":230}; break;
    case "olive": return {"r":128,"g":128,"b":0}; break;
    case "olivedrab": return {"r":107,"g":142,"b":35}; break;
    case "orange": return {"r":255,"g":165,"b":0}; break;
    case "orangered": return {"r":255,"g":69,"b":0}; break;
    case "orchid": return {"r":218,"g":112,"b":214}; break;
    case "palegoldenrod": return {"r":238,"g":232,"b":170}; break;
    case "palegreen": return {"r":152,"g":251,"b":152}; break;
    case "paleturquoise": return {"r":175,"g":238,"b":238}; break;
    case "palevioletred": return {"r":219,"g":112,"b":147}; break;
    case "papayawhip": return {"r":255,"g":239,"b":213}; break;
    case "peachpuff": return {"r":255,"g":218,"b":185}; break;
    case "peru": return {"r":205,"g":133,"b":63}; break;
    case "pink": return {"r":255,"g":192,"b":203}; break;
    case "plum": return {"r":221,"g":160,"b":221}; break;
    case "powderblue": return {"r":176,"g":224,"b":230}; break;
    case "purple": return {"r":128,"g":0,"b":128}; break;
    case "rebeccapurple": return {"r":102,"g":51,"b":153}; break;
    case "red": return {"r":255,"g":0,"b":0}; break;
    case "rosybrown": return {"r":188,"g":143,"b":143}; break;
    case "royalblue": return {"r":65,"g":105,"b":225}; break;
    case "saddlebrown": return {"r":139,"g":69,"b":19}; break;
    case "salmon": return {"r":250,"g":128,"b":114}; break;
    case "sandybrown": return {"r":244,"g":164,"b":96}; break;
    case "seagreen": return {"r":46,"g":139,"b":87}; break;
    case "seashell": return {"r":255,"g":245,"b":238}; break;
    case "sienna": return {"r":160,"g":82,"b":45}; break;
    case "silver": return {"r":192,"g":192,"b":192}; break;
    case "skyblue": return {"r":135,"g":206,"b":235}; break;
    case "slateblue": return {"r":106,"g":90,"b":205}; break;
    case "slategray": return {"r":112,"g":128,"b":144}; break;
    case "slategrey": return {"r":112,"g":128,"b":144}; break;
    case "snow": return {"r":255,"g":250,"b":250}; break;
    case "springgreen": return {"r":0,"g":255,"b":127}; break;
    case "steelblue": return {"r":70,"g":130,"b":180}; break;
    case "tan": return {"r":210,"g":180,"b":140}; break;
    case "teal": return {"r":0,"g":128,"b":128}; break;
    case "thistle": return {"r":216,"g":191,"b":216}; break;
    case "tomato": return {"r":255,"g":99,"b":71}; break;
    case "turquoise": return {"r":64,"g":224,"b":208}; break;
    case "violet": return {"r":238,"g":130,"b":238}; break;
    case "wheat": return {"r":245,"g":222,"b":179}; break;
    case "white": return {"r":255,"g":255,"b":255}; break;
    case "whitesmoke": return {"r":245,"g":245,"b":245}; break;
    case "yellow": return {"r":255,"g":255,"b":0}; break;
    case "yellowgreen": return {"r":154,"g":205,"b":50}; break;
    default:
      console.error(`'${color}' unknown color`);
      return {"r":255,"g":255,"b":255};
      break;
  }
}

/*
////alte numbers funktion
var caught = false;
numbersall.forEach((el,id)=>{

    if(el[1] == true){
      if(!caught){
      caught = true;
      if (num != false) {
        console.log(el);
        //wenn anzeige nicht lehr
              //erzeuge eine div in der die nummer abgebildet wird
        el[0].style.pointerEvents = "none";
        el[0].children[0].setAttribute("class","floating_number");
        el[0].children[0].innerHTML = num;
        //ignoriert klicks damit objeklte dahinter angeklickt werden können
        el[0].innerHTML = "<div class=floating_number>" + num + "</div>";    //schreibe den nummerntext in eine div in der der text bewegt wird mit entsprechnder klasse
        el[0].setAttribute("style", "position: absolute !important; top:" + (y+numberallsum[1]) + "px; left: " + (x+numberallsum[0]) + "px; color:" + color + ";" + css);    //css atribute setzen
        el[1] = false;
        setTimeout(function(el, id) {   //lösche nach 2 sec
            el[0].style.display = "none";
            console.log(id);
            el[1] = true;
            el[0].children[0].setAttribute("class","");
        }.bind(null, el,id), 2000);
      }
}}});
if (!caught){
if (num != false) { //wenn anzeige nicht lehr
var el = document.createElement("div");   //erzeuge eine div in der die nummer abgebildet wird
el.style.pointerEvents = "none";    //ignoriert klicks damit objeklte dahinter angeklickt werden können
el.innerHTML = "<div class=floating_number>" + num + "</div>";    //schreibe den nummerntext in eine div in der der text bewegt wird mit entsprechnder klasse
el.setAttribute("style", "position: absolute !important; top:" + (y+numberallsum[1]) + "px; left: " + (x+numberallsum[0]) + "px; color:" + color + ";" + css);    //css atribute setzen
document.body.appendChild(el);
var id = numbersall.length;
numbersall.push([el,false,id]);
setTimeout(function(el, id) {   //lösche nach 2 sec
    el.style.display = "none";
    numbersall[id][1] = true;
    el.children[0].setAttribute("class","");

}.bind(null, el,id), 2000);
}
}
*/
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
      bullet(momentanerGegner.posx, momentanerGegner.posy, gegner[target].posx, gegner[target].posy, 100/gameSpeed);
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

scriptLoaded++;
