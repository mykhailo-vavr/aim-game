import { model } from './model.js';

export const view = {
  position: 0,
  size: 10,
  gameContainer: document.querySelector('.aim-game-container'),
  timer: document.querySelector('.aim-game-timer'),
  playGround: document.querySelector('.aim-game-playground'),
  playGroundSize: 450,
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

  removeCircleByClick(event) {
    let target = event.target;
    target.removeEventListener(
      'click',
      this.boundRemoveCircleByClick
    );
    target.remove();
    model.score++;
  },

  removeCircleAfterTime(circle) {
    circle.removeEventListener(
      'click',
      this.boundRemoveCircleByClick
    );
    circle.remove();
  },

  changeTime(time) {
    if (time < 10) {
      time = '0' + time;
    }
    this.timer.textContent = `00:${time}`;
  },

  createCircle() {
    this.maxSize = this.size * 5;
    let positionLimit = this.playGroundSize - this.maxSize / 2;
    let x = model.getRandomNumber(this.maxSize / 2, positionLimit);
    let y = model.getRandomNumber(this.maxSize / 2, positionLimit);

    let circle = document.createElement('div');
    circle.classList.add('playground-circle');
    circle.style.cssText = `left: ${x}px;
                            top: ${y}px;`;

    this.boundRemoveCircleByClick =
      this.removeCircleByClick.bind(this);
    circle.addEventListener('click', this.boundRemoveCircleByClick);
    this.playGround.append(circle);

    setTimeout(
      this.removeCircleAfterTime,
      this.animationTime,
      circle
    );
  },

  misclickCapture(event) {
    if (event.target == this.playGround) {
      model.misclicks++;
    }
    console.log(model.misclicks);
  },

  resetGame() {
    setTimeout(() => {
      this.timer.classList.remove('hidden');
      this.playGround.innerHTML = '';
    }, 500);
    this.changeScreen(-100);
  },

  finishGame() {
    this.playGround.innerHTML = `<h1>Score: ${model.record}<h1>
                                <h1>Record: ${model.score}<h1>
                                <h1>Misclicks: ${model.misclicks}<h1>
                                <button class="aim-game-btn" data-action="resetGame">Retry<button>`;
    this.timer.classList.add('hidden');
  },
};

window.v = view;
