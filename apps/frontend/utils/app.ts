const opt: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  hour12: false,
};
export const formatDate = (
  date: Date,
  options: Intl.DateTimeFormatOptions = opt
): string => new Intl.DateTimeFormat('ar-EG', options).format(date);
