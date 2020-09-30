var anzahlEffeckte = 5;
//TurmEffeckt:    0 = Slow, 1 = Stun, 2 = FeuerTick, 3 = GiftTick, 4 = PermaSlow ab hier wird nicht im gegner abgespeichert daher nicht in konfig 5 = AoEDamage, 6 = Kettenblitz, 7 = DmgSupport, 8 = AttackSpeedSupport, 9 = EffecktDmg, reichweite und Dauer buff, 10 = RangeUndDrehSpeedSuport, 15 = stackbares Gift
//GegnerEffeckt:  0 = Slow, 1 = Stun, 2 = FeuerTick, 3 = GiftTick, 4 = PermaSlow ab hier wird nicht im gegner abgespeichert daher nicht in konfig 5 = FlatNormalDefense, 6 = %NormalMittigation, 7 = on death split, 8 = on time spawn, 9 = agro, 10 = heal, 11 = speedbuff, 12 = shield, 13 = tower slow, 14 = tower stun, 15 = stackbares Gift
// config optionen für die SchadensZahlen
// 0 = OffsetX, 1 = OffsetY
var numberallsum = [35, 70];
//kommt weg!!!
var maxHit = 0;
//Startvariablen
var spielEnde = false;
var promise = [];
var bildBuffer = [];
var waitForBildLoad = [];
var geldAnzeige = [];
var loading = 0;
var start = [[], []];  //array in dem x und y koordinate des startpunktes abgespeichert werden
var portal1 = [[], [], []]; //zu abspeichern der portalPositionen
var spawnPointNumber = 0;
if (multiStartTyp == undefined) {
  var multiStartTyp = 0;   //0=Nacheinander, 1=pro welle, 2=zufällig, 3= überall gleichzeitig
}
var teilWellenNummer = 0;   // giebt an welche gegnerwelle aus dem array als nächses gespwned wird
var wellenNummer = 1;   // giebt an in welcher Tatsächlichen welle man sich befindet
var spielerLeben = 100;
var killSteinePreis = Infinity;
var selected = -1;    // nummer des ausgewählten turms für upgradefenster anzeige
var gameSpeed = 2;    // giebt an wie schnell das spiel läuft (=2 wenn gamespeed butten auf 1; =6 wenn gamspeedbutton auf 3)
var gamePause = false;   // ist das spiel momentan pausiert?
var autoStart = false;    // soll die nächste welle bei abschluss dieser welle automatisch gestartet werden?
var startHover = false;   // wird der Startbutton gerade gehovert
var speedHover = false;   // wird der speedbutton gerade gehovert
var shift = false;    // ist die shift taste gerade gedrückt
var strg = false;
var roundTime = -1000;  // wie lang läuft die momentane welle schon -1000 wenn gerade keine welle läuft
// 0 = funktion, 1 = executionTime
var timers = [];
// 0 = function, 1 = übergabeWerte für die funktion, 2 = letzteAusführung, 3 = zeitZwischenWiederholungen, 4 = anzahlWiederholungen
var intervals = [];
//timer und intervalle werden in der updatefunktion abgehandelt
var gegner = [];  //liste aller auf der map zu sehender Gegner
var tuerme = [];  //liste aller gebauten türme
var statFenster;  //anzeige beim hovern über türme bei turmauswahl
var upgradeFenster; //anzeigeFenster fürr stats beim andrücken eines gebauten turms
var rangeDiv;   //anzeige der range von dem tower der gehovert wird
var wellenEnde = 0;   //Min Zeit bis Welle zuende ist

//testwelle
var testWellen = [];
testWellen.push([1, 6, 20, 0.2,-1]);
testWellen.push([2, 6, 20, 0.2,-1]);
testWellen.push([3, 6, 20, 0.2,-1]);
testWellen.push([4, 6, 20, 0.2,-1]);
testWellen.push([5, 6, 20, 0.2,-1]);
testWellen.push([6, 6, 20, 0.2,-1]);
testWellen.push([7, 6, 20, 0.2,-1]);
testWellen.push([8, 6, 20, 0.2,-1]);
testWellen.push([9, 6, 20, 0.2,-1]);
testWellen.push([10, 6, 20, 0.2,-1]);
testWellen.push([11, 6, 20, 0.2,-1]);
testWellen.push([12, 6, 20, 0.2,-1]);
testWellen.push([13, 6, 20, 0.2,-1]);
testWellen.push([14, 6, 20, 0.2,-1]);
testWellen.push([15, 6, 20, 0.2,-1]);
testWellen.push([16, 6, 20, 0.2,-1]);


var oldtester = {};
function testStart(){
  oldtester.geld = geld;
  oldtester.spielerLeben = spielerLeben;
  oldtester.teilWellenNummer = teilWellenNummer;
  oldtester.wellenNummer = wellenNummer
oldtester.oldtestw = gegnerWellen;
oldtester.anzahlWellen = anzahlWellen;
gegnerWellen = testWellen
teilWellenNummer = 0;
wellenNummer = 1;
geld = Infinity;
spielerLeben = Infinity;
anzahlWellen = 0;
for (var i = 0; i < gegnerWellen.length; i++) {
  if (gegnerWellen[i][4] == -1) {
    anzahlWellen++;
  }
}
}

var anzahlWellen = 0;
for (var i = 0; i < gegnerWellen.length; i++) {
  if (gegnerWellen[i][4] == -1) {
    anzahlWellen++;
  }
}
if (schwierigkeit != 0) {
  anzahlWellen -= (5 - schwierigkeit) * 5
}

//mit welchem schwierigkeitsmultiplayer werden die towerkosten/upgradekosten multipliziert
var preisMult = 1.3;
for (var i = 0; i < 5-schwierigkeit; i++) {
  preisMult -= 0.15;
}
var lebenMult = preisMult;
if (schwierigkeit == 0) {
  preisMult = 0;
}

//Leiste in der Leben Geld und Schwierigkeit angezeigt werden
var anzeigeDiv = document.createElement("div");
document.body.appendChild(anzeigeDiv);
switch (schwierigkeit) {
  case 0:
    schwierigkeitIcon = "'Bilder/Icons/sandBurg.png'";
    break;
  case 1:
    schwierigkeitIcon = "'Bilder/Icons/einfach.png'";
    break;
  case 2:
    schwierigkeitIcon = "'Bilder/Icons/mittel.png'";
    break;
  case 3:
    schwierigkeitIcon = "'Bilder/Icons/schwer.png'";
    break;
  case 4:
    schwierigkeitIcon = "'Bilder/Icons/schwer.png'";
    break;
  case 5:
    schwierigkeitIcon = "'Bilder/Icons/schwer.png'";
    break;
}
anzeigeDiv.innerHTML = '<img class="icons" id="SchwierigkeitIcon" src=' + schwierigkeitIcon + '> <span id = "Schwierigkeit">Leicht</span> <img class="icons" src="Bilder/Icons/coin.png"><span id = "Geld">100</span> <img class="icons" src="Bilder/Icons/leben.png"><span id = "Leben">100</span> <img class="icons" src="Bilder/Icons/welle.png"><span id = "Welle">0/0</span>';

//div in der die map gezeichnet wird
mapDiv = document.createElement('div');
document.body.appendChild(mapDiv);
mapDiv.style.position = 'absolute';
mapDiv.style.left = '10px';
mapDiv.style.top = '50px';
mapDiv.style.zIndex = 0;

scriptLoaded++;
