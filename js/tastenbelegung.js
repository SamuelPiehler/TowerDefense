var standartTasten = {
  "multiBuild" : ["ShiftLeft", "ShiftRight"],
  "keepUpgradeOpen" : ["ShiftLeft", "ShiftRight"],
  "max" : ["ControlLeft", "ControlRight"],
  "close" : ["Escape", ""],
  "startPause" : ["Space", ""],
  "speedChange" : ["KeyS", ""],
  "select00" : ["Digit1", "Numpad1"],
  "select01" : ["Digit2", "Numpad2"],
  "select02" : ["Digit3", "Numpad3"],
  "select03" : ["Digit4", "Numpad4"],
  "select04" : ["Digit5", "Numpad5"],
  "select05" : ["Digit6", "Numpad6"],
  "select06" : ["Digit7", "Numpad7"],
  "select07" : ["Digit8", "Numpad8"],
  "select08" : ["Digit9", "Numpad9"],
  "select09" : ["Digit0", "Numpad0"],
  "select10" : ["Minus", "NumpadDecimal"],
  "select11" : ["Equal", ""],
};
var tastenbelegung;

function saveTastenBelegung() {
  localStorage.setItem('tastenbelegung', JSON.stringify(tastenbelegung));
}

function ladeTastenBelegung() {
  var save = localStorage.getItem('tastenbelegung');
  if (save = "undefined") {
    tastenbelegung = copyObj(standartTasten);
  }
  else {
    tastenbelegung = JSON.parse(save);
  }
}
ladeTastenBelegung();

function openTastenBelegung() {
  document.getElementById("settings").setAttribute('class','contain invisible');
  document.getElementById("tastenbelegung").setAttribute('class','contain visible');
}
