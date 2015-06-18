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
* member variables   :	[bool] m_isCampusClosed  
*
* Author   :	Luke
*
* Comments   :	none
* 
**/
function campusMap() {
	// member varables
	this.m_latLng;
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
campusMap.prototype.init = function () {
	// initial fuctions 
	console.log("yaduo g_campusMap init");
	this.m_latLng = new google.maps.LatLng(49.2789, -122.9162);
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
campusMap.prototype.update = function () {
	console.log("yaduo g_campusMap update");
	var defaultLatLng = new google.maps.LatLng(49.2789, -122.9162);  // Default to Hollywood, CA when no geolocation support
	this.drawMap(this.m_latLng);  // No geolocation support, show default map
}


/**
* Function   :	drawMap
*
* Description:	draw campus map, invoke google map 		
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
campusMap.prototype.drawMap = function (latlng) {
	var myOptions = {
		zoom: 17,
		center: latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		panControl: false,
		zoomControl: false,
		streetViewControl: false
	};
	var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
	console.log("campus maps" + navigator.geolocation);
	if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

      // var infowindow = new google.maps.InfoWindow({
      //   map: map,
      //   position: pos,
      //   content: 'Your location'
      // });

      var marker = new google.maps.Marker({
    	position: pos,
    	map: map,
    	title:"Your location"
	});

      map.setCenter(pos);
    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }


	
	function handleNoGeolocation(errorFlag) {
		if (errorFlag) {
		var content = 'Error: The Geolocation service failed.';
		} else {
		var content = 'Error: Your browser doesn\'t support geolocation.';
		}

		var options = {
		map: map,
		position: new google.maps.LatLng(49.2789, -122.9162),
		content: content
		};

		var infowindow = new google.maps.InfoWindow(options);
		map.setCenter(options.position);
	}


}



