//Konfig
var maxUpgrade = 5;
var anzahlEffeckte = 5;
//TurmEffeckt:    0 = Slow, 1 = Stun, 2 = FeuerTick, 3 = GiftTick, 4 = PermaSlow ab hier wird nicht im gegner abgespeichert daher nicht in konfig 5 = AoEDamage, 6 = Kettenblitz, 7 = DmgSupport, 8 = AttackSpeedSupport, 9 = EffecktDmg, reichweite und Dauer buff, 10 = RangeUndDrehSpeedSuport, 15 = stackbares Gift
//GegnerEffeckt:  0 = Slow, 1 = Stun, 2 = FeuerTick, 3 = GiftTick, 4 = PermaSlow ab hier wird nicht im gegner abgespeichert daher nicht in konfig 5 = FlatNormalDefense, 6 = %NormalMittigation, 7 = on death split, 8 = on time spawn, 9 = agro, 10 = heal, 11 = speedbuff, 12 = shield, 13 = tower slow, 14 = tower stun, 15 = stackbares Gift
// config optionen für die SchadensZahlen
// 0 = OffsetX, 1 = OffsetY
var numberallsum = [35, 70];

//Startvariablen
var spielEnde = false;
var bildBuffer = [];
var waitForBildLoad = [];
var updateFinish = true;
var loading = 0;
var start = [[], []];  //array in dem x und y koordinate des startpunktes abgespeichert werden
var spawnPointNumber = 0;
if (multiStartTyp == undefined) {
  var multiStartTyp = 0;   //0=Nacheinander, 1=pro welle, 2=zufällig, 3= überall gleichzeitig
}
var teilWellenNummer = 0;   // giebt an welche gegnerwelle aus dem array als nächses gespwned wird
var wellenNummer = 1;   // giebt an in welcher Tatsächlichen welle man sich befindet
var spielerLeben = 100;
var selected = -1;    // nummer des ausgewählten turms für upgradefenster anzeige
var gameSpeed = 2;    // giebt an wie schnell das spiel läuft (=2 wenn gamespeed butten auf 1; =6 wenn gamspeedbutton auf 3)
var gamePause = false;   // ist das spiel momentan pausiert?
var autoStart = false;    // soll die nächste welle bei abschluss dieser welle automatisch gestartet werden?
var startHover = false;   // wird der Startbutton gerade gehovert
var speedHover = false;   // wird der speedbutton gerade gehovert
var shift = false;    // ist die shift taste gerade gedrückt
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

var gegnerWellen = [];  //liste aller teilwellen
//0 = Gegnertyp, 1 = Lebenmult, 2 = Anzahl, 3 = ZeitZwischenGegnern, 4 = ZeitBisZurNächstenTeilwelle(-1 für WellenEnde)
// 1
gegnerWellen.push([0, 1, 10, 1.6, -1]);
// 2
gegnerWellen.push([0, 1, 12, 1, -1]);
// 3
gegnerWellen.push([0, 1, 15 , 0.6, -1]);
// 4
gegnerWellen.push([1, 1, 8, 0.6, -1]);
// 5
gegnerWellen.push([0, 1, 10, 0.5, 4.2]);
gegnerWellen.push([3, 1, 5, 1, -1]);
// 6
gegnerWellen.push([0, 1, 17, 0.5, 5.25]);
gegnerWellen.push([2, 1, 3, 1, -1]);
// 7
gegnerWellen.push([1, 1, 12, 0.7, 8]);
gegnerWellen.push([3, 1, 5, 1, -1]);
// 8
gegnerWellen.push([0, 1, 45, 0.3, -1]);
// 9
gegnerWellen.push([2, 1, 8, 1, 10]);
gegnerWellen.push([3, 1, 7, 1, -1]);
// 10
gegnerWellen.push([0, 1.2, 16, 0.4, 0.2]);
gegnerWellen.push([1, 1.2, 15, 0.4, 3.1]);
gegnerWellen.push([3, 1.2, 10, 0.6, -1]);
// 11
gegnerWellen.push([2, 1.5, 10, 0.5, 11]);
gegnerWellen.push([3, 1.5, 10, 0.2, 0.3]);
gegnerWellen.push([0, 1.5, 10, 0.2, 0.1]);
gegnerWellen.push([1, 1.5, 10, 0.6, -1]);
// 12
gegnerWellen.push([2, 2, 10, 3, 1]);
gegnerWellen.push([0, 2, 10, 0.2, 0.1]);
gegnerWellen.push([1, 2, 10, 0.6, 0.6]);
gegnerWellen.push([3, 2, 8, 0.6 , -1 ]);
// 13
gegnerWellen.push([3, 2, 8, 3, 0.5]);
gegnerWellen.push([2, 2, 10, 3, 0.5]);
gegnerWellen.push([1, 2, 20, 5, -1]);
// 14
gegnerWellen.push([4, 2, 9, 3, 1]);
gegnerWellen.push([3, 2, 4, 3, 0.5]);
gegnerWellen.push([2, 2, 4, 3, 0.5]);
gegnerWellen.push([1, 2, 10, 5, -1]);
// 15
gegnerWellen.push([5, 2, 13, 0.8, 1]);
gegnerWellen.push([4, 2, 8, 3, 0.6]);
gegnerWellen.push([0, 2, 20, 0.5, -1]);
// 16
gegnerWellen.push([5, 2.5, 10, 0.5, 0.25]);
gegnerWellen.push([3, 2.5, 10, 0.5, 0.25]);
gegnerWellen.push([0, 2.5, 10, 0.25, 0.5]);
gegnerWellen.push([2, 2.5, 10 ,0.6, -1]);
// 17
gegnerWellen.push([0, 2.5, 7, 4.2, 0.1]);
gegnerWellen.push([1, 2.5, 7, 4.2, 0.1]);
gegnerWellen.push([2, 2.5, 7, 4.2, 0.1]);
gegnerWellen.push([3, 2.5, 7, 4.2, 0.1]);
gegnerWellen.push([5, 2.5, 7, 4.2, 0.1]);
gegnerWellen.push([4, 2.5, 7, 4.2, -1]);
// 18
gegnerWellen.push([0, 3, 7, 0.1, 7]);
gegnerWellen.push([1, 3, 7, 0.1, 7]);
gegnerWellen.push([2, 3, 7, 0.1, 7]);
gegnerWellen.push([3, 3, 7, 0.1, 7]);
gegnerWellen.push([5, 3, 7, 0.1, 7]);
gegnerWellen.push([4, 3, 7, 0.1, -1]);
// 19
gegnerWellen.push([4, 3.5, 15, 0.7, 7]);
gegnerWellen.push([3, 3.5, 15, 0.7, -1]);
// 20
gegnerWellen.push([6, 3.5, 6, 15, 5]);
gegnerWellen.push([4, 3.5, 10, 0.7, 0.5]);
gegnerWellen.push([3, 3.5, 10, 0.7, 5]);
gegnerWellen.push([5, 3.5, 4, 10, -1]);
//21
gegnerWellen.push([5, 3.5, 9, 0.5, 2]);
gegnerWellen.push([4, 3.5, 9, 1, 0.5]);
gegnerWellen.push([3, 3.5, 9, 0.5, 4]);
gegnerWellen.push([2, 3.5, 6, 0.5, -1]);
//22
gegnerWellen.push([0, 3.5, 10, 0.5, 2]);
gegnerWellen.push([3, 3.5, 20, 0.6, 3]);
gegnerWellen.push([5,  4,   15, 0.2, -1]);
//23
gegnerWellen.push([2, 3.5, 20,  1, 1]);
gegnerWellen.push([1,  4,  15,  1, 0.5]);
gegnerWellen.push([4, 3.5, 10, 0.4, 4]);
gegnerWellen.push([5, 3.5, 8,  0.2, -1]);
//24
gegnerWellen.push([0,  4, 20, 1, 1]);
gegnerWellen.push([4,  4, 10, 1, 0.5]);
gegnerWellen.push([3,  4, 10, 0.5, -1]);
//25
gegnerWellen.push([6, 3.5, 3, 0.5, 2]);
gegnerWellen.push([0, 5, 20,  0.2, 0.5]);
gegnerWellen.push([6, 3.5, 3, 1.5, -1]);
//26
gegnerWellen.push([3, 4.5, 20, 0.5, 1]);
gegnerWellen.push([5, 4.5, 10, 0.2, 1,5]);
gegnerWellen.push([4, 4.5,  5, 1, -1]);
//27
gegnerWellen.push([1, 4.5, 30, 0.5, 1]);
gegnerWellen.push([2,  5,  20, 0.6, 2]);
gegnerWellen.push([3,  5,  20, 0.4, -1]);
//28
gegnerWellen.push([0, 5,  30, 0.2, 1]);
gegnerWellen.push([5, 5,  20, 0.5, 6]);
gegnerWellen.push([2, 5.5, 10, 0.1, 2]);
gegnerWellen.push([4, 5.5, 10 ,1 ,-1 ]);
//29
gegnerWellen.push([4, 5, 20, 1, 1]);
gegnerWellen.push([3, 5, 30, 0.4, 2]);
gegnerWellen.push([1, 5, 20, 0.5, 0.5]);
gegnerWellen.push([6, 4,  2, 0.5, -1]);
//30
gegnerWellen.push([6, 4, 5, 1.5, 8]);
gegnerWellen.push([5, 5, 10, 1 , 0.5]);
gegnerWellen.push([4, 6, 15, 0.5, 0.5]);
gegnerWellen.push([6, 4 , 5 , 2, 3]);
gegnerWellen.push([2, 6, 20, 0.5 ,-1]);
//31
gegnerWellen.push([7, 5, 10, 1.5, 7]);
gegnerWellen.push([8, 5, 5, 2, 6]);
gegnerWellen.push([10, 5, 5, 0.5, 5]);
gegnerWellen.push([14, 5, 10, 2, -1]);
//32
gegnerWellen.push([9, 5, 10, 2, 3]);
gegnerWellen.push([11, 5, 10, 3, 1]);
gegnerWellen.push([12, 5, 10, 1, 4]);
gegnerWellen.push([13, 5, 10, 1, -1]);
//33
gegnerWellen.push([5, 6, 10, 1, 0.5]);
gegnerWellen.push([10, 6, 10, 2, 1]);
gegnerWellen.push([12, 6, 10, 0.4, 2]);
gegnerWellen.push([9, 6, 11, 0.7, -1]);
//34
gegnerWellen.push([10, 6, 10, 2 , 2]);
gegnerWellen.push([8, 6, 10, 1.5, 0.5]);
gegnerWellen.push([4, 6, 18, 0.9, 3]);
gegnerWellen.push([3, 6, 15, 1, 3.5]);
gegnerWellen.push([1, 6, 20, 2, -1]);
//35
gegnerWellen.push([11, 6, 12, 2, 1]);
gegnerWellen.push([12, 6, 13, 1, 1.5]);
gegnerWellen.push([13, 6, 15, 2, 0.5]);
gegnerWellen.push([15, 2, 5, 5, 2.5]);
gegnerWellen.push([16, 2, 5, 5, -1]);
//36
gegnerWellen.push([1, 15, 20, 0.2, 4]);
gegnerWellen.push([10, 9, 12, 2, 1]);
gegnerWellen.push([11, 9, 13, 1, 1.5]);
gegnerWellen.push([12, 9, 15, 2, 0.5]);
gegnerWellen.push([13, 9, 5, 1, 2.5]);
gegnerWellen.push([14, 9, 5, 0.2, -1]);
//37
gegnerWellen.push([0, 11, 12, 1, 1]);
gegnerWellen.push([7, 11, 7, 2, 0.5]);
gegnerWellen.push([3, 11, 10, 3, 1.2]);
gegnerWellen.push([5, 9, 12, 2, 1.5]);
gegnerWellen.push([11, 8, 12, 2, 1]);
gegnerWellen.push([12, 7, 10, 1, 1.5]);
gegnerWellen.push([13, 7, 10, 2, -1]);
//38
gegnerWellen.push([3, 10, 12, 2, 1]);
gegnerWellen.push([5, 10, 13, 1, 1.5]);
gegnerWellen.push([8, 10, 15, 2, 0.5]);
gegnerWellen.push([9, 10, 5, 5, 2.5]);
gegnerWellen.push([14, 10, 5, 5, -1]);
//39
gegnerWellen.push([10, 10, 12, 2, 0]);
gegnerWellen.push([4, 10, 20, 0.5, 0]);
gegnerWellen.push([14, 10, 15, 2, 5]);
gegnerWellen.push([13, 10, 5, 5, 0]);
gegnerWellen.push([12, 10, 5, 5, -1]);
//40
gegnerWellen.push([2, 10, 15, 1, 17]);
gegnerWellen.push([4, 10, 15, 0.5, 17]);
gegnerWellen.push([6, 10, 15, 0.5, 17]);
gegnerWellen.push([8, 9, 15, 0.5, 17]);
gegnerWellen.push([10, 9, 15, 0.5, 17]);
gegnerWellen.push([12, 8, 15, 0.5, 17]);
gegnerWellen.push([13, 6, 15, 0.5, 26]);
gegnerWellen.push([12, 12, 15, 2, 0]);
gegnerWellen.push([13, 12, 5, 3, 0]);
gegnerWellen.push([14, 11, 5, 1, 0]);
gegnerWellen.push([15, 4, 5, 5, 0]);
gegnerWellen.push([16, 3, 5, 7, 0]);
gegnerWellen.push([12, 10, 5, 5, -1]);
//41
//42
//43
//44
//45
//46
//47
//48
//49
//50
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

var gegnertypen = [];
//0 = Bild, 1 = Leben, 2 = Geschwindigkeit, 3 = Imunität/effekt, 4 = Imunität%/effecktstärke, 5 = GeldBeiKill, 6= Spielerschaden
gegnertypen.push(['Bilder/Gegner/gegner00Basic.png', 150, 1, [], [], 1, 1]);   //0 Basic
gegnertypen.push(['Bilder/Gegner/gegner01BonusHp.png', 250, 1, [], [], 2, 1]);   //1 Basic mit etwas mehr Leben
gegnertypen.push(['Bilder/Gegner/gegner02langsamTank.png', 550, 0.6, [0], [50], 6, 1]);  //2 Langsamer Gegner mit viel Leben slowimmunität
gegnertypen.push(['Bilder/Gegner/gegner03Schnell.png', 250, 1.6, [], [], 4, 1]);   //3 Schneller Gegner
gegnertypen.push(['Bilder/Gegner/gegner04Immunitaeten.png', 450, 0.8, [2,3,5], [75,100,20], 8, 1]);   //4 etwas Langsamer Gegner mit vielen Immunitäten
gegnertypen.push(['Bilder/Gegner/gegner05GiftImmun.png', 350, 0.8, [3], [75], 5, 1]);  //5 Gift immuner Gegner
gegnertypen.push(['Bilder/Gegner/gegner06Boss1.png', 2000, 0.5, [0,6], [65,25], 25, 10]);   //6 Boss Gegner langsam mit slow und normaldmg immunität
gegnertypen.push(['Bilder/Gegner/gegner07Agro.png', 1000,  1 ,[9] , [1], 20 , 3]);  //7 zieht die Tower auf sich
gegnertypen.push(['Bilder/Gegner/gegner08Heiler.png', 750, 1.6 ,[10], [[100, 140, 1]], 10 , 4]);  //8 soll die Gegner heilen 1% jede sec(100 spielticks) mit 140 reichweite
gegnertypen.push(['Bilder/Gegner/gegner09SpawnTimer.png', 600, 1, [8],[50], 15, 6]); //9 spawnt Gegner 11 alle 0.5 sec (=50)
gegnertypen.push(['Bilder/Gegner/gegner10DethSplit.png', 500, 0.9 ,[7] ,[3] , 12, 4]); //10 nach dem Tod spawnt er 3 mal Gegner 11
gegnertypen.push(['Bilder/Gegner/gegner11Dethsplit2.png', 250, 0.8 ,[] ,[] , 0, 1]); // 11 wird von anderen gegnern gespawned
gegnertypen.push(['Bilder/Gegner/gegner12Speedbuff.png', 400, 1.2 ,[11],[[5, 140]], 14 , 2]); //12 Bufft speed von anderen Gegner um 5% 140 reichweite
gegnertypen.push(['Bilder/Gegner/gegner13Shield.png', 800 , 1.6, [12], [[50, 140]], 20, 6]); //13 Bufft Gegner mit Schild 50% von gegnerleben und der Effektschaden wird anulliert solange das schild aktiv ist
gegnertypen.push(['Bilder/Gegner/gegner14TowerSlow.png', 1000, 0.7, [13], [[2, 140]], 10 , 4]); //14 slowed die Türme in 140 reichweite um 2%
gegnertypen.push(['Bilder/Gegner/gegner15Boss2.png', 3000, 0.8, [], [], 30 , 15]); //15 Boss 2
gegnertypen.push(['Bilder/Gegner/gegner16Boss3.png', 4000, 0.7, [], [], 35, 20]); // 16 Boss 3

var towertypen = [];
//0 Base src, 1 Geschütz src, 2 Damage, 3 Drehgeschwindigkeit, 4 Reichweite, 5 Angriffszeit, 6 Preis, 7 Effekt, 8 Effektstärke, 9 EffektDauer/Reichweite, 10 Name, 11 stufe5 geschütz 12 unlockt
towertypen.push(['Bilder/Tower/base1.png', 'Bilder/Tower/00basic.png', 15, 1.5, 100, 0.5, 25, [], [], [], "Basic Tower", "Bilder/Tower/00basic5.png", true]);
towertypen.push(['Bilder/Tower/base2.png', 'Bilder/Tower/01sniper.png', 140, 0.6, 400, 3.5, 60, [], [], [], "Sniper", "Bilder/Tower/01sniper5.png", true]);
towertypen.push(['Bilder/Map/empty.png', 'Bilder/Tower/02slower.png', 0, 0, 90, 0.7, 60, [0], [1.5], [1.5], "Slow Tower", "Bilder/Tower/02slower5.png", true]);
towertypen.push(['Bilder/Tower/base1.png', 'Bilder/Tower/03gift.png', 0, 0, 100, 0.5, 80, [3], [7], [15], "Gift Tower", "Bilder/Tower/03gift5.png", true]);
towertypen.push(['Bilder/Tower/base2.png', 'Bilder/Tower/04feuerAoe.png', 25, 0, 100, 1, 150, [2], [10], [5], "FeuerAoe Turm", "Bilder/Tower/04feuerAoe5.png", true]);
towertypen.push(['Bilder/Tower/base2.png', 'Bilder/Tower/05antiBoss.png', 350, 1.3, 170, 2.5, 200, [1], [1], [0.3], "Anti Boss Tower", "Bilder/Tower/05antiBoss5.png", true]); //andere Base
towertypen.push(['Bilder/Tower/base2.png', 'Bilder/Tower/06rocket.png', 140, 0.7, 400, 4, 250, [5], [75], [70], "Rocket Launcher", "Bilder/Tower/06rocket5.png", true]);
towertypen.push(['Bilder/Tower/base2.png','Bilder/Tower/07giftSingle.png', 70, 0.9, 140,  1, 100, [3], [70], [2], "Single Gift Turm", "Bilder/Tower/07giftSingle5.png", true]);
towertypen.push(['Bilder/Tower/base2.png', 'Bilder/Tower/08lavaTower.png', 70, 1, 140, 1, 90, [2], [100], [1], "Lavatower", "Bilder/Tower/08lavaTower5.png", true]);
towertypen.push(['Bilder/Tower/base2.png', 'Bilder/Tower/09support.png', 0, 0, 0 , 0, 60, [7, 8, 9, 10], [12.5, 10, 10, 25], [75, 75, 75, 150], "Support", "Bilder/Tower/09support5.png", true]);
towertypen.push(['Bilder/Tower/base2.png', 'Bilder/Tower/10tesla.png', 400, 0.8, 200, 6.5, 250, [6], [1], [70], "Tesla", "Bilder/Tower/10tesla5.png", true]);
towertypen.push(['Bilder/Map/empty.png', 'Bilder/Tower/11random.png', , , , , , [], [], [], "Random", "Bilder/Map/empty.png", false]);

//mit welchem schwierigkeitsmultiplayer werden die towerkosten/upgradekosten multipliziert
var preisMult = 1;
for (var i = 0; i < 3-schwierigkeit; i++) {
  preisMult -= 0.15
}
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
}
anzeigeDiv.innerHTML = '<img class="icons" id="SchwierigkeitIcon" src=' + schwierigkeitIcon + '> <font id = "Schwierigkeit">Leicht</font> <img class="icons" src="Bilder/Icons/coin.png"><font id = "Geld">100</font> <img class="icons" src="Bilder/Icons/leben.png"><font id = "Leben">100</font> <img class="icons" src="Bilder/Icons/welle.png"><font id = "Welle">0/0</font>';

//div in der die map gezeichnet wird
mapDiv = document.createElement('div');
document.body.appendChild(mapDiv);
mapDiv.style.position = 'absolute';
mapDiv.style.left = '10px';
mapDiv.style.top = '50px';
mapDiv.style.zIndex = 0;
