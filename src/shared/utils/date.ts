export const addWeekDays = (startDate: Date, count = 0) => {
  if (
    startDate.getDay() % 6 === 0 ||
    startDate.getDay() === new Date().getDay()
  )
    count++;

  return Array.from({ length: count }).reduce((d: Date) => {
    d = new Date(d.setDate(d.getDate() + 1));
    if (d.getDay() % 6 === 0)
      d = new Date(d.setDate(d.getDate() + (d.getDay() / 6 + 1)));
    return d;
  }, startDate);
};

export const formattedDate = (date: Date) => {
  const offset = date.getTimezoneOffset();
  date = new Date(date.getTime() - offset * 60 * 1000);
  return date.toISOString().split("T")[0];
};
