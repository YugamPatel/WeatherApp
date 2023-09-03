screenWidth = Math.round(window.innerWidth) ;
screenHeight = Math.round(window.innerHeight) ;
let weather = {
    apiKey: "a1321a705a5d2ebee71f51cd279649e1", // Enclosed in quotes
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
      document.querySelector(".city").innerText = "Weather in " + name ;
      document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png" ;
      document.querySelector(".description").innerText = description ;
      document.querySelector(".humidity").innerText = "Humidity : "+ humidity + "%" ;
      document.querySelector(".wind").innerText = "Wind Speed : " + speed +" km/hr" ;
      document.querySelector(".temp").innerText = Math.round(temp-273.15) + "°C" ;
      document.querySelector(".weather").classList.remove("loading");
      document.body.style.backgroundImage = "url('https://source.unsplash.com/random/"+screenWidth+"×"+ screenHeight + "/? "+ name +"')" ;
    },

    search(){
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
  };
  
  document.querySelector(".search button").addEventListener("click",function(){
    weather.search();
  });

  document.querySelector(".search-bar").addEventListener("keyup",function(event){
    if(event.key == "Enter"){
        weather.search();
    }
  })

  weather.fetchWeather("Toronto");