var topics = ["Shiba Inu", "Siberian Husky", "Samoyed", "Keeshond", "Golden Retriever"];

function createButtons() {
    $("#buttons").empty();

    for (var i = 0; i < topics.length; i++) {
        var button = $("<button>");
        button.addClass("dog");
        button.attr("data-name", topics[i]);
        button.text(topics[i]);
        $("#buttons").append(button);
    }
}

$("#images-holder").hide();
createButtons();

$("#add-dog").on("click", function (event) {
    event.preventDefault();
    var dogName = $("#addDog").val().trim();
    topics.push(dogName);
    createButtons();
    $("#addDog").val("");
});

$("#buttons").on("click", "button.dog", function (event) {
    event.preventDefault();
    $("#images-holder").show();
    $("#gifs").empty();
    var dog = $(this).attr("data-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + dog + "&api_key=0dl0F2oOvT9xTAC8YdheoP2KGLIceANQ"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var results = response.data;
        for (var i = 0; i < 10; i++) {
            var dogDiv = $("<div id='dog-pics'>")
            var dogImage = $("<img>");
            var gifRating = $("<p>").text("Rating: " + results [i].rating);
            dogImage.attr("src", results[i].images.fixed_height_still.url);
            dogImage.attr("class", "gif");
            dogImage.attr("data-state", "still");
            dogImage.attr("data-still", results[i].images.fixed_height_still.url);
            dogImage.attr("data-animate", results[i].images.fixed_height.url);
            dogDiv.append(dogImage);
            dogDiv.append(gifRating);
            $("#gifs").prepend(dogDiv);
        }
    });
    
    $("#gifs").on("click", "img", function() {
        console.log("hi");
        var currentState = $(this).attr("data-state");
        if (currentState === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

});