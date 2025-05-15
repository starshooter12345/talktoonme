import { useRef, useEffect, useState } from "react";
import { useChat } from "../hooks/useChat";
import { useSpeechRecognition } from "../hooks/useSpeechRecognition";
import { SurveyInput } from "./SurveyInput";

// ✅ Emoji images
import stopwatchIcon from "../assets/stopwatch.png";
import micIcon from "../assets/microphone.png";
import keyboardIcon from "../assets/keyboard.jpeg";

export const Header = ({ onSelectAvatar, showLeva, onToggleLeva, hidden }) => {
  const input = useRef();
  const { chat, loading, message } = useChat();
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

  const [showPreferences, setShowPreferences] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isMessageSent, setIsMessageSent] = useState(false);

  // Preferences state
  const [recordingTime, setRecordingTime] = useState("10");
  const [inputMethod, setInputMethod] = useState("Microphone");
  const [pitchSpeed, setPitchSpeed] = useState("1");

  useEffect(() => {
    if (text) input.current.value = text;
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
    if (recordingTime === "Hold") startListening();
    else startListening(parseInt(recordingTime));
  };

  const sendMessage = () => {
    const msg = input.current.value;
    if (!loading && !message && msg.trim()) {
      chat(msg);
      input.current.value = "";
      setIsMessageSent(true);
    }
  };

  const savePreferences = () => setShowPreferences(false);

  if (hidden) return null;

  return (
    <>
      {/* Top Bar */}
      <div className="w-full flex justify-between items-center bg-[rgb(0,34,147)] text-white px-6 py-3 shadow-md relative">
        <div className="text-lg font-semibold">Talk Toon Me</div>

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
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => {
                    onSelectAvatar();
                    setIsDropdownOpen(false);
                  }}>
                    Select Avatar
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex justify-between items-center">
                    <span className="text-sm">Customize</span>
                    <label className="inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={showLeva} onChange={onToggleLeva} className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 relative">
                        <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5"></div>
                      </div>
                    </label>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex justify-between items-center">
                    <span className="text-sm">Green Screen</span>
                    <label className="inline-flex items-center cursor-pointer">
                      <input type="checkbox" onChange={(e) => {
                        const isChecked = e.target.checked;
                        document.body.classList.toggle("greenScreen", isChecked);
                      }} className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 relative">
                        <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5"></div>
                      </div>
                    </label>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => {
                    setShowPreferences(true);
                    setIsDropdownOpen(false);
                  }}>
                    Input Settings
                  </li>
                </ul>
              </div>
            )}
          </div>
          <button className="bg-red-600 text-white px-3 py-1 rounded">Log Out</button>
        </div>
      </div>

      {/* Overlay to close dropdown */}
      {isDropdownOpen && <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />}

      {/* Preferences Modal */}
      {showPreferences && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md relative max-w-md w-full">
            <button onClick={() => setShowPreferences(false)} className="absolute top-2 right-2 text-lg font-bold">✖</button>
            <h2 className="text-xl font-semibold mb-4">Input Settings</h2>

            <div className="space-y-4">
              {/* Recording Time */}
              <div>
                <label className="block font-medium mb-1 flex items-center gap-2">
                  <img src={stopwatchIcon} alt="Stopwatch" className="w-5 h-5" />
                  Recording Time
                </label>
                <select className="w-full border p-2 rounded" value={recordingTime} onChange={handleRecordingTimeChange}>
                  <option value="10">10 seconds</option>
                  <option value="20">20 seconds</option>
                  <option value="Hold">Hold (Max 25s)</option>
                </select>
              </div>

              {/* Input Method */}
              <div>
                <label className="block font-medium mb-1 flex items-center gap-2">
                  <img
                    src={inputMethod === "Microphone" ? micIcon : keyboardIcon}
                    alt="Input"
                    className="w-5 h-5"
                  />
                  Input Method
                </label>
                <select
                  className="w-full border p-2 rounded"
                  value={inputMethod}
                  onChange={(e) => setInputMethod(e.target.value)}
                >
                  <option>Microphone</option>
                  <option>Text</option>
                </select>
              </div>

              {/* Pitch Speed */}
              <div>
                <label className="block font-medium mb-1">Pitch Speed</label>
                <select className="w-full border p-2 rounded" value={pitchSpeed} onChange={(e) => setPitchSpeed(e.target.value)}>
                  <option value="0.5">0.5x</option>
                  <option value="1">1x</option>
                  <option value="1.5">1.5x</option>
                </select>
              </div>

              {/* Save Button Right Aligned */}
              <div className="flex justify-end">
                <button className="mt-4 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded" onClick={savePreferences}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Chat Input */}
      <SurveyInput
        isListening={isListening}
        stopListening={stopListening}
        handleStartListening={handleStartListening}
        time={time}
        input={input}
        loading={loading}
        message={message}
        sendMessage={sendMessage}
        isMessageSent={isMessageSent}
      />
    </>
  );
};
