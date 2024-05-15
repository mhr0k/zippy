import { model, Schema } from "mongoose";

const ResultSchema = new Schema({
  wpm: { type: Number, required: true, min: 3, max: 350 },
  cpm: { type: Number, required: true, min: 3, max: 3000 },
  acc: { type: Number, required: true, min: 0, max: 100 },
  createdAt: { type: Date, default: Date.now, immutable: true },
});

export const Result = model("Result", ResultSchema);

const getResults = async () => await Result.find().select("-_id wpm cpm acc");
const getResultById = async (id) => await Result.findById(id);
const pushResult = async (body) => await new Result(body).save();

export default { getResults, getResultById, pushResult };
