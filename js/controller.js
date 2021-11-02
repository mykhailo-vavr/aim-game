import { model } from './model.js';
import { view } from './view.js';

export const controller = {
  start() {
    view.start();
    this.setListeners();
  },

  setListeners() {
    view.gameContainer.addEventListener(
      'click',
      this.onClick.bind(this)
    );
  },

  onClick({ target }) {
    const dataset = target.dataset,
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
      model[action](target);
    }
  }
};
