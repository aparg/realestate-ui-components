export const saleLease = {
  sale: { name: "For Sale", value: "Sale" },
  lease: { name: "For Lease", value: "Lease" },
  // all: { name: "All", value: undefined },
};

// export const listingType = {
//   business: { name: "Business", value: ".B." },
//   office: { name: "Office", value: ".1." },
//   retail: { name: "Retail", value: ".Q." },
//   industrial: { name: "Industrial", value: ".I." },
//   investment: { name: "Investment", value: ".U." },
//   land: { name: "Land", value: ".L." },
// };

export const listingType = {
  "gas station": { name: "Gas Station", value: "Gas Stations" },
  motel: {
    name: "Motel",
    value: "Hotel/Motel/Inn",
  },
  "convenience store": {
    name: "Convenience Store",
    value: "Convenience/Variety",
  },
  restaurant: {
    name: "Restaurant",
    value: "Restaurant",
  },
};

export const areas = {
  GTA: {
    name: "GTA",
    value: [
      // "Toronto",
      "Mississauga",
      "Brampton",
      "Markham",
      "Vaughan",
      "Richmond Hill",
      "Oakville",
      "Burlington",
      "Pickering",
      "Oshawa",
      "Whitby",
      "Ajax",
      "Caledon",
      "Halton Hills",
      "Milton",
      "Newmarket",
      "Aurora",
      "King",
      "Whitchurch-Stouffville",
      "East Gwillimbury",
      "Georgina",
      "Bradford West Gwillimbury",
      "Brock",
      "Scugog",
      "Uxbridge",
      "Clarington",
      "Mono",
      "Adjala-Tosorontio",
      "Essa",
      "Innisfil",
      "New Tecumseth",
    ],
  },
  ontario: {
    name: "Ontario",
    value: [], //this value is empty array because the api doesn't need any queries for displaying all ontario listings
  },
};

const firstDateOfMonth = () => {
  var currentDateUTC = new Date(Date.now());

  currentDateUTC.setUTCDate(1);

  var startDateOfMonthUTC = currentDateUTC.toISOString().split("T")[0];
  return startDateOfMonthUTC;
};

const firstDateofLastSixMonths = () => {
  var currentDate = new Date();

  currentDate.setMonth(currentDate.getMonth() - 6);
  currentDate.setDate(1);

  var formattedDate = currentDate.toISOString().slice(0, 10);
  return formattedDate;
};

const firstDateOfWeek = () => {
  // Get the current date
  var currentDate = new Date();

  // Calculate the difference between the current day and the first day of the week (0: Sunday, 1: Monday, ..., 6: Saturday)
  var firstDayOfWeek = currentDate.getDay();
  var diff = currentDate.getDate() - firstDayOfWeek;

  // Set the date to the first day of the current week
  currentDate.setDate(diff);

  // Format the date to YYYY-MM-DD
  var formattedDate = currentDate.toISOString().slice(0, 10);

  // Output the date of the first day of the current week
  return formattedDate;
};

const getLastDateOfLastWeek = () => {
  // Get the current date
  var currentDate = new Date();

  // Calculate the difference between the current day and the first day of the week (0: Sunday, 1: Monday, ..., 6: Saturday)
  var firstDayOfWeek = currentDate.getDay();
  var diff = currentDate.getDate() - firstDayOfWeek;

  // Set the date to the first day of the current week
  currentDate.setDate(diff);

  // Subtract 7 days to get the first day of the last week
  currentDate.setDate(currentDate.getDate() - 7);

  // Format the date to YYYY-MM-DD
  var formattedDate = currentDate.toISOString().slice(0, 10);

  // Output the date of the first day of the last week
  return formattedDate;
};

const todayDate = () => {
  const currentDate = new Date(Date.now());
  const formattedData = currentDate.toISOString().slice(0, 10);
  return formattedData;
};

function get24HoursAgoTime() {
  // Get current date and time
  const currentDate = new Date();

  // Subtract 24 hours (24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
  const twentyFourHoursAgo = new Date(
    currentDate.getTime() - 24 * 60 * 60 * 1000
  );

  // Format the date in the desired format: YYYY-MM-DD HH:mm:ss.s
  const formattedTime = twentyFourHoursAgo
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  return formattedTime;
}

export const numberOfDays = {
  thisWeek: { name: "This Week", value: firstDateOfWeek(), userFilter: true },
  lastWeek: {
    name: "Last Week",
    value: getLastDateOfLastWeek(),
    userFilter: true,
  },
  thisMonth: {
    name: "This Month",
    value: firstDateOfMonth(),
    userFilter: true,
  },
  lastSixMonths: {
    name: "Last Six Months",
    value: firstDateofLastSixMonths(),
    userFilter: true,
  },
  twentyFourHrsAgo: {
    name: "Today",
    value: get24HoursAgoTime(),
    userFilter: false,
  },
};
