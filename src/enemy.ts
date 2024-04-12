import procrastinatopus from "../assets/procrastinatopus.png";
import comparisonCrustaceans from "../assets/comparisoncrustaceans.png";
import crappyThoughtsCloud from "../assets/crappythoughtscloud.png";
import lullabyLurker from "../assets/lullabylurker.png"
import panicPhantom from "../assets/panicphantom.png"
import gloomSlick from "../assets/gloomslick.png"
import stubbornSkeleton from "../assets/stubbornskeleton.png"
import perfectionismpixie from "../assets/perfectionismpixie.png"

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
    img: procrastinatopus,
  },
  {
    name: "comparison crustaceans",
    hp: 400,
    img: comparisonCrustaceans,
  },
  {
    name: "crappy thoughts cloud",
    hp: 400,
    img: crappyThoughtsCloud,
  },
  {
    name: "lullaby lurker",
    hp: 400,
    img: lullabyLurker
  },
  {
    name: "panic phantom",
    hp: 400,
    img : panicPhantom
  },
  {
    name: "gloom slick",
    hp: 400,
    img: gloomSlick
  },
  {
    name: "stubborn skeleton",
    hp: 400,
    img: stubbornSkeleton
  },
  {
    name: "perfectionism pixie",
    hp: 400,
    img: perfectionismpixie
  }
];
