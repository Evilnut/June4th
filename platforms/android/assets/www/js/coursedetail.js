///////////////////////////////////////////////////////////////////////////////
//
//  Copyright 2013~2014 (C) Evilnut.  All rights reserved.
//
//  Latest Update Date: 2014-10-02
//
////////////////////////////////////////////////////////////////////////////////


/**
* Class	: courseSearch 
*
* Description:	courseSearch Page Class		
*
* member variables   :	
*
* Author   :	Alex
*
* Comments   :	none
* 
**/
function courseDetail() {
	this.courseDetail = [];
	this.m_sectionList = [];
	this.m_termCode = "";
	this.m_year = "";
	this.m_term = "";
	this.m_department = "";
	this.m_courseNum = "";
	this.m_isCourseOutlinApi = false;
}

/**
* Function   :	init
*
* Description:	courseSearch Page init 		
*
* Author   :	Alex
*
* Arguments  :	none
* 
* Returns:   :	none
*
* Comments   :	none
* 
**/
courseDetail.prototype.init = function (page) {
	// initial fuctions 
	console.log("yaduo courseDetail init");
}

/**
* Function   :	update
*
* Description:	courseSearch Page Update 		
*
* Author   :	Alex
*
* Arguments  :	none
* 
* Returns:   :	none
*
* Comments   :	none
* 
**/
courseDetail.prototype.update = function (page) {
	
	this.m_termCode = g_courseSearch.m_term;
	this.m_year = this.getYear(g_courseSearch.m_term);
	this.m_term = this.getTerm(g_courseSearch.m_term),
	this.m_department = g_courseSearch.m_department;
	this.m_courseNum = page.query.course;	
	this.m_isCourseOutlinApi = this.isCourseOutlinApi(this.m_year, this.m_term);
	console.log("this.m_isCourseOutlinApi " + this.m_isCourseOutlinApi);

	var results = [];
	var counter = 0;

	//-----------------temproray comment this area to change the following code
	
	/*sfuExplorer.showPreloader('Loading Course Detail Info: <span class="preloader-progress">0</span> %');
	hnapi.getCourseSectionList(function (data) {
		//data = JSON.parse(data);
		data.forEach(function (obj, index) {
			if (g_courseDetail.m_isCourseOutlinApi) {
				hnapi.getCourseOutline(function (detailData) {
					detailData = JSON.parse(detailData);
					//console.log(JSON.stringify(detailData))
					results[index] = detailData;
					$$('.preloader-progress').text(Math.floor(++counter / data.length * 100));
					if (counter == data.length) {
						//console.log(JSON.stringify(results));
						g_courseDetail.updateCurrentCourseDiv(results);
						// PTR Done
						sfuExplorer.hidePreloader();
						sfuExplorer.pullToRefreshDone();
					}
				},
				(g_courseDetail.m_year).toLowerCase(),
				(g_courseDetail.m_term).toLowerCase(),
				(g_courseDetail.m_department).toLowerCase(),
				(g_courseDetail.m_courseNum).toLowerCase(),
				obj.toLowerCase());
			}
			else {
				hnapi.getCourseDetail(function (detailData) {
					console.log(JSON.stringify(detailData));
					if (detailData.schedules){
						detailData.schedules.forEach(function (obj_schedule, index) {
							// formate days
							if (obj_schedule.days) {
								var days = "";
								var daysList = [];
								daysList = obj_schedule.days.split("");
								daysList.forEach(function (obj_days) {
									day = g_courseSchedule.formatWeekday(obj_days);
									days = days + " " + day;
								});
								detailData.schedules[index].days = days;
							}
						});
					}
					results[index] = detailData;
					$$('.preloader-progress').text(Math.floor(++counter / data.length * 100));
					if (counter == data.length) {
						//console.log(JSON.stringify(results));
						g_courseDetail.updateCourseDiv(results);
						// PTR Done
						sfuExplorer.hidePreloader();
						sfuExplorer.pullToRefreshDone();
					}
					},
					function (error) {
						console.log(error);
					},
					g_courseDetail.m_termCode,
					g_courseDetail.m_department,
					g_courseDetail.m_courseNum,
					obj
				);
			}
		});
	},*/
	
	
	
//------------my code area -------------
	sfuExplorer.showPreloader('Loading Course Detail: <span class="preloader-progress">0</span> %');
	hnapi.getCourseSectionList(function (data) {
            //data = JSON.parse(data);

            if(data.length == 0){

                setTimeout(terminate, 6000);

                function terminate(){
                    alertMsg.render("Network is slow or the course is not available, please try again later.","OK");
                    sfuExplorer.hidePreloader();
                }


            }else {


                data.forEach(function (obj, index) {
                    if (g_courseDetail.m_isCourseOutlinApi) {
                        hnapi.getCourseOutline(function (detailData) {
                                detailData = JSON.parse(detailData);
                                //console.log(JSON.stringify(detailData))
                                results[index] = detailData;
                                $$('.preloader-progress').text(Math.floor(++counter / data.length * 100));
                                if (counter == data.length) {
                                    //console.log(JSON.stringify(results));
                                    // PTR Done
                                    sfuExplorer.hidePreloader();
                                    sfuExplorer.pullToRefreshDone();
                                }
                            },

                            (g_courseDetail.m_year).toLowerCase(),
                            (g_courseDetail.m_term).toLowerCase(),
                            (g_courseDetail.m_department).toLowerCase(),
                            (g_courseDetail.m_courseNum).toLowerCase(),
                            obj.toLowerCase());
                    }
                    else {
                        hnapi.getCourseDetail(function (detailData) {
                                console.log(JSON.stringify(detailData));
                                if (detailData.schedules) {
                                    detailData.schedules.forEach(function (obj_schedule, index) {
                                        // formate days
                                        if (obj_schedule.days) {
                                            var days = "";
                                            var daysList = [];
                                            daysList = obj_schedule.days.split("");
                                            daysList.forEach(function (obj_days) {
                                                day = g_courseSchedule.formatWeekday(obj_days);
                                                days = days + " " + day;
                                            });
                                            detailData.schedules[index].days = days;
                                        }
                                    });
                                }

                                results[index] = detailData;
                                $$('.preloader-progress').text(Math.floor(++counter / data.length * 100));
                                if (counter == data.length) {
                                    //console.log(JSON.stringify(results));
                                    g_courseDetail.updateCourseDiv(results);
                                    // PTR Done
                                    sfuExplorer.hidePreloader();
                                    sfuExplorer.pullToRefreshDone();
                                }
                            },
                            function (error) {
                                console.log(error);
                            },
                            g_courseDetail.m_termCode,
                            g_courseDetail.m_department,
                            g_courseDetail.m_courseNum,
                            obj
                        );
                    }
                });
            }
        },
	
//--------------------------------
	
	
	
	
	
		function (error) {
			console.log(error);
		},
		// searching parameters
		g_courseDetail.m_termCode,
		g_courseDetail.m_department,
		g_courseDetail.m_courseNum
	);

}

courseDetail.prototype.updateCurrentCourseDiv = function (results) {
	//var tempHTML = Template7.templates.courseDetailScript(results);
	var courseData = results;
	//console.log(JSON.stringify(results));
	var tempHTML = "";
	tempHTML += "<div class='list-block media-list' style='display: block;'>" +
					"<ul class='time-line-content'>"
	for (var i = 0; i < courseData.length; i++) {
		//console.log(i);
		//course info
		var courseInfo = courseData[i].info ? courseData[i].info : null;
		var courseName = courseInfo != null ? courseInfo.name : "";
		var courseTitle = courseInfo !== "" ? courseInfo.title : "";

		tempHTML += "<li class='item-content card-content' data-id='41'>" +
						"<div class='item-inner'>" +
							"<div class='item-header'>" +
								"<div class='avatar'>" +
									"<img src='img/coursesearch/bookshelf.png' data-avatarid='01'>" +
								"</div>" +
								"<div class='detail'>" +
									"<p class='nickname'>" + courseName + "</p>" +
									"<p class='create-time'>" + courseTitle + "</p>" +
								"</div>" +
							"</div>";


		tempHTML += "<div class='list-block'>" +
						"<div class='list-group'>" +
							"<ul>";
		var instructor = courseData[i].instructor ? courseData[i].instructor : null;

		if (instructor != null) {
		for (var k = 0; k < instructor.length; k++) {
			var profName = instructor[k] != null ? instructor[k].name : "No Data";
			var profOffice = instructor[k] != null ? instructor[k].office : "No Data";
			var officeHours = instructor[k] != null ? instructor[k].officeHours : "No Data";



		// tempHTML +='<div class="list-group">'+
  //   '<ul>'+
  //     '<li class="list-group-title">Professor</li>'+
  //     '<li class="item-content">'+
  //       '<div class="item-media"><i class="icon icon-f7"></i></div>'+
  //       '<div class="item-inner">'+
  //         '<div class="item-title">Name</div>'+
  //         '<div class="item-after">'+profName+'</div>'+
  //       '</div>'+
  //     '</li>'+
  //     '<li class="item-content">'+
  //       '<div class="item-media"><i class="icon icon-f7"></i></div>'+
  //       '<div class="item-inner">'+
  //         '<div class="item-title">Office:</div>'+
  //         '<div class="item-after">'+profOffice+'</div>'+
  //       '</div>'+
  //     '</li>'+
  //     '<li class="item-content">'+
  //       '<div class="item-media"><i class="icon icon-f7"></i></div>'+
  //       '<div class="item-inner">'+
  //         '<div class="item-title">Office Hours:</div>'+
  //         '<div class="item-after">'+officeHours+'</div>'+
  //       '</div>'+
  //     '</li>'+ 
  //   '</ul>'+
  // '</div>';





			tempHTML += "<li class='item-content' style='background-color:#acd8fa'>" +
							"<div class='item-inner'>" +
									"<div class='item-title' style='padding-left:10px;color:white'>Name: </div>" +
									"<div class='item-title' style='padding-left:10px;color:white'>" + profName +"</div>" +
							"</div>" +
						"</li>" +
						"<li class='item-content' style='background-color:#acb1fa'>" +

							"<div class='item-inner'>" +
									"<div class='item-title' style='padding-left:10px;color:white'>Office: </div>" +
									"<div class='item-title' style='padding-left:10px;color:white'>" + profOffice + "</div>" +
							"</div>" +
						"</li>"+
						"<li class='item-content' style='background-color:#faacd8'>" +

							"<div class='item-inner'>" +
									"<div class='item-title' style='padding-left:10px;color:white'>Office Hours: </div>" +
									"<div class='item-title' style='padding-left:10px;color:white'>" + officeHours + "</div>" +
							"</div>" +
						"</li>";

			}
		} else {
			tempHTML += "<li class='item-content' style='background-color:#f9949b'>" +
							"<div class='item-inner'>" +
									"<div class='item-title' style='padding-left:10px;color:white'>No Instructor Information</div>" +
							"</div>" +
						"</li>";
		}


		tempHTML += "</ul></div></div>";

		tempHTML += "<div style='margin-left:10px'>Class Schedule</div>" +
					"<table class='bordered' style='margin: 10px 0 10px;'>" +
						"<thead>" +
							"<tr>" +
								"<th><span class='strDays'></span></th>" +
								"<th><span class='strLocation'></span></th>" +
								"<th><span class='strTime'></span></th>" +
								"<th><span class='strType'></span></th>" +
							"</tr>" +
						"</thead>";
		//course Schedule
		var courseSchedule = courseData[i].courseSchedule ? courseData[i].courseSchedule : null;
		for (var j = 0; j < courseSchedule.length; j++) {
			var courseDays = courseSchedule[j] != null ? courseSchedule[j].days : "No Data";
			var courseLocation = courseSchedule[j] != null ? courseSchedule[j].buildingCode + " " + courseSchedule[j].roomNumber : "No Data";
			var courseTime = courseSchedule[j] != null ? courseSchedule[j].startTime + " - " + courseSchedule[j].endTime : "No Data";
			var courseType = courseSchedule[j] != null ? courseSchedule[j].sectionCode : "No Data";
			tempHTML += "<tr>" +
							"<td>" + courseDays + "</td>" +
							"<td>" + courseLocation + "</td>" +
							"<td>" + courseTime + "</td>" +
							"<td>" + courseType + "</td>" +
						"</tr>";
		}
		tempHTML += "</table>" +
				"</div>" +
			"</li>"
	}
	tempHTML += "</ul></div>";
	$$('.page[data-page="courseDetail"] .page-content .list-block').html(tempHTML);
	g_stringHelper.updateUI();
}

courseDetail.prototype.updateCourseDiv = function (results) {
	//var tempHTML = Template7.templates.courseDetailScript(results);
	var tempHTML = "";
	var courseData = results;
	tempHTML += "<div class='list-block media-list' style='display: block;'>"+
						"<ul class='time-line-content'>"
	for (var i = 0; i < courseData.length; i++) {
		//var dataInfo = courseData[i].schedules;
		var schedules = courseData[i].schedules;
		tempHTML += "<li class='item-content card-content' data-id='41'>" +
						"<div class='item-inner'>" +
							"<div class='item-header'>" +
								"<div class='avatar'>" +
									"<img src='img/coursesearch/bookshelf.png' data-avatarid='01'>" +
								"</div>" +
								"<div class='detail'>" +
									"<p class='nickname'>" + courseData[i].name + " " + courseData[i].number + " " + courseData[i].section + " " + courseData[i].sectionCode + "</p>" +
									"<p class='create-time'>" + courseData[i].title + "</p>" +
								"</div>" +
							"</div>"; 
		if (schedules != null) {
		tempHTML	+="<table class='bordered' >" +
								"<thead>" +
									"<tr>" +
										"<th><span class='strDays'></span></th>" +
										"<th><span class='strLocation'></span></th>" +
										"<th><span class='strTime'></span></th>" +
										"<th><span class='strType'></span></th>" +
									"</tr>" +
								"</thead>";
		
		for (var j = 0; j < schedules.length; j++) {
			var isExam = "";
			if (schedules[j].exam == true)
				isExam = "Exam";
			else
				isExam = "LEC";
			tempHTML += "<tr>" +
							"<td>" + schedules[j].days + "</td>" +
							"<td>" + schedules[j].buildingCode + " " + schedules[j].roomNumber + "</td>" +
							"<td><div><span class='strStart'></span>" + schedules[j].startTime + "</div><div><span class='strEnd'></span>" + schedules[j].endTime + "</div></td>" +
							"<td>" + isExam + "</td>" +
						"</tr>";
		}
		
		tempHTML +=			"</table>" + 
						"</div>" +
					"</li>"
		} else {
			tempHTML += "<divclass='item-inner'><div class='item-header'>No Schedules</div></div>"
		}


	}
	tempHTML += "</ul></div>";
	$$('.page[data-page="courseDetail"] .page-content .list-block').html(tempHTML);
	g_stringHelper.updateUI();
}

courseDetail.prototype.getYear = function (termCode) {
	var decode = termCode.substring(1, 3);
	if(termCode != null)
		return "20" + decode
}

courseDetail.prototype.getTerm = function (termCode) {
	var decode = termCode.substring(3, 4);
	if (decode == "1") 
		return "spring";
	else if (decode == "4") 
		return "summer";
	else if (decode == "7")
		return "fall";
}

courseDetail.prototype.isCourseOutlinApi = function (year, term) {
	/*
	var searchMonth;
	if (term == "spring")
		searchMonth = 1
	else if (term == "summer")
		searchMonth = 5
	else if (term == "fall")
		searchMonth = 9;
	else 
		searchMonth = 0;

	var searchDay = new Date();
	searchDay.setFullYear(year);
	searchDay.setMonth(searchMonth);
	var currentDay = new Date();

	var diff = (searchDay - currentDay) / (60 * 60 * 1000);
	console.log(diff);

	return false;
	*/
	var isYear = false;
	var isTerm = false;
	//compare
	var currentDay = new Date();
	isYear = (currentDay.getFullYear() == year);
	if ((currentDay.getMonth() + 1 > 0) && (currentDay.getMonth() + 1 <= 4))
		isTerm = ("spring" == term);
	else if ((currentDay.getMonth() + 1 > 4) && (currentDay.getMonth() + 1 <= 8))
		isTerm = ("summer" == term);
	else
		isTerm = ("fall" == term);
	// return
	if (isYear && isTerm)
		return true;
	else
		return false
	
}