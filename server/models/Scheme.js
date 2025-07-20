import mongoose from 'mongoose';

const SchemeSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  shortDescription: { type: String, required: true },
  fullDescription: { type: String, required: true },
  category: { type: String, required: true },
  state: { type: String, required: true },
  officialLink: { type: String, required: true },
  keywords: { type: [String], default: [] },

  eligibilityCriteria: { type: String },
  benefits: { type: [String], default: [] },
  howToApply: { type: String }, // step-by-step or link
  requiredDocuments: { type: [String], default: [] },
  targetAudience: { type: [String], default: [] }, // e.g., Farmers
  schemeType: { type: String }, // e.g., Subsidy, Pension
  applicationMode: { type: String }, // Online / Offline / Both
  languageSupport: { type: [String], default: [] }, // languages supported

  validityPeriod: {
    startDate: { type: Date },
    endDate: { type: Date }
  },

  contactInfo: {
    helpline: { type: String },
    email: { type: String },
    officeAddress: { type: String }
  },

  tags: { type: [String], default: [] },
  faqs: [{
    question: { type: String },
    answer: { type: String }
  }]

}, { timestamps: true });

export default mongoose.model('Scheme', SchemeSchema);
