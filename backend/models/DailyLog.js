import mongoose from 'mongoose';

const dailyLogSchema = new mongoose.Schema(
  {
    site: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Site',
      required: true,
    },
    date: {
      type: String, // YYYY-MM-DD
      required: true,
    },
    weatherCondition: {
      type: String,
      enum: ['Sunny / Clear', 'Overcast', 'Light Rain', 'Heavy Rain / Storm'],
      default: 'Sunny / Clear',
    },
    workDelayHours: {
      type: Number,
      default: 0,
      min: 0,
    },
    delayReason: {
      type: String,
      trim: true,
      default: '',
    },
    achievements: {
      type: String,
      required: true,
      trim: true,
    },
    // Toolbox talk topic & safety observations
    toolboxTalkTopic: {
      type: String,
      trim: true,
      default: 'General Site Safety & PPE Protocol',
    },
    incidentsOrSafetyIssues: {
      type: String,
      trim: true,
      default: 'None reported',
    },
    loggedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

dailyLogSchema.index({ site: 1, date: 1 }, { unique: true });

export default mongoose.model('DailyLog', dailyLogSchema);