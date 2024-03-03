const btn = document.querySelector(".talk");
const content = document.querySelector(".content");

function speak(text) {
  const text_speak = new SpeechSynthesisUtterance(text);
  text_speak.rate = 1.5;
  text_speak.volume = 1;
  text_speak.pitch = 0.7;
  window.speechSynthesis.speak(text_speak);
}

// speak when window gets loaded
window.addEventListener("load", () => {
  speak("Initializing JARVIS..");
});

// converting speech to text
const Recognition = new (window.SpeechRecognition ||
  window.webkitSpeechRecognition)();

Recognition.onresult = (Event) => {
  const currentIndex = Event.resultIndex;
  const transcript = Event.results[currentIndex][0].transcript;
  content.textContent = transcript;
  takeCommand(transcript.toLowerCase());
};

btn.addEventListener("click", () => {
  content.textContent = "Listening Boss...";
  speak("Listening Boss");
  Recognition.start();
});

function takeCommand(message) {
  if (message.includes("hey") || message.includes("hi")) {
    speak("hey boss");
  } else if (message.includes("how are you")) {
    speak("I am good, how about you?");
  } else if (message.includes("fine") || message.includes("good")) {
    speak("That's great");
  } else if (message.includes("what is your name")) {
    speak("I am JARVIS");
  } else if (message.includes("who made you")) {
    speak("I was created by My Boss");
  } else if (message.includes("what is the time") || message.includes("time")) {
    const time = new Date();
    speak(
      `The time is ${time.getHours()} hours and ${time.getMinutes()} minutes`
    );
  } else if (message.includes("what is the date") || message.includes("date")) {
    const date = new Date();
    speak(
      `Today is ${date.getDate()} ${date.getMonth()} ${date.getFullYear()}`
    );
  } else if (message.includes("open google")) {
    window.open("https://www.google.com");

  } else if (message.includes("open youtube")) {
    window.open("https:\\www.youtube.com");

  } else if (message.includes("who are") || message.includes("what is")) {
    window.open("https://www.google.com/search?q=" + message);
    speak("Here is what I found on google for " + message);
  }
  else if(message.includes("open") || message.includes("search")) {
    window.open("https://www.google.com/search?q=" + message);
  }
  else if(message.includes("close") || message.includes("exit")) {
    window.close();
  }
  else
  speak("sorry boss I didn't get that");
}
