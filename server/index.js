import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import askRoute from './routes/ask.js';
import schemeRoute from './routes/scheme.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: [
    'https://sahayakai-mu.vercel.app ', // <-- replace with your actual Vercel domain
    'http://localhost:5173' // <-- for local dev, if needed
  ],
  credentials: true // if you use cookies/auth
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

app.use('/api/ask', askRoute);
app.use('/api/scheme', schemeRoute);

app.get('/', (req, res) => {
  res.send('sahayakAI backend is running.');
});

app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
}); 