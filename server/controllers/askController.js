import axios from 'axios';

async function askOmniDimension(question) {
  const OMNI_API_KEY = process.env.OMNIDIM_API_KEY;
  const OMNI_AGENT_ID = process.env.OMNIDIM_AGENT_ID;
  const OMNI_API_URL = `https://api.omnidim.io/v1/agents/${OMNI_AGENT_ID}/interact`;

  const response = await axios.post(
    OMNI_API_URL,
    { input: question },
    {
      headers: {
        Authorization: `Bearer ${OMNI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data?.output || 'No answer received.';
}

export async function askController(req, res) {
  const { question } = req.body;
  if (!question) {
    return res.status(400).json({ error: 'Missing question in request body.' });
  }
  try {
    const answer = await askOmniDimension(question);
    res.json({ answer });
  } catch (error) {
    console.error('Error calling OmniDimension API:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to get answer from AI agent.' });
  }
} 