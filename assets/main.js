



// George
// end George


// Jordan

function displayQuote () {

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


// Ben's Java
// Bands In Town

var BandsInTownID = ""
var artistID = ""
var BandsInTownUrl= ""










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








