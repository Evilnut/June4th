///////////////////////////////////////////////////////////////////////////////
//
//  Copyright 2013~2014 (C) Evilnut.  All rights reserved.
//
//  Latest Update Date: 2014-10-02
//
////////////////////////////////////////////////////////////////////////////////

// HTML content
var tableHeader = "";
var tableContent = "";

// ��ȡ����
var currentDay = new Date();
var cuYear = currentDay.getFullYear();
var cuMonth = currentDay.getMonth() + 1;
var cuDate = currentDay.getDate();
var currentDate = cuYear + '' + cuMonth + '' + cuDate;

//�ֱ����12����
function montharr(m0, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11) {
	this[0] = m0;//�����������   
	this[1] = m1;
	this[2] = m2;
	this[3] = m3;
	this[4] = m4;
	this[5] = m5;
	this[6] = m6;
	this[7] = m7;
	this[8] = m8;
	this[9] = m9;
	this[10] = m10;
	this[11] = m11;
}

var courseColorList = ["#f39c12", "#3498db", "#1abc9c", "#95a5a6", "#27ae60", "#2ecc71", "#9b59b6", "#e67e22", "#e74c3c", "#c0392b", "#f1c40f"];

/**
* Class	: courseSchedule
*
* Description:	courseSchedule Page Class
*
* member variables   :	[bool] m_isCampusClosed
*
* Author   :	Alex
*
* Comments   :	none
*
**/
function courseSchedule() {
	// member varables
	this.m_coursesDetailList = [];
	this.m_coursesList = [];
	this.m_coursesCount = 0;
	this.m_currentDate = "0";
	this.m_termCode = "0";
}

courseSchedule.prototype.changeContent = function () {
	this.calendar(new Date());
	document.getElementById("tableHeader").innerHTML = tableHeader;
	document.getElementById("tableContent").innerHTML = tableContent;
	g_stringHelper.updateUI();
}

// ����
courseSchedule.prototype.NowWeek = function () {
	this.calendar(new Date());
	document.getElementById("tableHeader").innerHTML = tableHeader;
	document.getElementById("tableContent").innerHTML = tableContent;

	g_courseSchedule.updateTimeTable();

	g_stringHelper.updateUI();
}

//��һ��
courseSchedule.prototype.PreWeek = function (dat) {
	var newDate = new Date();
	newDate.setTime(dat);
	newDate.setDate(newDate.getDate() - 1);
	this.calendar(newDate);
	document.getElementById("tableHeader").innerHTML = tableHeader;
	document.getElementById("tableContent").innerHTML = tableContent;


	g_courseSchedule.updateTimeTable();

	g_stringHelper.updateUI();
}

//��һ��
courseSchedule.prototype.NextWeek = function (dat) {
	var newDate = new Date();
	newDate.setTime(dat);
	newDate.setDate(newDate.getDate() + 1);
	this.calendar(newDate);
	document.getElementById("tableHeader").innerHTML = tableHeader;
	document.getElementById("tableContent").innerHTML = tableContent;

	g_courseSchedule.updateTimeTable();

	g_stringHelper.updateUI();
}

//���������
courseSchedule.prototype.calendar = function (today) {
	var weekArray = new Array("Sun", "Mon", "Tu", "We", "Th", "Fir", "Sat");
	var monthname = new Array("һ��", "����", "����", "����", "����", "����", "����", "����", "����", "ʮ��", "ʮһ��", "ʮ����");
	var monthDays = new montharr(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);   //ÿ���µ�������

	if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0))//����   
		monthDays[1] = 29;

	var oneminute = 60 * 1000;
	var onehour = 60 * oneminute;
	var oneday = 24 * onehour;
	var oneweek = 7 * oneday;

	var cYear = today.getFullYear();
	var cMonth = today.getMonth() + 1;
	var cDate = today.getDate();

	//���㱾�ܵĵ�һ��
	var startDate = today;
	var day = startDate.getDay();
	var daytoMon = day - 0;
	startDate.setTime(startDate.getTime() - daytoMon * oneday);
	var sDate = startDate.getDate();
	var sYear = startDate.getFullYear();
	var sMonth = startDate.getMonth() + 1;
	var sTime = startDate.getTime();

	//���㱾�ܵ����һ��
	var endDate = today;
	var day = endDate.getDay();
	var daytoMon = day - 6;
	endDate.setTime(endDate.getTime() - daytoMon * oneday);
	var eDate = endDate.getDate();
	var eYear = endDate.getFullYear();
	var eMonth = endDate.getMonth() + 1;
	var eTime = endDate.getTime();

	// update HTML
	tableHeader = "<table class='time_table_header'><tr><td colspan='8'>" +
					"<a href='#' onclick='g_courseSchedule.PreWeek(" + sTime + ");'><IMG style='height: 20px' width='20px' src='img/left.png'></a>" +
					"<a href='#' onclick='g_courseSchedule.PreWeek(" + sTime + ");'>Last Week</a>" +
					"<span id='cyear'>" + sYear + "</span>-<span id='cmonth'>" + sMonth + "</span>-<span id='cdate'>" + sDate + "</span> to <span id='eyear'>" + 
					eYear + "</span>-<span id='emonth'>" + eMonth + "</span>-<span id='edate'>" + eDate + "</span>" +
					"<a href='#' onclick='g_courseSchedule.NextWeek(" + eTime + ");'>next Week</a>" +
					 "<a href='#' onclick='g_courseSchedule.NextWeek(" + eTime + ");'><IMG style='height: 20px' width='20px' src='img/right.png'></a>" +
					 "<a href='#' onclick='g_courseSchedule.NowWeek();'><b>Current Week</b></a></td></tr>";
	tableHeader += "<tr>" +
					"<th class='timeline blank'></th>" +
					"<th class='weekdays'><span class='strSun'></span></th>" +
					"<th class='weekdays'><span class='strMon'></span></th>"+
					"<th class='weekdays'><span class='strTue'></span></th>"+
					"<th class='weekdays'><span class='strWed'></span></th>"+
					"<th class='weekdays'><span class='strThu'></span></th>"+
					"<th class='weekdays'><span class='strFir'></span></th>"+
					"<th class='weekdays'><span class='strSat'></span></th>"+
				"</tr></table>";
	for (var i = 0; i < 7; i++) {
		var todayDate = today;
		var day = todayDate.getDay();
		var daytoMon = day - i;
		todayDate.setTime(todayDate.getTime() - daytoMon * oneday);
		var year = todayDate.getFullYear();
		var month = todayDate.getMonth() + 1;
		var date = todayDate.getDate();
		var newDate = year + "" + month + "" + date;
		//�������ڼ�
		var cweek = todayDate.getDay();
	}

	//update �������ʱ��
	tableContent = "<table id='timetable' cellspacing=0 cellpadding=0>";
	for (var h = 7; h < 23; h++) {
		var time;
		if (h < 24)
			time = h;
		else
			time = h - 24;
		tableContent += "<tr class='week'><th class='timeline time0830'><span>" + time + "</span><span>:30</span>";
		for (var i = 0; i <= 6; i++) {
			var todayDate = today;
			var day = todayDate.getDay();
			var daytoMon = day - i;
			todayDate.setTime(todayDate.getTime() - daytoMon * oneday);
			date = todayDate.getDate();
			month = todayDate.getMonth() + 1;
			year = todayDate.getFullYear();
			var newDate = year + "" + month + "" + date;
			var newTime = todayDate.getTime();
			//�������ڼ�
			var cweek = todayDate.getDay();

			var startime = "time" + time + "30";
			var formattedWeekday = g_courseSchedule.weekdayFormat(cweek);

			//����
			if (currentDate == newDate) {
				if (cweek == 6) {
					if (time == 5)
						tableContent += "<td class='" + startime + " " + formattedWeekday + " " + newTime + "'></td>";
					else
						tableContent += "<td class='" + startime + " " + formattedWeekday + " " + newTime + "'></td>";
				} else {
					if (time == 5)
						tableContent += "<td class='" + startime + " " + formattedWeekday + " " + newTime + "'></td>";
					else
						tableContent += "<td class='" + startime + " " + formattedWeekday + " " + newTime + "'></td>";
				}
			} else {
				if (cweek == 6)
					tableContent += "<td class='" + startime + " " + formattedWeekday + " " + newTime + "'></td>";
				else
					tableContent += "<td class='" + startime + " " + formattedWeekday + " " + newTime + "'></td>";
			}
		}
	}
	tableContent += "</table>";
}

courseSchedule.prototype.weekdayFormat = function (cweek) {
	switch(cweek)
	{
	case 1:
		return "monday";
	case 2:
		return "tuesday";
	case 3:
		return "wednesday";
	case 4:
		return "thursday";
	case 5:
		return "friday";
	case 6:
		return "saturday";
	default:
		return "sunday";
	}
}

/**
* Function   :	init
*
* Description:	courseSchedule Page init
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
courseSchedule.prototype.init = function () {
	// initial fuctions
	g_courseSchedule.m_coursesCount = 0;
	
}

/**
* Function   :	update
*
* Description:	courseSchedule Page Update
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
courseSchedule.prototype.update = function (refresh) {
	//console.log(this.m_coursesList);
	this.changeContent();


	var prefs = plugins.appPreferences;



	prefs.fetch((function(key){
		g_sfuLogin.m_isLogin = key;
		if (g_sfuLogin.m_isLogin != true) {
			sfuExplorer.confirm('Please login first', 'SFU Explorer.',
	      function () {
					mainView.router.loadPage("setting.html");
	      },
	      function () {
					mainView.router.loadPage("index.html");
	      }
    	);
			return;
		}
	}), prefFail, IS_LOGIN);

	// search course in SFU database



	if (this.m_coursesList.length != 0)
		sfuExplorer.showPreloader('Loading Courses: <span class="preloader-progress">0</span> %');
	this.m_coursesList.forEach(function (obj, index) {
		g_courseSchedule.courseSearch(obj)
	});
}

courseSchedule.prototype.courseSearch = function (obj) {
	var currentTerm = this.getCurrentTermCode();
	hnapi.getCourseDetail(function (data) {
		g_courseSchedule.m_coursesDetailList.push(data);
		//console.log(g_courseSchedule.m_coursesCount);
		$$('.preloader-progress').text(Math.floor(++g_courseSchedule.m_coursesCount / g_courseSchedule.m_coursesList.length * 100));
		if (g_courseSchedule.m_coursesCount == g_courseSchedule.m_coursesList.length) {
			//console.log("update")
			g_courseSchedule.updateTimeTable();
			sfuExplorer.hidePreloader();
		}
	}, function (error) {
		console.log(error);
	},
		currentTerm,
		obj.department,
		obj.number,
		obj.section
	);
}

courseSchedule.prototype.getCurrentTermCode = function () {
	var date = new Date();
	var monthCode = date.getMonth()
	var yearCode = date.getFullYear() + "";
	yearCode = yearCode.substring(2, 4);
	if (monthCode < 3)
		monthCode = "1";
	else if (monthCode < 7)
		monthCode = "4";
	else
		monthCode = "7";
	return "1" + yearCode + monthCode;
}

/**
* Function   :	updateTimeTable
*
* Description:	Update timetable and render course schedule page
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
courseSchedule.prototype.updateTimeTable = function () {
	var currentYear = this.getYear();
	var currentTerm = this.getTerm();
	var data = this.m_coursesDetailList;
	data.forEach(function (obj, index) {
		var courseName, courseNum, section, dataSchedules, daysList, day, exam, startTime, endTime, colorIndex = 0;
		// get course info
		//console.log("data " + JSON.stringify(obj));
		courseName = data[index].name;
		courseNum = data[index].number;
		section = data[index].section;
		dataSchedules = data[index].schedules;
		// draw time table base on days
		if (dataSchedules != null) {
			dataSchedules.forEach(function (obj_schedule, index_schedule) {
				// format course type, exam or not
				var examType = obj_schedule.exam ? "Exam" : "LEC";
				// format days and time
				var startDate = new Date(parseInt(obj_schedule.startDate));
				var endDate = new Date(parseInt(obj_schedule.endDate));
				var scheduleStart = parseInt(obj_schedule.startTime);
				var scheduleEnd = parseInt(obj_schedule.endTime);
				var firstIndex = 0;
				while (scheduleEnd >= scheduleStart) {
					if (obj_schedule.days) {
						startTime = g_courseSchedule.formatTime(scheduleStart+"");
						endTime = g_courseSchedule.formatTime(scheduleEnd+"");
						daysList = obj_schedule.days.split("");
						// draw timetable
						daysList.forEach(function (obj_days) {
							day = g_courseSchedule.formatWeekday(obj_days);
							var getTableDate = $$('.page[data-page="courseSchedule"] .' + startTime + '.' + day).attr('class').split(" ")[2];
							var tableDate = new Date(parseInt(getTableDate));
							if (((tableDate - startDate) >= 0) && ((endDate - tableDate) >= (-1000 * 60 * 60 * 24))) {
								$$('.page[data-page="courseSchedule"] .' + startTime + '.' + day).addClass("btn-course");
								if (firstIndex==0)
									$$('.page[data-page="courseSchedule"] .' + startTime + '.' + day).html(courseName + " " + courseNum + " " + examType);
								$$('.page[data-page="courseSchedule"] .' + startTime + '.' + day).css("background", courseColorList[colorIndex]);
								$$('.page[data-page="courseSchedule"] .' + startTime + '.' + day).click(function () {
									//alert("coursesearchresultsdetail.html?year=" + currentYear + "&term=" + currentTerm.toLowerCase() + "&dept=" + courseName.toLowerCase() + "&number=" + courseNum.toLowerCase() + "&section=" + section.toLowerCase());
									//mainView.router.loadPage("coursesearchresultsdetail.html?year=" + currentYear + "&term=" + currentTerm.toLowerCase() + "&dept=" + courseName.toLowerCase() + "&number=" + courseNum.toLowerCase() + "&section=" + section.toLowerCase());
								});
								$$('.page[data-page="courseSchedule"] .' + startTime + '.' + day)
							}
						});
					}
					scheduleStart = scheduleStart + 100;
					firstIndex++;
				}
			});
		}
		colorIndex++;
	});
}

/**
* Function   :	formatWeekday
*
* Description:	format Weekday
*
* Author   :	Alex
*
* Arguments  :	none
*
* Returns:   :	[string] - day
*
* Comments   :	none
*
**/
courseSchedule.prototype.formatWeekday = function (data) {
	var day;
	switch (data)
	{
		case "M": day = "monday"; break;
		case "T": day = "tuesday"; break;
		case "W": day = "wednesday"; break;
		case "R": day = "thursday"; break;
		case "F": day = "friday"; break;
		case "S": day = "saturday"; break;
		case "Su":
		default: day = "sunday"; break;
	}
	return day
}

/**
* Function   :	formatTime
*
* Description:	format time
*
* Author   :	Alex
*
* Arguments  :	none
*
* Returns:   :	[string] - time
*
* Comments   :	none
*
**/
courseSchedule.prototype.formatTime = function (data) {
	var time;
	switch (data) {
		case "0830": time = "time0830"; break;
		case "0920":
		case "0930": time = "time0930"; break;
		case "1020":
		case "1030": time = "time1030"; break;
		case "1120":
		case "1130": time = "time1130"; break;
		case "1220":
		case "1230": time = "time1230"; break;
		case "1320":
		case "1330": time = "time1330"; break;
		case "1420":
		case "1430": time = "time1430"; break;
		case "1520":
		case "1530": time = "time1530"; break;
		case "1620":
		case "1630": time = "time1630"; break;
		case "1720":
		case "1730": time = "time1730"; break;
		case "1820":
		case "1830": time = "time1830"; break;
		case "1920":
		case "1930": time = "time1930"; break;
		case "2020":
		case "2030": time = "time2030"; break;
		case "2120":
		case "2130": time = "time2130"; break;
		case "2220":
		case "2230":
		default: time = "time2230"; break;
	}
	return time
}

courseSchedule.prototype.getYear = function (date) {
	var currentDate = new Date();
	return currentDate.getFullYear();
}

courseSchedule.prototype.getTerm = function (date) {
	var currentDate = new Date();
	var currentMonth = currentDate.getMonth();
	if (currentMonth>=0 && currentMonth<=3)
		return "spring";
	else if (currentMonth >= 4 && currentMonth <= 7)
		return "summer";
	else
		return "fall";
			
}



