import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, Zap, Loader2 } from 'lucide-react';

function VoiceButton({
  onClick,
  loading = false,
  isListening = false,
  disabled = false,
  language = 'hi'
}) {
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState([]);
  const [showTooltip, setShowTooltip] = useState(false);

  // Create ripple effect
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

    setRipples(prev => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
  };

  // Handle button click
  const handleClick = (event) => {
    if (!disabled && !loading) {
      createRipple(event);
      setIsPressed(true);
      setTimeout(() => setIsPressed(false), 150);
      onClick();
    }
  };

  // Get button text based on state and language
  const getButtonText = () => {
    if (loading) {
      return language === 'hi' ? 'सुन रहा है...' : 'Listening...';
    }
    if (isListening) {
      return language === 'hi' ? 'सुनना बंद करें' : 'Stop Listening';
    }
    return language === 'hi' ? 'आवाज़ से पूछें' : 'Ask with Voice';
  };

  // Get button icon based on state
  const getButtonIcon = () => {
    if (loading) {
      return <Loader2 className="w-6 h-6 animate-spin" />;
    }
    if (isListening) {
      return <MicOff className="w-6 h-6" />;
    }
    return <Mic className="w-6 h-6" />;
  };

  // Get button styling based on state
  const getButtonStyling = () => {
    if (disabled) {
      return 'bg-gray-400 cursor-not-allowed';
    }
    if (loading || isListening) {
      return 'bg-red-500 hover:bg-red-600 shadow-red-200';
    }
    return 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-blue-200';
  };

  return (
    <div className="flex flex-col items-center space-y-4 mt-6 mb-8">
      {/* Main Voice Button */}
      <div className="relative">
        <button
          className={`
            relative overflow-hidden
            ${getButtonStyling()}
            text-white font-semibold 
            py-4 px-8 rounded-full 
            shadow-lg hover:shadow-xl
            focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50
            transition-all duration-300 ease-in-out
            transform hover:scale-105 active:scale-95
            text-lg min-w-[200px]
            ${isPressed ? 'scale-95' : ''}
            ${loading || isListening ? 'animate-pulse' : ''}
            disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
          `}
          onClick={handleClick}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          aria-label={getButtonText()}
          disabled={disabled}
        >
          {/* Ripple Effects */}
          {ripples.map((ripple) => (
            <span
              key={ripple.id}
              className="absolute bg-white bg-opacity-30 rounded-full animate-ping"
              style={{
                left: ripple.x,
                top: ripple.y,
                width: ripple.size,
                height: ripple.size,
                animationDuration: '600ms'
              }}
            />
          ))}

          {/* Button Content */}
          <span className="z-10 relative flex justify-center items-center space-x-3">
            {getButtonIcon()}
            <span className="font-medium">{getButtonText()}</span>
          </span>

          {/* Animated Background Glow */}
          {(loading || isListening) && (
            <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-600 opacity-20 animate-pulse" />
          )}
        </button>

        {/* Listening Animation Rings */}
        {isListening && (
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="absolute border-4 border-red-400 border-opacity-30 rounded-full w-20 h-20 animate-ping animation-delay-0" />
            <div className="absolute border-4 border-red-400 border-opacity-20 rounded-full w-24 h-24 animate-ping animation-delay-200" />
            <div className="absolute border-4 border-red-400 border-opacity-10 rounded-full w-28 h-28 animate-ping animation-delay-400" />
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

      {/* Status Indicator */}
      <div className="flex items-center space-x-2 text-sm">
        <div className={`w-3 h-3 rounded-full ${disabled ? 'bg-gray-400' :
            loading || isListening ? 'bg-red-500 animate-pulse' : 'bg-green-500'
          }`} />
        <span className="font-medium text-gray-600">
          {disabled ? 'Microphone Unavailable' :
            loading ? 'Processing...' :
              isListening ? 'Listening for your voice' : 'Ready to listen'}
        </span>
      </div>

      {/* Quick Actions */}
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

      {/* Voice Level Indicator */}
      {isListening && (
        <div className="flex items-center space-x-1 bg-white shadow-md px-4 py-2 border border-red-200 rounded-full">
          <span className="mr-2 text-gray-600 text-sm">Voice Level:</span>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`w-1 h-6 rounded-full transition-all duration-200 ${i <= 3 ? 'bg-red-500 animate-pulse' : 'bg-gray-300'
                  }`}
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Custom CSS for animations */}
      <style jsx>{`
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
        
        @keyframes ping {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          75%, 100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-ping {
          animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
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
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
}

export default VoiceButton;