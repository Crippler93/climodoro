import inquirer from 'inquirer';
import ora from 'ora';
import chalk from 'chalk';

import { art } from './asciiArt.js';
import { secondsToTime } from './utils.js';
import { Timer, Watch } from './timers.js';


const menuOptions = ['Start tracking time (Pomodoro)', 'Tracking undefined time', 'View time log', 'Exit'];
const trackingOptions = ['Back to menu', 'Exit'];

let selectedMenu: 'menu' | 'trackPomodoro' | 'trackTime' | 'timeLog' | 'exit';
selectedMenu = 'menu'
let totalTime;

(async () => {
  while (true) {
    switch (selectedMenu as any) {
      case 'menu':
        await showMenu(totalTime);
        break;
      case 'trackPomodoro':
        await showTrackingMenuPomodoro();
        break;
      case 'trackTime':
        await showTrackingMenu();
        break;
      case 'exit':
        process.exit(0);
    }
  }

})()

async function showMenu(totalTime: string|null = null) {
  console.clear();
  art.climodoro();
  if (totalTime) console.log(chalk.magenta(`\nTime tracked: ${totalTime}\n`));
  const answers = await inquirer.prompt(
    [
      {
        type: 'list',
        name: 'theme',
        message: 'What do you want to do?',
        choices: [
          ...menuOptions
        ],

      }
    ]);
  if (answers.theme === menuOptions[1]) {
    selectedMenu = 'trackTime'; 
  }
  else if (answers.theme === menuOptions[0]) {
    selectedMenu = 'trackPomodoro';
  } else if (answers.theme === menuOptions[3]) {
    selectedMenu = 'exit';
  }
}


async function showTrackingMenu() {
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
  const answers = await inquirer.prompt(
    [
      {
        type: 'list',
        name: 'theme',
        message: 'Time is being tracked, Select an option',
        choices: [
          ...trackingOptions
        ],

      }
    ]
  );

  const difference = new Date().getTime() - time;
  const [, hours, minutes, seconds ] = /(\d\d):(\d\d):(\d\d)/.exec(new Date(difference).toUTCString()) as string[];
  totalTime = `${hours}:${minutes}:${seconds}`
  timer.stop();


  if (answers.theme === trackingOptions[0]) {
    selectedMenu = 'menu'
  } else {
    selectedMenu = 'exit'
  }
    
}


async function showTrackingMenuPomodoro() {
  console.clear();
  const spinner = ora('Work time remaining:').start();
  
  function onWorkStart() {
  }
  
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
  const answers = await inquirer.prompt(
    [
      {
        type: 'list',
        name: 'theme',
        message: 'Time is being tracked, Select an option',
        choices: [
          ...trackingOptions
        ],

      }
    ]
  );
  
  workTimer.forceStop();
  restTimer.forceStop();
  spinner.stop();

  const [, hours, minutes, seconds ] = /(\d\d):(\d\d):(\d\d)/.exec(new Date(workTimer.totalSeconds * 1000).toUTCString()) as string[];
  totalTime = `${hours}:${minutes}:${seconds}`


  if (answers.theme === trackingOptions[0]) {
    selectedMenu = 'menu'
  } else {
    selectedMenu = 'exit'
  }
    
}


async function showTimeLog() {
  
}