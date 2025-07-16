# OmniDimension AI Backend

This is a Node.js + Express backend for relaying user questions to the OmniDimension AI agent and returning answers to the frontend.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the `server/` directory with the following content:
   ```env
   OMNIDIM_API_KEY=your_omnidimension_api_key_here
   OMNIDIM_AGENT_ID=your_agent_id_here
   PORT=5000
   ```

3. Start the server:
   ```bash
   node index.js
   ```

## API

### POST `/api/ask`
- **Body:** `{ "question": "user question here" }`
- **Response:** `{ "answer": "..." }`
- **Errors:** Returns `{ error: "..." }` on failure

## Features
- Modular route design (`routes/ask.js`)
- Uses Axios to call OmniDimension API
- CORS enabled for frontend access
- Error handling and logging

---

For more details, see code comments. 