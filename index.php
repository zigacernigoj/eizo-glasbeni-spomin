<?php
require 'DB.php';
$db = new DB();

$data = $db->fetch("SELECT MIN(cas) AS cas, ime, igra FROM lestvica GROUP BY igra");
$igre = array(
    1 => "Spomin",
    2 => "Drag & Drop"
);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Glasbeni spomin</title>

    <script src="https://code.jquery.com/jquery-3.1.1.min.js"
            integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>
    <link href="https://fonts.googleapis.com/css?family=Amatic+SC" rel="stylesheet">

    <link rel="stylesheet" href="css/bootstrap.css">
    <link rel="stylesheet" href="css/bootstrap-theme.css">

    <script src="js/bootstrap.js"></script>


    <link rel="stylesheet" href="css/main.css">

    <style>
        audio {
            width: 100%;
        }
    </style>

</head>
<body>
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
    </div>
</nav>
<div class="container">
    <div class="row">
        <div class="col-md-9">
                <div class="row" style="margin-top: 10px">
                    <div class="col-xs-12">
                        <div class="well well-sm sklop">
                            <h4>Spomin - izberi tematiko</h4>
                        </div>
                    </div>
                </div>
                <div class="row thumbnail-container">
                    <div class="col-xs-6 col-md-3 col-md-offset-1">
                        <a href="game.php?set=notni_elementi&mode=spomin" class="thumbnail" style="background: MediumTurquoise;">
                            <img src="sets/img/notni_elementi/neznano8.svg" alt="Notni elementi">
                            <h4>Notni elementi</h4>
                        </a>
                    </div>
                    <div class="col-xs-6 col-md-3">
                        <a href="game.php?set=glasbila&mode=spomin" class="thumbnail" style="background: LightBlue;">
                            <img src="sets/img/glasbila/violin.svg" alt="Glasbila">
                            <h4>Glasbila</h4>
                        </a>
                    </div>
                    <div class="col-xs-6 col-md-3">
                        <a href="game.php?set=note&mode=spomin" class="thumbnail" style="background: hotpink;">
                            <img src="sets/img/note/a1.svg" alt="Note">
                            <h4>Note</h4>
                        </a>
                    </div>


                </div>
                <div class="row" style="margin-top: 10px">
                    <div class="col-xs-12">
                        <div class="well well-sm sklop">
                            <h4>Drag & Drop igra - izberi tematiko</h4>
                        </div>
                    </div>
                </div>
                <div class="row thumbnail-container">

                    <div class="col-xs-6 col-md-3 col-md-offset-1">
                        <a href="game.php?set=notni_elementi&mode=dd" class="thumbnail" style="background: SandyBrown;">
                            <img src="sets/img/notni_elementi/neznano7.svg" alt="Notni elementi">
                            <h4>Notni elementi</h4>
                        </a>
                    </div>
                    <div class="col-xs-6 col-md-3">
                        <a href="game.php?set=glasbila&mode=dd" class="thumbnail" style="background: Tan;">
                            <img src="sets/img/glasbila/piano.svg" alt="Glasbila">
                            <h4>Glasbila</h4>
                        </a>
                    </div>
                    <div class="col-xs-6 col-md-3">
                        <a href="game.php?set=note&mode=dd" class="thumbnail" style="background: oldlace ;">
                            <img src="sets/img/note/g1.svg" alt="Note">
                            <h4>Note</h4>
                        </a>
                    </div>

                </div>
        </div>
        <div class="col-md-3">
            <div class="row" style="margin-top: 10px">
                <div class="col-xs-12">
                    <div class="well well-sm sklop">
                        <h4>Lestvica - najboljši v igri</h4>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12" style="padding: 0 30px;">
                    <?php
                    foreach($data as $row){
                        echo '<p class="lestvica"><span>'.$igre[$row['igra']].': </span>'.$row['cas'].' '.$row['ime'].'</p>';
                    }
                    ?>
                </div>
            </div>
            <div class="row" style="margin-top: 10px">
                <div class="col-xs-12">
                    <div class="well well-sm sklop">
                        <h4>Navodila</h4>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <p style="padding: 10px;">Za igranje igre izberi način in tematiko in klikni na eno od ikon. Pri načinu "Drag & Drop" so vse kartice odprte in s pomočjo drag & drop načina povlečete slikice na njen smiselen besedilni par, pri igri spomin, pa so kartice zakrite kot pri klasičnem spominu in je potrebno odkriti vse pare. </p>
                </div>
            </div>
        </div>
    </div>

</div>


</body>
</html>