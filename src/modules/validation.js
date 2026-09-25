const validationModule = () => {

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

  document.querySelectorAll('input.calc-item')
    .forEach(input => filterInput(input, REGEX.onlyDigits));

  // Альтернативный вариант, если нужен запрет на ввод "неправильных символов" на этапе ввода данных в поле:
  // document.querySelectorAll('input[type="text"], input[placeholder="Ваше сообщение"]')
  //   .forEach(input => filterInput(input, REGEX.message));
  // document.querySelectorAll('input[type="email"]')
  //   .forEach(input => filterInput(input, REGEX.email));
  // document.querySelectorAll('input[type="tel"]')
  //   .forEach(input => filterInput(input, REGEX.phone));

  document.querySelectorAll('form[name="user_form"]')
    .forEach(form => {
      form.addEventListener('submit', (e) => {
        const messageInputs = form.querySelectorAll('input[type="text"], input[placeholder="Ваше сообщение"]');
        const emailInputs = form.querySelectorAll('input[type="email"]');
        const phoneInputs = form.querySelectorAll('input[type="tel"]');

        e.preventDefault();

        let isError = false;
        let errMsg = '';

        messageInputs.forEach(item => {
          if (REGEX.message.test(item.value)) {
            isError = true;
            errMsg += (errMsg !== '' ? ',' : '') + ' в поле с именем/сообщением (только кириллицу)';
          };
        });
        emailInputs.forEach(item => {
          if (REGEX.email.test(item.value)) {
            isError = true;
            errMsg += (errMsg !== '' ? ',' : '') + ' в поле с E-mail';
          };
        });
        phoneInputs.forEach(item => {
          if (REGEX.phone.test(item.value)) {
            isError = true;
            errMsg += (errMsg !== '' ? ',' : '') + ' в поле с телефоном';
          };
        });


        if (isError) {
          alert('Введите корректные данные' + errMsg);
          return;
        }

        // отправка данных, и очистка полей (в случае успешной отправки)
      });
    });

};

export default validationModule;