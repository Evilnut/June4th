///////////////////////////////////////////////////////////////////////////////
//
//  Copyright 2013~2014 (C) Evilnut.  All rights reserved.
//
//  Latest Update Date: 2014-10-02
//
////////////////////////////////////////////////////////////////////////////////


//Framwork Initialization
var sfuExplorer = new Framework7({
	init: false, //Manual initialization
	animateNavBackIcon: true,
	precompileTemplates: true,
	template7Pages: true
});

// Export selectors engine
var $$ = Dom7;

// registerHelper Template7
Template7.registerHelper('array_length', function (arr) {
	return arr ? arr.length : 0;
});

// Add view
var mainView = sfuExplorer.addView('.view-main', {
	dynamicNavbar: true
});

function prefStoreSuccess(value) {
  console.log("Preference Store Success with Value: " + value);
}

function prefFail(error) {
  console.log("Preference Operation Failed");
}

function fetchKey(key) {
  console.log("Preference Fetch Success with Key: " + key);
}

var IS_REMEMBER = false;
var IS_LOGIN = "is_login";
var STD_NAME = "std_name";
var STD_ID = "std_id";
var CMPT_ID = "cmpt_id";
var PASSWORD = 'password';
