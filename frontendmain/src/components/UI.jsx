import { useRef } from "react";
import { useChat } from "../hooks/useChat";
export const UI = ({ hidden, ...props }) => {
  const input = useRef();
  const { chat, loading, cameraZoomed, setCameraZoomed, message } = useChat();

  const sendMessage = () => {
    const text = input.current.value;
    if (!loading && !message) {
      chat(text);
      input.current.value = "";
    }
  };

  if (hidden) return null;

  return (
    <div className="fixed inset-0 z-10 pointer-events-none">
      {/* Right-side floating buttons */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-4 pointer-events-auto">
        {/* Camera Zoom Button (Top) */}
        <button
          onClick={() => setCameraZoomed(!cameraZoomed)}
          className="bg-pink-500 hover:bg-pink-600 text-white p-4 rounded-full shadow-lg transition-all"
        >
          {cameraZoomed ? (
            <ZoomOutIcon />
          ) : (
            <ZoomInIcon />
          )}
        </button>
        
        {/* Green Screen Button (Bottom) */}
        <button
          onClick={() => document.body.classList.toggle("greenScreen")}
          className="bg-pink-500 hover:bg-pink-600 text-white p-4 rounded-full shadow-lg transition-all"
        >
          <GreenScreenIcon />
        </button>
      </div>

      {/* Bottom input section */}
     </div>
  );
};

// Icon components for cleaner code
const ZoomInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
  </svg>
);

const ZoomOutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6" />
  </svg>
);

const GreenScreenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
  </svg>
);