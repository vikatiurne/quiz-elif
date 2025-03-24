"use client";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import AddQuestion from "./AddQuestion";
import { useDispatch, useSelector } from "react-redux";
import { QuizFormValue } from "@/types/types";
import {
  fetchCreate,
  fetchQuizById,
  fetchUpdate,
} from "@/app/redux/features/quizSlice";
import { RootState } from "@/app/redux/store";
import { useParams, useRouter } from "next/navigation";
import { fetchAddResult } from "@/app/redux/features/resultSlice";

const initialValue: QuizFormValue = {
  quizdata: { title: "", description: "", editsTime: 0 },
  questiondata: [
    {
      _id: "",
      question_text: "",
      question_type: "",
      answers: [
        { _id: "", isCorrect: false, answer_text: "", question_id: "" },
      ],
    },
  ],
};

const QuizForm: React.FC = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isRun, setIsRun] = useState<boolean>(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const { id } = useParams();
  const quizId = Array.isArray(id) ? id[0] : id;

  useEffect(() => {
    dispatch(fetchQuizById(quizId));
  }, [dispatch,quizId]);

  const { quiz } = useSelector((state: RootState) => state.quiz);

  const methods = useForm<QuizFormValue>({
    defaultValues: initialValue,
  });

  const {
    formState: { errors },
  } = methods;

  useEffect(() => {
    const editing = localStorage.getItem("__quiz_edit");
    if (editing === "edit") {
      setIsEdit(true);
    }
    const running = localStorage.getItem("__quiz_run");
    if (running === "run") {
      setIsRun(true);
    }
  }, []);

  useEffect(() => {
    if (isEdit && quiz) {
      methods.reset({
        quizdata: {
          title: quiz.quizdata.title,
          description: quiz.quizdata.description,
          editsTime: quiz.quizdata.editsTime,
        },
        questiondata: quiz.questiondata.map((question) => ({
          question_text: question.question_text,
          question_type: question.question_type,
          answers: question.answers.map((answer) => ({
            _id: answer._id,
            isCorrect: answer.isCorrect,
            answer_text: answer.answer_text,
            question_id: question._id,
          })),
        })),
      });
    }
  }, [isEdit, quiz, methods]);

  useEffect(() => {
    if (isRun && quiz) {
      methods.reset({
        quizdata: {
          title: quiz.quizdata.title,
          description: quiz.quizdata.description,
          editsTime: quiz.quizdata.editsTime,
        },
        questiondata: quiz.questiondata.map(
          (question) => (
            {
              question_text: question.question_text,
              question_type: question.question_type,
              answers: question.answers.map((answer) => ({
                _id: answer._id,
                isCorrect: false,
                question_id: question._id,
                answer_text:
                  question.question_type !== "text" ? answer.answer_text : "",
              })),
            }
          )
        ),
      });
      console.log(quiz);
    }
  }, [isRun, quiz, methods]);

  const onSubmit = (data: QuizFormValue) => {
    console.log(data);
    data.quizdata.editsTime = quiz.quizdata.editsTime;
    methods.reset();
    if (isEdit) {
      dispatch(fetchUpdate({ id: quizId, quiz: data }));
    } else if (isRun) {
      dispatch(
        fetchAddResult({ id: quizId, time: timeValue, useranswers: data })
      );
    } else {
      dispatch(fetchCreate(data));
    }

    router.push("/");
  };

  const handleCancel = () => {
    router.push("/");
    methods.reset();
  };

  const err = errors.quizdata?.title && (
    <p className="text-red-500 text-sm">{errors.quizdata.title.message}</p>
  );

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="w-full mx-auto"
      >
        <input
          className="p-2 border border-gray-300 rounded w-2/3 "
          type="text"
          placeholder="Add quiz title"
          {...methods.register("quizdata.title", {
            required: "This field is required",
          })}
        />
        {err}
        <textarea
          className="p-2 border border-gray-300 rounded mt-4  w-2/3"
          placeholder="Add description"
          {...methods.register("quizdata.description", {
            required: "This field is required",
          })}
        />
        {err}
        <AddQuestion />
        <div className="flex justify-between w-2/3 mx-auto">
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-500 text-white p-2 rounded"
          >
            Cancel
          </button>
          <button type="submit" className="bg-green-500 text-white p-2 rounded">
            {!isRun ? "Save" : "Send"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default QuizForm;
