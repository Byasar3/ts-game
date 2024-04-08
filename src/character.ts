console.log("Character module loaded"); 
// creating character aliase/interface/object
export type Character = {
  name: string;
  hp: number;
  stamina: number;
  score: number;
  img: "";
  isAlive: boolean;
};

// creating new character based on user input
export const player1: Character = {
  name: "", // will be based on user input
  hp: 500, // starting hp
  stamina: 500, // starting stamina
  score: 0, // starting score
  img: "", // will be based on user input
  isAlive: true,
};

console.log("player1:", player1);
