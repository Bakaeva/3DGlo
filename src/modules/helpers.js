const animate = ({ timing, draw, duration }) => {

  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    // timeFraction изменяется от 0 до 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    // вычисление текущего состояния анимации
    let progress = timing(timeFraction);

    draw(progress); // отрисовать её

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }

  });
}

const animate2 = ({ duration, onUpdate, onComplete }) => {
  const start = performance.now();

  const tick = (now) => {
    const elapsed = now - start;
    const rawProgress = Math.min(elapsed / duration, 1);

    // easeOutCubic — плавное замедление к концу
    const eased = 1 - Math.pow(1 - rawProgress, 3);

    onUpdate(eased);

    if (rawProgress < 1) {
      requestAnimationFrame(tick);
    } else if (onComplete) {
      onComplete();
    }
  };

  requestAnimationFrame(tick);
};

export { animate, animate2 };