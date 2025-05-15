import { useRef, useState } from "react";
import microphoneIcon from "../assets/new-image.png";

export const SurveyInput = ({
  isListening,
  stopListening,
  handleStartListening,
  time,
  input,
  loading,
  message,
  sendMessage,
  isMessageSent
}) => {
  const [micHidden, setMicHidden] = useState(false);

  const handleSendMessage = () => {
    setMicHidden(true);        // Hide mic only on send
    sendMessage();
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-10 flex flex-col justify-between p-4 pointer-events-none">
      
      {/* Greeting */}
      <div className="self-start mt-16 backdrop-blur-md bg-white bg-opacity-50 p-4 rounded-lg pointer-events-auto">
        <h1 className="font-black text-xl">Sarah here</h1>
        <p>Hope this survey will be fun and interactive</p>
      </div>

      {/* Mic + Input Area */}
      <div className="flex flex-col items-center justify-end pointer-events-auto max-w-screen-sm w-full mx-auto gap-2">

        {/* ✅ Mic: shown only when not hidden AND message not yet sent */}
        {!micHidden && !isMessageSent && (
          <div className="flex flex-col items-center">
            <button
              className="mic-button"
              onClick={() =>
                isListening ? stopListening() : handleStartListening()
              }
              aria-label={isListening ? "Stop recording" : "Start recording"}
            >
              <div className="mic-container">
                {/* Left Waves */}
                {isListening && (
                  <div className="sound-waves left-waves">
                    {[...Array(3)].map((_, i) => (
                      <div key={`left-${i}`} className="wave-bar" style={{ '--i': i }}></div>
                    ))}
                  </div>
                )}

                {/* Mic Icon */}
                <div className="mic-icon-wrapper">
                  <img src={microphoneIcon} className="mic-icon" alt="Microphone" />
                  {isListening && <div className="pulse-effect"></div>}
                </div>

                {/* Right Waves */}
                {isListening && (
                  <div className="sound-waves right-waves">
                    {[...Array(3)].map((_, i) => (
                      <div key={`right-${i}`} className="wave-bar" style={{ '--i': i }}></div>
                    ))}
                  </div>
                )}
              </div>
            </button>
          </div>
        )}

        {/* Recording Text Below Mic */}
        <div style={{ height: "22px" }}>
          {isListening && (
            <div className="recording-text">Recording ({time}s)</div>
          )}
        </div>

        {/* Text Input Area */}
        {!isMessageSent && (
          <div className="relative w-full">
            <textarea
              ref={input}
              rows={3}
              className="w-full placeholder:text-gray-800 placeholder:italic p-4 rounded-md bg-opacity-50 bg-white backdrop-blur-md resize-none overflow-y-auto max-h-[120px] min-h-[80px]"
              placeholder={isListening ? "" : "Type a message..."}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
            />

            <button
              disabled={loading || message}
              onClick={handleSendMessage}
              className={`
                absolute top-1 right-1
                w-10 h-10 
                bg-gradient-to-tr from-pink-500 to-fuchsia-600 
                text-white 
                flex items-center justify-center 
                rounded-full 
                shadow-lg 
                transition-all duration-300 ease-in-out 
                hover:scale-110 hover:shadow-pink-400/50 
                active:scale-95 active:shadow-inner 
                group
              `}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 transition-transform duration-300 group-hover:-rotate-12 group-active:scale-90"
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

        {/* Post-Message Buttons */}
        {isMessageSent && (
          <div className="flex justify-center pointer-events-auto mt-2 mb-1">
            <div className="flex gap-4">
              <button className="bg-pink-500 text-white px-4 py-2 rounded-md">Resubmit</button>
              <button className="bg-pink-500 text-white px-4 py-2 rounded-md">Next Question</button>
              <button className="bg-red-600 text-white px-4 py-2 rounded-md">Terminate Session</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
