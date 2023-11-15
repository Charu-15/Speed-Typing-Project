const typingText = document.querySelector(".text p");
const inpField = document.querySelector(".wrapper .typer");
const tryAgainBtn = document.querySelector(".context button");
const timeTag = document.querySelector(".time span b");
const errorTag = document.querySelector(".error span");
const wpmTag = document.querySelector(".wpm span");
const cpmTag = document.querySelector(".cpm span");

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = (error = isTyping = 0);
// charIndex function searches for a substring in a string and return to the position

function loadParagraph() {
  const randIndex = Math.floor(Math.random() * paragraphs.length);
  // randIndex is used in MAth function
  // floor method is a static method used to find the largest integer which is less than or equal to the passed argumnet
  typingText.innerHTML = "";
  paragraphs[randIndex].split("").forEach((char) => {
    let span = `<span>${char}</span>`;
    typingText.innerHTML += span;
  });
  typingText.querySelectorAll("span")[0].classList.add("active");
  document.addEventListener("keydown", () => inpField.focus());
  typingText.addEventListener("click", () => inpField.focus());
}
function initTyping() {
  let characters = typingText.querySelectorAll("span");
  let typedChar = inpField.value.split("")[charIndex];
  if (charIndex < characters.length - 1 && timeLeft > 0) {
    if (!isTyping) {
      timer = setInterval(initTimer, 1000);
      isTyping = true;
    }
    if (typedChar == null) {
      if (charIndex > 0) {
        charIndex--;
        if (characters[charIndex].classList.contains("incorrect")) {
          error--;
        }
        characters[charIndex].classList.remove("correct", "incorrect");
      }
    } else {
      if (characters[charIndex].innerText == typedChar) {
        characters[charIndex].classList.add("correct");
      } else {
        error++;
        characters[charIndex].classList.add("incorrect");
      }
      charIndex++;
    }
    characters.forEach((span) => span.classList.remove("active"));
    characters[charIndex].classList.add("active");

    let wpm = Math.round(((charIndex - error) / 5 / (maxTime - timeLeft)) * 60);
    wpm = wpm < 0 || !wpm || wpm == Infinity ? 0 : wpm;

    wpmTag.innerText = wpm;
    errorTag.innerText = error;
    cpmTag.innerText = charIndex - error;
  } else {
    clearInterval(timer);
    inpField.value = "";
  }
}
function initTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timeTag.innerText = timeLeft;
    let wpm = Math.round(((charIndex - error) / 5 / (maxTime - timeLeft)) * 60);
    wpmTag.innerText = wpm;
  } else {
    clearInterval(timer);
  }
}
function resetGame() {
  loadParagraph();
  clearInterval(timer);
  timeLeft = maxTime;
  charIndex = error = isTyping = 0;
  inpField.value = "";
  timeTag.innerText = timeLeft;
  wpmTag.innerText = 0;
  errorTag.innerText = 0;
  cpmTag.innerText = 0;
}
loadParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);