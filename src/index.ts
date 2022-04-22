import inquirer from 'inquirer';
import { art } from './asciiArt.js';
import ora from 'ora';


const menuOptions = ['Start tracking time', 'View time log', 'Exit'];
const trackingOptions = ['Back to menu', 'Exit'];
let intervalID = null;

async function showMenu() {
  console.clear();
  art.climodoro();
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
    await showTrackingMenu();
  }
}


async function showTrackingMenu() {
  console.clear();
  let time = new Date().getTime();
  let counter = 0;
  const spinner = ora('Tracking time: 0').start();
  spinner.color = 'cyan';


  function printProgress() {
    spinner.text = `Tracking time: ${counter}`
    counter++;
  }
  intervalID = setInterval(function() {
    printProgress();
  }, 1000);
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
  console.log("Time spent", `${hours}:${minutes}:${seconds}`);
  clearInterval(intervalID);
  intervalID = null;
  spinner.stop();

  if (answers.theme === trackingOptions[0]) {
    await showMenu();
  } else {
    process.exit(0);
  }
    
}

async function showTimeLog() {
  
}

showMenu();