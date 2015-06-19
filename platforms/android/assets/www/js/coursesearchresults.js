///////////////////////////////////////////////////////////////////////////////
//
//  Copyright 2013~2014 (C) Evilnut.  All rights reserved.
//
//  Latest Update Date: 2014-10-02
//
////////////////////////////////////////////////////////////////////////////////

/**
* Class	: campusStatus 
*
* Description:	campus Status page Class		
*
* member variables   :	[bool] m_isCampusClosed  
*
* Author   :	Luke
*
* Comments   :	none
* 
**/
function courseSearchResults() {
	// member varables
	this.m_term = "",
	this.m_department = "",
	this.m_courseNum = ""
	this.m_coursesList = [];
	this.m_coursesCount = 0;

	// jqPagination variables
	this.m_page = 1;
	this.m_allCoursesLoaded = false;
	this.m_lastPage = "";
	this.m_maxCoursesCount = "";
}

courseSearchResults.prototype.clearLastSearchResult = function () {
	this.m_coursesList = [];
	this.m_courseNum = "";
}

/**
* Function   :	init
*
* Description:	campusStatus Page init 		
*
* Author   :	Luke
*
* Arguments  :	none
* 
* Returns:   :	none
*
* Comments   :	none
* 
**/
courseSearchResults.prototype.init = function () {
	// initial fuctions 
	console.log("yaduo courseSearchResults init");
}


/**
* Function   :	update
*
* Description:	campusStatus Page Update 		
*
* Author   :	Luke
*
* Arguments  :	none
* 
* Returns:   :	none
*
* Comments   :	none
* 
**/
courseSearchResults.prototype.update = function (refresh) {
	console.log("yaduo courseSearchResults update");
	this.getCoursesList(refresh);
}


/**
* Function   :	getProfsList
*
* Description:	Fetch prof list		
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
courseSearchResults.prototype.getCoursesList = function (refresh) {
	var results = refresh ? [] : g_courseSearchResults.m_coursesList;
	if (results.length === 0) {
		sfuExplorer.showPreloader('Searching Courses: <span class="preloader-progress">0</span> %');
		hnapi.getCourseSearchList(function (data) {
			data = JSON.parse(data);
			data.forEach(function (obj, index) {
				obj["department"] = g_courseSearch.m_department;
				obj["termCode"] = g_courseSearch.m_term;
				obj["termStr"] = g_courseSearchResults.decodeTerm(g_courseSearch.m_term);
				results[index] = obj;
				$$('.preloader-progress').text(Math.floor(index / data.length * 100));
			});
			//console.log(JSON.stringify(results));
			// Clear searchbar
			$$('.searchbar-input input')[0].value = '';

			// Update local storage data
			g_courseSearchResults.m_coursesList = results;

// console.log(g_courseSearchResults.m_coursesList);			
// console.log(g_courseSearchResults.m_page);
			g_courseSearchResults.m_coursesCount = data.length;
			//show and update program list
			g_courseSearchResults.updateCoursesListWithPage();
			// PTR Done
			sfuExplorer.hidePreloader();
			sfuExplorer.pullToRefreshDone();

			},
			function (error) {
            	sfuExplorer.hidePreloader();
            	alertMsg.render('Failed to load courses','OK')
				console.log(error);
			},
					// searching parameters
			g_courseSearch.m_term,
			g_courseSearch.m_department,
			g_courseSearch.m_courseNum,
			g_courseSearch.m_writing,
			g_courseSearch.m_quantitative,
			g_courseSearch.m_bSci,
			g_courseSearch.m_bSoc,
			g_courseSearch.m_bHum,
			g_courseSearchResults.m_page

		);
	}
	else {
	
		console.log("getCoursesList else block");
		/* jqPagination - re-enter the same searchResult page, check the courseList length 
		against maxlength and set allCoursesLoaded accordingly. to prevent calling php script */
		if(g_courseSearchResults.m_coursesCount == g_courseSearchResults.m_maxCoursesCount){
			g_courseSearchResults.m_allCoursesLoaded = true;
		}
		

		// Update T7 data and render home page profs
		g_courseSearchResults.updateCoursesListWithPage();


	}
	return results;
}

/**
* Function   :	updateProfsList
*
* Description:	update Profs Listview		
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
courseSearchResults.prototype.updateCoursesList = function () {
	data = this.m_coursesList;
	sfuExplorer.template7Data.courses = data
	var tempHTML = Template7.templates.coursesListScript(data);
	//sfuExplorer.template7Data.programs = this.m_coursesList
	//var tempHTML = Template7.templates.coursesListScript(this.m_coursesList);
	$$('.page[data-page="courseSearchResults"] .page-content .list-block').html(tempHTML);
	g_stringHelper.updateUI();
}

/**
* Function   :	updateProfsList
*
* Description:	update Profs Listview		
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
courseSearchResults.prototype.decodeTerm = function (termCode) {
	var termStr;
	if (termCode == "1141") {
		termStr = "2014 Spring";
	} else if(termCode == "1144") {
		termStr = "2014 Summer";
	} else if(termCode == "1147") {
		termStr = "2014 Fall";
	} else if(termCode == "1151") {
		termStr = "2015 Spring";
	} else if(termCode == "1154") {
		termStr = "2015 Summer";
	} else if(termCode == "1157") {
		termStr = "2015 Fall";
	} else if(termCode == "1161") {
		termStr = "2016 Spring";
	} else if(termCode == "1164") {
		termStr = "2016 Summer";
	} else if(termCode == "1167") {
		termStr = "2016 Fall";
	} else {
		termStr = "unknown";
	}
	return termStr;
}

/* jqPagination - display the numCoursePerPage on each page requested only */
courseSearchResults.prototype.updateCoursesListWithPage = function () {

	var endIndex = g_courseSearchResults.m_page*numCoursePerPage;
	var startIndex = endIndex-numCoursePerPage;
	console.log("startIndex: "+startIndex+"endIndex: "+endIndex);
	data = g_courseSearchResults.m_coursesList.slice(startIndex, endIndex);

	/* this is the last page, set flag = true to prevent calling php script again */
	if(data.length < numCoursePerPage){
		g_courseSearchResults.m_allCoursesLoaded = true;
		g_courseSearchResults.m_lastPage = g_courseSearchResults.m_page;
		g_courseSearchResults.m_maxCoursesCount = g_courseSearchResults.m_coursesCount;
		console.log("last page: "+g_courseSearchResults.m_lastPage);

		/* disable the next button if we are on the last page */
		$(".pagination").find('.next').addClass('disabled');
		console.log("data.length <"+numCoursePerPage);
	}
	console.log(data);


	sfuExplorer.template7Data.courses = data;
	var tempHTML = Template7.templates.coursesListScript(data);
	//sfuExplorer.template7Data.programs = this.m_coursesList
	//var tempHTML = Template7.templates.coursesListScript(this.m_coursesList);
	$$('.page[data-page="courseSearchResults"] .page-content .list-block').html(tempHTML);
	g_stringHelper.updateUI();
}
