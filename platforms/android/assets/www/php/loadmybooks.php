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
$sql = "SELECT ID,Name,Author,Edition,Seller,Description,Email,Telephone,OriginalPrice,CurrentPrice,UID FROM books WHERE `books`.`UID`='$userID'";

if($result=mysqli_query($mysqli, $sql)){
	$out = array();
	
	while($row = $result->fetch_assoc()){
		$out[] = $row;
	}

	echo json_encode($out);
	
	mysqli_free_result($result);
}


/* if ($result = mysqli_query($mysqli, $sql)) {
	$out = array();
	$posts = array();

  	while ($row = $result->fetch_assoc()) {
		$out[] = $row;
	}
	
	while($row=mysqli_fetch_array($result)){
		$id=$row['ID'];
		$name=$row['Name'];
		$author=$row['Author'];
		$edition=$row['Edition'];
		$seller=$row['Seller'];
		$desc=$row['Description'];
		$email=$row['Email'];
		$telephone=$row['Telephone'];
		$oprice=$row['OriginalPrice'];
		$cprice=$row['CurrentPrice'];
		$posts[] = array('ID'=>$id, 'Name'=>$name, 'Author'=>$author, 'Edition'=>$edition, 'Seller'=>$seller, 'Description'=>$desc, 
				'Email'=>$email, 'Telephone'=>$telephone, 'OriginalPrice'=>$oprice, 'CurrentPrice'=>$cprice
		);
	}
	$out['userBooks']= $posts;
	 encode array as json and output it for the ajax script
 	$fp=fopen('mybooks.json','w');
 	echo $fp;
	fwrite($fp,json_encode($out));
	fclose($fp); 

	mysqli_free_result($result);
}
 */
//Quit MySQL
$mysqli->close();


?>