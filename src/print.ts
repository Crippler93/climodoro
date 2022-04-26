import chalk from "chalk";

const art = {
  startWorking() {
  console.log(chalk.green(
`
       _                _                           _     _               
      | |              | |                         | |   (_)              
  ___ | |_  __ _  _ __ | |_  __      __ ___   _ __ | | __ _  _ __    __ _ 
 / __|| __|/ _\` || '__|| __| \\ \\ /\\ / // _ \\ | '__|| |/ /| || '_ \\  / _\` |
 \\__ \\| |_| (_| || |   | |_   \\ V  V /| (_) || |   |   < | || | | || (_| |
 |___/ \\__|\\__,_||_|    \\__|   \\_/\\_/  \\___/ |_|   |_|\\_\\|_||_| |_| \\__, |
                                                                     __/ |
                                                                    |___/ 
`));
  },
  climodoro() {
    console.log(chalk.red(`
 _____   _   _                           _                        
/ ____| | | (_)                         | |                       
| |     | |  _   _ __ ___     ___     __| |   ___    _ __    ___  
| |     | | | | | '_ \` _ \\   / _ \\   / _\` |  / _ \\  | '__|  / _ \\ 
| |____ | | | | | | | | | | | (_) | | (_| | | (_) | | |    | (_) |
\\_____| |_| |_| |_| |_| |_|  \\___/   \\__,_|  \\___/  |_|     \\___/                                         
`));
  }
}

export const printTimeTracked = (totalTime: string) => {
  console.log(chalk.magenta(`\nTime tracked: ${totalTime}\n`));
}

export {
  art,
}