import { defineStore } from "pinia";
import { useInputStore as inputStore } from "@/stores/inputStore";
import { resultsStore as resultsStore } from "@/stores/resultsStore";
import { postResult } from "@/fetch.js";

export const useSessionStore = defineStore("sessionStore", {
  state: () => ({
    active: false,
    key: 1,
    score: {
      wpm: 0,
      cpm: 0,
      acc: 0,
    },
    timeout: false,
    timeoutId: null,
    timeLimit: 60,
    timeLeft: 60,
    intervalId: null,
  }),
  actions: {
    // Triggers when the test starts
    start() {
      if (this.ready) {
        this.resetScore();
        this.active = true;
        this.intervalId = setInterval(() => {
          this.timeLeft--;
          if (this.timeLeft <= 0) {
            this.finish();
          }
        }, 1000);
      }
    },
    // Triggers when the timer runs out
    // The test is completed
    async finish() {
      await this.startTimeout();
      this.end();
      await this.postScore();
    },
    // Timeout used to block input when test ends
    async startTimeout() {
      this.timeout = true;
      this.timeoutId = setTimeout(() => {
        inputStore().reset();
        this.timeout = false;
      }, 3000);
    },
    // Post data to db and push new record to local results store
    async postScore() {
      if (!this.validateScore()) {
        console.log("Score validation failed");
      } else {
        resultsStore().data.push(this.score);
        postResult(this.score);
      }
    },
    validateScore() {
      return this.score.wpm > 3 && this.score.acc > 10;
    },
    // Triggers on escape or when test abandoned
    cancel() {
      this.resetScore();
      this.end();
      inputStore().reset();
    },
    // Clear-up after every test session
    end() {
      this.active = false;
      this.key++;
      this.timeLeft = this.timeLimit;
      clearInterval(this.intervalId); // clears counter
      clearTimeout(inputStore().abandonedTimer);
    },
    resetScore() {
      this.score = {
        wpm: 0,
        cpm: 0,
        acc: 0,
      };
    },
    // Exposed method of updating the store
    // Updates when test is completed
    updateScore({ wpm, cpm, acc }) {
      if (this.active) {
        this.score.wpm = wpm;
        this.score.cpm = cpm;
        this.score.acc = acc;
      }
    },
  },
  getters: {
    // Check if the test is ready to start
    ready() {
      return !this.active && !this.timeout ? true : false;
    },
  },
});
