import { model } from './model.js';
import { view } from './view.js';

export const controller = {
  start() {
    this.setListeners();
  },

  setListeners() {
    this.boundOnClick = this.onClick.bind(this);
    view.boundMisclickCapture = view.misclickCapture.bind(view);
    document.addEventListener('click', this.boundOnClick);
    view.playGround.addEventListener(
      'click',
      view.boundMisclickCapture
    );
  },

  onClick(event) {
    const dataset = event.target.dataset,
      action = dataset.action,
      time = dataset.time,
      speed = dataset.speed;

    if (speed) {
      model.speed = +speed;
    }

    if (time) {
      model.time = +time;
      model.start();
    }

    if (action) {
      view[action]();
    }
  },
};
