const pexelsApiKey = "263AIKTJEABXQrOgn37iGvJ5yYhhYcM76Qgv2SIitIwCWFLoLImUhdXS";

const screenWidth = Math.round(window.innerWidth);
const screenHeight = Math.round(window.innerHeight);

let weather = {
  apiKey: "a1321a705a5d2ebee71f51cd279649e1", // your OpenWeather key

  fetchWeather(city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}`
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data))
      .catch((error) => {
        console.log("There was a problem with the fetch operation: ", error);
      });
  },

  displayWeather(data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    console.log(name, icon, description, temp, humidity, speed);

    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".humidity").innerText =
      "Humidity : " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind Speed : " + speed + " km/hr";
    document.querySelector(".temp").innerText =
      Math.round(temp - 273.15) + "°C";
    document.querySelector(".weather").classList.remove("loading");

    this.fetchBackgroundImage(name);
  },

  fetchBackgroundImage(query) {
    fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=1`, {
      headers: {
        Authorization: pexelsApiKey,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // If photos exist, pick the first one
        if (data && data.photos && data.photos.length > 0) {
          // const photoUrl = data.photos[0].src.large2x;
          const photoUrl = `${data.photos[0].src.original}?auto=compress&w=${screenWidth}&h=${screenHeight}&fit=crop`;
          // const photoUrl = data.photos[0].src.original;
          document.body.style.backgroundImage = `url('${photoUrl}')`;
        } else {
          document.body.style.backgroundColor = "#333";
        }
      })
      .catch((error) => {
        console.error("Error fetching image from Pexels:", error);
      });
  },

  search() {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

// Default city to load
weather.fetchWeather("Toronto");
