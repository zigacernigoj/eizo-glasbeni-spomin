$.getJSON( "sets/example.json", function( data ) {
    var set_id = data.set_id;
    var set_name = data.set_name;
    console.log(set_id + " " + set_name);

    var elements = data.elements;

    for(var el in elements) {
        // console.log(el);
        console.log(elements[el]);

        $("#kartice").append(
            '<div class="col-lg-2">' +
                '<div class="panel panel-default">' +
                    '<div class="panel-body">' +
                        elements[el].text +
                    '</div>' +
                '</div>' +
            '</div>'
        );


    }
});