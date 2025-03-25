import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, getUserByEmail, getUserPassword } from '../repositories/userRepository.js';

const JWT_SECRET = process.env.JWT_SECRET;

export const registerUser = async (username, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser(username, email, hashedPassword);
    return { message: 'Usuario registrado con éxito' };
};

export const loginUser = async (email, password) => {
    
    const user = await getUserByEmail(email);

    if (!user) {
        throw new Error('Usuario no encontrado');
    }

    const isPasswordValid = getUserPassword(password)
    if (!isPasswordValid) {
        throw new Error('Contraseña incorrecta');
    }

    const token = jwt.sign(
        { id: user.id, username: user.username, email: user.email },
        JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES || '1h' }  
    );
    

    return { token, user };
};
