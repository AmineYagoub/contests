export class CongratsAnimation {
  private el: HTMLBodyElement;
  private containerEl: HTMLSelectElement;
  private confettiFrequency = 3;
  private confettiColors = [
    '#EF2964',
    '#00C09D',
    '#2D87B0',
    '#48485E',
    '#EFFF1D',
  ];
  private confettiAnimations = ['slow', 'medium', 'fast'];
  private interval: NodeJS.Timer;

  constructor(el: HTMLBodyElement) {
    this.el = el;
    this.init();
  }

  private init() {
    this.containerEl = document.querySelector(
      '.ant-layout'
    ) as HTMLSelectElement;
  }

  /**
   *
   */
  public render() {
    this.interval = setInterval(() => {
      const confettiEl = document.createElement('div');
      const confettiSize = Math.floor(Math.random() * 3) + 7 + 'px';
      const confettiBackground =
        this.confettiColors[
          Math.floor(Math.random() * this.confettiColors.length)
        ];
      const confettiLeft =
        Math.floor(Math.random() * this.el.offsetWidth) + 'px';
      const confettiAnimation =
        this.confettiAnimations[
          Math.floor(Math.random() * this.confettiAnimations.length)
        ];

      confettiEl.classList.add(
        'confetti',
        'confetti--animation-' + confettiAnimation
      );
      confettiEl.style.left = confettiLeft;
      confettiEl.style.width = confettiSize;
      confettiEl.style.height = confettiSize;
      confettiEl.style.backgroundColor = confettiBackground;

      this.containerEl.appendChild(confettiEl);
    }, 25);
  }

  public destroy() {
    clearInterval(this.interval);
  }
}
