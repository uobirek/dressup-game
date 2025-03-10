// Define the sound class


class Sound {
    constructor(src) {
        this.sound = new Audio(src);
    }

    play() {
        this.sound.play();
    }

    stop() {
        this.sound.pause();
        this.sound.currentTime = 0;
    }

    loop() {
        this.sound.loop = true;
    }
}

let backgroundSound = new Sound("sounds/background.mp3");
backgroundSound.loop();
backgroundSound.sound.volume = 0.2;

export { backgroundSound };
