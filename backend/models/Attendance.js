import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema(
  {
    site: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Site',
      required: true,
    },
    worker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Worker',
      required: true,
    },
    date: {
      type: String, // YYYY-MM-DD
      required: true,
    },
    status: {
      type: String,
      enum: ['Present', 'Half Day', 'Absent', 'Overtime'],
      default: 'Present',
    },
    earnedAmount: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    paidAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    paymentStatus: {
      type: String,
      enum: ['Unpaid', 'Paid in Full', 'Partial Payment'],
      default: 'Unpaid',
    },
    partialPaymentReason: {
      type: String,
      trim: true,
      default: '',
    },
    paymentMethod: {
      type: String,
      enum: ['Cash', 'M-Pesa', 'Bank Transfer', 'Pending'],
      default: 'Pending',
    },
    mpesaTransactionId: {
      type: String,
      trim: true,
      default: '',
    },
    loggedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    paidBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    notes: {
      type: String,
      trim: true,
      default: '',
    },
  },
  { timestamps: true }
);

// Prevent duplicate attendance logs for the same worker on the same site for the same day
attendanceSchema.index({ site: 1, worker: 1, date: 1 }, { unique: true });

export default mongoose.model('Attendance', attendanceSchema);