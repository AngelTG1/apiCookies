import pool from "../config/db.js";

export const getAll = async () => {
  const [rows] = await pool.query("SELECT * FROM questions");
  return rows;
};

export const create = async (question) => {  
  const { description, pattern, words, correctAnswer, level } = question;
  const [result] = await pool.query(
    "INSERT INTO questions (description, pattern, words, correctAnswer, level) VALUES (?, ?, ?, ?, ?)",
    [description, pattern, words, correctAnswer, level]
  );
  return { id: result.insertId, ...question };
};

export const getById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM questions WHERE id = ?", [id]);
  return rows[0] || null;
};

export const getBylevel = async (level) => {
    const [rows] = await pool.query("SELECT * FROM questions WHERE level = ?", [level]);
    return rows;  
};
