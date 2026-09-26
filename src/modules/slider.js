const sliderModule = () => {
  const sliderBlock = document.getElementById('all-progects');
  const sliders = sliderBlock.querySelectorAll('.portfolio-item');
  const timeInterval = 2000;
  let dots;
  let currentSlide = 0;
  let interval;

  const createDots = () => {
    const dotsContainer = sliderBlock.querySelector('.portfolio-dots');
    sliders.forEach((slider, i) => {
      const dot = document.createElement('li');
      dot.classList.add('dot');
      if (i === 0) {
        dot.classList.add('dot-active');
      }
      dotsContainer.appendChild(dot);
    });
    dots = sliderBlock.querySelectorAll('.dot');
  };

  const prevSlide = (elems, index, strClass) => {
    elems[index].classList.remove(strClass);
  };

  const nextSlide = (elems, index, strClass) => {
    elems[index].classList.add(strClass);
  };

  const autoSlide = () => {
    prevSlide(sliders, currentSlide, 'portfolio-item-active');
    prevSlide(dots, currentSlide, 'dot-active');

    currentSlide++;
    if (currentSlide == sliders.length) currentSlide = 0;

    nextSlide(sliders, currentSlide, 'portfolio-item-active');
    nextSlide(dots, currentSlide, 'dot-active');
  };

  const startSlide = (timer = 1500) => {
    interval = setInterval(autoSlide, timer);
  };

  const stopSlide = () => {
    clearInterval(interval);
  };

  sliderBlock.addEventListener('click', (e) => {
    e.preventDefault();

    if (!e.target.matches('.dot, .portfolio-btn'))
      return;

    prevSlide(sliders, currentSlide, 'portfolio-item-active');
    prevSlide(dots, currentSlide, 'dot-active');

    if (e.target.matches('.dot')) {
      currentSlide = [...dots].indexOf(e.target);
    } else if (e.target.matches('.portfolio-btn')) {
      if (e.target.matches('#arrow-left')) {
        currentSlide--;
        if (currentSlide < 0) currentSlide = sliders.length - 1;
      } else {
        currentSlide++;
        if (currentSlide == sliders.length) currentSlide = 0;
      }
    };

    nextSlide(sliders, currentSlide, 'portfolio-item-active');
    nextSlide(dots, currentSlide, 'dot-active');
  });

  sliderBlock.addEventListener('mouseenter', (e) => {
    if (e.target.matches('.dot, .portfolio-btn')) {
      stopSlide();
    }
  }, true);

  sliderBlock.addEventListener('mouseleave', (e) => {
    if (e.target.matches('.dot, .portfolio-btn')) {
      startSlide(timeInterval);
    }
  }, true);

  createDots();
  startSlide(timeInterval);

};
export default sliderModule;