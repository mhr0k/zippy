import connect from "@api/mongo/connect.js";
import model from "@api/mongo/result.js";

export const handler = async (req) => {
  await connect();

  // Get results
  if (req.httpMethod === "GET") {
    const results = await model.getResults();
    return { statusCode: 200, body: JSON.stringify(results) };
  }
  // Post result
  if (req.httpMethod === "POST") {
    try {
      await model.pushResult(JSON.parse(req.body));
      return { statusCode: 200, body: JSON.stringify(req.body) };
    } catch (e) {
      return { statusCode: 500, body: JSON.stringify({ error: e }) };
    }
  }

  // Default
  return { statusCode: 400 };
};
