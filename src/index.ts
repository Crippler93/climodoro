import inquirer from 'inquirer';
import art from './asciiArt';

const menuOptions = ['Start tracking time', 'View time log', 'Exit'];
const trackingOptions = ['Back to menu', 'Exit'];
let intervalID = null;

async function showMenu() {
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
  console.log(JSON.stringify(answers, null, '  '));
}


async function showTrackingMenu() {
  art.startWorking();
  let time = new Date().getTime();
  let counter = 0;

  function printProgress() {
    process.stdout.cursorTo(0);
    process.stdout.write('Count is: ' + counter);
    counter++;
  }
  intervalID = setInterval(function() {
    printProgress();
  }, 1000);

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

  if (answers.theme === trackingOptions[0]) {
    await showMenu();
  } else {
    process.exit(0);
  }
    
}

async function showTimeLog() {
  
}

art.climodoro();
showMenu();