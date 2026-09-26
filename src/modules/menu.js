const menuModule = () => {
  const menu = document.querySelector('menu');

  const toggleMenu = (e) => {
    if (e.target.closest('.menu')) { // Кнопка меню (бургер)
      menu.classList.toggle('active-menu');
      return;
    };

    if (e.target.closest('.close-btn') ||
      e.target.closest('menu') && e.target.matches('li>a') || // крестик закрытия или пункт-ссылка меню
      !e.target.closest('menu')) { // мимо меню
      menu.classList.remove('active-menu');
      return;
    };
  };

  document.addEventListener('click', toggleMenu);

};

export default menuModule;