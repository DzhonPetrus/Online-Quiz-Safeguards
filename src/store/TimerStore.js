import {writable, get} from 'svelte/store';
import {currPosition, questions} from './QuizStore';

/*START OF TIMER*/
export const QUIZ_TIME = 0.05;
var timerInterval;
export const minutesToSeconds = (minutes => minutes * 60);
const secondsToMinutes = seconds => Math.floor(seconds / 60);
const padWithZeroes = number => number.toString().padStart(2, '0');
export var quizTime = writable(minutesToSeconds(QUIZ_TIME));

export const formatTime = (timeInSeconds) => {
    const minutes = secondsToMinutes(timeInSeconds);
    const remainingSeconds = timeInSeconds % 60;
    return `${padWithZeroes(minutes)}:${padWithZeroes(remainingSeconds)}`;
  };

export function startTimer(){
    timerInterval = setInterval(() => {
      quizTime.update(n => n-1);
      if(get(quizTime) == 0)
          stopTimer();
      }, 1000);
};
function stopTimer(){
    clearInterval(timerInterval);
    currPosition.set(get(questions).length);
  };


  /*END OF TIMER*/

