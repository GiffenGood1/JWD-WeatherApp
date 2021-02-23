const apiKey = "ENTER OWN API KEY HERE"; // ENTER OWN API KEY HERE

const makeCard = (icon, name, description, temp, feelsLike) => {
  const card = document.querySelector("#weatherCard");
  card.innerHTML = `
<div class="card">
  <div class="row m-4">
    <div class="col">
      <h4 class="card-title">${name}</h5>
      <h6>${description}</h6>
    </div>
    <div class="col">
      <h6 class="text-end">${temp}C, feels like ${feelsLike}C</h6>
      <img src='http://openweathermap.org/img/wn/${icon}.png'>
    </div>
  </div>
</div>`;
};

const getWeatherData = (city) =>
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      const temp = data.main.temp;
      const feelsLike = data.main["feels_like"];
      const name = data.name;
      const description = data.weather[0].description;
      const icon = data.weather[0].icon;

      makeCard(icon, name, description, temp, feelsLike);
    })
    .catch((error) => console.log("error"));

const button = document.querySelector("button");

button.addEventListener("click", () => {
  const input = document.querySelector("input");
  getWeatherData(input.value);
});
