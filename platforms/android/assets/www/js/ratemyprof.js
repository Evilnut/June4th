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
function rateMyprof() {
	// member varables
	this.m_profList = [];
	this.m_profCount = 0;
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
rateMyprof.prototype.init = function () {
	// initial fuctions 
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
rateMyprof.prototype.update = function (refresh) {
	this.getProfsList(refresh);
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
rateMyprof.prototype.updateProfsList = function () {
	sfuExplorer.template7Data.profs = this.m_profList;
	var tempHTML = Template7.templates.ProfListScript(this.m_profList);
	//$$('.page[data-page="rateMyProf"] .page-content .list-block').html(tempHTML);
	$$('.page[data-page="rateMyProf"] .page-content .list-block').html(tempHTML);
	console.log($$('.page[data-page="rateMyProf"] .page-content .list-block li').length);
	//console.log(tempHTML);
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
rateMyprof.prototype.getProfsList = function (refresh) {


	var results = refresh ? [] : g_rateMyprof.m_profList;
	if (results.length === 0) {
		sfuExplorer.showPreloader('Loading Professors List: <span class="preloader-progress">0</span> %');
		hnapi.getProfList(function (data) {

          //if loading more than 10 seconds, and no data get, terminate the process and alert
            if(data == null){

                setTimeout(terminate, 10000); //after loading for 10 seconds, dialog pop up and close the progress bar - xiaoli
                function terminate(){
                	sfuExplorer.hidePreloader();
                    alertMsg.render ("The network is not good, please try again later.","OK");

                }
            } else {


                data = JSON.parse(data).rateMyprofessors;
                // formate data
                data.forEach(function (obj, index) {
                    results[index] = data[index].RateMyProfessor;
                    // show the Loading Professors percentage
                    $$('.preloader-progress').text(Math.floor(index / data.length * 100));
                });
            }
			// Clear searchbar
			$$('.searchbar-input input')[0].value = '';
			// Update local storage data


			
		g_rateMyprof.m_profList = results;

			g_rateMyprof.m_profCount = data.length;
			//show and update prof list
			g_rateMyprof.updateProfsList();
			// PTR Done
			sfuExplorer.hidePreloader();
			sfuExplorer.pullToRefreshDone();
		}, function (error) {
    		sfuExplorer.hidePreloader();
    		alertMsg.render('Failed to load professor list','OK')
			console.log(error);
		});
	}
	else {
		// Update T7 data and render home page profs
		console.log("profList_result != 0");
		g_rateMyprof.updateProfsList();
	}
	return results;
}
