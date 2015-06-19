///////////////////////////////////////////////////////////////////////////////
//
//  Copyright 2013~2014 (C) Evilnut.  All rights reserved.
//
//  Latest Update Date: 2014-10-02
//
////////////////////////////////////////////////////////////////////////////////

/**
* Class	: news 
*
* Description:	news Page Class		
*
* member variables   :	[bool] m_isCampusClosed  
*
* Author   :	Alex
*
* Comments   :	none
* 
**/
function news() {
	// member varables
	this.m_newsList = [];
	this.m_newsCounter = 0;
}

/**
* Function   :	init
*
* Description:	news Page init 		
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
news.prototype.init = function () {
	// initial fuctions 
	console.log("yaduo g_news init");
	var mySlider1 = sfuExplorer.slider('.slider-1', {
		pagination: '.slider-1 .slider-pagination',
		spaceBetween: 50,
		speed: 400
	});

}

/**
* Function   :	update
*
* Description:	news Page Update 		
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
news.prototype.update = function () {
	this.frontnews();
	this.updateNews();
}

news.prototype.updateNews = function (refresh) {
	var results = refresh ? [] : g_news.m_newsList;
	if (results.length === 0) {
		sfuExplorer.showPreloader('Searching News: <span class="preloader-progress">0</span> %');
		this.frontnews();
		for (var index = 0; index < 10; index++) {
			this.getRandomnNews(index);
		}
	} else {
		// Update T7 data and render home page profs
		g_news.updateTNewsList();
	}

}

news.prototype.frontnews = function () {
	var next1, next2;
	//First Request
	$.ajax({
		dataType: 'jsonp',
		url: "http://api.lib.sfu.ca/librarynews/frontpage/random?category=bennett",
		success: function (data) {
			next1 = "http://api.lib.sfu.ca/librarynews/frontpage/next?category=bennett&id=" + data.nid;
			console.log(next1);
			$("#s1Image").css("background-image", "url(" + data.image + ")");
			$( "#s1Image" ).click(function() {
			    document.addEventListener("deviceready", onDeviceReady, false);
				    function onDeviceReady() {
				    var ref = window.open(data.url, '_blank', 'EnableViewPortScale=yes,location=no,closebuttoncaption=Close');
				    ref.addEventListener('exit', function(event) { mainView.router.loadPage("news.html");});
    			}
			});
			//Second Request
			$.ajax({
				dataType: 'jsonp',
				url: next1,
				success: function (data) {
					next2 = data.nid;
					$("#s2Image").css("background-image", "url(" + data.image + ")");
					$("#s2Image" ).click(function() {
					    document.addEventListener("deviceready", onDeviceReady, false);
						    function onDeviceReady() {
						    var ref = window.open(data.url, '_blank', 'EnableViewPortScale=yes,location=no,closebuttoncaption=Close');
						   // ref.addEventListener('loaderror', function(event) { alert('error: ' + event.message); });
						    ref.addEventListener('exit', function(event) { mainView.router.loadPage("news.html");});
		    			}
					});
					$.ajax({
						dataType: 'jsonp',
						url: "http://api.lib.sfu.ca/librarynews/frontpage/next?category=bennett&id=" + next2,
						success: function (data) {
							$("#s3Image").css("background-image", "url(" + data.image + ")");
												$("#s3Image" ).click(function() {
					    document.addEventListener("deviceready", onDeviceReady, false);
						    function onDeviceReady() {
						    var ref = window.open(data.url, '_blank', 'EnableViewPortScale=yes,location=no,closebuttoncaption=Close');
						    //ref.addEventListener('loaderror', function(event) { alert('error: ' + event.message); });
						    ref.addEventListener('exit', function(event) { mainView.router.loadPage("news.html");});
		    			}
					});
						}
					});
				}
			});
		}
	});
}

news.prototype.getRandomnNews = function (index) {
	hnapi.getRandomnNews(function (data) {
		$$('.preloader-progress').text(Math.floor(++g_news.m_newsCounter/10 * 100));
		g_news.m_newsList[index] = data;
		if (g_news.m_newsCounter == 10) {
			sfuExplorer.hidePreloader();
			g_news.updateTNewsList();
		}
	},function (error) {
		sfuExplorer.hidePreloader();
		alertMsg.render('Failed to load news','OK')
		console.log(error);
	});
}

news.prototype.updateTNewsList = function () {
	console.log(JSON.stringify(this.m_newsList));
	sfuExplorer.template7Data.newsData = this.m_newsList
	var tempHTML = Template7.templates.newsListScript(this.m_newsList);
	$$('.page[data-page="news"] .page-content .list-block').html(tempHTML);
}