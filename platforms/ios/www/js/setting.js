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
function Setting() {
	// member varables
	//this.m_latLng;
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
Setting.prototype.init = function () {
	// initial fuctions
	console.log("yaduo Setting init 2");
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
Setting.prototype.update = function () {

// initial fuctions
	console.log("yaduoddddd Setting init 1");
	console.log("yaduoddddd Setting init 2");

   // var prefs = plugins.appPreferences;


	if (g_sfuLogin.m_isLogin == true) {
        console.log("yaduoddddd Setting init 3");
		$$('#studentName').html(g_sfuLogin.m_studentName);
        console.log("yaduoddddd Setting init 4");
		$$('#studentID').html(g_sfuLogin.m_studentid);
		$$('#loginBtn').html("Logout");
		$$('#loginBtn').removeClass("color-green open-login-screen").addClass("color-red");
		$$('#loginBtn').on('click', function () {
			g_sfuLogin.m_isLogin = false;
			g_courseSchedule.m_coursesList = [];
			g_courseSchedule.m_coursesDetailList = [];
			mainView.router.refreshPage();
		});


	}


	/*var prefs = plugins.appPreferences;

	prefs.fetch((function(key){
		console.log("yaduo login 1" + key);
	}), prefFail, IS_LOGIN);

	prefs.fetch((function(key){
		console.log("yaduo IS_REMEMBER 1" + key);
	}), prefFail, IS_REMEMBER);


	prefs.fetch((function(key){
		console.log("yaduo 11");
		g_sfuLogin.m_isLogin = key;
		if (g_sfuLogin.m_isLogin == true) {
			console.log("yaduo 22");

			prefs.fetch((function(key){ 
				console.log("yaduo 3.1 ");
				g_sfuLogin.m_isRemember = key; 
				if(g_sfuLogin.m_isRemember){ 
					console.log("yaduo 3");

					prefs.fetch((function(key){
						g_sfuLogin.m_studentName = key;
						$$('#studentName').html(g_sfuLogin.m_studentName);
					}), prefFail, STD_NAME);
					
					prefs.fetch((function(key){
						g_sfuLogin.m_studentid = key;
						$$('#studentID').html(g_sfuLogin.m_studentid);
					}), prefFail, STD_ID);

					prefs.fetch((function(key){ g_sfuLogin.m_computerID = key; }), prefFail, CMPT_ID);
					
					prefs.fetch((function(key){ g_sfuLogin.m_password = key; }), prefFail, PASSWORD);

					$$('#loginBtn').html("Logout");
					$$('#loginBtn').removeClass("color-green open-login-screen").addClass("color-red");
					$$('#loginBtn').on('click', function () {
						g_sfuLogin.m_isLogin = false;
						prefs.store (prefStoreSuccess, prefFail, IS_LOGIN, g_sfuLogin.m_isLogin);
						prefs.store (prefStoreSuccess, prefFail, PASSWORD, "");
						prefs.store (prefStoreSuccess, prefFail, CMPT_ID, "");
						g_courseSchedule.m_coursesList = [];
						g_courseSchedule.m_coursesDetailList = [];
						mainView.router.refreshPage();
					});
				}
					else {
						if (g_sfuLogin.m_isLogin == true) {
							$$('#studentName').html(g_sfuLogin.m_studentName);
						$$('#studentName').html(g_sfuLogin.m_studentName);
						$$('#studentID').html(g_sfuLogin.m_studentid);
						$$('#loginBtn').html("Logout");
						$$('#loginBtn').removeClass("color-green open-login-screen").addClass("color-red");
						$$('#loginBtn').on('click', function () {
							g_sfuLogin.m_isLogin = false;
							g_courseSchedule.m_coursesList = [];
							g_courseSchedule.m_coursesDetailList = [];
							mainView.router.refreshPage();
						});

					}
				}

			}), prefFail, IS_REMEMBER);

		}
	}), prefFail, IS_LOGIN);
*/
}

