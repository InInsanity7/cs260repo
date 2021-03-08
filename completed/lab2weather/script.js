//Convert Unix UTC to local time
function unixToLocal(timestamp) {
    var local = new Date((timestamp) * 1000);
    if (local.getHours() <= 12) {
        var hours = local.getHours();
        var ampm = "am";
    }
    else {
        var hours = local.getHours() % 12;
        var ampm = "pm";
    }
    var minutes = "0" + local.getMinutes();
    var formattedTime= hours + ':' + minutes.substr(-2) + ampm;

    return formattedTime;
}


//Begin HTML edit
document.getElementById("weatherSubmit").addEventListener("click", function(event) {
    //<h3revent empty submit
    event.preventDefault();
    const value = document.getElementById("weatherInput").value;
    if (value === "")
        return;

    //FIX testing
    console.log(value);

    //calling OpenWeatherMap API
    const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value +
        ",US&units=imperial" + "&APPID=f75947b71dcbbaa9114d001f2ad96abc";
    fetch(url)
        .then(function(response) {
            return response.json();
        }).then(function(json) {

            //formatting API response
            let results = "";

            //title
            results += '<div class="time"><h2>Weather in ' + json.name + "</h2>";

            //time requested
            results += '<p>' + unixToLocal(json.dt) + ' local time</p></div>';

            //Temp
            results += '<div class="mainTemp"><h3>' + json.main.temp + " &deg;F</h2>";

            //icon
            for (let i=0; i < json.weather.length; i++) {
                results += '<img src="http://openweathermap.org/img/w/'
                    + json.weather[i].icon + '.png"/>';
            }

            //weather basics
            results += "<p>"
            for (let i=0; i < json.weather.length; i++) {
                results += json.weather[i].main
                if (i !== json.weather.length - 1)
                    results += ", "
            }
            results += "</p></div>";

            //max - min
            results += '<div class="extras"><p>' + json.main.temp_max + '&deg;/'
                             + json.main.temp_min + '&deg;';
            //humidity
            results += '<p>' + json.main.humidity + '% Humidity' + '</p>';

            //windspeed
            results += '<p>' + json.wind.speed + 'mph winds headed ';

            //Converting direction deg --> compass
            switch(((json.wind.deg % 360) / 22) | 0) {
                case 0:
                    results += 'North';
                    break;
                case 1:
                case 2:
                    results += 'Northeast';
                    break;
                case 3:
                case 4:
                    results += 'East';
                    break;
                case 5:
                case 6:
                    results += 'Southeast';
                    break;
                case 7:
                case 8:
                    results += 'South';
                    break;
                case 9:
                case 10:
                    results += 'Southwest';
                    break;
                case 11:
                case 12:
                    results += 'West';
                    break;
                case 13:
                case 14:
                    results += 'Northwest';
                    break;
                case 15:
                case 16:
                    results += 'North';
                    break;
                default:
                    results += '(direction undetermined)';
            }
            results += '.</p></div>';

            //Feels like
            results += '<h3>Feels like ' + json.main.feels_like + '&deg;F</h3>';

            //output formatted Sunrise/Sunset
            results += '<img src="http://openweathermap.org/img/w/01d.png"/>';
            results += '<p><strong>Sunrise ' + unixToLocal(json.sys.sunrise) + '</strong>';
            results += ' Sunset ' + unixToLocal(json.sys.sunset) + '</p>';

            document.getElementById("weatherResults").innerHTML = results;
        })
        .catch((error) => {console.error(error);} );

    // Fetch forecast
    const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value +
        ",US&units=imperial" + "&appid=f75947b71dcbbaa9114d001f2ad96abc";
    fetch(url2)
        .then(function(response) {
            return response.json();
        }).then(function(json) {

            console.log(json);

            //formatting forecast
            let forecast = "";
            forecast += "<div class='forecastCont'>";
            forecast += "<div class='forecastTitle'>5-day Forecast</div>";
            forecast += "<div class='forecastInfo'>Temperature and Precipitation Chance</div>";
            for (let k=0; k < 5; k++) {
                forecast += '<div class="colh">' + moment(json.list[k*8].dt_txt)
                    .format('MMMM Do') + '</div>';

                for (let i=0; i < 8; i++) {
                    forecast += '<div class="forecastItems">';
                    forecast += "<h3>" + moment(json.list[k*8+i].dt_txt)
                        .format('h:mma') + "</h3>";
                    forecast += "<p>Temperature: " + json.list[k*8+i].main.temp + "</p>";
                    forecast += '<img src="http://openweathermap.org/img/w/'
                        + json.list[k*8+i].weather[0].icon + '.png"/>';
                    forecast += '<p>Precipitation chance: ' + json.list[k*8+i].pop + '%</p>';
                    forecast += '</div>';
                }
            }
            forecast += "</div>";
            document.getElementById("fiveday").innerHTML = forecast;

        })
        .catch((error) => {console.error(error);} );

});

