var variable = ( function variableManager() {
	var blankPosition = 3;
	var pictures = [0, 1, 2, -1, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
	var gameSwitch = 0;
	var time = 0, clock;
	return {
		getblankPosition: function () {
			return blankPosition;
		},
		setblankPosition: function ( newblankPosition ) {
			blankPosition = newblankPosition;
		},
		getPicturePosition: function ( index ) {
			return pictures[index];
		},
		getPictureIndex: function ( position ) {
			for (var i = 0; i < 16; i++)
				if (pictures[i] == position)
					return i;
		},
		setPicturePosition: function ( index, position ) {
			pictures[index] = position;
		},
		switchOn: function () {
			gameSwitch = 1;
		},
		switchOff: function () {
			gameSwitch = 0;
		},
		getSwitch: function () {
			return gameSwitch;
		},
		timeReset: function () {
			time = 0;
		},
		timeCount: function() {
			document.getElementById("clock").value = time;
			time++;
		},
		getTime: function () {
			return time;
		},
		setClock: function( t ) {
			clock = t;
		},
		getClock: function () {
			return clock;
		}
	};
} () );

function isFinished() {
	for (var i = 0; i < 16; i++)
		if (i != 3 && variable.getPicturePosition(i) != i)
			return;
	variable.switchOff();
	clearTimeout(variable.getClock());
	document.getElementById("screen").textContent = "Owesome!";
}

function move(event) {
	if (event.target.id == "blank" || variable.getSwitch() === 0) return;
	var target = event.target;
	var currentPosition, i, j;
	var blank = document.getElementById("blank");
	var flag;
	flag = 0;
	for (i = 0; i < 4; i++) {
		for (j = 0; j < 4; j++)
			if (target.id == "picture" + (i * 4 + j)) {
				currentPosition = variable.getPicturePosition(i * 4 + j);
				flag = 1;
				break;
			}
		if (flag == 1) break;
	}
	if (currentPosition > 3 && currentPosition - 4 == variable.getblankPosition()) {
		blank.className = "blank row" + Math.floor(currentPosition / 4) + " column" + (currentPosition % 4);
		variable.setPicturePosition(i * 4 + j, currentPosition - 4);
		target.className = "picture row" + (Math.floor(currentPosition / 4) - 1) + " column" + (currentPosition % 4);
		variable.setblankPosition(currentPosition);
	} else if (currentPosition < 12 && currentPosition + 4 == variable.getblankPosition()) {
		blank.className = "blank row" + Math.floor(currentPosition / 4) + " column" + (currentPosition % 4);
		variable.setPicturePosition(i * 4 + j, currentPosition + 4);
		target.className = "picture row" + (Math.floor(currentPosition / 4) + 1) + " column" + (currentPosition % 4);
		variable.setblankPosition(currentPosition);
	} else if (currentPosition % 4 !== 0 && currentPosition - 1 == variable.getblankPosition()) {
		blank.className = "blank row" + Math.floor(currentPosition / 4) + " column" + (currentPosition % 4);
		variable.setPicturePosition(i * 4 + j, currentPosition - 1);
		target.className = "picture row" + Math.floor(currentPosition / 4) + " column" + (currentPosition % 4 - 1);
		variable.setblankPosition(currentPosition);
	} else if (currentPosition % 4 != 3 && currentPosition + 1 == variable.getblankPosition()) {
		blank.className = "blank row" + Math.floor(currentPosition / 4) + " column" + (currentPosition % 4);
		variable.setPicturePosition(i * 4 + j, currentPosition + 1);
		target.className = "picture row" + Math.floor(currentPosition / 4) + " column" + (currentPosition % 4 + 1);
		variable.setblankPosition(currentPosition);
	}
	isFinished();
}

function initialize() {
	var album = document.createDocumentFragment();
	var i, j;
	var picture, blank;
	blank = document.createElement("div");
	blank.className = "blank row0 column3";
	blank.id = "blank";
	blank.addEventListener('click', move);
	for (i = 0; i < 4; i++)
		for (j = 0; j < 4; j++)
			if (!(i === 0 && j == 3)) {
				picture = document.createElement("div");
				picture.className = "picture row" + i + " column" + j;
				picture.id = "picture" + (4 * i + j);
				picture.addEventListener('click', move);
				album.appendChild(picture);
			} else {
				album.appendChild(blank);
			}
	document.getElementById("main").appendChild(album);
}

function restart() {
	// document.getElementById("screen").textContent = "Owesome!";
	variable.switchOn();
	var operation, loopTimes, blankPos, picturePos, picture;
	clearTimeout(variable.getClock());
	variable.timeReset();
	variable.setClock(window.setInterval(variable.timeCount, 1000));
	for (loopTimes = 0; loopTimes < 1000; loopTimes++) {
		operation = Math.floor(Math.random() * 4) + 1;
		blankPos = variable.getblankPosition();
		if (operation == 1 && blankPos > 3) {
			variable.setblankPosition(blankPos - 3);
			picturePos = variable.getPictureIndex(blankPos - 3);
			variable.setPicturePosition(picturePos, blankPos);
		} else if (operation == 2 && blankPos < 12) {
			variable.setblankPosition(blankPos + 3);
			picturePos = variable.getPictureIndex(blankPos + 3);
			variable.setPicturePosition(picturePos, blankPos);
		} else if (operation == 3 && blankPos % 4 !== 0) {
			variable.setblankPosition(blankPos - 1);
			picturePos = variable.getPictureIndex(blankPos - 1);
			variable.setPicturePosition(picturePos, blankPos);
		} else if (operation == 4 && blankPos % 4 != 3) {
			variable.setblankPosition(blankPos + 1);
			picturePos = variable.getPictureIndex(blankPos + 1);
			variable.setPicturePosition(picturePos, blankPos);
		}
	}
	for (var i = 0; i < 16; i++) {
		if (i != 3) {
			picturePos = variable.getPicturePosition(i);
			picture = document.getElementById("picture" + i);
			picture.className = "picture row" + Math.floor(picturePos / 4) + " column" + (picturePos % 4);
		}
	}
	blankPos = variable.getblankPosition();
	document.getElementById("blank").className = "blank row" + Math.floor(blankPos / 4) + " column" + (blankPos % 4);
}

window.onload = function() {
	initialize();
	document.getElementById("restart").onclick = restart;
};