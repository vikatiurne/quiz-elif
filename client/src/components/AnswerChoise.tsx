"use client";
import React, { useEffect, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

interface AnswerChoiseProps {
  type: string;
  questionIndex: number;
}

const AnswerChoise: React.FC<AnswerChoiseProps> = ({ type, questionIndex }) => {
  const { control } = useFormContext();
  const { fields, remove, append } = useFieldArray({
    control,
    name: `questiondata[${questionIndex}].answers`,
  });

  const [questionType, setQuestionType] = useState<string>("text");

  useEffect(() => {
    setQuestionType(type);
  }, [type]);

  return (
    <div>
      {fields.map((field, idx) => (
        <div key={field.id} className="flex mb-2 gap-2">
          <input
            type="text"
            {...control.register(
              `questiondata[${questionIndex}].answers[${idx}].answer_text`,
              {
                required: "This field is required",
              }
            )}
            className="p-2 rounded border border-gray-300 w-2/3"
            placeholder="Answer text"
          />
          {questionType === "single" && (
            <input
              type="radio"
              {...control.register(
                `questiondata[${questionIndex}].answers.isCorrect`
              )}
              value={idx}
              className="mr-2"
            />
          )}
          {questionType === "multiple" && (
            <input
              type="checkbox"
              {...control.register(
                `questiondata[${questionIndex}].answers[${idx}].isCorrect`
              )}
              className="mr-2"
            />
          )}
          <button
            type="button"
            onClick={() => remove(idx)}
            className="p-2 bg-red-500 rounded"
          >
            Delete
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => append({ isCorrect: false, answer_text: "" })}
        className="p-2 rounded bg-green-500 text-white"
      >
        Add new answer
      </button>
    </div>
  );
};

export default AnswerChoise;
