import mongoose, { Document, Schema } from "mongoose";
import Question from "./Question";
import Answer from "./Answer";
import Result from "./Result";
import UserAnswer from "./UserAnswer";

export interface IQuiz extends Document {
  title: string;
  description: string;
  editsTime: number;
  qtyQuestions: number;
}

const QuizSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    editsTime: { type: Number, default: 0 },
    qtyQuestions: { type: Number, required: true },
  },
  { timestamps: true }
);

QuizSchema.pre("deleteOne", async function (next: any) {
  try {
    const QuizModel = this.model;
    const quiz = await QuizModel.findById(this.getQuery()["_id"]);

    if (quiz) {
      await Question.deleteMany({ quiz_id: quiz._id });
      const questions = await Question.find({ quiz_id: quiz._id });
      await Answer.deleteMany({
        question_id: { $in: questions.map((q) => q._id) },
      });
      await Result.deleteMany({ quiz_id: quiz._id });
      await UserAnswer.deleteMany({
        question_id: { $in: questions.map((q) => q._id) },
      });
    }
  } catch (error) {
    next(error);
  }
});

const Quiz = mongoose.model<IQuiz>("Quiz", QuizSchema);

export default Quiz;
