export const reformedQueryDate = (date: string) => {
  const inputDate = new Date(date);
  const timezoneOffset = new Date().getTimezoneOffset() * -60000;
  const timezoneOffsetStr = new Date(timezoneOffset).toISOString().slice(11, 16);
  const outputDateStr = `${inputDate.getFullYear()}-${String(
    inputDate.getMonth() + 1,
  ).padStart(2, '0')}-${String(inputDate.getDate()).padStart(2, '0')}T${String(
    inputDate.getHours(),
  ).padStart(2, '0')}:${String(inputDate.getMinutes()).padStart(
    2,
    '0',
  )}:${String(inputDate.getSeconds()).padStart(2, '0')}.${String(
    inputDate.getMilliseconds(),
  ).padStart(3, '0')}${timezoneOffsetStr}`;
  return outputDateStr;
};