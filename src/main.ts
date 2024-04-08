import { player1 } from "./character";

// entry point of application. 
// import and initialise game
// manage trasnsitions between difference screens


// --------------- QUERY SELECTORS ---------- //

// FOR LOADING SCREEN:

const loadingScreen = document.querySelector(".loading-screen");
const selectionScreen = document.querySelector(".selection-screen");
const gameScreen = document.querySelector(".game-screen");
const loadingScreenEnterBtn = document.querySelector(".loading-screen__button");
const selectionScreenBtn = document.querySelector(".selection-screen__button")

// FOR SELECTION SCREEN:

const nameInputBox = document.querySelector<HTMLInputElement>(".selection-screen__name-input-box");
const characterImages = document.querySelectorAll(".selection-screen__character-selection__character-img");
const leftArrow = document.querySelector<HTMLButtonElement>(".selection-screen__character-selection__left-arrow");
const rightArrow = document.querySelector<HTMLButtonElement>(".selection-screen__character-selection__right-arrow");
const submitChoicesButton = document.querySelector<HTMLButtonElement>(".selection-screen__button");

// FOR GAME SCREEN:


// ---------------- EVENT HANDLERS ----------- //


// FOR SELECTION SCREEN
const inputUserChoices = (event : Event) => {
	console.log(event);
}

const handleInput = (event : Event) => {
	const target = (event.target as HTMLInputElement).value
	player1.name = target;
}

let currentIndex = 0
const handleLeftArrowClick = () => {
	currentIndex = (currentIndex - 1 + characterImages.length) % characterImages.length
	showCurrentImage()
}

const handleRightArrowClick = () => {
	currentIndex = (currentIndex + 1) % characterImages.length
	showCurrentImage()
}

// ---------------- FUNCTIONS ----------------- // 

const showCurrentImage = () => {
	characterImages.forEach((image, index) => {
		if (index === currentIndex) {
			(image as HTMLImageElement).src =`./assets/fighter${currentIndex + 1}.png`
		} else {
			(image as HTMLImageElement).src =``;
		}
	})
}
// want it load with only
showCurrentImage()
// ---------------- EVENT LISTENERS ---------- // 

// FOR LOADING SCREEN
loadingScreenEnterBtn?.addEventListener("click", () => {
	// hide loading screen
	loadingScreen?.classList.add("hide");
	// show selection screen
	selectionScreen?.classList.add("show");
})


// FOR SELECTION SCREEN
selectionScreenBtn?.addEventListener("click", () => {
	// hide selection screen
	selectionScreen?.classList.remove("show")
	// show game screen
	gameScreen?.classList.add("show")
})

nameInputBox?.addEventListener("input", handleInput)

submitChoicesButton?.addEventListener("click", inputUserChoices)

leftArrow?.addEventListener("click", handleLeftArrowClick)

rightArrow?.addEventListener("click", handleRightArrowClick)





////////////////// NOTES

// ----------------- SELECTION SCREEN -----------------------


// will handle input logic for selection screen
// like user inputting name and selection of character


// --------------------- GAME SCREEN -----------------

// will contain main game logic:
// player actions, enemy behaviour, scoring and other game play mechanics


// --------------------- END GAME SCREEN/S -----------------

// will contain logic to handle what happens if game is won, and how game is won
// will handle logic on how game is lost, and what to do when game is lost




