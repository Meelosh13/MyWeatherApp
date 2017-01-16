if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
        var apiKey = "7f4568b9e87fc3cebe2e519922ed1ccb"; //   https://openweathermap.org/current#current_JSON
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        var apiUrl = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat +
            "&lon=" + lon + "&units=metric&APPID=" + apiKey;
        var testUrl;
        $(document).ready(function () {
            $.getJSON(apiUrl) 
                .success(function (location) {
                    $('#temp').html(Math.round(location.main.temp));
                    $('#city').html(location.name);
                    $('#code').html(location.sys.country);
                    if (location.weather[0].main === "Clear") {
                        $("#weatherIcon").addClass("weatherIcon-clear")
                    }else if (location.weather[0].main === "Mist") {
                        $("#weatherIcon").addClass("weatherIcon-cloud")
                    }else if (location.weather[0].main === "Clouds") {
                        $("#weatherIcon").addClass("weatherIcon-cloud")
                    }else if (location.weather[0].main === "Rain") {
                        $("#weatherIcon").addClass("weatherIcon-rain")
                    }else if (location.weather[0].main === "Snow") {
                        $("#weatherIcon").addClass("weatherIcon-snow")
                    }else if (location.weather[0].main === "Extreme") {
                        $("#weatherIcon").addClass("weatherIcon-thunderAndRain")
                    }else {
                        $("#weatherIcon").html(location.weather[0].main + "description: " + location.weather[0].description);
                    }

                    $("#calculate").on('click', function () {
                        if ($('#degree').html() === ' ℃') {
                            $('#degree').html(' &#8457;');
                            $('#temp').html(Math.round(location.main.temp * 9 / 5 + 32));
                        }else{
                            $('#degree').html(' &#8451;');
                            $('#temp').html(Math.round(location.main.temp));
                        }
                    });
                });

        });
    });
} else {
    console.log('geolocation IS NOT available!');
}
/* test URL -  http://api.openweathermap.org/data/2.5/weather?lat=35.689499&lon=139.691711&APPID=7f4568b9e87fc3cebe2e519922ed1ccb */