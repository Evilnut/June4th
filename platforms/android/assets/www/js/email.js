///////////////////////////////////////////////////////////////////////////////
//
//  Copyright 2013~2014 (C) Evilnut.  All rights reserved.
//
//  Latest Update Date: 2014-12-15
//
////////////////////////////////////////////////////////////////////////////////

sfuExplorer.onPageAfterAnimation('email', function (page) {
    isEmailPage = true;

    document.addEventListener("deviceready", onDeviceReady, false);

    // device APIs are available
    //

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
        ref.addEventListener('exit', function(event) { mainView.router.loadPage("index.html");});
      }),
      function(error) {
        var option = 'location=no,closebuttoncaption=Close,clearcache=yes,clearsessioncache=yes';
        var ref = window.open('https://connect.sfu.ca', '_blank', option);
        ref.addEventListener('loaderror', function(event) { alertMsg.render('error: ' + event.message,'Close'); });
        ref.addEventListener('exit', function(event) { mainView.router.loadPage("index.html");});
      }
      , IS_LOGIN);
    }
});
