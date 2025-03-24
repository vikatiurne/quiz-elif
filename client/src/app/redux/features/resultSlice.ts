import { Result, UserAnswer } from "@/types/types";
import { fetchCreateResult } from "@/utils/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ResultState {
  result: Result;
  status: string;
}

const initialState: ResultState = {
  status: "idle",
  result: {
    _id: "",
    quiz_id: "",
    submitingTime: "",
    useranswers: [],
    summary: { question: "", userAnswer: "", correctAnswer: "" },
  },
};

export const fetchAddResult = createAsyncThunk<
  Result,
  { id: string; time: string; userAnswers: UserAnswer[] }
>("quiz/fetchAddResult", async (info: { id; time; useranswers }) => {
  const responce = await fetchCreateResult(
    info.id,
    info.time,
    info.useranswers
  );
  console.log(responce);
  return responce;
});

const ResultSlice = createSlice({
  name: "result",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddResult.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddResult.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(fetchAddResult.rejected, (state) => {
        state.status = "error";
      });
  },
});

export default ResultSlice.reducer;
