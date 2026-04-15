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

BookingSchema.pre<IBooking>('save', async function () {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(this.email)) {
    throw new Error('Invalid email format');
  }

  let eventIdObj: mongoose.Types.ObjectId;
  if (this.eventId instanceof mongoose.Types.ObjectId) {
    eventIdObj = this.eventId;
  } else if (typeof this.eventId === 'object' && this.eventId !== null) {
    eventIdObj = (this.eventId as IEvent)._id as mongoose.Types.ObjectId;
  } else {
    eventIdObj = new mongoose.Types.ObjectId(this.eventId as string);
  }

  const exists = await (this.constructor as BookingModel).validateEventExists(
    eventIdObj
  );
  if (!exists) {
    throw new Error('Referenced event does not exist');
  }
});

export const Booking = mongoose.model<IBooking, BookingModel>('Booking', BookingSchema);
