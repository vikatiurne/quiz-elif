import QuizForm from "@/components/QuizForm";
import React from "react";

interface RunPageProps {
  children: React.ReactNode;
}

const RunPage: React.FC<RunPageProps> = ({ children }) => {
  return (
    <div className="pt-4 text-center">
      <h1 className="text-3xl text-center font-bold mb-4">Run quiz</h1>
      <QuizForm />
    </div>
  );
};

export default RunPage;