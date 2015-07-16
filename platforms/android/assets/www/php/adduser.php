<?php 
include('sfu-login.php');

/********connect to database*********/
$mysqli = mysqli_connect('166.62.37.246','appusers','connected','sfuapp');
//$mysqli = mysqli_connect('localhost','root','123456','sfuapp');
if (mysqli_connect_errno()) {
	printf("Connect failed: %s\n", mysqli_connect_error());
	exit();
}

$sql = "INSERT INTO `sfuapp`.`user` (`UID`, `BID`, `TID`, `StudentID`, `ComputerID`, `Email`, `Password`, `Name`) VALUES('', '', '', '', '$username', '', '$password','')";
mysqli_query($mysqli, $sql);

//Quit MySQLrrrr
$mysqli->close();

?>