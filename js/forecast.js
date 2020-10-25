// api key
const key = "key";

// GET THE WEATHER CONDITION INFORMATION
const getWeather = async (id) => {
  // here id means key from city
  const base = "http://dataservice.accuweather.com/currentconditions/v1/";
  const query = `${id}?apikey=${key}`;

  const response = await fetch(base + query);
  const data = await response.json();

  return data[0];
};

// GET THE CITY API CALL/INFORMATION
const getCity = async (city) => {
  // city search URL
  const base = "http://dataservice.accuweather.com/locations/v1/cities/search";
  // making query
  const query = `?apikey=${key}&q=${city}`;

  // fetching the combo of base + query
  const response = await fetch(base + query);
  // parse the data into objects
  const data = await response.json();

  // first object is the precise one
  return data[0];
};

// getCity('pune').then(data => {
// providing key to the weather function & as it returns a promise we can tack on then() which gets the key
//     return getWeather(data.Key);
// }).then(data => {
// we get the key
//     console.log(data);
// }).catch(err => {
//     console.log(err);
// });
