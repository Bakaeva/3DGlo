const validationModule = () => {

  //   Реализовать проверку введенных данных в поля ввода с помощью события blur и заменять их на корректные при необходимости по правилам:
  // 1. Должны удаляться все символы, кроме допустимых
  // 2. Несколько идущих подряд пробелов или дефисов должны заменяться на один.
  // 3. Пробелы и дефисы в начале и конце значения должны удаляться.
  // 4. Для поля type=text Первая буква каждого слова должна приводиться к верхнему регистру, а все остальные — к нижнему.

  const REGEX = {
    onlyDigits: /[^\d]/g,
    message: /[^а-яА-ЯёЁ\s-]/g,
    email: /[^a-zA-Z0-9@\-_.!~*']/g,
    phone: /[^\d()\-]/g,
  };

  const filterInput = (input, regex) => {
    input.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(regex, '');
    });
  };

  const formatOnBlur = (input, regex, titleCase = false) => {
    input.addEventListener('blur', (e) => {
      let value = e.target.value;

      value = value.replace(regex, '');  // удаляем все символы, кроме допустимых
      value = value.replace(/\s+/g, ' '); // несколько идущих подряд пробелов заменяем на один
      value = value.replace(/-+/g, '-'); // несколько идущих подряд дефисов заменяем на один
      value = value.replace(/^[\s-]+|[\s-]+$/g, ''); // удаляем пробелы и дефисы в начале и конце
      if (titleCase) {
        value = value
          .toLowerCase()
          .replace(/(^|\s|-)([а-яё])/g, (_, $1, $2) => $1 + $2.toUpperCase());
      }; // перваую букву каждого слова приводим к верхнему регистру, а все остальные — к нижнему (использую скобочные группы, как в видео)

      e.target.value = value;
    });
  };

  document.querySelectorAll('input.calc-item')
    .forEach(input => filterInput(input, REGEX.onlyDigits));

  // Альтернативный вариант, если нужен запрет на ввод "неправильных символов" на этапе ввода данных в поле:
  document.querySelectorAll('input[type="text"]:not(.calc-item)')
    .forEach(input => formatOnBlur(input, REGEX.message, true));
  document.querySelectorAll('input[placeholder="Ваше сообщение"]')
    .forEach(input => formatOnBlur(input, REGEX.message));
  document.querySelectorAll('input[type="email"]')
    .forEach(input => formatOnBlur(input, REGEX.email));
  document.querySelectorAll('input[type="tel"]')
    .forEach(input => formatOnBlur(input, REGEX.phone));

  // Альтернативный вариант, если нужна проверка данных при сохранении формы:
  // document.querySelectorAll('form[name="user_form"]')
  //   .forEach(form => {
  //     form.addEventListener('submit', (e) => {
  //       const messageInputs = form.querySelectorAll('input[type="text"], input[placeholder="Ваше сообщение"]');
  //       const emailInputs = form.querySelectorAll('input[type="email"]');
  //       const phoneInputs = form.querySelectorAll('input[type="tel"]');

  //       e.preventDefault();

  //       let isError = false;
  //       let errMsg = '';

  //       messageInputs.forEach(item => {
  //         if (REGEX.message.test(item.value)) {
  //           isError = true;
  //           errMsg += (errMsg !== '' ? ',' : '') + ' в поле с именем/сообщением (только кириллицу)';
  //         };
  //       });
  //       emailInputs.forEach(item => {
  //         if (REGEX.email.test(item.value)) {
  //           isError = true;
  //           errMsg += (errMsg !== '' ? ',' : '') + ' в поле с E-mail';
  //         };
  //       });
  //       phoneInputs.forEach(item => {
  //         if (REGEX.phone.test(item.value)) {
  //           isError = true;
  //           errMsg += (errMsg !== '' ? ',' : '') + ' в поле с телефоном';
  //         };
  //       });


  //       if (isError) {
  //         alert('Введите корректные данные' + errMsg);
  //         return;
  //       }

  //       // отправка данных, и очистка полей (в случае успешной отправки)
  //     });
  //   });

};

export default validationModule;