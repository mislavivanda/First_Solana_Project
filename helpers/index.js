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
