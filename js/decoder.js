var allCards;
var st_odkritih = 0;
/* da je lahko ista koda za vec json datotek */

/*
 timer
 */
var seconds = 0;
var minutes = 0;
var hours = 0;
var t;

// da zbrises localstorage
//localStorage.clear();

// hash = glasbila / notni elementi /
var hash = getUrlParameter("set");
// console.log(hash);
if (hash == undefined) {
    hash = 'note';
}

// mode = spomin / dd (drag&drop)
var mode = getUrlParameter("mode");
if (mode == undefined) {
    mode = 'spomin';
}

// limit = cas / poteze / undefined
// => undefined brez omejitev
var limit = getUrlParameter("limit");

var timeLimit = null; // v minutah
var timeLeft = null; // za odstevanje

var levelLimit = {
    1: 240, // level: 1, limit: 4 min
    2: 210, // level: 2, limit: 3.5 min
    3: 180, // level: 3, limit: 3 min
    4: 150, // 2.5
    5: 120, // 2
    6: 90,  // 1.5
    7: 60,  // 1
    8: 30   // 0.5
};

if(limit === 'cas') {
    console.log('time limit');
    var storedLevel = localStorage.getItem("level");
    if(storedLevel === undefined || storedLevel === null) {
        localStorage.setItem("level", 1);
        storedLevel = localStorage.getItem("level");
    }
    if(parseInt(storedLevel) === 9) {
        console.log('stopnja 9');
        showCongrats();
    }
    else {
        timeLimit = levelLimit[storedLevel];
        console.log("storedlevel", storedLevel, "timelimit", timeLimit);

        limitTime();
    }
}
else {
    timer();
}



$.getJSON("sets/" + hash + ".json", function (data) {
    var pairs = data.pairs;
    var cards = [];
    $.each(pairs, function (index, pair) {
        pair.el1.pair_id = index;
        pair.el2.pair_id = index;
        cards.push(pair.el1, pair.el2);
    });
    $.shuffle(cards);
    $.each(cards, function (index, card) {
        if (mode == 'spomin') {
            $("#kartice").append(get_card_spomin(card));
        }
        else if (mode == "dd") {
            $("#kartice").append(get_card_dd(card));
        }

    });
    $('.kartica').each(function () {
        if (mode == "spomin") {
            var degree = (Math.floor(Math.random() * 7)) - 3;
            $(this).css({'transform': 'rotate(' + degree + 'deg)'});
        }

        // pri drag&drop ne obraca kartic (se en efekt - kartice niso nagnjene)
        // ne obraca pa pa jih zato, ker nimajo v css-u tega rotate
    })
    allCards = cards.length;
    $('#st-vseh-input').val(allCards / 2);
    $('#st-vseh').html(allCards / 2);
    console.log(allCards / 2);

});

function get_card_spomin(el) {
    var card = '<div class="kartica" data-pair="' + el.pair_id + '" data-open="0"><div class="kartica-content back">';
    switch (el.type) {
        case 1:
            card += '<p>' + el.value + '</p>';
            break;
        case 2:
            card += '<img src="' + el.value + '" class="img-responsive">'; //</div></div></div>
            break;
    }
    card += '</div> <div class="front"></div> </div>'; //</div>
    return card;

}


// spremenjene kartice - imajo dodatne atribute za drag&drop
// dodatne metode na koncu - ZA DRAG & DROP
// drugih metod, ki so potrebne pri navadnem spominu, tu niso potrebne
function get_card_dd(el) {
    var card = '<div class="kartica kartica-dd" data-pair="' + el.pair_id + '" data-open="0"><div class="kartica-content dd">';
    switch (el.type) {
        case 1:
            card += '<p ondrop="drop(event)" ondragover="allowDrop(event)">' + el.value + '</p>';
            break;
        case 2:
            card += '<img src="' + el.value + '" id="' + el.pair_id + '" class="img-responsive" draggable="true" ondragstart="drag(event)">'; //</div></div></div>
            break;
    }
    card += '</div> <!--<div class="front"></div>--> </div>'; //</div>
    return card;

}


$(document).ready(function () {
    computeWidth(allCards);

    $(window).on('resize', function () {
        computeWidth(allCards);
    });

    $('.kartica').on('click', cardClick)
});

/*
 nastavi velikost kartic in levi in desni odmik glavnega okna
 */

var ht;

function computeWidth(n) {
    //nastavi padding na 0, da dobi pravilno velikost okna
    $('#kartice').css({'padding-left': 0, 'padding-right': 0});
    var kWidth = $('#kartice').width();
    var kHeight = $('#kartice').height() - 50;
    //število kartic v vrstici
    var widthN = findDivisors(n, kWidth / kHeight);
    //število kartic v stolpcu
    var heightN = n / widthN;
    //določi velikost tako, da optimalna razporeditev pade znotraj okna
    //32 odštejemo, ker ima vsaka kartica 10px padding in 2px za border in še dodatnih 10 pri adnjem elementu
    var size = Math.min(((kWidth - (widthN * 14 + 10)) / widthN), ((kHeight - (heightN * 14 + 10)) / heightN));

    ht = size;

    //odšteje margine in borderje in padding da dobimo levi in desni odmik, da so kartice poravnane na sredino
    var paddingKartice = (kWidth - (widthN * 14 + 10) - (size * widthN)) / 2;
    $('#kartice').css({'padding-left': paddingKartice, 'padding-right': paddingKartice});
    $('.kartica').width(size);
    $('.kartica').height(size);
    $('.back p').css({'line-height': size - 20 + 'px'});
    $('.dd p').css({
        'line-height': size + 'px'
    });

}

/*
 parametra:  n - število kartic
 bRatio - razmerje width/height diva, v katerega bomo dali kartice

 funkcija poišče vse deljitelje, najde optimalno razmerje razporeditve kartic

 vrne število kartic v eni vrstici
 */
function findDivisors(n, bRatio) {
    var nRatio = 0;
    var bestW;
    for (i = 1; i <= n; i++) {
        var iRatio;
        if ((n % i) == 0) {
            iRatio = i / (n / i);
            if (nRatio == 0) {
                nRatio = iRatio;
                bestW = i;
            }
            else {
                if (Math.abs(bRatio - iRatio) < Math.abs(bRatio - nRatio)) {
                    nRatio = iRatio;
                    bestW = i;
                }
            }
        }
    }
    return bestW;
}

function openCard(card) {
    var curTrans = card.css('transform')
    card.css({'transform': curTrans + ' rotateY(180deg)'});
    card.attr('data-open', '1');
}

function closeCard(card) {
    var curTrans = card.css('transform')
    card.css({'transform': curTrans + ' rotateY(180deg)'});
    card.attr('data-open', '0');
}

var cardClick = function () {
    //transform: rotateY(120deg);
    if ($(this).attr("data-open") == 1) {
        return;
    }
    openCard($(this));
    var cur = $('#prva-izbira').val();
    var izbran = $('#izbran').val();
    var pair_id = $(this).data("pair");
    if (izbran == false) {
        $('#izbran').val(1);
        $('#prva-izbira').val(pair_id);
    } else {
        $('.kartica').off('click');
        if (cur == pair_id) {
            st_odkritih = st_odkritih + 1;
            $('#st-odkritih-input').val(st_odkritih);
            $('#st-odkritih').html(st_odkritih);
            /*
             konec igre
             */
            if (st_odkritih == allCards / 2) {
                stopTime();
            }
            setTimeout(function () {
                $("div[data-pair='" + cur + "']").empty();
                $('#prva-izbira').val(-1);
                $('#izbran').val(0);
                $('.kartica').on('click', cardClick);
            }, 2000);
        }
        else {
            setTimeout(function () {
                $("div[data-open='1']").each(function () {
                    closeCard($(this));
                    $('#prva-izbira').val(-1);
                    $('#izbran').val(0);
                    $('.kartica').on('click', cardClick);
                });
            }, 2000);
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
}


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

function subtract() {
    if(timeLimit === 0) {
        stopTime();
        showEnd();
    }
    else {
        timeLimit--;
        //console.log(timeLimit);

        hours = Math.floor(timeLimit / 3600);
        minutes = Math.floor((timeLimit - (hours * 3600)) / 60);
        seconds = timeLimit - (hours * 3600) - (minutes * 60);

        $('#time').html((hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds));

        //console.log(hours, minutes, seconds);

        limitTime();
    }
}

function limitTime() {
    t = setTimeout(subtract, 1000);
}

/* Stop button */
function stopTime() {
    clearTimeout(t);
}

function clear() {
    time.html("00:00:00");
    seconds = 0;
    minutes = 0;
    hours = 0;
}


/* ZA DRAG & DROP */

var dragpair_1 = null; // id izbranega elementa, ki ga uporabnik vlece
var dragpair_2 = null; // izbrano "polje" (kartica), kamor je uporabnik element odlozil
var dragparent = null; // stars izbranega elementa - v trenutku, ko uporabnik klikne nek element (zacetek vlecenja)
var dragparent_content = null; // vsebina starsa

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    console.log("id trenutne lokacije:", ev.target.parentNode);
    dragparent_content = $(ev.target.parentNode).html();
    dragparent = ev.target.parentNode;

    console.log("id elementa, ki ga premikam:", ev.target.id);

    dragpair_1 = ev.target.id;
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();


    if (ev.target.parentNode.parentNode != undefined) {

        var data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));

        dragpair_2 = ev.target.parentNode.parentNode.attributes['data-pair'].value;
        console.log("id lokacije, kamor sem ga spustil:", dragpair_2);

        $('#'+dragpair_1).css({'margin-top': '-' + ht  + 'px'});

        if (dragpair_1 === dragpair_2) { // ce pravilno
            console.log("pravilno");

            $(ev.target).css({"background": "green"});

            setTimeout(function () {
                $(ev.target.parentNode.parentNode).css({
                    "background": "white",
                    "border": "none"
                });
                $(ev.target.parentNode.parentNode).html("");

                $(dragparent.parentNode).css({
                    "background": "white",
                    "border": "none"
                });
                $(dragparent.parentNode).html("");

            }, 500);

            st_odkritih = st_odkritih + 1;
            $('#st-odkritih-input').val(st_odkritih);
            $('#st-odkritih').html(st_odkritih);
            /*
             konec igre
             */
            if (st_odkritih == allCards / 2) {
                stopTime();

                showCongrats();
            }
        }
        else { // ce napacno
            $(ev.target).css({"background": "red"});

            setTimeout(function () {
                $(ev.target).css({"background": "white"});
                $(dragparent).html("");
                $(dragparent).html(dragparent_content);

                $(ev.target).html(ev.target.firstChild);

            }, 500);
        }
    }
}

function showCongrats() {
    // Get the modal
    var modal = $('#theEnd');
    modal.style='';
    console.log(modal.style);

    var modalContent = $('#modal-content');

    var content =   '<span class="close">&times;</span>' +
                    '<p>Bravo! Končal si igro</p>' +
                    '<a href="index.html">Nazaj</a>';

    if(limit === 'cas') {
        var currentLevel = parseInt(localStorage.getItem("level"));
        if(currentLevel === 9) {
            console.log('stopnja 9');
            content += 'KONČAL SI VSE STOPNJE';
        }
        else {
            localStorage.setItem("level", currentLevel+1);
            content += '<br><a href="game.html?set=notni_elementi&mode=dd&limit=cas">Naslednja stopnja</a>';
        }
    }
    modalContent.html( content );

    // Get the <span> element that closes the modal
    // var span = document.getElementsByClassName("close")[0];

    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    // span.onclick = function() {
    //     modal.style.display = "none";
    //     window.location.href = "index.html";
    // }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            window.location.href = "index.html";
        }
    }
}

function showEnd() {
    // Get the modal
    var modal = document.getElementById('theEnd');

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];


    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
        window.location.href = "index.html";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            window.location.href = "index.html";
        }
    }
}