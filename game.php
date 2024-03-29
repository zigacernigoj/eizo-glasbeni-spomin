<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Glasbeni spomin</title>

    <script src="https://code.jquery.com/jquery-3.1.1.min.js"
            integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>
    <link href="https://fonts.googleapis.com/css?family=Amatic+SC" rel="stylesheet">

    <link rel="stylesheet" href="css/bootstrap.css">

    <script src="js/bootstrap.js"></script>


    <link rel="stylesheet" href="css/main.css">

    <script src="js/jquery.shuffle.js"></script>
    <script src="js/decoder.js"></script>


    <style>
        audio {
            width: 100%;
        }
    </style>

</head>
<body id="game">
<nav class="navbar navbar-default navbar-fixed-top clearfix">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="index.php">Glasbeni spomin</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
            <!--<ul class="nav navbar-nav">
                <li class="active"><a href="#">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="#">Action</a></li>
                        <li><a href="#">Another action</a></li>
                        <li><a href="#">Something else here</a></li>
                        <li role="separator" class="divider"></li>
                        <li class="dropdown-header">Nav header</li>
                        <li><a href="#">Separated link</a></li>
                        <li><a href="#">One more separated link</a></li>
                    </ul>
                </li>
            </ul>-->
            <ul class="nav navbar-nav navbar-right">

                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Spomin <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="game.php?set=notni_elementi&mode=spomin">Notni elementi</a></li>
                        <li><a href="game.php?set=glasbila&mode=spomin">Glasbila</a></li>
                        <li><a href="game.php?set=note&mode=spomin">Note</a></li>
                    </ul>
                </li>


                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Drag&Drop <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="game.php?set=notni_elementi&mode=dd">Notni elementi</a></li>
                        <li><a href="game.php?set=glasbila&mode=dd">Glasbila</a></li>
                        <li><a href="game.php?set=note&mode=dd">Note</a></li>
                    </ul>
                </li>

            </ul>
        </div><!--/.nav-collapse -->
    </div>
</nav>

<!-- The Modal -->
<div id="theEnd" class="modal">

    <!-- Modal content -->
    <div class="modal-content" id="modal-content">

    </div>

</div>



<div class="container-fluid" id="kartice">


</div>

<footer class="navbar-fixed-bottom clearfix">
    <div class="container clearfix">
        <p style="float: left;">Odkritih parov: <span id="st-odkritih">0</span>/<span id="st-vseh"></span></p>
        <p style="float: right;">Pretekel čas: <time id="time">00:00:00</time></p>
    </div>
</footer>
<input type="hidden" id="prva-izbira" name="prva-izbira" value="-1">
<input type="hidden" id="izbran" name="izbran" value="0">
<input type="hidden" id="st-odkritih-input" value="0">
<input type="hidden" id="st-vseh-input">
<input type="hidden" id="st-trenutno-odkritih" value="0">


</body>
</html>