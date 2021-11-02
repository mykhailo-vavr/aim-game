import { model } from './model.js';

export const view = {
  gameContainer: document.querySelector('.aim_game-container'),
  timer: document.querySelector('.aim_game-timer'),
  playGround: document.querySelector('.aim_game-playground'),
  position: 0,
  size: 10,
  animationTime: 4000,

  start() {
    this.playGroundSize = this.playGround.offsetWidth;
    this.maxSize = this.size * 5;
  },

  removeCircle(target) {
    target.remove();
  },

  changeScreen(position) {
    if (position !== undefined) {
      this.position = position;
    } else {
      this.position -= 100;
    }
    this.gameContainer.style.transform = `translateY(${this.position}vh)`;
  },

  changeTime(time) {
    time = time < 10 ? `0${time}` : time;
    this.timer.textContent = `00:${time}`;
  },

  changeStatistic(statisticType, value) {
    let statisticSpan = document.querySelector(
      `.statistic-${statisticType}`
    );
    statisticSpan.textContent = value;
  },

  createCircle() {
    let positionLimit = this.playGroundSize - this.maxSize / 2;
    let x = model.getRandomNumber(this.maxSize / 2, positionLimit);
    let y = model.getRandomNumber(this.maxSize / 2, positionLimit);

    let circleHTML = `
      <div
        class="playground-circle"
        style="left: ${x}px; top: ${y}px;"
        data-action="removeCircleByClick"
      >
      </div>
    `;

    this.playGround.insertAdjacentHTML('afterbegin', circleHTML);
    let circle = this.playGround.firstElementChild;

    setTimeout(() => this.removeCircle(circle), this.animationTime);
  },

  resetGame() {
    this.changeScreen(-100);
    setTimeout(() => {
      this.timer.classList.remove('hidden');
      this.playGround.innerHTML = '';
      this.changeStatistic('score', 0);
      this.changeStatistic('misclicks', 0);
    }, 500);
  },

  finishGame() {
    this.playGround.innerHTML = `
      <div class="aim_game-playground-inner_statistic">
        <h1>Record: ${model.record}<h1>                        
        <h1>Score: ${model.score}<h1>
        <h1>Misclicks: ${model.misclicks}<h1>
        <button
          class="aim_game-btn"
          data-action="resetGame"
        >
          Retry
        <button>
      </div>`;
    this.timer.classList.add('hidden');
  }
};
