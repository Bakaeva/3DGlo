const timerModule = (deadline) => {
  const timerHours = document.getElementById('timer-hours');
  const timerMinutes = document.getElementById('timer-minutes');
  const timerSeconds = document.getElementById('timer-seconds');

  const formatTime = (time) => {
    return time < 10 ? '0' + time : time;
    // Альтернативный современный вариант: return String(time).padStart(2, '0');
  };

  const getTimeRemainig = () => {
    const dateStop = new Date(deadline).getTime();
    const dateNow = new Date().getTime();

    let timeRemainig = (dateStop - dateNow) / 1000;

    let seconds = Math.floor(timeRemainig % 60);
    let minutes = Math.floor((timeRemainig / 60) % 60);
    let hours = Math.floor(timeRemainig / 3600);
    // let hours = Math.floor((timeRemainig / 3600) % 24);
    // let days = Math.floor(timeRemainig / 3600 / 24);

    return { timeRemainig, hours, minutes, seconds };
  };

  const updateClock = () => {
    let getTime = getTimeRemainig();
    timerHours.textContent = formatTime(getTime.hours);
    timerMinutes.textContent = formatTime(getTime.minutes);
    timerSeconds.textContent = formatTime(getTime.seconds);

    if (getTime.timeRemaining <= 0) {
      clearInterval(timerId);
      timerHours.textContent = '00';
      timerMinutes.textContent = '00';
      timerSeconds.textContent = '00';
    }
  };

  const timerId = setInterval(updateClock, 1000);
  updateClock();
};

export default timerModule;