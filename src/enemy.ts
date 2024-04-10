import monster1 from "../assets/procrastinatopus.png"
import monster2 from "../assets/comparisoncrustaceans.png"
import monster3 from "../assets/crappythoughtscloud.png"

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
	name : "procrastinatopus",
	hp : 400,
	img : monster1,
	isAlive: true
}

// level 2
export const levelTwoEnemy : Enemy = {
	name : "comparison crustaceans",
	hp : 400,
	img : monster2,
	isAlive : true
}

// level 3
export const levelThreeEnemy : Enemy = {
	name : "crappy thoughts cloud",
	hp : 400,
	img : monster3,
	isAlive : true
}