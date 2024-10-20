// pages/api/auth.js
import dbConnect from '../../lib/mongodb';
import User from '../../models/User';
import { generateToken } from '../../utils/jwt';

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'POST') {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = generateToken(user);
        res.status(200).json({ token, user: { id: user._id, name: user.name, role: user.role } });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
