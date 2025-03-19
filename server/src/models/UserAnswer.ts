import mongoose, { Document, Schema } from "mongoose";

export interface IUserAnswer extends Document {
  question_id: mongoose.Types.ObjectId;
  text: string;
}

const UserAnswerSchema: Schema = new Schema({
  question_id: {
    type: mongoose.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  text: { type: String, required: true },
});

const UserAnswer = mongoose.model<IUserAnswer>("UserAnswer", UserAnswerSchema);

export default UserAnswer;
