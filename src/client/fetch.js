const cfg = {
  server: "/.netlify/functions",
};

/**
 * @description Post a single test result to the server
 * @param {{wpm: number, cpm: number, acc: number}} data
 * @returns {JSON}
 */
export async function postResult(data) {
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(`${cfg.server}/results`, options);
    const json = await response.json();
    console.log(json);
  } catch (e) {
    console.log(e);
  }
}

/**
 * @description Gets results from the server along with metadata (number of records, average wpm and accuracy)
 * @returns {JSON}
 */
export async function getResults() {
  try {
    const response = await fetch(`${cfg.server}/results`);
    if (response.ok) {
      const json = await response.json();
      return json;
    }
  } catch (e) {
    console.log(e.error);
  }
}
