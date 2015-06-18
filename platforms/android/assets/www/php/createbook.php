<?php

error_reporting(0);
header("Access-Control-Allow-Origin: *");



/* Define text data get from createbook.html page */
$bookID = $name = $author = $edition = $seller = $description = $OriginalPrice 
= $CurrentPrice = $Telephone = $Email =$imgData="";


function test_input($data){
   $data = trim($data);
   $data = stripslashes($data);
   $data = htmlspecialchars($data);
   return $data;
}


/* Generate EditKey for book */
function createEditKey() {
   $randomKey = md5(uniqid(mt_rand(), true));
   $editKey = substr($randomKey,0,4);
   return $editKey;
}


$bookKey = createEditKey();
  
//Define ID for book
        // function create_GUID() {
        //     $charId = strtoupper(md5(uniqid(mt_rand(), true)));
        //     $hyphen = chr(45);// "-"
        //     $uuid = chr(123)// "{"
        //         .substr($charId, 0, 8).$hyphen
        //         .substr($charId, 8, 4).$hyphen
        //         .substr($charId,12, 4).$hyphen
        //         .substr($charId,16, 4).$hyphen
        //         .substr($charId,20,12)
        //         .chr(125);// "}"
        //     return $uuid;
        // }

        // $bookID = create_GUID();



 
/* Get and validate data from createbook.html page */
if ($_SERVER["REQUEST_METHOD"] == "POST"){
    $name = test_input($_POST['bookName']);
    $author = test_input($_POST['bookAuthor']);
    $edition = test_input($_POST['bookEdition']);
    $seller = test_input($_POST['seller']);

    if(empty($_POST['bookDesc'])){
        $description = "no comment";
    }else{
        $description = test_input($_POST['bookDesc']);   
    }

    $OriginalPrice = test_input(floatval($_POST['OriginalPrice']));
    $CurrentPrice = test_input(floatval($_POST['CurrentPrice']));
    $Telephone = test_input($_POST['telephone']);
    $Email = test_input($_POST['email']);

    //Get book image information
    $imgFile = $_FILES['fileToUpload'];
}


/********connect to database*********/
$mysqli = mysqli_connect('166.62.37.246','appusers','connected','sfuapp');
//$mysqli = mysqli_connect('localhost','root','123456','sfuapp');
if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}




/* If there is an image provided */
if(is_array($imgFile)) {
    $fname = $imgFile['name'];  //get image name
    $type = $imgFile['type']; //get image type
    $size = $imgFile['size'];  //get image length
    $tmpFile = $imgFile['tmp_name'];  //get temporary image path

    /********convert image data to hex file*********/
    if ($tmpFile and is_uploaded_file($tmpFile)) {  //To see whether the file is empty and the file is what we need
        $file = fopen($tmpFile, "rb");    //get image file stream
        $imgData = bin2hex(fread($file, $size));  //bin2hex(), transfer binary to 16
        //echo log($imgData);
        //echo ($imgData);
        fclose($file);
    }


    /********INSERT value into database*********/
    $sql = "INSERT INTO `sfuapp`.`books` (`ID`,`Name`, `Author`,`Edition`, `Seller`, `Description`, `Email`, `Telephone`, `OriginalPrice`, `CurrentPrice`, `Image`, `EditKey`, `Timestamp`) VALUES('$bookID','$name', '$author','$edition','$seller','$description','$Email','$Telephone', $OriginalPrice, $CurrentPrice , '$imgData', '$bookKey', null)";
    mysqli_query($mysqli, $sql);

}else{
    /* no book image is provided */
    $imgData="";
    $sql = "INSERT INTO `sfuapp`.`books` (`ID`,`Name`, `Author`,`Edition`, `Seller`, `Description`, `Email`, `Telephone`, `OriginalPrice`, `CurrentPrice`, `Image`, `EditKey`, `Timestamp`) VALUES('$bookID','$name', '$author','$edition','$seller','$description','$Email','$Telephone', $OriginalPrice, $CurrentPrice , '$imgData', '$bookKey', null)";
    mysqli_query($mysqli, $sql);

}



/********Echo back a response*********/
$query = "SELECT ID, EditKey FROM books ORDER BY ID DESC LIMIT 1 ";
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




//return to previous page after submit button is pressed
if(isset($_POST['submitBtn'])){
      unset($_POST['submitBtn']);
      //header('Location:javascript://history.go(-1)');
}


?>