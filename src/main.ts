// entry point of application. 
// import and initialise game
// manage trasnsitions between difference screens

// --- QUERY SELECTORS ---
const loadingScreen = document.querySelector(".loading-screen");
const selectionScreen = document.querySelector(".selection-screen");
const gameScreen = document.querySelector(".game-screen");
const loadingScreenEnterBtn = document.querySelector(".loading-screen__button");
const selectionScreenBtn = document.querySelector(".selection-screen__button")



// --- EVENT LISTENERS ---
loadingScreenEnterBtn?.addEventListener("click", () => {
	// hide loading screen
	loadingScreen?.classList.add("hide");
	// show selection screen
	selectionScreen?.classList.add("show")
})

selectionScreenBtn?.addEventListener("click", () => {
	// hide selection screen
	selectionScreen?.classList.remove("show")
	// show game screen
	gameScreen?.classList.add("show")
})