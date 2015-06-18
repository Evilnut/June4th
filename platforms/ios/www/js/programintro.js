///////////////////////////////////////////////////////////////////////////////
//
//  Copyright 2013~2014 (C) Evilnut.  All rights reserved.
//
//  Latest Update Date: 2014-10-02
//
////////////////////////////////////////////////////////////////////////////////

/**
* Class	: programIntro 
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
function programIntro() {
	// member varables
	this.m_programList = [];
	this.m_programCount = 0;
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
programIntro.prototype.init = function () {
	// initial fuctions 
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
programIntro.prototype.update = function (refresh) {
	console.log("yaduo g_programIntro update");
	this.getProgramList(refresh);
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
programIntro.prototype.updateProgramList = function () {
	//console.log(JSON.stringify(this.m_programList));
	sfuExplorer.template7Data.programs = this.m_programList
	var tempHTML = Template7.templates.ProgramListScript(this.m_programList);
	$$('.page[data-page="programIntro"] .page-content .list-block').html(tempHTML);
	g_stringHelper.updateUI();
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
programIntro.prototype.getProgramList = function (refresh) {
	var results = refresh ? [] : g_programIntro.m_programList;
	if (results.length === 0) {
		sfuExplorer.showPreloader('Loading School Programs: <span class="preloader-progress">0</span> %');
		hnapi.getProgramList(function (data) {
			data = JSON.parse(data).programs;
			totalProgramsCount = data.length;
			data.forEach(function (obj, index) {
				results[index] = data[index].Program;
				$$('.preloader-progress').text(Math.floor(index / data.length * 100));
			});
			// Clear searchbar
			$$('.searchbar-input input')[0].value = '';
			// Update local storage data
			g_programIntro.m_programList = results;
			g_programIntro.m_programCount = data.length;
			//show and update program list
			g_programIntro.updateProgramList();
			// PTR Done
			sfuExplorer.hidePreloader();
			sfuExplorer.pullToRefreshDone();
		});
		
	}
	else {
		// Update T7 data and render home page profs
		g_programIntro.updateProgramList(results);
	}
	return results;
}

