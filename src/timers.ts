export class Watch {
  private intervalID: any = null;
  private counter = 1;
  constructor(private fns: {onStart: any, onEnd: any} ) {}

  start() {
    this.intervalID = setInterval(() => {
      this.fns.onStart(this.counter);
      this.counter += 1;
    }, 1000)
  }

  stop() {
    clearInterval(this.intervalID);
    this.intervalID = null;
    this.fns.onEnd();
  }
}

export class Timer {
  private intervalID: any = null;
  constructor(private fns: {onStart: any, onEnd: any}, private secondsRemaining: number ) {}

  start() {
    let counter = this.secondsRemaining;
    this.intervalID = setInterval(() => {
      this.fns.onStart(counter);
      if (counter <= 0) this.stop();
      counter -= 1;
    }, 1000)
  }

  stop() {
    clearInterval(this.intervalID);
    this.intervalID = null;
    this.fns.onEnd();
  }
}