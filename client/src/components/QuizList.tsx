import { RootState } from "@/app/redux/store";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dots from "../../public/dots.svg";
import Image from "next/image";
import Link from "next/link";
import { fetchDelete} from "@/app/redux/features/quizSlice";
import { Quiz } from "@/types/types";

const QuizList: React.FC = () => {
  const { quizes } = useSelector((state: RootState) => state.quiz);

  return (
    <ul className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {quizes.map((quiz) => (
        <QuizCard key={quiz._id} quiz={quiz} />
      ))}
    </ul>
  );
};

const QuizCard: React.FC<{ quiz:Quiz }> = ({ quiz }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const actionsRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useDispatch();

  const toggleMenu = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      actionsRef.current &&
      !actionsRef.current.contains(event.target as Node)
    ) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLinkEditClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    localStorage.setItem("__quiz_edit", "edit");
  };

  const handleLinkRunClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    localStorage.setItem("__quiz_run", "run");
  };

  const handleLinkDelete = (event: React.MouseEvent, id: string) => {
    event.stopPropagation();
    dispatch(fetchDelete(id));
  };

  return (
    <div className="relative p-3 rounded bg-gray-100 shadow">
      <li className="relative">
        <Image
          src={dots}
          alt="dots"
          className="h-6 w-6 absolute top-1 right-1 cursor-pointer"
          onClick={toggleMenu}
        />
        <h4 className="text-xl uppercase mb-4 font-bold">{quiz.title}</h4>
        <h5 className="mb-3">{quiz.description}</h5>
        <p className="text-blue-500">Questions: {quiz.qtyQuestions}</p>
        <p className="text-gray-500">Edits time: {quiz.editsTime}</p>
      </li>
      {isMenuOpen && (
        <div
          ref={actionsRef}
          className="z-50 p-3 absolute top-3 right-0 bg-gray-800 text-white rounded"
        >
          <Link href={`/edit-quiz/${quiz._id}`} onClick={handleLinkEditClick}>
            <p className="mb-3 cursor-pointer font-semibold uppercase">Edit</p>
          </Link>
          <Link href={`/run-quiz/${quiz._id}`} onClick={handleLinkRunClick}>
            <p className="mb-3 cursor-pointer font-semibold uppercase">Run</p>
          </Link>
          <button
            className="cursor-pointer font-semibold uppercase"
            onClick={(e) => handleLinkDelete(e, quiz._id)}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizList;
