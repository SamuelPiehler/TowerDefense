var geld = 75;
var map = [
	[[1, 'Bilder/Map/weg1.jpg'], [1, 'Bilder/Map/weg1.jpg'], [1, 'Bilder/Map/weg1.jpg'], [1, 'Bilder/Map/weg1.jpg'], [1, 'Bilder/Map/weg1.jpg'], [1, 'Bilder/Map/weg1.jpg'], [1, 'Bilder/Map/weg1.jpg'], [1, 'Bilder/Map/weg1.jpg'], [1, 'Bilder/Map/weg1.jpg'], [1, 'Bilder/Map/weg1.jpg'], [1, 'Bilder/Map/weg1.jpg'], [1, 'Bilder/Map/weg1.jpg'], [1, 'Bilder/Map/weg1.jpg'], [1, 'Bilder/Map/weg1.jpg'], [1, 'Bilder/Map/weg1.jpg'], [2, 'Bilder/Map/weg1.jpg'],],
		[[4, 'Bilder/Map/weg1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [2, 'Bilder/Map/weg1.jpg'],],
		[[4, 'Bilder/Map/weg1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [2, 'Bilder/Map/weg1.jpg'], [3, 'Bilder/Map/weg1.jpg'], [3, 'Bilder/Map/weg1.jpg'], [3, 'Bilder/Map/weg1.jpg'], [3, 'Bilder/Map/weg1.jpg'], [3, 'Bilder/Map/weg1.jpg'], [3, 'Bilder/Map/weg1.jpg'], [3, 'Bilder/Map/weg1.jpg'], [3, 'Bilder/Map/weg1.jpg'], [3, 'Bilder/Map/weg1.jpg'], [3, 'Bilder/Map/weg1.jpg'], [3, 'Bilder/Map/weg1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [2, 'Bilder/Map/weg1.jpg'],],
		[[4, 'Bilder/Map/weg1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [2, 'Bilder/Map/weg1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [4, 'Bilder/Map/weg1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [2, 'Bilder/Map/weg1.jpg'],],
		[[4, 'Bilder/Map/weg1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [2, 'Bilder/Map/weg1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [1, 'Bilder/Map/weg1.jpg'], [1, 'Bilder/Map/weg1.jpg'], [1, 'Bilder/Map/weg1.jpg'], [1, 'Bilder/Map/weg1.jpg'], [1, 'Bilder/Map/weg1.jpg'], [1, 'Bilder/Map/weg1.jpg'], [1, 'Bilder/Map/weg1.jpg'], [2, 'Bilder/Map/weg1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [4, 'Bilder/Map/weg1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [2, 'Bilder/Map/weg1.jpg'],],
		[[4, 'Bilder/Map/weg1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [2, 'Bilder/Map/weg1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [4, 'Bilder/Map/weg1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [2, 'Bilder/Map/weg1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [4, 'Bilder/Map/weg1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [2, 'Bilder/Map/weg1.jpg'],],
		[[4, 'Bilder/Map/weg1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [2, 'Bilder/Map/weg1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [4, 'Bilder/Map/weg1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [2, 'Bilder/Map/weg1.jpg'], [3, 'Bilder/Map/weg1.jpg'], [3, 'Bilder/Map/weg1.jpg'], [3, 'Bilder/Map/weg1.jpg'], [3, 'Bilder/Map/weg1.jpg'], [3, 'Bilder/Map/weg1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [4, 'Bilder/Map/weg1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [2, 'Bilder/Map/weg1.jpg'],],
		[[4, 'Bilder/Map/weg1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [2, 'Bilder/Map/weg1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [4, 'Bilder/Map/weg1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [2, 'Bilder/Map/weg1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [4, 'Bilder/Map/weg1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [2, 'Bilder/Map/weg1.jpg'],],
		[[4, 'Bilder/Map/weg1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [2, 'Bilder/Map/weg1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [4, 'Bilder/Map/weg1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [1, 'Bilder/Map/weg1.jpg'], [1, 'Bilder/Map/weg1.jpg'], [1, 'Bilder/Map/weg1.jpg'], [1, 'Bilder/Map/weg1.jpg'], [1, 'Bilder/Map/weg1.jpg'], [1, 'Bilder/Map/weg1.jpg'], [1, 'Bilder/Map/weg1.jpg'], [4, 'Bilder/Map/weg1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [2, 'Bilder/Map/weg1.jpg'],],
		[[4, 'Bilder/Map/weg1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [2, 'Bilder/Map/weg1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [4, 'Bilder/Map/weg1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [0, 'Bilder/Map/feld1.jpg'], [2, 'Bilder/Map/weg1.jpg'],],
		[[8, ['Bilder/Map/weg1.jpg', 'Bilder/Map/start.png']], [0, 'Bilder/Map/feld1.jpg'], [9, ['Bilder/Map/weg1.jpg', 'Bilder/Map/ziel1.png']], [0, 'Bilder/Map/feld1.jpg'], [4, 'Bilder/Map/weg1.jpg'], [3, 'Bilder/Map/weg1.jpg'], [3, 'Bilder/Map/weg1.jpg'], [3, 'Bilder/Map/weg1.jpg'], [3, 'Bilder/Map/weg1.jpg'], [3, 'Bilder/Map/weg1.jpg'], [3, 'Bilder/Map/weg1.jpg'], [3, 'Bilder/Map/weg1.jpg'], [3, 'Bilder/Map/weg1.jpg'], [3, 'Bilder/Map/weg1.jpg'], [3, 'Bilder/Map/weg1.jpg'], [3, 'Bilder/Map/weg1.jpg'],],
	]
;
success = true; // not neccecary
var randomtiles = false

var multiStartTyp = "0";

// hier kommt das preview- Bild


var image = 'Bilder/MapVorschau/Map2.webp';
