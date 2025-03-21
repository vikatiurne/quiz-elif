import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "./features/quizSlice";
import resultreducer from "./features/resultSlice";

export const store = configureStore({
  reducer: {
    quiz: quizReducer,
    result: resultreducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
