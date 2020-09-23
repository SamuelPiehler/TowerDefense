//0 = Name, 1 = Beschreibung, 2 = TowerAffeckted(-1 = alle Türme, -2 = andere variablen), 3 = StattAffeckted, 4 = Stattchange, 5 = % = true, total = false, 0 = setToValue 6 = SkillRequired, 7 = SkillLvl Required, 8 = MaxStufe, 9 = MomentaneStufe, 10 = upgradeKosten, 11 = SupportSpezialisierung
const skills = [
  //BasicTurm
  ["BasicTurm Dmg", "Erhöht den Damage von BasicTürmen um 5%", 0, 2, 5, true, [], 0, 10, 0, 1],   //0
  ["BasicTurm Attackspeed", "Reduziert die Angriffszeit von BasicTürmen um 5%", 0, 5, -5, true, [0], 5, 5, 0, 1],    //1
  ["BasicTurm Reichweite", "Erhöht die Reichweite von BasicTürmen um 7,5%", 0, 4, 7.5, true, [], 0, 10, 0, 1],    //2
  ["BasicTurm drehGeschw", "Erhöht die drehGeschwindigkeit von BasicTürmen um 7,5%", 0, 3, 7.5, true, [], 0, 10, 0, 1],    //3
  ["BasicTurm critChance", "Erhöht die critChance von BasicTürmen um 5%", 0, 13, 5, false, [0], 1, 10, 0, 1],    //4
  ["BasicTurm critDamage", "Erhöht den CritSchaden von BasicTürmen um 10%", 0, 2, 10, false, [4], 5, 10, 0, 1],   //5
  ,   //6
  ,   //7
  ["Basic St5", "Stufe 5 BasicTürme bekommen einen 2ten Lauf", 0, 12, true, 0, [123], 2, 1, 0, 5],   //8
  ,   //9
  //Sniper
  ["Sniper Dmg", "Erhöht den Damage von Sniper um 5%", 1, 2, 5, true, [], 0, 10, 0, 1],   //10
  ["Sniper Attackspeed", "Reduziert die Angriffszeit von Sniper um 5%", 1, 5, -5, true, [10], 5, 5, 0, 1],    //11
  ["Sniper Reichweite", "Erhöht die Reichweite von Sniper um 7,5%", 1, 4, 7.5, true, [], 0, 10, 0, 1],    //12
  ["Sniper drehGeschw", "Erhöht die drehGeschwindigkeit von Sniper um 7,5%", 1, 3, 7.5, true, [], 0, 10, 0, 1],    //13
  ["Sniper critChance", "Erhöht die critChance von Sniper um 5%", 1, 13, 5, false, [10], 1, 10, 0, 1],    //14
  ["Sniper critDamage", "Erhöht den CritSchaden von Sniper um 10%", 1, 14, 10, false, [14], 5, 10, 0, 1],   //15
  ,   //16
  ,   //17
  ["Sniper St5", "Stufe 5 Sniper schießen durch gegner durch und treffen alle Gegner auf einer Linie", 1, 12, true, 0, [123], 2, 1, 0, 5],   //18
  ,   //19
  //SlowTurm
  ["SlowTurm Dmg", "Erhöht den Damage von SlowTürmen um 5", 2, 2, 5, false, [], 0, 10, 0, 1],   //20
  ["SlowTurm Attackspeed", "Reduziert die Angriffszeit von SlowTürmen um 5%", 2, 5, -5, true, [], 0, 5, 0, 1],   //21
  ["SlowTurm Reichweite", "Erhöht die Reichweite von SlowTürmen um 7,5%", 2, 4, 7.5, true, [], 0, 10, 0, 1],   //22
  ,   //23
  ["SlowTurm critChance", "Erhöht die critChance von SlowTürmen um 5%", 2, 13, 5, false, [20], 5, 10, 0, 1],   //24
  ["SlowTurm critDamage", "Erhöht den CritSchaden von SlowTürmen um 10%", 2, 14, 10, false, [24], 5, 10, 0, 1],    //25
  ["SlowTurm EffecktStärke", "Erhöht die SlowStärke von SlowTürmen um 5%", 2, 8, 5, true, [], 0, 10, 0, 1],    //26
  ["SlowTurm EffecktDauer", "Erhöht die SlowDauer von SlowTürmen um 5%", 2, 9, 5, true, [], 0, 10, 0, 1],    //27
  ["SlowTurm St5", "Stufe 5 SlowTürme fügen zusätzlich eine stackbare und dauerhafte verlangsamung zu", 2, 12, true, 0, [123], 2, 1, 0, 5],   //28
  ,   //29
  //GiftTurm
  ["GiftTurm Dmg", "Erhöht den Damage von GiftTürmen um 5", 3, 2, 5, false, [], 0, 10, 0, 1],   //30
  ["GiftTurm Attackspeed", "Reduziert die Angriffszeit von GiftTürmen um 5%", 3, 5, -5, true, [], 0, 5, 0, 1],   //31
  ["GiftTurm Reichweite", "Erhöht die Reichweite von GiftTürmen um 7,5%", 3, 4, 7.5, true, [], 0, 10, 0, 1],   //32
  ,   //33
  ["GiftTurm critChance", "Erhöht die critChance von GiftTürmen um 5%", 3, 12, 5, true, [30], 5, 10, 0, 1],   //34
  ["GiftTurm critDamage", "Erhöht den CritSchaden von GiftTürmen um 10%", 3, 14, 10, false, [34], 5, 10, 0, 1],    //35
  ["GiftTurm EffecktStärke", "Erhöht die GiftStärke von GiftTürmen um 5%", 3, 8, 5, true, [], 0, 10, 0, 1],    //36
  ["GiftTurm EffecktDauer", "Erhöht die GiftDauer von GiftTürmen um 5%", 3, 9, 5, true, [], 0, 10, 0, 1],    //37
  ["GiftTurm St5", "Gift von Stufe 5 GiftTürmen stacked nun mit anderem Gift", 3, 12, true, 0, [123], 2, 1, 0, 5],   //38
  ,   //39
  //FeuerAoeTurm
  ["FeuerAoeTurm Dmg", "Erhöht den Damage von FeuerAoeTürmen um 5", 4, 2, 5, false, [], 0, 10, 0, 1],   //40
  ["FeuerAoeTurm Attackspeed", "Reduziert die Angriffszeit von FeuerAoeTürmen um 5%", 4, 5, -5, true, [], 0, 5, 0, 1],   //41
  ["FeuerAoeTurm Reichweite", "Erhöht die Reichweite von FeuerAoeTürmen um 7,5%", 4, 4, 7.5, true, [], 0, 10, 0, 1],   //42
  ,   //43
  ["FeuerAoeTurm critChance", "Erhöht die critChance von FeuerAoeTürmen um 5%", 4, 12, 5, true, [40], 5, 10, 0, 1],   //44
  ["FeuerAoeTurm critDamage", "Erhöht den CritSchaden von FeuerAoeTürmen um 10%", 4, 14, 10, false, [44], 5, 10, 0, 1],    //45
  ["FeuerAoeTurm EffecktStärke", "Erhöht die FeuerStärke von FeuerAoeTürmen um 5%", 4, 8, 5, true, [], 0, 10, 0, 1],    //46
  ["FeuerAoeTurm EffecktDauer", "Erhöht die FeuerDauer von FeuerAoeTürmen um 5%", 4, 9, 5, true, [], 0, 10, 0, 1],    //47
  ["FeuerAoeTurm St5", "Stufe 5 FeuerAoeTürmen bekommen die chance beim angriff einem zufälligen Gegner auf der map 10fachen Schaden und Feuerschaden zuzufügen", 4, 12, true, 0, [123], 2, 1, 0, 5],   //48
  ,   //49
  //AntiBoss
  ["AntiBossTurm Dmg", "Erhöht den Damage von AntiBossTürmen um 5%", 5, 2, 5, true, [], 0, 10, 0, 1],   //50
  ["AntiBossTurm Attackspeed", "Reduziert die Angriffszeit von AntiBossTürmen um 5%", 5, 5, -5, true, [50], 5, 5, 0, 1],    //51
  ["AntiBossTurm Reichweite", "Erhöht die Reichweite von AntiBossTürmen um 7,5%", 5, 4, 7.5, true, [], 0, 10, 0, 1],    //52
  ["AntiBossTurm drehGeschw", "Erhöht die drehGeschwindigkeit von AntiBossTürmen um 7,5%", 5, 3, 7.5, true, [], 0, 10, 0, 1],    //53
  ["AntiBossTurm critChance", "Erhöht die critChance von AntiBossTürmen um 5%", 5, 13, 5, false, [50], 1, 10, 0, 1],    //54
  ["AntiBossTurm critDamage", "Erhöht den CritSchaden von AntiBossTürmen um 10%", 5, 14, 10, false, [54], 5, 10, 0, 1],   //55
  ,   //56
  ["AntiBossTurm EffecktDauer", "Erhöht die StunnDauer von AntiBossTürmen um 5%", 5, 9, 5, true, [], 0, 10, 0, 1],    //57
  ["AntiBossTurm St5", "Stufe 5 AntiBossTürme haben längere Stunzeit und fügen pro Hit auf den Selben Gegner 100 mehr schaden zu", 5, 12, true, 0, [123], 2, 1, 0, 5],   //58
  ,   //59
  //Rocket
  ["RocketLauncher Dmg", "Erhöht den Damage von RocketLaunchern um 5%", 6, 2, 5, true, [], 0, 10, 0, 1],   //60
  ["RocketLauncher Attackspeed", "Reduziert die Angriffszeit von RocketLaunchern um 5%", 6, 5, -5, true, [60], 5, 5, 0, 1],    //61
  ["RocketLauncher Reichweite", "Erhöht die Reichweite von RocketLaunchern um 7,5%", 6, 4, 7.5, true, [], 0, 10, 0, 1],    //62
  ["RocketLauncher drehGeschw", "Erhöht die drehGeschwindigkeit von RocketLaunchern um 7,5%", 6, 3, 7.5, true, [], 0, 10, 0, 1],    //63
  ["RocketLauncher critChance", "Erhöht die critChance von RocketLaunchern um 5%", 6, 13, 5, false, [60], 1, 10, 0, 1],    //64
  ["RocketLauncher critDamage", "Erhöht den CritSchaden von RocketLaunchern um 10%", 6, 14, 10, false, [64], 5, 10, 0, 1],   //65
  ["RocketLauncher EffecktStärke", "Erhöht den AoeSchaden von RocketLaunchern um 5%", 6, 8, 5, true, [], 0, 10, 0, 1],    //66
  ["RocketLauncher EffecktReichweite", "Erhöht die AoEReichweite von RocketLaunchern um 5%", 6, 9, 5, true, [], 0, 10, 0, 1],    //67
  ["RocketLauncher St5", "Stufe 5 RocketLauncher Stunnen nun Gegner im Explosionsbereich für kurze Zeit", 6, 12, true, 0, [123], 2, 1, 0, 5],   //68
  ,   //69
  //SingleGift
  ["SingleGiftTurm Dmg", "Erhöht den Damage von SingleGiftTürmen um 5%", 7, 2, 5, true, [], 0, 10, 0, 1],   //70
  ["SingleGiftTurm Attackspeed", "Reduziert die Angriffszeit von SingleGiftTürmen um 5%", 7, 5, -5, true, [70], 5, 5, 0, 1],    //71
  ["SingleGiftTurm Reichweite", "Erhöht die Reichweite von SingleGiftTürmen um 7,5%", 7, 4, 7.5, true, [], 0, 10, 0, 1],    //72
  ["SingleGiftTurm drehGeschw", "Erhöht die drehGeschwindigkeit von SingleGiftTürmen um 7,5%", 7, 3, 7.5, true, [], 0, 10, 0, 1],    //73
  ["SingleGiftTurm critChance", "Erhöht die critChance von SingleGiftTürmen um 5%", 7, 13, 5, false, [70], 1, 10, 0, 1],    //74
  ["SingleGiftTurm critDamage", "Erhöht den CritSchaden von SingleGiftTürmen um 10%", 7, 14, 10, false, [74], 5, 10, 0, 1],   //75
  ["SingleGiftTurm EffecktStärke", "Erhöht den GiftSchaden von SingleGiftTürmen um 5%", 7, 8, 5, true, [], 0, 10, 0, 1],    //76
  ["SingleGiftTurm EffecktReichweite", "Erhöht die GiftReichweite von SingleGiftTürmen um 5%", 7, 9, 5, true, [], 0, 10, 0, 1],    //77
  ["SingleGiftTurm St5", "Stufe 5 SingleGiftTürme bekommen stark verbesserte Stats", 7, 12, true, 0, [123], 2, 1, 0, 5],   //78
  ,   //79
  //LavaTurm
  ["LavaTurm Dmg", "Erhöht den Damage von LavaTürmen um 5%", 8, 2, 5, true, [], 0, 10, 0, 1],   //80
  ["LavaTurm Attackspeed", "Reduziert die Angriffszeit von LavaTürmen um 5%", 8, 5, -5, true, [80], 5, 5, 0, 1],    //81
  ["LavaTurm Reichweite", "Erhöht die Reichweite von LavaTürmen um 7,5%", 8, 4, 7.5, true, [], 0, 10, 0, 1],    //82
  ["LavaTurm drehGeschw", "Erhöht die drehGeschwindigkeit von LavaTürmen um 7,5%", 8, 3, 7.5, true, [], 0, 10, 0, 1],    //83
  ["LavaTurm critChance", "Erhöht die critChance von LavaTürmen um 5%", 8, 13, 5, false, [80], 1, 10, 0, 1],    //84
  ["LavaTurm critDamage", "Erhöht den CritSchaden von LavaTürmen um 10%", 8, 14, 10, false, [84], 5, 10, 0, 1],   //85
  ["LavaTurm EffecktStärke", "Erhöht den FeuerSchaden von LavaTürmen um 5%", 8, 8, 5, true, [], 0, 10, 0, 1],    //86
  ["LavaTurm EffecktReichweite", "Erhöht die FeuerReichweite von LavaTürmen um 5%", 8, 9, 5, true, [], 0, 10, 0, 1],    //87
  ["LavaTurm St5", "Stufe 5 LavaTürme bekommen stark verbesserte Stats", 8, 12, true, 0, [123], 2, 1, 0, 5],   //88
  ,   //89
  //Support 	achtung hier ist letzte Stelle SupportSpezialisierung
  ["SupportTurm EffecktStärke", "Erhöht den DmgSupport von SupportTürmen um 5%", 9, 8, 5, true, [], 0, 10, 0, 1, 0],    //90
  ["SupportTurm EffecktReichweite", "Erhöht die DmgSupportReichweite von SupportTürmen um 5%", 9, 9, 5, true, [], 0, 10, 0, 1, 0],    //91
  ["SupportTurm EffecktStärke", "Erhöht den AttackspeedSupport von SupportTürmen um 5%", 9, 8, 5, true, [], 0, 10, 0, 1, 1],    //92
  ["SupportTurm EffecktReichweite", "Erhöht die AttackspeedSupportReichweite von SupportTürmen um 5%", 9, 9, 5, true, [], 0, 10, 0, 1, 1],    //93
  ["SupportTurm EffecktStärke", "Erhöht den EffecktSupport von SupportTürmen um 5%", 9, 8, 5, true, [], 0, 10, 0, 1, 2],    //94
  ["SupportTurm EffecktReichweite", "Erhöht die EffecktSupportReichweite von SupportTürmen um 5%", 9, 9, 5, true, [], 0, 10, 0, 1, 2],    //95
  ["SupportTurm EffecktStärke", "Erhöht den ReichweitenSupport von SupportTürmen um 5%", 9, 8, 5, true, [], 0, 10, 0, 1, 3],    //96
  ["SupportTurm EffecktReichweite", "Erhöht die ReichweitenSupportReichweite von SupportTürmen um 5%", 9, 9, 5, true, [], 0, 10, 0, 1, 3],    //97
  ["SupportTurm St5", "Stufe 5 SupportTürme bekommen stark verbesserte Stats", 9, 12, true, 0, [123], 2, 1, 0, 5],   //98
  ,   //99
  //TeslaTurm
  ["TeslaTurm Dmg", "Erhöht den Damage von TeslaTürmen um 5%", 10, 2, 5, true, [], 0, 10, 0, 1],   //100
  ["TeslaTurm Attackspeed", "Reduziert die Angriffszeit von TeslaTürmen um 5%", 10, 5, -5, true, [100], 5, 5, 0, 1],    //101
  ["TeslaTurm Reichweite", "Erhöht die Reichweite von TeslaTürmen um 7,5%", 10, 4, 7.5, true, [], 0, 10, 0, 1],    //102
  ["TeslaTurm drehGeschw", "Erhöht die drehGeschwindigkeit von TeslaTürmen um 7,5%", 10, 3, 7.5, true, [], 0, 10, 0, 1],    //103
  ["TeslaTurm critChance", "Erhöht die critChance von TeslaTürmen um 5%", 10, 13, 5, false, [100], 1, 10, 0, 1],    //104
  ["TeslaTurm critDamage", "Erhöht den CritSchaden von TeslaTürmen um 10%", 10, 14, 10, false, [104], 5, 10, 0, 1],   //105
  ["TeslaTurm EffecktStärke", "Erhöht die maximale Anzahl an EffecktÜbersprüngen von TeslaTürmen um 1", 10, 8, 1, false, [107, 98], [5, 1], 10, 0, 10],    //106
  ["TeslaTurm EffecktReichweite", "Erhöht die FeuerReichweite von TeslaTürmen um 5%", 10, 9, 5, true, [100], 3, 10, 0, 1],    //107
  ["TeslaTurm St5", "Kettenblitz von Stufe 5 TeslaTürmen können doppelt so oft überspringen", 10, 12, true, 0, [123], 2, 1, 0, 5],   //108
  ,   //109
  //allgemeine Turm Upgrades (für jeden turm)
  ["Turm Dmg", "Erhöht den Damage von Türmen um 5%", -1, 2, 5, true, [0, 10, 20, 30, 40, 50, 60, 70, 80, 100], 30, 5, 0, 2],   //110
  ["Turm Attackspeed", "Reduziert die Angriffszeit von Türmen um 5%", -1, 5, -5, true, [1, 11, 21, 31, 41, 51, 61, 71, 81, 101], 30, 3, 0, 2],    //111
  ["Turm Reichweite", "Erhöht die Reichweite von Türmen um 7,5%", -1, 4, 7.5, true, [2, 12, 22, 32, 42, 52, 62, 72, 82, 102], 30, 5, 0, 2],    //112
  ["Turm drehGeschw", "Erhöht die drehGeschwindigkeit von Türmen um 7,5%", -1, 3, 7.5, true, [3, 13, 53, 63, 73, 83, 103], 15, 5, 0, 2],    //113
  ["Turm critChance", "Erhöht die critChance von Türmen um 5%", -1, 13, 5, false, [4, 14, 24, 34, 44, 54, 64, 74, 84, 104], 1, 5, 0, 2],    //114
  ["Turm critDamage", "Erhöht den CritSchaden von Türmen um 10%", -1, 14, 10, false, [5, 15, 25, 35, 45, 55, 65, 75, 85, 105], 5, 5, 0, 2],   //115
  ["Turm EffecktStärke", "Erhöht die EffecktStärke von Türmen um 5%", -1, 8, 1, false, [26, 36, 46, 66, 76, 86, 90, 92, 94, 96], 30, 5, 0, 2],    //116
  ["Turm EffecktReichweite/Zeit", "Erhöht die EffecktReichweite von Türmen um 5%", -1, 9, 5, true, [27, 37, 47, 67, 77, 87, 91, 93, 95, 97], 30, 5, 0, 2],    //117
  ,   //118
  ,   //119
  //allgemeine Upgrdes
  ["Kills geben mehr Geld", "Geld pro kill erhöht sich um 5%", -2, 0, 5, true, [], 0, 5, 0, 3],   //120
  ["Mache Steine zerstörbar", "Erhale die fähigkeit Steine für 1000 Gold zu zerstören", -2, 1, 1000, 0, [110], 3, 1, 0, 5],   //121
  ["Steine billiger zerstören", "Reduziert die kosten um steine zu zerstören um 5%", -2, 1, -5, true, [111], 1, 5, 0, 1],   //122
  ["Höheres Maximum", "Erhöht die maximale Upgradestufe von Türmen um 1", -2, 2, 1, false, [], 0, 2, 0, 5]   //123
];

var skillPunkte = 0;

function applaySkills() {
  towertypen = copyObj(orginalTowertypen);
  geldMult = 1;
  killSteinePreis = Infinity;
  maxUpgrade = 3;
  for (var i = 0; i < skills.length; i++) {
    if (skills[i] != undefined) {
      for (var j = 0; j < skills[i][9]; j++) {
        if (skills[i][2] >= 0) {    //betrifft nur einen Turm
          towertypen[skills[i][2]][skills[i][3]] = getUpdatedStat(towertypen[skills[i][2]][skills[i][3]], skills[i][5], skills[i][4]);
        }
        else if (skills[i][2] == -1) {    //betrifft alle Türme
          for (var k = 0; k < towertypen.length-1; k++) {
            towertypen[k][skills[i][3]] = getUpdatedStat(towertypen[k][skills[i][3]], skills[i][5], skills[i][4]);
          }
        }
        else {    //betrifft spezielle Nicht Turmspezifische Variablen
          switch (skills[i][3]) {
            case 0:
              geldMult = getUpdatedStat(geldMult, skills[i][5], skills[i][4]);
              break;
            case 1:
              killSteinePreis = getUpdatedStat(killSteinePreis, skills[i][5], skills[i][4]);
              break;
            case 2:
              maxUpgrade = getUpdatedStat(maxUpgrade, skills[i][5], skills[i][4]);
              break;
          }
        }
      }
    }
  }
}

function resetSkills() {
  for (var i = 0; i < skills.length; i++) {
    if (skills[i] != undefined) {
      skillPunkte += skills[i][9] * (skills[i][10]-1) + (skills[i][9]+1)*(skills[i][9])/2;
      skills[i][9] = 0;
    }
  }
  applaySkills();
  saveSkillTree();
}

function getUpdatedStat(orginal, changeType, changeAmount) {
  switch (changeType) {
    case true:
      return orginal * (1 + changeAmount/100);
      break;
    case false:
      return orginal + changeAmount;
      break;
    case 0:
      return changeAmount;
      break;
  }
}

function saveSkillTree() {
  var skillLevels = [1, skillPunkte];    //versionsnummer, skillpunkte
  for (var i = 0; i < skills.length; i++) {
    if (skills[i] == undefined) {
      skillLevels.push(undefined);
    }
    else {
      skillLevels.push(skills[i][9]);
    }
  }
  localStorage.setItem('skillLevels', JSON.stringify(skillLevels));
}

loadSkillTree();
function loadSkillTree() {
  var killLevelsString = localStorage.getItem('skillLevels');
  if (killLevelsString != null) {
    var skillLevels = JSON.parse(killLevelsString);
    if (skillLevels[0] == 1 && skillLevels.length == skills.length + 2) {
      skillPunkte = skillLevels[1];
      for (var i = 2; i < skillLevels.length; i++) {
        if (skillLevels[i] != null) {
          skills[i-2][9]=skillLevels[i];
        }
      }
    }
    else {
      console.log("fehler beim laden");
    }
    applaySkills();
  }
}
//für jeden Turm

//+schaden/efecktschaden(+% bis auf eis + total) 2 skills
//+angriffsGeschwindikeit//nichtSupport
//+reichweite
//+drehGeschw
//+critChance
//+critDamage
//+st5Unlock benötigt allgemeine upgradestufe auf 5

//für alle Türme
//hat gleichen skills wie je turm nur unlocked wenn x Punkte in je turm stat verteilt
//Max Upgradestufe von 3-5 erhöhen


//allgemeine Upgrades
//+Geld pro kill
//Steine zerstörbar machen für 1000 Geld
//Steine zerstören billiger machen

//Upgrades für Spezifische tower
//Randomtower bekommt chance turm mit upgrades zu spawnen
//Tesla bekommt extra Targets auf dem skill
//Sniper ST 5 Breiterer schuss
//St5 Mehr Läufe
//Slow St 5 mehr max Stats
//Poisen Ignoriert teil von immunität
//AoE Höhere chance auf specialAngriff
//Zweiten Lauf
//Rocket längere Stunzeit+Efecktrange
//SingleGift bekommt kleinen Aoe beim gegner
//Lava Setzt feld um sich in Brand
//support kann 2te fähigkeit wählen
//Kettenblitz hat chance auf 2 Gegner überspringen
