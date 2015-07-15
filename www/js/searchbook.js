/**
* Function   :  searchBook
*
* Description:  search for a book by using its Book ID and EditKey.   
*
* Author   :    Stephen
*
* Arguments  :  none
*
* Returns:   :  Redirect to editbook.html upon success.  Returns a warning if request fails
*
* Comments   :  none
*
**/
var searchBookRequest;
function searchBook(){

	console.log("searchBook"); 
    $( document ).ready( function() {

	    /* attach a submit handler to the form */
	    $(document).on("submit","#searchBook",function(event){
	    
	    //$("#uploadTutor").submit(function(event) {

	        console.log("searchBook clicked");

	        /* stop form from submitting normally */
	        event.preventDefault();


	                 
	        /* validate the form */
	        var BID = (document.forms["searchBook"]["BID"].value).trim();
	        if (BID == null || BID == "") {
	            alertMsg.render('Please Enter a book ID','OK');  
	            return false;
	        }

	        var EditKey = document.forms["searchBook"]["EditKey"].value;
	        if (EditKey == null || EditKey == "") {
	            alertMsg.render('Please Enter an edit key','OK');  
	            return false;
	        }

	        
	        // Abort any pending request
	        if (searchBookRequest) {
	            searchBookRequest.abort();
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
	        searchBookRequest = $.ajax({
	            url: "http://evilnut.ca/App/APIs/sfu_app/sfuapp/sql/searchbook.php",
	            type: "POST",
	            data: serializedData

	        });


	        /* Put the results in a div */
	        searchBookRequest.done(function (data){
	        	if(data != ""){
					//book found

					var returnData = JSON.parse(data); 
					console.log(returnData);
	

					sfuExplorer.onPageInit('editbook', function (page) {
						//console.log("rateMyProf onPageAfterAnimation ");

						$( "input[name=bookName]").val(returnData["Name"]);
						$( "input[name=bookAuthor]").val(returnData["Author"]);
						$( "input[name=seller]").val(returnData["Seller"]);
						$( "input[name=bookEdition]").val(returnData["Edition"]); 
						$( "textarea[name=bookDesc]").val(returnData["Description"]);  
						$( "input[name=OriginalPrice]").val(returnData["OriginalPrice"]);
						$( "input[name=CurrentPrice]").val(returnData["CurrentPrice"]);
						$( "input[name=telephone]").val(returnData["Telephone"]);
						$( "input[name=email]").val(returnData["Email"]);                          
						$( "input[name=BID]").val(returnData["ID"]); 
					});
					
					mainView.router.loadPage("editbook.html");

				}else{
	            	//no book found
	    	        sfuExplorer.alert("Could not find the book with this edit key",'SFU Exploerer');
		
				}
	        });


	        // Callback handler that will be called on failure
	        searchBookRequest.fail(function (jqXHR, textStatus, errorThrown){
	            // Log the error to the console
	            console.error(
	                "The following error occurred: "+
	                textStatus, errorThrown
	            );
	        });


	        // Callback handler that will be called regardless
	        // if the request failed or succeeded
	        searchBookRequest.always(function () {
	            // Reenable the inputs
	            $inputs.prop("disabled", false);

	        });



	        
	    });
 	});
    //return false to avoid form from submitting normally
    return false;
}