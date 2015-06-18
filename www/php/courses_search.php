<?php 
require_once('simple_html_dom.php');
require_once('breadth_courses.php');
require_once('quantitative_courses.php');
require_once('writing_courses.php');
header("Access-Control-Allow-Origin: *");
ini_set('max_execution_time', 3000); //300 seconds = 5 minutes



$page = $_GET['page'];
$totalRecord = 10*(int)$page;


function checkResults(&$courseArray, $courseValue, $totalRecord)
{

	array_push($courseArray, $courseValue);
	

    if(count($courseArray) > $totalRecord){
    	$offset = $totalRecord -9;
    	$output = array_slice($courseArray,$offset);

		echo json_encode($output); 
        exit();
    }

}

if(isset($_GET['department']))
{
	$term = $_GET['term'];
	$department = $_GET['department'];
	$num = $_GET['num'];
	$w = $_GET['w'];
	$q = $_GET['q'];
	$sci = $_GET['sci'];
	$soc = $_GET['soc'];
	$hum = $_GET['hum'];




	$url = "http://api.lib.sfu.ca/courses/numbers?term=".$term."&department=".$department;

	$numbers_json = file_get_html($url);

	$numbers = json_decode($numbers_json);

	$courses = array();
	
	if( !empty($_REQUEST['num']))
	{

		$number = $num;
		$number_without_W = $number;
		$number_without_W = chop($number_without_W, "W");
		if( $w == "1")
		{
			if(strpos(checkWCourse($department,$number_without_W), "W") || checkWCourse($department,$number_without_W) == "W")
			{
				$course = array("course" => $number, "course_type" => checkWCourse($department,$number_without_W));
				checkResults($courses, $course);
			}
		}
		else if( $q == "1")
		{
			if(strpos(checkQCourse($department,$number), "Q")|| checkQCourse($department,$number) == "Q")
			{
			
				$course = array("course" => $number, "course_type" => checkQCourse($department,$number));
				checkResults($courses, $course);
			}
		}
		else if( $sci == "1")
		{
			if(strpos(checkWQBCourse($department,$number), "Sci"))
			{
			
				$course = array("course" => $number, "course_type" => checkWQBCourse($department,$number));
				checkResults($courses, $course);
			}
		}
		else if( $soc == "1")
		{
			if(strpos(checkWQBCourse($department,$number), "Soc"))
			{
			
				$course = array("course" => $number, "course_type" => checkWQBCourse($department,$number));
				checkResults($courses, $course);
			}
		}
		else if( $hum == "1")
		{
			if(strpos(checkWQBCourse($department,$number), "Hum"))
			{
				
				$course = array("course" => $number, "course_type" => checkWQBCourse($department,$number));
				checkResults($courses, $course);
			}
		}
		else
		{

			if(checkWQBCourse($department,$number) == "-1" && checkQCourse($department,$number) == "-1" && checkWCourse($department,$number_without_W) == "-1")
			{
				
				$course = array("course" => $number, "course_type" =>  "none");
			}
			else if (checkWQBCourse($department,$number) != "-1")
			{
				$course = array("course" => $number, "course_type" => checkWQBCourse($department,$number));
			}
			else if (checkQCourse($department,$number) != "-1")
			{
				$course = array("course" => $number, "course_type" => checkQCourse($department,$number));
			}
			else if( checkWCourse($department,$number_without_W) != "-1")
			{
				$course = array("course" => $number, "course_type" => checkWCourse($department,$number_without_W));
			}
			checkResults($courses, $course);
		}
	}
	else
	{

		foreach ($numbers as $number)
		{
				$number_without_W = $number;
				$number_without_W = chop($number_without_W, "W");
				if( $w == "1" && (strpos(checkWCourse($department,$number_without_W), "W") || checkWCourse($department,$number_without_W) == "W"))
				{
					
						$course = array("course" => $number, "course_type" => checkWCourse($department,$number_without_W));
						checkResults($courses, $course);
				}
				else if( $q == "1" && (strpos(checkQCourse($department,$number), "Q") || checkQCourse($department,$number) == "Q"))
				{
					
					
						$course = array("course" => $number, "course_type" => checkQCourse($department,$number));
						checkResults($courses, $course);
			
				}
				else if( $sci == "1" && strpos(checkWQBCourse($department,$number), "Sci"))
				{
	
						$course = array("course" => $number, "course_type" => checkWQBCourse($department,$number));
						checkResults($courses, $course);
				}
				else if( $soc == "1" && strpos(checkWQBCourse($department,$number), "Soc"))
				{	
						$course = array("course" => $number, "course_type" => checkWQBCourse($department,$number));
						checkResults($courses, $course);
				}
				else if( $hum == "1" && strpos(checkWQBCourse($department,$number), "Hum"))
				{
						$course = array("course" => $number, "course_type" => checkWQBCourse($department,$number));
						checkResults($courses, $course);
				}
				else if($w == 0 && $q == 0 && $sci == 0 && $soc == 0 && $hum == 0)	
				{

					if(checkWQBCourse($department,$number) == "-1" && checkQCourse($department,$number) == "-1" && checkWCourse($department,$number_without_W) == "-1")
					{
						
						$course = array("course" => $number, "course_type" =>  "none");
					}
					else if (checkWQBCourse($department,$number) != "-1")
					{
						$course = array("course" => $number, "course_type" => checkWQBCourse($department,$number));
					}
					else if (checkQCourse($department,$number) != "-1")
					{
						$course = array("course" => $number, "course_type" => checkQCourse($department,$number));
					}
					else if( checkWCourse($department,$number_without_W) != "-1")
					{
						$course = array("course" => $number, "course_type" => checkWCourse($department,$number_without_W));
					}
					checkResults($courses, $course);
					
				}
				//array_push($courses, $course);
			
			
			

		//echo json_encode($course);
		}
	}
	echo json_encode($courses);
}
?>