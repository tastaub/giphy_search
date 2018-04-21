//Global Variables
//======================//

//Variables for queryURL
var apiKey = "C0zCVuhMYgtp80kMa0hduvzlKmcAxbuY";
var urlBase = "https://api.giphy.com/v1/gifs/search?api_key=";
var search = "&q=";
// var limit = "&limit=";
// var limitInput = 0;

//Player array for inital buttons
var playerArr = ["James Harden", "Kobe Bryant", "Paul George", "Ben Simmons"];
var gifCount = 5;
//App Functions
//====================//

//Create buttons from the player array
function renderButtons() {
    $("#button-area").empty();
    $("#search-input").val(" ");
    //Loop array to create button for each string
    for (var i = 0; i < playerArr.length; i++) {

      var buttons = $("<button>");
      
      buttons.addClass("btn btn-primary col-xs-12 col-sm-4 col-md-3");
      //Create a data attribute for element to use for search
      buttons.attr("data-name", playerArr[i]);
      buttons.attr("id", "player")
      buttons.text(playerArr[i]);
      
      $("#button-area").append(buttons);
    }
  }

//AJAX Call  
function displayPlayer()  {
        $("#gif-area").empty();
        //Variable used to get data name
        var player = $(this).attr("data-name");
        //Limit search to 10
        // var limitKey = limit + limitInput
        var queryURL = urlBase + apiKey + "&limit=" + gifCount + search + player;

        $.ajax({
            url: queryURL,
            method: "GET"
        }) .then(function(response)  {
            console.log(queryURL);

            console.log(response);

            var results = response.data;
            //Loop the array of results
            for(i = 0; i < results.length; i++)  {
                //Create a div for player gifs and tags
                var playerDiv = $("<div>");
                playerDiv.addClass("player-div col-xs-12 col-sm-6");


                var p = $("<p>").text("Rating: " + results[i].rating);
                var playerGif = $("<img>");
                var playerStill = $("<img>");
                //Properties: images, (size), url
                playerStill.attr("src", results[i].images.fixed_width_still.url);
                playerStill.addClass("player-image")
                playerGif.attr("src", results[i].images.fixed_width.url)
                playerGif.addClass("player-image hidden");
                //append to pladyer div
                playerDiv.append(p);
                playerDiv.append(playerGif);
                playerDiv.append(playerStill);

                //add most recent divs to top
                $("#gif-area").prepend(playerDiv);
               
            }
        })
}
//Toggle the hidden class between the image elements inside the div
var gifPlayer = function()  {
   $(this).children("img").toggleClass("hidden");
}


//Event Listeners
//==================//

// Render game buttons from array
$(document).ready(function(){
    renderButtons();
})

//Get input value from form
$("#player-submit").on("click", function(event) {
    
    event.preventDefault();
    //Get value of input
    var player = $("#search-input").val().trim();
    console.log(player);
    //Add input value to player array
    playerArr.push(player);
    //Render New Button
    renderButtons();
    
    
   
});
//Update the AJAX call limit
$(document).on('click', ".gif-count", function(){
    //Get value of button click
    gifCount = $(this).val();
    //Add gif count to DOM
    $("#gif-count-div").text("You chose: " + gifCount + " GIFS!");
})

//Run AJAX call on button click
$(document).on("click", "#player", displayPlayer);

//Run the toggle function on click of div
$(document).on("click", ".player-div", gifPlayer);





