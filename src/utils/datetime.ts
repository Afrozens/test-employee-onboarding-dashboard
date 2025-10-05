export const convertDateFormat = (inputDate: Date) => {
  const year = inputDate.getFullYear();
  const month = String(inputDate.getMonth() + 1).padStart(2, '0');
  const day = String(inputDate.getUTCDate()).padStart(2, '0');
  const hours = String(inputDate.getHours()).padStart(2, '0');
  const minutes = String(inputDate.getMinutes()).padStart(2, '0');
  const seconds = String(inputDate.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

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