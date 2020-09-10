
var maxUpgrade = 5;
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
var bildBuffer = [];
var waitForBildLoad = [];
var updateFinish = true;
var loading = 0;
var start = [[], []];  //array in dem x und y koordinate des startpunktes abgespeichert werden
var portal1 = [[], [], []]; //zu abspeichern der portalPositionen
var portal2 = [[], [], []];
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
var lebenMult = 1;

var gegnerWellen = [];  //liste aller teilwellen
//0 = Gegnertyp, 1 = Lebenmult, 2 = Anzahl, 3 = ZeitZwischenGegnern, 4 = ZeitBisZurNächstenTeilwelle(-1 für WellenEnde)
// 1
gegnerWellen.push([0,  lebenMult, 10, 1.6, -1]); //10 Gold
// 2
gegnerWellen.push([0,  lebenMult, 12, 1, -1]); // 12 Gold
// 3
gegnerWellen.push([0,  lebenMult, 15 , 1 , -1]); // 15 Gold
// 4
gegnerWellen.push([1,  lebenMult, 8, 1, -1]); //  16 Gold
// 5
gegnerWellen.push([0,  lebenMult, 30 , 0.7, -1]);   // 30 Gold
// 6
gegnerWellen.push([0,  lebenMult, 18, 0.5, 3.25]); // 18 Gold
gegnerWellen.push([2,  lebenMult, 3, 1, -1]);    // 12 Gold
// 7
gegnerWellen.push([1,  lebenMult, 12, 0.7, 3]); //  24 Gold
gegnerWellen.push([2,  lebenMult  , 5, 1, -1]); //  20 Gold
// 8
gegnerWellen.push([0,  lebenMult, 20, 0.3, 1]); // 20 Gold
gegnerWellen.push([3,  lebenMult, 5, 1.5, 0.5]); //20 Gold
gegnerWellen.push([1,  lebenMult, 10, 1, -1]);// 20 Gold
// 9
gegnerWellen.push([2,  lebenMult, 8, 1, 2]); //  48 Gold
gegnerWellen.push([3,  lebenMult, 7, 1, -1]);//  28 Gold
// 10
gegnerWellen.push([0,  lebenMult , 20, 0.4, 0.2]); // 10 Gold
gegnerWellen.push([1,  lebenMult , 15, 0.4, 3.1]); // 30 Gold
gegnerWellen.push([6,  lebenMult , 2, 1,-1]); // 50 Gold
// 11
lebenMult += 0.2;
gegnerWellen.push([10, lebenMult, 4, 0.5, 11]);  // 60 Gold
gegnerWellen.push([3,  lebenMult, 10, 0.2, 0.3]); // 40 Gold
gegnerWellen.push([0,  lebenMult, 20, 0.4, 0.1]); // 20 Gold
gegnerWellen.push([1,  lebenMult, 10, 0.8, -1]);  // 20 Gold
// 12
lebenMult +=0,5;
gegnerWellen.push([2,  lebenMult, 10, 3, 1]);      //  60 Gold
gegnerWellen.push([0,  lebenMult, 10, 0.2, 0.1]); //  10 Gold
gegnerWellen.push([1,  lebenMult, 10, 0.6, -1]); //  20 Gold

// 13
lebenMult += 0.5;
gegnerWellen.push([3,  lebenMult, 8, 2, 3]);    //32  Gold
gegnerWellen.push([2,  lebenMult, 10, 1, 0.5]); // 60 Gold
gegnerWellen.push([1,  lebenMult, 20, 1, -1]); // 40 Gold
// 14
gegnerWellen.push([4,  lebenMult, 9, 3, 1]);  //  72 Gold
gegnerWellen.push([3,  lebenMult, 4, 3, 0.5]); // 16  Gold
gegnerWellen.push([2,  lebenMult, 4, 3, 0.5]); // 24 Gold
gegnerWellen.push([1,  lebenMult, 10, 5, -1]); //  20 Gold
// 15
gegnerWellen.push([5,  lebenMult, 13, 0.8, 1]);  // 65 Gold
gegnerWellen.push([4,  lebenMult, 8, 3, 0.6]); //  64 Gold
gegnerWellen.push([6,  lebenMult, 5, 3 , 0.5]); // 125 Gold
gegnerWellen.push([7,  lebenMult, 1, 0.5, -1]); //  20 Gold
// 16
lebenMult += 0.5;
gegnerWellen.push([5,  lebenMult, 10, 0.5, 0.25]); //  50 Gold
gegnerWellen.push([3,  lebenMult, 10, 0.5, 0.25]);// 40 Gold
gegnerWellen.push([0,  lebenMult, 20, 0.25, 0.5]);// 20 Gold
gegnerWellen.push([2,  lebenMult, 10 ,0.6, -1]);//  60 Gold
// 17
gegnerWellen.push([0,  lebenMult, 7, 4, 0.1]); // 7 Gold
gegnerWellen.push([1,  lebenMult, 7, 3, 0.9]); // 14 Gold
gegnerWellen.push([2,  lebenMult, 7, 2., 0.8]); // 56 Gold
gegnerWellen.push([3,  lebenMult, 7, 1, 1.5]); // 28 Gold
gegnerWellen.push([5,  lebenMult, 7, 2.2, 0.1]); // 35 Gold
gegnerWellen.push([4,  lebenMult, 7, 1.2, -1]); // 56 Gold
// 18
lebenMult += 0.5;
gegnerWellen.push([0,  lebenMult, 7, 0.1, 7]);  // 7  Gold
gegnerWellen.push([1,  lebenMult, 7, 0.1, 7]); // 14 Gold
gegnerWellen.push([2,  lebenMult, 7, 0.1, 7]); // 54 Gold
gegnerWellen.push([3,  lebenMult, 7, 0.1, 7]); //28 Gold
gegnerWellen.push([5,  lebenMult, 7, 0.1, 7]); // 35 Gold
gegnerWellen.push([4,  lebenMult, 7, 0.1, -1]); // 56 Gold
// 19
lebenMult += 0.5;
gegnerWellen.push([4,  lebenMult, 15, 0.7, 7]); // 120 Gold
gegnerWellen.push([1,  lebenMult, 2, 0.8, 1]); // 60 Gold
gegnerWellen.push([3,  lebenMult, 15, 0.7, -1]); // 52 Gold
// 20
gegnerWellen.push([15, lebenMult, 3, 15, 5]);  //  150 Gold
gegnerWellen.push([4,  lebenMult, 10, 0.7, 0.5]); // 80 Gold
gegnerWellen.push([3,  lebenMult, 10, 0.7, 4]); //  40 Gold
gegnerWellen.push([5,  lebenMult, 4, 10, 2]); //  20 Gold
gegnerWellen.push([10, lebenMult, 2, 2 , 5]); // 12 Gold
gegnerWellen.push([8,  lebenMult, 1 , 0.5 ,-1]); // 10 Gold
//21
gegnerWellen.push([12,  lebenMult, 5, 0.5, 2]); // 70 Gold
gegnerWellen.push([11,  lebenMult, 5, 1, 0.5]); // 5 Gold
gegnerWellen.push([3,  lebenMult, 9, 0.5, 4]); // 36 Gold
gegnerWellen.push([2,  lebenMult, 9, 0.5, -1]); // 54 Gold
//22
gegnerWellen.push([0,  lebenMult, 10, 0.5, 2]); // 10 Gold
gegnerWellen.push([3,  lebenMult, 20, 0.6, 3]); //80  Gold
gegnerWellen.push([5,  lebenMult, 15, 0.2, -1]); // 75 Gold
//23
gegnerWellen.push([2,  lebenMult, 20,  1, 1]); // 120 Gold
gegnerWellen.push([1,  lebenMult, 15,  1, 0.5]); // 30  Gold
gegnerWellen.push([4,  lebenMult, 10, 0.4, 4]); //80 Gold
gegnerWellen.push([5,  lebenMult, 8,  0.2, -1]); // 40 Gold
//24
lebenMult += 0.5;
gegnerWellen.push([0,  lebenMult, 20, 1, 1]); // 20 Gold
gegnerWellen.push([4,  lebenMult, 10, 1, 0.5]); // 80 Gold
gegnerWellen.push([3,  lebenMult, 10, 0.5, -1]); // 40 Gold
//25
gegnerWellen.push([6,  lebenMult, 3, 0.5, 2]); //  75 Gold
gegnerWellen.push([0,  lebenMult, 20,  0.2, 0.5]); // 20 Gold
gegnerWellen.push([15, lebenMult, 3, 1.5, -1]); // 75 Gold
//26
lebenMult += 0.5;
gegnerWellen.push([3,  lebenMult, 20, 0.5, 1]); // 80 Gold
gegnerWellen.push([5,  lebenMult, 10, 0.2, 1,5]); // 50 Gold
gegnerWellen.push([4,  lebenMult,  5, 1, -1]); // 40 Gold
//27
lebenMult += 0.5;
gegnerWellen.push([1,  lebenMult, 30, 0.5, 1]);  // 60 Gold
gegnerWellen.push([2,  lebenMult,  20, 0.6, 2]); // 120 Gold
gegnerWellen.push([3,  lebenMult,  20, 0.4, -1]); // 80 Gold
//28
gegnerWellen.push([0,  lebenMult,  30, 0.2, 1]); // 30 Gold
gegnerWellen.push([5,  lebenMult,  20, 0.5, 6]); // 100 gold
gegnerWellen.push([2,  lebenMult, 10, 0.1, 2]); // 60 Gold
gegnerWellen.push([4,  lebenMult, 10 ,1 ,-1 ]); //  80 Gold
//29
gegnerWellen.push([4,  lebenMult, 20, 1, 1]); // 160 Gold
gegnerWellen.push([3,  lebenMult, 30, 0.4, 2]); // 120 Gold
gegnerWellen.push([1,  lebenMult, 20, 0.5, 0.5]); // 40 Gold
gegnerWellen.push([6,  lebenMult,  2, 0.5, -1]); // 50 Gold
//30
gegnerWellen.push([6,  lebenMult, 5, 1.5, 8]);  // 125 Gold
gegnerWellen.push([5,  lebenMult, 10, 1 , 0.5]); // 50 Gold
gegnerWellen.push([4,  lebenMult, 15, 0.5, 0.5]); // 120 Gold
gegnerWellen.push([6,  lebenMult, 5 , 2, 3]); // 125 Gold
gegnerWellen.push([2,  lebenMult, 20, 0.5 ,-1]); // 125 Gold
//31
lebenMult += 0.5;
gegnerWellen.push([7,  lebenMult, 8, 1.5, 7]); // 200 Gold
gegnerWellen.push([8,  lebenMult, 5, 2, 6]); // 50  Gold
gegnerWellen.push([10, lebenMult, 5, 0.5, 5]); // 60 Gold
gegnerWellen.push([14, lebenMult, 8, 2, -1]); // 200 Gold
//32
gegnerWellen.push([9,  lebenMult, 10, 2, 3]); //150 Gold
gegnerWellen.push([11, lebenMult, 10, 3, 1]); // 10 Gold
gegnerWellen.push([12, lebenMult, 10, 1, 4]); // 140 Gold
gegnerWellen.push([13, lebenMult, 10, 1, -1]); // 200 Gold
//33
lebenMult += 0.5;
gegnerWellen.push([5,  lebenMult, 10, 1, 0.5]); // 50 Gold
gegnerWellen.push([10, lebenMult, 10, 2, 1]); // 120 Gold
gegnerWellen.push([12, lebenMult, 10, 0.4, 2]); // 140 Gold
gegnerWellen.push([9,  lebenMult, 10, 0.7, -1]); //  150 Gold
//34
gegnerWellen.push([10, lebenMult, 10, 2 , 2]); // 120 Gold
gegnerWellen.push([8,  lebenMult ,5, 1.5, 0.5]); // 50 Gold
gegnerWellen.push([4,  lebenMult, 18, 0.9, 3]); // 144 Gold
gegnerWellen.push([3,  lebenMult, 15, 1, 3.5]); //60 Gold
gegnerWellen.push([1,  lebenMult, 20, 2, -1]); // 40 Gold
//35
lebenMult += 0.5;
gegnerWellen.push([10, lebenMult, 10, 2, 1]);  //  150 Gold
gegnerWellen.push([12, lebenMult, 10, 1, 1.5]); //100 Gold
gegnerWellen.push([13, lebenMult, 8, 2, 0.5]); // 80 Gold
gegnerWellen.push([15, lebenMult, 4, 3, 2.5]); // 120  Gold
gegnerWellen.push([16, lebenMult, 1, 3, -1]); // 70 Gold
//36
lebenMult += 0.5;
gegnerWellen.push([1,  lebenMult, 20, 0.2, 4]); // 40 Gold
gegnerWellen.push([10, lebenMult, 12, 2, 1]); // 144 Gold
gegnerWellen.push([11, lebenMult, 13, 1, 1.5]); // 13 Gold
gegnerWellen.push([12, lebenMult, 15, 2, 0.5]); // 210 Gold
gegnerWellen.push([13, lebenMult, 5, 1, 2.5]); // 100 Gold
gegnerWellen.push([14, lebenMult, 5, 0.2, -1]); //  100 Gold
//37
lebenMult += 0.5;
gegnerWellen.push([0,  lebenMult, 12, 1, 1]);  // 12 Gold
gegnerWellen.push([7,  lebenMult, 7, 2, 0.5]); // 140 Gold
gegnerWellen.push([3,  lebenMult, 10, 3, 1.2]); // 40 Gold
gegnerWellen.push([5,  lebenMult, 12, 2, 1.5]); // 65 Gold
gegnerWellen.push([11, lebenMult, 12, 2, 1]); // 12 Gold
gegnerWellen.push([12, lebenMult, 10, 1, 1.5]); //  140 Gold
gegnerWellen.push([13, lebenMult, 10, 2, -1]); //200  Gold
//38
lebenMult += 0.5;
gegnerWellen.push([3,  lebenMult, 12, 2, 1]); // 48 Gold
gegnerWellen.push([5,  lebenMult, 13, 1, 1.5]); // 65  Gold
gegnerWellen.push([8,  lebenMult, 15, 2, 0.5]); // 150 Gold
gegnerWellen.push([9,  lebenMult, 5, 4, 2.5]); // 75 Gold
gegnerWellen.push([14, lebenMult, 5, 4, -1]);// 100 Gold
//39
gegnerWellen.push([10,  lebenMult, 12, 2, 0]); // 120 Gold
gegnerWellen.push([4,   lebenMult, 20, 0.5, 0]);// 160 Gold
gegnerWellen.push([14,  lebenMult, 15, 2, 5]);//  300 Gold
gegnerWellen.push([13,  lebenMult, 5, 3, 0]);//  100 Gold
gegnerWellen.push([12,  lebenMult, 5, 3, -1]);//  70 Gold
//40
lebenMult += 0.5;
gegnerWellen.push([2,   lebenMult, 15, 1, 17]); //30 Gold
gegnerWellen.push([4,   lebenMult, 15, 0.5, 17]);// 120 Gold
gegnerWellen.push([6,   lebenMult, 15, 0.5, 17]);// 375 Gold
gegnerWellen.push([8,   lebenMult, 15, 0.5, 17]);// 150 Gold
gegnerWellen.push([10,  lebenMult, 15, 0.5, 17]);//  180 Gold
gegnerWellen.push([12,  lebenMult, 15, 0.5, 17]);// 210 Gold
gegnerWellen.push([12,  lebenMult, 15, 2, 0]);//  210 Gold
gegnerWellen.push([13,  lebenMult, 5, 3, 0]);//  100 Gold
gegnerWellen.push([14,  lebenMult, 5, 1, 0]);// 100 Gold
gegnerWellen.push([15,  lebenMult, 5, 2.5, 0]);// 150 Gold
gegnerWellen.push([16,  lebenMult, 2, 2, 0]);//  175 Gold
gegnerWellen.push([12,  lebenMult, 5, 3, -1]);// 70 Gold
//41
gegnerWellen.push([14,  lebenMult, 3, 0.5, 1]); //45 Gold
gegnerWellen.push([2,   lebenMult, 11, 1.5, 2]); //33 Gold
gegnerWellen.push([10,  lebenMult, 7, 0.5, 1]); // 105 Gold
gegnerWellen.push([4,   lebenMult, 9, 1.5, 2]); // 45 Gold
gegnerWellen.push([7,   lebenMult, 6, 0.5, 1]); // 30 Gold
gegnerWellen.push([1,   lebenMult, 15, 1.5, -1]); // 30 Gold
//42
gegnerWellen.push([7,   lebenMult, 7, 2, 1 ]); // 35  Gold
gegnerWellen.push([9,   lebenMult, 13, 0.6, 2]); //195 Gold
gegnerWellen.push([2,   lebenMult, 15, 3, 1.2]); //45 Gold
gegnerWellen.push([4,   lebenMult, 14, 1, 1.5]); //70 Gold
gegnerWellen.push([8,   lebenMult, 11, 2,  2]); //110 Gold
gegnerWellen.push([10,  lebenMult, 9, 4, 2]); //135 Gold
gegnerWellen.push([13,  lebenMult, 11, 0.3, 2]); //110 Gold
gegnerWellen.push([3,   lebenMult, 17, 0.5, -1]); //85 Gold
//43
gegnerWellen.push([14,  lebenMult, 4, 0.8, 1]); //60 Gold
gegnerWellen.push([7,   lebenMult,  9, 1.5, 0.5]); //45 Gold
gegnerWellen.push([3,   lebenMult, 20, 0.9, 2.5]); //80 Gold
gegnerWellen.push([2,   lebenMult,  9, 0.5, 1.4]); //27 Gold
gegnerWellen.push([10,  lebenMult, 5, 0.7, 2.8]); //75 Gold
gegnerWellen.push([4,   lebenMult, 12, 3, 3]); //60 Gold
gegnerWellen.push([8,   lebenMult, 10, 3.1, 0.8]); //100 Gold
gegnerWellen.push([5,   lebenMult, 15, 2.2,-1]); //75 Gold
//44
gegnerWellen.push([9 ,  lebenMult ,6 , 0.5 ,0.6 ]); // 90 Gold
gegnerWellen.push([12 , lebenMult ,10 , 0.8 , 0.6 ]); // 140 Gold
gegnerWellen.push([4 ,  lebenMult , 11 , 1.2 , 3 ]); // 55 Gold
gegnerWellen.push([10 , lebenMult ,12  , 1.5 , 2.5 ]); // 180 Gold
gegnerWellen.push([5 ,  lebenMult , 20 , 1.6 ,2 ]); //  100 Gold
gegnerWellen.push([8 ,  lebenMult , 10 , 2 , 1.2 ]); // 100  Gold
gegnerWellen.push([1 ,  lebenMult , 14 , 2.3 , 1 ]); // 28 Gold
gegnerWellen.push([3 ,  lebenMult ,20 , 2.4 , -1 ]); // 80 Gold
//45
gegnerWellen.push([6,   lebenMult, 15, 1 , 1]); //  300 Gold
gegnerWellen.push([15,  lebenMult, 15, 1.5 ,1.2 ]); // 450 Gold
gegnerWellen.push([16,  lebenMult, 2, 2 , 1.3 ]); // 525 Gold
gegnerWellen.push([13,  lebenMult, 15, 2.5 , 1.5 ]); // 150 Gold
gegnerWellen.push([8,   lebenMult, 15,  1,  1.6]); //  150 Gold
gegnerWellen.push([9,   lebenMult, 15,  1,  -1]); // 225 Gold
//46
lebenMult +=0.5;
gegnerWellen.push([5,   lebenMult, 17, 0.5, 1]);//  85 Gold
gegnerWellen.push([12,  lebenMult, 23, 0.9, 0.4]);// 230 Gold
gegnerWellen.push([9,   lebenMult, 26, 1, 1.2]);// 390 Gold
gegnerWellen.push([3,   lebenMult, 11, 1.2, 1.5]);// 44 Gold
gegnerWellen.push([0,   lebenMult, 35, 1.5, 2]);// 35 Gold
gegnerWellen.push([10,  lebenMult, 20, 1.7, 1]);// 300 Gold
gegnerWellen.push([14,  lebenMult, 15, 2, -1]);// 225 Gold
//47
gegnerWellen.push([12,  lebenMult, 21, 1.2, 1]); //  210 Gold
gegnerWellen.push([14,  lebenMult, 8, 1.5, 1.1]); // 120 Gold
gegnerWellen.push([2,   lebenMult, 41, 1.8, 1.3]); // 82  Gold
gegnerWellen.push([5,   lebenMult, 31, 2, 1.6]); // 155 Gold
gegnerWellen.push([4,   lebenMult, 47, 2.2, 1.8]); //235  Gold
gegnerWellen.push([1,   lebenMult, 47, 2.4, 2]); // 47 Gold
gegnerWellen.push([8,   lebenMult, 25, 2.5, -1]); // 250  Gold
//48
gegnerWellen.push([0,  lebenMult, 37, 1, 1]); // 37 Gold
gegnerWellen.push([10, lebenMult, 15, 0.5, 0.5]); //  225 Gold
gegnerWellen.push([8,  lebenMult, 44, 1, 1.5]); // 440 Gold
gegnerWellen.push([3,  lebenMult, 10, 0.5, 2]); // 40 Gold
gegnerWellen.push([13, lebenMult, 50, 1, 1]); // 500  Gold
gegnerWellen.push([5,  lebenMult, 21, 0.5, -1]); // 105 Gold
//49
gegnerWellen.push([8,  lebenMult , 49, 2, 1]); // 490 Gold
gegnerWellen.push([13, lebenMult , 30, 2.1, 1.2]); //300 Gold
gegnerWellen.push([0,  lebenMult , 34, 2.5, 1.4 ]); //  Gold
gegnerWellen.push([1,  lebenMult , 47, 1, 1.2]); //  Gold
gegnerWellen.push([9,  lebenMult , 49, 1,  1.1]); //  Gold
gegnerWellen.push([5,  lebenMult , 45, 1, 1]); //  Gold
gegnerWellen.push([3,  lebenMult , 50, 1.2, -1]); //  Gold
//50
lebenMult +=0.5;
gegnerWellen.push([1, lebenMult , 20, 1, 0.9]); // Gold
gegnerWellen.push([2, lebenMult , 20, 1, 0.9]); // Gold
gegnerWellen.push([3, lebenMult , 20, 1, 0.9]); // Gold
gegnerWellen.push([4, lebenMult , 20, 1, 0.9]); // Gold
gegnerWellen.push([5, lebenMult , 20, 1, 0.9]); // Gold
gegnerWellen.push([6, lebenMult , 20, 1, 0.9]); // Gold
gegnerWellen.push([7, lebenMult , 20, 1, 0.9]); // Gold
gegnerWellen.push([8, lebenMult , 20, 1, 0.9]); // Gold
gegnerWellen.push([9, lebenMult , 20, 1, 0.9]); // Gold
gegnerWellen.push([10, lebenMult , 20, 1, 0.9]); // Gold
gegnerWellen.push([11, lebenMult , 20, 1, 0.9]); // Gold
gegnerWellen.push([12, lebenMult , 20, 1, 0.9]); // Gold
gegnerWellen.push([13, lebenMult , 20, 1, 0.9]); // Gold
gegnerWellen.push([14, lebenMult , 20, 1, 0.9]); // Gold
gegnerWellen.push([15, lebenMult , 10, 1, 0.9]); // Gold
gegnerWellen.push([16, lebenMult , 10, 1, -1]); // Gold
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
gegnertypen.push(['Bilder/Gegner/gegner00Basic.png', 120, 0.8, [], [], 1, 1]);   //0 Basic
gegnertypen.push(['Bilder/Gegner/gegner01BonusHp.png', 240, 1, [], [], 2, 2]);   //1 Basic mit etwas mehr Leben
gegnertypen.push(['Bilder/Gegner/gegner02LangsamTank.png', 450, 0.6, [0], [50], 3, 3]);  //2 Langsamer Gegner mit viel Leben slowimmunität
gegnertypen.push(['Bilder/Gegner/gegner03Schnell.png', 200, 1.6, [], [], 4, 4]);   //3 Schneller Gegner
gegnertypen.push(['Bilder/Gegner/gegner04Immunitaeten.png', 400, 0.9, [2,3,5], [75,100,20], 5, 5]);   //4 etwas Langsamer Gegner mit vielen Immunitäten
gegnertypen.push(['Bilder/Gegner/gegner05GiftImmun.png', 350, 0.9, [3], [75], 5, 5]);  //5 Gift immuner Gegner
gegnertypen.push(['Bilder/Gegner/gegner06Boss1.png', 1000, 0.5, [0,6], [65,25], 20, 10]);   //6 Boss Gegner langsam mit slow und normaldmg immunität
gegnertypen.push(['Bilder/Gegner/gegner07Agro.png', 800,  1 ,[9] , [1], 5 , 3]);  //7 zieht die Tower auf sich
gegnertypen.push(['Bilder/Gegner/gegner08Heiler.png', 650, 1 ,[10], [[100, 140, 1]], 10 , 4]);  //8 soll die Gegner heilen 1% jede sec(100 spielticks) mit 140 reichweite
gegnertypen.push(['Bilder/Gegner/gegner09SpawnTimer.png', 550, 0.6, [8], [[150, 0]], 15, 6]); //9 spawnt Gegner 1 alle 0.5 sec (=50)
gegnertypen.push(['Bilder/Gegner/gegner10DethSplit.png', 400, 0.9 ,[7], [3] , 10, 6]); //10 nach dem Tod spawnt er 3 mal Gegner 11
gegnertypen.push(['Bilder/Gegner/gegner11Dethsplit2.png', 300, 1.4 ,[], [] , 5, 1]); // 11 wird von anderen gegnern gespawned
gegnertypen.push(['Bilder/Gegner/gegner12SpeedBuff.png', 375, 1.2 ,[11], [[5, 140]], 10 , 6]); //12 Bufft speed von anderen Gegner um 5% 140 reichweite
gegnertypen.push(['Bilder/Gegner/gegner13Shield.png', 650 , 1.6, [12], [[40, 140]], 10, 6]); //13 Bufft Gegner mit Schild 50% von gegnerleben und der Effektschaden wird anulliert solange das schild aktiv ist
gegnertypen.push(['Bilder/Gegner/gegner14TowerSlow.png', 750, 0.7, [13, 14], [[5, 350], [500, 140, 100]], 15 , 5]); //14 slowed die Türme in 350 reichweite um 5% und stunned alle 5 sec einen turm in 140 reichweite für 1 sec
gegnertypen.push(['Bilder/Gegner/gegner15Boss2.png', 2000, 0.8, [], [], 30 , 15]); //15 Boss2
gegnertypen.push(['Bilder/Gegner/gegner16Boss3.png', 2500, 0.7, [8], [[1000, 8]], 35, 15]); // 16 Boss3 spawnt alle 5 sec gegner 8 (heiler)

var towertypen = [];
//0 Base src, 1 Geschütz src, 2 Damage, 3 Drehgeschwindigkeit, 4 Reichweite, 5 Angriffszeit, 6 Preis, 7 Effekt, 8 Effektstärke, 9 EffektDauer/Reichweite, 10 Name, 11 stufe5 geschütz 12 unlockt
towertypen.push(['Bilder/Tower/base1.png', 'Bilder/Tower/00basic.png', 15, 1.5, 100, 0.5, 25, [], [], [], "Basic Tower", "Bilder/Tower/00basic5.png", true]);
towertypen.push(['Bilder/Tower/base2.png', 'Bilder/Tower/01sniper.png', 140, 0.6, 400, 3.5, 60, [], [], [], "Sniper", "Bilder/Tower/01sniper5.png", true]);
towertypen.push(['Bilder/Map/empty.png', 'Bilder/Tower/02slower.png', 0, 0, 90, 0.7, 60, [0], [1.5], [1.5], "Slow Tower", "Bilder/Tower/02slower5.png", true]);
towertypen.push(['Bilder/Tower/base1.png', 'Bilder/Tower/03gift.png', 0, 0, 100, 0.5, 80, [3], [7], [15], "Gift Tower", "Bilder/Tower/03gift5.png", true]);
towertypen.push(['Bilder/Tower/base2.png', 'Bilder/Tower/04feuerAoe.png', 25, 0, 100, 1, 150, [2], [10], [5], "FeuerAoe Turm", "Bilder/Tower/04feuerAoe5.png", true]);
towertypen.push(['Bilder/Tower/base2.png', 'Bilder/Tower/05antiBoss.png', 500, 1.3, 170, 4, 200, [1], [1], [0.35], "Anti Boss Tower", "Bilder/Tower/05antiBoss5.png", true]);
towertypen.push(['Bilder/Tower/base2.png', 'Bilder/Tower/06rocket.png', 140, 0.7, 400, 4, 250, [5], [75], [70], "Rocket Launcher", "Bilder/Tower/06rocket5.png", true]);
towertypen.push(['Bilder/Tower/base2.png','Bilder/Tower/07giftSingle.png', 100, 0.9, 140,  1, 100, [3], [130], [2], "Single Gift Turm", "Bilder/Tower/07giftSingle5.png", true]);
towertypen.push(['Bilder/Tower/base2.png', 'Bilder/Tower/08lavaTower.png', 100, 1, 140, 1, 90, [2], [150], [1], "Lavatower", "Bilder/Tower/08lavaTower5.png", true]);
towertypen.push(['Bilder/Tower/base2.png', 'Bilder/Tower/09support.png', 0, 0, 0 , 0, 60, [7, 8, 9, 10], [12.5, 10, 10, 25], [75, 75, 75, 150], "Support", "Bilder/Tower/09support5.png", true]);
towertypen.push(['Bilder/Tower/base2.png', 'Bilder/Tower/10tesla.png', 400, 0.8, 200, 6.5, 250, [6], [1], [70], "Tesla", "Bilder/Tower/10tesla5.png", true]);
towertypen.push(['Bilder/Map/empty.png', 'Bilder/Tower/11random.png', , , , , , [], [], [], "Random", "Bilder/Map/empty.png", false]);

//mit welchem schwierigkeitsmultiplayer werden die towerkosten/upgradekosten multipliziert
var preisMult = 1;
for (var i = 0; i < 3-schwierigkeit; i++) {
  preisMult -= 0.15;
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

scriptLoaded++;
