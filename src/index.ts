import { showMenu, showTrackingMenu, showTrackingMenuPomodoro } from './views.js'
import { menuOptions } from './types/index.js';

let selectedMenu: menuOptions = 'menu';
let totalTime;

(async () => {
  while (true) {
    switch (selectedMenu as any) {
      case 'menu': {
        selectedMenu = await showMenu(totalTime);
        break;
      }
      case 'trackPomodoro': {
        const result = await showTrackingMenuPomodoro();
        selectedMenu = result.selectedOption;
        totalTime = result.totalTime;
        break;
      }
      case 'trackTime': {
        const result = await showTrackingMenu();
        selectedMenu = result.selectedOption;
        totalTime = result.totalTime;
        break;
      }
      case 'exit':
        process.exit(0);
    }
  }
})()