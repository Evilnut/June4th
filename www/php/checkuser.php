<?php

/********connect to database*********/
$mysqli = mysqli_connect('166.62.37.246','appusers','connected','sfuapp');
//$mysqli = mysqli_connect('localhost','root','123456','sfuapp');
if (mysqli_connect_errno()) {
	printf("Connect failed: %s\n", mysqli_connect_error());
	exit();
}

$user_exists = false;

$username = $_GET['username'];

$search_query = $search_query = "SELECT * FROM `sfuapp`.`user` WHERE `ComputerID`='$username'";

$result = mysqli_query($mysqli,$search_query);

if(mysqli_num_rows($result)>0){
	$user_exists = true;
}

$mysqli->close();
?>