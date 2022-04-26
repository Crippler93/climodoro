import inquirer from "inquirer";

export const menuOptionsList = ['Start tracking time (Pomodoro)', 'Tracking undefined time', 'View time log', 'Exit'];
export const trackingOptions = ['Back to menu', new inquirer.Separator()];

export function mainMenu(): Promise<any> {
  return inquirer.prompt(
    [
      {
        type: 'list',
        name: 'theme',
        message: 'What do you want to do?',
        choices: [
          ...menuOptionsList
        ],

      }
    ]
  );
}

export function trackingMenu(): Promise<any> {
  return inquirer.prompt(
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
}