# WeatherApp
Weather data app

The weather app allows users to type in a city name and retrieve current and future weather conditions for the selected city, and searched cities are added to the "search history"

CURRENT WEATHER: 
- conditions must include: city name, date, icon representing weather conditions, temperature, humidity, wind speed, and UV index.
- Viewing UV Index displays a color indicating whether conditinos are favorable, moderate, or severe. 

FUTURE WEATHER: 
- displays 5-day forcast
- Each 5-day forcast includes the date, an icon of weather conditions, temperature, and humidity.

SEARCH HISTORY:
- Clicking on a city in search history displays the current and future weather conditions
- When the page is opened the information from the last city searched is displayed. 

PSEUDO CODE

1. SETUP (DONE)
    - build html, script sheet, css sheet and link all pages
    - Insert links in html to bootstrrap and jquery

2. CREATE BASIC PAGE (DONE)
    - Format html and css to hold contents

3. API
    - Select API(s)
        * need current conditions api call 
        * need UV Index API call
    - link to API
    - Create AJAX call

4. TARGET DATA FOR API CALLS
    - create variables to hold targeted data: 
        * Current weather: city name, date, weather conditions, temperature, humidity, wind speed, UV Index
        * 5 day forcast: weather conditions icon, temperature, humidity

5. ? Might need to convert city location from API call to longitude and latitude for UV data

5.5 convert temperature to farenheit

6. Create on click function for submit button to search for a city's data

7. Dynamically update the html with data retrieved from API calls

8. Store respnse data in local storage

9. Link name titles of previously searched cities to on click events that display their current and past weather

10. Make sure the last city search displays on page load


