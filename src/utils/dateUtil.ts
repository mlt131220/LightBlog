import dayjs from 'dayjs';

const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm:ssZ';
const FORMAT_DATE_TIME = 'YYYY-MM-DD HH:mm:ss';
const DATE_FORMAT = 'YYYY-MM-DD';

export function formatToDateTime(
  date: dayjs.Dayjs | undefined = undefined,
  format = DATE_TIME_FORMAT,
): string {
  return dayjs(date).format(format);
}

export function dateTimeFormat(
  date: dayjs.Dayjs | string | Date,
  format = FORMAT_DATE_TIME,
): string {
  return dayjs(date).format(format);
}

export function formatToDate(
  date: dayjs.Dayjs | undefined = undefined,
  format = DATE_FORMAT,
): string {
  return dayjs(date).format(format);
}

export function diffDays(
  startTime: dayjs.Dayjs | string | undefined = undefined,
  endTime: dayjs.Dayjs |string | undefined = undefined,
): number {
  return dayjs(endTime).diff(dayjs(startTime), 'days')
}

export const dateUtil = dayjs;
