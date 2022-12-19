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

export {formatFullData, formatDayData, formatTime};
