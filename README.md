THE DAILY FORCAST: 
The Daily Forcast is a city-weather data page that offers users daily weather information for the current day as well as a five-day forcast. Daily weather data includes temperature, humidity, wind speed, and UV Index.

TO USE
The Daily Forcast can be accessed and utilized through the web address https://vanessabau.github.io/WeatherApp/index.html No additional downloads are needed, and to access data one must simply type in the name of a city.

PROCESS
The Daily Forcast building process was piece-by-piece. I started with Pseudo code to structure sections that I could accomplish. 
The overall building order was:
1. Create repository and clone, create files, folders, links, then basic html.

2. Create the html and bootstrap elements which gave the visual layout of the site.

3. Assemble all API addresses and keys, build AJAX calls, and an on-click event listener to run functions.

4. I utilized 3 API sources from the OpenWeather source and utilized moment.js to retrieve the daily weather, the five day forcast, the UV Index, and display the current day.

5. The most challengin facet was dynamically creating the search history list, creating an on-click function for a dynamically created button, and figuring out how to pass the functions the value from the search history list and the local storage. 

6. Finally, I updated the styling and added an extra section to indicate the UV Index color coding. 


RESOURCES:

API: OpenWeatherMap.org: https://openweathermap.org/
API: https://momentjs.com/
BOOTSTRAP: https://getbootstrap.com/
color schemes: https://www.color-hex.com/color-palette/827
Solutions to challenges like creating and on-click on synamically created buttons and grabbing values from local storage came from stack overflow and W3Schools (these have become my favorite two resources for finding answers)
