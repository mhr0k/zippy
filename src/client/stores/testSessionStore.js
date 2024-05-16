import { defineStore } from "pinia";
import { useWordStore as words } from "@client/stores/wordStore";
import { useGlobalResultsStore as globalResults } from "@client/stores/globalResultsStore";
import { postResult } from "@client/fetch.js";

export const useTestSessionStore = defineStore("testSessionStore", {
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
    async finish() {
      await this.startTimeout();
      this.end();
      await this.postScore();
    },
    // Post data to db and push new record locally
    async postScore() {
      if (!this.validateScore()) {
        console.log("Score validation failed");
      } else {
        globalResults().data.push(this.score);
        postResult(this.score);
      }
    },
    validateScore() {
      return this.score.wpm > 3 && this.score.acc > 10;
    },
    end() {
      this.active = false;
      this.key++;
      this.timeLeft = this.timeLimit;
      clearInterval(this.intervalId);
    },
    cancel() {
      this.resetScore();
      this.end();
      words().reset();
      clearTimeout(words().abandonedTimer);
    },
    async startTimeout() {
      this.timeout = true;
      this.timeoutId = setTimeout(() => {
        words().reset();
        this.timeout = false;
      }, 3000);
    },
    resetScore() {
      this.score = {
        wpm: 0,
        cpm: 0,
        acc: 0,
      };
    },
    updateScore({ wpm, cpm, acc }) {
      if (this.active) {
        this.score.wpm = wpm;
        this.score.cpm = cpm;
        this.score.acc = acc;
      }
    },
  },
  getters: {
    ready() {
      return !this.active && !this.timeout ? true : false;
    },
  },
});
