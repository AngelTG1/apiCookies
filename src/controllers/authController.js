import { registerUser, loginUser } from '../services/authService.js';

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const result = await registerUser(username, email, password);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const { token, user } = await loginUser(email, password);

        // Excluir el password del objeto 'user'
        const { password: _, ...userWithoutPassword } = user;

        res.cookie('token', token, {
            httpOnly: true,
            secure: false, // Cambia a 'true' si usas HTTPS
            maxAge: 3600000 // 1 hora
        });

        res.status(200).json({
            message: 'Inicio de sesión exitoso',
            user: userWithoutPassword // Solo envío los campos deseados
        });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};
