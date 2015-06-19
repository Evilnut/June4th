///////////////////////////////////////////////////////////////////////////////
//
//  Copyright 2013~2014 (C) Evilnut.  All rights reserved.
//
//  Latest Update Date: 2014-10-02
//
////////////////////////////////////////////////////////////////////////////////

/**
* Class	: transitDetail 
*
* Description:	programIntro Page Class		
*
* member variables   :	[bool] m_isCampusClosed  
*
* Author   :	Alex
*
* Comments   :	none
* 
**/
function transitDetail() {
	// member varables
	this.m_transitList = [];
	this.m_transitCount = 0;
	this.m_stationId = 0;
}

/**
* Function   :	init
*
* Description:	programIntro Page init 		
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
transitDetail.prototype.init = function (page) {
	// initial fuctions 
	console.log(page.query.id);
	this.m_stationId = page.query.id;
	this.m_transitList = [];
}

/**
* Function   :	update
*
* Description:	programIntro Page Update 		
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
transitDetail.prototype.update = function (refresh) {
	console.log("yaduo g_transitDetail update");
	this.getTransitList(refresh);
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
 

/*transitDetail.prototype.getTransitList = function (refresh) {
	var results = refresh ? [] : g_transitDetail.m_transitList;
	if (results.length === 0) {
		sfuExplorer.showPreloader('Loading Transit Information: <span class="preloader-progress">0</span> %');
		var counter = 0;
		// query the exchange bay, there are 4 small stations
		if (g_transitDetail.m_stationId == "00000") {
			// query exchange bay: 145
			hnapi.getTansitSchedule(function (data145) {
				data145 = JSON.parse(data145).nextbus;
				results[counter] = data145;
				results[counter].schedules = data145.schedules.schedule;
				$$('.preloader-progress').text(Math.floor(++counter / 4 * 100));
				// query exchange bay: 135
				hnapi.getTansitSchedule(function (data135) {
					data135 = JSON.parse(data135).nextbus;
					results[counter] = data135;
					results[counter].schedules = data135.schedules.schedule;
					$$('.preloader-progress').text(Math.floor(++counter / 4 * 100));
					// query exchange bay: 144
					hnapi.getTansitSchedule(function (data144) {
						data144 = JSON.parse(data144).nextbus;
						results[counter] = data144;
						results[counter].schedules = data144.schedules.schedule;
						$$('.preloader-progress').text(Math.floor(++counter / 4 * 100));
						// query exchange bay: 143
						hnapi.getTansitSchedule(function (data143) {
							data143 = JSON.parse(data143).nextbus;
							results[counter] = data143;
							results[counter].schedules = data143.schedules.schedule;
							// Update local storage data
							g_transitDetail.m_transitList = results;
							//show and update program list
							g_transitDetail.updateTransitList();
							$$('.preloader-progress').text(Math.floor(++counter / 4 * 100));
							sfuExplorer.hidePreloader();
							sfuExplorer.pullToRefreshDone();
						}, function (error) {
							console.log(error);
						},
						"52807");
					}, function (error) {
						console.log(error);
					},
					"52998");
				}, function (error) {
					console.log(error);
				},
				"53096");
			}, function (error) {
				console.log(error);
			},
			"51861");
		} else {
			hnapi.getTansitSchedule(function (data) {
				data = JSON.parse(data).nextbus;
				if (data instanceof Array) {
					data.forEach(function (obj, index) {
						results[index] = data[index];
						results[index].schedules = data[index].schedules.schedule;
						$$('.preloader-progress').text(Math.floor(index / data.length * 100));
					});
				} else {
					results[0] = data;
					results[0].schedules = data.schedules.schedule;
				}
				// Update local storage data
				g_transitDetail.m_transitList = results;
				g_transitDetail.m_transitCount = data.length;
				//show and update program list
				g_transitDetail.updateTransitList();
				// PTR Done
				sfuExplorer.hidePreloader();
				sfuExplorer.pullToRefreshDone();
			}, function (error) {
				console.log(error);
			},
			g_transitDetail.m_stationId);
		}
	} else {
		// Update T7 data and render home page profs
		g_transitDetail.updateTransitList(results);
	}
	return results;
}*/



transitDetail.prototype.getTransitList = function (refresh) {

	var results = refresh ? [] : g_transitDetail.m_transitList;
	if (results.length === 0) {

        sfuExplorer.showPreloader('Loading: <span class="preloader-progress">0</span> %');

        hnapi.getTansitSchedule(function (data) {

                //Error handling when there's no effect data get from transit link API - Xiaoli
                data = JSON.parse(data).nextbus;

                        if(data == null){

                            setTimeout(terminate, 6000); //after loading for 10 seconds, dialog pop up and close the progress bar - xiaoli
                            function terminate(){
                                alertMsg.render ("The station is unavailable or the network is not good, please try again later.",'Close');
                                sfuExplorer.hidePreloader();
                            }
                        }
                else
                    if (data instanceof Array) {
                        data.forEach(function (obj, index) {
                            results[index] = data[index];
                            results[index].schedules = data[index].schedules.schedule;
                            $$('.preloader-progress').text(Math.floor(index / data.length * 100));
                        });
                    } else {
                        results[0] = data;
                        results[0].schedules = data.schedules.schedule;
                    }
                    // Update local storage data
                    g_transitDetail.m_transitList = results;
                    g_transitDetail.m_transitCount = data.length;
                    //show and update program list
                    g_transitDetail.updateTransitList();
                    // PTR Done
                    sfuExplorer.hidePreloader();
                    sfuExplorer.pullToRefreshDone();
                }, function (error) {
                	sfuExplorer.hidePreloader();
                	alertMsg.render('Failed to load transit details','OK')
                    console.log(error);
                },
                    g_transitDetail.m_stationId);
                    } else {
                        // Update T7 data and render home page profs
                        g_transitDetail.updateTransitList(results);
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
transitDetail.prototype.updateTransitList = function () {
	var now = new Date();
	var nowTime = now.getHours() + ":" + now.getMinutes();
	var transitData = this.m_transitList;
	var tempHTML = "";
	for (var i = 0; i < transitData.length; i++) {
		var transitSchedules = transitData[i].schedules;
		var interval = "";
		tempHTML += "<div class='list-block media-list' style='display: block;'>" +
					"<ul><li class='list-group-title' style='color:black'>" + transitData[i].routeno + "</li>";
					tempHTML += "<li><div class='item-content'><div class='item-inner'>";
		for (var j = 0; j < transitSchedules.length; j++) {
			var expectedTime = transitSchedules[j].expectedleavetime
			var interval = this.timeDifference(nowTime, expectedTime);
	
			if (interval >= 0){
				if (j == 0) {
					tempHTML += "<table class='bordered'>  <thead><tr><th>Next Bus</th><th>Time left</th></tr></thead>"+
								"<tr><td>"+expectedTime+"</td><td>"+interval+" mins left</td></tr>";

				} else if (j == 1) {
					tempHTML += "<tr><td>"+expectedTime+"</td><td>"+interval+" mins left</td></tr>";
				} else {
					tempHTML += "<tr><td>"+expectedTime+"</td><td>"+interval+" mins left</td></tr>"+
"</table>";}
			}
	
		}
		tempHTML +="</div></div></li>";
		tempHTML += "</ul></div>";
	}

	$$('.page[data-page="transitDetail"] .page-content .list-block').html(tempHTML);
}

transitDetail.prototype.timeDifference = function (now, expected) {
	var temp = "";
	var expected = expected.split(" ")[0];
	var ampm = expected.substring(expected.length-2, expected.length)
	expected = expected.substring(0, expected.length-2);
	var expectedArray = expected.split(":");
	var nowArray = now.split(":");

	var expectedDate = new Date();
	var nowDate = new Date();

	if (ampm == "pm" && parseInt(expectedArray[0]) < 12) {
		expectedDate.setHours(parseInt(expectedArray[0]) + 12);
	} else {
		expectedDate.setHours(expectedArray[0]);
	}
	expectedDate.setMinutes(expectedArray[1]);
	nowDate.setHours(nowArray[0]);
	nowDate.setMinutes(nowArray[1]);

	var temp1 = Date.parse(nowDate);
	var temp2 = Date.parse(expectedDate);

	temp = (temp2 - temp1) / (60 * 1000);
	return temp;
}
