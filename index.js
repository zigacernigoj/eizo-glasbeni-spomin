$.getJSON("sets/example.json", function (data) {
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
                '<p class="odkrita" style="display: none">' + elements[el].text + '</p>' +
                '<img class="skrita" src="' + elements[el].hidden_icon + '" class="img-responsive" alt="skrita" style="width: 100%; display: block;">' +
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
                '<img class="odkrita" src="' + elements[el].image + '" class="img-responsive" alt="klavir" style="display: none">' +
                '<img class="skrita" src="' + elements[el].hidden_icon + '" class="img-responsive" alt="skrita" style="width: 100%; display: block;">' +
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
                '<audio class="odkrita" controls style="display: none">' +
                '<source src="' + elements[el].sound + '" type="audio/ogg">' +
                '<source src="' + elements[el].sound + '" type="audio/mpeg">' +
                'Your browser does not support the audio element.' +
                '</audio>' +
                '<img class="skrita" src="' + elements[el].hidden_icon + '" class="img-responsive" alt="skrita" style="width: 100%; display: block;">' +
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


