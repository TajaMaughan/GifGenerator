var topics = ["happy", "sad", "ecstatic", "angry", "jealous", "frustrated", "depressed"];
var topic; 
var imageURL;
var gifURL;

$(document).ready(function () {
    for (i = 0; i < topics.length; i++) {
        $("#buttons").append("<button class='buttons' id='" + topics[i] + "'>" + topics[i] + "</button>");
    }
    $(".buttons").on("click", function getGifs() {
        $("#images").html("");
        topic = $(this).attr("id");
        console.log(topic);
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=SMHcravp6J52lglHwZk6jPmm49li38p2" + "&q=" + topic + "&limit=10";
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var results = response.data;
            for(j = 0; j < results.length; j++) {
                imageURL = results[j].images.fixed_height_still.url;
                gifURL = results[j].images.fixed_height.url;
                $("#images").append("<img src='" + imageURL + "' data-still='" + imageURL + "' data-animate='" + gifURL + "' data-state='still' class='gif'>");
            }
            $(".gif").on("click", function changeGifs() {
                var state = $(this).attr("data-state");
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            })
        });
    })
})


