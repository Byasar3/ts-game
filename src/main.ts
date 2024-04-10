import { player1 } from "./character";
import { levelOneEnemy, levelTwoEnemy, levelThreeEnemy, Enemy } from "./enemy";
import "../styles/style.scss";

// --------------- QUERY SELECTORS ---------- //

// FOR LOADING SCREEN:

const loadingScreen = document.querySelector(".loading-screen");
const selectionScreen = document.querySelector(".selection-screen");
const gameScreen = document.querySelector(".game-screen");
const loadingScreenEnterBtn = document.querySelector(".loading-screen__button");
const selectionScreenBtn = document.querySelector(".selection-screen__button");
const characterHealth = document.querySelector(".character__stats__hp");
const characterStamina = document.querySelector(
  ".character__stats__stamina"
);
const characterScore = document.querySelector(
  ".character__stats__score"
);

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
const enemyHealth = document.querySelector(".enemy__stats__hp");
const enemyImg = document.querySelector<HTMLImageElement>(".enemy__info__img");
const enemyName = document.querySelector(".enemy__info__name");
const characterAttack = document.querySelector(".character__actions__atk");
const characterRest = document.querySelector(".character__actions__rest");
const characterHeal = document.querySelector(".character__actions__heal");

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
  !characterInfoDiv ||
  !characterHealth ||
  !characterStamina ||
  !enemyHealth ||
  !enemyImg ||
  !enemyName ||
  !characterAttack ||
  !characterRest ||
  !characterHeal 
) {
  throw new Error("Issue with selectors");
}

// ---------------- VARIABLES ------------------//
let currentCharacterHealth = player1.hp;
characterHealth.innerHTML = `Health: ${currentCharacterHealth}`;

let currentCharacterStamina = player1.stamina;
characterStamina.innerHTML = `Stamina: ${currentCharacterStamina}`;

let currentCharacterScore = player1.score;
characterScore.innerHTML = `Score: ${currentCharacterScore}`;

//note: might be able to do this by just characterThing.innerhtml = ${player1.thing}

let currentEnemy: Enemy = levelOneEnemy;

let currentEnemyHealth = currentEnemy.hp;
enemyHealth.innerHTML = `Health: ${currentEnemyHealth}`;

let currentEnemyName = currentEnemy.name;
enemyName.innerHTML = `${currentEnemyName}`;

let currentEnemyImage = currentEnemy.img;
enemyImg.src = currentEnemyImage;

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

// FOR GAME SCREEN

const handleCharacterAttack = () => {
  // 1. a random number atk will be generated (outside function)
  const characterAttackAmount = getRandomNumber(80, 120); 
  // 2. that number will be taken away from the enemy's hp, updating new hp
  currentEnemy.hp -= characterAttackAmount
  enemyHealth.innerHTML = `Health: ${currentEnemy.hp}`;
  // 3. the attack stamina cost will be taken from user's stamina, updating new stamina
  player1.stamina -= 15 
  characterStamina.innerHTML = `Stamina: ${player1.stamina}`;
  // 4. need to check if enemy is alive or not (outside function)
// isEnemyDefeated();
  // 5. will trigger enemy attack (outside function)
enemyAttack();
}

const handleCharacterRest = () => {
  // 1. a random number rest will be generated (outside function)
  // 2. that number will be added to character's stamina, updating new stamina
  // 3. will trigger enemy attack (outside function)
  enemyAttack();
}

const handleCharacterHeal = () => {
  // 1. a random number heal will be generated (outside function)
  // 2. that number will be added to characters health, updating new health
  // 3. will trigger enemy attack (outside function)
  enemyAttack();
}
// ---------------- FUNCTIONS ----------------- /

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

// game function:

const getRandomNumber = (min : number, max : number) : number=> {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const enemyAttack = () => {
  // 1. again random number generated
  const enemyAttackAmount = getRandomNumber(50, 175) // 150 feels easy = monster dies too soon, 200 feels hard = need to heal first round
  // 2. that random number is taken from character's health, updating new health
   player1.hp -= enemyAttackAmount;
   characterHealth.innerHTML = `Health: ${player1.hp}`;
}

const isEnemyDefeated = () => {
  // if statement to check if bollean isAlive is true 
  // if false ie !isAlive:
  // 1. give character a score (theres no function for this, maybe hard code a variable?)
  // 2. give some sort of "wow you won, next level message"
  // 3. set current enemy to next enemy
  // else true = enemy is alive = game continues
}

const isCharacterDefeated = () => {
  // if statement to check of boolean isAlive is true or false
  // if false ie !isAlive:
  // trigger game over screen (not currently created):
  // need to add section into HTML -> classic game over, character in b&w? name, score, health, stamina, etc
  // need to do the whole gamescreen.class list trigger thing -> set a function to loadEndGameLossScreen
}

const userReachesEndGame = () => {
  // i guess will be same as isEnemyDefeated, but only for the remaining enemy?
  // or when score reaches a determined point, as score at end game will be same for everyone
  // trigger end screen winning
  // same as above, needs HTML -> won, name, score, health, stamina etc
  // again, need to do whole classlist.add etc
}

// ---------------- EVENT LISTENERS ---------- //

// FOR LOADING SCREEN
loadingScreenEnterBtn.addEventListener("click", loadSelectionScreen);

// FOR SELECTION SCREEN
selectionScreenBtn.addEventListener("click", loadGameScreen);

nameInputBox.addEventListener("change", handleNameInput);

submitChoicesButton.addEventListener("click", handleUserInputs);

leftArrow.addEventListener("click", handleLeftArrowClick);

rightArrow.addEventListener("click", handleRightArrowClick);

// FOR GAME SCREEN

characterAttack.addEventListener("click", handleCharacterAttack);

characterRest.addEventListener("click", handleCharacterRest);

characterHeal.addEventListener("click", handleCharacterHeal);

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
