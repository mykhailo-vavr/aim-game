import { view } from './view.js';

export const model = {
  record: 0,
  score: 0,
  misclicks: 0,
  speed: 0,
  time: 0,

  start() {
    this.timeChanger();
    this.circleFactory();
  },

  timeChanger() {
    view.changeTime(this.time);
    this.timerForTimeId = setInterval(() => {
      if (this.time > 0) {
        view.changeTime(--this.time);
      } else {
        this.finishGame();
      }
    }, 1000);
  },

  circleFactory() {
    this.timerForCirclesId = setInterval(
      () => view.createCircle(),
      this.speed
    );
  },

  changeScreen() {
    view.changeScreen();
  },

  removeCircleByClick(target) {
    view.removeCircle(target);

    this.score++;
    view.changeStatistic('score', this.score);

    if (this.score >= this.record) {
      model.record = model.score;
      view.changeStatistic('record', this.record);
    }
  },

  catchMisclick() {
    this.misclicks++;
    view.changeStatistic('misclicks', this.misclicks);
  },

  finishGame() {
    clearInterval(this.timerForTimeId);
    clearInterval(this.timerForCirclesId);
    view.finishGame();
  },

  resetGame() {
    this.score = 0;
    this.misclicks = 0;
    view.resetGame();
  },

  getRandomNumber(min, max) {
    if (max < min) {
      [min, max] = [max, min];
    }
    return Math.round(Math.random() * (max - min) + min);
  }
};
