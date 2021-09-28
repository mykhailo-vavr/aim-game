import { model } from './model.js';
import { view } from './view.js';

export const controller = {
  start() {
    this.setListeners();
  },

  setListeners() {
    this.boundOnClick = this.onClick.bind(this);
    document.addEventListener('click', this.boundOnClick);
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

    if (action == 'removeCircle') {
      view[action](dataset.id);
    } else if (action) {
      view[action]();
    }
  },
};
