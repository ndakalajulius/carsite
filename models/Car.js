// models/Car.js
import mongoose from 'mongoose';

const CarSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    pricePerDay: { type: Number, required: true },
    available: { type: Boolean, default: true },
    description: { type: String },
    image: { type: String },
});

export default mongoose.models.Car || mongoose.model('Car', CarSchema);
