$.getJSON("sets/example_matej.json", function (data) {
    var set_id = data.set_id;
    var set_name = data.set_name;
    console.log(set_id + " " + set_name);

    var elements = data.elements;

    for (var el in elements) {
        // console.log(el);
        console.log(elements[el]);

        if (elements[el].type === "text") {
            $("#kartice").append(
                '<div class="col-lg-3 col-md-3 col-sm-4 col-xs-4">' +
                '<div class="kartica panel panel-default">' +
                '<div class="kartica-content panel-body">' +
                elements[el].text +
                '</div>' +
                '</div>' +
                '</div>'
            );
        }
        else if (elements[el].type === "image") {
            $("#kartice").append(
                '<div class="col-lg-3 col-md-3 col-sm-4 col-xs-4">' +
                '<div class="kartica panel panel-default">' +
                '<div class="kartica-content panel-body">' +
                '<img src="' + elements[el].image + '" class="img-responsive" alt="klavir">' +
                '</div>' +
                '</div>' +
                '</div>'
            );
        }
        else if (elements[el].type === "sound") {
            $("#kartice").append(
                '<div class="col-lg-3 col-md-3 col-sm-4 col-xs-4">' +
                '<div class="kartica panel panel-default">' +
                '<div class="kartica-content panel-body">' +
                '<audio controls>' +
                '<source src="' + elements[el].sound + '" type="audio/ogg">' +
                '<source src="' + elements[el].sound + '" type="audio/mpeg">' +
                'Your browser does not support the audio element.' +
                '</audio>' +
                '</div>' +
                '</div>' +
                '</div>'
            );
        }
    }

    var width = $(".kartica").width();
    console.log(width);

    $(".kartica").css({"height": width});
    $(".kartica-content").css({"text-align": "center", "position": "relative", "top": "50%", "transform": "translateY(-50%)"});
});


