import mongoose, { Document, Schema } from "mongoose";
import { IAnswer } from "./Answer";

export interface IQuestion extends Document {
  quiz_id: mongoose.Types.ObjectId;
  question_text: string;
  question_type: string;
  answers: IAnswer[];
}

const QuestionSchema: Schema = new Schema({
  quiz_id: { type: mongoose.Types.ObjectId, ref: "Quiz", required: true },
  question_text: { type: String, required: true },
  question_type: {
    type: String,
    enum: ["text", "single", "multiple"],
    required: true,
  },
  answers: [{ type: mongoose.Types.ObjectId, ref: "Answer" }],
});

const Question = mongoose.model<IQuestion>("Question", QuestionSchema);

export default Question;
