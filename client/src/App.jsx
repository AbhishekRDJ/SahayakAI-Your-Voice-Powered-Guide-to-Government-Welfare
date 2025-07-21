
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import ChatBubbles from './components/ChatBubbles.jsx';
import VoiceButton from './components/VoiceButton.jsx';
import TranscriptDisplay from './components/TranscriptDisplay.jsx';
import ErrorMessage from './components/ErrorMessage.jsx';
import Footer from './components/Footer.jsx';
import SahayakLanding from './pages/LandingPage.jsx';
import { useSpeech } from './hooks/useSpeech.js';
import SchemeSearch from './pages/SchemeSearch.jsx'
import SchemeDetails from './pages/SchemeDetails.jsx'
import Navigation from './components/Navigation.jsx'
import './App.css';

function App() {
  const [aiAnswer, setAiAnswer] = useState('');
  const [chat, setChat] = useState([]);
  const [fetching, setFetching] = useState(false);

  const {
    startListening,
    transcript,
    error: speechError,
    loading: listening,
    speakAnswer,
  } = useSpeech({
    onResult: (question) => handleSubmit(question),
  });

  const handleSubmit = async (question) => {
    const timestamp = Date.now();
    setFetching(true);
    setAiAnswer('');
    setChat((prev) => [
      ...prev,
      { type: 'user', text: question, status: 'sent', timestamp },
      { type: 'ai', text: '', status: 'pending', timestamp: Date.now() }
    ]);
    let answer = '';

    try {
      // const res = await fetch('https://sahayakai-your-voice-powered-guide-to.onrender.com/api/ask', {
      const res = await fetch('http://localhost:5000/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });

      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      answer = data.answer;
      setAiAnswer(answer);
      setChat((prev) => {
        const updated = [...prev];
        // Find last AI message with status 'pending'
        const idx = updated.map((m, i) => ({ ...m, i })).reverse().find(m => m.type === 'ai' && m.status === 'pending')?.i;
        if (idx !== undefined) {
          updated[idx] = {
            ...updated[idx],
            text: answer,
            status: 'delivered',
            timestamp: Date.now()
          };
        }
        return updated;
      });
      speakAnswer(answer);
    } catch (err) {
      setChat((prev) => {
        const updated = [...prev];
        const idx = updated.map((m, i) => ({ ...m, i })).reverse().find(m => m.type === 'ai' && m.status === 'pending')?.i;
        if (idx !== undefined) {
          updated[idx] = {
            ...updated[idx],
            text: 'Failed to get answer. Please try again.',
            status: 'error',
            timestamp: Date.now()
          };
        }
        return updated;
      });

    } finally {
      setFetching(false);
    }
  };

  return (
    <Routes>
      <Route path="/" element={<SahayakLanding />} />
      <Route path="/conversation" element={
        <div className="flex flex-col items-center bg-sahayak-light min-h-screen font-sans">

          <Header />
          <main className="flex flex-col flex-1 items-center px-4 w-screen max-w-screen">
            <ChatBubbles chat={chat} />
            <TranscriptDisplay transcript={transcript} />
            <ErrorMessage error={speechError} />
            <VoiceButton onClick={startListening} loading={listening || fetching} />
          </main>
          <Footer />
        </div>
      } />
      <Route path="/schemes" element={<SchemeSearch />} />
      <Route path="/schemes/:id" element={<SchemeDetails />} />
    </Routes>
  );
}

export default App;
