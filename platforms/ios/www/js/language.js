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
function Language() {
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
Language.prototype.init = function () {
	// initial fuctions
	console.log("yaduo Language init");
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
Language.prototype.update = function () {
	// initial fuctions 
	console.log("yaduo Language init");

	$$("#chineseLabel").on('click', function () {
		g_stringHelper.m_curLang = "ch";
		g_stringHelper.init();
		mainView.router.loadPage("index.html");

	});
	$$("#englishLabel").on('click', function () {
		g_stringHelper.m_curLang = "en";
		g_stringHelper.init();
		mainView.router.loadPage("index.html");
	});
}