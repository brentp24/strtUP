



// George
const currentDate = moment().format("YYYY-MM-DD");
let airQualityIndexDisplay = [];

displayAQ();

function displayAQ() {
    let aqiCityArray = ["Salt Lake City", "New York-Northern New Jersey-Long Island", "Los Angeles-Long Beach-Santa Ana"];
    for(city in aqiCityArray){
        let airQualityUrl = "https://api.openaq.org/v1/measurements?country=US&city="+aqiCityArray[city]+"&date_from="+currentDate+"&order_by=date&parameter=pm25"
        $.ajax({
            url: airQualityUrl,
            method: "GET"
        }).then(function (response) {
            console.log(airQualityUrl);
            let averageArray = [];
            for (result in response.results) {
                averageArray[result] = response.results[result].value;
            }
            //creating AQI from average pm2.5 air data 
            average = averageArray.reduce((a, b) => a + b, 0);
            average = average / averageArray.length;
            let airQualityIndex = average*4;
            
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

function printAqReadout(airQualityIndex){
    const aqiCityNameDisplay = ["Salt Lake City", "New York City", "Los Angles"]; //Creating separtate arrray with displayed names
    for(city in aqiCityNameDisplay){
        $("#airQualityOutput"+city+"").text(aqiCityNameDisplay[city]);

        // printing different options depending on the quality of the air
        if(airQualityIndexDisplay[city] <= 50){
            $("#airQualityReadout"+city+"").text(""+airQualityIndexDisplay[city].toFixed(0)+" - Good");
            $("#airQualityReadout"+city+"").css("background-color","green");
        }
        else if(airQualityIndexDisplay[city] > 50 && airQualityIndexDisplay[city] <= 90){
            $("#airQualityReadout"+city+"").text(""+airQualityIndexDisplay[city].toFixed(0)+" - Moderate");
            $("#airQualityReadout"+city+"").css("background-color","Yellow");
        }
        else if(airQualityIndexDisplay[city] > 90 && airQualityIndexDisplay[city] <= 150){
            $("#airQualityReadout"+city+"").text(""+airQualityIndexDisplay[city].toFixed(0)+" - Unhealthy");
            $("#airQualityReadout"+city+"").css("background-color","Red");
        }
        else{
            $("#airQualityReadout"+city+"").text(""+airQualityIndexDisplay[city].toFixed(0)+" - Deathly");
            $("#airQualityReadout"+city+"").css("background-color","purple");
        }
    }
    
}


// end George


// Jordan

function setBackground() {
    var client_id = "RCxWMwEhzgzUqQu7IsYsENaOYusewqJSRQ2WcPni-Es";
    var query = $("#backgroundInput").val().trim();
    var unsplash = "https://api.unsplash.com/photos/random?&query=" + query + "&client_id=" + client_id;
    //console.log(unsplash);

    $.ajax({
        url: unsplash,
        method: "GET"
    }).then(function (response) {
        var imageUrl = response.urls["full"];
        // console.log(imageUrl);
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


// Ben's JavaScript

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



//End Brent's JS








