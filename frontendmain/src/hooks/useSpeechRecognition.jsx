import { useState, useEffect, useRef } from "react";

export const useSpeechRecognition = () => {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const recognition = useRef(null);
  const interval = useRef(null);
  const timeout = useRef(null);
  const maxRecordingTime = useRef(10); // Default to 10 seconds

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      recognition.current = new window.webkitSpeechRecognition();
      recognition.current.continuous = true;
      recognition.current.interimResults = true;

      recognition.current.onresult = (event) => {
        let finalTranscript = "";
        let interimTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        setText((prevText) => prevText + finalTranscript);
      };

      recognition.current.onend = () => {
        setIsListening(false);
        clearInterval(interval.current);
        clearTimeout(timeout.current);
      };
    } else {
      alert("Your browser does not support Speech Recognition.");
    }

    return () => {
      recognition.current?.stop();
      clearInterval(interval.current);
      clearTimeout(timeout.current);
    };
  }, []);

  const startListening = (duration = null) => {
    if (recognition.current && !isListening) {
      recognition.current.start();

      if (!isPaused) {
        setText("");
        setTime(0);
      }

      setIsListening(true);
      setIsPaused(false);

      // Start timer
      interval.current = setInterval(() => {
        setTime((prev) => {
          const newTime = prev + 1;
          // Auto-stop if reached max time (except for "Hold" option)
          if (maxRecordingTime.current !== "Hold" && newTime >= maxRecordingTime.current) {
            stopListening();
          }
          return newTime;
        });
      }, 1000);

      // Set timeout for auto-stop if duration is provided
      if (duration && duration !== "Hold") {
        const durationSec = parseInt(duration);
        timeout.current = setTimeout(() => {
          stopListening();
        }, durationSec * 1000);
      }
    }
  };

  const stopListening = () => {
    if (recognition.current) {
      recognition.current.stop();
      clearInterval(interval.current);
      clearTimeout(timeout.current);
      setIsListening(false);
    }
  };

  const pauseListening = () => {
    if (recognition.current && isListening) {
      recognition.current.stop();
      setIsPaused(true);
    }
  };

  const setRecordingDuration = (duration) => {
    if (duration === "Hold (Max 25s)") {
      maxRecordingTime.current = "Hold";
    } else {
      maxRecordingTime.current = parseInt(duration);
    }
  };

  return {
    text,
    isListening,
    isPaused,
    time,
    startListening,
    stopListening,
    pauseListening,
    setRecordingDuration,
  };
};