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
console.log(`
       _                _                           _     _               
      | |              | |                         | |   (_)              
  ___ | |_  __ _  _ __ | |_  __      __ ___   _ __ | | __ _  _ __    __ _ 
 / __|| __|/ _\` || '__|| __| \\ \\ /\\ / // _ \\ | '__|| |/ /| || '_ \  / _\` |
 \\__ \\| |_| (_| || |   | |_   \\ V  V /| (_) || |   |   < | || | | || (_| |
 |___/ \\__|\\__,_||_|    \\__|   \\_/\\_/  \\___/ |_|   |_|\\_\\|_||_| |_| \\__, |
                                                                     __/ |
                                                                    |___/ 
`);
  let time = new Date().getTime();
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
    const difference = new Date().getTime() - time;
    const [, hours, minutes, seconds ] = /(\d\d):(\d\d):(\d\d)/.exec(new Date(difference).toUTCString()) as string[]
    console.log("Time spent", `${hours}:${minutes}:${seconds}`);
    
}

async function showTimeLog() {
  
}

console.log(`%c
 _____   _   _                           _                        
/ ____| | | (_)                         | |                       
| |     | |  _   _ __ ___     ___     __| |   ___    _ __    ___  
| |     | | | | | '_ \` _ \\   / _ \\   / _\` |  / _ \\  | '__|  / _ \\ 
| |____ | | | | | | | | | | | (_) | | (_| | | (_) | | |    | (_) |
\\_____| |_| |_| |_| |_| |_|  \\___/   \\__,_|  \\___/  |_|     \\___/                                         
`);

showMenu();