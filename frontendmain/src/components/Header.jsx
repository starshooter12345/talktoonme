import { useRef, useEffect, useState } from "react";
import { useChat } from "../hooks/useChat";
import { useSpeechRecognition } from "../hooks/useSpeechRecognition";
import microphoneIcon from "../assets/mic.png";

export const Header = ({ onSelectAvatar, showLeva, onToggleLeva, hidden }) => {
  const input = useRef();
  const { chat, loading, cameraZoomed, setCameraZoomed, message } = useChat();
  const {
    text,
    isListening,
    startListening,
    stopListening,
    isPaused,
    time,
    pauseListening,
    setRecordingDuration
  } = useSpeechRecognition();

  const [showBar, setShowBar] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [showModeToggle, setShowModeToggle] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isMessageSent, setIsMessageSent] = useState(false);

  // Preferences state management
  const [recordingTime, setRecordingTime] = useState("10");
  const [inputMethod, setInputMethod] = useState("Microphone");
  const [pitchSpeed, setPitchSpeed] = useState("1");

  useEffect(() => {
    if (text) {
      input.current.value = text;
    }
  }, [text]);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleRecordingTimeChange = (e) => {
    const value = e.target.value;
    setRecordingTime(value);
    setRecordingDuration(value === "Hold" ? "Hold" : parseInt(value));
  };

  const handleStartListening = () => {
    if (recordingTime === "Hold") {
      startListening();
    } else {
      startListening(parseInt(recordingTime));
    }
  };

  const sendMessage = () => {
    const msg = input.current.value;
    if (!loading && !message && msg.trim()) {
      chat(msg);
      input.current.value = "";
      setShowBar(true);
      setIsMessageSent(true);
    }
  };

  const savePreferences = () => {
    setShowPreferences(false);
    // Apply any preference changes here
  };

  if (hidden) return null;

  return (
    <>
      {/* Settings Bar with Toggle Switch */}
      <div className="w-full flex justify-between items-center bg-[rgb(0,34,147)] text-white px-6 py-3 shadow-md relative">
        <div className="text-lg font-semibold">AI Companion</div>

        {/* Toggle Switch Container */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsDropdownOpen(!isDropdownOpen);
              }}
              className="flex items-center"
            >
              Settings ▾
            </button>
            {isDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-56 bg-white text-black shadow-lg rounded-md z-50"
                onClick={(e) => e.stopPropagation()}
              >
                <ul>
                  <li
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => {
                      onSelectAvatar();
                      setIsDropdownOpen(false);
                    }}
                  >
                    Select Avatar
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex justify-between items-center">
                    <span className="text-sm">Customize</span>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showLeva}
                        onChange={onToggleLeva}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 relative">
                        <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5"></div>
                      </div>
                    </label>
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => {
                      setShowPreferences(true);
                      setIsDropdownOpen(false);
                    }}
                  >
                    Input Settings
                  </li>
                </ul>
              </div>
            )}
          </div>
          <button className="bg-red-600 text-white px-3 py-1 rounded">
            Log Out
          </button>
        </div>
      </div>

      {/* Click catcher to close dropdown */}
      {isDropdownOpen && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}

      {/* Preferences Modal */}
      {showPreferences && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md relative max-w-md w-full">
            <button
              onClick={() => setShowPreferences(false)}
              className="absolute top-2 right-2 text-lg font-bold"
            >
              ✖
            </button>
            <h2 className="text-xl font-semibold mb-4">Input Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Recording Time</label>
                <select
                  className="w-full border p-2 rounded"
                  value={recordingTime}
                  onChange={handleRecordingTimeChange}
                >
                  <option value="10">10 seconds</option>
                  <option value="20">20 seconds</option>
                  <option value="Hold">Hold (Max 25s)</option>
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">Input Method</label>
                <select
                  className="w-full border p-2 rounded"
                  value={inputMethod}
                  onChange={(e) => setInputMethod(e.target.value)}
                >
                  <option>Microphone</option>
                  <option>Text</option>
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">Pitch Speed</label>
                <select
                  className="w-full border p-2 rounded"
                  value={pitchSpeed}
                  onChange={(e) => setPitchSpeed(e.target.value)}
                >
                  <option value="0.5">0.5 seconds</option>
                  <option value="1">1 second</option>
                  <option value="1.5">1.5 seconds</option>
                </select>
              </div>
              <button
                className="mt-4 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded"
                onClick={savePreferences}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mode Toggle Modal */}
      {showModeToggle && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md relative max-w-sm w-full">
            <button
              onClick={() => setShowModeToggle(false)}
              className="absolute top-2 right-2 text-lg font-bold"
            >
              ✖
            </button>
            <h2 className="text-lg font-semibold mb-4">Toggle Mode</h2>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                className="sr-only peer"
              />
              <div className="w-14 h-8 bg-gray-300 rounded-full peer peer-checked:bg-green-500 relative transition-all">
                <div className="absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform peer-checked:translate-x-6"></div>
              </div>
              <span className="ml-3 text-sm font-medium text-gray-700">
                {darkMode ? "Dark" : "Light"} Mode
              </span>
            </label>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="fixed top-0 left-0 right-0 bottom-0 z-10 flex justify-between p-4 flex-col pointer-events-none">
        <div className="self-start mt-16 backdrop-blur-md bg-white bg-opacity-50 p-4 rounded-lg pointer-events-auto">
          <h1 className="font-black text-xl">Sarah here</h1>
          <p>Hope this survey will be fun and interactive</p>
        </div>

        {isMessageSent && (
          <div className="flex justify-center pointer-events-auto mt-2 mb-1 absolute bottom-4 w-full">
            <div className="flex gap-4">
              <button className="bg-pink-500 text-white px-4 py-2 rounded-md">
                Resubmit
              </button>
              <button className="bg-pink-500 text-white px-4 py-2 rounded-md">
                Next Question
              </button>
              <button className="bg-red-600 text-white px-4 py-2 rounded-md">
                Terminate Session
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-col items-center pointer-events-auto max-w-screen-sm w-full mx-auto gap-3">
          <div style={{ position: "relative", marginBottom: "20px" }}>
            <button
              className="mic-button"
              onClick={() => {
                if (isListening) stopListening();
                else handleStartListening();
              }}
              aria-label={isListening ? "Stop recording" : "Start recording"}
              style={{ position: 'absolute', top: '1' }}
            >
              <div className="mic-container">
                {isListening && (
                  <div className="sound-waves left-waves">
                    {[...Array(3)].map((_, i) => (
                      <div key={`left-${i}`} className="wave-bar" style={{ '--i': i }}></div>
                    ))}
                  </div>
                )}

                <div className="mic-icon-wrapper">
                  <img
                    src={microphoneIcon}
                    className="mic-icon"
                    alt="Microphone"
                  />
                  {isListening && <div className="pulse-effect"></div>}
                </div>

                {isListening && (
                  <div className="sound-waves right-waves">
                    {[...Array(3)].map((_, i) => (
                      <div key={`right-${i}`} className="wave-bar" style={{ '--i': i }}></div>
                    ))}
                  </div>
                )}
              </div>

              {isListening && (
                <div className="recording-text">Recording ({time}s)</div>
              )}
            </button>
          </div>

          {!isMessageSent && (
            <div className="relative w-full">
              <textarea
                ref={input}
                rows={3}
                className="w-full placeholder:text-gray-800 placeholder:italic p-4 rounded-md bg-opacity-50 bg-white backdrop-blur-md resize-none overflow-y-auto max-h-[120px] min-h-[80px]"
                placeholder="Type a message..."
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
              ></textarea>

              <button
                disabled={loading || message}
                onClick={sendMessage}
                className="bg-pink-500 hover:bg-pink-600 text-white w-10 h-10 flex items-center justify-center rounded-full shadow-md absolute top-1 right-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};