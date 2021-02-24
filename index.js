const apiKey = "ENTER OWN API KEY HERE"; // ENTER OWN API KEY HERE

const makeCard = (icon, name, description, temp, feelsLike, max, min) => {
  const card = document.querySelector("#weatherCard");
  card.innerHTML = `
<div class="card">
  <div class="row m-4">
    <div class="col">
      <h4 class="card-title">${name}</h5>
      <h6><img src='http://openweathermap.org/img/wn/${icon}.png'>${description}</h6>
    </div>
    <div class="col">
      <h6 class="text-end">it's currently ${temp}C,</h6>
      <h6 class="text-end">but it feels like ${feelsLike}C</h6>
      <br>
      <h6 class="text-end">todays max is: ${max}C,</h6>
      <h6 class="text-end">todays min is: ${min}C,</h6>
    </div>
  </div>
</div>`;
};

const button = document.querySelector("button");
const locationBtn = document.querySelector("#location-btn");

// Go button event
button.addEventListener("click", () => {
  const input = document.querySelector("input");
  getWeatherData(input.value);
});

//Location button event
locationBtn.addEventListener("click", () => {
  const locationIcon = document.querySelector("#location-icon");
  if (locationIcon.classList.contains("bi-geo-alt-fill")) {
    locationIcon.classList.toggle("bi-geo-alt-fill");
    locationIcon.classList.toggle("bi-geo-alt");
  } else if (locationIcon.classList.contains("bi-geo-alt")) {
    locationIcon.classList.toggle("bi-geo-alt-fill");
    locationIcon.classList.toggle("bi-geo-alt");
    // get current location
    const currentLocation = navigator.geolocation.getCurrentPosition(
      (geoPosition) => {
        const lat = geoPosition.coords.latitude;
        const lon = geoPosition.coords.longitude;
        getWeatherDataByLocation(lat, lon);
      }
    );
  }
});
// Fetch API call by latitude and longitude
const getWeatherDataByLocation = async (lat, lon) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );
    //convert response into data
    const data = await response.json();
    console.log(data);
    // Grab needed data
    const temp = data.main.temp;
    const feelsLike = data.main["feels_like"];
    const name = data.name;
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const min = data.main["temp_min"];
    const max = data.main["temp_max"];

    makeCard(icon, name, description, temp, feelsLike, max, min);
  } catch (error) {
    console.log(error);
  }
};

// Fetch API call by city name
const getWeatherData = async (city) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      const card = document.querySelector("#weatherCard");
      card.innerHTML = `<h4>HTTP error! status: ${response.status}</h4>`;
    }

    const data = await response.json();
    console.log(data);
    const temp = data.main.temp;
    const feelsLike = data.main["feels_like"];
    const name = data.name;
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const min = data.main["temp_min"];
    const max = data.main["temp_max"];
    makeCard(icon, name, description, temp, feelsLike, max, min);
  } catch (error) {
    console.log(error);
  }
};
