import { defineStore } from "pinia";
import { generate as generateQueue } from "random-words";
import { useTestSessionStore as session } from "@client/stores/testSessionStore";

export const useWordStore = defineStore("wordStore", {
  state: () => ({
    currentInput: "",
    currentWord: "",
    typed: [],
    queue: [],
    typing: false,
    abandoned: false,
    typingTimer: null,
    abandonedTimer: null,
  }),
  actions: {
    generateQueue() {
      this.queue = generateQueue(250);
    },
    reset() {
      this.typed = [];
      this.generateQueue();
      this.currentWord = this.queue[0];
      this.currentInput = "";
    },
    resetCurrentInput() {
      this.currentInput = "";
    },
    shiftQueueLetter() {
      this.queue[0] = this.queue[0].substring(1);
    },
    updateTypingState() {
      this.typing = true;
      clearTimeout(this.typingTimer);
      clearTimeout(this.abandonedTimer);
      this.typingTimer = setTimeout(() => {
        this.typing = false;
      }, 500);
      this.abandonedTimer = setTimeout(() => {
        this.abandoned = true;
        session().cancel();
      }, 5000);
    },
    processInput(e) {
      if (/^.$/.test(e.key)) e.preventDefault();
      if (/^[a-z]/.test(e.key)) {
        const letter = e.key;
        session().start();
        this.currentInput += letter;
        this.updateTypingState();
        if (this.currentInputIsCorrect && letter === this.nextLetter) {
          this.shiftQueueLetter();
        }
      }
    },
    processDelete(e) {
      if (e.ctrlKey) {
        this.resetCurrentInput();
      } else {
        this.popInputLetter(e.key);
      }
    },
    popInputLetter() {
      this.currentInput = this.currentInput.slice(0, -1);
    },
    unshiftQueueLetter(letter) {
      this.queue[0] = letter + this.queue[0];
    },
    nextWord() {
      if (this.currentInput) {
        this.typed.push({
          word: this.currentInput,
          missed: this.wordIsMistyped,
        });
        this.queue.shift();
        this.currentWord = this.queue[0];
      }
      this.currentInput = "";
      session().updateScore(this.score);
    },
    restoreQueueString() {
      const queueString = this.currentWord.replace(
        this.findLongestPrefix(),
        ""
      );
      this.queue[0] = queueString;
    },
    findLongestPrefix() {
      const arr1 = this.currentInput.split("");
      const arr2 = this.currentWord.split("");
      return arr1.filter((char, index) => char === arr2[index]).join("");
    },
    countLetters(arr) {
      return arr.reduce((acc, word) => acc + word.length, 0);
    },
  },
  getters: {
    currentInputIsCorrect() {
      if (!this.currentWord.includes(this.currentInput)) {
        return false;
      } else {
        return true;
      }
    },
    currentInputIsEmpty() {
      return !this.currentInput;
    },
    currentInputIsMistyped() {
      return !this.currentInputIsCorrect;
    },
    wordIsCorrect() {
      return this.currentWord === this.currentInput;
    },
    wordIsMistyped() {
      return !this.wordIsCorrect;
    },
    nextLetter() {
      return this.queue[0][0];
    },
    correctWords() {
      return this.typed.filter((word) => !word.missed).map((word) => word.word);
    },
    score() {
      return {
        wpm: this.correctWords.length,
        cpm: this.countLetters(this.correctWords),
        acc:
          Math.round((this.correctWords.length / this.typed.length) * 100) || 0,
      };
    },
  },
});
