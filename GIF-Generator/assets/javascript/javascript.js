// Global Variable

var topics = ["Pokemon", "Kim Possible", "Spongebob Squarepants",
            "Rugrats", "Doug", "Animaniacs", "Daria", "Powerpuff Girls", "The Simpsons",
            "Hey Arnold!", "Arthur","Recess", "Dexter's Laboratory", "Sailor Moon", "Aaahh!!! Real Monsters",
            "Magic School Bus", "Batman: The Animated Series", "Angry Beavers", "Rocket Power", "Digimon"];

// Functions 

function createButtons(){
    $("#button-container").empty();

	for(var i = 0; i < topics.length; i++) {
		var newButton = $("<button>");
		newButton.addClass("cartoon-btn");
		newButton.attr("data-cartoon", topics[i]);
		newButton.html(topics[i]);
		$("#button-container").append(newButton);
    }

    $("button").on("click", function() {
        var cartoon = $(this).attr("data-cartoon");
        console.log(cartoon);

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        cartoon + "&api_key=1iAR8M7tDiwTHFtGCIIKpbicRTTCb1Aj";
        console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    })

        .then(function(response) {
            var results = response.data;
            console.log(results);

            for (var i = 0; i < 15; i++) {
                var cartoonDiv = $("<div>");
                cartoonDiv.addClass("ratingAndGif");

                var p = $("<p>").text("Rating: " + results[i].rating);

                var cartoonImage = $("<img>");
                cartoonImage.addClass("gif"); 
                cartoonImage.attr("src", results[i].images.fixed_height_still.url);
                cartoonImage.attr("data-state", "still"); 
                cartoonImage.attr("data-still", results[i].images.fixed_height_still.url); 
                cartoonImage.attr("data-animate", results[i].images.fixed_height.url); 

                cartoonDiv.append(p);
                cartoonDiv.append(cartoonImage);
                $("#gifs-appear-here").prepend(cartoonDiv);
            }
              $(".gif").on("click", function() {
                var state = $(this).attr("data-state");
                console.log(state);

                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } 
                else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            
            })
            
        })
    })

}

$("#add-cartoon").on("click", function(event) {
    event.preventDefault();
    var newCartoon = $("#cartoon-input").val().trim();
    topics.push(newCartoon);
    createButtons();
  });

// Call Function

createButtons();

