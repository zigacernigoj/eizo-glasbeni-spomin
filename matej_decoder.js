var allCards;
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
    $('.kartica').each(function(){
        var degree = (Math.floor(Math.random() * 7)) - 3;
        $( this ).css({'transform' : 'rotate('+ degree +'deg)'});
    })
    allCards = cards.length;
});

function get_card(el){
    var card = '<div class="kartica" data-pair="2"><div class="kartica-content front">';
    switch(el.type){
        case 1:
            card += el.value;
            break;
        case 2:
            card += '<img src="' + el.value + '" class="img-responsive" alt="klavir">'; //</div></div></div>
            break;
    }
    card += '</div> <div class="back"></div> </div>'; //</div>
    return card;

}

$( document ).ready(function() {
    computeWidth(allCards);
    $(window).on('resize', function() {
        computeWidth(allCards);
    });
    $('.kartica').on('click', function(){
        //transform: rotateY(120deg);
        var curTrans = $(this).css('transform')
        $(this).css({'transform' : curTrans +' rotateY(180deg)'})
    })
});

/*
nastavi velikost kartic in levi in desni odmik glavnega okna
 */
function computeWidth(n){
    //nastavi padding na 0, da dobi pravilno velikost okna
    $('#kartice').css({'padding-left': 0, 'padding-right': 0});
    var kWidth = $('#kartice').width();
    var kHeight = $('#kartice').height();
    //število kartic v vrstici
    var widthN = findDivisors(n, kWidth/kHeight);
    //število kartic v stolpcu
    var heightN = n/widthN;
    //določi velikost tako, da optimalna razporeditev pade znotraj okna
    //32 odštejemo, ker ima vsaka kartica 10px padding in 2px za border in še dodatnih 10 pri adnjem elementu
    var size = Math.min(((kWidth-(widthN * 32 + 10))/widthN), ((kHeight-(heightN * 32 + 10))/heightN));

    //odšteje margine in borderje in padding da dobimo levi in desni odmik, da so kartice poravnane na sredino
    var paddingKartice = (kWidth-(widthN * 32 + 10)-(size*widthN))/2;
    $('#kartice').css({'padding-left': paddingKartice, 'padding-right': paddingKartice});
    $('.kartica').width(size);
    $('.kartica').height(size);

}
/*
parametra:  n - število kartic
            bRatio - razmerje width/height diva, v katerega bomo dali kartice

funkcija poišče vse deljitelje, najde optimalno razmerje razporeditve kartic

vrne število kartic v eni vrstici
 */
function findDivisors(n, bRatio){
    var nRatio = 0;
    var bestW;
    for(i=1; i<=n;i++){
        var iRatio;
        if((n % i) == 0){
            iRatio = i / (n / i);
            if (nRatio == 0) {
                nRatio = iRatio;
                bestW = i;
            }
            else {
                if(Math.abs(bRatio-iRatio) < Math.abs(bRatio-nRatio)){
                    nRatio = iRatio;
                    bestW = i;
                }
            }
        }
    }
    return bestW;
}
