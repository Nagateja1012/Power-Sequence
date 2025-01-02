import { Howl } from 'howler';

export const DropSound = () => {
    const sound = new Howl({
      src: ['./src/assets/sounds/Drop.mp3'],
      volume: 0.05,
      html5: true,
    });
    sound.play();
};

export const alterSound = () => {
  const sound = new Howl({
    src: ['./src/assets/sounds/alterFuture.mp3'],
    html5: true,
    volume:0.05
  });
  sound.play();
};
export const CardDownSound = () => {
  const sound = new Howl({
    src: ['./src/assets/sounds/cardPutDown.mp3'],
    volume: 0.2,
  });
  sound.play();
};
export const CoinSound = () => {
  const sound = new Howl({
    src: ['./src/assets/sounds/coinPlace.mp3'],
    volume: 0.1,
    html5: true,
  });
  sound.play();
};
export const explosionSound = () => {
  const sound = new Howl({
    src: ['./src/assets/sounds/explosion.mp3'],
    volume: 0.12,
    html5: true,
  });
  sound.play();
};
export const sequenceSound = () => {
  const sound = new Howl({
    src: ['./src/assets/sounds/firstSequence.mp3'],
    volume: 0.3,
    html5: true,
  });
  sound.play();
};
export const deckSound = () => {
  const sound = new Howl({
    src: ['./src/assets/sounds/flipcard.mp3'],
    volume: 0.1,
    html5: true,
  });
  sound.play();
};
export const gameSound = () => {
  const sound = new Howl({
    src: ['./src/assets/sounds/GameMusic.mp3'],
    volume: 0.05,
    html5: true,
    loop: true,
  });
  sound.play();
};
export const lostSound = () => {
  const sound = new Howl({
    src: ['./src/assets/sounds/gameover.mp3'],
    volume: 0.3,
    html5: true,
  });
  sound.play();
};
export const grabSound = () => {
  const sound = new Howl({
    src: ['./src/assets/sounds/grab.mp3'],
    volume: 0.1,
    html5: true,
  });
  sound.play();
};
export const jokerSound = () => {
  const sound = new Howl({
    src: ['./src/assets/sounds/joker.mp3'],
    volume: 0.1,
    html5: true,
  });
  sound.play();
};
export const reverseSound = () => {
  const sound = new Howl({
    src: ['./src/assets/sounds/reverse.mp3'],
    volume: 0.05,
    html5: true,
  });
  sound.play();
};
export const winSound = () => {
  const sound = new Howl({
    src: ['./src/assets/sounds/secondSequence.mp3'],
    volume: 0.03,
    html5: true,
  });
  sound.play();
};



