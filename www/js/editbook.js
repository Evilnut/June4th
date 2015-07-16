/**
* Description:	validate the form data from editbook.html and send it to	  
*				the server with AJAXSUBMIT
* Comments   :	none
* 
**/

function editBookForm(){
    console.log("editBookForm..");

    /* validate the form */
    var bookName = (document.forms["editBook"]["bookName"].value).trim();
    if (bookName == null || bookName == "") {
        alertMsg.render('Book Name must not be empty','OK');  
        return false;
    }

    var seller = (document.forms["editBook"]["seller"].value).trim();
    if (seller == null || seller == "") {
        alertMsg.render('Seller must not be empty','OK');  
        return false;
    }

    var currentPrice = document.forms["editBook"]["CurrentPrice"].value;
    if (currentPrice == null || currentPrice == "") {
        alertMsg.render('CurrentPrice must not be empty','OK');  
        return false;
    }

    var email = document.forms["editBook"]["email"].value;
    if (email == null || email == "") {
        alertMsg.render('Email must not be empty','OK');
        return false;
    }

    var telephone = document.forms["editBook"]["telephone"].value;
    if (telephone == null || telephone == "") {
        alertMsg.render('Telephone must not be empty','OK');
        return false;
    }

    var originalPrice = document.forms["editBook"]["OriginalPrice"].value;
        

    if( !(originalPrice == null || originalPrice == "")){
        var originalPriceRegex = /[0-9.]+/;
        if( !originalPriceRegex.test(originalPrice))
        {
            alertMsg.render('Please enter the Original Price in the correct format [dollar_value] e.g. 100','OK');
            return false;
        }

    }

    var currentPriceRegex = /[0-9.]+/;
    if( !currentPriceRegex.test(currentPrice))
    {
        alertMsg.render('Please enter the Current Price in the correct format [dollar_value] e.g. 100','OK');
        return false;
    }

    var telephoneRegex = /[0-9]{10,15}/;
    if( !telephoneRegex.test(telephone))
    {
        alertMsg.render('Please enter a valid 10 digit phone number','OK');
        return false;
    }

    var emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if( !emailRegex.test(email))
    {
        alertMsg.render('Please enter a valid email address','OK');
        return false;
    }

  /* set the value for UserName hidden input.  Used for createbook1.php to update user table*/
    $( "#bookUserID" ).val(g_sfuLogin.m_computerID);  




 /* Implementation of AJAXSubmit can be found in createbook.js */
    AJAXSubmit(document.getElementById("editBook"));

    return false;
}


function deleteBookForm(){
	
	var BID = document.getElementById("bookID").value;

	console.log("deleteBookForm"); 
    sfuExplorer.confirm('Are you sure you want to delete?', 'SFU Exploerer', 
        function () {
            //Ok button clicked
            hnapi.deleteBook(function (data) {
                console.log (data);

				/* empty all the input field except the hidden username input*/    
				$( "input[name=bookName]").val("");
				$( "input[name=bookAuthor]").val("");
				$( "input[name=seller]").val("");
				$( "input[name=bookEdition]").val(""); 
				$( "textarea[name=bookDesc]").val("");  
				$( "input[name=OriginalPrice]").val("");
				$( "input[name=CurrentPrice]").val("");
				$( "input[name=telephone]").val("");
				$( "input[name=email]").val("");                     

                //call the custom alert message function
                //alertMsg.render("Your submission was succesful!  Tutor ID: " + ID + " EditKey: "+ EditKey,'OK');  
                sfuExplorer.alert("Your book post is successfully deleted",'SFU Explorer');
                g_bookList.update(true);
                g_mybooklist.update(true);
                mainView.router.back();

            }, function (error) {
                console.log(error);
            },
                // Book ID you want to delete
            	BID
            	
            );
        },
        function () {
            //Cancel button clicked
            //sfuExplorer.alert('You clicked Cancel button');
            console.log("User canceled delete");
        }
    );           
    console.log("1. "+BID);


}