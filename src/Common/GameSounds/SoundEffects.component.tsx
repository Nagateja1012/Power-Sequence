import { Howl } from 'howler';
import loadAudio from '../AssetsLoader/audioLoader.component';


export const DropSound = async () => {

    const sound = new Howl({
      src: [await loadAudio({src:  import.meta.env.VITE_AUDIO_URL+'Drop.mp3'})],
      volume: 0.05,
      html5: true,
    });
    sound.play();
};

export const alterSound = async () => {
  const sound = new Howl({
    src: [await loadAudio({src: import.meta.env.VITE_AUDIO_URL+'alterFuture.mp3'})],
    html5: true,
    volume:0.05
  });
  sound.play();
};

export const CardDownSound = async () => {
  const sound = new Howl({
    src: [await loadAudio({src: import.meta.env.VITE_AUDIO_URL+'cardPutDown.mp3'})],
    volume: 0.2,
    html5: true
  });
  sound.play();
};

export const CoinSound = async () => {
  const sound = new Howl({
    src: [await loadAudio({src: import.meta.env.VITE_AUDIO_URL+'coinPlace.mp3'})],
    volume: 0.2,
    html5: true,
  });
  sound.play();
};

export const explosionSound = async () => {
  const sound = new Howl({
    src: [await loadAudio({src: import.meta.env.VITE_AUDIO_URL+'explosion.mp3'})],
    volume: 0.12,
    html5: true,
  });
  sound.play();
};

export const sequenceSound = async () => {
  const sound = new Howl({
    src: [await loadAudio({src: import.meta.env.VITE_AUDIO_URL+'firstSequence.mp3'})],
    volume: 0.3,
    html5: true,
  });
  sound.play();
};

export const deckSound = async () => {
  const sound = new Howl({
    src: [await loadAudio({src: import.meta.env.VITE_AUDIO_URL+'flipcard.mp3'})],
    volume: 0.1,
    html5: true,
  });
  sound.play();
};

export const gameSound = async () => {
  const sound = new Howl({
    src: [await loadAudio({src: import.meta.env.VITE_AUDIO_URL+'GameMusic.mp3'})],
    volume: 0.04,
    html5: true,
    loop: true,
  });
  sound.play();
};

export const lostSound = async () => {
  const sound = new Howl({
    src: [await loadAudio({src: import.meta.env.VITE_AUDIO_URL+'gameover.mp3'})],
    volume: 0.3,
    html5: true,
  });
  sound.play();
};

export const grabSound = async () => {
  const sound = new Howl({
    src: [await loadAudio({src: import.meta.env.VITE_AUDIO_URL+'grab.mp3'})],
    volume: 0.1,
    html5: true,
  });
  sound.play();
};

export const jokerSound = async () => {
  const sound = new Howl({
    src: [await loadAudio({src: import.meta.env.VITE_AUDIO_URL+'joker.mp3'})],
    volume: 0.05,
    html5: true,
  });
  sound.play();
};

export const reverseSound = async () => {
  const sound = new Howl({
    src: [await loadAudio({src: import.meta.env.VITE_AUDIO_URL+'reverse.mp3'})],
    volume: 0.05,
    html5: true,
  });
  sound.play();
};

export const winSound = async () => {
  const sound = new Howl({
    src: [await loadAudio({src: import.meta.env.VITE_AUDIO_URL+'secondSequence.mp3'})],
    volume: 0.03,
    html5: true,
  });
  sound.play();
};



