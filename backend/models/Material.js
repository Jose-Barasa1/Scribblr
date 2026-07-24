import mongoose from 'mongoose';

const materialSchema = new mongoose.Schema(
  {
    site: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Site',
      required: true,
    },
    itemName: {
      type: String, // e.g., "Simba Cement 32.5", "Y12 Rebar", "Sand", "Diesel"
      required: true,
      trim: true,
    },
    unit: {
      type: String, // e.g., "Bags", "Tons", "Pieces", "Liters", "Trips"
      required: true,
      trim: true,
    },
    currentStock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    minimumThreshold: {
      type: Number, // Trigger low stock alert on dashboard when below this level
      default: 10,
    },
  },
  { timestamps: true }
);

// Prevent duplicate material entries for the same site
materialSchema.index({ site: 1, itemName: 1 }, { unique: true });

export default mongoose.model('Material', materialSchema);