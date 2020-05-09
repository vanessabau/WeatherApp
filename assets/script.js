$(document).ready(function () {

    var cityLinks = document.querySelectorAll("a");
    
    //DISPLAY CURRENT DAY IN JUMBOTRON
    $("#date").html(moment().format("MMMM DD, YYYY").toString());
 
    //GET 1 DAY WEATHER DATA
    function get1DayWeather(e) {
        e.preventDefault();
        //save city to local history
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
        var searchHistory = $("<div class='card searchHistory'>").html("<button type='button' class='btn btn-link'>"+city+"</button>");

        //Transfer to HTML
        $("#city2Day").text(city);
        $("#icon2Day").attr("src", "http://openweathermap.org/img/wn/" + iconCode1 + "@2x.png");
        $("#temp2Day").text("Temperature: " + tempF.toFixed(2) + "°F");
        $("#humidity2Day").text("Humidity: " + humidity);
        $("#wind2Day").text("Wind Speed: " + windSpeed);
        $("#searchList").append(searchHistory);

        //UV Index API call
        function getUv(lat, lon) {
            //UV Index API Call
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
    function get5day(city5) {
        var city5 = $("#city-lookup").val().trim();
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city5 + "&appid=166a433c57516f51dfab1f7edaed8413";
        
        //5 Day forcast Ajax
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function (response) {
            $("#forcast").empty();  

            for (var i = 0; i < 5; i++) {
                var tempF5 = ((response.list[i].main.temp - 273.15) * 1.80 + 32).toFixed(2);
                var humidity5 = response.list[i].main.humidity;
                var iconCode5 = response.list[i].weather[0].icon;
                var forcastDiv = $("<div class='card col' id='eachDay'>").html("Day: " + (i+1) + "<br>" +
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

    //on click for search history buttons
    $("#searchList").on("click", ".btn-link", function(){
        console.log("worked");
    });
})



 //on click launch function
    //$(".clickMe").on("click", testing);

    //on click listener to get the city from localstorage
   // $("a").on("click", function(e){
       // e.preventDefault();
       // alert("worked");
    //});*/
 //console.log(cityLookUp.toUpperCase());
            /*var liOfSearch = $("<li>");
            liOfSearch.attr("class", `list-group-item`);
            liOfSearch.val(cityLookUp.toUpperCase())
            liOfSearch.text(cityLookUp.toUpperCase());
            $("#searchList").append(liOfSearch);*/


 /* 
 
 function testTest(params) {
        params.preventDefault()
        alert("works");
        //function recursion - get the weather forecast
    }
    $(".clickMe").click(testTest);
 
 var citySearch;
    citySearch.push(cityLookUp.toUpperCase())
            localStorage.setItem('history', JSON.stringify(citySearch))
            
    //localStorage.getItem(JSON.parse(citySearch))
    if (JSON.parse(localStorage.getItem('history'))) {
         citySearch = JSON.parse(localStorage.getItem('history'))
    } else {
         citySearch = []
    }
    console.log(citySearch);
    citySearch.each(
        var liOfSearch = $("<li>");
            liOfSearch.attr("class", `list-group-item`);
            liOfSearch.val(cityLookUp.toUpperCase())
            liOfSearch.text(cityLookUp.toUpperCase());
            $("#searchList").append(liOfSearch);
    )
    $.each(citySearch, function(index, value) {
        console.log(value);
        //create those li in here
    })*/