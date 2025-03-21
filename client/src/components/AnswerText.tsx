"use client";
import React from "react";
import { useFormContext } from "react-hook-form";

interface AnswerTextProps {
  questionIndex: number;
}

const AnswerText: React.FC<AnswerTextProps> = ({ questionIndex }) => {
  const { register } = useFormContext();
  return (
    <>
      <input
        type="text"
        {...register(
          `questiondata[${questionIndex}].answers[0].answer_text`, {
            required: "This field is required",
          }
        )}
        className="p-2 border border-gray-300 w-2/3 rounded mb-5"
        placeholder="Answer text"
      />
      <input
        type="checkbox"
        {...register(`questiondata[${questionIndex}].answers[0].isCorrect`)}
        className="hidden"
        defaultChecked={true}
      />
    </>
  );
};

export default AnswerText;
