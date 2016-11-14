$.getJSON("sets/example_matej.json", function (data) {

    var pairs = data.pairs;

    jQuery.each(pairs, function(index, pair) {
        $("#kartice").append(get_card(pair.el1));
        $("#kartice").append(get_card(pair.el2));

    });

    var width = $(".kartica").width();
    console.log(width);

    $(".kartica").css({"height": width});
    $(".kartica-content").css({"text-align": "center", "position": "relative", "top": "50%", "transform": "translateY(-50%)"});
});

function get_card(el){
    var card = '<div class="col-lg-3 col-md-3 col-sm-4 col-xs-4"><div class="kartica panel panel-default"><div class="kartica-content panel-body">';
    switch(el.type){
        case 1:
            card += el.value;
            break;
        case 2:
            card += '<img src="' + el.value + '" class="img-responsive" alt="klavir"></div></div></div>';
            break;
    }
    card += '</div></div></div>';
    return card;

}


