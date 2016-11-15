$.getJSON("sets/example_matej.json", function (data) {

    var pairs = data.pairs;

    jQuery.each(pairs, function(index, pair) {
        $("#kartice").append(get_card(pair.el1));
        $("#kartice").append(get_card(pair.el2));

    });

    var width = $(".kartica").width();
    console.log(width);

});

function get_card(el){
    var card = '<div class="kartica"><div class="kartica-content">';
    switch(el.type){
        case 1:
            card += el.value;
            break;
        case 2:
            card += '<img src="' + el.value + '" class="img-responsive" alt="klavir"></div></div></div>';
            break;
    }
    card += '</div></div>';
    return card;

}


