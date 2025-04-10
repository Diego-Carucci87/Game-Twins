const animals = [
  {
    name: "caballo",
    sound: "sounds/caballo.mp3",
    image: "images/horse.png",
  },
  {
    name: "vaca",
    sound: "sounds/vaca.mp3",
    image: "images/cow.png",
  },
  {
    name: "pollo",
    sound: "sounds/pollo.mp3",
    image: "images/chicken.png",
  },
  {
    name: "perro",
    sound: "sounds/perro.mp3",
    image: "images/dog.png",
  },
  {
    name: "tigre",
    sound: "sounds/tigre.mp3",
    image: "images/tiger.png",
  },
];

let recognition;
let currentAnimal = null;

document.addEventListener("DOMContentLoaded", () => {
  const introScreen = document.getElementById("intro-screen");
  const gameScreen = document.getElementById("game-screen");
  const micBtn = document.getElementById("mic-btn");
  const displayArea = document.getElementById("display-area");
  const animalName = document.getElementById("animal-name");

  // Set up speech recognition
  if ("webkitSpeechRecognition" in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "es-ES";

    recognition.onresult = (event) => {
      const spokenWord = event.results[0][0].transcript.toLowerCase();
      checkAnswer(spokenWord);
    };
  }

  // Start game when clicking intro screen
  introScreen.addEventListener("click", () => {
    introScreen.classList.remove("active");
    introScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    gameScreen.classList.add("active");
    resetGame();
  });

  // Microphone button click handler
  micBtn.addEventListener("click", () => {
    if (recognition) {
      recognition.start();
      micBtn.classList.add("pressed");
      setTimeout(() => {
        micBtn.classList.remove("pressed");
      }, 2000);
    }
  });
});

function checkAnswer(spokenWord) {
  if (currentAnimal && spokenWord.includes(currentAnimal.name)) {
    showAnimal(currentAnimal);
    playAnimalSound(currentAnimal);
    setTimeout(resetGame, 8000);
  }
}

function showAnimal(animal) {
  const displayArea = document.getElementById("display-area");
  const animalName = document.getElementById("animal-name");

  displayArea.innerHTML = `<img src="${animal.image}" alt="${animal.name}" class="animal-image">`;
  animalName.textContent = animal.name;
  animalName.classList.remove("hidden");
}

function playAnimalSound(animal) {
  const audio = new Audio(animal.sound);
  const soundBtn = document.getElementById("sound-btn");

  soundBtn.classList.add("pressed");
  audio.play();

  // Remove pressed state when audio ends
  audio.onended = () => {
    soundBtn.classList.remove("pressed");
  };

  // Fallback timeout in case audio fails to load
  setTimeout(() => {
    soundBtn.classList.remove("pressed");
  }, 2000);
}

function resetGame() {
  const displayArea = document.getElementById("display-area");
  const animalName = document.getElementById("animal-name");

  displayArea.innerHTML = "";
  animalName.classList.add("hidden");
  currentAnimal = animals[Math.floor(Math.random() * animals.length)];
}
