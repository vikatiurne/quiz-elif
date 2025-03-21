"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuizes } from "./redux/features/quizSlice";
import { Options } from "@/types/types";
import Link from "next/link";
import { RootState } from "./redux/store";
import QuizList from "@/components/QuizList";

const HomePage = () => {
  const { quizes, status } = useSelector((state: RootState) => state.quiz);

  const dispatch = useDispatch();

  useEffect(() => {
    const options: Options = {
      page: 1,
      limit: 20,
      sortBy: "createdAt",
      order: "desc",
    };
    dispatch(fetchQuizes(options));
  }, [dispatch]);

  useEffect(() => {
    localStorage.removeItem("__quiz_edit");
    localStorage.removeItem("__quiz_run");
  }, []);

  if (status === "loading") {
    return <p>Loaging...</p>;
  }

  return (
    <div className="p-4">
      {!quizes.length ? (
        <div className="text-center">
          <p className="pt-10 text-3xl mb-16">
            The quizes are not available. Start by creating a new quizes
          </p>
        </div>
      ) : (
        <QuizList />
      )}
      <Link href="create-quiz" className="mx-auto">
        <button className="p-2 rounded bg-green-500 uppercase text-xl cursor-pointer">
          Add new quiz
        </button>
      </Link>
    </div>
  );
};

export default HomePage;
