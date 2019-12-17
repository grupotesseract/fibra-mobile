export const iso2ddmmaaaa = (isoDate: string) => {
  const splitDatetime = isoDate.split('T');
  const date = splitDatetime[0];
  const time = splitDatetime[1];
  const formattedDate = date.split('-').reverse().join('/')
  if (!time) {
    return formattedDate;
  }
  const splitTime = time.split(':');
  const formattedTime = splitTime[0] + ':' + splitTime[1];
  return formattedDate + ' ' + formattedTime;

};