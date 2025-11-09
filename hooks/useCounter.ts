import { useEffect, useState } from "react";

export const useCounter = (initialDuration: number = 30) => {
  const [timerDuration, setTimerDuration] = useState<number>(initialDuration);
  const [timeRemaining, setTimeRemaining] = useState<number>(initialDuration);
  const [isTimerStarted, setIsTimerStarted] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);

  // Timer effect
  useEffect(() => {
    if (isTimerStarted && timeRemaining > 0) {
      const timerId = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setIsTimeUp(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [isTimerStarted, timeRemaining]);

  const startTimer = () => {
    if (!isTimerStarted) {
      setIsTimerStarted(true);
    }
  };

  const changeTimerDuration = (duration: number) => {
    if (!isTimerStarted) {
      setTimerDuration(duration);
      setTimeRemaining(duration);
    }
  };

  const resetTimer = () => {
    setIsTimerStarted(false);
    setIsTimeUp(false);
    setTimeRemaining(timerDuration);
  };

  return {
    timerDuration,
    timeRemaining,
    isTimerStarted,
    isTimeUp,
    startTimer,
    changeTimerDuration,
    resetTimer,
  };
};
