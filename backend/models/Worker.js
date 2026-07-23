import mongoose from 'mongoose';

const workerSchema = new mongoose.Schema(
  {
    site: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Site',
      required: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    nationalId: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
      default: '',
    },
    trade: {
      type: String,
      required: true,
      enum: ['Mason', 'Carpenter', 'Steel Fixer', 'Electrician', 'Plumber', 'Painter', 'Casual Laborer', 'Plant Operator', 'Site Clerk', 'Other'],
      default: 'Casual Laborer',
    },
    dailyRate: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active',
    },
  },
  { timestamps: true }
);

// Ensures nationalId is unique PER site (allowing same worker on different independent sites)
workerSchema.index({ site: 1, nationalId: 1 }, { unique: true });

export default mongoose.model('Worker', workerSchema);