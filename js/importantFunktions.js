function copyObj(obj) {
	if (typeof (obj) == 'object' && !Array.isArray(obj)) {
		var newObj = {};
		for (var item in obj) {
			if (typeof (obj[item]) == "object") {
				newObj[item] = copyObj(obj[item]);
			}
			else {
				newObj[item] = obj[item];
			}
		}
	}
	else if (Array.isArray(obj)) {
		var newObj = [];
		obj.forEach((item, i) => {
			if (typeof (item) == "object") {
				newObj[i] = copyObj(item);
			}
			else {
				newObj[i] = item;
			}
		});
	}
	else {
		newObj = obj;
	}
	return newObj;
}

function round(num, stellen) {
	const e = 10 ** stellen;
	return Math.round(num * e) / e;
}

function addCompletedMap() {
	var gain = [0, 0]
	completedMaps = loadCompletedMaps(false);
	if (completedMaps[mapId - 1] < schwierigkeit) {
		gain[0] = skillPunkteBeiSchwierigkeit[schwierigkeit] - skillPunkteBeiSchwierigkeit[completedMaps[mapId - 1]];
		skillPunkte += gain[0];
		completedMaps[mapId - 1] = schwierigkeit;
		saveSkillTree()
	}
	localStorage.setItem('completedMaps', JSON.stringify(completedMaps));
	flawlessMaps = loadCompletedMaps(true);
	if (spielerLeben == 100 && flawlessMaps[mapId - 1] < schwierigkeit) {
		gain[1] = skillPunkteBeiSchwierigkeit[schwierigkeit] - skillPunkteBeiSchwierigkeit[flawlessMaps[mapId - 1]];
		skillPunkte += gain[1];
		flawlessMaps[mapId - 1] = schwierigkeit;
		saveSkillTree()
	}
	localStorage.setItem('flawlessMaps', JSON.stringify(flawlessMaps));
	return gain;
}

function loadCompletedMaps(flawless) {
	if (flawless) {
		var completedMapsString = localStorage.getItem('flawlessMaps');
	}
	else {
		var completedMapsString = localStorage.getItem('completedMaps');
	}
	if (completedMapsString != null) {
		var completedMaps = JSON.parse(completedMapsString);
		if (anzahlMaps < completedMaps.length) {
			console.log("fehlerhafter completedMapsString");
			return;
		}
	}
	else {
		completedMaps = [];
	}
	for (var i = completedMaps.length; i < anzahlMaps; i++) {
		completedMaps[i] = 0;
	}
	return completedMaps;
}
