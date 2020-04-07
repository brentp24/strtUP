



// George
let test;
let averageArray = [];
function displayAQ() {
    let airQualityUrl = "https://api.openaq.org/v1/measurements?country=US&city=Salt%20Lake%20City&date_from=2020-04-04&order_by=date&parameter=pm25"
    $.ajax({
        url: airQualityUrl,
        method: "GET"
    }).then(function (response) {
        console.log(response);
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

//navBar hide and show function

$(".navbar-link").on("click", function(){
    var navDropDown = $(".navbar-dropdown");
    if (navDropDown.hasClass("is-active")){
         navDropDown.removeClass("is-active");
    } else {
        navDropDown.addClass("is-active");
    }
})

$(".linkUnsplash").on("click", function(){
    var unSplashTile = $(".unSplashTile");
    if (unSplashTile.hasClass("hideTile")){
         unSplashTile.removeClass("hideTile");
    } else {
        unSplashTile.addClass("hideTile");
    }
});
$(".linkQuote").on("click", function(){
    var quoteTile = $(".quoteTile");
    if (quoteTile.hasClass("hideTile")){
         quoteTile.removeClass("hideTile");
    } else {
        quoteTile.addClass("hideTile");
    }
});
$(".linkDictionary").on("click", function(){
    var dictionaryTile = $(".dictionaryTile");
    if (dictionaryTile.hasClass("hideTile")){
         dictionaryTile.removeClass("hideTile");
    } else {
        dictionaryTile.addClass("hideTile");
    }
});
$(".linkHoliday").on("click", function(){
    var holidayTile = $(".holidayTile");
    if (holidayTile.hasClass("hideTile")){
         holidayTile.removeClass("hideTile");
    } else {
        holidayTile.addClass("hideTile");
    }
});
$(".linkSports").on("click", function(){
    var sportsTile = $(".sportsTile");
    if (sportsTile.hasClass("hideTile")){
         sportsTile.removeClass("hideTile");
    } else {
        sportsTile.addClass("hideTile");
    }
});
$(".linkAir").on("click", function(){
    var airTile = $(".airTile");
    if (airTile.hasClass("hideTile")){
         airTile.removeClass("hideTile");
    } else {
        airTile.addClass("hideTile");
    }
});
$(".linkStrava").on("click", function(){
    var stravaTile = $(".stravaTile");
    if (stravaTile.hasClass("hideTile")){
         stravaTile.removeClass("hideTile");
    } else {
        stravaTile.addClass("hideTile");
    }
});
$(".linkZomato").on("click", function(){
    var zomatoTile = $(".zomatoTile");
    if (zomatoTile.hasClass("hideTile")){
         zomatoTile.removeClass("hideTile");
    } else {
        zomatoTile.addClass("hideTile");
    }
});


 





