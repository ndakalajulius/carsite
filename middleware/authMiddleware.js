// middleware/authMiddleware.js
import { verifyToken } from '../utils/jwt';
import User from '../models/User';
import dbConnect from '../lib/mongodb';

export const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Not authenticated' });

    try {
        const decoded = verifyToken(token);
        await dbConnect();
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

export const adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    next();
};
