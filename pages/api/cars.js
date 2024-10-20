// pages/api/cars.js
import dbConnect from '../../lib/mongodb';
import Car from '../../models/Car';
import { authMiddleware, adminMiddleware } from '../../middleware/authMiddleware';

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'GET') {
        const cars = await Car.find();
        res.status(200).json(cars);
    } else if (req.method === 'POST') {
        const { name, category, pricePerDay, description, image } = req.body;
        const car = new Car({ name, category, pricePerDay, description, image });
        await car.save();
        res.status(201).json(car);
    } else if (req.method === 'DELETE') {
        const { id } = req.query;
        await Car.findByIdAndDelete(id);
        res.status(200).json({ message: 'Car deleted' });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
