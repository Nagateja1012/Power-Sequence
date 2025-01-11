import { AnimationDiv } from "./animation.styles";
import Lottie from "lottie-react";

import {
  alterSound,
  DropSound,
  explosionSound,
  grabSound,
  jokerSound,
  reverseSound,
} from "../GameSounds/SoundEffects.component";
import { useAnimation } from "./animation.context";
import AnimationLoader from "../AssetsLoader/animationLoader.component";

const Animation: React.FC = () => {
  const {
    animationName,
    aniamtionDisplay,
    setaniamtionDisplay,
    setAnimationName,
  } = useAnimation();

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

  return (
    <AnimationDiv displayProp={aniamtionDisplay}>
      <Lottie
        animationData={
          animationName !== ""
            ? AnimationLoader({
                src:
                  import.meta.env.VITE_ANIMATION_URL + animationName + ".json",
              })
            : ""
        }
        loop={false}
        onComplete={() => {
          setaniamtionDisplay(false);
          setAnimationName("");
        }}
        autoplay
        style={{ height: "300px", width: "300px" }}
      />
    </AnimationDiv>
  );
};

export default Animation;
