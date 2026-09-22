const timerModule = (deadline) => {
  const timerHours = document.getElementById('timer-hours');
  const timerMinutes = document.getElementById('timer-minutes');
  const timerSeconds = document.getElementById('timer-seconds');

  const formatTime = (time) => {
    return String(time).padStart(2, '0');
  };

  const getTimeRemaining = () => {
    const dateStop = new Date(deadline).getTime();
    const dateNow = new Date().getTime();

    let timeRemaining = (dateStop - dateNow) / 1000;

    let seconds = Math.floor(timeRemaining % 60);
    let minutes = Math.floor((timeRemaining / 60) % 60);
    let hours = Math.floor((timeRemaining / 3600) % 24);
    let days = Math.floor(timeRemaining / 3600 / 24);

    return { timeRemaining, hours, minutes, seconds, days };
  };

  const updateClock = () => {
    let getTime = getTimeRemaining();

    let daysSpan = document.getElementById('timer-days');
    if (getTime.days > 0) {
      if (!daysSpan) {
        daysSpan = document.createElement('span');
        daysSpan.id = 'timer-days';
        timerHours.parentNode.insertBefore(daysSpan, timerHours);
        daysSpan.style.marginRight = '50px';
      }
      daysSpan.textContent = `Дней: ${getTime.days}`;
    } else if (daysSpan) {
      daysSpan.remove();
    }

    if (getTime.timeRemaining <= 0) {
      clearInterval(timerId);
      timerHours.textContent = '00';
      timerMinutes.textContent = '00';
      timerSeconds.textContent = '00';
    } else {
      timerHours.textContent = formatTime(getTime.hours);
      timerMinutes.textContent = formatTime(getTime.minutes);
      timerSeconds.textContent = formatTime(getTime.seconds);
    }
  };

  const timerId = setInterval(updateClock, 1000);
  updateClock();
};

export default timerModule;