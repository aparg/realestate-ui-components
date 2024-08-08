export function capitalizeFirstLetter(str) {
  if (str == undefined) return str;
  //noticed that the route values could have space in their names (eg. kawartha%20lakes), to capitalize both  the words, this small section is added
  if (str.includes("%20")) {
    const words = str.split("%20");
    const capitalizedWords = words.map((word) => capitalizer(word));
    return capitalizedWords.join("%20");
  }
  if (str.includes(" ")) {
    const words = str.split(" ");
    const capitalizedWords = words.map((word) => capitalizer(word));
    return capitalizedWords.join(" ");
  }
  return capitalizer(str);
}

const capitalizer = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
