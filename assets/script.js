$(document).ready(function () {
    //DISPLAY CURRENT DAY IN JUMBOTRON
    $("#date").html(moment().format("MMMM DD, YYYY").toString());

    //VARIABLES FOR SEARCH ITEMS
    var citySearch;
    
    //localStorage.getItem(JSON.parse(citySearch))
    if (JSON.parse(localStorage.getItem('history'))) {
         citySearch = JSON.parse(localStorage.getItem('history'))
    } else {
         citySearch = []
    }
    console.log(citySearch);
    /*citySearch.each(
        var liOfSearch = $("<li>");
            liOfSearch.attr("class", `list-group-item`);
            liOfSearch.val(cityLookUp.toUpperCase())
            liOfSearch.text(cityLookUp.toUpperCase());
            $("#searchList").append(liOfSearch);
    )*/
    $.each(citySearch, function(index, value) {
        console.log(value);
        //create those li in here
    })

    function get1DayWeather(e) {
        e.preventDefault();
        //save this city to history
        var cityLookUp = $("#city-lookup").val().trim();
    
        // Here we are building the URL we need to query the database
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityLookUp + "&appid=166a433c57516f51dfab1f7edaed8413";
        
        // AJAX call to OpenWeatherMap API
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function (response) {
           
            //render the weather forecast
            var iconCode1 = response.weather[0].icon;
            var temp = response.main.temp;
            var tempF = (response.main.temp - 273.15) * 1.80 + 32;
            var humidity = response.main.humidity;
            var windSpeed = response.wind.speed;
            var lon = response.coord.lon;
            var lat = response.coord.lat;
            var timezone = response.timezone;

            //Transfer to HTML
            $("#city2Day").text(cityLookUp.toUpperCase());
            citySearch.push(cityLookUp.toUpperCase())
            localStorage.setItem('history', JSON.stringify(citySearch))
            
            $("#icon2Day").attr("src", "http://openweathermap.org/img/wn/" + iconCode1 + "@2x.png");
            $("#temp2Day").text("Temperature: " + tempF.toFixed(2) + "°F");
            $("#humidity2Day").text("Humidity: " + humidity);
            $("#wind2Day").text("Wind Speed: " + windSpeed);
            //console.log(cityLookUp.toUpperCase());
            /*var liOfSearch = $("<li>");
            liOfSearch.attr("class", `list-group-item`);
            liOfSearch.val(cityLookUp.toUpperCase())
            liOfSearch.text(cityLookUp.toUpperCase());
            $("#searchList").append(liOfSearch);*/
            
            function testTest(params) {
                params.preventDefault()

                //function recursion - get the weather forecast
            }
            $(".list-group-item").click(testTest);
        
            //UV Index API call
            function getUv(lat, lon) {
                var queryURL = "http://api.openweathermap.org/data/2.5/uvi?appid=166a433c57516f51dfab1f7edaed8413&lat="+lat+"&lon=" + lon;
                $.ajax({
                    url: queryURL,
                    method: 'GET'
                }).then(function (response) {
                    $("#uv2Day").text("UV Index: "+ response.value);
                })
            }
            getUv(lat, lon);
        })

        get5day(cityLookUp);
    }

    
    //5 Day forcast API call
    function get5day(city) {
        var city = $("#city-lookup").val().trim();
    
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=166a433c57516f51dfab1f7edaed8413";
        
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function (response) {
            

            for (var i = 0; i < 5; i++) {
                var tempF5 = ((response.list[i].main.temp - 273.15) * 1.80 + 32).toFixed(2);
                var humidity5 = response.list[i].main.humidity;
                var iconCode5 = response.list[i].weather[0].icon;

                var forcastDiv = $("<div class='card col' id='eachDay'>").html(
                    "Day: " + (i+1) + "<br>" +
                    "Temperature: "+ tempF5 + "°F <br>"+
                    "Humidity: " + humidity5 + "<br>" +
                    "<img src='http://openweathermap.org/img/wn/" + iconCode5 + "@2x.png' style='width: 30px'></div>"
                );

                $("#forcast").append(forcastDiv);
            }
        })
    }
    

    //on click launch function
    $("#submitBtn").on("click", get1DayWeather);

    //on click listener to get the city from localstorage
})
