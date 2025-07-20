import React, { useState } from 'react';
import { Mic, MicOff, Volume2, Zap, Loader2 } from 'lucide-react';
import colors from '../utils/colors';

function VoiceButton({
  onClick,
  loading = false,
  isListening = false,
  disabled = false,
  language = 'hi'
}) {
  const [ripples, setRipples] = useState([]);
  const [showTooltip, setShowTooltip] = useState(false);

  const createRipple = (event) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const newRipple = {
      x,
      y,
      size,
      id: Date.now()
    };

    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
  };

  const handleClick = (event) => {
    if (!disabled && !loading) {
      createRipple(event);
      onClick();
    }
  };

  const getButtonText = () => {
    if (loading) return language === 'hi' ? 'सुन रहा है...' : 'Listening...';
    if (isListening) return language === 'hi' ? 'सुनना बंद करें' : 'Stop Listening';
    return language === 'hi' ? 'आवाज़ से पूछें' : 'Ask with Voice';
  };

  const getButtonIcon = () => {
    if (loading) return <Loader2 className="w-6 h-6 animate-spin" />;
    if (isListening) return <MicOff className="w-6 h-6" />;
    return <Mic className="w-6 h-6" />;
  };

  return (
    <div className="flex flex-col items-center space-y-4 mt-6 mb-8">
      {/* Voice Button Container */}
      <div className="relative">
        <button
          className={`glow-button text-sahayak-light font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 ${loading ? 'opacity-60 cursor-not-allowed' : ''
            }`}
          onClick={handleClick}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          aria-label={getButtonText()}
          disabled={disabled}
        >
          {/* Ripples */}
          {ripples.map((ripple) => (
            <span
              key={ripple.id}
              className="absolute bg-white bg-opacity-30 rounded-full animate-ping pointer-events-none"
              style={{
                left: ripple.x,
                top: ripple.y,
                width: ripple.size,
                height: ripple.size,
                animationDuration: '600ms'
              }}
            />
          ))}

          {/* Button Text */}
          <span className="z-10 relative flex justify-center items-center space-x-3">
            {getButtonIcon()}
            <span className="font-medium">{getButtonText()}</span>
          </span>
        </button>

        {/* Glowing Balls While Listening */}
        {isListening && (
          <div className="z-0 absolute inset-0 flex justify-center items-center pointer-events-none">
            <div className="animation-delay-0 glow-ball" />
            <div className="animation-delay-200 glow-ball glow-ball-2" />
            <div className="animation-delay-400 glow-ball glow-ball-3" />
          </div>
        )}

        {/* Tooltip */}
        {showTooltip && !loading && !isListening && (
          <div className="-top-12 left-1/2 absolute bg-gray-800 shadow-lg px-3 py-1 rounded-lg text-white text-sm whitespace-nowrap -translate-x-1/2 animate-fadeIn transform">
            {language === 'hi' ? 'माइक दबाएं और बोलें' : 'Press mic and speak'}
            <div className="top-full left-1/2 absolute border-t-4 border-t-gray-800 border-transparent border-r-4 border-l-4 w-0 h-0 -translate-x-1/2 transform" />
          </div>
        )}
      </div>

      {/* Optional Status (Optional) */}
      <div className="flex items-center space-x-2 text-sm">
        <div
          className={`w-3 h-3 rounded-full ${disabled
            ? 'bg-gray-400'
            : loading || isListening
              ? 'bg-red-500 animate-pulse'
              : 'bg-green-500'
            }`}
        />
        <span className="font-medium text-gray-600">
          {disabled
            ? 'Microphone Unavailable'
            : loading
              ? 'Processing...'
              : isListening
                ? 'Listening for your voice'
                : 'Ready to listen'}
        </span>
      </div>

      {/* Extra Info */}
      <div className="flex items-center space-x-4 text-gray-500 text-xs">
        <div className="flex items-center space-x-1">
          <Volume2 className="w-4 h-4" />
          <span>Voice Support</span>
        </div>
        <div className="bg-gray-300 w-px h-4" />
        <div className="flex items-center space-x-1">
          <Zap className="w-4 h-4" />
          <span>Instant Response</span>
        </div>
        <div className="bg-gray-300 w-px h-4" />
        <div className="flex items-center space-x-1">
          <span>🌐</span>
          <span>15+ Languages</span>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .glow-button {
          background: linear-gradient(135deg, ${colors.blue1}, ${colors.blue2}, ${colors.blue3});
          border: none;
          color: ${colors.light};
          position: relative;
          overflow: hidden;
        }

        .glow-button:hover {
          background: linear-gradient(135deg, ${colors.blue1}, ${colors.blue2}, ${colors.blue3});
          box-shadow: 0 0 20px ${colors.blue1}, 0 0 30px ${colors.blue2}, 0 0 40px ${colors.blue3};
        }

        .glow-ball {
          position: absolute;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          border: 4px solid ${colors.blue1};
          opacity: 0.3;
          animation: ballPulse 2s infinite;
        }

        .glow-ball-2 {
          width: 160px;
          height: 160px;
          border-color: ${colors.blue1};
          animation-delay: 0.2s;
        }

        .glow-ball-3 {
          width: 200px;
          height: 200px;
          border-color: ${colors.blue3};
          animation-delay: 0.4s;
        }

        @keyframes ballPulse {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.3;
          }
          100% {
            transform: scale(1);
            opacity: 0.5;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animation-delay-0 {
          animation-delay: 0s;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  );
}

export default VoiceButton;
