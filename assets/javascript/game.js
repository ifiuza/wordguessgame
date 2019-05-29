let wins = 0;
let losses = 0;

let maxErrors = 9;

let wordDisplayLettersElement = document.getElementById("word-display-letters");
let guessedLettersElement = document.getElementById("guessed-letters");
let errorCountElement = document.getElementById("error-count");
let winCountElement = document.getElementById("win-count");
let lossCountElement = document.getElementById("loss-count");

let blinkElements = document.getElementsByClassName("blinking");
let alertLineElements = document.getElementsByClassName("alert-line");

let validGuesses = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ];

let pressAnyKeyToStart = ["Press Any Letter Key To Start Playing !"];
let pressAnyKeyToReset = ["Press Any Key To Restart:"];

let youWin = ["You Win!"];
let youLose = ["You Lose"];
let emptyAlert = ["                       "];

let game = new Hangman();

document.onkeyup = function(event) {
	let userGuess = event.key;

	if (!game.gameOver) {
		if (validGuesses.includes(userGuess) && !game.guessedLetters.includes(userGuess)) {
			game.checkGuess(userGuess);
		}
	} else {
		game = new Hangman();
		game.updatePageData();
	}
}

window.setInterval(function() {
	if (blinkElements.length > 0) {
		if (game.guessedLetters.length === 0 || game.gameOver) {
			if (blinkElements[0].style.opacity === "1") {
				for (let i = 0; i < blinkElements.length; i++) {
					blinkElements[i].style.opacity = "0";
				}
			} else {
				for (let i = 0; i < blinkElements.length; i++) {
					blinkElements[i].style.opacity = "1";
				}
			}
		} else {
			for (let i = 0; i < blinkElements.length; i++) {
				blinkElements[i].style.opacity = "0";
			}
		}
	}
}, 750);

function Hangman() {
	this.wordList = [
		"javascript",
		"coding",
		"backend",
		"frontend",
		"github",
		"hangman",
		"bootcamp",
		"bootstrap",
		"jquery",
		"utah",
		"index",
		"portfolio",
		"html",
		"spot",
		"class",
		"image",
		"announcement",
        "commit"
	]

	this.word = this.wordList[Math.floor(Math.random() * this.wordList.length)];
	this.guessedLetters = [];
	this.errors = 0;
	this.visibleLetters = [];
	this.gameOver = false;
	this.alertLines = emptyAlert;
	for (let i = 0; i < this.word.length; i++) {
		this.visibleLetters[i] = (false);
	}
}

Hangman.prototype.checkGuess = function(char) {
	this.guessedLetters.push(char);

	let isInWord = false;
	for (let i = 0; i < this.word.length; i++) {
		if (this.word.charAt(i) === char) {
			isInWord = true;
			this.visibleLetters[i] = true;
		}
	}
	if (!isInWord) {
		this.errors++;
	}

	if (this.errors >= maxErrors) {
		losses++;
		this.alertLines = youLose;
		this.gameOver = true;
	}

	if (!this.visibleLetters.includes(false)) {
		wins++;
		this.alertLines = youWin;
		this.gameOver = true;
	}

	game.updatePageData();
};

Hangman.prototype.updatePageData = function() {
	let tempString = "";
	for (let i = 0; i < this.visibleLetters.length; i++) {
		tempString += ((this.visibleLetters[i] || this.gameOver) ? this.word.charAt(i).toUpperCase() : "_");
		if (i < (this.visibleLetters.length - 1)) tempString += " ";
	}
	wordDisplayLettersElement.textContent = tempString;

	tempString = "";
	for (let i = 0; i < this.guessedLetters.length; i++) {
		tempString += (this.guessedLetters[i].toUpperCase());
		if (i < (this.guessedLetters.length - 1)) tempString += " ";
	}
	for (let i = tempString.length; i < 51; i++) {
		tempString += " ";
	}
	guessedLettersElement.textContent = tempString;

	tempString = this.errors + " / " + maxErrors;
	for (let i = tempString.length; i < 32; i++) {
		tempString += " ";
	}
	errorCountElement.textContent = tempString;

	tempString = wins + "";
	for (let i = tempString.length; i < 45; i++) {
		tempString += " ";
	}
	winCountElement.textContent = tempString;

	tempString = losses + "";
	for (let i = tempString.length; i < 43; i++) {
		tempString += " ";
	}
	lossCountElement.textContent = tempString;

	for (let i = 0; i < blinkElements.length; i++) {
		blinkElements[i].textContent = (this.gameOver ? pressAnyKeyToReset[i] : pressAnyKeyToStart[i]);
	}

	for (let i = 0; i < alertLineElements.length; i++) {
		alertLineElements[i].textContent = (this.alertLines[i]);
	}
}

game.updatePageData();	