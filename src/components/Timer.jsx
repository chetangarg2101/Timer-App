import React, { useState, useEffect, useRef } from 'react';
import './timer.css';

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const timerRef = useRef(null);

  useEffect(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDarkMode);

    const themeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    themeMediaQuery.addEventListener('change', (e) => {
      setIsDarkMode(e.matches);
    });

    return () => themeMediaQuery.removeEventListener('change', () => {});
  }, []);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 59) {
            setMinutes((prevMinutes) => prevMinutes + 1);
            return 0;
          }
          return prevSeconds + 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const restart = () => {
    setSeconds(0);
    setMinutes(0);
    setIsRunning(true);
  };

  const stop = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
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

          {!isRunning && (
            <button className="start" onClick={startTimer}>
              <i className="fas fa-play"></i> Start
            </button>
          )}

          {isRunning && (
            <>
              <button className="restart" onClick={restart}>
                Restart
              </button>
              <button className="stop" onClick={stop}>
                Stop
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Timer;