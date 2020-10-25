const cityForm = document.querySelector(".change-location");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");

// updating the UI
const updateUI = (data) => {
  // getting the values
  console.log(data);
  // const cityDetails = data.cityDetails;
  // const weather = data.weather;

  // destructure propertiees. This happens only when you have same name of const & property name
  const { cityDetails, weather } = data;
  // what this says, from this data object we want to get the cityDetails as well as weather

  // update details template
  details.innerHTML = `<h5 class="my-3">${cityDetails.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>`;

  // udpate the night/day & icon images

  let iconSrc = `img/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);

  let timeSrc = null;
  // if(weather.IsDayTime) {
  //     timeSrc = 'img/day.svg';
  // }else {
  //     timeSrc = 'img/night.svg';
  // }
  weather.IsDayTime ? (timeSrc = "img/day.svg") : (timeSrc = "img/night.svg");

  time.setAttribute("src", timeSrc);

  // remove d-none class if present to show the card
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

const updateCity = async (city) => {
  // console.log(city);

  const cityDetails = await getCity(city);
  const weather = await getWeather(cityDetails.Key);

  // here you can see property name & the value has same name
  // return {
  //     cityDetails: cityDetails,
  //     weather: weather
  // };

  // if that's the case then
  return {
    cityDetails,
    weather,
  };
};

cityForm.addEventListener("submit", (e) => {
  // prevent default action of refreshing
  e.preventDefault();

  // get the city value
  const city = cityForm.city.value.trim();
  cityForm.reset();

  updateCity(city)
    .then(data => {
      // console.log(data);
      updateUI(data);
    })
    .catch(err => {
      console.log(err);
    });

  // set local storage
  localStorage.setItem("city", city);
});

if (localStorage.getItem("city")) {
    // As updateCity returns promise so we can tack on then & catch method
    updateCity(localStorage.getItem("city"))
        .then(data => {
            updateUI(data);
        }).catch(err => {
            console.log(err);
        });
}
