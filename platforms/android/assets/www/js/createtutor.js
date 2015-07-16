
var tutorRequest;

function submitTutorForm(){
     $( document ).ready( function() {


        console.log("submitTutorForm.."); 

        /* attach a submit handler to the form */
        $(document).on("submit","#uploadTutor",function(event){
        
        //$("#uploadTutor").submit(function(event) {

            console.log("uploadTutor");

            /* stop form from submitting normally */
            event.preventDefault();


                     
            /* validate the form */
            var tutorName = (document.forms["uploadTutor"]["tutorName"].value).trim();
            if (tutorName == null || tutorName == "") {
                alertMsg.render('Name must not be empty','OK');  
                return false;
            }

            var tutorCourse = document.forms["uploadTutor"]["tutorCourse"].value;
            if (tutorCourse == null || tutorCourse == "") {
                alertMsg.render('Course must not be empty','OK');  
                return false;
            }

            var email = document.forms["uploadTutor"]["email"].value;
            if (email == null || email == "") {
                alertMsg.render('Email must not be empty','OK');
                return false;
            }

            var telephone = document.forms["uploadTutor"]["telephone"].value;
            if (telephone == null || telephone == "") {
                alertMsg.render('Telephone must not be empty','OK');
                return false;
            }

            var tutorCourseRegex = /^[A-Za-z ]+[0-9]+.$/;
            if( !tutorCourseRegex.test(tutorCourse))
            {
                alertMsg.render('Please enter a valid course ID e.g Math100','OK');
                return false;
            }

            var emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            if( !emailRegex.test(email))
            {
                alertMsg.render('Please enter a valid email address','OK');
                return false;
            }

            var telephoneRegex = /[0-9]{10,15}/;
            if( !telephoneRegex.test(telephone))
            {
                alertMsg.render('Please enter a valid 10 digit phone number','OK');
                return false;
            }




            // Abort any pending request
            if (tutorRequest) {
                tutorRequest.abort();
            }

            /* get some values from elements on the page: */
            var $form = $(this);

            // Let's select and cache all the fields
            var $inputs = $form.find("input, select, button, textarea");

            // Serialize the data in the form
            var serializedData = $form.serialize();  
            serializedData = serializedData+"&userID="+g_sfuLogin.m_UID;
                 
            console.log(serializedData);
            // Let's disable the inputs for the duration of the Ajax request.
            // Note: we disable elements AFTER the form data has been serialized.
            // Disabled form elements will not be serialized.
            $inputs.prop("disabled", true);   
  


            /* Send the data using ajax */
            tutorRequest = $.ajax({
                url: "http://evilnut.ca/App/APIs/sfu_app/sfuapp/sql/createtutor1.php",
                type: "POST",
                data: serializedData

            });


            /* Put the results in a div */
            tutorRequest.done(function (data){
                var returnData = JSON.parse(data); //returns an array of Json object
                console.log (returnData);

                var response = returnData[0];
                var ID = response["ID"];
                var EditKey = response["EditKey"];
                console.log (ID);
                console.log (EditKey);
        

                $( "#tutorReturnID" ).html(ID);
                $( "#tutorEditKey" ).html(EditKey);  

                /* empty all the input field */  
                $( "input[name=tutorName]").val("");
                $( "input[name=tutorCourse]").val("");
                $( "input[name=email]").val("");
                $( "input[name=telephone]").val(""); 
                $( "textarea[name=tutorDesc]").val("");                       

                //call the custom alert message function
                //alertMsg.render("Your submission was succesful!  Tutor ID: " + ID + " EditKey: "+ EditKey,'OK');  
                sfuExplorer.alert("Your submission was succesful! Tutor ID: " + ID + " EditKey: "+ EditKey,'SFU Exploerer');
                mainView.router.back();
            });


            // Callback handler that will be called on failure
            tutorRequest.fail(function (jqXHR, textStatus, errorThrown){
                // Log the error to the console
                console.error(
                    "The following error occurred: "+
                    textStatus, errorThrown
                );
            });


            // Callback handler that will be called regardless
            // if the request failed or succeeded
            tutorRequest.always(function () {
                // Reenable the inputs
                $inputs.prop("disabled", false);

            });



        });
    });

    //return false to avoid form from submitting normally
    return false;
}


/* 
 * another way to submit tutor form
 * Implementation of AJAXSubmit can be found in createbook.js
 */
function submitTutorForm2(){
    console.log("submitTutorForm2");
    AJAXSubmit(document.getElementById("uploadTutor"));

    return false;
}