/* global google:true */
(function(){
  'use strict';

  var map;

  $(document).ready(function(){
    initMap(36.2, -86.7, 2);
    var positions = getPositions();
    positions.forEach(function(pos){
      addMarker(pos.lat, pos.lng, pos.name);
    });
  });

  function addMarker(lat, lng, name){
    var latLng = new google.maps.LatLng(lat, lng);
    new google.maps.Marker({map: map, position: latLng, title: name, animation: google.maps.Animation.DROP});
  }

  function getPositions(){
    var positions = $('table tbody tr').toArray().map(function(tr){
      var name = $(tr).attr('data-name'),
           lat = $(tr).attr('data-lat'),
           lng = $(tr).attr('data-lng'),
           pos = {name:name, lat:parseFloat(lat), lng:parseFloat(lng)};
      return pos;
    });
    return positions;
  }

  function initMap(lat, lng, zoom){
    var mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP};
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }

})();

