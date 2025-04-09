import { Options, Quiz, QuizFormValue } from "@/types/types";
import {
  fetchCreateQuiz,
  fetchDeleteQuiz,
  fetchGetQuizById,
  fetchGetQuizes,
  fetchUpdateQuiz,
} from "@/utils/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface QuizState {
  status: string;
  quizes: Quiz[];
  quiz: QuizFormValue;
}

const initialState: QuizState = {
  quizes: [],
  quiz: {
    quizdata: { title: "", description: "", editsTime: 0 },
    questiondata: [
      {
        _id: "",
        question_text: "",
        question_type: "",
        answers: [
          { isCorrect: false, answer_text: "", _id: "", question_id: "" },
        ],
      },
    ],
  },
  status: "idle",
};

export const fetchQuizes = createAsyncThunk<Quiz[], Options>(
  "quiz/fetchQuizes",
  async (options: Options) => {
    const responce = await fetchGetQuizes({ ...options });
    return responce;
  }
);

export const fetchQuizById = createAsyncThunk<QuizFormValue, string>(
  "quiz/fetchQuizById",
  async (id: string) => {
    const responce = await fetchGetQuizById(id);
    return responce;
  }
);
export const fetchCreate = createAsyncThunk(
  "quiz/fetchCreate",
  async (data: QuizFormValue) => {
    const responce = await fetchCreateQuiz(data);
    return responce;
  }
);
export const fetchUpdate = createAsyncThunk(
  "quiz/fetchUpdate",
  async (info: { id: string; quiz: QuizFormValue }) => {
    const responce = await fetchUpdateQuiz(info.id, info.quiz);
    return responce;
  }
);
export const fetchDelete = createAsyncThunk(
  "quiz/fetchDelete",
  async (id: string) => {
    const responce = await fetchDeleteQuiz(id);
    console.log(responce);
    return responce;
  }
);

const QuizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchQuizes.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.quizes = payload;
      })
      .addCase(fetchQuizes.rejected, (state) => {
        state.status = "error";
      })
      .addCase(fetchQuizById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchQuizById.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.quiz = payload;
      })
      .addCase(fetchQuizById.rejected, (state) => {
        state.status = "error";
      })
      .addCase(fetchCreate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCreate.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.quizes = payload;
      })
      .addCase(fetchCreate.rejected, (state) => {
        state.status = "error";
      })
      .addCase(fetchUpdate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUpdate.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.quizes = payload;
      })
      .addCase(fetchUpdate.rejected, (state) => {
        state.status = "error";
      })
      .addCase(fetchDelete.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDelete.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.quizes = state.quizes.filter((quiz) => quiz._id !== payload);
      })
      .addCase(fetchDelete.rejected, (state) => {
        state.status = "error";
      });
  },
});

export default QuizSlice.reducer;
