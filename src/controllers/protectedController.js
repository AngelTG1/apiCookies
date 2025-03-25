export const protectedRoute = (req, res) => {
    res.json({
        message: 'Acceso autorizado',
        user: req.user
    });
};
