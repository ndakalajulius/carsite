// utils/jwt.js
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const generateToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
};

export const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};
