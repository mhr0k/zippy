import { defineStore } from "pinia";
import { getResults } from "@client/fetch.js";
import { getRange } from "@client/utils.js";
import { useTestSessionStore as session } from "@client/stores/testSessionStore";

export const useGlobalResultsStore = defineStore("globalResultsStore", {
  state: () => ({
    data: null,
    loading: false,
    count: 0,
  }),
  actions: {
    async fetch() {
      this.loading = true;
      const response = await getResults();
      if (response) {
        this.data = response;
        this.count = this.data?.length;
      }
      this.loading = false;
    },
    populate(type, step = 10) {
      const isCurrent = (range) => {
        const score = session().score[type];
        const scoreRange = getRange(score, step);
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
        while (index <= max) {
          const range = getRange(index, step);
          result.push({
            range,
            count: 0,
            current: isCurrent(range),
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
        return this.populate("acc");
      }
    },
  },
});
