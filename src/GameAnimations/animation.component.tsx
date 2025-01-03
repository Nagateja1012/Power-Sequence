

import { AnimationDiv } from "./animation.styles";
import Lottie from "lottie-react"

import { useState } from "react";
import AnimationLoader from "../AssetsLoader/animationLoader.component";
import { alterSound, DropSound,  explosionSound, grabSound, jokerSound, reverseSound} from "../GameSounds/SoundEffects.component";


interface AnimationProps {
  animationName: string;
}



const Animation: React.FC<AnimationProps> =  ({ animationName }) => {

  switch (animationName) {
    case "drop":
      DropSound();
      break;
    case "alterfuture":
      alterSound();
      break;
    case "eraser":
      reverseSound();
      break;
    case "explosion":
      explosionSound();
      break;
    case "joker":
      jokerSound();
      break;
    case "grab":
      grabSound();
      break;
    case "reverse":
      reverseSound();
      break;
    case "skip":
      reverseSound();
      break;
  }
  
  const [display, setDisplay] = useState(true);

  return (
    <AnimationDiv display={display}>
      <Lottie 
        animationData={AnimationLoader({src: import.meta.env.VITE_ANIMATION_URL+animationName+'.json'})}
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
