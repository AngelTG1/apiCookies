    import express from 'express'
    import { getAllQuestions, getQuestionById, checkAnswer, createQuestion, getQuestionByLevel } from '../controllers/questionController.js'

    const router = express.Router();

    router.get('/', getAllQuestions);
    router.get('/:id', getQuestionById);
    router.get('/level/:level', getQuestionByLevel);
    router.post('/', createQuestion);
    router.post('/:id/check', checkAnswer);

    export default router;