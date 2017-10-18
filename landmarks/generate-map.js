var myLat = 999;
var myLng = 999;
var myLocation = new google.maps.LatLng(myLat, myLng);
var locations;
var map;
var myOptions = {
    zoom: 13, 
    center: myLocation,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};
var request = new XMLHttpRequest();
var peopleMarkers = Array();
var landmarkMarkers = Array();
var infowindow = new google.maps.InfoWindow();

//sending my location and receiving other locations from server
function init() {
    map = new google.maps.Map(document.getElementById("map"), myOptions);
    if ((myLat == 999) && (myLng == 999)) {
        getMyLocation();
    } 
}

function getLocations(){
    request.open("POST", "https://defense-in-derpth.herokuapp.com/sendLocation", true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            var rawData = request.responseText;
            locations = JSON.parse(rawData);
            console.log(locations);

            //creating marker for each person and landmark
            for (i = 0; i < locations.people.length; i++) {
                var currPerson = {lat: locations.people[i].lat, lng: locations.people[i].lng};
                peopleMarkers[i] = new google.maps.Marker({
                    position: currPerson,
                    title: locations.people[i]._id + "'s' Location"
                    //icon: 'stickman.png'
                });

                if (i < locations.landmarks.length) {
                    var currLandmark = {lat: locations.landmarks[i].geometry.coordinates[0],
                        lng: locations.landmarks[i].geometry.coordinates[1]};
                        landmarkMarkers[i] = new google.maps.Marker({
                            position: currLandmark,
                            title:locations.landmarks[i].properties.Location_Name
                        //icon: 'statueofliberty.jpg'
                    });
                    //if landmark is less than 1 mile away {
                        landmarkMarkers[i].setMap(map);
                    //}
                }
                peopleMarkers[i].setMap(map);
                onClick(peopleMarkers[i], locations.people[i]._id, locations.people[i].lat, locations.people[i].lng);
                //onClick(landmarkMarkers[i], locations.landmarks[i].properties.Location_Name, );
            }
        }   
    }
    request.send("login=JxwgTxWT&lat=" + myLat + "&lng=" + myLng);
}

//gets my location
function getMyLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(pos) {
            myLat = pos.coords.latitude;
            myLng = pos.coords.longitude;
            myLocation = new google.maps.LatLng(myLat, myLng);
            getLocations();
            createMap();
        });
    } else {
        alert("Your geolocation cannot be retrieved. Where the heck are you?");
    }
}

//create map
function createMap() {
    map.panTo(myLocation);
    marker = new google.maps.Marker({
        position: myLocation,
        title: "My Location"
        //icon: me.jpeg
    });
    marker.setMap(map);
    onClick(marker, "JxwgTxWT");
    //FUNCTION TO CALC + DISPLAY NEAREST LANDMARK
}

//when marker is clicked
function onClick(marker, title, lat, lng) {
    var distanceAway = distanceBetween(lat, lng);
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(title + ", " + " miles away");
        infowindow.open(map, marker);
        //infowindow.setContent(this.content + title + ", " + " miles away");
        //infowindow.open(map, this);
    });
}

//calculates distance between my location and another
function distanceBetween(lat, lng) {
    //var tohere = new google.maps.LatLng(lat, lng);
    //google.maps.geometry.spherical.computeDistanceBetween(myLocation, tohere);
}