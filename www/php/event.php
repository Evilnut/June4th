<?php
error_reporting(0);

header("Access-Control-Allow-Origin: *");

//define variables and set to empty values

function test_input($data){
   $data = trim($data);
   $data = stripslashes($data);
   $data = htmlspecialchars($data);
   return $data;
}


//Get and validate data from editbook.html page
if ($_SERVER["REQUEST_METHOD"] == "POST"){
}

/********connect to database*********/
$mysqli = mysqli_connect('166.62.37.246','appusers','connected','sfuapp');
//$mysqli = mysqli_connect('localhost','root','123456','sfuapp');
if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}


/********Echo back a response*********/
$query = "SELECT * FROM `sfuapp`.`event` WHERE 1";
if ($result = mysqli_query($mysqli, $query)) {
    $out = array();

    while ($row = $result->fetch_assoc()) {
        $out[] = $row;
    }

    /* encode array as json and output it for the ajax script*/
    echo json_encode($out);

    /* free result set */
    mysqli_free_result($result);

}    


//Close connection
$mysqli->close();

?>