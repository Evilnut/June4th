<?php 
error_reporting(0);
//require_once('simple_html_dom.php');
header("Access-Control-Allow-Origin: *");

$userID= $_GET['userID'];

/********connect to database*********/
$mysqli = mysqli_connect('166.62.37.246','appusers','connected','sfuapp');

if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}

/********INSERT value into database*********/
$sql = "SELECT ID,Name,Course,Description,Email,Telephone,EditKey,Timestamp,UID FROM tutors WHERE `tutors`.`UID`='$userID'";

if($result=mysqli_query($mysqli, $sql)){
	$out = array();
	
	while($row = $result->fetch_assoc()){
		$out[] = $row;
	}

	echo json_encode($out);
	
	mysqli_free_result($result);
}

//Quit MySQL
$mysqli->close();


?>