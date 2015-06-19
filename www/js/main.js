
///////////////////////////////////////////////////////////////////////////////
//
//  Copyright 2013~2014 (C) Evilnut.  All rights reserved.
//
//  Latest Update Date: 2014-10-02
//
////////////////////////////////////////////////////////////////////////////////


document.addEventListener("offline", onOffline, false);

function onOffline() {
	$$(".link").click(function(){
		sfuExplorer.alert('Please connect to Internet', 'SFU Explorer');
	});
	$$("a").click(function(){
		sfuExplorer.alert('Please connect to Internet', 'SFU Explorer');
	});
}

document.addEventListener("online", onOnline, false);

function onOnline() {
	$(".link").unbind("click");
	$("a").unbind("click");
}





function login() {
		sfuExplorer.showPreloader('Login SFU: <span class="preloader-progress">0</span> %');
        console.log("aaaaaaaaaaaaaaaa");
    	//var prefs =  plugins.appPreferences;
		var username = $$('.login-screen').find('input[name="username"]').val();
		console.log(username);
		var password = $$('.login-screen').find('input[name="password"]').val();
        console.log(password);
		hnapi.sfuLogin(function (data) {
			data = JSON.parse(data);
			console.log(data);
			if(data[0]=="password_failed"){
				//console.log(data);
				sfuExplorer.hidePreloader();
				sfuExplorer.alert("login failed","SFU Explorer");
				return;
			}
			//console.log(data);s
			g_sfuLogin.m_isLogin = true;
			g_sfuLogin.m_studentName = data.name;
			g_sfuLogin.m_studentid = data.id;
                g_sfuLogin.m_computerID = username;
			// Store user preference
			if ($$('.remember-check').is(':checked')) {
                var prefs =  plugins.appPreferences;
				console.log("remember account");
				prefs.store (prefStoreSuccess, prefFail, IS_LOGIN, g_sfuLogin.m_isLogin);
				prefs.store (prefStoreSuccess, prefFail, IS_REMEMBER,g_sfuLogin.m_isRemember);
				prefs.store (prefStoreSuccess, prefFail, STD_NAME, g_sfuLogin.m_studentName);
				prefs.store (prefStoreSuccess, prefFail, STD_ID, g_sfuLogin.m_studentid);
				prefs.store (prefStoreSuccess, prefFail, CMPT_ID, g_sfuLogin.m_computerID);
				prefs.store (prefStoreSuccess, prefFail, PASSWORD, password);
			};

			if (data.courses == "") {
				data.courses = [];
			}
			g_courseSchedule.m_coursesList = data.courses;
			g_courseSchedule.m_termCode = data.term_code;
			console.log(data.term_code);
			sfuExplorer.hidePreloader();
			sfuExplorer.closeModal('.login-screen');
			mainView.router.refreshPage();
		}, function (error) {
			console.log(error);
		},
			username,
			password
		);

}

function badge() {
	$$.ajax({
		dataType: 'json',
		url: "http://evilnut.ca/App/APIs/sfu_app/sfuapp/campus_status.php",
		success: function (data) {
			g_campusStatus.m_burnabyStatus = data.burnaby;
			g_campusStatus.m_surreystatus = data.surrey;
			g_campusStatus.m_downtownStatus = data.vancouver;

			var countClose = 0;

			if (data.burnaby != "Open") {
				countClose++;
			}

			if (data.surrey != "Open") {
				countClose++;
			}
			if (data.vancouver != "Open") {
				countClose++;
			}
			if (countClose > 0) {
				$( "#cs" ).html( '<span class="badge bg-red">'+countClose+'</span>' );
			};
		}
	});



}
	$$.ajax({
		dataType: 'json',
		url: "http://evilnut.ca/App/APIs/sfu_app/sfuapp/campus_status.php",
		success: function (data) {
			g_campusStatus.m_burnabyStatus = data.burnaby;
			g_campusStatus.m_surreystatus = data.surrey;
			g_campusStatus.m_downtownStatus = data.vancouver;

			var countClose = 0;

			if (data.burnaby != "Open") {
				countClose++;
				sfuExplorer.addNotification({
       			title: 'KnowSFU',
        		message: 'Burnaby campus is closed.'
    		});

			}

			if (data.surrey != "Open") {
				countClose++;
				sfuExplorer.addNotification({
       			title: 'KnowSFU',
        		message: 'Surrey campus is closed.'
    		});
			}
			if (data.vancouver != "Open") {
				countClose++;
				sfuExplorer.addNotification({
       			title: 'KnowSFU',
        		message: 'Vancouver campus is closed.'
    		});
			}
			if (countClose > 0) {
				$( "#cs" ).html( '<span class="badge bg-red">'+countClose+'</span>' );
			};
		}
	});




	$$('#ac').on('click', function () {
    var buttons1 = [
        {
            text: 'Services',
            label: true
        },
        {
            text: 'Email',
            bold: true,
            onClick: function () {
                    document.addEventListener("deviceready", onDeviceReady, false);
			    function onDeviceReady() {
			      var prefs = plugins.appPreferences;
			      prefs.fetch((function(key){
			        g_sfuLogin.m_isLogin = key;
			        var option = 'location=no,closebuttoncaption=Close';
			        if (g_sfuLogin.m_isLogin != true) {
			          option += ',clearcache=yes,clearsessioncache=yes';
			        }

			        var ref = window.open('https://connect.sfu.ca', '_blank', option);
			        ref.addEventListener('loaderror', function(event) { alertMsg.render('error: ' + event.message,'Close'); });
			        ref.addEventListener('exit', function(event) {});
			      }),
			      function(error) {
			        var option = 'location=no,closebuttoncaption=Close,clearcache=yes,clearsessioncache=yes';
			        var ref = window.open('https://connect.sfu.ca', '_blank', option);
			        ref.addEventListener('loaderror', function(event) { alertMsg.render('error: ' + event.message,'Close'); });
			        ref.addEventListener('exit', function(event) {});
			      }
			      , IS_LOGIN);
			    }
            }
        },
        {
            text: 'Canvas',
            onClick: function () {
			    document.addEventListener("deviceready", onDeviceReady, false);
			    function onDeviceReady() {
			      var prefs = plugins.appPreferences;
			      prefs.fetch((function(key){
			        g_sfuLogin.m_isLogin = key;
			        var option = 'location=no,closebuttoncaption=Close';
			        if (g_sfuLogin.m_isLogin != true) {
			          option += ',clearcache=yes,clearsessioncache=yes';
			        }

			        var ref = window.open('https://canvas.sfu.ca', '_blank', option);
			        ref.addEventListener('loaderror', function(event) { alertMsg.render('error: ' + event.message,'Close'); });
			        ref.addEventListener('exit', function(event) {});
			      }),
			      function(error) {
			        var option = 'location=no,closebuttoncaption=Close,clearcache=yes,clearsessioncache=yes';
			        var ref = window.open('https://canvas.sfu.ca', '_blank', option);
			        ref.addEventListener('loaderror', function(event) { alert('error: ' + event.message); });
			        ref.addEventListener('exit', function(event) {});
			      }
			      , IS_LOGIN);
			    }
            }
        },
        {
            text: 'SIS',
            onClick: function () {
			    document.addEventListener("deviceready", onDeviceReady, false);
			    function onDeviceReady() {
			      var prefs = plugins.appPreferences;
			      prefs.fetch((function(key){
			        g_sfuLogin.m_isLogin = key;
			        var option = 'location=no,closebuttoncaption=Close';
			        if (g_sfuLogin.m_isLogin != true) {
			          option += ',clearcache=yes,clearsessioncache=yes';
			        }

			        var ref = window.open('https://sis.sfu.ca', '_blank', option);
			        ref.addEventListener('loaderror', function(event) { alertMsg.render('error: ' + event.message,'Close'); });
			        ref.addEventListener('exit', function(event) {});
			      }),
			      function(error) {
			        var option = 'location=no,closebuttoncaption=Close,clearcache=yes,clearsessioncache=yes';
			        var ref = window.open('https://sis.sfu.ca', '_blank', option);
			        ref.addEventListener('loaderror', function(event) { alertMsg.render('error: ' + event.message,'Close'); });
			        ref.addEventListener('exit', function(event) {});
			      }
			      , IS_LOGIN);
			    }
            }
        },
        {
            text: 'Loncapa',
            onClick: function () {
			    document.addEventListener("deviceready", onDeviceReady, false);
			    function onDeviceReady() {
			      var prefs = plugins.appPreferences;
			      prefs.fetch((function(key){
			        g_sfuLogin.m_isLogin = key;
			        var option = 'location=no,closebuttoncaption=Close';
			        if (g_sfuLogin.m_isLogin != true) {
			          option += ',clearcache=yes,clearsessioncache=yes';
			        }

			        var ref = window.open('https://lewis.chem.sfu.ca/adm/roles', '_blank', option);
			        ref.addEventListener('loaderror', function(event) { alertMsg.render('error: ' + event.message,'Close'); });
			        ref.addEventListener('exit', function(event) {});
			      }),
			      function(error) {
			        var option = 'location=no,closebuttoncaption=Close,clearcache=yes,clearsessioncache=yes';
			        var ref = window.open('https://lewis.chem.sfu.ca/adm/roles', '_blank', option);
			        ref.addEventListener('loaderror', function(event) { alertMsg.render('error: ' + event.message,'Close'); });
			        ref.addEventListener('exit', function(event) {});
			      }
			      , IS_LOGIN);
			    }
            }
        }
    ];
    var buttons2 = [
        {
            text: 'Cancel',
            color: 'red'
        }
    ];
    var groups = [buttons1, buttons2];
    sfuExplorer.actions(groups);
});

	// Parse from Json
	function getJson(url) {
		 return JSON.parse($.ajax({
		     type: 'GET',
		     url: url,
		     dataType: 'json',
		     global: false,
		     async:false,
		     success: function(data) {
		         return data;
		     }
		 }).responseText);
		}
	/*
	 * 
	 * class function for booklist
	 * 
	 */

	function booklist() {
		this.m_bookList = [];
		this.m_bookCount = 0;
	}

	booklist.prototype.init = function(){
		// initial functions
		console.log("BookList initiated");
	}

	booklist.prototype.update = function (refresh) {
		this.getBookList(refresh);
	}

	booklist.prototype.updateBookList = function() {
		sfuExplorer.template7Data.books = this.m_bookList;
		var tempHTML = Template7.templates.BookListScript(this.m_bookList);
		$$('.page[data-page="booklist"] .page-content .list-block').html(tempHTML);
		g_stringHelper.updateUI();

	}
	 
	booklist.prototype.getBookList = function (refresh) {
		var results = refresh ? [] : g_bookList.m_bookList;
		sfuExplorer.showPreloader('Used Books List: <span class="preloader-progress">0</span>');
		if (results.length === 0) {
			// 	$.getJSON(bookListURL, function(data) { 	
				
	  //               results = data;
			// 		//console.log(results);
			// 		//console.log(results.length);
			// 	});

			// console.log(results);
			$$('.preloader-progress').text("Loading...");
			setTimeout(function(){
				sfuExplorer.hidePreloader();
				if(results.length < 1){
					alertMsg.render('Failed to load book list','OK');
				}
				console.log("Used book loaded: "+results.length);
			},5000);
			results = getJson("http://evilnut.ca/App/APIs/sfu_app/sfuapp/sql/getbookjson.php");

	// var bookArray;
//	 		for(var j=0; j<bookArray.length;j++){
//	 			bookArray[j].forEach( function (obj, i){
//	 				obj = JSON.parse(obj);
//	 				results[i] = obj.name;
//	 				$$('.preloader-progress').text(Math.floor(i / bookArray.length * 100));
//	 			});
//	 		};
			// clear search bar
			$$('.searchbar-input input')[0].value = '';
			// Update local storage data
			g_bookList.m_bookList = results;	
			g_bookList.m_bookCount = results.length;
			console.log(g_bookList.m_bookList);
		
			//show and update book list
			g_bookList.updateBookList();
			// PTR Done
			sfuExplorer.hidePreloader();
			sfuExplorer.pullToRefreshDone();
			
		}
		else {
			// Update T7 data and render home page
			g_bookList.updateBookList();
		}
		return results;
	}

	/*
	 * 
	 * Class function for tutor list
	 * 
	 */

	function tutorlist() {
		this.m_tutorList = [];
		this.m_tytorCount = 0;
	}

	tutorlist.prototype.init = function(){
		// initial functions
		console.log("Tutor list initiated");
	}

	tutorlist.prototype.update = function (refresh) {
		this.getTutorList(refresh);
	}

	tutorlist.prototype.updatetutorlist = function() {
		sfuExplorer.template7Data.tutors = this.m_tutorList;
		var tempHTML = Template7.templates.TutorListScript(this.m_tutorList);
		$$('.page[data-page="tutorlist"] .page-content .list-block').html(tempHTML);
		g_stringHelper.updateUI();
	}

	tutorlist.prototype.getTutorList = function (refresh) {
		var results = refresh ? [] : g_tutorList.m_tutorList;
		if (results.length === 0) {
			sfuExplorer.showPreloader('Tutor List: <span class="preloader-progress">0</span>');
			
			$$('.preloader-progress').text("Loading...");
			setTimeout(function(){
				sfuExplorer.hidePreloader();
				if(results.length < 1){
					alertMsg.render('Failed to load tutor list','OK');
				}
				console.log("Used book loaded: "+ results.length);
			},5000);
			results = getJson("http://evilnut.ca/App/APIs/sfu_app/sfuapp/sql/gettutorjson.php");
			
			// clear search bar
			$$('.searchbar-input input')[0].value = '';
			// Update local storage data
			console.log("getTutorList");
			g_tutorList.m_tutorList = results;
			g_tutorList.m_tutorCount = results.length;
			//show and update tutor list
			g_tutorList.updatetutorlist();
			// PTR Done
			sfuExplorer.hidePreloader();
			sfuExplorer.pullToRefreshDone();
		}
		else {
			// Update T7 data and render home page
			g_tutorList.updatetutorlist();
		}
		return results;
	}


// program init
var g_settings = new Setting();
var g_sfuLogin = new sfuLogin();
var g_rateMyprof = new rateMyprof();
var g_rateMyprofDetail = new rateMyprofDetail();
var g_bookList = new booklist();
var g_tutorList = new tutorlist();
var g_programIntro = new programIntro();
var g_courseSchedule = new courseSchedule();
var g_courseSearchResultsDetail = new courseSearchResultsDetail();
var g_courseSearch = new courseSearch();
var g_courseSearchResults = new courseSearchResults();
var g_courseDetail = new courseDetail();
var g_news = new news();
var g_campusStatus = new campusStatus();
var g_campusMap = new campusMap();
var g_transit = new transit();
var g_transitDetail = new transitDetail();
var g_sfuLogin = new sfuLogin();
var g_language = new Language();
var currLang = "";

// email page flag
var isEmailPage = false;

g_stringHelper.init();

$$(document).on('ajaxComplete', function () {
	//console.log("yaduo ajaxComplete g_campusStatus " + g_campusStatus.m_burnabyStatus);
	//console.log("yaduo ajaxComplete g_campusStatus " + g_campusStatus.m_surreystatus);
	//console.log("yaduo ajaxComplete g_campusStatus " + g_campusStatus.m_downtownStatus);
});

$$(".login-password").keypress(function(e) {
    if(e.which == 13) {
    	login();
    }
});

$$('.login-screen').find('.login-button').on('click', function () {
		login();
});

$$('.login-screen').find('.cancel-button').on('click', function () {
		sfuExplorer.closeModal('.login-screen');
});

$$( "#conditions" ).click(function() {
    document.addEventListener("deviceready", onDeviceReady, false);
	    function onDeviceReady() {
	    var ref = window.open("http://www.sfu.ca", '_blank', 'EnableViewPortScale=yes,location=no,closebuttoncaption=Close');
	    ref.addEventListener('exit', function(event) { mainView.router.loadPage("news.html");});
	}
});

	// $('.pagination').jqPagination({
	// 	//link_string	: '/?page={page_number}',
	// 	max_page	: 20,
	// 	// paged		: function(page) {
	// 	// 	$('.log').prepend('<li>Requested page ' + page + '</li>');
	// 	// 	console.log(page);
	// 	//}
	// });









/**
* Function   :	index init
*
* Description:	Manual initialization, index page init
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
sfuExplorer.onPageInit('index', function (page) {
	console.log("index onPageAfterAnimation");




	badge();
	// update campus status
	g_campusStatus.init();
	g_campusStatus.updateStatus();

	$$('.open-preloader').on('click', function () {
    	sfuExplorer.showPreloader();
    	setTimeout(function () {
        	sfuExplorer.hidePreloader();
    	}, 2000);
	});

});
sfuExplorer.init();


sfuExplorer.onPageAfterAnimation('index', function (page) {
	// page UI inti
	$$(".navbar").removeClass("navbar-extra-courseSchedule").addClass("navbar-extra");
	g_stringHelper.updateUI();

});

/**
* Function   :	onPageInit("settingPage")
*
* Description:	settingPage init
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

sfuExplorer.onPageInit('settingPage', function (page) {
	console.log("settingPage onPageAfterAnimation");

	// page UI init
	$$(".navbar").removeClass("navbar-extra").removeClass("navbar-extra-courseSchedule");
	g_stringHelper.updateUI();

	g_settings.init();
	g_settings.update();
});

/**
* Function   :	index init
*
* Description:	Manual initialization, index page init
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
sfuExplorer.onPageAfterAnimation('language', function (page) {
	console.log("language onPageAfterAnimation");
	// page UI inti
	$$(".navbar").removeClass("navbar-extra").removeClass("navbar-extra-courseSchedule");
	g_stringHelper.updateUI();

	g_language.init();
	g_language.update();
});

/**
* Function   :	onPageAfterAnimation("courseSearch")
*
* Description:	courseSearch init
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
sfuExplorer.onPageInit('courseSearch', function (page) {
	console.log("courseSearch onPageInit");

	// page UI inti
	$$(".navbar").removeClass("navbar-extra").removeClass("navbar-extra-courseSchedule");
	g_stringHelper.updateUI();

	g_courseSearch.init();
	g_courseSearch.update();


});

/* jqPagination - number of courses displayed per page in course search results page.
   Should match the number in courseSearch1.php */
var numCoursePerPage = 25;

sfuExplorer.onPageInit('courseSearchResults', function (page) {
	console.log("courseSearchResults onPageInit");

	/* Initialize jqPagination to listen for page event */
	$('.pagination').jqPagination({
		current_page: 1,
		max_page	: 10,
		page_string: 'Page {current_page}',
		paged		: function(page) {

			var totalCourseRequested = numCoursePerPage*page;             

			console.log("jqPagination");
			console.log('Page ' + page + ' requested');

			/* set the page currently on */
			 g_courseSearchResults.m_page = page;
	

			/* Update the template only. Do not call the php script if we have the data already */
			if (g_courseSearchResults.m_coursesCount >= totalCourseRequested || g_courseSearchResults.m_allCoursesLoaded == true){
				console.log("we have the data");
				g_courseSearchResults.updateCoursesListWithPage();
			}else{
				/* need to call php script to get more data */
				console.log("we don't have the data");
				g_courseSearchResults.update(true);
			}
		}
	});

});

sfuExplorer.onPageBeforeRemove('courseSearchResults', function (page) {
	console.log("courseSearchResults onPageBeforeRemove");

	/* jqPagination - reuturn these variables to their default setting when page removed */
	g_courseSearchResults.m_page = 1;
	g_courseSearchResults.m_allCoursesLoaded = false;
	g_courseSearchResults.m_lastPage = "";

});

/**
* Function   :	onPageAfterAnimation("courseSearch")
*
* Description:	courseSearch init
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
sfuExplorer.onPageAfterAnimation('courseSearchResults', function (page) {
	console.log("courseSearchResults onPageAfterAnimation");

	// page UI inti
	$$(".navbar").removeClass("navbar-extra").removeClass("navbar-extra-courseSchedule");
	g_stringHelper.updateUI();

	g_courseSearchResults.init();
    g_courseSearchResults.update();


});

/**
* Function   :	onPageAfterAnimation("courseSearch")
*
* Description:	courseSearch init
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
sfuExplorer.onPageAfterAnimation('courseDetail', function (page) {
	console.log("courseDetail onPageAfterAnimation");

	// page UI inti
	$$(".navbar").removeClass("navbar-extra").removeClass("navbar-extra-courseSchedule");
	g_stringHelper.updateUI();

	g_courseDetail.init(page);
	g_courseDetail.update(page);

});

/**
* Function   :	onPageAfterAnimation("rateMyProf")
*
* Description:	rateMyProf page initialization
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
sfuExplorer.onPageAfterAnimation('rateMyProf', function (page) {
	//console.log("rateMyProf onPageAfterAnimation ");

	// page UI inti
	$$(".navbar").removeClass("navbar-extra").removeClass("navbar-extra-courseSchedule");
	g_stringHelper.updateUI();

	g_rateMyprof.init();
	g_rateMyprof.update();

	// pull to refresh listener
	$$('#pullToRefreshProf').on('refresh', function () {
		g_rateMyprof.update(true);
	});
});

/**
* Function   :	onPageAfterAnimation("rateMyProfDetail")
*
* Description:	rateMyProf page initialization
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
sfuExplorer.onPageAfterAnimation('rateMyProfDetail', function (page) {
	//console.log("rateMyProfDetail onPageAfterAnimation ");

	// page UI inti
	$$(".navbar").removeClass("navbar-extra").removeClass("navbar-extra-courseSchedule");
	g_stringHelper.updateUI();

	g_rateMyprofDetail.init(page);
	g_rateMyprofDetail.update();

});


/**
* Function   :	onPageAfterAnimation("booklist")
*
* Description:	Book List page initialization
*
* Author   :	Ray
*
* Arguments  :	none
*
* Returns:   :	none
*
* Comments   :	none
*
**/
sfuExplorer.onPageAfterAnimation('booklist', function (page) {
	//console.log("rateMyProf onPageAfterAnimation ");

	// page UI inti
	$$(".navbar").removeClass("navbar-extra").removeClass("navbar-extra-courseSchedule");
	g_stringHelper.updateUI();

	g_bookList.init();
	g_bookList.update();

	// pull to refresh listener
	$$('#pullToRefreshBook').on('refresh', function () {
		g_bookList.update(true);
	});
});

/**
* Function   :	onPageAfterAnimation("bookDetail")
*
* Description:	bookDetail page initialization
*
* Author   :	Ray
*
* Arguments  :	none
*
* Returns:   :	none
*
* Comments   :	none
*
**/
sfuExplorer.onPageAfterAnimation('bookdetail', function (page) {
	// page UI inti
	$$(".navbar").removeClass("navbar-extra").removeClass("navbar-extra-courseSchedule");
	g_stringHelper.updateUI();

});

/**
* Function   :	onPageAfterAnimation("tutorlist")
*
* Description:	Tutor List page initialization
*
* Author   :	Ray
*
* Arguments  :	none
*
* Returns:   :	none
*
* Comments   :	none
*
**/
sfuExplorer.onPageAfterAnimation('tutorlist', function (page) {
	//console.log("rateMyProf onPageAfterAnimation ");

	// page UI inti
	$$(".navbar").removeClass("navbar-extra").removeClass("navbar-extra-courseSchedule");
	g_stringHelper.updateUI();

	g_tutorList.init();
	g_tutorList.update();

	// pull to refresh listener
	$$('#pullToRefreshTutor').on('refresh', function () {
		g_tutorList.update(true);
	});
});

/**
* Function   :	onPageAfterAnimation("tutorDetail")
*
* Description:	tutorDetail page initialization
*
* Author   :	Ray
*
* Arguments  :	none
*
* Returns:   :	none
*
* Comments   :	none
*
**/
sfuExplorer.onPageAfterAnimation('tutordetail', function (page) {
	// page UI inti
	$$(".navbar").removeClass("navbar-extra").removeClass("navbar-extra-courseSchedule");
	g_stringHelper.updateUI();

});

/**
* Function   :	onPageAfterAnimation("programIntro")
*
* Description:	programIntro page initialization
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
sfuExplorer.onPageAfterAnimation('programIntro', function (page) {
	//console.log("programIntro onPageAfterAnimation ");

	// page UI inti
	$$(".navbar").removeClass("navbar-extra").removeClass("navbar-extra-courseSchedule");
	g_stringHelper.updateUI();

	g_programIntro.init();
	g_programIntro.update();

	$$('#pullToRefreshProgram').on('refresh', function () {
		g_programIntro.update(true);
		//getProgramfsList(true);
	});
});

/**
* Function   :	onPageAfterAnimation("programIntroDetail")
*
* Description:	programIntro page initialization
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
sfuExplorer.onPageAfterAnimation('programIntroDetail', function (page) {
	// page UI inti
	$$(".navbar").removeClass("navbar-extra").removeClass("navbar-extra-courseSchedule");
	g_stringHelper.updateUI();

});

/**
* Function   :	onPageInit("campusStatus")
*
* Description:	campusStatus init
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
sfuExplorer.onPageAfterAnimation('campusStatus', function (page) {
	//console.log("campusStatus onPageAfterAnimation ");

	// page UI inti
	$$(".navbar").removeClass("navbar-extra").removeClass("navbar-extra-courseSchedule");
	g_stringHelper.updateUI();

	g_campusStatus.init();
	g_campusStatus.update();

	// pull to refresh listener
	$$('#pullToRefreshCampusStatus').on('refresh', function () {
		g_campusStatus.update(true);
	});
});


/**
* Function   :	onPageAfterAnimation("courseSchedule")
*
* Description:	courseSchedule init
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
sfuExplorer.onPageAfterAnimation('courseSchedule', function (page) {
	//console.log("courseSchedule onPageAfterAnimation");

	// page UI inti
	//$$(".navbar").removeClass("navbar-extra").addClass("navbar-extra-courseSchedule");
	$$(".navbar").removeClass("navbar-extra").removeClass("navbar-extra-courseSchedule");
	g_stringHelper.updateUI();

	g_courseSchedule.init();
	g_courseSchedule.update();

});

/**
* Function   :	onPageAfterAnimation("courseSchedule")
*
* Description:	courseSchedule init
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
sfuExplorer.onPageAfterAnimation('courseSearchResultsDetail', function (page) {
	console.log("courseSearchResultsDetail onPageAfterAnimation");

	// page UI inti
	$$(".navbar").removeClass("navbar-extra").removeClass("navbar-extra-courseSchedule");
	g_stringHelper.updateUI();

	g_courseSearchResultsDetail.init(page);
	g_courseSearchResultsDetail.update(page);

});

/**
* Function   :	onPageAfterAnimation("news")
*
* Description:	news init
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
sfuExplorer.onPageAfterAnimation('news', function (page) {
	//console.log("news onPageAfterAnimation");

	// page UI inti
	$$(".navbar").removeClass("navbar-extra").removeClass("navbar-extra-courseSchedule");
	g_stringHelper.updateUI();

	g_news.init();
	g_news.update();

});

/**
* Function   :	onPageAfterAnimation("campusMap")
*
* Description:	campusMap init
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
sfuExplorer.onPageAfterAnimation('campusMap', function (page) {
	//console.log("campusMap onPageAfterAnimation");

	// page UI inti
	$$(".navbar").removeClass("navbar-extra").removeClass("navbar-extra-courseSchedule");
	g_stringHelper.updateUI();

	g_campusMap.init();
	g_campusMap.update();
});


/**
* Function   :	onPageAfterAnimation("transit")
*
* Description:	transit init
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
sfuExplorer.onPageAfterAnimation('transit', function (page) {
	//console.log("transit onPageAfterAnimation");

	// page UI inti
	$$(".navbar").removeClass("navbar-extra").removeClass("navbar-extra-courseSchedule");
	g_stringHelper.updateUI();

});

/**
* Function   :	onPageAfterAnimation("transitDetail")
*
* Description:	transit init
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
sfuExplorer.onPageAfterAnimation('transitDetail', function (page) {
	//console.log("transitDetail onPageAfterAnimation");

	// page UI inti
	$$(".navbar").removeClass("navbar-extra").removeClass("navbar-extra-courseSchedule");
	g_stringHelper.updateUI();


	g_transitDetail.init(page);
	g_transitDetail.update();
});



sfuExplorer.onPageAfterAnimation('service', function (page) {
	//console.log("transitDetail onPageAfterAnimation");

	// page UI inti
	$$(".navbar").removeClass("navbar-extra").removeClass("navbar-extra-courseSchedule");
	g_stringHelper.updateUI();


	g_service.init(page);
	g_service.update();
});
