



// George
const currentDate = moment().format("YYYY-MM-DD");
let airQualityIndexDisplay = [];

displayAQ();
getSportsGames();
getLocalStorage();

function displayAQ() {
    let aqiCityArray = ["Salt Lake City", "New York-Northern New Jersey-Long Island", "Los Angeles-Long Beach-Santa Ana"];
    for (city in aqiCityArray) {
        let airQualityUrl = "https://api.openaq.org/v1/measurements?country=US&city=" + aqiCityArray[city] + "&date_from=" + currentDate + "&order_by=date&parameter=pm25"
        $.ajax({
            url: airQualityUrl,
            method: "GET"
        }).then(function (response) {
            let averageArray = [];
            for (result in response.results) {
                averageArray[result] = response.results[result].value;
            }
            //creating AQI from average pm2.5 air data 
            average = averageArray.reduce((a, b) => a + b, 0);
            average = average / averageArray.length;
            let airQualityIndex = average * 4;

            //appending to printout array
            airQualityIndexDisplay.push(airQualityIndex);

            //print information to widget
            printAqReadout(airQualityIndex);

        })
            .catch(function (error) {
                console.log(error);
            })
    }
}

function printAqReadout(airQualityIndex) {
    const aqiCityNameDisplay = ["Salt Lake City", "New York City", "Los Angles"]; //Creating separtate arrray with displayed names
    for (city in aqiCityNameDisplay) {
        $("#airQualityOutput" + city + "").text(aqiCityNameDisplay[city]);

        // printing different options depending on the quality of the air
        if (airQualityIndexDisplay[city] <= 50) {
            $("#airQualityReadout" + city + "").text("" + (airQualityIndexDisplay[city]).toFixed(0) + " - Good");
            $("#airQualityReadout" + city + "").css("background-color", "green");
        }
        else if (airQualityIndexDisplay[city] > 50 && airQualityIndexDisplay[city] <= 90) {
            $("#airQualityReadout" + city + "").text("" + (airQualityIndexDisplay[city]).toFixed(0) + " - Moderate");
            $("#airQualityReadout" + city + "").css("background-color", "Yellow");
        }
        else if (airQualityIndexDisplay[city] > 90 && airQualityIndexDisplay[city] <= 150) {
            $("#airQualityReadout" + city + "").text("" + (airQualityIndexDisplay[city]).toFixed(0) + " - Unhealthy");
            $("#airQualityReadout" + city + "").css("background-color", "Red");
        }
        else {
            $("#airQualityReadout" + city + "").text("" + (airQualityIndexDisplay[city]).toFixed(0) + " - Deathly");
            $("#airQualityReadout" + city + "").css("background-color", "purple");
        }
    }

}
let sportsScores = [];
function getSportsGames() {
    $.ajax({
        url: "https://www.balldontlie.io/api/v1/games",
        method: "GET"
    }).then(function (response) {
        for (game in response.data) {
            sportsScores[game] = {
                "homeTeam": response.data[game].home_team.abbreviation,
                "homeScore": response.data[game].home_team_score,
                "awayTeam": response.data[game].visitor_team.abbreviation,
                "awayScore": response.data[game].visitor_team_score
            }
        }

        printSports();

    }).catch(function (error) {
        console.log(error);
    })

}

function printSports() {
    // console.log(Math.ceil(sportsScores.length/3));
    //for loop to create rows for the sports container then populate each row
    for (i = 0; i < Math.ceil(sportsScores.length / 3); i++) {
        let rowDivNode = $("<div>").addClass("columns column-spacer");
        //for loop to add three items into each row
        for (j = 0; j < 3; j++) {
            let colDivNode = $("<div>").addClass("column score-background");
            let gameTeams = $("<p>").text("" + sportsScores[(i * 3) + j].homeTeam + " at " + sportsScores[(i * 3) + j].awayTeam + "");
            let gameScore = $("<p>").text("" + sportsScores[(i * 3) + j].homeScore + " - " + sportsScores[(i * 3) + j].awayScore + "");
            colDivNode.append(gameTeams, gameScore);
            rowDivNode.append(colDivNode);
        }
        $("#scoreContainer").append(rowDivNode);
    }
}


// end George

// Jordan
//local storage
$("#saveIcon").on("click", function () {
    $("#saveIcon").addClass("icon-inactive");
    setLocalStorage();
});

function setLocalStorage() {
    if ($("#unsplashIcon").hasClass("icon-active") === true) {
        localStorage.setItem("unsplashIcon", "active");
    } else
        localStorage.setItem("unsplashIcon", "inactive");

    if ($("#quoteIcon").hasClass("icon-active") === true) {
        localStorage.setItem("quoteIcon", "active");
    } else
        localStorage.setItem("quoteIcon", "inactive");

    if ($("#dictionaryIcon").hasClass("icon-active") === true) {
        localStorage.setItem("dictionaryIcon", "active");
    } else
        localStorage.setItem("dictionaryIcon", "inactive");

    if ($("#holidayIcon").hasClass("icon-active") === true) {
        localStorage.setItem("holidayIcon", "active");
    } else
        localStorage.setItem("holidayIcon", "inactive");

    if ($("#sportsIcon").hasClass("icon-active") === true) {
        localStorage.setItem("sportsIcon", "active");
    } else
        localStorage.setItem("sportsIcon", "inactive");

    if ($("#airIcon").hasClass("icon-active") === true) {
        localStorage.setItem("airIcon", "active");
    } else
        localStorage.setItem("airIcon", "inactive");

    if ($("#zomatoIcon").hasClass("icon-active") === true) {
        localStorage.setItem("zomatoIcon", "active");
    } else
        localStorage.setItem("zomatoIcon", "inactive");

    if ($("#weatherIcon").hasClass("icon-active") === true) {
        localStorage.setItem("weatherIcon", "active");
    } else
        localStorage.setItem("weatherIcon", "inactive");
}

function getLocalStorage() {
    var unSplashTile = $(".unSplashTile");
    var unsplashIcon = $("#unsplashIcon");
    if (localStorage.getItem("unsplashIcon") === "active") {
        unSplashTile.removeClass("hideTile");
        unsplashIcon.removeClass("icon-inactive");
        unsplashIcon.addClass("icon-active");
    } else {
        unSplashTile.addClass("hideTile");
        unsplashIcon.addClass("icon-inactive");
        unsplashIcon.removeClass("icon-active");
    }

    var quoteTile = $(".quoteTile");
    var quoteIcon = $("#quoteIcon");
    if (localStorage.getItem("quoteIcon") === "active") {
        quoteTile.removeClass("hideTile");
        quoteIcon.removeClass("icon-inactive");
        quoteIcon.addClass("icon-active");
    } else {
        quoteTile.addClass("hideTile");
        quoteIcon.addClass("icon-inactive");
        quoteIcon.removeClass("icon-active");
    }

    var dictionaryTile = $(".dictionaryTile");
    var dictionaryIcon = $("#dictionaryIcon");
    if (localStorage.getItem("dictionaryIcon") === "active") {
        dictionaryTile.removeClass("hideTile");
        dictionaryIcon.removeClass("icon-inactive");
        dictionaryIcon.addClass("icon-active");
    } else {
        dictionaryTile.addClass("hideTile");
        dictionaryIcon.addClass("icon-inactive");
        dictionaryIcon.removeClass("icon-active");
    }

    var holidayTile = $(".holidayTile");
    var holidayIcon = $("#holidayIcon");
    if (localStorage.getItem("holidayIcon") === "active") {
        holidayTile.removeClass("hideTile");
        holidayIcon.removeClass("icon-inactive");
        holidayIcon.addClass("icon-active");
    } else {
        holidayTile.addClass("hideTile");
        holidayIcon.addClass("icon-inactive");
        holidayIcon.removeClass("icon-active");
    }

    var sportsTile = $(".sportsTile");
    var sportsIcon = $("#sportsIcon");
    if (localStorage.getItem("sportsIcon") === "active") {
        sportsTile.removeClass("hideTile");
        sportsIcon.removeClass("icon-inactive");
        sportsIcon.addClass("icon-active");
    } else {
        sportsTile.addClass("hideTile");
        sportsIcon.addClass("icon-inactive");
        sportsIcon.removeClass("icon-active");
    }

    var airTile = $(".airTile");
    var airIcon = $("#airIcon");
    if (localStorage.getItem("airIcon") === "active") {
        airTile.removeClass("hideTile");
        airIcon.removeClass("icon-inactive");
        airIcon.addClass("icon-active");
    } else {
        airTile.addClass("hideTile");
        airIcon.addClass("icon-inactive");
        airIcon.removeClass("icon-active");
    }

    var zomatoTile = $(".zomatoTile");
    var zomatoIcon = $("#zomatoIcon");
    if (localStorage.getItem("zomatoIcon") === "active") {
        zomatoTile.removeClass("hideTile");
        zomatoIcon.removeClass("icon-inactive");
        zomatoIcon.addClass("icon-active");
    } else {
        zomatoTile.addClass("hideTile");
        zomatoIcon.addClass("icon-inactive");
        zomatoIcon.removeClass("icon-active");
    }

    var weatherTile = $(".weatherTile");
    var weatherIcon = $("#weatherIcon");
    if (localStorage.getItem("weatherIcon") === "active") {
        weatherTile.removeClass("hideTile");
        weatherIcon.removeClass("icon-inactive");
        weatherIcon.addClass("icon-active");
    } else {
        weatherTile.addClass("hideTile");
        weatherIcon.addClass("icon-inactive");
        weatherIcon.removeClass("icon-active");
    }
}

function setBackground() {
    var client_id = "RCxWMwEhzgzUqQu7IsYsENaOYusewqJSRQ2WcPni-Es";
    var query = $("#backgroundInput").val().trim();
    var unsplash = "https://api.unsplash.com/photos/random?&query=" + query + "&client_id=" + client_id;
    //console.log(unsplash);
    var unsplashWebsite = "https://unsplash.com/";
    $.ajax({
        url: unsplash,
        method: "GET"
    }).then(function (response) {
        var imageUrl = response.urls["full"];
        $("#backgroundPhotographer").html("Photo by <a href=" + response.links.html + ">" + response.user.name + "</a>" + " on <a href=" + unsplashWebsite + ">Unsplash</a>");
        //console.log(response);
        $("body")
            .css("background-image", "url(" + imageUrl + ")")
            .css("background-position", "center")
            .css("background-size", "cover");
    });
}
//set Background
setBackground();
$("#backgroundBtn").on("click", function () {
    setBackground();
})

function displayQuote() {

    var quoteURL = "https://favqs.com/api/qotd";

    $.ajax({
        url: quoteURL,
        method: "GET"
    }).then(function (response) {
        //console.log(response);
        $("#quote").text(response.quote.body);
        $("#quoteAuthor").text("-" + response.quote.author);
    });

}
// generates a quote
displayQuote();
$("#newQuoteBtn").on("click", function () {
    displayQuote();
});

// weather Widget
// variable for user input of city
var city;

//grab button add event listener
$("#cityBtn").on("click", function () {
    //assigns user input to city
    city = $("#cityInput").val().trim();
    //if no text in input return nothing
    if ($("#cityInput").val() === "") {
        return;
    }
    //display city info
    displayCityInfo();
});


// City Info 
function displayCityInfo() {
    $("#cityName").html(city.toUpperCase() + " ");
    var apiKey = "ce453ac74e12415c59da090746a2c162";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=ce453ac74e12415c59da090746a2c162";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var date = new Date(response.dt * 1000).toLocaleDateString();
        var icon = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
        //console.log(icon);
        //console.log(response);

        $("#nameDateIcon").html(response.name + " " + "(" + date + ")").addClass("currentDayHeader").append(icon);
        $("#temperature").html("Temperature: " + response.main.temp + " °F");
        $("#humidity").html("Humidity: " + response.main.humidity + " %");
        $("#windSpeed").html("Wind Speed: " + response.wind.speed + " MPH");

        // UV Index API Call
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + response.coord.lat + "&lon=" + response.coord.lon,
            method: "GET"
        }).then(function (response) {
            //console.log(response);
            $("#UVIndex").html("UV Index: ");
            $("#UVIndex").append("<button id=uvindex>" + response.value + "</button>");
        })

    }).catch(function (error) {
        console.log(error);
    })
    //five day forecast
    $("forecastHeader").html("5-day Forecast");
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + apiKey,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        //day1
        var date1 = new Date(response.list[3].dt * 1000).toLocaleDateString();
        var icon1 = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.list[3].weather[0].icon + ".png");
        $("#date1").html(date1);
        $("#icon1").html(icon1);
        $("#temp1").html("Temperature: " + response.list[3].main.temp + " °F");
        $("#humidity1").html("Humidity: " + response.list[3].main.humidity + " %");
        //day2
        var date2 = new Date(response.list[11].dt * 1000).toLocaleDateString();
        var icon2 = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.list[11].weather[0].icon + ".png");
        $("#date2").html(date2);
        $("#icon2").html(icon2);
        $("#temp2").html("Temperature: " + response.list[11].main.temp + " °F");
        $("#humidity2").html("Humidity: " + response.list[11].main.humidity + " %");
        //day3
        var date3 = new Date(response.list[19].dt * 1000).toLocaleDateString();
        var icon3 = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.list[19].weather[0].icon + ".png");
        $("#date3").html(date3);
        $("#icon3").html(icon3);
        $("#temp3").html("Temperature: " + response.list[19].main.temp + " °F");
        $("#humidity3").html("Humidity: " + response.list[19].main.humidity + " %");
        //day4
        var date4 = new Date(response.list[27].dt * 1000).toLocaleDateString();
        var icon4 = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.list[27].weather[0].icon + ".png");
        $("#date4").html(date4);
        $("#icon4").html(icon4);
        $("#temp4").html("Temperature: " + response.list[27].main.temp + " °F");
        $("#humidity4").html("Humidity: " + response.list[27].main.humidity + " %");
        //day5
        var date5 = new Date(response.list[35].dt * 1000).toLocaleDateString();
        var icon5 = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.list[35].weather[0].icon + ".png");
        $("#date5").html(date5);
        $("#icon5").html(icon5);
        $("#temp5").html("Temperature: " + response.list[35].main.temp + " °F");
        $("#humidity5").html("Humidity: " + response.list[35].main.humidity + " %");
    })
}
// Ben's Java
//Dictionary function listener
$(".dictionarySearch").on("click", function () {
    dictionarySearch();
});
// Dictionary search function
function dictionarySearch() {
    var apiKey = "?key=402305c3-af98-4dcf-93f0-d1b3357c036a"
    var dictionaryUrl = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/"
    var searchedWord = $(".searchedWord").val()
    var completeDictionaryUrl = dictionaryUrl + searchedWord + apiKey
    // Api call function
    $.ajax({
        url: completeDictionaryUrl,
        method: "GET"
    }).then(function (response) {
        $(".definitionWrapper").empty();
        // For loop to append definitions 
        for (i = 0; i < response[0].shortdef.length; i++) {
            var newLiTag = $("<Li>")
            $(".definitionWrapper").append(newLiTag.text(response[0].shortdef[i]));
        }
    })
};
// Holiday Api
var currentDay = moment().format("DD");
var currentMonth = moment().format("MM");
var holidayURL = "https://holidayapi.com/v1/holidays?key=7244d9b6-e733-424f-8364-0d1df8d53c2c&country=US&year=2019&month=" + currentMonth + "&day=" + currentDay + "&upcoming=true";
$.ajax({
    url: holidayURL,
    method: "GET"
}).then(function (response) {
    var nextHoliday = response.holidays[0];
    $(".holidayResultsClass").text(nextHoliday.name);
    //Please note, I am using the free Holiday API. This only grants access to 2019 holiday's, not 2020. 
    //I used moment.js to change the date to this year's date, even though it will not be accurate for holidays with changing dates
    var thisYearDate = moment(nextHoliday.date).add(1, 'year').format("MMMM Do YYYY")
    $(".holidayDate").text(thisYearDate)
})
// The end of Ben.. 's Java


//Brent's JS
$(document).ready(function () {
    $("#restaurantSearch").on("click", function () {
        getLocation();
        event.preventDefault();
    });

    function getLocation() {
        // Make sure browser supports this feature
        if (navigator.geolocation) {
            // Provide our showPosition() function to getCurrentPosition
            navigator.geolocation.getCurrentPosition(showPosition);
        }
        else {
            alert("Geolocation is not supported by this browser.");
        }
    }
    // This will get called after getCurrentPosition()
    function showPosition(position) {
        // Grab coordinates from the given object
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        select(lat, lon);
    }

    //search city  (help from https://codepen.io/pbairishal/pen/JMOdKz)
    function select(lat, lon) {
        var restaurantBox = $('#restaurant-input').val()
        var restaurantCount = $('#restaurant-count').val()
        var searchCity = "&q=" + restaurantBox;
        //set settings
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://developers.zomato.com/api/v2.1/search?lat=" + lat + "&lon=" + lon + searchCity + "&count=" + restaurantCount,
            "method": "GET",
            "headers": {
                "user-key": "5f04213dc414e4e76eca147169ee407a",
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        //shorthand for ajax
        $.getJSON(settings, function (data) {
            data = data.restaurants;
            var html = "";

            $.each(data, function (index, value) {
                var x = data[index]; // x is number of results
                $.each(x, function (index, value) {
                    var location = x.restaurant.location;
                    var userRating = x.restaurant.user_rating;
                    html += "<div class='restaurantResults'>"
                    html += "<strong>" + value.name + "</strong></a>" + "   ---   CUISINES: " + value.cuisines + "";
                    html += "<span title='" + userRating.rating_text + "'><p> User Rating: <strong>" + userRating.aggregate_rating + "</strong></p></span>";
                    html += "Area:  <strong>" + location.locality + "</strong><br>";
                    html += "Address: <strong>" + location.address + "</strong>";
                    // html += "  <strong>CUISINES</strong>: " + value.cuisines + "";
                    html += "</div><br>";
                });
            });
            $(".message").html(html);
        });
    }


    // Time and Date
    $("#time").text(moment().format('MMMM D, YYYY, h:mm a'));


    //load items in the burger menu.  
    $(document).ready(function () {

        // Check for click events on the navbar burger icon
        $(".navbar-burger").click(function () {

            // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
            $(".navbar-burger").toggleClass("is-active");
            $(".navbar-menu").toggleClass("is-active");

        });
    });



    //End Brent's JS

//tile animations
// const splashBox = $(".unSplashTile");
// const quoteBox = $(".quoteTile");
// const weatherBox = $(".weatherTile");
// const dictionaryBox = $(".dictionaryTile");
// const holidayBox = $(".holidayTile");
// const zomatoBox = $(".zomatoTile");
// const sportsBox = $(".sportsTile");
// const airBox = $(".airTile");


// $("#unsplashIcon").click(function(){
//     toggleBox(splashBox);
// });

// $("#quoteIcon").click(function(){
//     toggleBox(quoteBox);
// });

// $("#dictionaryIcon").click(function(){
//     toggleBox(dictionaryBox);
// });

// $("#holidayIcon").click(function(){
//     toggleBox(holidayBox);
// });

// $("#sportsIcon").click(function(){
//     toggleBox(sportsBox);
// });

// $("#airIcon").click(function(){
//     toggleBox(airBox);
// });

// $("#zomatoIcon").click(function(){
//     toggleBox(zomatoBox);
// });

// $("#weatherIcon").click(function(){
//     toggleBox(weatherBox);
// });

function toggleBox(boxSelection,iconSelection){
    if(boxSelection.data("active") == "active"){
        boxSelection.toggleClass("box-hide");
        boxSelection.data("active" , "inactive");
        iconSelection.removeClass("icon-inactive");
        iconSelection.addClass("icon-active");
        displayShow(boxSelection);
    } else{
        boxSelection.toggleClass("box-hide");
        boxSelection.data("active" , "active");
        iconSelection.addClass("icon-inactive");
        iconSelection.removeClass("icon-active");
        setTimeout(() => displayHide(boxSelection), 350);
    }
    
}

function displayHide(boxSelection){
    boxSelection.addClass("display-hide");
    boxSelection.removeClass("display-show");
}

function displayShow(boxSelection){
    boxSelection.removeClass("display-hide");
    boxSelection.addClass("display-show");
}

    // NavBar hide and show listeners
    $(".linkUnsplash").on("click", function () {
        var unSplashTile = $(".unSplashTile");
        var unsplashIcon = $("#unsplashIcon");
        toggleBox(unSplashTile,unsplashIcon);    
    });
    $(".linkQuote").on("click", function () {
        var quoteTile = $(".quoteTile");
        var quoteIcon = $("#quoteIcon");
        toggleBox(quoteTile,quoteIcon);
    });
    $(".linkDictionary").on("click", function () {
        var dictionaryTile = $(".dictionaryTile");
        var dictionaryIcon = $("#dictionaryIcon");
        toggleBox(dictionaryTile,dictionaryIcon);
    });
    $(".linkHoliday").on("click", function () {
        var holidayTile = $(".holidayTile");
        var holidayIcon = $("#holidayIcon");
        toggleBox(holidayTile,holidayIcon);
    });
    $(".linkSports").on("click", function () {
        var sportsTile = $(".sportsTile");
        var sportsIcon = $("#sportsIcon");
        toggleBox(sportsTile,sportsIcon);
    });
    $(".linkAir").on("click", function () {
        var airTile = $(".airTile");
        var airIcon = $("#airIcon");
        toggleBox(airTile,airIcon);
    });

    $(".linkZomato").on("click", function () {
        var zomatoTile = $(".zomatoTile");
        var zomatoIcon = $("#zomatoIcon");
        toggleBox(zomatoTile,zomatoIcon);
    });
    $(".linkWeather").on("click", function () {
        var weatherTile = $(".weatherTile");
        var weatherIcon = $("#weatherIcon");
        toggleBox(weatherTile,weatherIcon);
    });

});



//End Brent's JS

