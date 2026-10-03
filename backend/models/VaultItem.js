import mongoose from 'mongoose';

const vaultItemSchema = new mongoose.Schema(
  {
    site: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Site',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Site Photo', 'Contract', 'Delivery Slip', 'Invoice / Receipt', 'Daily Progress', 'Other'],
    },
    fileUrl: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isRestricted: {
      type: Boolean,
      default: false,
    },
    allowedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    accessRequests: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        requestedAt: { type: Date, default: Date.now },
        status: { type: String, enum: ['Pending', 'Approved', 'Denied'], default: 'Pending' },
      },
    ],
    notes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('VaultItem', vaultItemSchema);