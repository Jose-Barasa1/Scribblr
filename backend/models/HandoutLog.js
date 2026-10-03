import mongoose from 'mongoose';

const handoutLogSchema = new mongoose.Schema(
  {
    site: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Site',
      required: true,
    },
    equipment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Equipment',
      required: true,
    },
    // The worker receiving the equipment
    workerName: {
      type: String,
      required: true,
      trim: true,
    },
    workerNationalId: {
      type: String,
      trim: true,
    },
    quantityIssued: {
      type: Number,
      required: true,
      default: 1,
      min: 1,
    },
    issuedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Site Clerk who logged it
      required: true,
    },
    issuedAt: {
      type: Date,
      default: Date.now,
    },
    expectedReturnDate: {
      type: Date,
    },
    returnedAt: {
      type: Date,
    },
    conditionOut: {
      type: String,
      enum: ['New', 'Fairly New', 'Old', 'Needs Repair'],
      required: true,
    },
    conditionIn: {
      type: String,
      enum: ['New', 'Fairly New', 'Old', 'Needs Repair'],
    },
    status: {
      type: String,
      enum: ['Checked Out', 'Returned', 'Overdue', 'Damaged/Lost'],
      default: 'Checked Out',
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('HandoutLog', handoutLogSchema);