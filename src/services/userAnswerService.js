import {
    createUserAnswer,
    getUserAnswers,
    checkIfAnswered
  } from "../repositories/userAnswerRepository.js";
  import { getById } from "../repositories/questionRepository.js";
  
  // Registrar respuesta del usuario
  export const answerQuestion = async (userId, questionId, userAnswer) => {
    const question = await getById(questionId);
    if (!question) {
      throw new Error("Question not found");
    }
  
    // Verificar si el usuario ya respondió la pregunta
    const alreadyAnswered = await checkIfAnswered(userId, questionId);
    if (alreadyAnswered) {
      throw new Error("You have already answered this question");
    }
  
    const isCorrect = question.correctAnswer === userAnswer;
    
    return await createUserAnswer(userId, questionId, userAnswer, isCorrect);
  };
  
  // Obtener las respuestas de un usuario
  export const getUserResponses = async (userId) => {
    return await getUserAnswers(userId);
  };
  