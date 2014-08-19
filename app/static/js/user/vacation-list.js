/* global google:true */
(function(){
  'use strict';

  var map;

  $(document).ready(function(){
    initMap(36.2, -86.7, 7);
  });

  function initMap(lat, lng, zoom){
    var mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP};
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }

})();

