$(document).ready(function() {
    //VARIABLES FOR SEARCH ITEMS
    
    function get1DayWeather(e){
        e.preventDefault();
        //save this city to history
        var cityLookUp = $("#city-lookup").val().trim();
        console.log(cityLookUp);
    
        // Here we are building the URL we need to query the database
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityLookUp + "&appid=166a433c57516f51dfab1f7edaed8413";
        console.log(queryURL);
        
        // Here we run our AJAX call to the OpenWeatherMap API
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function(response) {
            console.log(response);

            //render the weather forecast
            var iconCode1 = response.weather[0].icon;
            var temp = response.main.temp;
            var tempF = (response.main.temp - 273.15) * 1.80 + 32;
            var humidity = response.main.humidity;
            var windSpeed = response.wind.speed;
            var lon = response.coord.lon;
            var lat = response.coord.lat;
            var timezone = response.timezone;

            //TESTING/DEBUGGING
            console.log(iconCode1);
            console.log(temp);
            console.log(tempF);
            console.log(humidity);
            console.log(windSpeed);
            console.log(lon, lat);
            console.log(timezone);
            console.log(cityLookUp);

            //TRANSFER TO HTML
            $("#city2Day").text(cityLookUp);
            
            $("#temp2Day").text("Temperature: "+ tempF.toFixed(2)+ "°F");
            $("#humidity2Day").text("Humidity: " + humidity);
            $("#wind2Day").text("Wind Speed: " + windSpeed);

        })
        get5day(cityLookUp);
    }

    function get5day(city) {
        var city = $("#city-lookup").val().trim();
        console.log(city);

        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+ city + "&appid=166a433c57516f51dfab1f7edaed8413";
        console.log(queryURL);
        
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function(response) {
            console.log(response);
            
            for (var i=0; i<2; i++){

                var temp5 = response.list[i].main.temp;
                var tempF5 = (response.list[i].main.temp - 273.15) * 1.80 + 32;
                var humidity5 = response.list[i].main.humidity;
                var iconCode5 = response.list[i].weather[0].icon;
                
                console.log(temp5);
                console.log(tempF5); 
                console.log(humidity5); 
                console.log(iconCode5);
            }

            
           // $("#forcast").text("Humidity: "+ response.list[i].main.humidity);
        })
    }

    
      //on click launch function
      $("#submitBtn").on("click", get1DayWeather);

      //on click listener to get the city from localstorage
}) 
