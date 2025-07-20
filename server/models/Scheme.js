import mongoose from 'mongoose';

const SchemeSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  shortDescription: { type: String, required: true },
  fullDescription: { type: String, required: true },
  category: { type: String, required: true },
  state: { type: String, required: true },
  officialLink: { type: String, required: true },
  keywords: { type: [String], default: [] }
}, { timestamps: true });

export default mongoose.model('Scheme', SchemeSchema); 