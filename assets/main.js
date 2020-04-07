



// George
const currentDate = moment().format("YYYY-MM-DD");
function displayAQ() {
    let airQualityUrl = "https://api.openaq.org/v1/measurements?country=US&city=Salt%20Lake%20City&date_from="+currentDate+"&order_by=date&parameter=pm25"
    $.ajax({
        url: airQualityUrl,
        method: "GET"
    }).then(function (response) {
        let averageArray = [];
        for (result in response.results) {
            averageArray[result] = response.results[result].value;
        }
        average = averageArray.reduce((a, b) => a + b, 0);
        average = average / averageArray.length;
        let airQualityIndex = average*4; //creating AQI from average pm2.5 air data

        printAqReadout(airQualityIndex); //print information to widget

    }).catch(function (error) {
        console.log(error);
    })
}

function printAqReadout(airQualityIndex){
    // printing different options depending on 
    if(airQualityIndex <= 50){
        $("#airQualityOutput").text(""+airQualityIndex.toFixed(0)+" ");
        $("#airQualityReadout").text("Good");
        $("#airQualityReadout").css("background-color","green");
    }
    else if(airQualityIndex > 50 && airQualityIndex <= 90){
        $("#airQualityOutput").text(""+airQualityIndex.toFixed(0)+" ");
        $("#airQualityReadout").text("Moderate");
        $("#airQualityReadout").css("background-color","Yellow");
    }
    else if(airQualityIndex > 90 && airQualityIndex <= 150){
        $("#airQualityOutput").text(""+airQualityIndex.toFixed(0)+" ");
        $("#airQualityReadout").text("Unhealthy");
        $("#airQualityReadout").css("background-color","Red");
    }
    else{
        $("#airQualityOutput").text(""+airQualityIndex.toFixed(0)+" ");
        $("#airQualityReadout").text("Deathly");
        $("#airQualityReadout").css("background-color","purple");
    }
    
}

displayAQ();

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
        console.log(imageUrl);
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








