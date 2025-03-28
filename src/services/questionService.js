import { getBylevel, getAll, create, getById } from "../repositories/questionRepository.js";

export const getAllQuestions = async () => {
  return await getAll();
};

export const getQuestionById = async (id) => {
  return await getById(id);
};

export const createQuestion = async (question) => {
  return await create(question);
};

export const checkAnswer = async (id, answer) => {
  const question = await getById(id);
  if (!question) return false;
  return question.correctAnswer === answer;
};

// Usa la función correcta para obtener preguntas por nivel
export const getQuestionByLevel = async (level) => {
    return await getBylevel(level);  
};
