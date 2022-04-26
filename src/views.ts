import ora from 'ora';

import { secondsToDate, secondsToTime, UTCDateToTime } from './utils.js';
import { art, printTimeTracked } from './print.js';
import { Timer, Watch } from './timers.js';
import { menuOptions, trackResult } from './types/index.js';
import { mainMenu, menuOptionsList, trackingMenu, trackingOptions } from './menus.js';

export async function showMenu(totalTime: string|null = null): Promise<menuOptions> {
  console.clear();
  art.climodoro();
  if (totalTime) printTimeTracked(totalTime);
  const answers = await mainMenu()
  if (answers.theme === menuOptionsList[1]) {
    return 'trackTime'; 
  }
  else if (answers.theme === menuOptionsList[0]) {
    return 'trackPomodoro';
  } else if (answers.theme === menuOptionsList[3]) {
    return 'exit';
  } else {
    return 'exit';
  }
}


export async function showTrackingMenu(): Promise<trackResult> {
  console.clear();
  const spinner = ora('Tracking time:').start();
  spinner.color = 'cyan';
  
  function printProgress(counter: number) {
    spinner.text = `Tracking time: ${secondsToTime(counter)}`
  }

  function stopProgress() {
    spinner.stop();
  }

  const timer = new Watch({onStart: printProgress, onEnd: stopProgress})
  timer.start()

  let time = new Date().getTime();

  console.clear();
  art.startWorking();
  const answers = await trackingMenu()

  const difference = new Date().getTime() - time;
  const totalTime = UTCDateToTime(new Date(difference).toUTCString());
  timer.stop();

  if (answers.theme === trackingOptions[0]) {
    return {selectedOption: 'menu', totalTime};
  } else {
    return {selectedOption: 'exit', totalTime};
  }   
}

export async function showTrackingMenuPomodoro(): Promise<trackResult> {
  console.clear();
  const spinner = ora('Work time remaining:').start();
  
  function printProgress(counter: number) {
    spinner.color = 'red';
    spinner.text = `Work time remaining: ${secondsToTime(counter)}`;
  }

  function stopProgress() {
    restTimer.start();
  }
  
  function restPrintProgress(counter: number) {
    spinner.color = 'cyan';
    spinner.text = `Rest time remaining: ${secondsToTime(counter)}`
  }

  function stopRest() {
    workTimer.start();
  }

  const workTimer = new Timer({onStart: () => {}, onProgress: printProgress, onEnd: stopProgress}, (10 * 60))
  const restTimer = new Timer({onStart: () => {}, onProgress: restPrintProgress, onEnd: stopRest}, (5 * 60))
  workTimer.start()

  console.clear();
  art.startWorking();
  const answers = await trackingMenu();
  
  workTimer.forceStop();
  restTimer.forceStop();
  spinner.stop();

  const totalTime = UTCDateToTime(secondsToDate(workTimer.totalSeconds).toUTCString());

  if (answers.theme === trackingOptions[0]) {
    return {selectedOption: 'menu', totalTime}
  } else {
    return {selectedOption: 'exit', totalTime}
  }
}