import { defineStore } from "pinia";
import { getResults } from "@/fetch.js";
import { getRange } from "@/utils.js";
import { useSessionStore as session } from "@/stores/sessionStore";

export const resultsStore = defineStore("resultsStore", {
  state: () => ({
    data: null,
    loading: false,
  }),
  actions: {
    // Fetches data from db
    // Sets loading state
    async fetch() {
      this.loading = true;
      const response = await getResults();
      if (response) {
        this.data = response;
      }
      this.loading = false;
    },
    // Helps getters parse data
    // Type is "wpm", "cpm" or "acc"
    // Step is the size of each range
    populate(type, step = 10) {
      const score = Number(session().score[type]);
      const scoreRange = getRange(score, step);
      const isCurrent = (range) => {
        if (score) {
          return range === scoreRange;
        }
      };
      const arr = this.data.map((r) => r[type]);
      const min = Math.min(...arr);
      const max = Math.max(...arr);
      const avg = Math.round(
        arr.reduce((acc, val) => acc + val, 0) / arr.length
      );
      const tiers = () => {
        let result = [];
        // Create ranges array
        let index = min;
        let limit = Math.ceil(max / 10) * 10;
        while (index <= limit) {
          const range = getRange(index, step);
          result.push({
            range,
            count: 0,
            current: !!isCurrent(range),
          });
          index += step;
        }
        // Count records in each range
        this.data.forEach((record) => {
          const recordRange = getRange(record[type], step);
          const rangeMatch = result.find((r) => r.range === recordRange);
          if (rangeMatch) {
            rangeMatch.count++;
          }
        });
        return result;
      };
      return { min, max, avg, tiers: tiers() };
    },
  },
  getters: {
    wpm() {
      if (this.data) {
        return this.populate("wpm");
      }
    },
    cpm() {
      if (this.data) {
        return this.populate("cpm", 50);
      }
    },
    acc() {
      if (this.data) {
        return this.populate("acc", 5);
      }
    },
    count() {
      return this.data?.length || 0;
    },
  },
});
