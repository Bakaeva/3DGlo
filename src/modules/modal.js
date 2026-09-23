const modalModule = () => {
  const modal = document.querySelector('.popup');
  const modalContent = modal.querySelector('.popup-content');
  const buttons = document.querySelectorAll('.popup-btn');
  const closeBtn = modal.querySelector('.popup-close');
  const isMobile = () => window.innerWidth < 768;

  const animate = ({ duration, onUpdate, onComplete }) => {
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

  let isAnimating = false;

  const openModal = () => {
    if (isAnimating) return;

    if (isMobile()) {
      modal.style.display = 'block';
      modal.style.opacity = '1';
      modalContent.style.opacity = '1';
      modalContent.style.transform = 'translateY(0) scale(1)';
      return;
    }

    isAnimating = true;

    modal.style.display = 'block';
    modal.style.opacity = '0';
    modalContent.style.opacity = '0';
    modalContent.style.transform = 'translateY(50px) scale(0.8)';

    void modal.offsetHeight;

    animate({
      duration: 400,
      onUpdate(progress) {
        modal.style.opacity = String(progress);
        modalContent.style.opacity = String(progress);

        const translateY = 50 * (1 - progress);
        const scale = 0.8 + 0.2 * progress;
        modalContent.style.transform = `translateY(${translateY}px) scale(${scale})`;
      },
      onComplete() {
        isAnimating = false;
      },
    });
  };

  const closeModal = () => {
    if (isAnimating) return;

    if (isMobile()) {
      modal.style.display = 'none';
      modal.style.opacity = '0';
      modalContent.style.opacity = '0';
      modalContent.style.transform = 'translateY(50px) scale(0.8)';
      return;
    }

    isAnimating = true;

    animate({
      duration: 300,
      onUpdate(progress) {
        const reverse = 1 - progress;

        modal.style.opacity = String(reverse);
        modalContent.style.opacity = String(reverse);

        const translateY = 50 * progress;
        const scale = 1 - 0.2 * progress;
        modalContent.style.transform = `translateY(${translateY}px) scale(${scale})`;
      },
      onComplete() {
        modal.style.display = 'none';
        isAnimating = false;
      },
    });
  };

  buttons.forEach((btn) => btn.addEventListener('click', openModal));
  closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

};

export default modalModule;