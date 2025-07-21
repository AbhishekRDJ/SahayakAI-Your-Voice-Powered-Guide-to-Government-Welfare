import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function askGemini(question) {
  try {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const result = await model.generateContent(question);
    const response = await result.response;
    const text = response.text();

    console.log('Gemini response:', text);
    return text;
  } catch (error) {
    console.error('Gemini API error:', error.message);
    throw error;
  }
}

export async function askController(req, res) {
  const { question } = req.body;
  if (!question) {
    return res.status(400).json({ error: 'Missing question in request body.' });
  }

  try {
    const answer = await askGemini(question);
    res.json({ answer });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get answer from Gemini AI.' });
  }
}
