import inquirer from 'inquirer';

const menuOptions = ['Start tracking time', 'View time log', 'Exit']
const trackingOptions = ['Back to menu', 'Exit']

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
    ])
  if (answers.theme === menuOptions[0]) {
    await showTrackingMenu();
  }
  console.log(JSON.stringify(answers, null, '  '));
}


async function showTrackingMenu() {
  let time = 0;
  setTimeout(() => {
    time += 1;
  }, 1000)
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
    ])
    console.log(JSON.stringify(answers, null, '  '));
    console.log("Time spent", time);
    
}

async function showTimeLog() {
  
}

showMenu();