
var g_stringHelper = new stringHelper();
var g_langAvailable = ["en", "fr", "ja"];

/////////////////////////////////////////////////////////////////////////////
//
//   Function   :	stringHelper
//
//   Description:	An object that will contain string updates for different languages
//
//   Arguments  :	none
//
//   Returns:   :	none
//
//   Comments   :	none
//
/////////////////////////////////////////////////////////////////////////////
function stringHelper() {
	var strings;
	this.m_curLang = "en";
}

/////////////////////////////////////////////////////////////////////////////
//
//   Function   :	stringHelper.init
//
//   Description:	Loads the proper string table based on the browser reported language
//
//   Arguments  :	none
//
//   Returns:   :	none
//
//   Comments   :	none
//
/////////////////////////////////////////////////////////////////////////////
stringHelper.prototype.init = function()
{
	var str = this.m_curLang;
	str = "js/Lang/strings_" + str + ".json";

	// Load the proper date script depending on detected language
	var script = document.createElement('script');
	script.type = 'text/javascript';
	//script.src = "script/Date/date-" + str + ".js";
	document.getElementsByTagName('head')[0].appendChild(script);

	$.ajax({
		dataType: 'json',
		url: str,
		success: function (data) {
			g_stringHelper.strings = data;
			g_stringHelper.updateUI();
		},
		error: function (xhr) {
			console.log(xhr);
		},
	});
}

/////////////////////////////////////////////////////////////////////////////
//
//   Function   :	stringHelper.updateUI
//
//   Description:	Finds all appropriate str* tags and updates their value
//
//   Arguments  :	none
//
//   Returns:   :	none
//
//   Comments   :	none
//
/////////////////////////////////////////////////////////////////////////////
stringHelper.prototype.updateUI = function()
{
	$('[class^="str"]').each(function()
	{
		//console.log($(this).attr('class'));
		try
		{
			$(this).text(parent.g_stringHelper.loadString($(this).attr('class')));
		}
		catch (e)
		{
			console.log('updateUI() Failure');
		}
	});
}

/////////////////////////////////////////////////////////////////////////////
//
//   Function   :	stringHelper.loadString
//
//   Description:	Dynamically updates specific strings when called
//
//   Arguments  :	strId - The id of the string to be used
//
//   Returns:   :	none
//
//   Comments   :	none
//
/////////////////////////////////////////////////////////////////////////////
stringHelper.prototype.loadString = function (strId)
{
	//console.log("sdfasdf " + strId);
	var string = "";
	try
	{
		string = eval('this.strings.' + strId);
	}
	catch (e)
	{
		string = strId;
	}

	return string;
}

/////////////////////////////////////////////////////////////////////////////
//
//   Function   :	format
//
//   Description:	Dynamically updates specific strings when called
//
//   Arguments  :	strId - The id of the string to be used
//
//   Returns:   :	none
//
//   Comments   :	e.g. "{0} is dead, but {1} is alive! {0} {2}".format("ASP", "ASP.NET")
//  http://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format/4673436#4673436
//
/////////////////////////////////////////////////////////////////////////////
String.prototype.format = function()
{
	var args = arguments;
	return this.replace(/{(\d+)}/g, function(match, number)
	{
		return typeof args[number] != 'undefined'
      ? args[number]
      : match
    ;
	});
};