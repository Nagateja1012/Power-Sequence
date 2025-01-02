

import { AnimationDiv } from "./animation.styles";
import Lottie from "lottie-react"
import alterfuture from "../assets/animations/alterfuture.json"
import drop from "../assets/animations/drop.json"
import eraser from "../assets/animations/eraser.json"
import explosion from "../assets/animations/explosion.json"
import grab from "../assets/animations/grab.json"
import joker from "../assets/animations/joker.json"
import reverse from "../assets/animations/reverse.json"
import skip from "../assets/animations/skip.json"
import { useState } from "react";

interface AnimationProps {
  animationName: string;
}



const Animation: React.FC<AnimationProps> = ({ animationName }) => {
  // Get animation data based on animation name
  const getAnimationData = () => {
    switch(animationName) {
      case 'alterfuture':
        return alterfuture;
      case 'drop':
        return drop;
      case 'eraser':
        return eraser;
      case 'explosion':
        return explosion;
      case 'grab':
        return grab;
      case 'joker':
        return joker;
      case 'reverse':
        return reverse;
      case 'skip':
        return skip;
      default:
        return alterfuture;
    }
  }
  const [display, setDisplay] = useState(true);
  const animationData = getAnimationData();

  return (
    <AnimationDiv display={display}>
      <Lottie 
        animationData={animationData}
        loop={false}
        onComplete={() => {console.log('done')
            setDisplay(false);
        }}
           autoplay
        style={{ height: "300px", width: "300px" }}
      />
    </AnimationDiv>
  );
};




export default Animation;
