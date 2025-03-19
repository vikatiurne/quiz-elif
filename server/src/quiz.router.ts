import quizConrtoller from "./quiz-conrtoller"

const { Router } = require("express")

const router = new Router()

router.get("/getQuizes", quizConrtoller.getAllQuizes)
router.get("/getQuizById/:id", quizConrtoller.getQuizById)
router.post("/createQuiz", quizConrtoller.createQuiz)
router.put("/updateQuiz/:id", quizConrtoller.createQuiz)
router.get("/getResult/:id", quizConrtoller.createQuiz)
router.post("/createResult/:id", quizConrtoller.createQuiz)

export default router
