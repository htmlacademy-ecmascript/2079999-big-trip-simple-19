import dayjs from 'dayjs';

function formatFullDate(date) {
  return dayjs(date).format('DD/MM/YY HH:mm');
}

function formatDayDate(date) {
  return dayjs(date).format('DD MMM');
}

function formatTime(date) {
  return dayjs(date).format('HH:mm');
}

function isEscape(evt) {
  return (evt.key === 'Esc' || evt.key === 'Escape');
}

export { formatFullDate, formatDayDate, formatTime, isEscape };
