import mongoose from 'mongoose';

const pettyCashSchema = new mongoose.Schema(
  {
    site: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Site',
      required: true,
    },
    transactionType: {
      type: String,
      enum: ['Float Top-Up', 'Expense Out'],
      required: true,
    },
    category: {
      type: String,
      enum: [
        'Float Disbursement',
        'Emergency Site Tools / Hardware',
        'Fuel & Oil (Generators/Pumps)',
        'Transport & Boda Fares',
        'Site Refreshments / Drinking Water',
        'Minor Repairs & Maintenance',
        'Miscellaneous / Other',
      ],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0.1,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    receiptUrl: {
      type: String, // Photo of paper receipt or voucher
      default: '',
    },
    mpesaRef: {
      type: String, // M-Pesa transaction code if paid digitally
      trim: true,
      default: '',
    },
    issuedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Contractor / PM who sent the float OR Clerk who logged expense
      required: true,
    },
    date: {
      type: String, // YYYY-MM-DD
      required: true,
    },
  },
  { timestamps: true }
);

pettyCashSchema.index({ site: 1, date: 1 });

export default mongoose.model('PettyCash', pettyCashSchema);