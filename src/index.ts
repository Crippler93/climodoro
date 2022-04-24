import inquirer from 'inquirer';
import ora from 'ora';
import chalk from 'chalk';

import { art } from './asciiArt.js';
import { secondsToTime } from './utils.js';
import { Timer, Watch } from './timers.js';


const menuOptions = ['Start tracking time', 'View time log', 'Exit'];
const trackingOptions = ['Back to menu', 'Exit'];

let selectedMenu: 'menu' | 'trackTime' | 'timeLog' | 'exit';
selectedMenu = 'menu'
let totalTime;

(async () => {
  while (true) {
    switch (selectedMenu as any) {
      case 'menu':
        await showMenu(totalTime);
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
  if (answers.theme === menuOptions[0]) {
    selectedMenu = 'trackTime';
  } else if (answers.theme === menuOptions[2]) {
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

async function showTimeLog() {
  
}