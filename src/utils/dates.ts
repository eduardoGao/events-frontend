export function formatDateToYYYYMMDD(dateValue: Date | string) {
  const date = new Date(dateValue);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1 and pad with '0'
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function formatTimeToHHMM(dateValue: Date | string) {
  const date = new Date(dateValue);

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
}

export const addHours = (date: Date, hoursToAdd: number) => {
  const currentDate = new Date(date);

  currentDate.setHours(currentDate.getHours() + hoursToAdd);

  return currentDate;
};

export const getCombineDateTime = (date: Date | string, time: Date) => {
  const date1 = String(date);
  const time1 = String(time);
  const [year, month, day] = date1.split("-").map(Number);
  const [hours, minutes] = time1.split(":").map(Number);

  const combinedDateTime = new Date(year, month - 1, day, hours, minutes);
  return combinedDateTime;
};
