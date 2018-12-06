//topic array
var topics = ["happy", "sad", "ecstatic", "angry", "jealous", "frustrated", "depressed"];
//gif gererator funciton
function showButtons() {
    $("#buttons").empty()
    //for each item in the topics array, generate a button
    for (i = 0; i < topics.length; i++) {
        $("#buttons").append("<button class='buttons m-1 button' id='" + topics[i] + "'>" + topics[i] + "</button>");
    }
}

function getGifs() {
    //clear our previous gifs
    $("#images").html("");
    var topic = $(this).attr("id");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=SMHcravp6J52lglHwZk6jPmm49li38p2" + "&q=" + topic + "&limit=10";
    console.log(queryURL);
    //AJAX call
    $.ajax({
        url: queryURL,
        method: "GET"
        //once the response in received function
    }).then(function (response) {
        console.log(response);
        var results = response.data;
        //put 10 gifs on the page
        for (j = 0; j < results.length; j++) {
            var imageURL = results[j].images.fixed_height_still.url;
            var gifURL = results[j].images.fixed_height.url;
            var rating = results[j].rating.toUpperCase();
            $("#images").append("<div class='col-md-6 col-sm-12'><img src='" + imageURL + "' data-still='" + imageURL + "' data-animate='" + gifURL + "' data-state='still' class='gif'><p>Rating: " + rating + "</p><div>");
        }
    });
}

//when a gif is clicked, animate it or deanimate it
$(document).on("click", ".gif", function changeGifs() {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
})

$(document).on("click", "#addTerm", function (event) {
    event.preventDefault();
    var term = $("#term").val().trim();
    topics.push(term);
    $("#term").val("")
    showButtons();
})

//when a button in clicked show 10 still image gifs
$(document).on("click", ".buttons", getGifs)


$(document).ready(showButtons);