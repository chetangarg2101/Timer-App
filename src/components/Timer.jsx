import React, { useState, useEffect, useRef } from 'react';
import './timer.css';

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isRunning, setIsRunning] = useState(false); // State to track if the timer is running

  const timerRef = useRef(null); // Ref to store the timer ID

  // Check system theme preference (dark or light)
  useEffect(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDarkMode); // Set initial theme based on system preference

    // Listen for theme changes (e.g., if the user switches the system theme)
    const themeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    themeMediaQuery.addEventListener('change', (e) => {
      setIsDarkMode(e.matches);
    });

    return () => themeMediaQuery.removeEventListener('change', () => {}); // Clean up event listener
  }, []);

  // Timer logic
  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 59) {
          setMinutes((prevMinutes) => prevMinutes + 1);
          return 0;
        }
        return prevSeconds + 1;
      });
    }, 1000);
  };

  useEffect(() => {
    if (isRunning) {
      startTimer(); // Start the timer when the isRunning state is true
    } else {
      clearInterval(timerRef.current); // Clear the timer if it's not running
    }

    return () => clearInterval(timerRef.current); // Cleanup on unmount
  }, [isRunning]);

  // Restart the timer
  const restart = () => {
    setSeconds(0);
    setMinutes(0);
    setIsRunning(true); // Restart the timer by setting isRunning to true
  };

  // Stop the timer
  const stop = () => {
    clearInterval(timerRef.current);
    setIsRunning(false); // Stop the timer by setting isRunning to false
  };

  // Start the timer
  const start = () => {
    setIsRunning(true); // Start the timer by setting isRunning to true
  };

  return (
    <div className={`timer ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
      <div className="container">
        <div className="timer_container">
          <h1>Timer</h1>
          <h2>
            {minutes < 10 ? "0" + minutes : minutes}:
            {seconds < 10 ? "0" + seconds : seconds}
          </h2>

          {/* Start button with icon */}
          {!isRunning && (
            <button className="start" onClick={start}>
              <i className="fas fa-play"></i> Start
            </button>
          )}

          {/* Restart and Stop buttons */}
          <button className="restart" onClick={restart}>
            Restart
          </button>
          <button className="stop" onClick={stop}>
            Stop
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timer;
