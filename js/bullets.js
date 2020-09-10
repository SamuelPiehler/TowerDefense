var bullets = [];
var stopParty = false;

function bullet(x1, y1, x2, y2, time = 100, color = "black", l_width = 3){
    x1 += size/2+10;
    y1 += size/2+50;
    x2 += size/2+10;
    y2 += size/2+50;
    var caught = false
    bullets.forEach((el,id)=>{
        if(el[1] == true && !caught){
            caught = true;
            el[1] = false;
            var line = el[0].children[0];
            line.setAttribute("x1", x1);
    line.setAttribute("x2", x2);
    line.setAttribute("y1", y1);
    line.setAttribute("y2", y2);
    line.setAttribute("stroke" , color);
    line.setAttribute("stroke-width",l_width);
    el[0].setAttribute("style",`position:absolute; top:${0}px; left:${0}px; width:${window.innerWidth}px; height:${window.innerHeight}px;`);
    setTimeout(function(bull,id){
        bull.style.display = "none";
        bullets[id][1] = true;
    }.bind(null,el[0],id), time);
}
    });
    if (!caught){
    var bull = document.createElementNS("http://www.w3.org/2000/svg","svg");
    bull.setAttribute("style",`position:absolute; top:${0}px; left:${0}px; width:${window.innerWidth}px; height:${window.innerHeight}px;`);
    bull.setAttribute("width",window.innerHeight);
    bull.setAttribute("height",window.innerWidth);
    var line = document.createElementNS("http://www.w3.org/2000/svg","line");
    line.setAttribute("x1", x1);
    line.setAttribute("x2", x2);
    line.setAttribute("y1", y1);
    line.setAttribute("y2", y2);
    line.setAttribute("stroke" , color);
    line.setAttribute("stroke-width",l_width);
    bull.appendChild(line);
    //var string = `<line x1=${0} x2=${0} y1=${y1} y2=${y2} stroke="black" stroke-width="10" xmlns="http://www.w3.org/2000/svg" style="background-color:black;"></line>`
    //bull.innerHTML = string;
    var id = bullets.length;
    document.getElementById("bullets").appendChild(bull);
    bullets.push([bull,false,id]);
    setTimeout(function(bull,id){
        bull.style.display = "none";
        bullets[id][1] = true;
    }.bind(null,bull,id), time);}
}
function party(){
    bullet(Math.random() * window.innerWidth,Math.random() * window.innerHeight,Math.random() * window.innerWidth,Math.random() * window.innerHeight,getRandomColor(),Math.random() * 1000)
    if(!stopParty)
    setTimeout(party, 100);
    if(stopParty)
    stopParty = false;
}
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  function stop_Party(){
      stopParty = false;
  }
  function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY
    };
  }
