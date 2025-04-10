let recognition;
const animals = {
  vaca: "images/vaca.png",
  perro: "images/perro.png",
  tigre: "images/tigre.png",
  caballo: "images/caballo.png",
  gallina: "images/gallina.png",
};

function initSpeechRecognition() {
  if ("webkitSpeechRecognition" in window) {
    recognition = new webkitSpeechRecognition();
    recognition.lang = "es-ES";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      const micBtn = document.getElementById("mic-btn");
      micBtn.classList.add("listening");
      // Change top text when mic is clicked
      document.querySelector(".question-text").textContent = "Di el nombre!";
      // Hide instruction text while listening
      document.querySelector(".instruction-text").style.display = "none";
    };

    recognition.onend = () => {
      const micBtn = document.getElementById("mic-btn");
      micBtn.classList.remove("listening");
    };

    recognition.onresult = (event) => {
      const spokenWord = event.results[0][0].transcript.toLowerCase().trim();

      if (animals[spokenWord]) {
        // Valid animal name spoken
        displayAnimal(spokenWord);
      } else {
        // Error - word not recognized
        showError();
      }
    };

    recognition.onerror = () => {
      showError();
    };
  }
}

function displayAnimal(animalName) {
  const displayArea = document.getElementById("display-area");
  // Clear previous content except the question text
  displayArea.innerHTML = `
    <div class="question-text">Quien es?</div>
    <img src="${animals[animalName]}" alt="${animalName}" class="animal-image" style="display: block">
    <div id="animal-name" style="display: block">${animalName}</div>
  `;
}

function showError() {
  const displayArea = document.getElementById("display-area");
  const questionText = document.querySelector(".question-text");
  questionText.textContent = "Oops no te escuche! Prueba de nuevo";
  // Show instruction text again after error
  document.querySelector(".instruction-text").style.display = "block";
}

document.getElementById("mic-btn").addEventListener("click", () => {
  if (recognition) {
    recognition.start();
  }
});

// Initialize speech recognition when the page loads
window.addEventListener("load", initSpeechRecognition);
