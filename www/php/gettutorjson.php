<?php

error_reporting(0);
header("Access-Control-Allow-Origin: *");

// Create connection
//$mysqli = mysqli_connect('166.62.37.246','appusers','connected','sfuapp');
$mysqli = mysqli_connect('localhost','root','123456','sfuapp');


// Check connection
if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}

$query = "SELECT * FROM tutors";

if ($result = mysqli_query($mysqli, $query)) {
    $out = array();

    while ($row = $result->fetch_assoc()) {
        $out[] = $row;
    }

    /* encode array as json and output it for the ajax script*/
    echo json_encode($out);

    /* free result set */
    mysqli_free_result($result);

    /* close connection*/
    $mysqli->close();
}

/* close connection*/
$mysqli->close();

?>