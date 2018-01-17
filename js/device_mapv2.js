var stations = [
    {
      position: {lat: 13.845581, lng: 100.569631},
      name: 'ศูนย์วิทย์1',
      urls: 'http://csrs.ku.ac.th/devices?ID=weather004',
      img: 'https://csrs.ku.ac.th/devices/app/img/marker-icon-blue.png',
      description: 'jdjjjjjjjjjjjjj'
    },
    {
      position: {lat: 15.845581, lng: 100.569631},
      name: 'ศูนย์วิทย์2',
      img: 'img/marker-icon-red.png',
      description: 'dddddddddddd'
    }
  ]
  
  
  function initMap() {
    var myLatLng = {lat: 13.845581, lng: 100.569631};
  
    var map = new google.maps.Map(document.getElementById('mapid'), {
      zoom: 6,
      center: myLatLng
    });
  
    
    stations.forEach(function(station) {
      var infowindow = new google.maps.InfoWindow();
      var marker = new google.maps.Marker({
        position: station.position,
        map: map,
        label: station.name,
        icon: station.img
      });
      
        makeInfoWindowEvent(map, infowindow, station.description, marker);
      
        markers.push(marker);
        
  
    });
  
  
  }
 
  function makeInfoWindowEvent(map, infowindow, contentString, marker) {
    google.maps.event.addListener(marker, 'mouseover', function() {
        infowindow.setContent(contentString);
        infowindow.open(map, marker);
    });
    google.maps.event.addListener(marker, 'mouseout', function() {
        infowindow.close(map, marker);
        });
    google.maps.event.addListener(marker, 'click', function() {
        window.location.href = station.urls;
    });
  }