import { useState, useRef } from 'react';

export function useSpeech({ onResult }) {
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const recognitionRef = useRef(null);

  // Start voice recognition
  const startListening = () => {
    setError('');
    setTranscript('');
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      setError('Speech Recognition not supported in this browser.');
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'hi-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
      setLoading(false);
      if (onResult) onResult(text);
    };
    recognition.onerror = (event) => {
      setError('Voice recognition error: ' + event.error);
      setLoading(false);
    };
    recognitionRef.current = recognition;
    setLoading(true);
    recognition.start();
  };

  // Speak the AI's answer aloud
  const speakAnswer = (text) => {
    if (!('speechSynthesis' in window)) return;
    const utter = new window.SpeechSynthesisUtterance(text);
    utter.lang = 'hi-IN';
    const voices = window.speechSynthesis.getVoices();
    const hiVoice = voices.find(v => v.lang === 'hi-IN') || voices[0];
    if (hiVoice) utter.voice = hiVoice;
    window.speechSynthesis.speak(utter);
  };

  return { startListening, transcript, error, loading, speakAnswer };
} 