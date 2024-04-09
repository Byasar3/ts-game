// creating enemy aliase/interface/object
export type Enemy = {
  name: string;
  hp: number;
  img: string;
  isAlive: boolean;
};


// database of enemies

// level 1
export const levelOneEnemy : Enemy = {
	name : "basic goblin",
	hp : 400,
	img : "",
	isAlive: true
}

// to level 10 for eg
