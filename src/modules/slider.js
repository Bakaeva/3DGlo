const sliderModule = (config = {}) => {
  const defaults = {
    containerId: 'slider',
    slideClass: 'slide',
    activeSlideClass: 'slide-active',
    dotsContainer: 'dots',
    dotClass: 'dot',
    activeDotClass: 'dot-active',
    btnClass: 'arrows',
    prevBtnId: 'arrow-left',
    nextBtnId: 'arrow-right',
    timeInterval: 2000,
  };

  const settings = { ...defaults, ...config };

  const sliderBlock = document.getElementById(settings.containerId);
  if (!sliderBlock) {
    alert(`[sliderModule] Контейнер с id="${settings.containerId}" не найден. Модуль отключён.`);
    return;
  }

  const sliders = sliderBlock.querySelectorAll(`.${settings.slideClass}`);
  if (sliders.length === 0) {
    alert(`[sliderModule] Слайды с классом "${settings.slideClass}" не найдены. Модуль отключён.`);
    return;
  }

  let dots;
  let currentSlide = 0;
  let interval;

  const createDots = () => {
    const dotsContainer = document.createElement('ul');
    dotsContainer.classList.add(settings.dotsContainer);
    sliders.forEach((slider, i) => {
      const dot = document.createElement('li');
      dot.classList.add(settings.dotClass);
      if (i === 0) {
        dot.classList.add(settings.activeDotClass);
      }
      dotsContainer.appendChild(dot);
    });
    sliderBlock.appendChild(dotsContainer);
    dots = sliderBlock.querySelectorAll(`.${settings.dotClass}`);
  };

  const prevSlide = (elems, index, strClass) => {
    elems[index].classList.remove(strClass);
  };

  const nextSlide = (elems, index, strClass) => {
    elems[index].classList.add(strClass);
  };

  const autoSlide = () => {
    prevSlide(sliders, currentSlide, settings.activeSlideClass);
    prevSlide(dots, currentSlide, settings.activeDotClass);

    currentSlide++;
    if (currentSlide == sliders.length) currentSlide = 0;

    nextSlide(sliders, currentSlide, settings.activeSlideClass);
    nextSlide(dots, currentSlide, settings.activeDotClass);
  };

  const startSlide = (timer = 1500) => {
    interval = setInterval(autoSlide, timer);
  };

  const stopSlide = () => {
    clearInterval(interval);
  };

  sliderBlock.addEventListener('click', (e) => {
    e.preventDefault();

    if (!e.target.matches(`.${settings.dotClass}, .${settings.slideClass}`))
      return;

    prevSlide(sliders, currentSlide, settings.activeSlideClass);
    prevSlide(dots, currentSlide, settings.activeDotClass);

    if (e.target.matches(`.${settings.dotClass}`)) {
      currentSlide = [...dots].indexOf(e.target);
    } else if (e.target.matches(`.${settings.btnClass}`)) {
      if (e.target.matches(`#${settings.prevBtnId}`)) {
        currentSlide--;
        if (currentSlide < 0) currentSlide = sliders.length - 1;
      } else {
        currentSlide++;
        if (currentSlide == sliders.length) currentSlide = 0;
      }
    };

    nextSlide(sliders, currentSlide, settings.activeSlideClass);
    nextSlide(dots, currentSlide, settings.activeDotClass);
  });

  sliderBlock.addEventListener('mouseenter', (e) => {
    if (e.target.matches(`.${settings.dotClass}, .${settings.btnClass}`)) {
      stopSlide();
    }
  }, true);

  sliderBlock.addEventListener('mouseleave', (e) => {
    if (e.target.matches(`.${settings.dotClass}, .${settings.btnClass}`)) {
      startSlide(settings.timeInterval);
    }
  }, true);

  createDots();
  startSlide(settings.timeInterval);

};
export default sliderModule;