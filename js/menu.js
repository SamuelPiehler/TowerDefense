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
    
        if(mapsloaded){
            clearInterval(inter);
            setTimeout(function(){
            var inn = document.getElementById("start");
            inn.innerHTML = `<button onclick="EBI('main').setAttribute('class','contain visible');EBI('start').setAttribute('class','contain invisible')" style="position:absolute; font-size:2em; padding:0px; z-index: 999999999;">&#8592;</button>`
            ////console.log(maplist);
            maplist.forEach((element) => {
                inn.innerHTML += `<div class=map onclick="showselectedindex(${element[2]});">
                    <div class=outer-frame>
                    <div class=inner-frame>
                        <img src="${element[3]}">
                    </div>
                    <p>Map${element[2]}, StartGeld: ${element[1]}</p>
                    </div>
                </div>`;
            });
            setTimeout(fixBrokenImages,100);},1);
        
        }
}
var inter = setInterval(printMaps, 100);
fixBrokenImages = function( url ){
    var img = document.querySelectorAll(".inner-frame img");
    var i=0, l=img.length;
    for(;i<l;i++){
        var t = img[i];
        if(t.naturalWidth === 0){
            //this image is broken
            t.src = "/Bilder/Map/empty.png";
            t.setAttribute("class","error");
        }
    }
    mapbig.src = document.querySelector(".inner-frame img").getAttribute("src");

}
function showselectedindex(i, d =false){
    if(!d)
    document.getElementById('schwierigkeiten').style.display = 'block';
    switchdifficulty(0);
    var arr = maplist[i-1];
    var bild = arr[3];
    var schwierigkeitIcon = 'Bilder/Icons/sandBurg.png';
    var innertext = "undefiniert";
    if(arr[4]!= "undefined")
    var schwierigkeitn = arr[4];
    else
    schwierigkeit = 0;
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
      EBI("Start").setAttribute("onclick","startTheGame(" + i + ");")

}
function switchdifficulty(diffi){
    document.querySelectorAll("#schwierigkeit .menubutton").forEach(element =>{
        element.setAttribute("class","menubutton");
    })
    switch(diffi){
        case 0: 
        schwierigkeit = 0;
        document.getElementById("Sandbox").setAttribute("class","menubutton selected");
        break;
        case 1: 
        schwierigkeit = 1;
        document.getElementById("Leicht").setAttribute("class","menubutton selected");
        break;
        case 2: 
        schwierigkeit = 2;
        document.getElementById("Mittel").setAttribute("class","menubutton selected");
        break;
        case 3: 
        schwierigkeit = 3;
        document.getElementById("Schwer").setAttribute("class","menubutton selected");
        break;
    }
}
setTimeout(() => {
    showselectedindex(1,true);
}, 1000);
function EBI(e){
    return document.getElementById(e);
}
function startTheGame(id){
    ////console.log(id);
    EBI("menu").style.display ="none"
    loadmap('map'+ id +'.js');
}