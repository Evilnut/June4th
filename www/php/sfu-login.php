<?php
require_once('simple_html_dom.php');
header("Access-Control-Allow-Origin: *");


$username = $_GET['username'];
$password = $_GET['password'];

$upper_username = strtoupper($username);

$data = "httpPort=&timezoneOffset=420&user=".$username."&pwd=".$password."&userid=".$upper_username."&Submit=Login";                                                                              


$url = 'https://go.sfu.ca//psp/paprd/?cmd=login';
$cookie_file_path = dirname(__FILE__).'/cookie.txt';
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);

//curl_setopt($ch, CURLOPT_FOLLOWLOCATION, false);
//curl_setopt($ch, CURLOPT_COOKIEFILE, $cookie_file_path);
curl_setopt($ch, CURLOPT_COOKIEJAR, $cookie_file_path);
curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; MALNJS; rv:11.0) like Gecko");

//$response = curl_exec($ch);
curl_exec($ch);
curl_close($ch);


//$url = 'https://sims-prd.sfu.ca/psc/csprd_1/EMPLOYEE/HRMS/c/SA_LEARNER_SERVICES.SSR_SSENRL_SCHD_W.GBL?Page=SSR_SS_WEEK&Action=A&ExactKeys=Y&EMPLID=301183829&TargetFrameName=None&PortalActualURL=https%3a%2f%2fsims-prd.sfu.ca%2fpsc%2fcsprd_1%2fEMPLOYEE%2fHRMS%2fc%2fSA_LEARNER_SERVICES.SSR_SSENRL_SCHD_W.GBL%3fPage%3dSSR_SS_WEEK%26Action%3dA%26ExactKeys%3dY%26EMPLID%3d301179156%26TargetFrameName%3dNone&PortalRegistryName=EMPLOYEE&PortalServletURI=https%3a%2f%2fgo.sfu.ca%2fpsp%2fpaprd_1%2f&PortalURI=https%3a%2f%2fgo.sfu.ca%2fpsc%2fpaprd_1%2f&PortalHostNode=EMPL&NoCrumbs=yes&PortalKeyStruct=yes';
$url = 'https://go.sfu.ca/psp/paprd/EMPLOYEE/EMPL/h/?cmd=getCachedPglt&pageletname=SFU_STU_CENTER_PAGELET&tab=SFU_STUDENT_CENTER&PORTALPARAM_COMPWIDTH=Narrow&ptlayout=N';
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_COOKIEFILE, $cookie_file_path);

curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; MALNJS; rv:11.0) like Gecko");
$response = curl_exec($ch);

$html = str_get_html($response);
$student = array();
if(strlen($response) < 500)
{
	array_push($student, "password_failed");
}
else
{
	
	$str4 = $html->find('span.PATRANSACTIONTITLE', 0)->plaintext;
	$str5 = explode("'", $str4);
	$name = $str5[0];
	$id = $html->find('span.PATRANSACTIONTITLE', 1)->plaintext;
	$student["name"] = $name;
	$student["id"] = $id;
	if($html->find('td.PSLEVEL3GRIDLABEL div', 0)->plaintext == "This Week's Schedule")
	{
		
		$student["term_code"] = "1147";
	}
	else
	{
		$student["term_code"] = "1151";
	}
	
	if($html->find('span.PSHYPERLINKDISABLED', 0)->plaintext == "")
	{	
		$student["courses"] = "";
	}
	else 
	{
		$student_courses = array();
		foreach ($html->find('table.PSLEVEL1GRIDWBO span.PSHYPERLINKDISABLED') as $course)
		{
			//echo $course->plaintext;
			$str = explode("-", $course->plaintext);
			$str2 = explode(" ", $str[0]);
			$str3 = explode(" ", $str[1]);
			$department = $str2[0];
			$number = $str2[1];
			$section = $str3[0];
			$section = chop($section,"\r\n");

			$student_course = array("department" => $department, "number" => $number, "section" => $section);
			
			array_push($student_courses, $student_course);


		}
		$student["courses"] = $student_courses;
	
	}
	$data = "username=".$username."&student_id=".$id."&nick_name=".$name."&school=sfu";                                                                              

	//add data to student account
	$url = 'http://localhost/cakephp/sfu_app_api/users/add/';
	$cookie_file_path = dirname(__FILE__).'/cookie.txt';
	$ch2 = curl_init();

	curl_setopt($ch2, CURLOPT_URL, $url);
	curl_setopt($ch2, CURLOPT_HEADER, 0);
	curl_setopt($ch2, CURLOPT_POST, true);
	curl_setopt($ch2, CURLOPT_POSTFIELDS, $data);
	curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);

	curl_setopt($ch2, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch2, CURLOPT_SSL_VERIFYHOST, false);

	//curl_setopt($ch, CURLOPT_FOLLOWLOCATION, false);
	//curl_setopt($ch, CURLOPT_COOKIEFILE, $cookie_file_path);
	curl_setopt($ch2, CURLOPT_COOKIEJAR, $cookie_file_path);
	curl_setopt($ch2, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; MALNJS; rv:11.0) like Gecko");

	//$response = curl_exec($ch);
	curl_exec($ch2);
	curl_close($ch2);

}
echo json_encode($student);
?>

