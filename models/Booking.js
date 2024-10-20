// models/Booking.js
import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
    car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    totalPrice: { type: Number, required: true },
});

export default mongoose.models.Booking || mongoose.model('Booking', BookingSchema);
