
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
  this.spezialisierung = spezialisierung;
  if (this.spezialisierung == undefined) {
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
  this.towerSlow = 1;
  this.towerStun = 0;
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
  this.canvasBase.width = size;
  this.canvasBase.height = size;
  this.canvasBase.style.position = 'absolute';
  this.canvasBase.style.left = (this.posx+10)+'px';
  this.canvasBase.style.top = (this.posy+50)+'px';
  this.canvasBase.style.zIndex=3;
  ladeBild(towertypen[this.typ][0], this.canvasBase, 0);
  this.canvasGeschütz = document.createElement("canvas"); //bild für geschütz
  document.body.appendChild(this.canvasGeschütz);
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
  switch (spezialisierung*1) {
    case 0:
      ladeBild("Bilder/Icons/schadenKlein.png", this.canvasGeschütz, 0);
      break;
    case 1:
      ladeBild("Bilder/Icons/angriffsGeschwindikeitKlein.png", this.canvasGeschütz, 0);
      break;
    case 2:
      ladeBild("Bilder/Icons/effecktKlein.png", this.canvasGeschütz, 0);
      break;
    case 3:
      ladeBild("Bilder/Icons/reichweiteKlein.png", this.canvasGeschütz, 0);
      break;
  }
  this.buffTuerme = function(){
    for (var i = 0; i < this.effekt.length; i++) {
      if (this.effekt[i] >= 7 && this.effekt[i] <= 10) {
        tuerme.forEach((item, j) => {
          if (item != undefined && j != this.id) {
            entfernung = getEntfernung(item, this);
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
    upgradeFenster.style.height="80px";
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
    strongButton.style.top = (30)+'px';
    strongButton.addEventListener("click", function(){tuerme[id].targetPrio=2;hideUpgrade();});
    var weakButton = document.createElement("button");
    upgradeFenster.appendChild(weakButton);
    weakButton.innerHTML = "weak";
    weakButton.style.position = 'absolute';
    weakButton.style.left = (60)+'px';
    weakButton.style.top = (30)+'px';
    weakButton.addEventListener("click", function(){tuerme[id].targetPrio=3;hideUpgrade();});
    var fastButton = document.createElement("button");
    upgradeFenster.appendChild(fastButton);
    fastButton.innerHTML = "fast";
    fastButton.style.position = 'absolute';
    fastButton.style.left = (0)+'px';
    fastButton.style.top = (60)+'px';
    fastButton.addEventListener("click", function(){tuerme[id].targetPrio=4;hideUpgrade();});
    var slowButton = document.createElement("button");
    upgradeFenster.appendChild(slowButton);
    slowButton.innerHTML = "slow";
    slowButton.style.position = 'absolute';
    slowButton.style.left = (60)+'px';
    slowButton.style.top = (60)+'px';
    slowButton.addEventListener("click", function(){tuerme[id].targetPrio=5;hideUpgrade();});
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
  this.upgrade = function(free = false){    //funktion um turm aufzuwerten
    var successUp = false;      //konnte der turm aufgewertet werden
    if (this.upgradeStufe < maxUpgrade){
      if (this.upgradeStufe == maxUpgrade - 1){    //berechne upgrade preis
        preis = parseInt(towertypen[this.typ][6]*preisMult)*2;
      }
      else {
        preis = parseInt(parseInt(towertypen[this.typ][6]*preisMult)*(25+10*this.upgradeStufe)/100);
      }
      if (geld >= preis || free) {  //genug geld vorhanden?
        successUp = true;
        if (!free) {
          addGeld(-preis);
        }
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
              this.letzterAngriff2 = roundTime;
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
              this.effektTime[0] = 100;
              break;
            case 6:   //rocketLauncher Stunned Gegner für 0,25 sec
              ladeBild(towertypen[this.typ][11], this.canvasGeschütz, 0, true);
              this.effekt.push(1);
              this.effektStaerke.push(1);
              this.effektTime.push(25);
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
              switch (spezialisierung) {
                case "0":
                  ladeBild("Bilder/Icons/schadenKlein.png", this.canvasGeschütz, 0);
                  break;
                case "1":
                  ladeBild("Bilder/Icons/angriffsGeschwindikeitKlein.png", this.canvasGeschütz, 0);
                  break;
                case "2":
                  ladeBild("Bilder/Icons/effecktKlein.png", this.canvasGeschütz, 0);
                  break;
                case "3":
                  ladeBild("Bilder/Icons/reichweiteKlein.png", this.canvasGeschütz, 0);
                  break;
              }
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
      if (document.getElementById("fehler"+this.id) != null) {
        document.getElementById("fehler"+this.id).hidden = false;
      }
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
    if (this.upgradeStufe == maxUpgrade && this.typ == 0 && towertypen[this.typ][12] && target2 !== -1) {    // wenn basic turm stufe 5
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
      if (Math.abs(this.richtung2 - grad2) < this.drehGeschw*gameSpeed*(1+this.buffStaerken[3]/100)/this.towerSlow && this.towerStun <= 0) {   //wenn sich der turm lauf2 bis zum gegner2 drehen kann in diesem gametick
        this.richtung2 = grad2;
        if (roundTime - this.letzterAngriff2 >= 100 * this.angriffsZeit/(1+this.buffStaerken[1]/100)) {   //wenn zeit des letzten angriffs länger als angriffszeit her ist
          bullet(this.posx, this.posy, gegner[target2].posx, gegner[target2].posy, 100/gameSpeed);   //add bullet
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
        if (this.towerStun <= 0) {
          this.richtung2 -= this.drehGeschw*gameSpeed*(1+this.buffStaerken[3]/100)/this.towerSlow;
        }
      }
      else {
        if (this.towerStun <= 0) {
          this.richtung2 += this.drehGeschw*gameSpeed*(1+this.buffStaerken[3]/100)/this.towerSlow;
        }
      }
    }
    if (Math.abs(this.richtung - grad) < this.drehGeschw*gameSpeed*(1+this.buffStaerken[3]/100)/this.towerSlow && this.towerStun <= 0) {   //wenn sich der turm bis zum gegner drehen kann in diesem gametick
      this.richtung = grad;
      while (this.richtung >= 360) {
        this.richtung -= 360;
      }
      while (this.richtung < 0) {
        this.richtung += 360;
      }
      if (roundTime - this.letzterAngriff >= 100 * this.angriffsZeit/(1+this.buffStaerken[1]/100)) {   //wenn zeit des letzten angriffs länger als angriffszeit her ist
        if (this.typ == 1 && this.upgradeStufe == maxUpgrade && towertypen[this.typ][12]) {    //wenn sniper stufe 5
          switch (this.richtung) {
            case 0:   //wenn der sniper exact nach oben zeigt
                bullet(this.posx, this.posy, this.posx, -size/2, 100/gameSpeed);   //add bullet
              break;
            case 90:   //wenn der sniper exact nach links zeigt
              bullet(this.posx, this.posy, -size/2, this.posy, 100/gameSpeed);   //add bullet
              break;
            case 180:   //wenn der sniper nach unten zeigt
              bullet(this.posx, this.posy, this.posx, size * map.length - size/2, 100/gameSpeed);   //add bullet
              break;
            case 270:  //wenn der sniper nach rechts zeigt
              bullet(this.posx, this.posy, size * map[0].length - size/2, this.posy, 100/gameSpeed);   //add bullet
              break;
            default:
              var a = -Math.tan((this.richtung+90)/180*Math.PI);    //f(x)=a(x-this.posx)+this.posy funktion der geraden auf der der sniperschuss fliegt   //g(x)=1/a(x-item.posx)+item.posy funktion der gerade gegner und dem nähesten punkt der snipergerade
              if ((this.richtung < 180 && a * (-size/2-this.posx) + this.posy < -size/2) || (this.richtung > 180 && a * (size * map[0].length - size/2 - this.posx) + this.posy < -size/2)) {//falsch   //add bullet mit endpunkt (f(x)|0)
                bullet(this.posx, this.posy, (-size/2-this.posy)/a + this.posx, - size/2, 100/gameSpeed);   //add bullet mit endpunkt f(x) = -size/2
              }
              else if ((this.richtung < 180 && a * (-size/2 - this.posx) + this.posy > size * map.length - size/2) || (this.richtung > 180 && a * (size * map[0].length + this.posx) + this.posy > size * map.length-size/2)) {//falsch   //add bullet mit endpunkt (f(x)|MapHight)
                bullet(this.posx, this.posy, (size*map.length-size/2-this.posy)/a + this.posx, size * map.length - size/2, 100/gameSpeed);   //add bullet mit endpunkt f(x) = mapy -size/2
              }
              else {
                if (this.richtung < 180) {
                  bullet(this.posx, this.posy, -size/2, a * (- size/2 - this.posx) + this.posy, 100/gameSpeed);   //add bullet mit endpunkt (-size/2|f(-size/2))
                }
                else {
                  bullet(this.posx, this.posy, size * map[0].length - size/2, a * (size * map[0].length - size/2 - this.posx) + this.posy, 100/gameSpeed);   //add bullet mit endpunkt (mapWidth - size/2|f(mapWidth-size/2))
                }
              }
              break;
          }
          //kommt weg!!
          var anzalHits = 0;
          var weakenPerHit = 0.98;
          for (var i = gegner.length - 1; i >= 0 ; i--) {
            var item = gegner[i];
            if (item != undefined) {
              switch (this.richtung) {
                case 0:   //wenn der sniper exact nach oben zeigt
                  if (this.posy > item.posy && Math.abs(this.posx-item.posx) <= size/2) {
                    item.damage(this.schaden*(1+this.buffStaerken[0]/100)*Math.pow(weakenPerHit, anzalHits), this.effekt.slice(), uebergabeEffektStaerke.slice(), uebergabeEffektTime.slice(), this.id);
                    anzalHits++;
                  }
                  break;
                case 90:   //wenn der sniper exact nach links zeigt
                  if (this.posx > item.posx && Math.abs(this.posy-item.posy) <= size/2) {
                    item.damage(this.schaden*(1+this.buffStaerken[0]/100)*Math.pow(weakenPerHit, anzalHits), this.effekt.slice(), uebergabeEffektStaerke.slice(), uebergabeEffektTime.slice(), this.id);
                    anzalHits++;
                  }
                  break;
                case 180:   //wenn der sniper nach unten zeigt
                  if (this.posy < item.posy && Math.abs(this.posx-item.posx) <= size/2) {
                    item.damage(this.schaden*(1+this.buffStaerken[0]/100)*Math.pow(weakenPerHit, anzalHits), this.effekt.slice(), uebergabeEffektStaerke.slice(), uebergabeEffektTime.slice(), this.id);
                    anzalHits++;
                  }
                  break;
                case 270:  //wenn der sniper nach rechts zeigt
                  if (this.posx < item.posx && Math.abs(this.posy-item.posy) <= size/2) {
                    item.damage(this.schaden*(1+this.buffStaerken[0]/100)*Math.pow(weakenPerHit, anzalHits), this.effekt.slice(), uebergabeEffektStaerke.slice(), uebergabeEffektTime.slice(), this.id);
                    anzalHits++;
                  }
                  break;
                default:   //f(x)=a(x-this.posx)+this.posy funktion der geraden auf der der sniperschuss fliegt   //g(x)=1/a(x-item.posx)+item.posy funktion der gerade gegner und dem nähesten punkt der snipergerade
                  var xPunktNaheGegner = (item.posy-this.posy+a*this.posx-(1/a)*item.posx) / (a-1/a);   //f(x)=g(x) ergiebt x
                  var yPunktNaheGegner = a*(xPunktNaheGegner - this.posx)+this.posy   //x in f(x) ergiebt y
                  entfernung = getEntfernung({posx: xPunktNaheGegner, posy: yPunktNaheGegner}, item);
                  if (entfernung <= 35) {
                    if ((this.richtung < 180 && this.posx > item.posx) || (this.richtung > 180 && this.posx < item.posx)) {
                      item.damage(this.schaden*(1+this.buffStaerken[0]/100)*Math.pow(weakenPerHit, anzalHits), [], [], [], this.id);
                      anzalHits++;
                    }
                  }
                  break;
              }
            }
          }
          if (maxHit < anzalHits) {
            maxHit = anzalHits;
            console.log("sniper: " + maxHit);
          }
        }
        else if (this.typ == 5 && this.upgradeStufe == maxUpgrade && towertypen[this.typ][12] && target2 !== -1) {    //wenn antiBoss stufe 5
          bullet(this.posx, this.posy, gegner[target2].posx, gegner[target2].posy, 100/gameSpeed);   //add bullet
          //füge schaden und effeckt auf gegner zu
          gegner[target].damage(this.schaden*(1+this.buffStaerken[0]/100)+100*this.effecktStacks*(1+this.buffStaerken[2]/100), this.effekt.slice(), uebergabeEffektStaerke.slice(), uebergabeEffektTime.slice(), this.id);
          if (target != -1) {
            this.effecktStacks++;
          }
        }
        else {
          if (gegner[target] != undefined) {
            bullet(this.posx, this.posy, gegner[target].posx, gegner[target].posy, 100/gameSpeed);   //add bullet
            gegner[target].damage(this.schaden*(1+this.buffStaerken[0]/100), this.effekt.slice(), uebergabeEffektStaerke.slice(), uebergabeEffektTime.slice(), this.id);   //füge schaden und effeckt auf gegner zu
          }
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
      if (this.towerStun <= 0) {
        this.richtung -= this.drehGeschw*gameSpeed*(1+this.buffStaerken[3]/100)/this.towerSlow;
      }
    }
    else {
      if (this.towerStun <= 0) {
        this.richtung += this.drehGeschw*gameSpeed*(1+this.buffStaerken[3]/100)/this.towerSlow;
      }
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
    if (this.towerStun > 0) {
      this.letzterAngriff += gameSpeed;
      this.letzterAngriff2 += gameSpeed;
    }
    else {
      this.letzterAngriff += gameSpeed*(1-1/this.towerSlow);
      this.letzterAngriff2 += gameSpeed*(1-1/this.towerSlow);
    }
    var uebergabeEffektStaerke = this.effektStaerke.slice();    //berechne übergabewerte für effeckte falls ein angriff ausgeführt wird
    var uebergabeEffektTime = this.effektTime.slice();
    for (var i = 0; i < this.effekt.length; i++) {
      uebergabeEffektStaerke[i] *= (1+this.buffStaerken[2]/100);
      uebergabeEffektTime[i] *= (1+this.buffStaerken[2]/100);
    }
    var target = -1;
    var targetAgro = false;
    var target2 = -1;
    var target2Agro = false;
    gegner.forEach((item, i) => {   //überprüfe jeden gegner
      if (item != undefined) {
        var entfernung = getEntfernung(item, this);    //entfernung zum gegner
        if (entfernung <= this.reichweite*(1+this.buffStaerken[3]/100)) {    //wenn in reichweite
          itemAgro = false;
          for (var j = 0; j < item.imunität.length; j++) {
            if (item.imunität[j] == 9) {
              itemAgro = true;
            }
          }
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
              if ((targetAgro && itemAgro) || (!targetAgro && !itemAgro)) {
                switch (this.targetPrio) {
                  case 0:
                    if (gegner[target].strecke < item.strecke) {   //update targets so dass der weiteste gegner immer target 1 ist und der zweit weiteste gegner target 2
                      target2 = target;
                      target = i;
                      target2Agro = targetAgro;
                      targetAgro = itemAgro;
                    }
                    else if (gegner[target2] == undefined || (gegner[target2].strecke < item.strecke && ((target2Agro && itemAgro) || (!target2Agro && !itemAgro))) || (itemAgro && !target2Agro)) {
                      target2 = i;
                    }
                    break;
                  case 1:
                    if (gegner[target].strecke > item.strecke) {   //update targets so dass der letzte gegner immer target 1 ist und der zweite von hinten  target 2
                      target2 = target;
                      target = i;
                      target2Agro = targetAgro;
                      targetAgro = itemAgro;
                    }
                    else if (gegner[target2] == undefined || (gegner[target2].strecke > item.strecke && ((target2Agro && itemAgro) || (!target2Agro && !itemAgro))) || (itemAgro && !target2Agro)) {
                      target2 = i;
                    }
                    break;
                  case 2:
                    if (gegner[target].leben < item.leben) {   //update targets so dass der gegner mit den meisten leben immer target 1 ist und der zweite target 2
                      target2 = target;
                      target = i;
                      target2Agro = targetAgro;
                      targetAgro = itemAgro;
                    }
                    else if (gegner[target2] == undefined || (gegner[target2].leben < item.leben && ((target2Agro && itemAgro) || (!target2Agro && !itemAgro))) || (itemAgro && !target2Agro)) {
                      target2 = i;
                    }
                    break;
                  case 3:
                    if (gegner[target].leben > item.leben) {   //update targets so dass der gegner mit den wenigsten leben immer target 1 ist und der zweite target 2
                      target2 = target;
                      target = i;
                      target2Agro = targetAgro;
                      targetAgro = itemAgro;
                    }
                    else if (gegner[target2] == undefined || (gegner[target2].leben > item.leben && ((target2Agro && itemAgro) || (!target2Agro && !itemAgro))) || (itemAgro && !target2Agro)) {
                      target2 = i;
                    }
                    break;
                  case 4:
                    if (gegner[target].baseSpeed < item.baseSpeed) {   //update targets so dass der schnellste immer target 1 ist und der zweite target 2
                      target2 = target;
                      target = i;
                      target2Agro = targetAgro;
                      targetAgro = itemAgro;
                    }
                    else if (gegner[target2] == undefined || (gegner[target2].baseSpeed < item.baseSpeed && ((target2Agro && itemAgro) || (!target2Agro && !itemAgro))) || (itemAgro && !target2Agro)) {
                      target2 = i;
                    }
                    break;
                  case 5:
                    if (gegner[target].baseSpeed > item.baseSpeed) {   //update targets so dass der langsamste gegner immer target 1 ist und der zweite target 2
                      target2 = target;
                      target = i;
                      target2Agro = targetAgro;
                      targetAgro = itemAgro;
                    }
                    else if (gegner[target2] == undefined || (gegner[target2].baseSpeed > item.baseSpeed && ((target2Agro && itemAgro) || (!target2Agro && !itemAgro))) || (itemAgro && !target2Agro)) {
                      target2 = i;
                    }
                    break;
                }
              }
              else if (itemAgro && !targetAgro) {
                target2 = target;
                target = i;
                target2Agro = targetAgro;
                targetAgro = itemAgro;
              }
            }
          }
          else {
            if ((targetAgro && itemAgro) || (!targetAgro && !itemAgro)) {
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
            else if (itemAgro && !targetAgro) {
              target = i;
              targetAgro = itemAgro;
            }
          }
        }
      }
    });
    if (target > -1) {    // wenn ein target gewählt werden konnte
      if(this.typ == 5 && this.upgradeStufe == maxUpgrade && towertypen[this.typ][12]){
        if (gegner[this.target] != undefined) {
          var entfernung = getEntfernung(gegner[this.target], this);
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
          var target = parseInt(Math.random()*gegner.length);
          if (gegner[target] != undefined) {
            gegner[target].damage(this.schaden*(1+this.buffStaerken[2]/100)*10, [this.effekt[0]], [this.effektStaerke[0]*5*(1+this.buffStaerken[2]/100)], [500*(1+this.buffStaerken[2]/100)], this.id);
          }
        }
      }
    }
    this.towerStun -= gameSpeed;
    this.towerSlow = 1;
  };
}
