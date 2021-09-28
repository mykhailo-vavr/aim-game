import { model } from './model.js';

export const view = {
  circleId: 0,
  position: 0,
  size: 10,
  gameContainer: document.querySelector('.aim-game-container'),
  timer: document.querySelector('.aim-game-timer'),
  playGround: document.querySelector('.aim-game-playground'),
  playGroundSize: 450,
  circles: [],
  animationTime: 4000,

  changeScreen(position) {
    if (position) {
      this.position = position;
    } else {
      this.position -= 100;
    }
    setTimeout(() => {
      this.gameContainer.style.transform = `translateY(${this.position}vh)`;
    }, 50);
  },

  removeCircle(id) {
    let index = this.circles.findIndex((circle) => {
      return circle.dataset.id == id;
    });
    this.circles[index].remove();
    this.circles.splice(index, 1);

    model.score++;
  },

  changeTime(time) {
    if (time < 10) {
      time = '0' + time;
    }
    this.timer.textContent = `00:${time}`;
  },

  createCircle() {
    let sizeLimit = this.playGroundSize - (this.size * 5) / 2;
    let x = model.getRandomNumber((this.size * 5) / 2, sizeLimit);
    let y = model.getRandomNumber((this.size * 5) / 2, sizeLimit);

    let circle = document.createElement('div');
    circle.classList.add('playground-circle');
    circle.setAttribute('data-action', 'removeCircle');
    circle.setAttribute('data-id', this.circleId++);
    circle.style.cssText = `left: ${x}px;
                            top: ${y}px;
                            width: ${this.size}px;
                            height: ${this.size}px;`;
    this.playGround.append(circle);
    this.circles.push(circle);

    this.boundRemoveCircle = this.removeCircle.bind(this);
    setTimeout(
      this.boundRemoveCircle,
      this.animationTime,
      circle.dataset.id
    );
  },

  resetGame() {
    setTimeout(() => {
      this.circleId = 0;
      this.circles = [];
      this.timer.classList.remove('hidden');
      this.playGround.innerHTML = '';
    }, 500);
    this.changeScreen(-100);
  },

  finishGame() {
    this.playGround.innerHTML = `<h1>Score: ${model.score}<h1>
                                <h1>Record: ${model.score}<h1>
                                <button class="aim-game-btn " data-action="resetGame">Retry<button>`;
    this.timer.classList.add('hidden');
  },
};

window.v = view;
