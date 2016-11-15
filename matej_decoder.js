$.getJSON("sets/example_matej.json", function (data) {

    var pairs = data.pairs;
    var cards = [];
    $.each(pairs, function(index, pair) {
        cards.push(pair.el1, pair.el2);
    });
    $.shuffle(cards);
    $.each(cards, function(index, card) {
        $("#kartice").append(get_card(card));
    });




    var width = $(".kartica").width();
    console.log(width);

});

function get_card(el){
    var card = '<div class="kartica" data-pair="2"><div class="kartica-content">';
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

$( document ).ready(function() {
    $(window).on('resize', function() {
        computeWidth();
    });
});

function computeWidth(){
    //poračuna velikost kartic
    var kWidth = $('body').width();
    var kHeight = $('body').height();
    console.log(kWidth + ' ' + kHeight);
}

