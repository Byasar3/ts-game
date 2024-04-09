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
const inputUserChoices = () => {
  const currentImage = characterImages[currentIndex] as HTMLImageElement;
  player1.img = currentImage.src;
  console.log(player1.img);

  // creating a html element to store img on
  const characterImg = document.createElement("img");
  // adding class name to element
  characterImg.classList.add("character__info__img");
  // using this info to update user's img on game screen
  characterImg.src = player1.img;
  characterImg.alt = "Character image";
  // adding this element to the div 
  characterInfoDiv.appendChild(characterImg);
};

const handleInput = (event: Event) => {
  const target = (event.target as HTMLInputElement).value;
  player1.name = target;
  // creating a html element to store name on
  const characterName = document.createElement("h1");
  // adding class name to element
  characterName.classList.add("character__info__name");
  // using this info to update user's name on game screen
  characterName.textContent = player1.name;
  // adding this element to the div
  characterInfoDiv.appendChild(characterName);
};

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

// ---------------- FUNCTIONS ----------------- //

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

// ---------------- EVENT LISTENERS ---------- //

// FOR LOADING SCREEN
loadingScreenEnterBtn?.addEventListener("click", () => {
  // hide loading screen
  loadingScreen?.classList.add("hide");
  // show selection screen
  selectionScreen?.classList.add("show");
});

// FOR SELECTION SCREEN
selectionScreenBtn?.addEventListener("click", () => {
  // hide selection screen
  selectionScreen?.classList.remove("show");
  // show game screen
  gameScreen?.classList.add("show");
});

nameInputBox?.addEventListener("input", handleInput);

submitChoicesButton?.addEventListener("click", inputUserChoices);

leftArrow?.addEventListener("click", handleLeftArrowClick);

rightArrow?.addEventListener("click", handleRightArrowClick);

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
