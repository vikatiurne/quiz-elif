import quizConrtoller from "./quiz-conrtoller";

const { Router } = require("express");

const router = new Router();

router.get("/getQuizes", quizConrtoller.getAllQuizes);
router.get("/getQuizById/:id", quizConrtoller.getQuizById);
router.post("/createQuiz", quizConrtoller.createQuiz);
router.put("/updateQuiz/:id", quizConrtoller.updeteQuiz);
router.put("/deleteQuiz/:id", quizConrtoller.deleteQuiz);
router.get("/getResult/:id", quizConrtoller.getResult);
router.post("/createResult/:id", quizConrtoller.createResult);

export default router;
