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
const selectionScreenBtn = document.querySelector(".selection-screen__button");

// FOR SELECTION SCREEN:

const nameInputBox = document.querySelector<HTMLInputElement>(
  ".selection-screen__name-input-box"
);
const characterImages = document.querySelectorAll(
  ".selection-screen__character-selection__character-img"
);
const leftArrow = document.querySelector<HTMLButtonElement>(
  ".selection-screen__character-selection__left-arrow"
);
const rightArrow = document.querySelector<HTMLButtonElement>(
  ".selection-screen__character-selection__right-arrow"
);
const submitChoicesButton = document.querySelector<HTMLButtonElement>(
  ".selection-screen__button"
);

// FOR GAME SCREEN:

const characterInfoDiv = document.querySelector(".character__info");

// ---------------- GUARD CLAUSES ------------ //
if (
  !loadingScreen ||
  !selectionScreen ||
  !gameScreen ||
  !loadingScreenEnterBtn ||
  !selectionScreenBtn ||
  !nameInputBox ||
  !characterImages ||
  !leftArrow ||
  !rightArrow ||
  !submitChoicesButton ||
  !characterInfoDiv
) {
  throw new Error("Issue with selectors");
}

// ---------------- EVENT HANDLERS ----------- //

// FOR SELECTION SCREEN
let currentIndex = 0;
const handleLeftArrowClick = () => {
  currentIndex =
    (currentIndex - 1 + characterImages.length) % characterImages.length;
  showCurrentImage();
};

const handleRightArrowClick = () => {
  currentIndex = (currentIndex + 1) % characterImages.length;
  showCurrentImage();
};

const handleUserInputs = () => {
  const currentImage = characterImages[currentIndex] as HTMLImageElement;
  player1.img = currentImage.src;
  // creating a html element to store img on
  const characterImg = document.createElement("img");
  // adding class name to element
  characterImg.classList.add("character__info__img");
  // using this info to update user's img on game screen
  characterImg.src = player1.img;
  characterImg.alt = "Character image";
  // adding this element to the div
  characterInfoDiv.appendChild(characterImg);

  // creating a html element to store name on
  const characterName = document.createElement("h1");
  // adding class name to element
  characterName.classList.add("character__info__name");
  // using this info to update user's name on game screen
  characterName.textContent = player1.name;
  // adding this element to the div
  characterInfoDiv.appendChild(characterName);
};

const handleNameInput = (event: Event) => {
  const target = (event.target as HTMLInputElement).value;
  player1.name = target;
};


// ---------------- FUNCTIONS ----------------- //
// setting name and creating html element

// clicking through images
const showCurrentImage = () => {
  characterImages.forEach((image, index) => {
    if (index === currentIndex) {
      (image as HTMLImageElement).style.display = "block";
    } else {
      (image as HTMLImageElement).style.display = "none";
    }
  });
};
// want it load with only one image
showCurrentImage();

// screen transitions
const loadSelectionScreen = () => {
  // hide loading screen and game screen
  loadingScreen.classList.remove("show");
  loadingScreen.classList.add("hide");

  // show selection screen
  selectionScreen.classList.remove("hide");
  selectionScreen.classList.add("show");
};

const loadGameScreen = () => {
  // hide selection screen
  selectionScreen.classList.remove("show");
  selectionScreen.classList.add("hide");

  // show game screen
  gameScreen.classList.remove("hide");
  gameScreen.classList.add("show");
};
// ---------------- EVENT LISTENERS ---------- //

// FOR LOADING SCREEN
loadingScreenEnterBtn.addEventListener("click", loadSelectionScreen);

// FOR SELECTION SCREEN
selectionScreenBtn.addEventListener("click", loadGameScreen);

nameInputBox.addEventListener("change", handleNameInput);

submitChoicesButton.addEventListener("click", handleUserInputs);

leftArrow.addEventListener("click", handleLeftArrowClick);

rightArrow.addEventListener("click", handleRightArrowClick);

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
