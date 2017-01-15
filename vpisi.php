<?php
/**
 * Created by PhpStorm.
 * User: matej
 * Date: 15. 01. 17
 * Time: 16:13
 */
require 'DB.php';
$db = new DB();

if (isset($_POST['cas']) && isset($_POST['vzdevek']) && isset($_POST['mode'])){
    switch ($_POST['mode']){
        case 'spomin':
            $igra = 1;
            break;
        case 'dd':
            $igra = 2;
            break;
        default:
            $igra = 0;
    }
    $db->insert('lestvica', array(
       'ime' => $_POST['vzdevek'],
        'cas' => $_POST['cas'],
        'igra' => $igra
    ));
}

header('Location: '.'index.php');
