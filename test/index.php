<?php

header('Content-Type: text/html; charset=utf-8');

$jqueryVersion = $_GET['version'];

if (isset($jqueryVersion)) {
    $filePath = "./html/index.html";
    $file = file_get_contents($filePath, true);
    $file = str_replace("{{=jqueryVersion}}", $jqueryVersion, $file);
    echo $file;
} else {
    include "./html/versions.php";
}


