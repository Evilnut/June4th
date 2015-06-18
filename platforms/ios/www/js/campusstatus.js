///////////////////////////////////////////////////////////////////////////////
//
//  Copyright 2013~2014 (C) Evilnut.  All rights reserved.
//
//  Latest Update Date: 2014-10-02
//
////////////////////////////////////////////////////////////////////////////////


/**
* Class	: campusStatus 
*
* Description:	campus Status page Class		
*
* member variables  :	[string] m_burnabyStatus  
*					:	[string] m_surreystatus 
*					:	[string] m_downtownStatus  
*
* Author   :	Luke
*
* Comments   :	none
* 
**/
function campusStatus() {
	// member varables
	this.m_burnabyStatus;
	this.m_surreystatus;
	this.m_downtownStatus;
}

/**
* Function   :	init
*
* Description:	campusStatus Page init 		
*
* Author   :	Luke
*
* Arguments  :	none
* 
* Returns:   :	none
*
* Comments   :	none
* 
**/
campusStatus.prototype.init = function () {
	// initial fuctions 
	this.m_burnabyStatus = "unknown";
	this.m_surreystatus = "unknown";
	this.m_downtownStatus = "unknown";
}


/**
* Function   :	update
*
* Description:	campusStatus Page Update 		
*
* Author   :	Luke
*
* Arguments  :	none
* 
* Returns:   :	none
*
* Comments   :	none
* 
**/
campusStatus.prototype.update = function () {
	//alert("g_campusStatus update");
	this.updateStatus();
	this.updateWeather();
	this.updateComputer();
	sfuExplorer.pullToRefreshDone();
}

/**
* Function   :	updateWeather
*
* Description:	Update campusStatus Weather		
*
* Author   :	Luke
*
* Arguments  :	none
* 
* Returns:   :	none
*
* Comments   :	none
* 
**/
campusStatus.prototype.updateWeather = function () {
	//woeid 24445819 	55963114		24460288
	var burnabyCurrent, surreyCurrent, downtownCurrent; // Current weather
	$.ajax({
		dataType: 'jsonp',
		url: "http://api.lib.sfu.ca/weather/forecast?key=&lat=&long=&location=Burnaby",
		success: function (data) {
			burnabyCurrent = data.currently;
			switch(burnabyCurrent.icon) {
    			case "clear-night":
    				var iconUrl = "clear-night"
        			break;
    			case "cloudy":
    				var iconUrl = "cloudy"
        			break;
    			case "icon_fog":
    				var iconUrl = "icon_fog"
        			break;
        		case "icon_shower":
    				var iconUrl = "icon_shower"
        			break;
    			case "icon_snow":
    				var iconUrl = "icon_snow"
        			break;
				case "icon_sun":
    				var iconUrl = "icon_sun"
        			break;
				case "partly-cloudy-day":
    				var iconUrl = "partly-cloudy-day"
        			break;
				case "rain":
    				var iconUrl = "rain"
        			break;
    			default:
    				var iconUrl = "partly-cloudy-day"
			} 
			
			$("#burnabyIcon").css("background-image", "url(img/weather/" + iconUrl + ".png)");
			$("#burnabyDeg").html(burnabyCurrent.temperature + "&deg;C");
			$("#burnabyTxt").html(burnabyCurrent.summary);
		}
	});

	$.ajax({
		dataType: 'jsonp',
		url: "http://api.lib.sfu.ca/weather/forecast?key=&lat=49.187559&long=-122.849545",
		success: function (data) {
			surreyCurrent = data.currently;
			switch(surreyCurrent.icon) {
    			case "clear-night":
    				var iconUrl = "clear-night"
        			break;
    			case "cloudy":
    				var iconUrl = "cloudy"
        			break;
    			case "icon_fog":
    				var iconUrl = "icon_fog"
        			break;
        		case "icon_shower":
    				var iconUrl = "icon_shower"
        			break;
    			case "icon_snow":
    				var iconUrl = "icon_snow"
        			break;
				case "icon_sun":
    				var iconUrl = "icon_sun"
        			break;
				case "partly-cloudy-day":
    				var iconUrl = "partly-cloudy-day"
        			break;
				case "rain":
    				var iconUrl = "rain"
        			break;
    			default:
    				var iconUrl = "partly-cloudy-day"
			} 
			$("#surreyIcon").css("background-image", "url(img/weather/" + iconUrl + ".png)");
			var fake = parseInt(surreyCurrent.temperature) + 1.2;
			$("#surreyDeg").html(fake + "&deg;C");
			$("#surreyTxt").html(surreyCurrent.summary);
		}
	});


	$.ajax({
		dataType: 'jsonp',
		url: "http://api.lib.sfu.ca/weather/forecast?key=&lat=49.280481&long=-123.109499&location=",
		success: function (data) {
			downtownCurrent = data.currently;
			switch(downtownCurrent.icon) {
    			case "clear-night":
    				var iconUrl = "clear-night"
        			break;
    			case "cloudy":
    				var iconUrl = "cloudy"
        			break;
    			case "icon_fog":
    				var iconUrl = "icon_fog"
        			break;
        		case "icon_shower":
    				var iconUrl = "icon_shower"
        			break;
    			case "icon_snow":
    				var iconUrl = "icon_snow"
        			break;
				case "icon_sun":
    				var iconUrl = "icon_sun"
        			break;
				case "partly-cloudy-day":
    				var iconUrl = "partly-cloudy-day"
        			break;
				case "rain":
    				var iconUrl = "rain"
        			break;
    			default:
    				var iconUrl = "partly-cloudy-day"
			} 			
			var fake = parseInt(downtownCurrent.temperature) + 0.8
			$("#downtownIcon").css("background-image", "url(img/weather/" + iconUrl + ".png)");
			$("#downtownDeg").html(fake + "&deg;C");
			$("#downtownTxt").html(downtownCurrent.summary);
		}
	});
	
}

/**
* Function   :	updateStatus
*
* Description:	Update campusStatus 		
*
* Author   :	Luke
*
* Arguments  :	none
* 
* Returns:   :	none
*
* Comments   :	none
* 
**/
campusStatus.prototype.updateStatus = function () {
	$$.ajax({
		dataType: 'json',
		url: "http://evilnut.ca/App/APIs/sfu_app/sfuapp/campus_status.php",
		success: function (data) {
			g_campusStatus.m_burnabyStatus = data.burnaby;
			g_campusStatus.m_surreystatus = data.surrey;
			g_campusStatus.m_downtownStatus = data.vancouver;


			//console.log(data.burnaby);
			if (data.burnaby != "Open") {
				$$("#burStatus").html(data.burnaby);
				$$("#burStatus").removeClass("bg-green").addClass("bg-red");

			}
			else { $$("#burStatus").html(data.burnaby); }
			if (data.surrey != "Open") {
				$$("#surStatus").html(data.surrey);
				$$("#surStatus").removeClass("bg-green").addClass("bg-red");

			} else { $$("#surStatus").html(data.surrey); }
			if (data.vancouver != "Open") {
				$$("#dtStatus").html(data.vancouver);
				$$("#dtStatus").removeClass("bg-green").addClass("bg-red");
			} else { $$("#dtStatus").html(data.vancouver); }

			$("#busCon").html(data.burnaby_bus);
			$("#roadCon").html(data.burnaby_road_condition);
			$("#burExam").html(data.burnaby_classes_and_exams);
			$("#surExam").html(data.surrey_classes_and_exams);
			$("#dtExam").html(data.vancouver_classes_and_exams);



		}
	});
}

/**
* Function   :	updateComputer
*
* Description:	Update library Computer		
*
* Author   :	Luke
*
* Arguments  :	none
* 
* Returns:   :	none
*
* Comments   :	none
* 
**/
campusStatus.prototype.updateComputer = function () {
	//alert("g_campusStatus update");
	// dt computers, surrey computers, burnaby computer
	var belCom, surCom, surPc, surMac, benCom, benCom2, 
		benComWest3, benComEast3, benMac3, benCom4,
		benCom5, benCom6, belTotalCom, surTotalMac,
		surTotalPc, surTotalCom, benTotalCom, benTotalCom2,
		benTotalMac3, benTotalComWest3,	benTotalComEast3, 
		benTotalCom4, benTotalCom5, benTotalCom6;


	$.ajax({
		dataType: 'jsonp',
		url: "http://api.lib.sfu.ca/equipment/computers/free_summary?location=",
		success: function (data) {
			console.log(data);
			if (data.locations == null) {
				$("#benComputer").html("0" + ' / ' + "0");
				$("#surComputer").html("0" + ' / ' + "0");
				$("#belComputer").html("0" + ' / ' + "0");
				$("#benComputer2").html("0" + ' / ' + "0");
				$("#benComputerEast3").html("0" + ' / ' + "0");
				$("#benComputerWest3").html("0" + ' / ' + "0");
				$("#benMac").html("0" + ' / ' + "0");
				$("#benComputer4").html("0" + ' / ' + "0");
				$("#benComputer5").html("0"+ ' / ' + "0");
				$("#benComputer6").html("0" + ' / ' + "0");
				$("#surPc").html("0" + ' / ' + "0");		
				$("#surMac").html("0" + ' / ' + "0");
			}
			else {
				belCom = data.locations["bel-pc"];
				benCom2 = data.locations["ben-2-2105-pc"];
				benComWest3 = data.locations["ben-3-w-pc"];
				benComEast3 = data.locations["ben-3-e-pc"];
				benMac3 = data.locations["ben-3-e-mac"];
				benCom4 = data.locations["ben-4-4009-pc"];
				benCom5 = data.locations["ben-5-pc"];
				benCom6 = data.locations["ben-6-pc"];
				surMac = data.locations["surrey-lib-mac"];
				surPc = data.locations["surrey-lib"];
				benTotalCom2 = data.totals["ben-2-2105-pc"];
				benTotalComWest3 = data.totals["ben-3-w-pc"];
				benTotalComEast3 = data.totals["ben-3-e-pc"];
				benTotalMac3 = data.totals["ben-3-e-mac"];
				benTotalCom4 = data.totals["ben-4-4009-pc"];
				benTotalCom5 = data.totals["ben-5-pc"];
				benTotalCom6 = data.totals["ben-6-pc"];
				belTotalCom = data.totals["bel-pc"];
				surTotalPc = data.totals["surrey-lib"];
				surTotalMac = data.totals["surrey-lib-mac"];
			}
			benTotalCom = parseInt(benTotalCom2) + parseInt(benTotalComEast3) +  parseInt(benTotalComWest3) +  parseInt(benTotalMac3) +  parseInt(benTotalCom4) +  parseInt(benTotalCom5) +  parseInt(benTotalCom6);
			benCom =  parseInt(benCom2) + parseInt(benComEast3) +  parseInt(benComWest3) +  parseInt(benMac3) +  parseInt(benCom4) +  parseInt(benCom5) +  parseInt(benCom6);
			surCom = parseInt(surMac) + parseInt(surPc); 
			surTotalCom = parseInt(surTotalMac) + parseInt(surTotalPc);
			$("#benComputer").html('<span style="color:#4cd964">'+benCom +'</span>'+ ' / ' + benTotalCom);
			$("#surComputer").html('<span style="color:#4cd964">'+surCom+'</span>' + ' / ' + surTotalCom);
			$("#belComputer").html('<span style="color:#4cd964">'+belCom +'</span>'+ ' / ' + belTotalCom);
			$("#benComputer2").html('<span style="color:#4cd964">'+benCom2+'</span>' + ' / ' + benTotalCom2);
			$("#benComputerEast3").html('<span style="color:#4cd964">'+benComEast3 +'</span>'+ ' / ' + benTotalComEast3);
			$("#benComputerWest3").html('<span style="color:#4cd964">'+benComWest3+'</span>' + ' / ' + benTotalComWest3);
			$("#benMac").html('<span style="color:#4cd964">'+benMac3 +'</span>'+ ' / ' + benTotalMac3);
			$("#benComputer4").html('<span style="color:#4cd964">'+benCom4 +'</span>'+ ' / ' + benTotalCom4);
			$("#benComputer5").html('<span style="color:#4cd964">'+benCom5 +'</span>'+ ' / ' + benTotalCom5);
			$("#benComputer6").html('<span style="color:#4cd964">'+benCom6 +'</span>' + ' / ' + benTotalCom6);
			$("#surPc").html('<span style="color:#4cd964">'+surPc +'</span>' + ' / ' + surTotalPc);		
			$("#surMac").html('<span style="color:#4cd964">'+surMac +'</span>'+ ' / ' + surTotalMac);
		}
	});
}

