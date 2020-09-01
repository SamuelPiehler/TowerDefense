
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
for (var i = 0; i < towertypen.length; i++) {
  towerSelect[i] = [];
  for (var j = 0; j < 3; j = j+2) {
    towerSelect[i][j] = document.createElement("canvas");
    document.body.appendChild(towerSelect[i][j]);
    towerSelect[i][j].width = size;
    towerSelect[i][j].height = size;
    towerSelect[i][j].style.position = 'absolute';
    var x = size * (map[0].length) + 90;
    var y = size*1.7*i+100;
    if (i >= 6) {
      x += 120;
      y -= 6*size*1.7;
    }
    towerSelect[i][j].style.left = x +'px';
    towerSelect[i][j].style.top = y +'px';
  }
  ladeBild(towertypen[i][1], towerSelect[i][2], 0);
  towerSelect[i][2].name = i;
  towerSelect[i][2].addEventListener('click', select);
  towerSelect[i][2].addEventListener('mouseover', function(evt){showStats(evt, this);});
  towerSelect[i][2].addEventListener('mouseleave', function(){hideStats();});
}

//erzeugt start/pause button mit eventlistener
var startButton = document.createElement("img");
document.body.appendChild(startButton);
startButton.src = "Bilder/Buttons/start.png";
startButton.className  = "button";
startButton.style.position = 'absolute';
startButton.style.left = (size * (map[0].length+1.5))+'px';
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
speedButton.style.left = (size * (map[0].length+2) + 45)+'px';
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
autoStartButton.src = "Bilder/Buttons/AutoStartAus.png";
autoStartButton.className  = "button";
autoStartButton.style.position = 'absolute';
autoStartButton.style.left = (size * (map[0].length+2.5) + 45 + 77)+'px';
autoStartButton.style.top = 50+'px';
autoStartButton.addEventListener("click", function(){
  autoStart = !autoStart;
  if (autoStart) {
    autoStartButton.src = "Bilder/Buttons/AutoStartAnHover.png";
  }
  else {
    autoStartButton.src = "Bilder/Buttons/AutoStartAusHover.png";
  }
});
autoStartButton.addEventListener("mouseover", function(){
  if (autoStart) {
    autoStartButton.src = "Bilder/Buttons/AutoStartAnHover.png";
  }
  else {
    autoStartButton.src = "Bilder/Buttons/AutoStartAusHover.png";
  }
});
autoStartButton.addEventListener("mouseleave", function(){
  if (autoStart) {
    autoStartButton.src = "Bilder/Buttons/AutoStartAn.png";
  }
  else {
    autoStartButton.src = "Bilder/Buttons/AutoStartAus.png";
  }
});

//frägt ab ob eine Tastatur Taste gedückt oder losgelassen wird
document.querySelector("body").addEventListener("keydown", tasteGedrueckt);
document.querySelector("body").addEventListener("keyup", tasteLosgelassen);

function tasteGedrueckt(evt) {
  console.log(evt.key);
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
function ladeBild(src, canvas, richtung, clear = false, x = 0, y = 0, richtung2) {
  if (bildBuffer[src] == undefined) {     //wenn das bild noch nicht im buffer
    bildBuffer[src] = document.createElement('canvas');   //erzeuge neues kanvas im buffer in dem das bild dann abgespeichert wird
    bildBuffer[src].width = 70;
    bildBuffer[src].height = 70;
    bild = new Image();
    loading++;
    bild.onload = function(){
      zeichneBufferBild(bildBuffer[src], this, 0);    //zeiche das bild in den buffer
      zeicheBild(canvas, bildBuffer[src], richtung, clear, x, y, richtung2);    //hole das bild aus dem buffer und zeichne es
      if (loading == 1) {   //wenn alle buffer bilder fertig geladen sind
        waitForBildLoad.forEach((item, i) => {    //zeichne alle bilder in der warteliste
          item();
        });
        waitForBildLoad = [];
        if (updateFinish) {
          window.requestAnimationFrame(update);
        }
      }
      loading--;    //gibt an das ein weiteres bufferbild fertig geladen hat
    };
    bild.src = src;
  }
  else {
    if (loading == 0) {
      zeicheBild(canvas, bildBuffer[src], richtung, clear, x, y, richtung2);
    }
    else {    //wenn buffer gerade ein neues bild läd warte bis dieser fertig ist und zeichne das bild erst dann
      waitForBildLoad.push(function(){zeicheBild(canvas, bildBuffer[src], richtung, clear, x, y, richtung2)});
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
  intervals.push([function(übergabe){spawn(übergabe[0], übergabe[1]);}, [welle[0], welle[1]], roundTime, welle[3]*100, welle[2] - 1]);  //intervall wann gegner dieser teilwelle spawnen
  teilWellenNummer++;
}

//statfenster für das towerselect menü wenn tower gehovert werden zum bauen
function showStats(evt, object) {
  statFenster = document.createElement("div");
  document.body.appendChild(statFenster);
  statFenster.style.position = 'absolute';
  var x = evt.srcElement.offsetLeft + 65;
  var y = evt.srcElement.offsetTop + 60;
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
  if (x + statFenster.offsetWidth > screen.width) {
    x -= statFenster.offsetWidth + 50;
  }
  if (y + 100 + statFenster.offsetHeight > screen.height) {
    statFenster.style.bottom = '0px';
  }
  else {
    statFenster.style.top = y+'px';
  }
  statFenster.style.left = x+'px';
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
  if (y + 100 + upgradeFenster.offsetHeight > screen.height) {
    upgradeFenster.style.bottom = '0px';
  }
  else {
    upgradeFenster.style.top = y+'px';
  }
  upgradeFenster.style.left = x+'px';
}


//funktion zum schliesen der Stats/Upgradestats/-kosten anzeige
function hideUpgrade(){
  if (upgradeFenster != undefined) {
    upgradeFenster.remove();
    upgradeFenster = undefined;
  }
}

function zeicheBild(canvas, objImg, winkel, clear, x = 0, y = 0, richtung2 = undefined){
  objContext = canvas.getContext('2d');   //wähle inhalt des canvas zum verändern aus
  objContext.translate(size/2*Math.sqrt(2)*Math.sin((winkel-45)*Math.PI/180), -size/2*Math.sqrt(2)*Math.cos((winkel-45)*Math.PI/180));           // Ursprung verschieben damit bei drehung um den ursprung die mitte des bildes an der gewollten position bleibt
  objContext.translate(x+size/2, y+ size/2);           // Ursprung verschieben um angegebene koordinaten +35 damit das bild in der mitte eines 70x70 felden ist
  objContext.rotate(winkel*Math.PI/180);  // Context drehen
  if (clear) {
    objContext.clearRect(0, 0, size, size);   //löschen des inhalts des canvas wenn gewollt
  }
  objContext.drawImage(objImg, 0, 0, objImg.width, objImg.height,0, 0, size, size);   // Bild zeichnen
  objContext.rotate(-winkel*Math.PI/180);  // objektContext zurücksetzen um die funktion bei dem nächsten aufrufen nicht verändern zu müssen (canvas speicher drehungen und verschiebungen und es gilt für jedes zeichnen nach der drehung/verschiebung)
  objContext.translate(-x-size/2, -y-size/2);           // deswegen müssen die drehungen und verschiebungen genau um die negative zahl nochmal ausgeführt werden um es zu resetten
  objContext.translate(-size/2*Math.sqrt(2)*Math.sin((winkel-45)*Math.PI/180), size/2*Math.sqrt(2)*Math.cos((winkel-45)*Math.PI/180));
  if (richtung2 != undefined) {   //für basic turm upgradestufe 5 bild wird 2 mal gezeichnet mit unterschiedlichen richtungen
    objContext.translate(size/2*Math.sqrt(2)*Math.sin((richtung2-45)*Math.PI/180), -size/2*Math.sqrt(2)*Math.cos((richtung2-45)*Math.PI/180));
    objContext.translate(x+size/2, y+size/2);   //gleiche verschiebungen/drehungen wie oben
    objContext.rotate(richtung2*Math.PI/180);
    objContext.drawImage(objImg, 0, 0, size, size);
    objContext.rotate(-richtung2*Math.PI/180);
    objContext.translate(-x-size/2, -y-size/2);
    objContext.translate(-size/2*Math.sqrt(2)*Math.sin((richtung2-45)*Math.PI/180), size/2*Math.sqrt(2)*Math.cos((richtung2-45)*Math.PI/180));
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
      if (selected == 9) {    //wenn Supporttower öffne place menü
        addGeld(-preis);    //kosten abziehen
        var coordinaten = this.name.split(',');     //coordinaten werden aus dem angeklickten map canvas gelesen (jedes mapbild enthält im namen spaltennummer und zeilennummer mit komma getrennt)
        var number = 0;   //überprüfe im tuerme array welcher index der kleinste freie ist
        while (tuerme[number] != undefined) {
          number++;
        }
        tuerme[number] = new Turm(coordinaten[0], coordinaten[1], selected, number, prompt("Gieb dan bufftyp an (0-3)")*1);    //erstelle neuen turm mit koordinaten typ und id
      }
      else {  //ansonste plaziere turm
        if (selected == towertypen.length - 1) {
          selected = Math.floor(Math.random()*(towertypen.length - 1));
        }
        addGeld(-preis);    //kosten abziehen
        var coordinaten = this.name.split(',');     //coordinaten werden aus dem angeklickten map canvas gelesen (jedes mapbild enthält im namen spaltennummer und zeilennummer mit komma getrennt)
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
      if (tuerme[i] != undefined) {
        tuerme[i].zielen()
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
      var tempTimers = timers.slice();   //ausführung aller timer (zwischenspeicher in temp timers damit die schleife durchlaufen kann ohne die objekte der schleife zu ändern)
      tempTimers.forEach((item, i) => {
        if (item[1] <= roundTime) {   //wenn timerzeit abgelaufen ist
          item[0]();    //füge gespeicherte funktion aus
          timers.splice(i, 1);  //lösche timer
        }
      });
      var tempIntervals = intervals.slice();    //ausführung aller intervalle (zwischenspeicher in temp timers damit die schleife durchlaufen kann ohne die objekte der schleife zu ändern)
      tempIntervals.forEach((item, i) => {
        if (item[2] + item[3] <= roundTime) {   //wenn nächster aufruf des interwalls fällig ist
          item[0](item[1]);   //führe funktion des intervalls aus mit übergabewerte
          item[2] += item[3]; //update letzte ausführungszeit
          item[4]--;    //update anzahl der aufrufe
          if (item[4] <= 0) {   //wenn anzahl verblibener aufrufe = 0
            intervals.splice(i, 1);   //lösche intervall
          }
        }
      });
    }
  }
  if (loading == 0) {
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
      var entfernung = Math.sqrt(Math.pow((targetGegner[i].posx - momentanerGegner.posx), 2) + Math.pow((targetGegner[i].posy - momentanerGegner.posy), 2))*70/size;    //entfernung zum gegner
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

//Konstructor für objekt vom typ gegner
function Gegner(id, typ, lebenMult){
  this.letztesFeuer = roundTime;    //wann wurde der gegener das letzte mal von feuerschadentick getroffen
  this.letztesGift = roundTime;     //wann wurde der gegener das letzte mal von giftschadentick getroffen
  this.id = id; //nummer in gegner array
  this.typ = typ;
  this.leben = gegnertypen[typ][1]*lebenMult;
  this.maxHP = this.leben;
  this.imunität = gegnertypen[typ][3].slice();    //welche immunitäten hat der gegner in array  (.slice() wird hier benötigt um nicht eine verküpfung des arrays zu erstellen sondern eine unabhängige kopie)
  this.imunitätStärke = gegnertypen[typ][4].slice();    //wie stark sind die immunitäten
  this.effektTyp = [];    //welche efeckte betreffen den gegner momentan (hier wird slow gift feuer und stunn abgespeichert)
  this.effektStaerke = [];  //wie stark ist der jeweilige effeckt
  this.effektStart = [];  //wann wurde der effekt erzeugt
  this.effektZeit = [];   //wie lang gilt der effeckt
  this.effektUrsprung = []; //welcher turm hat den effeckt erzeugt (für dmg dealed anzeige)
  this.permaEffektStaerke = [0];  //wie stark ist der jeweilige dauerhafteEffeckt (index 0 = permaslow)
  this.strecke = 0;   // wie weit hat sich der gegner auf der map bewegt (für überprüfung welcher der weiteste gegner ist)
  this.mapx = start[1][0];   //koordinatendes momentanen mapfeldes spalte und zeile
  this.mapy = start[0][0];
  this.posx = this.mapx*size;   //koordinaten des gegners
  this.posy = this.mapy*size;   //koordinaten des gegners
  this.wert = gegnertypen[typ][5];    //wie viel geld ist der gegner on kill wert
  this.bewegt = 0;    //wie weit hat sich der gegner auf dem mapfeld schon bewegt zur überprüfung wann der gegner ein neues mapfeld erreicht hat
  this.baseSpeed = gegnertypen[typ][2]; //wie schnell bewegt sich der gegner
  this.richtung = map[this.mapy][this.mapx][0] % 4;   //in welche richtung schaut der gegner momentan
  this.src = gegnertypen[typ][0];   //url des gegnerbildes
  this.bewegen = function (){   //gametick für gegner
    var effektStaerken = [];    //erzeuge ein array zum abspeichern des stärksten effeckts von jedem typ
    var effektUrsprung = [];    //turm der den effeckt erzeugthat
    for (var i = 0; i < anzahlEffeckte; i++) {
      effektStaerken[i] = 0;
    }
    effektStaerken[15] = 0;
    for (var i = 0; i < this.effektTyp.length; i++) {   //gehe jeden effeckt durch der den gegner momentan betrifft
      if (this.effektTyp[i] != undefined) {   //skip falls effeckt gelöscht wurde
        if (roundTime - this.effektStart[i] <= this.effektZeit[i]) {    //skip falls efecktzeit abgelaufen ist
          if (this.effektStaerke[i] > effektStaerken[this.effektTyp[i]]) {    //wenn es der bisher stärkste effeckt von diesem typ ist
            effektStaerken[this.effektTyp[i]] = this.effektStaerke[i];    //wird er abgespeichert
            effektUrsprung[this.effektTyp[i]] = this.effektUrsprung[i];
          }
        }
        else {    //lösche effeckt wenn zeit abgelaufen ist
          this.effektTyp[i] = undefined;
          this.effektStaerke[i] = undefined;
          this.effektStart[i] = undefined;
          this.effektZeit[i] = undefined;
          this.effektUrsprung[i] = undefined;
        }
      }
    }
    if (effektStaerken[1] != 0) {
      console.log("test");
    }
    if (effektStaerken[1] > 0) {
      var speed = 0;
    }
    else {
      //berechne geschwindigkeit des gegners      hier speed durch slowstärke      hier speed durch permaslowstärke
      var speed = gameSpeed * this.baseSpeed / Math.max(1, effektStaerken[0] + 1) / Math.max(1, this.permaEffektStaerke[0] + 1) * (size / 70);
    }
    if (effektStaerken[0] != 0) {   //wenn der gegner geslowed wurde bekommt der erzeugende slowturm hier die credits dafür
      if (tuerme[effektUrsprung[0]] != undefined) {
        tuerme[effektUrsprung[0]].dmgDealed += gameSpeed;
      }
    }
    if (roundTime - this.letztesFeuer >= 50 && effektStaerken[2] > 0) {   //wenn der letzte feuerdmgtick mehr als eine halbe sec her ist und ein feuerreffeckt auf dem gegner ist
      if (roundTime - this.letztesFeuer - gameSpeed < 50) {   //setzen der zeit für letzten feuertick
        this.letztesFeuer += 50;
      }
      else {
        this.letztesFeuer = roundTime;
      }
      this.damage(effektStaerken[2]/2, [], [], [], effektUrsprung[2], "red");   //füge schaden für feuertick zu
      if (this.leben <= 0) {
        return;   //beende tick wenn gegner tot
      }
    }
    //wiederholung für gift
    if (roundTime - this.letztesGift >= 50 && (effektStaerken[3] > 0 || effektStaerken[15] > 0)) {
      if (roundTime - this.letztesGift - gameSpeed < 50) {
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
      this.damage(giftSchaden/2, [], [], [], effektUrsprung[3], "green");
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
      switch (this.richtung) {    //berechne neues mapfeld
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
      if (map[this.mapy][this.mapx][0] != -2) {   //wenn nicht kreuzung
        this.richtung = map[this.mapy][this.mapx][0] % 4;   //setze neue richtung
      }
      this.posx = this.mapx*size;   //setze gegner auf mitte des mapfelds
      this.posy = this.mapy*size;
      switch (this.richtung) {    //und setze restliche bewegung dann fort
        case 0:
          this.posy += -1 * (this.bewegt);
          break;
        case 1:
          this.posx += 1 * (this.bewegt);
          break;
        case 2:
          this.posy += 1 * (this.bewegt );
          break;
        case 3:
          this.posx += -1 * (this.bewegt);
          break;
      }
    }
    if (map[this.mapy][this.mapx][0] >= 9 && map[this.mapy][this.mapx][0] <= 11) {    //wenn mapfeld das zielfeld
      if (schwierigkeit != 0) {
        spielerLeben -= gegnertypen[this.typ][6];   //schade spieler
      }
      document.getElementById("Leben").innerHTML = spielerLeben;    //update lebensanzeige
      this.kill();  //lösche gegner
      if (spielerLeben <= 0) {    //verloren nachricht wenn leben = 0;
        alert("Du hast das Spiel Verloren!");
        clearInterval(updateGame);
      }
    }
  }
  //funktion um schaden/effeckte am gegner zu berechnen
  this.damage = function(points, effekt, effektStaerke, effektZeit, ursprung, farbe = "white"){
    var orginalPoints = points;
    for (var i = 0; i < effekt.length; i++) {   //gehe alle effekte durch für aoe, tessla und immunitäten
      if (effekt[i] == 6) {    //suche TeslaEffekt effeckt
        teslaEffekt(points, effektStaerke[i], effektZeit[i], ursprung, gegner.slice(), this, false);
      }
      if (effekt[i] == 5) {    //suche AoE effeckt
        for (var j = gegner.length - 1; j >= 0; j--) {
          if (gegner[j] != undefined) {
            var entfernung = Math.sqrt(Math.pow((gegner[j].posx - this.posx), 2) + Math.pow((gegner[j].posy - this.posy), 2))*70/size;  //abstand zu getroffenem gegner
            if (entfernung <= effektZeit[i]) {   //wenn in AoE range
              uebergabeEffekt = effekt.slice();
              uebergabeEffektStaerke = effektStaerke.slice();
              uebergabeEffektTime = effektZeit.slice();
              uebergabeEffekt.splice(i,1);
              uebergabeEffektStaerke.splice(i,1);
              uebergabeEffektTime.splice(i,1);
              gegner[j].damage(effektStaerke[i], uebergabeEffekt, uebergabeEffektStaerke, uebergabeEffektTime, ursprung);  //füge gegner den effektschaden zu
            }
          }
        }
        if (this.leben <= 0) {
          return false;   //beende funktion wenn gegner tot ist (damit keine aktionen am nicht existierenden gegner mehr ausgeführt werden)
        }
      }
      for (var j = 0; j < this.imunität.length; j++) { //gehe alle immunitäten des gegners durch
        if (this.imunität[j] == effekt[i]) {   //betrifft diese immunität diesen effeckt?
          effektStaerke[i] *= Math.max(1 - this.imunitätStärke[j]/100, 0);   //reduziere effecktstärke je nach immunität
          if (this.imunität[j] == 2 && effekt[i] == 2) { //wenn feuerschaden reduziere den schaden je nach immunität
            points *= Math.max(1 - this.imunitätStärke[j]/100, 0);
          }
          if (this.imunität[j] == 3 && effekt[i] == 3) { //wenn giftschaden reduziere den schaden je nach immunität
            points *= Math.max(1 - this.imunitätStärke[j]/100, 0);
          }
          break;
        }
        if (this.imunität[j] == 0 && effekt[i] == 4) {    //slow imunität wirkt auf permaslow
          effektStaerke[i] *= Math.max(1 - this.imunitätStärke[j]/100, 0);
        }
        if (this.imunität[j] == 3 && effekt[i] == 15) {   //gift immunität wirkt auf stackbares Gift
          effektStaerke[i] *= Math.max(1 - this.imunitätStärke[j]/100, 0);
        }
      }
    }
    for (var j = 0; j < this.imunität.length; j++) {
      if (this.imunität[j] == 6 && farbe == "white") {   //wenn normalschaden und %dmg mitigation
        points *= Math.max(1 - this.imunitätStärke[j]/100, 0);
      }
      else if (this.imunität[j] == 5 && farbe == "white") {   //wenn normalschaden und flat dmg mitigation
        points = Math.max(points-this.imunitätStärke[j], 0);
      }
    }
    points = round(points, 2)
    var anzeige = points; //was für eine schadensanzeige wird erzeugt
    switch (effekt[0]) {
      case 0:
        anzeige = "Slow";
        farbe = "#7070ff";
        break;
      case 1:
        anzeige = "Stunned";
        if (points != 0) {
          anzeige +="<br>"+points;
        }
        break;
      case 2:
        farbe = "red";
        break;
      case 3:
        farbe = "green";
        break;
    }
    if (anzeige != 0) { //erzeuge schadensanzeige
      numbers(anzeige, this.posx, this.posy, farbe);
    }
    for (var i = 0; i < effekt.length; i++) { //wurden beim schaden effeckte mitgegeben wurde
      if (effekt[i] > 10 || effekt[i] < 4) { // 4=permaslow und die anderen efeckte werden nicht im gegner gespeichert extra behandelt
        var handeled = false;   //effeckt schon abgehandelt (bei überschreiben von altem effeckt)
        for (var j = 0; j < this.effektTyp.length; j++) {   //gehe alle effeckte durch ob dieser efeckt schon vom gleichen ursprung mit gleicher stärke schon existiert
          if (this.effektTyp[j] == effekt[i] && this.effektStaerke[j] <= effektStaerke[i] && this.effektUrsprung[j] == ursprung) {
            this.effektZeit[j] = Math.max(effektZeit[i] + roundTime - this.effektStart[j], this.effektZeit[j]);  //wenn ja verängere nur efeckt zeit
            handeled = true;
            break;
          }
        }
        if (!handeled) {  //wenn efeckt so noch nicht existiert hat
          var num = 0;  //suche erste freie stelle im efecktarray
          while (this.effektTyp[num] != undefined) {
            num++;
          }
          this.effektTyp[num] = effekt[i];   //und schreibe den effeckt mit daten rein
          this.effektStaerke[num] = effektStaerke[i];
          this.effektStart[num] = roundTime;
          this.effektZeit[num] = effektZeit[i];
          this.effektUrsprung[num] = ursprung;
        }
      }
      else if (effekt[i] == 4) {
        this.permaEffektStaerke[0] = Math.min(1, this.permaEffektStaerke[0]+effektStaerke[i]);
        if (tuerme[ursprung] != undefined) {
          tuerme[ursprung].effecktStacks++;
        }
      }
    }
    if (tuerme[ursprung] != undefined) {
      tuerme[ursprung].dmgDealed += Math.min(points, this.leben);   //schaden zugefügt wird bei erzeugerturm aufgerechnet
    }
    this.leben -= points; //leben werden abgezogen
    if (this.leben <= 0) {  //wenn gegner keine leben mehr hat
      addGeld(this.wert);   //geld für kill hinzufügen
      this.kill();  //gegner entfernen
      return false;
    }
    else {
      return true;
    }
  }
  this.kill = function(){   //wenn gegner tot oder am ziehl ist entfernen
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
    gegner.splice(this.id, 1);  //aus liste löschen
    for (var i = this.id; i < gegner.length; i++) {
      gegner[i].id--;   //gegnerid von anderen gegnern anpassen (damit sie weiterhin vortlaufend ist)
    }
  }
}

//Konstructor für objekt vom typ Turm
function Turm(posx, posy, typ, id, spezialisierung) {
  this.id = id; //nummer in turmarray
  this.upgradeStufe = 0;
  this.posx = posx*size;  //koordinaten
  this.posy = posy*size;
  this.typ = typ;
  this.wert = parseInt(parseInt(towertypen[this.typ][6]*preisMult) * 0.8);    //verkaufswert
  this.reichweite = towertypen[this.typ][4];
  this.drehGeschw = towertypen[this.typ][3];
  this.schaden = towertypen[this.typ][2];
  this.angriffsZeit = towertypen[this.typ][5];
  if (spezialisierung == undefined) {
    this.effekt = towertypen[this.typ][7].slice();
    this.effektStaerke = towertypen[this.typ][8].slice();
    this.effektTime = towertypen[this.typ][9].slice();
  }
  else {
    this.effekt = [];
    this.effektStaerke = [];
    this.effektTime = [];
    this.effekt[0] = towertypen[this.typ][7][spezialisierung];
    this.effektStaerke[0] = towertypen[this.typ][8][spezialisierung];
    this.effektTime[0] = towertypen[this.typ][9][spezialisierung];
    this.reichweite = this.effektTime[0];
  }
  for (var i = 0; i < this.effekt.length; i++) {
    if (this.effekt[i] < 5 || this.effekt[i] > 10 ) {
      this.effektTime[i] *= 100;
    }
  }
  this.buffStaerken = [0, 0, 0, 0];  //buffs von Supporttowern 0 = Dmg, 1 = Attackspeed, 2 = Effeckt, 3 = Range/Drehspeed
  this.letzterAngriff = roundTime;    //wann hat der turm zuletzt angegriffen
  this.letzterAngriff2;    //wann hat der turm zuletzt angegriffen gilt für lauf 2 für basic turm stufe 5
  this.richtung = 0;    //in welche richtung schaut der turm
  this.richtung2 = 0;   // basicturm upgradestufe 5 richtung des 2ten geschützes
  this.target = -1;
  this.targetPrio = 0;
  this.dmgDealed = 0;   //wie viel schaden hat der turm insgesamt verursacht
  this.effecktStacks = 0; //wie viele effecktstacks hat dieser turm verursacht
  this.canvasBase = document.createElement("canvas");   //bild der turmbase
  document.body.appendChild(this.canvasBase);
  this.canvasBase.id = "TurmBase"+this.id;
  this.canvasBase.width = size;
  this.canvasBase.height = size;
  this.canvasBase.style.position = 'absolute';
  this.canvasBase.style.left = (this.posx+10)+'px';
  this.canvasBase.style.top = (this.posy+50)+'px';
  this.canvasBase.style.zIndex=3;
  ladeBild(towertypen[this.typ][0], this.canvasBase, 0);
  this.canvasGeschütz = document.createElement("canvas"); //bild für geschütz
  document.body.appendChild(this.canvasGeschütz);
  this.canvasGeschütz.id = "TurmGeschütz"+this.id;
  this.canvasGeschütz.width = size;
  this.canvasGeschütz.height = size;
  this.canvasGeschütz.style.position = 'absolute';
  this.canvasGeschütz.style.left = (this.posx+10)+'px';
  this.canvasGeschütz.style.top = (this.posy+50)+'px';
  this.canvasGeschütz.style.zIndex=5;
  this.canvasGeschütz.onmouseleave = function(){hideRange();};   //versteckt reichweite wenn maus nichtmehr über turm
  var id = this.id;
  this.canvasGeschütz.addEventListener('mouseover', function(evt){showRange(evt, this, id);});  //zeige reichweite des turms bei hover
  this.canvasGeschütz.addEventListener('click', function(){showUpgrade(this, id);});    //wenn angeklickt zeige stats und upgrade infos
  ladeBild(towertypen[this.typ][1], this.canvasGeschütz, 0);
  this.buffTuerme = function(){
    for (var i = 0; i < this.effekt.length; i++) {
      if (this.effekt[i] >= 7 && this.effekt[i] <= 10) {
        tuerme.forEach((item, j) => {
          if (item != undefined && j != this.id) {
            entfernung = Math.sqrt(Math.pow((item.posx - this.posx), 2) + Math.pow((item.posy - this.posy), 2))*70/size;
            if (entfernung <= this.effektTime*(1+this.buffStaerken[3]/100)) {
              if (!(item.effekt[0] == 9)) {
                if (item.typ == 9 && item.buffStaerken[this.effekt[i]-7] < this.effektStaerke[i]*(1+this.buffStaerken[2]/100)) {
                  item.buffStaerken[this.effekt[i]-7] = this.effektStaerke[i]*(1+this.buffStaerken[2]/100);
                  item.buffTuerme();
                }
                else {
                  item.buffStaerken[this.effekt[i]-7] = Math.max(item.buffStaerken[this.effekt[i]-7], this.effektStaerke[i]*(1+this.buffStaerken[2]/100));
                }
              }
              else {
                if (item.buffStaerken[this.effekt[i]-7] < this.effektStaerke[i]) {
                  item.buffStaerken[this.effekt[i]-7] = this.effektStaerke[i];
                  item.buffTuerme();
                }
              }
            }
          }
        });
      }
    }
  };
  if (this.typ == 9) {
    this.buffTuerme();
  }
  this.changeTarget = function(){   //funktion um targetpriorität zu ändern
    hideUpgrade();
    var typ = tuerme[id].typ;
    upgradeFenster = document.createElement("div");
    document.body.appendChild(upgradeFenster);
    upgradeFenster.style.position = 'absolute';
    upgradeFenster.style.left = (this.posx)+'px';
    upgradeFenster.style.top = (this.posy + size*2)+'px';
    upgradeFenster.style.backgroundColor  = '#d5d0ffd0';
    upgradeFenster.style.zIndex=6;
    upgradeFenster.style.width="150px";
    upgradeFenster.style.height="50px";
    var closeButton = document.createElement("button");   //button um das upgradefenster zu schliesen
    upgradeFenster.appendChild(closeButton);
    closeButton.innerHTML = "x";
    closeButton.style.position = 'absolute';
    closeButton.style.left = (upgradeFenster.scrollWidth-23)+'px';
    closeButton.style.top = (0)+'px';
    closeButton.addEventListener("click", function(){hideUpgrade();});
    id = this.id;
    var firstButton = document.createElement("button");
    upgradeFenster.appendChild(firstButton);
    firstButton.innerHTML = "first";
    firstButton.style.position = 'absolute';
    firstButton.style.left = (0)+'px';
    firstButton.style.top = (0)+'px';
    firstButton.addEventListener("click", function(){tuerme[id].targetPrio=0;hideUpgrade();});
    var lastButton = document.createElement("button");
    upgradeFenster.appendChild(lastButton);
    lastButton.innerHTML = "last";
    lastButton.style.position = 'absolute';
    lastButton.style.left = (60)+'px';
    lastButton.style.top = (0)+'px';
    lastButton.addEventListener("click", function(){tuerme[id].targetPrio=1;hideUpgrade();});
    var strongButton = document.createElement("button");
    upgradeFenster.appendChild(strongButton);
    strongButton.innerHTML = "strong";
    strongButton.style.position = 'absolute';
    strongButton.style.left = (0)+'px';
    strongButton.style.bottom = (0)+'px';
    strongButton.addEventListener("click", function(){tuerme[id].targetPrio=2;hideUpgrade();});
    var weakButton = document.createElement("button");
    upgradeFenster.appendChild(weakButton);
    weakButton.innerHTML = "weak";
    weakButton.style.position = 'absolute';
    weakButton.style.left = (60)+'px';
    weakButton.style.bottom = (0)+'px';
    weakButton.addEventListener("click", function(){tuerme[id].targetPrio=3;hideUpgrade();});
  }
  this.sell = function(){   //funktion um turm zu verkaufen
    this.canvasBase.remove();
    this.canvasGeschütz.remove();
    addGeld(this.wert);
    tuerme[id] = undefined;
    hideUpgrade();
    if (this.typ == 9) {
      tuerme.forEach((item, i) => {
        if (item != undefined) {
          item.buffStaerken = [0, 0, 0, 0];
        }
      });
      tuerme.forEach((item, i) => {
        if (item != undefined && item.typ == 9) {
          item.buffTuerme();
        }
      });
    }
  };
  this.upgrade = function(){    //funktion um turm aufzuwerten
    var successUp = false;      //konnte der turm aufgewertet werden
    if (this.upgradeStufe < maxUpgrade){
      if (this.upgradeStufe == maxUpgrade - 1){    //berechne upgrade preis
        preis = parseInt(towertypen[this.typ][6]*preisMult)*2;
      }
      else {
        preis = parseInt(parseInt(towertypen[this.typ][6]*preisMult)*(25+10*this.upgradeStufe)/100);
      }
      if (geld >= preis) {  //genug geld vorhanden?
        successUp = true;
        addGeld(-preis);
        this.upgradeStufe++;    //erhöhe werte des turms
        this.wert = round(this.wert+parseInt(preis*0.8), 4);
        this.drehGeschw = round(this.drehGeschw+towertypen[this.typ][3]/10, 4);
        this.schaden = round(this.schaden+towertypen[typ][2]/10, 4);
        if (this.typ != 10) {
          this.angriffsZeit = round(this.angriffsZeit-towertypen[typ][5]/10, 4);
          this.reichweite = round(this.reichweite+towertypen[this.typ][4]/10, 4);
        }
        for (var i = 0; i < this.effekt.length; i++) {    //upgrade towereffeckte
          if (this.effekt[i] == 6) {
            this.effektStaerke[i]++;
          }
          else if (this.effekt[i] >= 7 && this.effekt[i] <= 10) {
            this.effektStaerke[i] = round(this.effektStaerke[i]+towertypen[this.typ][8][this.effekt[i]-7]*0.1, 4);
          }
          else if (this.effekt[i] != 1){
            this.effektStaerke[i] = round(this.effektStaerke[i]+towertypen[this.typ][8][i]*0.1, 4);
          }
          if (this.effekt[i] >= 5 && this.effekt[i] <= 10) {   //ist in effekttime zeit oder reichweite abgespeichert?
            if (this.typ == 9) {
              this.effektTime[i] = round(this.effektTime[i]+towertypen[this.typ][9][this.effekt[0]-7]/10, 4);
            }
            else {
              this.effektTime[i] = round(this.effektTime[i]+towertypen[this.typ][9][i]/10, 4);
            }
          }
          else {
            this.effektTime[i] = round(this.effektTime[i]+towertypen[this.typ][9][i]*10, 4);
          }
        }
        if (this.typ == 9) {
          this.reichweite = this.effektTime[0];
        }
      }
      if (this.upgradeStufe == maxUpgrade){    //upgradestufe 5 (spezial upgrade)
        if (towertypen[this.typ][12]) {
          switch (this.typ) {   //welcher typ hat der zu upgradende turm
            case 0:   //basic bekommt 2ten lauf
              ladeBild("Bilder/Tower/00basic5Base.png", this.canvasBase, 0, true);
              ladeBild(towertypen[this.typ][11], this.canvasGeschütz, -this.richtung, true, 0, 0, -this.richtung2);
              this.reichweite += 10;
            break;
            case 1:   //sniper  trifft alle gegner in der linie
              ladeBild(towertypen[this.typ][11], this.canvasGeschütz, 0, true);
              break;
            case 2:   //slow permanenter slowstack auf gegner max 100 stacks = speed/1.25
              ladeBild(towertypen[this.typ][11], this.canvasGeschütz, 0, true);
              this.effekt.push(4);
              this.effektStaerke.push(0.005);
              this.effektTime.push(0);
              break;
            case 3:   //gift kann sich nun stacken
              this.effekt[0] = 15;
              ladeBild(towertypen[this.typ][11], this.canvasGeschütz, 0, true);
              break;
            case 4:   //FeuerAoe trifft zusätzlich zufälligen gegner auf der map mit extra feuerschaden und stärkerem tickschaden
              ladeBild(towertypen[this.typ][11], this.canvasGeschütz, 0, true);
              break;
            case 5:   //Anti boss extra stunn duration, targetlock, extra schaden pro treffer
              ladeBild("Bilder/Tower/05antiBoss5Base.png", this.canvasBase, 0, true);
              ladeBild(towertypen[this.typ][11], this.canvasGeschütz, 0, true);
              this.effektTime[0] = 120;
              break;
            case 6:   //rocketLauncher Stunned Gegner für 0,5 sec
              ladeBild(towertypen[this.typ][11], this.canvasGeschütz, 0, true);
              this.effekt.push(1);
              this.effektStaerke.push(1);
              this.effektTime.push(50);
              break;
            case 7:   //singleGift
              this.effektStaerke[0] *= 2;
              this.effektTime[0] /= 1.5;
              ladeBild(towertypen[this.typ][11], this.canvasGeschütz, 0, true);
              break;
            case 8:   //Lava
              this.effektStaerke[0] *= 2;
              this.effektTime[0] /= 1.5;
              ladeBild(towertypen[this.typ][11], this.canvasGeschütz, 0, true);
              break;
            case 9:   //Support
              this.effektStaerke[0] += towertypen[9][8][this.effekt[0]-7]*0.5;
              this.effektTime[0] += towertypen[9][9][this.effekt[0]-7]*0.5;
              this.reichweite = this.effektTime[0];
              ladeBild(towertypen[this.typ][11], this.canvasGeschütz, 0, true);
              break;
            case 10:   //Tesla
              this.effektStaerke[0] += 3;
              ladeBild(towertypen[this.typ][11], this.canvasGeschütz, 0, true);
              break;
          }
        }
      }
    }
    if (this.typ == 9) {
      this.buffTuerme();
    }
    if (successUp) {    //wenn genug geld für upgrade vorhanden war
      hideUpgrade();    //verstecke upgradefenster
      if (shift) {      //wenn shift gedrückt ist
        showUpgrade(this.canvasGeschütz, this.id);    //zeige geupdatetes upgradefenster
          document.getElementById("fehler"+this.id).hidden = true;    //verstecke fehleranzeige
      }
    }
    else {    //zeige fehler nicht genug geld
      document.getElementById("fehler"+this.id).hidden = false;
    }
  };
  this.drehen = function(grad, target, grad2, target2){   // richte turm in richtung gegner aus grad ist gegnerrichtung target ist gegner id (2 für basic turm stufe 5 zweites target)
    var uebergabeEffektStaerke = this.effektStaerke.slice();    //berechne übergabewerte für effeckte falls ein angriff ausgeführt wird
    var uebergabeEffektTime = this.effektTime.slice();
    for (var i = 0; i < this.effekt.length; i++) {
      uebergabeEffektStaerke[i] *= (1+this.buffStaerken[2]/100);
      uebergabeEffektTime[i] *= (1+this.buffStaerken[2]/100);
    }
    while (this.richtung - grad > 180) {    //setze gradzahlen so dass der unterschied möglichst klein ist (kann immer <= 180 sein)
      grad += 360;
    }
    while (grad - this.richtung > 180) {
      this.richtung += 360;
    }
    if (this.upgradeStufe == maxUpgrade && this.typ == 0 && towertypen[this.typ][12] && target2 != -1) {    // wenn basic turm stufe 5
      while (this.richtung - grad2 > 180) {
        grad2 += 360;
      }
      while (grad2 - this.richtung > 180) {
        this.richtung += 360;
      }
      if (Math.abs(this.richtung - grad) > Math.abs(this.richtung - grad2)) {
        var temp = grad;
        grad = grad2;
        grad2 = temp;
      }
      while (this.richtung2 - grad2 > 180) {
        grad2 += 360;
      }
      while (grad2 - this.richtung2 > 180) {
        this.richtung2 += 360;
      }
      if (Math.abs(this.richtung2 - grad2) < this.drehGeschw*gameSpeed*(1+this.buffStaerken[3]/100)) {   //wenn sich der turm lauf2 bis zum gegner2 drehen kann in diesem gametick
        this.richtung2 = grad2;
        if (roundTime - this.letzterAngriff2 >= 100 * this.angriffsZeit/(1+this.buffStaerken[1]/100)) {   //wenn zeit des letzten angriffs länger als angriffszeit her ist
          gegner[target2].damage(this.schaden*(1+this.buffStaerken[0]/100), this.effekt.slice(), uebergabeEffektStaerke.slice(), uebergabeEffektTime.slice(), this.id);   //füge schaden und effeckt auf gegner zu
          if (roundTime - this.letzterAngriff2 -gameSpeed < 100 * this.angriffsZeit/(1+this.buffStaerken[1]/100)) {
            this.letzterAngriff2 += 100 * this.angriffsZeit/(1+this.buffStaerken[1]/100);
          }
          else {
            this.letzterAngriff2 = roundTime;
          }
        }
      }
      else if (this.richtung2 > grad2) {    //drehe richtung gegner
        this.richtung2 -= this.drehGeschw*gameSpeed*(1+this.buffStaerken[3]/100);
      }
      else {
        this.richtung2 += this.drehGeschw*gameSpeed*(1+this.buffStaerken[3]/100);
      }
    }
    if (Math.abs(this.richtung - grad) < this.drehGeschw*gameSpeed*(1+this.buffStaerken[3]/100)) {   //wenn sich der turm bis zum gegner drehen kann in diesem gametick
      this.richtung = grad;
      if (roundTime - this.letzterAngriff >= 100 * this.angriffsZeit/(1+this.buffStaerken[1]/100)) {   //wenn zeit des letzten angriffs länger als angriffszeit her ist
        if (this.typ == 1 && this.upgradeStufe == maxUpgrade && towertypen[this.typ][12]) {    //wenn sniper stufe 5
          
        }
        else if (this.typ == 5 && this.upgradeStufe == maxUpgrade && towertypen[this.typ][12]) {    //wenn antiBoss stufe 5
          //füge schaden und effeckt auf gegner zu
          gegner[target].damage(this.schaden*(1+this.buffStaerken[0]/100)+50*this.effecktStacks*(1+this.buffStaerken[2]/100), this.effekt.slice(), uebergabeEffektStaerke.slice(), uebergabeEffektTime.slice(), this.id);
          if (target != -1) {
            this.effecktStacks++;
          }
        }
        else {
          gegner[target].damage(this.schaden*(1+this.buffStaerken[0]/100), this.effekt.slice(), uebergabeEffektStaerke.slice(), uebergabeEffektTime.slice(), this.id);   //füge schaden und effeckt auf gegner zu
        }
        if (roundTime - this.letzterAngriff -gameSpeed < 100 * this.angriffsZeit/(1+this.buffStaerken[1]/100)) {
          this.letzterAngriff += 100 * this.angriffsZeit/(1+this.buffStaerken[1]/100);
        }
        else {
          this.letzterAngriff = roundTime;
        }
      }
    }
    else if (this.richtung > grad) {    //drehe richtung gegner
      this.richtung -= this.drehGeschw*gameSpeed*(1+this.buffStaerken[3]/100);
    }
    else {
      this.richtung += this.drehGeschw*gameSpeed*(1+this.buffStaerken[3]/100);
    }
    //erzeuge turmbild in richtige richtung gedreht
    if (this.upgradeStufe == maxUpgrade && towertypen[this.typ][12]) {//wenn stufe5 special upgrade
      if (this.typ == 0) { //stufe5 basic doppel lauf bild
        ladeBild(towertypen[this.typ][11], this.canvasGeschütz, -this.richtung, true,  0, 0, -this.richtung2);
      }
      else {
        ladeBild(towertypen[this.typ][11], this.canvasGeschütz, -this.richtung, true);
      }
    }
    else {
      ladeBild(towertypen[this.typ][1], this.canvasGeschütz, -this.richtung, true);
    }
  };
  this.zielen = function() {    //wird 1 mal pro gametick ausgeführt
    var uebergabeEffektStaerke = this.effektStaerke.slice();    //berechne übergabewerte für effeckte falls ein angriff ausgeführt wird
    var uebergabeEffektTime = this.effektTime.slice();
    for (var i = 0; i < this.effekt.length; i++) {
      uebergabeEffektStaerke[i] *= (1+this.buffStaerken[2]/100);
      uebergabeEffektTime[i] *= (1+this.buffStaerken[2]/100);
    }
    target = -1;
    target2 = -1;
    gegner.forEach((item, i) => {   //überprüfe jeden gegner
      if (item != undefined) {
        var entfernung = Math.sqrt(Math.pow((item.posx - this.posx), 2) + Math.pow((item.posy - this.posy), 2))*70/size;    //entfernung zum gegner
        if (entfernung <= this.reichweite*(1+this.buffStaerken[3]/100)) {    //wenn in reichweite
          if (this.drehGeschw == 0) {     //drehgeschwindigkeit 0 trifft alle gegner in reichweite und ziehlt nicht
            if (roundTime - this.letzterAngriff >= 100 * this.angriffsZeit/(1+this.buffStaerken[1]/100)) {     //wenn letzter angriff langenug her war greife gegner an
              gegner[i].damage(this.schaden*(1+this.buffStaerken[0]/100), this.effekt.slice(), uebergabeEffektStaerke.slice(), uebergabeEffektTime.slice(), this.id);
              target = -2;    //zeichen dass gegner angegriffen wurden um angriffszeit zu setzen nachdem alle gegner gehandeld wurden
            }
          }
          else if (this.upgradeStufe == maxUpgrade && this.typ == 0 && towertypen[this.typ][12]) {   //wenn basic turm stufe 5 (2 targets werden gesucht)
            if (gegner[target] == undefined) {    //wähle erstes target
              target = i;
            }
            else {
              switch (this.targetPrio) {
                case 0:
                  if (gegner[target].strecke < item.strecke) {   //update targets so dass der weiteste gegner immer target 1 ist und der zweit weiteste gegner target 2
                    target2 = target;
                    target = i;
                  }
                  else if (gegner[target2] == undefined || gegner[target2].strecke < item.strecke) {
                    target2 = i;
                  }
                  break;
                case 1:
                  if (gegner[target].strecke > item.strecke) {   //update targets so dass der letzte gegner immer target 1 ist und der zweite von hinten  target 2
                    target2 = target;
                    target = i;
                  }
                  else if (gegner[target2] == undefined || gegner[target2].strecke > item.strecke) {
                    target2 = i;
                  }
                  break;
                case 2:
                  if (gegner[target].leben < item.leben) {   //update targets so dass der gegner mit den meisten leben immer target 1 ist und der zweite target 2
                    target2 = target;
                    target = i;
                  }
                  else if (gegner[target2] == undefined || gegner[target2].leben < item.leben) {
                    target2 = i;
                  }
                  break;
                case 3:
                  if (gegner[target].leben > item.leben) {   //update targets so dass der gegner mit den wenigsten leben immer target 1 ist und der zweite target 2
                    target2 = target;
                    target = i;
                  }
                  else if (gegner[target2] == undefined || gegner[target2].leben > item.leben) {
                    target2 = i;
                  }
                  break;
              }
            }
          }
          else {
            switch (this.targetPrio) {
              case 0:
                if (gegner[target] == undefined || gegner[target].strecke < item.strecke) {
                  target = i;
                }
                break;
              case 1:
                if (gegner[target] == undefined || gegner[target].strecke > item.strecke) {
                  target = i;
                }
                break;
              case 2:
                if (gegner[target] == undefined || gegner[target].leben < item.leben) {
                  target = i;
                }
                break;
              case 3:
                if (gegner[target] == undefined || gegner[target].leben > item.leben) {
                  target = i;
                }
                break;
            }
          }
        }
      }
    });
    if (target > -1) {    // wenn ein target gewählt werden konnte
      if(this.typ == 5 && this.upgradeStufe == maxUpgrade && towertypen[this.typ][12]){
        if (gegner[this.target] != undefined) {
          var entfernung = Math.sqrt(Math.pow((gegner[this.target].posx - this.posx), 2) + Math.pow((gegner[this.target].posy - this.posy), 2))*70/size;
          if (entfernung <= this.reichweite*(1+this.buffStaerken[3]/100)) {
            target = this.target;
          }
        }
        if (this.target != target) {
          this.effecktStacks = 0;
          this.target = target;
        }
      }
      var gegnerRichtung2;
      if (target2 > -1) {   //wenn ein 2tes target gewählt wurde
        var entfernung = Math.sqrt(Math.pow((gegner[target2].posx - this.posx), 2) + Math.pow((gegner[target2].posy - this.posy), 2));
        if (gegner[target2].posy - this.posy < 0) {   //richtung zum target2 berechnet
          gegnerRichtung2 = 180/Math.PI*Math.acos((gegner[target2].posx - this.posx) / entfernung);
        }
        else {
          gegnerRichtung2 = 360 - (180/Math.PI*Math.acos((gegner[target2].posx - this.posx) / entfernung));
        }
      }
      var entfernung = Math.sqrt(Math.pow((gegner[target].posx - this.posx), 2) + Math.pow((gegner[target].posy - this.posy), 2));
      if (gegner[target].posy - this.posy < 0) {   //richtung zum target berechnet
        gegnerRichtung = 180/Math.PI*Math.acos((gegner[target].posx - this.posx) / entfernung);
      }
      else {
        gegnerRichtung = 360 - (180/Math.PI*Math.acos((gegner[target].posx - this.posx) / entfernung));
      }
      this.drehen(gegnerRichtung - 90, target, gegnerRichtung2 - 90, target2);  //drehe tower in richtung target
    }
    if (target == -2) {   //wenn turm alles in reichweite angreift und target gefunden wurde setze neue letzte angriffszeit
      if (roundTime - this.letzterAngriff -gameSpeed < 100 * this.angriffsZeit/(1+this.buffStaerken[1]/100)) {
        this.letzterAngriff += 100 * this.angriffsZeit/(1+this.buffStaerken[1]/100);
      }
      else {
        this.letzterAngriff = roundTime;
      }
      if (this.typ == 4 && this.upgradeStufe == maxUpgrade && towertypen[this.typ][12]) {
        if (Math.random() < 0.3) {
          gegner[parseInt(Math.random()*gegner.length)].damage(this.schaden*(1+this.buffStaerken[2]/100)*10, [this.effekt[0]], [this.effektStaerke[0]*5*(1+this.buffStaerken[2]/100)], [500*(1+this.buffStaerken[2]/100)], this.id);
        }
      }
    }
  };
}

var wi = 0;
var hei = 0;
function resizekoords(x,y){
  wi = window.innerWidth*0.98 - Math.max((45 + 77 + 123)*1.07, window.innerWidth*0.3);
  hei = window.innerHeight*0.98 - 50;
return Math.floor(wi / x > hei /y ? hei / y : wi /x);
//diese Funktion gibt die richtige Grösse aus
}
