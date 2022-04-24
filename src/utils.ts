const appendZero = (num: number): string => (num < 10) ? `0${num}` : `${num}`;

export const secondsToTime = (secondsArg: number) => {
  let seconds: any = appendZero(Math.floor(secondsArg % 60));
  let	minutes: any = appendZero(Math.floor((secondsArg / 60) % 60));
  let hours: any = appendZero(Math.floor((secondsArg / (60 * 60)) % 24));

  return `${hours}:${minutes}:${seconds}`;
}