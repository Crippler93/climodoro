import { secondsToDate, UTCDateToTime } from './utils.js';
import { art, printTimeTracked } from './print.js';
import { menuOptions, trackResult } from './types/index.js';
import { mainMenu, menuOptionsList, trackingMenu, trackingOptions } from './menus.js';
import { startPomodoroTracking, startWatchTracking } from './Trackers.js';

export async function showMenu(totalTime: string|null = null): Promise<menuOptions> {
  console.clear();
  art.climodoro();
  if (totalTime) printTimeTracked(totalTime);
  const answers = await mainMenu();
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

  async function promiseWatch() {
    console.clear();
    art.startWorking();
    return await trackingMenu();
  }

  const result = await startWatchTracking(promiseWatch);

  const totalTime = UTCDateToTime(secondsToDate(result.seconds).toUTCString());

  if (result.answer.theme === trackingOptions[0]) {
    return {selectedOption: 'menu', totalTime};
  } else {
    return {selectedOption: 'exit', totalTime};
  }   
}

export async function showTrackingMenuPomodoro(): Promise<trackResult> {
  console.clear();
  
  async function trackerPromise() {
    console.clear();
    art.startWorking();
    return await trackingMenu();
  }

  const result = await startPomodoroTracking(trackerPromise, 25, 5)

  const totalTime = UTCDateToTime(secondsToDate(result.seconds).toUTCString());

  if (result.answer.theme === trackingOptions[0]) {
    return {selectedOption: 'menu', totalTime}
  } else {
    return {selectedOption: 'exit', totalTime}
  }
}