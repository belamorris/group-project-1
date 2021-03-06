// Weather API Key 8623bd08ad8f34423c6d55147d29a7a2
// On ready
$(document).ready(function () {
    // Search Btn Click
    $("#searchBtn").click(function (event) {

        // Prevent page reload
        event.preventDefault();
        //Run Validate function
        var validate = Validate();
        // Weather API Key
        var apiKeyW = "8623bd08ad8f34423c6d55147d29a7a2";
        // Make sure there is text in the search input
        $("#searchText").html(validate);
        event.preventDefault();

        if (validate == null) {
            // AJAX call to grab weather information based on search query
            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/weather?q=" + $("#searchText").val() + "&appid=" + apiKeyW + "&units=imperial",
                type: "POST",
                dataType: "JSONP",
                success: function (weather, status, xhr) {
                    // Create a table with table rows holding table data related to weather
                    var table = $("<table><thead><tr></tr></thead>").attr("class", "z-depth-2 bordered striped centered highlight table");
                    table.append("<tbody><tr><td>City:</td><td>" + weather.name + "</td></tr>");
                    table.append("<tr><td>Country:</td><td>" + weather.sys.country + "</td></tr>");
                    table.append("<tr><td>Current Temp:</td><td>" + weather.main.temp + "°F</td></tr>");
                    table.append("<tr><td>Humidity:</td><td>" + weather.main.humidity + "</td></tr>");
                    table.append("<tr><td>Weather:</td><td>" + weather.weather[0].description + "</td></tr>");
                    table.append("<tr><td>Wind Speed:</td><td>" + weather.wind.speed + "</td></tr></tbody></table>");
                    $("#weatherInfo").html(table);
                },


                // If theres an error, log the error
                error: function (xhr, status, error) {
                    console.log("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
                }

            });

        }
    });
    // When AJAX is called, make sure img and title show
    $(document).ajaxStart(function () {
        $(".img-responsive2").show();
        $(".img-responsive1").show();
        $(".img-responsive").show();
        $("#weatherTitle").show();
    });
    // When AJAX stops, hide the img and title
    $(document).ajaxStop(function () {
        $(".img-responsive2").hide();
        $(".img-responsive1").hide();
        $(".img-responsive").hide();
    });
    // Validate function to ensure text exists, if not, display error message
    function Validate() {
        var errorMessage = "";
        if ($("#searchText").val() == null) {
            errorMessage += "Enter a Destination";
        }
        console.log(errorMessage);
    }
});

//if checked, grab search input