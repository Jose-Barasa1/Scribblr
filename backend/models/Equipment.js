import mongoose from 'mongoose';

const equipmentSchema = new mongoose.Schema(
  {
    site: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Site',
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Safety Gear', 'Hand Tools', 'Heavy Machinery', 'Building Materials', 'Consumables', 'Other'],
    },
    identifierCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    color: {
      type: String,
      required: true,
      trim: true,
    },
    condition: {
      type: String,
      enum: ['New', 'Fairly New', 'Old', 'Needs Repair'],
      default: 'New',
    },
    quantityTotal: {
      type: Number,
      required: true,
      min: 0,
      default: 1,
    },
    quantityAvailable: {
      type: Number,
      required: true,
      min: 0,
      default: 1,
    },
    minStockAlertThreshold: {
      type: Number,
      default: 5,
    },
    requisitionStatus: {
      type: String,
      enum: ['None', 'Requested', 'Approved', 'Purchased/Repaired'],
      default: 'None',
    },
    storageLocation: {
      type: String,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Equipment', equipmentSchema);