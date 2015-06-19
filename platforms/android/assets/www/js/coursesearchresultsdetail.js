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
function courseSearchResultsDetail() {
	this.courseDetail = [];
	this.m_section = "";
	this.m_term = "",
	this.m_department = "" ,
	this.m_courseNum = ""
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
courseSearchResultsDetail.prototype.init = function (page) {
	// initial fuctions 
	console.log("yaduo courseSearchResultsDetail init");
	this.m_term = page.query.term;
	this.m_department = page.query.courseName;
	this.m_courseNum = page.query.courseNum;
	this.m_section = page.query.section;
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
courseSearchResultsDetail.prototype.update = function (page) {
	console.log("yaduo courseSearchResultsDetail update");
	var results;
	sfuExplorer.showPreloader('Loading Course Detail Info: <span class="preloader-progress">0</span> %');
	hnapi.getCourseDetail(function (detailData) {
		if (detailData.schedules) {
			detailData.schedules.forEach(function (obj_schedule, index) {
				// formate days
				var days = "";
				var daysList = [];
				daysList = obj_schedule.days.split("");
				daysList.forEach(function (obj_days) {
					day = g_courseSchedule.formatWeekday(obj_days);
					days = days + " " + day;
				});
				detailData.schedules[index].days = days;
				// formate satrting ending date
			});
		}
		results = detailData;
		console.log(JSON.stringify(results));
		sfuExplorer.hidePreloader();


		/*
		$$('.preloader-progress').text(Math.floor(++counter / data.length * 100));
		if (counter == data.length) {
			//console.log(JSON.stringify(results));
			g_courseDetail.updateCourseDiv(results),
			// PTR Done
			sfuExplorer.pullToRefreshDone();
		}
		*/
	},
		function (error) {
    		sfuExplorer.hidePreloader();
    		alertMsg.render('Failed to load course details','OK')
			console.log(error);
		},
		g_courseSearchResultsDetail.m_term,
		g_courseSearchResultsDetail.m_department,
		g_courseSearchResultsDetail.m_courseNum,
		g_courseSearchResultsDetail.m_section
	);
	

}


