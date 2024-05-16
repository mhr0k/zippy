import { defineStore } from "pinia";
import { generate as generateWords } from "random-words";
import { useSessionStore as session } from "@/stores/sessionStore";

export const useInputStore = defineStore("inputStore", {
  state: () => ({
    currentInput: "",
    currentWord: "",
    typed: [],
    queue: [],
    abandoned: false,
    abandonedTimerId: null,
  }),
  actions: {
    // Generates word queue to be typed
    generateQueue() {
      this.queue = generateWords(250);
    },
    // Resets initial state and regenerates word queue
    reset() {
      this.typed = [];
      this.generateQueue();
      this.currentWord = this.queue[0];
      this.currentInput = "";
      clearTimeout(this.abandonedTimerId);
    },
    // Sets or resets timer that checks if the user has abandoned the test
    setAbandonedTimer() {
      clearTimeout(this.abandonedTimerId);
      this.abandonedTimerId = setTimeout(() => {
        this.abandoned = true;
        session().cancel();
      }, 5000);
    },
    // Handles typing into the test input
    processInput(e) {
      session().start();
      this.currentInput = e.target.innerText.replace(/\n/g, "");
      this.queue[0] = this.currentWord.replace(this.longestPrefix, "");
      this.setAbandonedTimer();
    },
    // Changes the next word on spacebar press and updates session score
    nextWord() {
      if (this.currentInput) {
        this.typed.push({
          word: this.currentInput,
          missed: this.currentWord !== this.currentInput,
        });
        this.queue.shift();
        this.currentWord = this.queue[0];
      }
      this.currentInput = "";
      session().updateScore(this.calculateScore());
    },
    // Calculate score to push to the session store
    calculateScore() {
      const correctWords = this.typed
        .filter((word) => !word.missed)
        .map((word) => word.word);
      function countLetters(arr) {
        return arr.reduce((acc, word) => acc + word.length, 0);
      }
      return {
        wpm: correctWords.length,
        cpm: countLetters(correctWords),
        acc: Math.round((correctWords.length / this.typed.length) * 100) || 0,
      };
    },
  },
  getters: {
    // Is the current input correct?
    isCorrect() {
      if (!this.currentWord.includes(this.currentInput)) {
        return false;
      } else {
        return true;
      }
    },
    // Finds the longest matching prefix shared by current input and next in queue
    longestPrefix() {
      const arr1 = this.currentInput.split("");
      const arr2 = this.currentWord.split("");
      return arr1.filter((char, index) => char === arr2[index]).join("");
    },
  },
});
