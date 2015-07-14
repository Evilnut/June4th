/**
* Function   :  searchTutor
*
* Description:  search for a book by using its Book ID and EditKey.   
*
* Author   :    Stephen
*
* Arguments  :  none
*
* Returns:   :  Redirect to edittutor.html upon success.  Returns a warning if request fails
*
* Comments   :  none
*
**/
var searchTutorRequest;

function searchTutor(){

	console.log("searchTutor"); 
    $( document ).ready( function() {

	    /* attach a submit handler to the form */
	    $(document).on("submit","#searchTutor",function(event){
	    
	    //$("#uploadTutor").submit(function(event) {

	        console.log("searchTutor clicked");

	        /* stop form from submitting normally */
	        event.preventDefault();


	                 
	        /* validate the form */
	        var TID = (document.forms["searchTutor"]["TID"].value).trim();
	        if (TID == null || TID == "") {
	            alertMsg.render('Please Enter a Tutor ID','OK');  
	            return false;
	        }

	        var EditKey = document.forms["searchTutor"]["EditKey"].value;
	        if (EditKey == null || EditKey == "") {
	            alertMsg.render('Please Enter an edit key','OK');  
	            return false;
	        }

	        
	        // Abort any pending request
	        if (searchTutorRequest) {
	            searchTutorRequest.abort();
	        }

	        /* get some values from elements on the page: */
	        var $form = $(this);

	        // Let's select and cache all the fields
	        var $inputs = $form.find("input, select, button, textarea");

	        // Serialize the data in the form
	        var serializedData = $form.serialize();  
	        
	             
	        console.log(serializedData);
	        // Let's disable the inputs for the duration of the Ajax request.
	        // Note: we disable elements AFTER the form data has been serialized.
	        // Disabled form elements will not be serialized.
	        $inputs.prop("disabled", true);   



	        /* Send the data using ajax */
	        searchTutorRequest = $.ajax({
	            url: "http://evilnut.ca/App/APIs/sfu_app/sfuapp/sql/searchtutor.php",
	            type: "POST",
	            data: serializedData

	        });


	        /* Put the results in a div */
	        searchTutorRequest.done(function (data){
	        	if(data != ""){
					//book found
					var returnData = JSON.parse(data); 
					console.log(returnData);
	

					sfuExplorer.onPageInit('edittutor', function (page) {
						//console.log("rateMyProf onPageAfterAnimation ");

						$( "input[name=tutorName]").val(returnData["Name"]);
						$( "input[name=tutorCourse]").val(returnData["Course"]);
						$( "textarea[name=tutorDesc]").val(returnData["Description"]);  
						$( "input[name=telephone]").val(returnData["Telephone"]);
						$( "input[name=email]").val(returnData["Email"]);                          

					});
					
					mainView.router.loadPage("edittutor.html");

				}else{
	            	//no book found
	            
	           		sfuExplorer.alert("Could not find the tutor with this edit key",'SFU Exploerer');
	      		}
	        });


	        // Callback handler that will be called on failure
	        searchTutorRequest.fail(function (jqXHR, textStatus, errorThrown){
	            // Log the error to the console
	            console.error(
	                "The following error occurred: "+
	                textStatus, errorThrown
	            );
	        });


	        // Callback handler that will be called regardless
	        // if the request failed or succeeded
	        searchTutorRequest.always(function () {
	            // Reenable the inputs
	            $inputs.prop("disabled", false);

	        });



	        
	    });
 	});
    //return false to avoid form from submitting normally
    return false;
}