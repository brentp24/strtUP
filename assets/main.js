



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










// Holiday


var holidayURL = "https://holidayapi.com/v1/holidays?key=7244d9b6-e733-424f-8364-0d1df8d53c2c&country=US&year=2019";
var holidayKey = "7244d9b6-e733-424f-8364-0d1df8d53c2c";
var holidayCountry = "ISO3166-2:US";
var holidayYear = 2020;

$.ajax({
    url: holidayURL,
   // key: holidayKey,
 //   country: holidayCountry,
   // year: holidayYear,
    method: "GET"
}).then(function (response) {
    console.log(response)
})


// The end of Ben.. 's Java




//Brent's JS



//End Brent's JS








