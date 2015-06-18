
sfuExplorer.onPageAfterAnimation('newsDetail', function (page) {
	var a = page.url;
	var first = getUrlVars(a)["url"];
    document.addEventListener("deviceready", onDeviceReady, false);

    // device APIs are available
    //
    function onDeviceReady() {
    var ref = window.open(first, '_blank', 'EnableViewPortScale=yes,location=no,closebuttoncaption=Close');
    ref.addEventListener('loaderror', function(event) { alertMsg.render('error: ' + event.message,'Close'); });
    ref.addEventListener('exit', function(event) { mainView.router.loadPage("news.html");});
    }

});

function getUrlVars(a) {
	var vars = {};
	var parts = a.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		vars[key] = value;
	});
	return vars;
}
