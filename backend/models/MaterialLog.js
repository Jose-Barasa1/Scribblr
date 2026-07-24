import mongoose from 'mongoose';

const materialLogSchema = new mongoose.Schema(
  {
    site: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Site',
      required: true,
    },
    material: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Material',
      required: true,
    },
    type: {
      type: String,
      enum: ['Delivery In', 'Usage Out'],
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0.1,
    },
    supplier: {
      type: String,
      trim: true,
      default: '', // For "Delivery In"
    },
    deliveryNoteNumber: {
      type: String,
      trim: true,
      default: '', // For "Delivery In" proof
    },
    unitCost: {
      type: Number,
      default: 0, // Total cost calculation for financial audit
    },
    purposeOrLocation: {
      type: String, // e.g., "Column pouring - Section 2"
      trim: true,
      default: '',
    },
    loggedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: String, // YYYY-MM-DD
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('MaterialLog', materialLogSchema);