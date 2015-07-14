(function ($$) {
	'use strict';

	/**
	* Description:	URL define		  
	*
	* Author   :	Alex
	*
	* Comments   :	none
	* 
	**/


    var profListURL = ['http://evilnut.ca/App/APIs/sfu_app/sfu_app_api/rateMyProfessors/index.json'];

    //var profListURL = ['http://www.evilnut.ca/kris/KRIS/cakephp/sfu_app_api/rateMyProfessors/index.json'];

    var programListURL = ['http://evilnut.ca/App/APIs/sfu_app/sfu_app_api/programs/index.json'];
    var transitURL = ["http://evilnut.ca/App/APIs/sfu_app/sfuapp/"];//good

	var courseScheduleListURL = ["js/Lang/courseslist.json"]; //good
	var stringsEnURL = ["js/Lang/strings_en.json"]; //good
	var courseSearchListURL = ["http://evilnut.ca/App/APIs/sfu_app/sfuapp/courses_search1.php"];//good
	var sfuDepartmentURL = ["http://api.lib.sfu.ca/courses/departments"];
	var courseSectionURL = ["http://api.lib.sfu.ca/courses/sections"];
	var courseDetailURL = ["http://api.lib.sfu.ca/courses/course"];
	var courseOutlineURL = ["http://www.sfu.ca/bin/wcm/course-outlines"];
	var newsRandomURL = ["http://api.lib.sfu.ca/librarynews/frontpage/random?category=bennett"];
	var newsLibraryURL = ["http://api.lib.sfu.ca/librarynews/frontpage/next?category=bennett&id="];
	/*var sfuLoginURL = ["http://roywang.net/evilnut/sfuapp/sfu-login.php"];*/
    var sfuLoginURL = ["http://evilnut.ca/App/APIs/sfu_app/sfuapp/sfu-login.php"];
    var checkUserURL = ["http://evilnut.ca/App/APIs/sfu_app/sfuapp/sql/checkuser1.php"];
    var connectEdSignupURL = ["http://evilnut.ca/App/APIs/sfu_app/sfuapp/sql/adduser.php"];
    var deleteTutorURL = ["http://evilnut.ca/App/APIs/sfu_app/sfuapp/sql/deletetutor.php"];
	var deleteBookURL = ["http://evilnut.ca/App/APIs/sfu_app/sfuapp/sql/deletebook.php"];
    var userBooksURL =["http://evilnut.ca/App/APIs/sfu_app/sfuapp/sql/loadmybooks.php"];
    var userBooksJsonURL = ["http://www.evilnut.ca/App/APIs/sfu_app/sfuapp/sql/mybooks.json"];

	/**
	* Description:	HTTP request function define	  
	*
	* Author   :	Alex
	*
	* Comments   :	none
	* 
	**/
	var httpReq = function (path, index, success, error, retry) {
	
		retry = retry || 0;
		return $$.ajax({
			url: path[index],
			success: success,
			error: function (xhr) {
				console.log("http request error");
				if (retry < path.length - 1) {
					httpReq(path, success, error, retry += 1);
				} else {
					error(xhr);
				}
			}
		});
	};


	var transitReq = function (path, index, stationId, success, error, retry) {
		console.log(path[index] + "station_" + stationId + ".php");
		retry = retry || 0;
		return $$.ajax({
			url: path[index] + "station_" + stationId + ".php",
			success: success,
			error: function (xhr) {
				if (retry < path.length - 1) {
					httpReq(path, success, error, retry += 1);
				} else {
					error(xhr);
				}
			}
		});
	};

	var loginReq = function (path, username, password, index, success, error, retry) {
		console.log(path[index] + "?username=" + username + "&password=" + password);
		retry = retry || 0;
		return $$.ajax({
			url: path[index] + "?username=" + username + "&password=" + password,
			success: success,
			error: function (xhr) {
				if (retry < path.length - 1) {
					httpReq(path, success, error, retry += 1);
				} else {
					error(xhr);
				}
			}
		});
	};
	
	var checkUserReq = function (path, username, index, success, error, retry) {
		console.log(path[index]);
		retry = retry || 0;
		return $$.ajax({
			url: path[index],
			method: "POST",
			data: "username=" + username,
			success: success,
			error: function (xhr) {
				if (retry < path.length - 1) {
					httpReq(path, success, error, retry += 1);
				} else {
					error(xhr);
				}
			}
		});
	};

	var signupReq = function (path, username, studentID, studentName, index, success, error, retry) {
		console.log(path[index]);
		retry = retry || 0;
		return $$.ajax({
			url: path[index],
			method: "POST",
			data: "username=" + username + "&studentID=" + studentID + "&studentName=" + studentName,
			success: success,
			error: function (xhr) {
				if (retry < path.length - 1) {
					httpReq(path, success, error, retry += 1);
				} else {
					error(xhr);
				}
			}
		});
	};

	var deleteTutorReq = function (path, TID, index, success, error, retry) {
		console.log(path[index]);
		console.log("TID="+TID);
		retry = retry || 0;
		return $$.ajax({
			url: path[index],
			method: "POST",
			data: "TID=" + TID,
			success: success,
			error: function (xhr) {
				if (retry < path.length - 1) {
					httpReq(path, success, error, retry += 1);
				} else {
					error(xhr);
				}
			}
		});
	};

	var deleteBookReq = function (path, BID, index, success, error, retry) {
		console.log(path[index]);
		console.log(BID);
		retry = retry || 0;
		return $$.ajax({
			url: path[index],
			method: "POST",
			data: "BID=" + BID,
			success: success,
			error: function (xhr) {
				if (retry < path.length - 1) {
					httpReq(path, success, error, retry += 1);
				} else {
					error(xhr);
				}
			}
		});
	};

	var depatmentReq = function (path, term, index, success, error) {
		return $.ajax({
			dataType: 'jsonp',
			url: path[index] + "?term=" + term,
			success: success,
			error: error
		});
	};

	var courseSearchReq = function (path, term, department, num, writing, quantitative, bSci, bSoc, bHum, page, index, success, error, retry) {
		console.log(path[index] + "?department=" + department + "&term=" + term + "&num=" + num + "&w=" + writing + "&q=" + quantitative + "&sci=" + bSci + "&soc=" + bSoc + "&hum=" + bHum + "&page=" +page);
		retry = retry || 0;
		return $$.ajax({
			url: path[index] + "?department=" + department + "&term=" + term + "&num=" + num + "&w=" + writing + "&q=" + quantitative + "&sci=" + bSci + "&soc=" + bSoc + "&hum=" + bHum + "&page=" +page,
			success: success,
			error: function (xhr) {
				if (retry < path.length - 1) {
					httpReq(path, success, error, retry += 1);
				} else {
					error(xhr);
				}
			}
		});
	};

	var courseSectionReq = function (path, term, department, num, index, success, error) {
		//console.log(path[index] + "?term=" + term + "&department=" + department + "&number=" + num);
		return $.ajax({
			dataType: 'jsonp',
			url: path[index] + "?term=" + term + "&department=" + department + "&number=" + num,
			success: success,
			error: error
		});
	};

	var courseDetailReq = function (path, term, department, num, section, index, success, error) {
		console.log(path[index] + "?term=" + term + "&department=" + department + "&number=" + num + "&section=" + section);
		return $.ajax({
			dataType: 'jsonp',
			url: path[index] + "?term=" + term + "&department=" + department + "&number=" + num + "&section=" + section,
			success: success,
			error: error
		});
	};

	var courseOutlineReq = function (path, success, year, term, dept, number, section) {
		//?year=2015&term=spring&dept=cmpt&number=120&section=d100
		console.log(path[0] + "?year=" + year + "&term=" + term + "&dept=" + dept + "&number=" + number + "&section=" + section)
		return $$.ajax({
			dataType: 'jsonp',
			url: path[0] + "?year=" + year + "&term=" + term + "&dept=" + dept + "&number=" + number + "&section=" + section,
			success: success
		});
	};

	var libraryNewsReq = function (path, news_id, index, success, error) {
		//console.log("dsafasd " + path[index] + news_id);
		return $.ajax({
			dataType: 'jsonp',
			url: path[index] + news_id,
			success: success,
			error: error
		});
	};

	var jsonReq = function (path, index, success, error, retry) {
		return $.ajax({
			dataType: 'json',
			url: path[index],
			success: success,
			error: error
		});
	}


	var jsonpReq = function (path, index, success, error, retry) {
		return $.ajax({
			dataType: 'jsonp',
			url: path[index],
			success: success,
			error: error
		});
	}

	var userBooksReq = function (path, index, userID, success, error, retry) {
		console.log(path[index]);
		retry = retry || 0;
		$$.ajax({
			url: path[index],
			method: "POST",
			data: "userID=" + userID,
			success: function(success, error){
				return httpReq(userBooksJsonURL, 0, success, error);
			},
			error: function (xhr) {
				console.log("error");
/*				if (retry < path.length - 1) {
					httpReq(path, success, error, retry += 1);
				} else {
					error(xhr);
				}*/
			}
		});
	};



	/**
	* Description:	interface defined	  
	*
	* Author   :	Alex
	*
	* Comments   :	none
	* 
	**/
	var hnapi = {

		deleteBook: function (success, error, BID){
			return deleteBookReq(deleteBookURL, BID, 0, success, error);
		},

		deleteTutor: function (success, error, TID){
			return deleteTutorReq(deleteTutorURL, TID, 0, success, error);
		},

		checkUser: function (success, error, username){
			return checkUserReq(checkUserURL, username, 0, success, error);
		},
			
		connectEdSignup: function (success, error, username, studentID, studentName) {
			return signupReq(connectEdSignupURL, username, studentID, studentName, 0, success, error);
		},

		sfuLogin: function (success, error, username, password) {
			return loginReq(sfuLoginURL, username, password, 0, success, error);
		},

		// CourseSearch request
		getDepartmentList: function (success, error, term) {
			return depatmentReq(sfuDepartmentURL, term, 0, success, error);
		},

		// CourseSearch request
		getCourseSearchList: function (success, error, term, department, num, writing, quantitative, bSci, bSoc, bHum, page) {
			return courseSearchReq(courseSearchListURL, term, department, num, writing, quantitative, bSci, bSoc, bHum, page, 0, success, error);
		},

		// get course section list
		getCourseSectionList: function (success, error, term, department, num) {
			return courseSectionReq(courseSectionURL, term, department, num, 0, success, error);
		},

		// get course section list
		getCourseDetail: function (success, error, term, department, num, section) {
			return courseDetailReq(courseDetailURL, term, department, num, section, 0, success, error);
		},

		// get course section list
		getCourseOutline: function (success, year, term, dept, number, section) {
			return courseOutlineReq(courseOutlineURL, success, year, term, dept, number, section);
		},

		// prof request
		getProfList: function (success, error) {
			return httpReq(profListURL, 0, success, error);
		},

		// program request
		getProgramList: function (success, error) {
			return httpReq(programListURL, 0, success, error);
		},

		// program request
		getCourseScheduleList: function (success, error) {
			return jsonReq(courseScheduleListURL, 0, success, error);
		},

		// SFU news request
		getRandomnNews: function (success, error) {
			return jsonpReq(newsRandomURL, 0, success, error);
		},

		getLibraryNews: function (success, error, news_id) {
			return libraryNewsReq(newsLibraryURL, news_id, 0, success, error);
		},
		
		getTansitSchedule: function (success, error, stationID) {
			return transitReq(transitURL, 0, stationID, success, error);
		},
		
		getUserBookList: function (success, error, userID) {
			return userBooksReq(userBooksURL, 0, userID, success, error);
		}
	};

	window.hnapi = hnapi;

})(Dom7);

