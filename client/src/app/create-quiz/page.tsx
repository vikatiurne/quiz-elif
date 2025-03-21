import QuizForm from "@/components/QuizForm";
import React from "react";

interface CreatePageProps {
  children: React.ReactNode;
}

const CreatePage: React.FC<CreatePageProps> = ({ children }) => {
  return (
    <div className="pt-4 text-center">
      <h1 className="text-3xl text-center font-bold mb-4">Create quiz</h1>
      <QuizForm />
    </div>
  );
};

export default CreatePage;
