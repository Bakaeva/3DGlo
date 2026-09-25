// В модуле menu много обработчиков событий на открытие/закрытие меню. Используя делегирование событий сделать обработчики для:
//  Крестика закрытия меню и пунктов меню.
//  Кнопки меню (бургер)
//  Пунктов меню
// У вас должно быть максимум 2 обработчика события в модуле menu
// Написать 1 обработчик для всех событий внутри функции toggleMenu()
// Реализовать следующий функционал: если клик произошел мимо меню, оно закрывается
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