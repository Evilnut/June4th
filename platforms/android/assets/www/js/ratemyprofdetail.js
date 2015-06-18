///////////////////////////////////////////////////////////////////////////////
//
//  Copyright 2013~2014 (C) Evilnut.  All rights reserved.
//
//  Latest Update Date: 2014-10-02
//
////////////////////////////////////////////////////////////////////////////////

/**
* Class	: rateMyprof 
*
* Description:	index Page Class		
*
* member variables   :	[bool] m_isCampusClosed  
*
* Author   :	Alex
*
* Comments   :	none
* 
**/
function rateMyprofDetail() {
	// member varables
	this.m_data = [];
}

/**
* Function   :	init
*
* Description:	rateMyprof Page init 		
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
rateMyprofDetail.prototype.init = function (page) {
	// initial fuctions 
	this.m_data = sfuExplorer.template7Data.profs[page.query.id - 1];
}


/**
* Function   :	init
*
* Description:	rateMyprof Page init 		
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
rateMyprofDetail.prototype.update = function (refresh) {
	//this.getProfsList(refresh);
	console.log(JSON.stringify(this.m_data));
	this.updateLike(this.m_data.like, this.m_data.dislike);
	this.updateAssigment(this.m_data.assignment_load);
	this.updateExam(this.m_data.exam_difficulty);
	this.updateNotes(this.m_data.note);
	this.updateAttendency(this.m_data.attendency);
	this.updateTut(this.m_data.tutorial);
	this.updateCurve(this.m_data.curve);
	this.addLike();
	this.addDislike();
	//this.m_data. 
}

rateMyprofDetail.prototype.updateLike = function (like, dislike) {
	var percentage = parseInt(like) * 100 / (parseInt(like) + parseInt(dislike)) + "%";
	var percentage2 = parseInt(dislike) * 100 / (parseInt(like) + parseInt(dislike)) + "%";
	$$("#like-progress").css("width", percentage)
	$$("#dislike-progress").css("width", percentage2)
}

rateMyprofDetail.prototype.updateAssigment = function (assn) {
	var temp = parseInt(assn) * 100 / 5;
	var percentage = temp + "%";
	if (temp <= 30) {
		$$("#assn").attr("src", "img/1.png");
	} else if (temp >= 70) {
		$$("#assn").attr("src", "img/3.jpg");
	} else {
		$$("#assn").attr("src", "img/2.jpg");
	}
}

rateMyprofDetail.prototype.updateExam = function (exam) {
	var temp = parseInt(exam) * 100 / 5;
	var percentage = temp + "%";
	if (temp <= 30) {
		$$("#exam").attr("src", "img/1.png");
	} else if (temp >= 70) {
		$$("#exam").attr("src", "img/3.jpg");
	} else {
		$$("#exam").attr("src", "img/2.jpg");
	}
}

rateMyprofDetail.prototype.updateNotes = function (notes) {
	var temp = parseInt(notes) * 100 / 5;
	var percentage = temp + "%";
	if (temp <= 30) {
		$$("#note").attr("src", "img/1.png");
	} else if (temp >= 70) {
		$$("#note").attr("src", "img/3.jpg");
	} else {
		$$("#note").attr("src", "img/2.jpg");
	}
}

rateMyprofDetail.prototype.updateAttendency = function (attendency) {
	var temp = parseInt(attendency) * 100 / 5;
	var percentage = temp + "%";
	if (temp <= 50) {
		$$("#lec-atten").attr("src", "img/check.png");
	} else {
		$$("#lec-atten").attr("src", "img/cross.png");
	}
}

rateMyprofDetail.prototype.updateCurve = function (curve) {
	var temp = parseInt(curve) * 100 / 5;
	var percentage = temp + "%";
	if (temp <= 50) {
		$$("#curve").attr("src", "img/cross.png");
	} else {
		$$("#curve").attr("src", "img/check.png");
	}
}

rateMyprofDetail.prototype.updateTut = function (tutorial) {
	if (tutorial == "no") {
		$$("#tut-atten").attr("src", "img/cross.png");
	} else {
		$$("#tut-atten").attr("src", "img/check.png");
	}
}

rateMyprofDetail.prototype.addLike = function () {
	$("#add-like").one("click", function () {
		alertMsg.render("You can rate one professor once only.","OK");
	});
}

rateMyprofDetail.prototype.addDislike = function () {
	$("#add-dislike").one("click", function () {
		alertMsg.render("You can rate one professor once only.","OK");
	});
}