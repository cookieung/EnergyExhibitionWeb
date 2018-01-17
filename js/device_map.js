var stations;
var db;

function InitMap() {  
  $('#mapid').height(window.innerHeight - $('footer').outerHeight() - $('.page-title').outerHeight() - $('.clearfix').outerHeight() - 40);
  //$('#mapid').width(window.innerWidth - 100);
  
  var mymap = L.map('mapid').setView([13.845581, 100.569631], 6);

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
      '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.streets'
  }).addTo(mymap);

  var roads = L.gridLayer.googleMutant({
    type: 'roadmap' // valid values are 'roadmap', 'satellite', 'terrain' and 'hybrid'
  }).addTo(mymap);

  var BigStation = ["planetarium","weather011","weather006","weather012","weather013"];

function isBigStation(curr){
  for(let i = 0; i< BigStation.length ; i++){
    if(BigStation[i] === curr) return true;
  }
  return false;
}



  //request the station address
  var xhttpAddr = new XMLHttpRequest();
  xhttpAddr.open("GET","db/db.txt",true);
  xhttpAddr.onreadystatechange = function() {
    if (this.readyState==4 && this.status==200) {
      db = JSON.parse(xhttpAddr.response);
      console.log("DB :"+db);
      stations = db.stations;
      exhibitions = db.exhibitions;

      sessionStorage.setItem("exhibitions",JSON.stringify(exhibitions));
      sessionStorage.setItem("stations",JSON.stringify(stations));
      
      function onClick(e) {
        let tmpUrl = this.options.url;
        if(tmpUrl.indexOf("?exh") >= 0){
          var newURL = window.location.href;        
          console.log("have exh");
          sessionStorage.name = this.options.name;
          window.location.href = newURL+tmpUrl;
        }else  window.open("http://csrs.ku.ac.th"+tmpUrl);

      }

      var SmallIcon = new L.Icon({
        iconUrl: 'https://csrs.ku.ac.th/devices/app/img/marker-icon-blue.png',
        shadowUrl: 'https://csrs.ku.ac.th/devices/app/img/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      
      });
      var BigIcon = new L.Icon({
        iconUrl: 'img/icon/station.png',
        shadowUrl: 'https://csrs.ku.ac.th/devices/app/img/marker-shadow.png',

        iconSize: [50, 51],
        iconAnchor: [12, 51],
        popupAnchor: [4, -34],
        shadowSize: [51, 51]
      });

      var now = new Date();
      for(var s=0; s<stations.length; s++) {
      
        var pos = stations[s].addr.position,
            //url = "http://csrs.ku.ac.th/devices/ws?ID={id}".replace('{id}', stations[s].id),
            url = "/devices?ID={id}".replace('{id}', stations[s].id),
            icon = SmallIcon;
           if(isBigStation(stations[s].id)){
             icon = BigIcon;
             url = "?exh="+stations[s].id;
           }
        var desc = null;

        if (stations[s].addr.name) {

          // ref: http://html5doctor.com/element-index/#dl
          desc = '<dl><dt>' + stations[s].addr.name + '</dt><dd>' + stations[s].addr.th.province + '</dd></dl>';
        }
        var marker = new L.marker([pos.lat, pos.lon], {icon: icon, url: url, name: stations[s].addr.name});
        marker.addTo(mymap)
          .bindPopup(desc);
        marker.on('click', onClick);
        marker.on('mouseover', function(e) {
          this.openPopup();
        });
        marker.on('mouseout', function(e) {
          this.closePopup();
        });
        //L.marker([pos.lat, pos.lon]).addTo(mymap).on('click', function() {
        //  var url1 = url;
        //  window.open(url1);
        //});
      }
    }
  }
  
  // //var uri = "http://csrs.ku.ac.th/devices/ws?lsall";
  // //var uri = "/devices?lsall";
  // var uri = "http://csrs.ku.ac.th/devices/ws?lsall";
  // xhttpAddr.open("GET", uri, true);
  xhttpAddr.send(null);
}

function UpdateMap() {
  
}

InitMap();
setInterval(UpdateMap, 60000);