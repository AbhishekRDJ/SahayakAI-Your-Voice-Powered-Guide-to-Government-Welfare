﻿# SahayakAI – Your Voice-Powered Guide to Government Welfare
 # https://sahayakai-mu.vercel.app/ 
 (underconstruction)

SahayakAI is a social welfare voice assistant designed to empower rural users (farmers, women, and more) by providing easy, voice-driven access to information about government schemes and farming help in their native language. The project combines a modern React frontend with a Node.js + Express backend, leveraging AI to answer user queries in a friendly, accessible way.

---

## 🚩 Problem Statement
Many rural citizens in India struggle to access information about government welfare schemes due to language barriers, literacy challenges, and lack of digital familiarity. There is a need for a simple, voice-based solution that can bridge this gap and make government resources truly accessible to all.

## 💡 Solution
SahayakAI enables users to ask questions (by voice or text) about government yojanas, farming, and social welfare. The app listens to their query, sends it to an AI agent, and delivers a clear, friendly answer—both as text and spoken aloud. The interface is designed to be mobile-friendly, accessible, and supportive of multiple Indian languages.

---

## ✨ Features
- **Voice Input:** Click the mic, speak your question, and see it transcribed instantly.
- **AI-Powered Answers:** Get instant, accurate responses about government schemes and welfare topics.
- **Speech Synthesis:** Answers are read aloud in a natural Indian voice (hi-IN preferred).
- **Chat Interface:** User and AI messages appear as chat bubbles for easy tracking.
- **Language Support:** UI ready for 15+ Indian languages (language selector included).
- **Responsive & Accessible:** Mobile-first, accessible design with clear feedback and error handling.
- **Loader & Error States:** Visual feedback while processing and clear error messages on failure.

---

## 🧱 Tech Stack
- **Frontend:** React.js, Tailwind CSS, Web Speech API (SpeechRecognition & SpeechSynthesis)
- **Backend:** Node.js, Express, Axios, dotenv, CORS
- **AI Integration:** OmniDimension AI agent (via REST API)

---

## 📦 Project Structure
```
hack-a-tone/
  client/      # React frontend (SahayakAI)
  server/      # Node.js + Express backend
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm

### 1. Clone the Repository
```bash
git clone <repo-url>
cd hack-a-tone
```

### 2. Backend Setup
```bash
cd server
npm install
# Create a .env file with your OmniDimension API credentials:
# OMNIDIM_API_KEY=your_api_key
# OMNIDIM_AGENT_ID=your_agent_id
npm run dev
```

### 3. Frontend Setup
```bash
cd ../client
npm install
npm run dev
```

### 4. Usage
- Open [http://localhost:5173](http://localhost:5173) in your browser.
- Click the mic, ask your question, and get instant answers!

---

## 🔗 API Reference
- **POST `/api/ask`**
  - Request: `{ "question": "your question here" }`
  - Response: `{ "answer": "AI's answer" }`

---

## 🤝 Contributing
We welcome contributions! Please open issues or pull requests for new features, bug fixes, or language support.

---

## 📄 License
MIT License

---

## 🙏 Acknowledgements
- Inspired by the vision of digital inclusion for all.
- Powered by [OmniDimension AI](https://omnidim.io/).
- Built with ❤️ for Hackathons and Social Good.
