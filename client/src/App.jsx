
import { useState } from 'react';
import Header from './components/Header.jsx';
import ChatBubbles from './components/ChatBubbles.jsx';
import VoiceButton from './components/VoiceButton.jsx';
import TranscriptDisplay from './components/TranscriptDisplay.jsx';
import ErrorMessage from './components/ErrorMessage.jsx';
import Footer from './components/Footer.jsx';
import { useSpeech } from './hooks/useSpeech.js';
import './App.css';

function App() {
  const [aiAnswer, setAiAnswer] = useState('');
  const [chat, setChat] = useState([]);
  const [fetching, setFetching] = useState(false);

  // useSpeech hook for voice recognition and synthesis
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
    setFetching(true);
    setAiAnswer('');
    setChat((prev) => [...prev, { type: 'user', text: question }]);
    try {
      const res = await fetch('http://localhost:5000/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // credentials:'include', (for future if we implment auth)
        body: JSON.stringify({ question }),
      });
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      setAiAnswer(data.answer);
      setChat((prev) => [...prev, { type: 'ai', text: data.answer }]);
      speakAnswer(data.answer);
    } catch (err) {
      setChat((prev) => [...prev, { type: 'ai', text: 'Failed to get answer. Please try again.' }]);
    } finally {
      setFetching(false);
    }
  };

  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-blue-50 to-blue-200 min-h-screen font-sans">
      <Header />
      <main className="flex flex-col flex-1 items-center px-4 w-screen max-w-screen">
        <ChatBubbles chat={chat} />
        <TranscriptDisplay transcript={transcript} />
        <ErrorMessage error={speechError} />
        <VoiceButton onClick={startListening} loading={listening || fetching} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
