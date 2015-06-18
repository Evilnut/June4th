
sfuExplorer.onPageInit('programIntroMore', function (page) {
	console.log("shit");
	var a = page.url;
	var first = getUrlVars(a)["url"];
 document.addEventListener("deviceready", onDeviceReady, false);

    // device APIs are available
    //
    function onDeviceReady() {
    var ref = window.open(first, '_blank', 'EnableViewPortScale=yes');
    ref.addEventListener('loaderror', function(event) { alertMsg.render('error: ' + event.message,'Close'); });
    ref.addEventListener('exit', function(event) { mainView.router.loadPage("programintro.html");});
    }


});

function getUrlVars(a) {
	var vars = {};
	var parts = a.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		vars[key] = value;
	});
	return vars;
}
