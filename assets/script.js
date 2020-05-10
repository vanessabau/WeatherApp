$(document).ready(function () {
    //Load city from local storage and run function on page load 
    storedCity();

    function storedCity(){
       var lastCity = localStorage.getItem('city');
        $("#city-lookup").empty();
        $("#city-lookup").val(lastCity);
        
        get1DayWeather();  
    }

    //Display current day in jumbotron
    $("#date").html(moment().format("MMMM DD, YYYY").toString());
 
    //Get 1 day weather data 
    function get1DayWeather() {
        
        //save user's city input to local history
        var cityLookUp = $("#city-lookup").val().trim();
        var city = cityLookUp.toUpperCase();
        localStorage.setItem('city', city);

        // Weather Call URL
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityLookUp + "&appid=166a433c57516f51dfab1f7edaed8413";
        
        // AJAX call to OpenWeatherMap API
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function (response) {
           
        //Variables to render weather forecast
        var iconCode1 = response.weather[0].icon;
        var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        var humidity = response.main.humidity;
        var windSpeed = response.wind.speed;
        var lon = response.coord.lon;
        var lat = response.coord.lat;
        var searchHistory = $("<div class='card searchHistory'>").html("<button type='button' class='btn btn-link' id='"+city+"'>"+city+"</button>");

        //Transfer to HTML
        $("#city2Day").text(city);
        $("#icon2Day").attr("src", "http://openweathermap.org/img/wn/" + iconCode1 + "@2x.png");
        $("#temp2Day").text("Temperature: " + tempF.toFixed(2) + "°F");
        $("#humidity2Day").text("Humidity: " + humidity);
        $("#wind2Day").text("Wind Speed: " + windSpeed);
        $("#searchList").append(searchHistory);

        //UV Index API call
        function getUv(lat, lon) {
            
            var queryURL = "http://api.openweathermap.org/data/2.5/uvi?appid=166a433c57516f51dfab1f7edaed8413&lat="+lat+"&lon=" + lon;
            $.ajax({
                url: queryURL,
                method: 'GET'
            }).then(function (response) {
                //Target lat and lon of 1 day api call and pass values to UV Index
                $(".uv").text("UV Index: "+ response.value);
                //Convert value to floating point number
                var cityUv = parseFloat(response.value);
                console.log(cityUv);
                //If/else statement to assign id's to target sections to assign colors
                if(cityUv<3){
                    $(".uv").attr("id", "favorable");
                }
                else if((3<=cityUv) && (cityUv<7) ){
                    $(".uv").attr("id", "moderate");
                }
                else {
                    $(".uv").attr("id", "severe");
                }
            })
            }
            //Call UV Index function
            getUv(lat, lon);
        })
        //Call 5 Day forcast function
        get5day(cityLookUp);
    }

    //Define 5 Day forcast function
    function get5day(city5) {
        var city5 = $("#city-lookup").val().trim();
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city5 + "&appid=166a433c57516f51dfab1f7edaed8413";
        
        //5 Day forcast API call
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function (response) {
            $("#forcast").empty();  
            //Loop through results to populate 5-day forcast dynamically
            for (var i = 0; i < 5; i++) {
                var tempF5 = ((response.list[i].main.temp - 273.15) * 1.80 + 32).toFixed(2);
                var humidity5 = response.list[i].main.humidity;
                var iconCode5 = response.list[i].weather[0].icon;
                var forcastDiv = $("<div class='card col' id='eachDay'>").html("Day: " + (i+1) + "<br>" +
                    "Temperature: "+ tempF5 + "°F <br>"+
                    "Humidity: " + humidity5 + "<br>" +
                    "<img src='http://openweathermap.org/img/wn/" + iconCode5 + "@2x.png' style='width: 30px'></div>"
                );
                //Append 5-day forcast to their html section
                $("#forcast").append(forcastDiv);   
            }
        })
    }
  
    //on click launch main function
    $("#submitBtn").on("click", get1DayWeather);

    //on click of search history buttons to launch function with city from search history
    $("#searchList").on("click", ".btn-link", function(){
        //grab button name
        var buttonName = $(this).attr("id").toString();
        console.log(buttonName);
        //set city-lookup val to button name
        $("#city-lookup").empty();
        $("#city-lookup").val(buttonName);
        //run function
        get1DayWeather();   
    });

})
