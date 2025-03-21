"use client";
import React, { useEffect, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import AnswerText from "./AnswerText";
import AnswerChoise from "./AnswerChoise";
import { QuestionData } from "@/types/types";

interface QuestionTypeMap {
  [key: number]: string;
}

const AddQuestion: React.FC = () => {
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "questiondata",
  });

  const [questionType, setQuestionType] = useState<QuestionTypeMap>({});

  useEffect(() => {
    const initialTypes: QuestionTypeMap = {};
    fields.forEach((field: QuestionData, idx: number) => {
      initialTypes[idx] = field.question_type || "text";
    });
    setQuestionType(initialTypes);
  }, [fields]);


  const handleTypeChange = (idx: number, value: string) => {
    setQuestionType((prev) => ({ ...prev, [idx]: value }));
  };

  return (
    <div className="mt-8 ">
      {fields.map((field, idx) => (
        <div
          key={field.id}
          className="p-2 border border-gray-200 rounded shadow mb-4 bg-gray-100 w-2/3 mx-auto"
        >
          <h4 className="mb-2">{idx + 1}. Question</h4>
          <div className="flex gap-3 mb-3 ">
            <input
              type="text"
              {...register(`questiondata[${idx}].question_text`, {
                required: "This field is required",
              })}
              placeholder="Question text"
              className="p-2 rounded font-bold bg-gray-300"
            />

            <select
              {...register(`questiondata[${idx}].question_type`)}
              className="p-2 border border-gray-300 rounded"
              onChange={(e) => handleTypeChange(idx, e.target.value)}
              value={questionType[idx] || "text"}
            >
              <option value="text">Text</option>
              <option value="single">Single Choice</option>
              <option value="multiple">Multiple Choices</option>
            </select>

            <button
              className="bg-red-500 p-2 text-white rounded"
              type="button"
              onClick={() => remove(idx)}
            >
              Delete
            </button>
          </div>
          {questionType[idx] === "single" ||
          questionType[idx] === "multiple" ? (
            <AnswerChoise type={questionType[idx]} questionIndex={idx} />
          ) : (
            <AnswerText questionIndex={idx} />
          )}
        </div>
      ))}
      <button
        className="bg-blue-500 p-2 rounded text-white mb-4"
        type="button"
        onClick={() =>
          append({ question_text: "", question_type: "text", answers: [] })
        }
      >
        Add new question
      </button>
    </div>
  );
};

export default AddQuestion;
