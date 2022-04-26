const appendZero = (num: number): string => (num < 10) ? `0${num}` : `${num}`;
const MILISECONDS = 1000;

export const secondsToTime = (secondsArg: number) => {
  let seconds: any = appendZero(Math.floor(secondsArg % 60));
  let	minutes: any = appendZero(Math.floor((secondsArg / 60) % 60));
  let hours: any = appendZero(Math.floor((secondsArg / (60 * 60)) % 24));

  return `${hours}:${minutes}:${seconds}`;
}

export const UTCDateToTime = (utcDate: string) => {
  const [, hours, minutes, seconds ] = /(\d\d):(\d\d):(\d\d)/.exec(utcDate) as string[];
  return `${hours}:${minutes}:${seconds}`
}

export const secondsToDate = (seconds: number) => new Date(seconds * MILISECONDS);