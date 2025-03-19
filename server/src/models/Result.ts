import mongoose, { Document, Schema } from "mongoose";

export interface IResult extends Document {
  quiz_id: mongoose.Types.ObjectId;
  submitingTime: string;
}

const ResultSchema: Schema = new Schema({
  quiz_id: { type: mongoose.Types.ObjectId, ref: "Quiz", required: true },
  submitingTime: { type: String, required: true },
});



const Result = mongoose.model<IResult>("Result", ResultSchema);

export default Result;
