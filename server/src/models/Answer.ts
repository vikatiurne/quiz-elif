import mongoose, { Document, Schema } from "mongoose";

export interface IAnswer extends Document {
  question_id: mongoose.Types.ObjectId;
  isCorrect: boolean;
  answer_text: string;
}

const AnswerSchema: Schema = new Schema({
  question_id: {
    type: mongoose.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  isCorrect: { type: Boolean, default: false },
  answer_text: { type: String, required: true },
});

const Answer = mongoose.model<IAnswer>("Answer", AnswerSchema);

export default Answer;
