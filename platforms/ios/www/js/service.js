sfuExplorer.onPageInit('service', function (page) {

    console.log("hi");



	$$( "#connect" ).click(function() {
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
        ref.addEventListener('exit', function(event) { mainView.router.loadPage("service.html");});
      }),
      function(error) {
        var option = 'location=no,closebuttoncaption=Close,clearcache=yes,clearsessioncache=yes';
        var ref = window.open('https://connect.sfu.ca', '_blank', option);
        ref.addEventListener('loaderror', function(event) { alertMsg.render('error: ' + event.message,'Close'); });
        ref.addEventListener('exit', function(event) { mainView.router.loadPage("service.html");});
      }
      , IS_LOGIN);
    }
});

  $$( "#canvas" ).click(function() {
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
        ref.addEventListener('exit', function(event) { mainView.router.loadPage("service.html");});
      }),
      function(error) {
        var option = 'location=no,closebuttoncaption=Close,clearcache=yes,clearsessioncache=yes';
        var ref = window.open('https://canvas.sfu.ca', '_blank', option);
        ref.addEventListener('loaderror', function(event) { alertMsg.render('error: ' + event.message,'Close'); });
        ref.addEventListener('exit', function(event) { mainView.router.loadPage("service.html");});
      }
      , IS_LOGIN);
    }
});

  $$( "#sis" ).click(function() {
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
        ref.addEventListener('exit', function(event) { mainView.router.loadPage("service.html");});
      }),
      function(error) {
        var option = 'location=no,closebuttoncaption=Close,clearcache=yes,clearsessioncache=yes';
        var ref = window.open('https://sis.sfu.ca', '_blank', option);
        ref.addEventListener('loaderror', function(event) { alertMsg.render('error: ' + event.message,'Close'); });
        ref.addEventListener('exit', function(event) { mainView.router.loadPage("service.html");});
      }
      , IS_LOGIN);
    }
});



});