import QuizForm from "@/components/QuizForm";
import React from "react";

interface EditPageProps {
  children: React.ReactNode;
}

const EditPage: React.FC<EditPageProps> = ({ children }) => {
  return (
    <div className="pt-4 text-center">
      <h1 className="text-3xl text-center font-bold mb-4">Edit quiz</h1>
      <QuizForm />
    </div>
  );
};

export default EditPage;
