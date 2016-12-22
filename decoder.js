var allCards;
var st_odkritih = 0;
/* da je lahko ista koda za vec json datotek */
/* anchor (#...) doloca, kater json naj se nalozi*/

/*
timer
 */
var seconds = 0;
var minutes = 0;
var hours = 0;
var t;



var hash = getUrlParameter("set");
console.log(hash);
if(hash == undefined){
    hash = 'note';
}

$.getJSON("sets/"+hash+".json", function (data) {
    var pairs = data.pairs;
    var cards = [];
    $.each(pairs, function(index, pair) {
        pair.el1.pair_id = index;
        pair.el2.pair_id = index;
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
    $('#st-vseh-input').val(allCards/2);
    $('#st-vseh').html(allCards/2);
    console.log(allCards/2);

});

function get_card(el){
    var card = '<div class="kartica" data-pair="' + el.pair_id + '" data-open="0"><div class="kartica-content back">';
    switch(el.type){
        case 1:
            card += el.value;
            break;
        case 2:
            card += '<img src="' + el.value + '" class="img-responsive">'; //</div></div></div>
            break;
    }
    card += '</div> <div class="front"></div> </div>'; //</div>
    return card;

}

$( document ).ready(function() {
    computeWidth(allCards);

    $(window).on('resize', function() {
        computeWidth(allCards);
    });

    $('.kartica').on('click', cardClick)
});

/*
 nastavi velikost kartic in levi in desni odmik glavnega okna
 */
function computeWidth(n){
    //nastavi padding na 0, da dobi pravilno velikost okna
    $('#kartice').css({'padding-left': 0, 'padding-right': 0});
    var kWidth = $('#kartice').width();
    var kHeight = $('#kartice').height()-50;
    //število kartic v vrstici
    var widthN = findDivisors(n, kWidth/kHeight);
    //število kartic v stolpcu
    var heightN = n/widthN;
    //določi velikost tako, da optimalna razporeditev pade znotraj okna
    //32 odštejemo, ker ima vsaka kartica 10px padding in 2px za border in še dodatnih 10 pri adnjem elementu
    var size = Math.min(((kWidth-(widthN * 14 + 10))/widthN), ((kHeight-(heightN * 14 + 10))/heightN));

    //odšteje margine in borderje in padding da dobimo levi in desni odmik, da so kartice poravnane na sredino
    var paddingKartice = (kWidth-(widthN * 14 + 10)-(size*widthN))/2;
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

function openCard(card){
    var curTrans = card.css('transform')
    card.css({'transform' : curTrans +' rotateY(180deg)'});
    card.attr('data-open', '1');
}

function closeCard(card){
    var curTrans = card.css('transform')
    card.css({'transform' : curTrans +' rotateY(180deg)'});
    card.attr('data-open', '0');
}

var cardClick = function(){
    //transform: rotateY(120deg);
    if($(this).attr("data-open") == 1){
        return;
    }
    openCard($(this));
    var cur = $('#prva-izbira').val();
    var izbran = $('#izbran').val();
    var pair_id = $(this).data("pair");
    if (izbran == false){
        $('#izbran').val(1);
        $('#prva-izbira').val(pair_id);
    } else {
        $('.kartica').off('click');
        if(cur == pair_id){
            st_odkritih = st_odkritih + 1;
            $('#st-odkritih-input').val(st_odkritih);
            $('#st-odkritih').html(st_odkritih);
            /*
            konec igre
             */
            if(st_odkritih == allCards/2){
                stopTime();
            }
            setTimeout(function(){
                $("div[data-pair='"+cur+"']").empty();
                $('#prva-izbira').val(-1);
                $('#izbran').val(0);
                $('.kartica').on('click', cardClick);
            },2000);
        }
        else {
            setTimeout(function(){
                $("div[data-open='1']").each(function(){
                    closeCard($(this));
                    $('#prva-izbira').val(-1);
                    $('#izbran').val(0);
                    $('.kartica').on('click', cardClick);
                });
            },2000);
        }
    }
}

function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};



function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    $('#time').html((hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds));

    timer();
}
function timer() {
    t = setTimeout(add, 1000);
}

timer();

/* Stop button */
function stopTime() {
    clearTimeout(t);
}

function clear() {
    time.html("00:00:00");
    seconds = 0; minutes = 0; hours = 0;
}