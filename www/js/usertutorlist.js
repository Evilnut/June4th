/*
	 * 
	 * class function for booklist
	 * 
	 */

	function mytutorlist() {
		this.m_mytutorList = [];
		this.m_mytutorCount = 0;
	}

	mytutorlist.prototype.init = function(){
		// initial functions
		console.log("MyTutorList initiated");
	}

	mytutorlist.prototype.update = function (refresh) {
		this.getMyTutorList(refresh);
	}

	mytutorlist.prototype.updateMyTutorList = function() {
		sfuExplorer.template7Data.mytutors = this.m_mytutorList;
		var tempHTML = Template7.templates.MyTutorListScript(this.m_mytutorList);
		$$('.page[data-page="mytutorlist"] .page-content .list-block').html(tempHTML);
		g_stringHelper.updateUI();

	}
	 
	mytutorlist.prototype.getMyTutorList = function (refresh) {
		var results = refresh ? [] : g_mytutorlist.m_mytutorList;
		if (results.length === 0) {
			sfuExplorer.showPreloader('Tutorial List: <span class="preloader-progress">0</span>%');

			/*			$$('.preloader-progress').text("Loading...");
			setTimeout(function(){
				sfuExplorer.hidePreloader();
				if(results.length < 1){
					alertMsg.render('No tutorial found','OK');
				}
				console.log("User tutorials loaded: " + results.length);
			},5000);*/
			results = JSON.parse($.ajax({
				type:'GET',
				url:"http://evilnut.ca/App/APIs/sfu_app/sfuapp/sql/loadmytutorials.php?userID="+g_sfuLogin.m_UID,
				dataType:'json',
				global:false,
				async:false,
				success:function(data){
					$$('.preloader-progress').text("Loading...");
					if(data.length < 1){
/*						alertMsg.confirm("You do not have any post yet. Do you want to create one?", function(){
							console.log("User confirmed to create a tutor post.");
							mainView.router.loadPage("createtutor.html");
						}, function(){
							console.log("User denied to submit a tutor post");
						});*/
						sfuExplorer.hidePreloader();
/*						sfuExplorer.confirm('You do not have any post yet. Do you want to create one?', 'Connect-Ed', function(){
							console.log("User confirmed to create a tutor post.");
							mainView.router.loadPage("createtutor.html");
						}, function(){
							console.log("User denied to submit a tutor post");
						});*/
						alertMsg.render("No post is found","OK");
					}
					else{
						data.forEach(function (obj, index) {
							$$('.preloader-progress').text(Math.floor(index / data.length * 100));
						});
						
					}
					return data;
				},
				error:function(error){
					console.log(error);
					sfuExplorer.hidePreloader();
					alertMsg.render("Network error!","OK");
					return null;
				}
			}).responseText);
				//parseTutorJSON("http://evilnut.ca/App/APIs/sfu_app/sfuapp/sql/loadmytutorials.php?userID="+g_sfuLogin.m_UID);
			sfuExplorer.hidePreloader();
			// Clear searchbar
			$$('.searchbar-input input')[0].value = '';
			// Update local storage data
			g_mytutorlist.m_mytutorList = results;
			g_mytutorlist.m_mytutorCount = results.length;
			//show and update prof list
			g_mytutorlist.updateMyTutorList();
			// PTR Done
			sfuExplorer.pullToRefreshDone();

		}
		else {
			// Update T7 data and render home page
			g_mytutorlist.updateMyTutorList();
			sfuExplorer.pullToRefreshDone();
		}

		return results;
	}
	
/*	function parseTutorJSON(url) {
		 return JSON.parse($.ajax({
		     type: 'GET',
		     url: url,
		     dataType: 'json',
		     global: false,
		     async:false,
		     success: function(data) {
		    	 if(data.length > 0){
					sfuExplorer.hidePreloader();
		    	 }
		         return data;
		     },
		     error: function(error) {
				sfuExplorer.hidePreloader();
		    	alertMsg.render("Network connection error!", "OK");
		    	return;
		     }
		 }).responseText);
	}*/