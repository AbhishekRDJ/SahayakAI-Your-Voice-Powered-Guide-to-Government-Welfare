import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, Copy, Edit3, Check, X } from 'lucide-react';
import colors from '../utils/colors';

function TranscriptDisplay({
  transcript,
  isListening = false,
  confidence = null,
  onEdit = null,
  onClear = null,
  language = 'hi-IN'
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(transcript || '');
  const [showCopied, setShowCopied] = useState(false);

  // Update edit text when transcript changes
  useEffect(() => {
    if (!isEditing) {
      setEditText(transcript || '');
    }
  }, [transcript, isEditing]);

  // Copy transcript to clipboard
  const copyToClipboard = () => {
    if (transcript) {
      navigator.clipboard.writeText(transcript);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    }
  };

  // Text-to-speech functionality
  const speakText = () => {
    if ('speechSynthesis' in window && transcript) {
      const utterance = new SpeechSynthesisUtterance(transcript);
      utterance.lang = language;
      speechSynthesis.speak(utterance);
    }
  };

  // Handle edit save
  const handleSaveEdit = () => {
    if (onEdit) {
      onEdit(editText);
    }
    setIsEditing(false);
  };

  // Handle edit cancel
  const handleCancelEdit = () => {
    setEditText(transcript || '');
    setIsEditing(false);
  };

  // Get confidence color
  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.8) return 'text-green-600';
    if (confidence >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Get confidence text
  const getConfidenceText = (confidence) => {
    if (confidence >= 0.8) return 'High';
    if (confidence >= 0.6) return 'Medium';
    return 'Low';
  };

  if (!transcript && !isListening) return null;

  return (
    <div className="mb-4 px-4 w-full">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center space-x-2">
            <div className={`p-2 rounded-full ${isListening ? 'bg-red-100' : 'bg-blue-100'}`}>
              {isListening ? (
                <Mic className="w-4 h-4 text-red-600" />
              ) : (
                <MicOff className="w-4 h-4 text-blue-600" />
              )}
            </div>
            <div>
              <h3 className="font-medium text-gray-800 text-sm">
                {isListening ? 'सुन रहा है...' : 'Voice Transcript'}
              </h3>
              {confidence !== null && (
                <div className="flex items-center space-x-1 text-xs">
                  <span className="text-gray-500">Confidence:</span>
                  <span className={getConfidenceColor(confidence)}>
                    {getConfidenceText(confidence)} ({Math.round(confidence * 100)}%)
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          {transcript && !isListening && (
            <div className="flex items-center space-x-2">
              {onEdit && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="hover:bg-gray-100 p-2 rounded-full transition-colors duration-200"
                  title="Edit transcript"
                >
                  <Edit3 className="w-4 h-4 text-gray-600" />
                </button>
              )}
              <button
                onClick={speakText}
                className="hover:bg-blue-100 p-2 rounded-full transition-colors duration-200"
                title="Play audio"
              >
                <Volume2 className="w-4 h-4 text-blue-600" />
              </button>
              <button
                onClick={copyToClipboard}
                className="hover:bg-green-100 p-2 rounded-full transition-colors duration-200"
                title="Copy transcript"
              >
                {showCopied ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-600" />
                )}
              </button>
              {onClear && (
                <button
                  onClick={onClear}
                  className="hover:bg-red-100 p-2 rounded-full transition-colors duration-200"
                  title="Clear transcript"
                >
                  <X className="w-4 h-4 text-red-600" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Transcript Content */}
        <div className={`relative bg-sahayak-light text-sahayak-blue3 border border-sahayak-blue2 rounded-lg px-4 py-2 shadow-sm transition-all duration-300 ${isListening
          ? 'border-red-200 bg-red-50'
          : 'border-blue-200 hover:border-blue-300'
          }`}>
          {/* Listening Animation */}
          {isListening && (
            <div className="-top-1 -right-1 absolute bg-red-500 rounded-full w-4 h-4 animate-pulse"></div>
          )}

          {/* Content Area */}
          <div className="p-6">
            {isEditing ? (
              // Edit Mode
              <div className="space-y-4">
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="p-3 border border-gray-300 focus:border-blue-500 rounded-lg focus:ring-2 focus:ring-blue-500 w-full min-h-[100px] text-gray-800 resize-none"
                  placeholder="Edit your transcript here..."
                />
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={handleCancelEdit}
                    className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-gray-600 text-sm transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white text-sm transition-colors duration-200"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            ) : (
              // Display Mode
              <div className="text-center">
                {transcript ? (
                  <div className="space-y-2">
                    <div className="text-gray-800 text-lg leading-relaxed">
                      <span className="text-blue-600 text-2xl">"</span>
                      <span className="font-medium">{transcript}</span>
                      <span className="text-blue-600 text-2xl">"</span>
                    </div>
                    {isListening && (
                      <div className="flex justify-center items-center space-x-1 text-red-600 text-sm">
                        <div className="bg-red-500 rounded-full w-2 h-2 animate-bounce"></div>
                        <div className="bg-red-500 rounded-full w-2 h-2 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="bg-red-500 rounded-full w-2 h-2 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <span className="ml-2">Processing...</span>
                      </div>
                    )}
                  </div>
                ) : isListening ? (
                  <div className="py-8 text-center">
                    <div className="flex justify-center items-center bg-red-100 mx-auto mb-4 rounded-full w-16 h-16">
                      <Mic className="w-8 h-8 text-red-600 animate-pulse" />
                    </div>
                    <p className="mb-2 text-gray-600 text-lg">बोलना शुरू करें...</p>
                    <p className="text-gray-500 text-sm">Start speaking in your preferred language</p>
                    <div className="flex justify-center items-center mt-4">
                      <div className="flex space-x-1">
                        <div className="bg-red-400 rounded-full w-3 h-3 animate-bounce"></div>
                        <div className="bg-red-400 rounded-full w-3 h-3 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="bg-red-400 rounded-full w-3 h-3 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            )}
          </div>

          {/* Footer Info */}
          {transcript && !isEditing && (
            <div className="bg-gray-50 px-6 py-3 border-gray-200 border-t rounded-b-2xl">
              <div className="flex justify-between items-center text-gray-500 text-xs">
                <span>
                  {language === 'hi-IN' ? 'Hindi' : 'English'} •
                  {transcript.length} characters
                </span>
                {showCopied && (
                  <span className="font-medium text-green-600">
                    ✓ Copied to clipboard
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Help Text */}
        {!transcript && !isListening && (
          <div className="mt-4 text-gray-500 text-sm text-center">
            <p>Voice input will appear here</p>
            <p className="mt-1 text-xs">Supports Hindi, English, and other regional languages</p>
          </div>
        )}
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-pulse {
          animation: pulse 2s infinite;
        }
        
        .animate-bounce {
          animation: bounce 1s infinite;
        }
      `}</style>
    </div>
  );
}

export default TranscriptDisplay;