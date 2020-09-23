
var orginalTowertypen = [
  //0 Base src, 1 Geschütz src, 2 Damage, 3 Drehgeschwindigkeit, 4 Reichweite, 5 Angriffszeit, 6 Preis, 7 Effekt, 8 Effektstärke, 9 EffektDauer/Reichweite, 10 Name, 11 stufe5 geschütz, 12 unlockt, 13 critChance, 14 critDamage
  ['Bilder/Tower/base1.png', 'Bilder/Tower/00basic.png', 15, 1.5, 100, 0.5, 25, [], [], [], "Basic Tower", "Bilder/Tower/00basic5.png", false, 0, 100],
  ['Bilder/Tower/base2.png', 'Bilder/Tower/01sniper.png', 140, 0.6, 400, 3.5, 60, [], [], [], "Sniper", "Bilder/Tower/01sniper5.png", false, 0, 100],
  ['Bilder/Map/empty.png', 'Bilder/Tower/02slower.png', 0, 0, 90, 0.7, 60, [0], [1.5], [1.5], "Slow Tower", "Bilder/Tower/02slower5.png", false, 0, 100],
  ['Bilder/Tower/base1.png', 'Bilder/Tower/03gift.png', 0, 0, 100, 0.5, 80, [3], [7], [15], "Gift Tower", "Bilder/Tower/03gift5.png", false, 0, 100],
  ['Bilder/Tower/base2.png', 'Bilder/Tower/04feuerAoe.png', 25, 0, 100, 1, 150, [2], [10], [5], "FeuerAoe Turm", "Bilder/Tower/04feuerAoe5.png", false, 0, 100],
  ['Bilder/Tower/base2.png', 'Bilder/Tower/05antiBoss.png', 500, 1.3, 170, 4, 200, [1], [1], [0.35], "Anti Boss Tower", "Bilder/Tower/05antiBoss5.png", false, 0, 100],
  ['Bilder/Tower/base2.png', 'Bilder/Tower/06rocket.png', 140, 0.7, 400, 4, 250, [5], [75], [70], "Rocket Launcher", "Bilder/Tower/06rocket5.png", false, 0, 100],
  ['Bilder/Tower/base2.png','Bilder/Tower/07giftSingle.png', 100, 0.9, 140,  1, 100, [3], [130], [2], "Single Gift Turm", "Bilder/Tower/07giftSingle5.png", false, 0, 100],
  ['Bilder/Tower/base2.png', 'Bilder/Tower/08lavaTower.png', 100, 1, 140, 1, 90, [2], [150], [1], "Lavatower", "Bilder/Tower/08lavaTower5.png", false, 0, 100],
  ['Bilder/Tower/base2.png', 'Bilder/Tower/09support.png', 0, 0, 0 , 0, 60, [7, 8, 9, 10], [12.5, 10, 10, 25], [75, 75, 75, 150], "Support", "Bilder/Tower/09support5.png", false, 0, 100],
  ['Bilder/Tower/base2.png', 'Bilder/Tower/10tesla.png', 450, 0.8, 200, 6, 250, [6], [1], [70], "Tesla", "Bilder/Tower/10tesla5.png", false, 0, 100],
  ['Bilder/Map/empty.png', 'Bilder/Tower/11random.png', , , , , , [], [], [], "Random", "Bilder/Map/empty.png", false, , ]
];

var towertypen = copyObj(orginalTowertypen);

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
gegnertypen.push(['Bilder/Gegner/gegner09SpawnTimer.png', 550, 0.6, [8], [[250, 0]], 15, 6]); //9 spawnt Gegner 1 alle 2.5 sec (=250)
gegnertypen.push(['Bilder/Gegner/gegner10DethSplit.png', 400, 0.9 ,[7], [3] , 10, 6]); //10 nach dem Tod spawnt er 3 mal Gegner 11
gegnertypen.push(['Bilder/Gegner/gegner11Dethsplit2.png', 300, 1.4 ,[], [] , 5, 1]); // 11 wird von anderen gegnern gespawned
gegnertypen.push(['Bilder/Gegner/gegner12SpeedBuff.png', 375, 1.2 ,[11], [[5, 140]], 10 , 6]); //12 Bufft speed von anderen Gegner um 5% 140 reichweite
gegnertypen.push(['Bilder/Gegner/gegner13Shield.png', 650 , 1.6, [12], [[40, 140]], 10, 6]); //13 Bufft Gegner mit Schild 50% von gegnerleben und der Effektschaden wird anulliert solange das schild aktiv ist
gegnertypen.push(['Bilder/Gegner/gegner14TowerSlow.png', 750, 0.7, [13, 14], [[5, 350], [500, 140, 100]], 15 , 5]); //14 slowed die Türme in 350 reichweite um 5% und stunned alle 5 sec einen turm in 140 reichweite für 1 sec
gegnertypen.push(['Bilder/Gegner/gegner15Boss2.png', 2000, 0.8, [], [], 30 , 15]); //15 Boss2
gegnertypen.push(['Bilder/Gegner/gegner16Boss3.png', 2500, 0.7, [8], [[1500, 8]], 35, 15]); // 16 Boss3 spawnt alle 15 sec gegner 8 (heiler)
