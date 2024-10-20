// pages/api/users.js
import dbConnect from '../../lib/mongodb';
import User from '../../models/User';
import { generateToken } from '../../utils/jwt';

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'POST') {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const user = new User({ name, email, password });
        await user.save();
        const token = generateToken(user);
        res.status(201).json({ token, user: { id: user._id, name: user.name, role: user.role } });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
