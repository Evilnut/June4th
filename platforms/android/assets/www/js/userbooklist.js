/*
	 * 
	 * class function for booklist
	 * 
	 */

	function mybooklist() {
		this.m_mybookList = [];
		this.m_mybookCount = 0;
	}

	mybooklist.prototype.init = function(){
		// initial functions
		console.log("MyBookList initiated");
	}

	mybooklist.prototype.update = function (refresh) {
		this.getMyBookList(refresh);
	}

	mybooklist.prototype.updateMyBookList = function() {
		sfuExplorer.template7Data.mybooks = this.m_mybookList;
		var tempHTML = Template7.templates.MyBookListScript(this.m_mybookList);
		$$('.page[data-page="mybooklist"] .page-content .list-block').html(tempHTML);
		g_stringHelper.updateUI();

	}
	
/*	function postCreate(){
		sfuExplorer.confirm('You do not have any post. Do you want to create one?', 'Connect-Ed', 
			      function () {
			        //sfuExplorer.alert('You clicked Ok button');
			        console.log("User creates a book post");
			        mainView.router.loadPage("createbook.html");
			      },
			      function () {
			    	  // Do nothing
			        //sfuExplorer.alert('You clicked Cancel button');
			    	  console.log("User canceled");
			      }
			    );
	} */
	 
	mybooklist.prototype.getMyBookList = function (refresh) {
		var results = refresh ? [] : g_mybooklist.m_mybookList;
		if (results.length === 0) {
			// 	$.getJSON(bookListURL, function(data) { 	
			sfuExplorer.showPreloader('Used Books List: <span class="preloader-progress">0</span>');

			results = JSON.parse($.ajax({
				type:'GET',
				url:"http://evilnut.ca/App/APIs/sfu_app/sfuapp/sql/loadmybooks.php?userID="+g_sfuLogin.m_UID,
				dataType:'json',
				global:false,
				async:false,
				success:function(data){
					if(data.length < 1){
						sfuExplorer.hidePreloader();
						/*sfuExplorer.confirm('You do not have any post. Do you want to create one?', 'Connect-Ed', 
							      function () {
							        //sfuExplorer.alert('You clicked Ok button');
							        console.log("User creates a book post");
							        mainView.router.loadPage("createbook.html");
							      },
							      function () {
							    	  // Do nothing
							        //sfuExplorer.alert('You clicked Cancel button');
							    	  console.log("User canceled");
							      }
							    );*/
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
			
			// Clear searchbar
			$$('.searchbar-input input')[0].value = '';
			sfuExplorer.hidePreloader();
			// Update local storage data
			console.log(results);
			g_mybooklist.m_mybookList = results;
			g_mybooklist.m_mybookCount = results.length;
			//show and update prof list
			g_mybooklist.updateMyBookList();
			// PTR Done
			sfuExplorer.pullToRefreshDone();
		}
		else {
			// Update T7 data and render home page
			g_mybooklist.updateMyBookList();
		}
		return results;
	}