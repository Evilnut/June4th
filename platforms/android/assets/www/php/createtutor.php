<?php
error_reporting(0);

header("Access-Control-Allow-Origin: *");

//define variables and set to empty values
$name = $course = $email = $telephone = $description ="";
$nameErr = $emailErr = $phoneErr= "";

function test_input($data){
   $data = trim($data);
   $data = stripslashes($data);
   $data = htmlspecialchars($data);
   return $data;
}

function createTutorKey() {
   $randomKey = md5(uniqid(mt_rand(), true));
   $tutorKey = substr($randomKey,0,4);
   return $tutorKey;
}

/********create tutorKey*********/
$tutorKey = createTutorKey();

//Get and validate data from createtutor.html page
if ($_SERVER["REQUEST_METHOD"] == "POST"){

    $name = test_input($_POST['tutorName']);
    $course = test_input($_POST['tutorCourse']);
    $email = test_input($_POST['email']);
    $telephone = $_POST['telephone'];
    $description = test_input($_POST['tutorDesc']);
}

/********connect to database*********/
//$mysqli = mysqli_connect('166.62.37.246','appusers','connected','sfuapp');
$mysqli = mysqli_connect('localhost','root','123456','sfuapp');
if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}


/********INSERT value into database*********/
$sql = "INSERT INTO `sfuapp`.`tutors` (`ID`,`Name`, `Course`,`Email`, `Telephone`, `Description`,`EditKey`,
  `Timestamp`) VALUES('','$name', '$course', '$email', '$telephone', '$description','$tutorKey', null)";
mysqli_query($mysqli, $sql);



/********Echo back a response*********/
$query = "SELECT ID, EditKey FROM tutors ORDER BY ID DESC LIMIT 1 ";
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


/********Unset the form data*********/
if(isset($_POST['submitBtn'])){
      unset($_POST['submitBtn']);
      unset($_POST['tutorName']);
      unset($_POST['tutorCourse']);
      unset($_POST['email']);
      unset($_POST['telephone']);
      unset($_POST['tutorDesc']);
     // header('Location:javascript://history.go(-1)');
}   

//Close connection
$mysqli->close();

?>
