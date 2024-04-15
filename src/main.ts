import { player1 } from "./character";
import { enemyData, Enemy } from "./enemy";
import "../styles/style.scss";

// --------------- QUERY SELECTORS ---------- //

// FOR LOADING SCREEN:
const loadingGif = document.querySelector(".loading-gif");
const loadingScreen = document.querySelector(".loading-screen");
const selectionScreen = document.querySelector(".selection-screen");
const gameScreen = document.querySelector(".game-screen");
const loadingScreenEnterBtn = document.querySelector(".loading-screen__button");
const selectionScreenBtn = document.querySelector(".selection-screen__button");
const characterHealth = document.querySelector(".character__stats__hp");
const characterStamina = document.querySelector(".character__stats__stamina");
const characterScore = document.querySelector(".character__stats__score");

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

const enemyHealth = document.querySelector(".enemy__stats__hp");
const enemyImg = document.querySelector<HTMLImageElement>(".enemy__info__img");
const enemyName = document.querySelector(".enemy__info__name");
const characterAttack = document.querySelector<HTMLButtonElement>(
  ".character__actions__atk"
);
const characterRest = document.querySelector<HTMLButtonElement>(
  ".character__actions__rest"
);
const characterHeal = document.querySelector<HTMLButtonElement>(
  ".character__actions__heal"
);
const characterImg = document.querySelector<HTMLImageElement>(
  ".character__info__img"
);
const characterName = document.querySelector(".character__info__name");
const feedback = document.querySelector(".game-screen__feedback");
// FOR END GAME SCREENS

const endGameWinScreen = document.querySelector(".end-game-win-screen");
const gameOverScreen = document.querySelector(".game-over-screen");
const gameOverContent = document.querySelector(".game-over-screen__content");
const gameOverImg = document.querySelector<HTMLImageElement>(
  ".game-over-screen__img"
);
const gameOverScreenButton = document.querySelector<HTMLButtonElement>(
  ".game-over-screen__button"
);
const endGameWinContent = document.querySelector(
  ".end-game-win-screen__content"
);
const endGameWinImg = document.querySelector<HTMLImageElement>(
  ".end-game-win-screen__img"
);

const endGameWinScreenButton = document.querySelector<HTMLButtonElement>(
  ".end-game-win-screen__button"
);

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
  !characterHealth ||
  !characterStamina ||
  !characterScore ||
  !enemyHealth ||
  !enemyImg ||
  !enemyName ||
  !characterAttack ||
  !characterRest ||
  !characterHeal ||
  !characterImg ||
  !characterName ||
  !endGameWinScreen ||
  !gameOverScreen ||
  !gameOverContent ||
  !gameOverImg ||
  !gameOverScreenButton ||
  !endGameWinContent ||
  !endGameWinImg ||
  !endGameWinScreenButton ||
  !feedback ||
  !loadingGif
) {
  throw new Error("Issue with selectors");
}

// ---------------- VARIABLES ------------------//
// setting character variables
characterHealth.innerHTML = `Health: ${player1.hp}`;
characterStamina.innerHTML = `Stamina: ${player1.stamina}`;
characterScore.innerHTML = `Score: ${player1.score}`;

// setting enemy variables
let currentEnemyIndex = 0;
let currentEnemy: Enemy = enemyData[currentEnemyIndex];

enemyHealth.innerHTML = `Health: ${currentEnemy.hp}`;
enemyName.innerHTML = `${currentEnemy.name}`;
enemyImg.src = currentEnemy.img;

// ---------------- EVENT HANDLERS ----------- //

const showMainContent = () => {
    setTimeout(() => {
      loadingGif.classList.add("hide");
    
      loadingScreen.classList.remove("hide");
      loadingScreen.classList.add("show");
    }, 4000);
};

// FOR SELECTION SCREEN

// for clicking through characters on screen
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

// saves the chosen image as the character image
const handleUserCharacterSelection = () => {
  const currentImage = characterImages[currentIndex] as HTMLImageElement;
  player1.img = currentImage.src;
  characterImg.src = player1.img;
};

// saves written name as character name
const handleNameInput = (event: Event) => {
  const target = (event.target as HTMLInputElement).value;
  player1.name = target;
  characterName.innerHTML = player1.name;
};

// FOR GAME SCREEN

const handleCharacterAttack = () => {
  disableCharacterActionButtons();
  if (player1.stamina >= 20) {
    characterAttack.disabled = true;
    // 1. a random number atk will be generated
    const characterAttackAmount = getRandomNumber(80, 200);
    // 2. that number will be taken away from the enemy's hp, updating new hp
    currentEnemy.hp -= characterAttackAmount;
    enemyHealth.innerHTML = `Health: ${currentEnemy.hp}`;
    // 3. the attack stamina cost will be taken from user's stamina, updating new stamina
    player1.stamina -= 20;
    characterStamina.innerHTML = `Stamina: ${player1.stamina}`;
    showFeedback(
      `You attacked ${currentEnemy.name}, causing ${characterAttackAmount} damage!`,
      2000
    );
    // 4. need to check if enemy is alive or not
    isEnemyDefeated();
    // 5. will trigger enemy attack
    setTimeout(enemyAttack, 2500);
    // need to check if character is alive or not
    setTimeout(isCharacterDefeated, 2800);
  } else {
    showFeedback("Not enough stamina! Rest to increase stamina", 2000);
  }
  enableCharacterActionButtons();
};

const handleCharacterRest = () => {
  disableCharacterActionButtons();
  // 1. a random number rest will be generated
  const randomStaminaRestore = getRandomNumber(40, 80);
  // 2. that number will be added to character's stamina, updating new stamina
  player1.stamina += randomStaminaRestore;
  characterStamina.innerHTML = `Stamina: ${player1.stamina}`;
  showFeedback(`You restored ${randomStaminaRestore} stamina!`, 2000);
  // 3. will trigger enemy attack
  setTimeout(enemyAttack, 2500);
  // need to check if character is alive or not
  setTimeout(isCharacterDefeated, 2800);
  enableCharacterActionButtons();
};

const handleCharacterHeal = () => {
  disableCharacterActionButtons();
  if (player1.stamina >= 50) {
    // 1. a random number heal will be generated
    const randomHealRestore = getRandomNumber(200, 300);
    // 2. that number will be added to characters health, updating new health
    player1.hp += randomHealRestore;
    characterHealth.innerHTML = `Health: ${player1.hp}`;
    // stamina cost
    player1.stamina -= 50;
    characterStamina.innerHTML = `Stamina: ${player1.stamina}`;
    showFeedback(`You healed ${randomHealRestore}!`, 2000);
    // 3. will trigger enemy attack
    setTimeout(enemyAttack, 2500);
    // need to check if character is alive or not
    setTimeout(isCharacterDefeated, 2800);
  } else {
    showFeedback("Not enough stamina! Rest to increase stamina", 2000);
  }
  enableCharacterActionButtons();
};

const handleGameRestart = () => {
  //reset player values
  player1.hp = 500;
  player1.stamina = 500;
  player1.score = 0;

  //reset enemy data
  currentEnemyIndex = 0;
  currentEnemy = enemyData[currentEnemyIndex];
  console.log(2);

  //update the page with this information ->
  characterHealth.innerHTML = `Health: ${player1.hp}`;
  characterStamina.innerHTML = `Stamina: ${player1.stamina}`;
  characterScore.innerHTML = `Health: ${player1.score}`;
  enemyName.innerHTML = `${currentEnemy.name}`;
  currentEnemy.hp = 400;
  enemyHealth.innerHTML = `Health: ${currentEnemy.hp}`;
  enemyImg.src = currentEnemy.img;

  // screen transitions
  gameOverScreen.classList.remove("show");
  gameOverScreen.classList.add("hide");

  endGameWinScreen.classList.remove("show");
  endGameWinScreen.classList.add("hide");

  loadingScreen.classList.remove("hide");
  loadingScreen.classList.add("show");
};

// ---------------- FUNCTIONS ----------------- /

const disableCharacterActionButtons = () => {
  // disable buttons
  characterAttack.disabled = true;
  characterRest.disabled = true;
  characterHeal.disabled = true;
};

const enableCharacterActionButtons = () => {
  // enable buttons
  setTimeout(() => {
    characterAttack.disabled = false;
    characterRest.disabled = false;
    characterHeal.disabled = false;
  }, 5000);
};

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

////// game functions:

const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const enemyAttack = () => {
  // 1. again random number generated
  const enemyAttackAmount = getRandomNumber(50, 80);
  // 2. that random number is taken from character's health, updating new health
  player1.hp -= enemyAttackAmount;
  characterHealth.innerHTML = `Health: ${player1.hp}`;
  showFeedback(
    `${currentEnemy.name} attacked you, causing ${enemyAttackAmount} damage!`,
    2000
  );
};

const showFeedback = (message: string, duration: number) => {
  feedback.textContent = message;

  // JS function that will execute a block of code after delay
  setTimeout(() => {
    feedback.textContent = "";
  }, duration);
};

const isEnemyDefeated = () => {
  if (currentEnemy.hp <= 0) {
    currentEnemyIndex++;
    // checking if any monsters left
    if (currentEnemyIndex < enemyData.length) {
      currentEnemy = enemyData[currentEnemyIndex];
      // update with new enemy information -> set current enemy to next enemy
      currentEnemy.hp = 400;
      enemyHealth.innerHTML = `Health: ${currentEnemy.hp}`;
      enemyName.innerHTML = `${currentEnemy.name}`;
      enemyImg.src = currentEnemy.img;

      // give character a score (theres no function for this, hard code a variable)
      player1.score += 100;
      characterScore.innerHTML = `Score: ${player1.score}`;
    } else {
      // no monsters left triggers end of game logic
      userReachesEndGameWin();
    }
  }
  // 2. give some sort of "wow you won, next level message" ----- extension
};

const isCharacterDefeated = () => {
  // if statement to check character hp
  if (player1.hp <= 0) {
    // no hp left triggers game over logic
    gameOver();
  }
};

const userReachesEndGameWin = () => {
  // hide game screen
  gameScreen.classList.remove("show");
  gameScreen.classList.add("hide");

  // show end game win screen
  endGameWinScreen.classList.remove("hide");
  endGameWinScreen.classList.add("show");

  endGameWinImg.src = player1.img;
  endGameWinContent.innerHTML = `
    Health: ${player1.hp}
    Stamina: ${player1.stamina}
    Score: ${player1.score}
    `;
};

const gameOver = () => {
  // hide game screen
  gameScreen.classList.remove("show");
  gameScreen.classList.add("hide");

  // hide game win end screen
  endGameWinScreen.classList.add("hide");

  // show game over screen
  gameOverScreen.classList.remove("hide");
  gameOverScreen.classList.add("show");

  gameOverImg.src = player1.img;
  gameOverContent.innerHTML = `
    Health: ${player1.hp}
    Stamina: ${player1.stamina}
    Score: ${player1.score}
    `;
};

// ---------------- EVENT LISTENERS ---------- //

// FOR LOADING SCREEN
window.addEventListener("load", showMainContent);
loadingScreenEnterBtn.addEventListener("click", loadSelectionScreen);

// FOR SELECTION SCREEN
selectionScreenBtn.addEventListener("click", loadGameScreen);
nameInputBox.addEventListener("change", handleNameInput);
submitChoicesButton.addEventListener("click", handleUserCharacterSelection);
leftArrow.addEventListener("click", handleLeftArrowClick);
rightArrow.addEventListener("click", handleRightArrowClick);

// FOR GAME SCREEN

characterAttack.addEventListener("click", handleCharacterAttack);
characterRest.addEventListener("click", handleCharacterRest);
characterHeal.addEventListener("click", handleCharacterHeal);

// FOR END GAME SCREENS

gameOverScreenButton.addEventListener("click", handleGameRestart);
endGameWinScreenButton.addEventListener("click", handleGameRestart);

////////////////// NOTES
