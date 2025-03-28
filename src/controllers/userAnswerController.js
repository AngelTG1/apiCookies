import {
    answerQuestion as serviceAnswerQuestion,
    getUserResponses as serviceGetUserResponses
  } from "../services/userAnswerService.js";
  
  export const answerQuestion = async (req, res) => {
    const { userId, questionId, userAnswer } = req.body;
  
    try {
      const result = await serviceAnswerQuestion(userId, questionId, userAnswer);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  export const getUserAnswers = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const answers = await serviceGetUserResponses(userId);
      res.status(200).json(answers);
    } catch (error) {
      res.status(500).json({ message: "Error fetching user answers" });
    }
  };
  