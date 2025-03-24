import QuizForm from "@/components/QuizForm";
import React from "react";



const EditPage: React.FC = () => {
  return (
    <div className="pt-4 text-center">
      <h1 className="text-3xl text-center font-bold mb-4">Edit quiz</h1>
      <QuizForm />
    </div>
  );
};

export default EditPage;
