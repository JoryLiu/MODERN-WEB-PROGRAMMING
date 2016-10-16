var begin = 0;
var score = 0;
var lastTime = 30;
var clockID;

function goal(enent) {
	if (begin == 1) {
		var target = enent.target;
		if (target.className == "changed") {
			score++;
			restore();
			moleAppear();
		} else {
			score--;
		}
	document.getElementById("score").value = score;
	}
}

function moleAppear() {
	if (begin == 1) {
		var mole = Math.round(Math.random() * 59);
		var holes = document.getElementsByClassName("hole");
		holes[mole].className = 'changed';
	}
}

function restore() {
	var changes = document.getElementsByClassName("changed");
	if (changes.length > 0) changes[0].className = 'hole';
}

function addEventListeners() {
	var holes = document.getElementsByClassName("hole");
	for (var i = 0; i < 60; i++)
		holes[i].addEventListener('click', goal);
	document.getElementById("switch").addEventListener('click', game);
}

function gameOver() {
	alert("Game Over, you have got "+score);
	lastTime = 30;
	score = 0;
	begin = 0;
	restore();
	clearTimeout(clockID);
	document.getElementById("screen").value = "Game Over";
}

function countDown() {
	if (lastTime == 0) {
		gameOver();
		return;
	}
	lastTime--;
	document.getElementById("clock").value = lastTime;
}

function game() {
	if (begin == 0) {
		begin = 1;
		lastTime = 30;
		document.getElementById("score").value = score;
		document.getElementById("clock").value = lastTime;
		document.getElementById("screen").value = "Playing";
		clockID = window.setInterval(countDown, 1000);
		moleAppear();
	} else if (begin == 1) {
		begin = -1;
		document.getElementById("screen").value = "Pausing";
		clearInterval(clockID);
	} else if (begin == -1) {
		begin = 1;
		document.getElementById("screen").value = "Playing";
		clockID = window.setInterval(countDown, 1000);
	}
}

window.onload = function() {
	addEventListeners();
}