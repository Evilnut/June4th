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
function courseSearch() {
	// member varables
	//this.m_isCampusClosed = false;
	this.m_termList = [];
	this.m_departmentList = [];

	// search attribute
	this.m_term = "";
	this.m_department = "";
	this.m_courseNum = "";
	this.m_writing = 0;
	this.m_quantitative = 0;
	this.m_bSci = 0;
	this.m_bSoc = 0;
	this.m_bHum = 0;

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
courseSearch.prototype.init = function () {
	// initial fuctions
	console.log("yaduo g_courseSchedule init");

	/** events Listener **/
	// selector Listener
	$('#semesterSelect').change(function () {
		g_courseSearch.m_term = $(this).val();
		g_courseSearch.getDepartmentList(true);
		// clear the course list
		g_courseSearchResults.clearLastSearchResult();
	});

	// selector Listener
	$('#subjectSelect').change(function () {
		// clear the course list
		g_courseSearchResults.clearLastSearchResult();
	});

	// input keyup Listener
	$("#courseNumInput").keyup(function () {
		g_courseSearchResults.clearLastSearchResult();
	});

	// go and set searching parameters
	$$('#courseSearchBtn').on('click', function () {
		// set the searching parameters
		g_courseSearch.m_term = $$('#semesterSelect').val();
		g_courseSearch.m_department = $$('#subjectSelect').val();
		g_courseSearch.m_courseNum = $$('#courseNumInput').val();
		g_courseSearch.m_writing = $("input.writing:checkbox").prop("checked") ? 1 : 0;
		g_courseSearch.m_quantitative = $("input.quantitative:checkbox").prop("checked") ? 1 : 0;
		g_courseSearch.m_bSci = $("input.bSci:checkbox").prop("checked") ? 1 : 0;
		g_courseSearch.m_bSoc = $("input.bSoc:checkbox").prop("checked") ? 1 : 0;
		g_courseSearch.m_bHum = $("input.bHum:checkbox").prop("checked") ? 1 : 0;
	});
	/** events Listener end **/
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
courseSearch.prototype.update = function (refresh) {
	//this.getTermList();
	this.getDepartmentList(refresh);

	// update the searching parameters on UI
	if (this.m_term)
		$('#semesterSelect').find("option[value='" + this.m_term + "']").attr("selected", true);
	if (this.m_department)
		$('#subjectSelect').find("option[value='" + this.m_department + "']").attr("selected", true);
	if (this.m_courseNum)
		$('#courseNumInput').val(this.m_courseNum);
	if (this.m_writing) {
		$("input[name='wqb-checkbox'].writing").attr('checked', true);
	}
	if (this.m_quantitative) {
		$("input[name='wqb-checkbox'].quantitative").attr('checked', true);
	}
	if (this.m_bSci) {
		$("input[name='wqb-checkbox'].bSci").attr('checked', true);
	}
	if (this.m_bSoc) {
		$("input[name='wqb-checkbox'].bSoc").attr('checked', true);
	}
	if (this.m_bHum) {
		$("input[name='wqb-checkbox'].bHum").attr('checked', true);
	}

}

courseSearch.prototype.clearSearchParameter = function (refresh) {
	this.m_term = "";
	this.m_department = "";
	this.m_courseNum = "";
	this.m_bSci = 0;
	this.m_bSoc = 0;
	this.m_bHum = 0;
	this.m_writing = 0;
	this.m_quantitative = 0;
}


courseSearch.prototype.getDepartmentList = function (refresh) {
	var results = refresh ? [] : g_courseSearch.m_departmentList;
	if (results.length === 0) {
		// argument : g_courseSearch.m_term
		// get Department List depands on term code
		hnapi.getDepartmentList(function (data) {
			results = data;
			// update private members
			g_courseSearch.m_departmentList = results;
			// update UI
			g_courseSearch.updateDepartmentList();
		}, function (error) { console.log(error); }, g_courseSearch.m_term);
	}
	else {
		// Update T7 data and render home page profs
		g_courseSearch.updateDepartmentList();
	}
	return results;
}

courseSearch.prototype.updateDepartmentList = function () {
	var lst = this.m_departmentList;
	$('#subjectSelect').empty();
	$.each(lst, function(key, val) {
		$$('#subjectSelect').append("<option value='" + val + "'>" + val + "</option>");
	});
}
