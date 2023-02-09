import dayjs from 'dayjs';

function formatFullDate(date) {
  return dayjs(date).format('DD/MM/YY HH:mm');
}

function formatDateForSort(date) {
  return parseInt(dayjs(date).format('YYMMDD'), 10);
}

function formatDayDate(date) {
  return dayjs(date).format('MMM DD');
}

function formatTime(date) {
  return dayjs(date).format('HH:mm');
}

function isEscape(evt) {
  return (evt.key === 'Esc' || evt.key === 'Escape');
}

export { formatFullDate, formatDateForSort, formatDayDate, formatTime, isEscape };
