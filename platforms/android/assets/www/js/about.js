// Initialize your app
var sfuExplorer = new Framework7({
	init: false, //Manual initialization
	animateNavBackIcon: true,
	swipePanel: 'left'
});

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = sfuExplorer.addView('.view-main', {
	// Because we use fixed-through navbar we can enable dynamic navbar
	dynamicNavbar: true
});

//Manual initialization, index page init
sfuExplorer.onPageInit('index', function (page) {
	//Do something here with home page
	console.log("yaduo index page init");
});
sfuExplorer.init();


// Callbacks to run specific code for specific pages, for example for About page:
sfuExplorer.onPageInit('about', function (page) {
    // run createContentPage func after link was clicked
    $$('.create-page').on('click', function () {
        createContentPage();
    });
});


// Show/hide preloader for remote ajax loaded pages
// Probably should be removed on a production/local app
$$(document).on('ajaxStart', function () {
    console.log("yaduo ajaxStart");
    //sfuExplorer.showIndicator();
});
$$(document).on('ajaxComplete', function () {
    console.log("yaduo ajaxComplete");
   // sfuExplorer.hideIndicator();
});

// Generate dynamic page
var dynamicPageIndex = 0;
function createContentPage() {
	mainView.router.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
        '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
        '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
        '  </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="dynamic-pages" class="page">' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '      <div class="content-block">' +
        '        <div class="content-block-inner">' +
        '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
        '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>'
    );
	return;
}