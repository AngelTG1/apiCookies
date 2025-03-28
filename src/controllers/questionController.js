import {
    getAllQuestions as serviceGetAllQuestions,
    getQuestionById as serviceGetQuestionById,
    createQuestion as serviceCreateQuestion,
    checkAnswer as serviceCheckAnswer,
    getQuestionByLevel as serviceGetQuestionByLevel
  } from "../services/questionService.js";
  
  export const getAllQuestions = async (req, res) => {
    try {
      const questions = await serviceGetAllQuestions();
      res.status(200).json(questions);
    } catch (error) {
      res.status(500).json({ message: "Error fetching questions" });
    }
  };
  
  export const getQuestionById = async (req, res) => {
    try {
      const question = await serviceGetQuestionById(req.params.id);
      if (question) {
        res.status(200).json(question);
      } else {
        res.status(404).json({ message: "Question not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching question" });
    }
  };

  export const getQuestionByLevel = async (req, res) => {
    try {
      const question = await serviceGetQuestionByLevel(req.params.level);
      if (question) {
        res.status(200).json(question);
      } else {
        res.status(404).json({ message: "Question not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching question" });
    }
  };
  
  export const createQuestion = async (req, res) => {
    try {
      const { description, pattern, words, correctAnswer, level } = req.body;
      const newQuestion = await serviceCreateQuestion({
        description,
        pattern,
        words,
        correctAnswer,
        level
      });
      res.status(201).json(newQuestion);
    } catch (error) {
      res.status(500).json({ message: "Error creating question" });
    }
  };
  
  export const checkAnswer = async (req, res) => {
    try {
      const { answer } = req.body;
      const isCorrect = await serviceCheckAnswer(req.params.id, answer);
  
      if (isCorrect === null) {
        return res.status(404).json({ message: "Question not found" });
      }
  
      res.status(200).json({ correct: isCorrect });
    } catch (error) {
      res.status(500).json({ message: "Error checking answer" });
    }
  };
  