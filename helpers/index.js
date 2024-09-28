export const createSurname = (
  nameSurnameWordsArray,
  capitalizeFirst = false
) => {
  let surname = "";
  for (let i = 1; i < nameSurnameWordsArray.length; i++) {
    if (capitalizeFirst && i === 1) {
      surname += capitalizeFirstLetter(nameSurnameWordsArray[i]);
    } else surname += nameSurnameWordsArray[i];
  }
  return surname;
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const parseBlogDate = (rawTime) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    rawTime.getDate().toString().padStart(2, "0") +
    " " +
    monthNames[rawTime.getMonth()] +
    " " +
    rawTime.getFullYear()
  );
};
