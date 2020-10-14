var mapbig = document.getElementById("mapbig");

function printMaps() {
  var template = `<div class=map>
    <div class=outer-frame>
      <div class=inner-frame>
        <img src="">
      </div>
      <p>Map1</p>
    </div>
  </div>`;

  if (mapsloaded) {
    clearInterval(inter);
    setTimeout(function () {
      var inn = document.getElementById("start");
      inn.innerHTML = `<button onclick="EBI('schwierigkeiten').style.display= 'none';EBI('main').setAttribute('class','contain visible');EBI('start').setAttribute('class','contain invisible')" style="position:absolute; font-size:2em; padding:0px; z-index: 999999999;">&#8592;</button>`
      ////console.log(maplist);
      maplist.forEach((element) => {
        // if(!element[3]){
        //   element[3] = "Bilder/Icons/sorry.png";
        // }
        inn.innerHTML += `<div class=map onclick="showselectedindex(${element[2]});" style='border: 5px groove beige'>
                            <div class=outer-frame>
                            <div class=inner-frame>
                                <img src="${element[3]}" onerror='this.src = "Bilder/Map/empty.png";this.setAttribute("class","error");'>
                            </div>
                            <p>Map${element[2]}, StartGeld: ${element[1]}</p>
                            </div>
                        </div>`;
      });
    }, 1);

  }
}
var inter = setInterval(printMaps, 100);

function showselectedindex(i, d = false) {
  if (!d){
    document.getElementById('schwierigkeiten').style.display = 'block';
  }
  var completedMaps = loadCompletedMaps(false);
  for (var j = 0; j <= 5; j++) {
    if (completedMaps[i-1] >= j) {
      document.getElementById(`complete${j}Normal`).hidden = false;
    }
    else {
      document.getElementById(`complete${j}Normal`).hidden = true;
    }
  }
  var completedMaps = loadCompletedMaps(true);
  for (var j = 0; j <= 5; j++) {
    if (completedMaps[i-1] >= j) {
      document.getElementById(`complete${j}Flawless`).hidden = false;
    }
    else {
      document.getElementById(`complete${j}Flawless`).hidden = true;
    }
  }
  switchdifficulty(0);
  var arr = maplist[i - 1];
  var bild = arr[3];
  var schwierigkeitIcon = 'Bilder/Icons/sandBurg.png';
  var innertext = "undefiniert";
  if (arr[4] != "undefined"){
    var schwierigkeitn = arr[4];
  }
  else{
    schwierigkeit = 0;
  }
  switch (schwierigkeitn) {
    case 0:
      schwierigkeitIcon = "Bilder/Icons/einfach.png";
      innertext = "sehr-leicht"
      break;
    case 1:
      schwierigkeitIcon = "Bilder/Icons/einfach.png";
      innertext = "einfach"
      break;
    case 2:
      schwierigkeitIcon = "Bilder/Icons/mittel.png";
      innertext = "mittel";
      break;
    case 3:
      schwierigkeitIcon = "Bilder/Icons/schwer.png";
      innertext = "schwer"
      break;

    case 4:
      schwierigkeitIcon = "Bilder/Icons/schwer.png";
      innertext = "sehr-schwer"
      break;
  }
  EBI("mapbig").removeAttribute("height");
  EBI("mapbig").src = bild;
  EBI("dGeld").innerHTML = arr[1];
  EBI("DS").innerHTML = innertext;
  EBI("DSIco").src = schwierigkeitIcon;
  EBI("MSO").innerHTML = arr[0].length + " x " + arr[0][0].length;
  EBI("Mapname").innerHTML = arr[5] != "undefined" ? arr[5] : "Map " + i;
  EBI("Mapname").setAttribute("value",arr[5] != "undefined" ? arr[5] : "Map " + i);
  EBI("Start").setAttribute("onclick", "startTheGame(" + i + ");")

}

function switchdifficulty(diffi) {
  document.querySelectorAll("#schwierigkeit .menubutton").forEach(element => {
    element.setAttribute("class", "menubutton");
  })
  switch (diffi) {
    case 0:
      schwierigkeit = 0;
      document.getElementById("Sandbox").setAttribute("class", "menubutton selected");
      break;
    case 1:
      schwierigkeit = 1;
      document.getElementById("Leicht").setAttribute("class", "menubutton selected");
      break;
    case 2:
      schwierigkeit = 2;
      document.getElementById("Mittel").setAttribute("class", "menubutton selected");
      break;
    case 3:
      schwierigkeit = 3;
      document.getElementById("Schwer").setAttribute("class", "menubutton selected");
      break;
    case 4:
      schwierigkeit = 4;
      document.getElementById("Extreme").setAttribute("class", "menubutton selected");
      break;
    case 5:
      schwierigkeit = 5;
      document.getElementById("Unmöglich").setAttribute("class", "menubutton selected");
      break;
  }
}
setTimeout(() => {
  showselectedindex(1, true);
}, 1000);

function EBI(e){
    return document.getElementById(e);
}

function startTheGame(id){
    ////console.log(id);
    mapId = id;
    EBI("menu").style.display ="none";
    loadmap('map'+ id +'.js');
    EBI('closebutton').style.display = "block";
    gotostart();
}

function laden() {
  saveCode = localStorage.getItem("saveCode");
  if (saveCode != undefined && saveCode.length >= 11) {
    var towerNum = 0;
    var towerDataLength = 22;
    while (saveCode.length > towerNum*towerDataLength + 11) {
      if (getPrüf2(towerNum*towerDataLength + 29) != getContent(towerNum*towerDataLength + 30)) {
        console.log("falsche prüfziffer 2 an stelle " + (towerNum*towerDataLength + 30));
        console.log("prüfziffer = " + getContent(towerNum*towerDataLength + 30) + ", erwartete prüfziffer = " + getPrüf2(towerNum*towerDataLength + 29));
        // return;
      }
      towerNum++;
    }
    if (getPrüf1(saveCode.length-3) != getContent(saveCode.length-2)) {
      console.log("falsche prüfziffer 1 an stelle " + (saveCode.length-2));
      console.log("prüfziffer = " + getContent(saveCode.length-2) + ", erwartete prüfziffer = " + getPrüf1(saveCode.length-3));
      // return;
    }
    if (getPrüf3(saveCode.length-2) != getContent(saveCode.length-1)) {
      console.log("falsche prüfziffer 3 an stelle " + (saveCode.length-1));
      console.log("prüfziffer = " + getContent(saveCode.length-1) + ", erwartete prüfziffer = " + getPrüf3(saveCode.length-2));
      // return;
    }
    EBI("menu").style.display = "none";
    if (typeof(tuerme) != "undefined") {
      tuerme.forEach((item, i) => {
        if (item != undefined) {
          item.canvasBase.remove();
          item.canvasGeschütz.remove();
        }
      });
    }
    tuerme = [];
    schwierigkeit = getContent(1);
    startTheGame(getContent(0));
    setTimeout(funcAfterMapLoad, 5);
    function funcAfterMapLoad() {
      if (scriptLoaded < 3) {
        setTimeout(funcAfterMapLoad, 5);
        return;
      }
      schwierigkeit = getContent(1);
      spielerLeben = getContent(2,2);
      document.getElementById("Leben").innerHTML = spielerLeben;    //update lebensanzeige
      geld = getContent(4,3);
      document.getElementById("Geld").innerHTML = geld;   //update geldanzeige
      wellenNummer = getContent(7,2);
      document.getElementById("Welle").innerHTML = wellenNummer + "/" + anzahlWellen;   //update wellenanzeige
      teilWellenNummer = 0;
      for (var i = 1; i < wellenNummer; i++) {
        do {
          teilWellenNummer++;
        } while (gegnerWellen[teilWellenNummer][4] != -1);
      }
      towerNum = 0;
      while (saveCode.length > towerNum*towerDataLength + 11) {
        if (saveCode.length < towerNum*towerDataLength + 32) {
          console.log("fehlerhafte saveCode length");
          return;
        }
        spezialisierung = getContent(towerNum*towerDataLength + 9);
        if (spezialisierung == 92) {
          tuerme[towerNum] = undefined;
          towerNum++
          continue;
        }
        if (spezialisierung == 93) {
          spezialisierung = undefined;
        }
        tuerme[towerNum] = new Turm(getContent(towerNum*towerDataLength + 12), getContent(towerNum*towerDataLength + 13), getContent(towerNum*towerDataLength + 10), towerNum, spezialisierung);
        tuerme[towerNum].targetPrio = getContent(towerNum*towerDataLength + 20);
        tuerme[towerNum].dmgDealed = getContent(towerNum*towerDataLength + 21, 6)/100;
        tuerme[towerNum].effecktStacks = getContent(towerNum*towerDataLength + 27, 3);
        for (var i = 0; i < getContent(towerNum*towerDataLength + 11); i++) {
          tuerme[towerNum].upgrade(true);
        }
        if (tuerme[towerNum].drehGeschw != 0) {
          tuerme[towerNum].richtung = getContent(towerNum*towerDataLength + 14, 3);
          tuerme[towerNum].richtung2 = getContent(towerNum*towerDataLength + 17, 3);
          ladeBild(towertypen[tuerme[towerNum].typ][1], tuerme[towerNum].canvasGeschütz, -tuerme[towerNum].richtung, true);
        }
        towerNum++
      }
    }
    function getContent(num, count = 1) {
      var wert = 0;
      for (var i = 0; i < count; i++) {
        wert += (saveCode.charCodeAt(num+i)-33)*Math.pow(94, count-i-1);
      }
      return wert;
    }
    function getPrüf1(pos) {
      if (pos == -1) {
        return 0;
      }
      else {
        return (getPrüf1(pos-1) + getContent(pos) + 1) % 93;
      }
    }
    function getPrüf2(pos) {
      if (pos == -1) {
        return 0;
      }
      else {
        return (getPrüf2(pos-1) + getPrüf1(pos-1)*getContent(pos)) % 93;
      }
    }
    function getPrüf3(pos) {
      if (pos == -1) {
        return 1;
      }
      else {
        return (getPrüf3(pos-1) * (getContent(pos) + 1)) % 93;
      }
    }
  }
}
function gotostart(){
  //EBI("menu").style.display ="none";
  EBI("schwierigkeiten").style.display ="none";
  showWindow("main");
}

function showWindow(id){
  ///**  Liste aller id's zum laden:
  //*    main
  //*    start
  //*    schwierigkeiten
  //                            **///
  let all = document.querySelectorAll("#menu #innermenu > div");
  all.forEach((ob) => {
    ob.setAttribute('class','contain invisible');
  })
  EBI(id).setAttribute('class','contain visible');
}
