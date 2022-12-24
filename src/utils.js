import dayjs from 'dayjs';

function formatFullData(data) {
  return dayjs(data).format('DD/MM/YY HH:mm');
}

function formatDayData(data) {
  return dayjs(data).format('DD MMM');
}

function formatTime(data) {
  return dayjs(data).format('HH:mm');
}

function isEscape(evt) {
  return (evt.key === 'Esc' || evt.key === 'Escape');
}

export {formatFullData, formatDayData, formatTime, isEscape};
