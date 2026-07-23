import mongoose from 'mongoose';

const siteSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    members: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        role: {
          type: String,
          enum: ['Admin', 'SiteClerk', 'Supervisor', 'Client'],
          default: 'SiteClerk',
        },
      },
    ],
    sitePin: {
      type: String,
      default: '1234',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Site', siteSchema);