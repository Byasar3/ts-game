import monster1 from "../assets/procrastinatopus.png";
import monster2 from "../assets/comparisoncrustaceans.png";
import monster3 from "../assets/crappythoughtscloud.png";

// creating enemy aliase/interface/object
export type Enemy = {
  name: string;
  hp: number;
  img: string;
};

// database of enemies

export const enemyData: Enemy[] = [
  {
    name: "procrastinatopus",
    hp: 400,
    img: monster1,
  },
  {
    name: "comparison crustaceans",
    hp: 400,
    img: monster2,
  },
  {
    name: "crappy thoughts cloud",
    hp: 400,
    img: monster3,
  },
];
