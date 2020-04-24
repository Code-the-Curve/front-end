import { DateTime } from 'luxon';

export const now = () => DateTime.local().toMillis();
export const startOfNow = () => DateTime.local().startOf('day').toMillis();
export const parse = (value) => DateTime.fromMillis(value);
export const parseISO = (value) => DateTime.fromISO(value);
export const getStartOfDay = () => DateTime.local().startOf('day');
export const getEndOfDay = () => DateTime.local().endOf('day');
export const getStartOfMonth = () => DateTime.local().startOf('month');

export const isEmpty = (value) =>
  typeof value === 'undefined' || value === 0 || value === null;
export const formatIso = (value) =>
  !isEmpty(value) && new Date(value).toISOString();

// toLocaleString format like 'October 14, 1983'.
export const formatCommonDay = (value) =>
  !isEmpty(value) && parse(value).toLocaleString(DateTime.DATE_FULL);

// toLocaleString format like 'Tuesday, October 14, 1983'
export const formatCommonDayAndDayOfWeek = (value) =>
  !isEmpty(value) && parse(value).toLocaleString(DateTime.DATE_HUGE);

// toLocaleString format like 'Oct 14, 1983'
export const formatCommonDate = (value) =>
  !isEmpty(value) && parse(value).toLocaleString(DateTime.DATE_MED);

// toLocaleString format like 'Oct 14, 1983'
export const formatCommonDateShort = (value) =>
  !isEmpty(value) && parse(value).toLocaleString(DateTime.DATE_SHORT);

// toLocaleString format like '09:30 AM'.
export const formatCommonTime = (value) =>
  !isEmpty(value) && parse(value).toLocaleString(DateTime.TIME_SIMPLE);

// toLocaleString 24hr string format like '09:30'
export const formatCommonTimeMilitary = (value) =>
  !isEmpty(value) && parse(value).toLocaleString(DateTime.TIME_24_SIMPLE);

// toLocaleString format like 'Oct 14, 1983, 9:30 AM'.
export const formatCommonDateTime = (value) =>
  !isEmpty(value) && parse(value).toLocaleString(DateTime.DATETIME_MED);
export const formatCommonDayOrTime = (value) => {
  if (isEmpty(value)) {
    return null;
  }

  if (parse(value).valueOf() < getStartOfDay().valueOf()) {
    return formatCommonDate(value);
  }

  return formatCommonTime(value);
};
export const formatCommonDateTimeOrTime = (value) => {
  if (isEmpty(value)) {
    return null;
  }

  if (parse(value).valueOf() < getStartOfDay().valueOf()) {
    return formatCommonDateTime(value);
  }

  return formatCommonTime(value);
};

export const formatCustomDay = (value) => {
  if (isEmpty(value)) {
    return null;
  }

  const today = DateTime.local().startOf('day').valueOf();

  if (value >= today) {
    // If today: today + 12 hour time
    return 'Today';
  }

  const yesterday = DateTime.local().minus({ day: 1 }).startOf('day').valueOf();

  if (value >= yesterday) {
    // If yesterday: yesterday + 12 hour time
    return 'Yesterday';
  }

  const year = DateTime.local().startOf('year').valueOf();

  if (value >= year) {
    const parsedDateTime = parse(value);
    // If this month: month day + 12 hour time
    return `${parsedDateTime.monthShort} ${parsedDateTime.day}`;
  }

  // if previous year: month day, year
  return formatCommonDate(value);
};
export const formatCustomDateTime = (value, settings = { limiter: ' · ' }) => {
  if (isEmpty(value)) {
    return null;
  }

  const { limiter } = settings;
  const today = DateTime.local().startOf('day').valueOf();

  if (value >= today) {
    // If today: today + 12 hour time
    return `Today${limiter}${formatCommonTime(value)}`;
  }

  const yesterday = DateTime.local().minus({ day: 1 }).startOf('day').valueOf();

  if (value >= yesterday) {
    // If yesterday: yesterday + 12 hour time
    return `Yesterday${limiter}${formatCommonTime(value)}`;
  }

  const year = DateTime.local().startOf('year').valueOf();

  if (value >= year) {
    const parsedDateTime = parse(value);
    // If this month: month day + 12 hour time
    return `${parsedDateTime.monthShort} ${
      parsedDateTime.day
    }${limiter}${formatCommonTime(value)}`;
  }

  // if previous year: month day, year
  return formatCommonDate(value);
};

export const formatCustomDayOrTime = (value) => {
  if (isEmpty(value)) {
    return null;
  }

  const today = DateTime.local().startOf('day').valueOf();

  if (value >= today) {
    // If today: 12 hour time
    return formatCommonTime(value);
  }

  const yesterday = DateTime.local().minus({ day: 1 }).startOf('day').valueOf();

  if (value >= yesterday) {
    // If yesterday: yesterday
    return 'Yesterday';
  }

  const year = DateTime.local().startOf('year').valueOf();

  if (value >= year) {
    const parsedDateTime = parse(value);
    // If this month: month day + 12 hour time
    return `${parsedDateTime.monthShort} ${parsedDateTime.day}`;
  }

  // if previous year: month day, year
  return formatCommonDate(value);
};

// const toMilliseconds = value => parse(formatIso(value)).toMillis();
export const toMilliseconds = (value) => new Date(value).valueOf();
export const fromMilliseconds = (value) =>
  value === 0
    ? null
    : DateTime.fromMillis(value).toLocaleString(DateTime.DATE_MED);

/**
 * Gets the time of day from Morning to Night
 * @return {String} Time of day in English
 */
export const getTimeOfDayGreeting = (
  { translationKey } = { translationKey: false }
) => {
  const splitAfternoon = 12;
  const splitEvening = 17;
  const splitNight = 20;
  const currentHour = DateTime.local().hour;
  if (currentHour >= splitAfternoon && currentHour <= splitEvening) {
    return translationKey ? 'datetime.greetings.afternoon' : 'Good Afternoon';
  }
  if (currentHour >= splitEvening && currentHour <= splitNight) {
    return translationKey ? 'datetime.greetings.evening' : 'Good Evening';
  }
  if (currentHour >= splitNight) {
    return translationKey ? 'datetime.greetings.night' : 'Good Night';
  }
  return translationKey ? 'datetime.greetings.morning' : 'Good Morning';
};

export const formatByTruncatedDay = ({ start, end }) => {
  const startDate = parse(start);
  const endDate = parse(end);
  if (startDate.startOf('day').valueOf() === endDate.startOf('day').valueOf()) {
    return `${formatCommonDateShort(start)} - ${formatCommonDateShort(end)}`;
  }
  return `${formatCommonDateShort(start)} - ${formatCommonDateShort(end)}`;
};

export const formatByTruncatedTime = ({ start, end }) => {
  const startDate = parse(start);
  const endDate = parse(end);
  if (startDate.startOf('day').valueOf() === endDate.startOf('day').valueOf()) {
    return `${formatCommonDateTime(start)} - ${formatCommonTime(end)}`;
  }
  return `${formatCommonDateTime(start)} - ${formatCommonDateTime(end)}`;
};

export default {
  formatByTruncatedDay,
  formatByTruncatedTime,
  formatCommonDate,
  formatCommonDateTime,
  formatCommonDateTimeOrTime,
  formatCommonDay,
  formatCommonDayAndDayOfWeek,
  formatCommonDayOrTime,
  formatCommonTime,
  formatCommonTimeMilitary,
  formatCustomDateTime,
  formatCustomDay,
  formatCustomDayOrTime,
  formatIso,
  fromMilliseconds,
  getTimeOfDayGreeting,
  isEmpty,
  now,
  parse,
  toMilliseconds,
};
