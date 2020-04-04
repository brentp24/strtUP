



// George

let averageAirQuality ;

function displayAQ(){
    let airQualityUrl = "https://api.openaq.org/v1/measurements?country=US&city=Salt%20Lake%20City&date_from=2020-04-04&order_by=date&parameter=pm25"
    $.ajax({
        url: airQualityUrl,
        method: "GET"
    }) .then(function(response){
        let averageArray = [];
        console.log(response);
        for(result in response.results){
            averageArray[result] = response.results[result].value;
        }
        averageAirQuality = averageArray.reduce((a, b) => a + b, 0);
        averageAirQuality = averageAirQuality/averageArray.length;
        printAqReadout();

    }) .catch(function(error){
        console.log(error);
    })
}

function printAqReadout(){
    $("#airQualityOutput").text(""+averageAirQuality.toFixed(2)+" AQI");
    switch(averageAirQuality){
        case averageAirQuality <= 50:
            console.log("HELL YAEH");
            break;
        case averageAirQuality >= 50:
            console.log("oh no");
            break;
        default :
            console.log("TEST");
            break;
    }
}

displayAQ();

// end George


// Jordan

function setBackground () {
    var client_id = "RCxWMwEhzgzUqQu7IsYsENaOYusewqJSRQ2WcPni-Es";
    var query = $("#backgroundInput").val().trim();
    var unsplash = "https://api.unsplash.com/photos/random?&query="+ query + "&client_id=" + client_id;
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
$("#backgroundBtn").on("click", function() {
    setBackground();
})

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
// Spotify

// Youtube

// The end of Ben.. 's Java




//Brent's JS



//End Brent's JS








