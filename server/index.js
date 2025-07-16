import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import askRoute from './routes/ask.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/ask', askRoute);

app.get('/', (req, res) => {
  res.send('OmniDimension AI backend is running.');
});

app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
}); 