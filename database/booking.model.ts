import mongoose, { Schema, Document, Model } from 'mongoose';
import { IEvent } from './event.model';

export interface IBooking extends Document {
  eventId: mongoose.Types.ObjectId | IEvent;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

interface BookingModel extends Model<IBooking> {
  validateEventExists(eventId: mongoose.Types.ObjectId): Promise<boolean>;
}

const BookingSchema = new Schema<IBooking, BookingModel>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      required: [true, 'Event ID is required'],
      ref: 'Event',
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
  },
  { timestamps: true }
);

BookingSchema.index({ eventId: 1 });

BookingSchema.statics.validateEventExists = async function (
  eventId: mongoose.Types.ObjectId
): Promise<boolean> {
  const event = await mongoose.model<IEvent>('Event').findById(eventId);
  return !!event;
};

BookingSchema.pre<IBooking>('save', async function (next) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(this.email)) {
    return next(new Error('Invalid email format'));
  }

  const exists = await (this.constructor as BookingModel).validateEventExists(
    this.eventId
  );
  if (!exists) {
    return next(new Error('Referenced event does not exist'));
  }

  next();
});

export const Booking = mongoose.model<IBooking, BookingModel>('Booking', BookingSchema);
