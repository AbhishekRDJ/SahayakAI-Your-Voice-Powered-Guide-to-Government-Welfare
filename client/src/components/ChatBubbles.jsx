import React, { useEffect, useRef } from 'react';
import { User, Bot, Copy, Volume2, CheckCircle, Clock, AlertCircle } from 'lucide-react';

function ChatBubbles({ chat }) {
  const chatEndRef = useRef(null);
  const scrollContainerRef = useRef(null);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };
  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hi-IN';
      speechSynthesis.speak(utterance);
    }
  };
  const getStatusIcon = (status) => {
    switch (status) {
      case 'sent':
        return <CheckCircle className="w-3 h-3 text-blue-400" />;
      case 'delivered':
        return <CheckCircle className="w-3 h-3 text-green-400" />;
      case 'pending':
        return <Clock className="w-3 h-3 text-yellow-400" />;
      case 'error':
        return <AlertCircle className="w-3 h-3 text-red-400" />;
      default:
        return null;
    }
  };
  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };
  return (
    <div className="flex-1 bg-gradient-to-b from-blue-50 to-white mt-10 mb-4 rounded-2xl w-300 min-h-fit">
      <div
        ref={scrollContainerRef}
        className="space-y-4 px-4 py-6 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-50"
      >
        {chat.length === 0 ? (
          <div className="py-12 text-center">
            <div className="bg-white shadow-lg mx-auto p-8 border border-blue-100 rounded-2xl max-w-md">
              <div className="flex justify-center items-center bg-blue-100 mx-auto mb-4 rounded-full w-16 h-16">
                <Bot className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="mb-2 font-semibold text-gray-800 text-lg">
                नमस्ते! मैं SahayakAI हूं
              </h3>
              <p className="mb-4 text-gray-600 text-sm">
                सरकारी योजनाओं की जानकारी के लिए मुझसे पूछें
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="bg-blue-100 px-3 py-1 rounded-full text-blue-700 text-xs">
                  Voice Support
                </span>
                <span className="bg-green-100 px-3 py-1 rounded-full text-green-700 text-xs">
                  15+ Languages
                </span>
                <span className="bg-orange-100 px-3 py-1 rounded-full text-orange-700 text-xs">
                  24/7 Available
                </span>
              </div>
            </div>
          </div>
        ) : (
          chat.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} group animate-fadeIn`}
            >
              <div className={`flex items-start space-x-3 max-w-[85%] ${msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${msg.type === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white border-2 border-blue-200 text-blue-600'
                  }`}>
                  {msg.type === 'user' ? (
                    <User className="w-5 h-5" />
                  ) : (
                    <Bot className="w-5 h-5" />
                  )}
                </div>
                <div className={`flex flex-col ${msg.type === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`relative px-4 py-3 rounded-2xl shadow-md transition-all duration-200 hover:shadow-lg ${msg.type === 'user'
                    ? 'bg-blue-500 text-white rounded-tr-md'
                    : 'bg-white text-gray-800 border border-gray-200 rounded-tl-md'
                    }`}>
                    <div className="text-sm leading-relaxed whitespace-pre-wrap">
                      {msg.text}
                    </div>
                    <div className={`flex items-center space-x-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${msg.type === 'user' ? 'justify-end' : 'justify-start'
                      }`}>
                      {msg.type === 'bot' && (
                        <button
                          onClick={() => speakText(msg.text)}
                          className="hover:bg-blue-100 p-1 rounded-full transition-colors duration-200"
                          title="Listen"
                        >
                          <Volume2 className="w-3 h-3 text-blue-600" />
                        </button>
                      )}
                      <button
                        onClick={() => copyToClipboard(msg.text)}
                        className="hover:bg-gray-100 p-1 rounded-full transition-colors duration-200"
                        title="Copy"
                      >
                        <Copy className="w-3 h-3 text-gray-500" />
                      </button>
                    </div>
                  </div>
                  <div className={`flex items-center space-x-1 mt-1 px-2 ${msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}>
                    <span className="text-gray-500 text-xs">
                      {formatTime(msg.timestamp)}
                    </span>
                    {msg.type === 'user' && getStatusIcon(msg.status)}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
        {chat.length > 0 && chat[chat.length - 1]?.type === 'user' && (
          <div className="group flex justify-start">
            <div className="flex items-start space-x-3 max-w-[85%]">
              <div className="flex flex-shrink-0 justify-center items-center bg-white border-2 border-blue-200 rounded-full w-10 h-10 text-blue-600">
                <Bot className="w-5 h-5" />
              </div>
              <div className="bg-white shadow-md px-4 py-3 border border-gray-200 rounded-2xl rounded-tl-md">
                <div className="flex space-x-1">
                  <div className="bg-blue-400 rounded-full w-2 h-2 animate-bounce"></div>
                  <div className="bg-blue-400 rounded-full w-2 h-2 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="bg-blue-400 rounded-full w-2 h-2 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .scrollbar-thin {
          scrollbar-width: thin;
        }
        .scrollbar-thumb-blue-300::-webkit-scrollbar-thumb {
          background-color: #93c5fd;
          border-radius: 6px;
        }
        .scrollbar-track-blue-50::-webkit-scrollbar-track {
          background-color: #eff6ff;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
      `}</style>
    </div>
  );
}

export default ChatBubbles;