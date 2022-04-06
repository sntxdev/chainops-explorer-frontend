export const formatTime = (s: any) => {
  const dtFormat = new Intl.DateTimeFormat("en-GB", {
    timeStyle: "medium",
    timeZone: "UTC",
  });

  return dtFormat.format(new Date(s));
};
// console.log(formatTime(12345)); // "03:25:45"
