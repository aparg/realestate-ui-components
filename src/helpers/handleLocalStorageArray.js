const prependToLocalStorageArray = (key, value, number = 3) => {
  // Retrieve the array from local storage or initialize an empty array
  let storedArray = JSON.parse(localStorage.getItem(key)) || [];
  //if value is object, check if the object already exists in the array, if so return
  if (
    typeof value === "object" &&
    storedArray.find(
      (item) => item.name === value.name && item.searchType === value.searchType
    )
  ) {
    console.log("object already exists in array");
    return;
  }
  // Prepend the new value to the array
  if (!storedArray.includes(value)) storedArray.unshift(value);
  storedArray = storedArray.slice(0, number);
  // Store the updated array back to local storage
  localStorage.setItem(key, JSON.stringify(storedArray));
};

//remove given string from the localstorage array function
const removeFromLocalStorageArray = (key, value) => {
  let storedArray = JSON.parse(localStorage.getItem(key)) || [];
  storedArray = storedArray.filter((item) => item !== value);
  localStorage.setItem(key, JSON.stringify(storedArray));
};

export { prependToLocalStorageArray, removeFromLocalStorageArray };
