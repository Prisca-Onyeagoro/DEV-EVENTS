import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: [true, 'Title is required'] },
    slug: { type: String, unique: true },
    description: { type: String, required: [true, 'Description is required'] },
    overview: { type: String, required: [true, 'Overview is required'] },
    image: { type: String, required: [true, 'Image is required'] },
    venue: { type: String, required: [true, 'Venue is required'] },
    location: { type: String, required: [true, 'Location is required'] },
    date: { type: String, required: [true, 'Date is required'] },
    time: { type: String, required: [true, 'Time is required'] },
    mode: { type: String, required: [true, 'Mode is required'] },
    audience: { type: String, required: [true, 'Audience is required'] },
    agenda: { type: [String], required: [true, 'Agenda is required'] },
    organizer: { type: String, required: [true, 'Organizer is required'] },
    tags: { type: [String], required: [true, 'Tags are required'] },
  },
  { timestamps: true }
);

EventSchema.index({ slug: 1 }, { unique: true });

EventSchema.pre<IEvent>('save', async function () {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  if (this.isModified('date')) {
    const dateObj = new Date(this.date);
    if (isNaN(dateObj.getTime())) {
      throw new Error('Invalid date format');
    }
    this.date = dateObj.toISOString().split('T')[0];
  }

  if (this.isModified('time')) {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!timeRegex.test(this.time)) {
      throw new Error('Invalid time format');
    }
  }
});

export const Event = mongoose.model<IEvent>('Event', EventSchema);
