/*
 *   Upload any form with both files and textfield content
 *   Reference: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest#Submitting_forms_and_uploading_files
 *
 */
"use strict";

/*\
|*|
|*|  :: XMLHttpRequest.prototype.sendAsBinary() Polyfill ::
|*|
|*|  https://developer.mozilla.org/en-US/docs/DOM/XMLHttpRequest#sendAsBinary()
\*/

if (!XMLHttpRequest.prototype.sendAsBinary) {
  XMLHttpRequest.prototype.sendAsBinary = function(sData) {
    var nBytes = sData.length, ui8Data = new Uint8Array(nBytes);
    for (var nIdx = 0; nIdx < nBytes; nIdx++) {
      ui8Data[nIdx] = sData.charCodeAt(nIdx) & 0xff;
    }
    /* send as ArrayBufferView...: */
    this.send(ui8Data);
    /* ...or as ArrayBuffer (legacy)...: this.send(ui8Data.buffer); */
  };
}

/*\
|*|
|*|  :: AJAX Form Submit Framework ::
|*|
|*|  https://developer.mozilla.org/en-US/docs/DOM/XMLHttpRequest/Using_XMLHttpRequest
|*|
|*|  This framework is released under the GNU Public License, version 3 or later.
|*|  http://www.gnu.org/licenses/gpl-3.0-standalone.html
|*|
|*|  Syntax:
|*|
|*|   AJAXSubmit(HTMLFormElement);
\*/



var AJAXSubmit = (function () {

  function ajaxSuccess () {
    /* console.log("AJAXSubmit - Success!"); */
    //alert(this.responseText);
    /* you can get the serialized data through the "submittedData" custom property: */
    // alert(JSON.stringify(this.submittedData)); 


    /* display the return ID and editkey of the uploadBook post */
    var returnData = JSON.parse(this.responseText); //returns an array of JSON object
    console.log (returnData);

    var response = returnData[0];
    var ID = response["ID"];
    var EditKey = response["EditKey"];
    // console.log (ID);
    // console.log (EditKey);

    /* will only be display in createbook.html */
    $( "#bookReturnID" ).html(ID);
    $( "#bookEditKey" ).html(EditKey);   

    /* will only be display in createtutor.html */
    $( "#tutorReturnID" ).html(ID);
    $( "#tutorEditKey" ).html(EditKey); 

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

    sfuExplorer.alert("Your submission was succesful! Book ID: " + ID + " EditKey: "+ EditKey,'SFU Exploerer');
    mainView.router.back();
    //alertMsg.render('Submitted','OK');
  }

  function submitData (oData) {
    /* the AJAX request... */
    var oAjaxReq = new XMLHttpRequest();
    oAjaxReq.submittedData = oData;
    oAjaxReq.onload = ajaxSuccess;
    if (oData.technique === 0) {
      /* method is GET */
      oAjaxReq.open("get", oData.receiver.replace(/(?:\?.*)?$/, oData.segments.length > 0 ? "?" + oData.segments.join("&") : ""), true);
      oAjaxReq.send(null);
    } else {
      /* method is POST */
      oAjaxReq.open("post", oData.receiver, true);
      if (oData.technique === 3) {
        /* enctype is multipart/form-data */
        var sBoundary = "---------------------------" + Date.now().toString(16);
        oAjaxReq.setRequestHeader("Content-Type", "multipart\/form-data; boundary=" + sBoundary);
        oAjaxReq.sendAsBinary("--" + sBoundary + "\r\n" + oData.segments.join("--" + sBoundary + "\r\n") + "--" + sBoundary + "--\r\n");
      } else {
        /* enctype is application/x-www-form-urlencoded or text/plain */
        oAjaxReq.setRequestHeader("Content-Type", oData.contentType);
        oAjaxReq.send(oData.segments.join(oData.technique === 2 ? "\r\n" : "&"));
      }
    }
  }

  function processStatus (oData) {
    if (oData.status > 0) { return; }
    /* the form is now totally serialized! do something before sending it to the server... */
    /* doSomething(oData); */
    /* console.log("AJAXSubmit - The form is now serialized. Submitting..."); */
    submitData (oData);
  }

  function pushSegment (oFREvt) {
    this.owner.segments[this.segmentIdx] += oFREvt.target.result + "\r\n";
    this.owner.status--;
    processStatus(this.owner);
  }

  function plainEscape (sText) {
    /* how should I treat a text/plain form encoding? what characters are not allowed? this is what I suppose...: */
    /* "4\3\7 - Einstein said E=mc2" ----> "4\\3\\7\ -\ Einstein\ said\ E\=mc2" */
    return sText.replace(/[\s\=\\]/g, "\\$&");
  }

  function SubmitRequest (oTarget) {
    var nFile, sFieldType, oField, oSegmReq, oFile, bIsPost = oTarget.method.toLowerCase() === "post";
    /* console.log("AJAXSubmit - Serializing form..."); */
    this.contentType = bIsPost && oTarget.enctype ? oTarget.enctype : "application\/x-www-form-urlencoded";
    this.technique = bIsPost ? this.contentType === "multipart\/form-data" ? 3 : this.contentType === "text\/plain" ? 2 : 1 : 0;
    this.receiver = oTarget.action;
    this.status = 0;
    this.segments = [];
    var fFilter = this.technique === 2 ? plainEscape : escape;
    for (var nItem = 0; nItem < oTarget.elements.length; nItem++) {
      oField = oTarget.elements[nItem];
      if (!oField.hasAttribute("name")) { continue; }
      sFieldType = oField.nodeName.toUpperCase() === "INPUT" ? oField.getAttribute("type").toUpperCase() : "TEXT";
      if (sFieldType === "FILE" && oField.files.length > 0) {
        if (this.technique === 3) {
          /* enctype is multipart/form-data */
          for (nFile = 0; nFile < oField.files.length; nFile++) {
            oFile = oField.files[nFile];
            oSegmReq = new FileReader();
            /* (custom properties:) */
            oSegmReq.segmentIdx = this.segments.length;
            oSegmReq.owner = this;
            /* (end of custom properties) */
            oSegmReq.onload = pushSegment;
            this.segments.push("Content-Disposition: form-data; name=\"" + oField.name + "\"; filename=\""+ oFile.name + "\"\r\nContent-Type: " + oFile.type + "\r\n\r\n");
            this.status++;
            oSegmReq.readAsBinaryString(oFile);
          }
        } else {
          /* enctype is application/x-www-form-urlencoded or text/plain or method is GET: files will not be sent! */
          for (nFile = 0; nFile < oField.files.length; this.segments.push(fFilter(oField.name) + "=" + fFilter(oField.files[nFile++].name)));
        }
      } else if ((sFieldType !== "RADIO" && sFieldType !== "CHECKBOX") || oField.checked) {
        /* field type is not FILE or is FILE but is empty */
        this.segments.push(
          this.technique === 3 ? /* enctype is multipart/form-data */
            "Content-Disposition: form-data; name=\"" + oField.name + "\"\r\n\r\n" + oField.value + "\r\n"
          : /* enctype is application/x-www-form-urlencoded or text/plain or method is GET */
            fFilter(oField.name) + "=" + fFilter(oField.value)
        );
      }
    }
    processStatus(this);
  }

  return function (oFormElement) {
    if (!oFormElement.action) { return; }
    new SubmitRequest(oFormElement);
  };

})();



function submitBookForm(){
    console.log("submitBookForm..");

    /* validate the form */
    var bookName = (document.forms["uploadBook"]["bookName"].value).trim();
    if (bookName == null || bookName == "") {
        alertMsg.render('Book Name must not be empty','OK');  
        return false;
    }

    var seller = (document.forms["uploadBook"]["seller"].value).trim();
    if (seller == null || seller == "") {
        alertMsg.render('Seller must not be empty','OK');  
        return false;
    }

    var currentPrice = document.forms["uploadBook"]["CurrentPrice"].value;
    if (currentPrice == null || currentPrice == "") {
        alertMsg.render('CurrentPrice must not be empty','OK');  
        return false;
    }

    var email = document.forms["uploadBook"]["email"].value;
    if (email == null || email == "") {
        alertMsg.render('Email must not be empty','OK');
        return false;
    }

    var telephone = document.forms["uploadBook"]["telephone"].value;
    if (telephone == null || telephone == "") {
        alertMsg.render('Telephone must not be empty','OK');
        return false;
    }

    var originalPrice = document.forms["uploadBook"]["OriginalPrice"].value;
    //var bookAuthor = document.forms["uploadBook"]["bookAuthor"].value;
    //var bookEdition = document.forms["uploadBook"]["bookEdition"].value;        

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
    $( "#bookUserID" ).val(g_sfuLogin.m_UID);  





    AJAXSubmit(document.getElementById("uploadBook"));

    return false;
}