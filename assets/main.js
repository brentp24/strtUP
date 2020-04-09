



// George
let test;
let averageArray = [];
function displayAQ() {
    let airQualityUrl = "https://api.openaq.org/v1/measurements?country=US&city=Salt%20Lake%20City&date_from=2020-04-04&order_by=date&parameter=pm25"
    $.ajax({
        url: airQualityUrl,
        method: "GET"
    }).then(function (response) {
        //console.log(response);

        for (result in response.results) {
            averageArray[result] = response.results[result].value;
        }
        average = averageArray.reduce((a, b) => a + b, 0);
        average = average / averageArray.length;
        $("#airQualityOutput").text(average.toFixed(2));

    }).catch(function (error) {
        console.log(error);
    })
}

displayAQ();

// end George


// Jordan

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
// Bands In Town

var BandsInTownID = ""
var artistID = ""
var BandsInTownUrl = ""










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
        select();
        event.preventDefault();
    });


    //search city  (help from https://codepen.io/pbairishal/pen/JMOdKz)
    function select() {
        var restaurantBox = $('#restaurantInput').val()
        var cityBox = $('#cityInput').val()
        var searchCity = "&q=" + restaurantBox;
        //set settings
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://developers.zomato.com/api/v2.1/search?entity_id=" + cityBox + "&entity_type=city" + searchCity + "&count=3",
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

                var x = data[index];
                console.log(typeof x);
                $.each(x, function (index, value) {
                    var location = x.restaurant.location;
                    var userRating = x.restaurant.user_rating;
                    html += "<h2 style='color:red;'><strong>" + value.name + "</strong></h2></a>";
                    html += "<div class='rating'>"
                    html += "<span title='" + userRating.rating_text + "'><p><strong> User Rating: " + userRating.aggregate_rating + "</strong></p></span>";
                    html += "  <strong class='text-primary'>" + location.locality + "</strong>";
                    html += "  <h6><strong>" + location.address + "</strong></h6>";
                    html += "  <strong>CUISINES</strong>: " + value.cuisines + "";
                    html += "</div><br>";
                });
            });
            $(".message").html(html);
        });
    }

});



//End Brent's JS








