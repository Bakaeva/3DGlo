const calcModule = (price = 100) => {
  const calcBlock = document.querySelector('.calc-block');
  const calcType = calcBlock.querySelector('.calc-type');
  const calcSquare = calcBlock.querySelector('.calc-square');
  const calcCount = calcBlock.querySelector('.calc-count');
  const calcDay = calcBlock.querySelector('.calc-day');
  const total = document.getElementById('total');

  const calculateTotal = () => {
    if (!calcType.value || !calcSquare.value)
      return 0;

    const calcTypeValue = +calcType.options[calcType.selectedIndex].value;
    const calcSquareValue = +calcSquare.value;
    const calcCountValue = !calcCount.value ? 1 : (+calcCount.value);
    const calcDayValue = !calcDay.value ? 10 : (+calcDay.value);

    const getCountCoefficient = (count) => {
      return count === 1 ? 1 : (1 + count * 0.1);
    };

    const getPeriodCoefficient = (days) => {
      return days >= 10 ? 1 : (days < 5 ? 2 : 1.5);
    };

    let totalValue = price * calcTypeValue * calcSquareValue * getCountCoefficient(calcCountValue) * getPeriodCoefficient(calcDayValue);

    return totalValue;
  };

  calcBlock.addEventListener('change', (e) => {
    if (e.target.matches('.calc-item')) {
      if (e.target.matches('.calc-count, .calc-day') && e.target.value.replace(/0+/g, '0') === '0') e.target.value = ''; // удаляю 0 в полях к-во помещений и к-во дней, чтобы в расчёт ушли значения по умолчанию: 1 и 10

      total.textContent = calculateTotal();
    };
  });

};

export default calcModule;