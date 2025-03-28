import pool from "../config/db.js";

// Agregar respuesta del usuario
export const createUserAnswer = async (userId, questionId, userAnswer, isCorrect) => {
  const [result] = await pool.query(
    `INSERT INTO user_answers (user_id, question_id, user_answer, is_correct) 
     VALUES (?, ?, ?, ?)`,
    [userId, questionId, userAnswer, isCorrect]
  );
  return { id: result.insertId, userId, questionId, userAnswer, isCorrect };
};

// Obtener las respuestas de un usuario
export const getUserAnswers = async (userId) => {
  const [rows] = await pool.query(
    `SELECT ua.*, q.description, q.correctAnswer 
     FROM user_answers ua
     JOIN questions q ON ua.question_id = q.id
     WHERE ua.user_id = ?`,
    [userId]
  );
  return rows;
};

// Verificar si un usuario ya respondió una pregunta
export const checkIfAnswered = async (userId, questionId) => {
  const [rows] = await pool.query(
    `SELECT * FROM user_answers 
     WHERE user_id = ? AND question_id = ?`,
    [userId, questionId]
  );
  return rows.length > 0;  // true si ya respondió, false si no
};
