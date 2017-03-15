var area_markers = [],
  area2_markers = [],
  hinox_markers = [],
  korok_markers = [],
  lab_markers = [],
  lynel_markers = [],
  molduga_markers = [],
  other_markers = [],
  region_markers = [],
  shrine_markers = [],
  stable_markers = [],
  talus_markers = [],
  tower_markers = [],
  town_markers = [],
  repeatOnXAxis = false,
  minZoomLevel = 3,
  icon_korok = new google.maps.MarkerImage('korok.png', new google.maps.Size(32, 32), new google.maps.Point(0, 0), new google.maps.Point(16, 16));
  icon_lab = new google.maps.MarkerImage('http://vignette3.wikia.nocookie.net/nintendo/images/5/5e/The_Legend_of_Zelda_-_Breath_of_the_Wild_-_Map_icon_-_Tech_Lab.svg/revision/latest/scale-to-width-down/32?cb=20170308170324&path-prefix=en', new google.maps.Size(32, 32), new google.maps.Point(0, 0), new google.maps.Point(16, 16)),
  icon_other = new google.maps.MarkerImage('http://vignette4.wikia.nocookie.net/nintendo/images/7/7b/The_Legend_of_Zelda_-_Breath_of_the_Wild_-_Map_icon_-_Other_landmark.svg/revision/latest/scale-to-width-down/30?cb=20170308170136&path-prefix=en', new google.maps.Size(30, 30), new google.maps.Point(0, 0), new google.maps.Point(15, 15)),
  icon_shrine = new google.maps.MarkerImage('http://vignette2.wikia.nocookie.net/nintendo/images/e/ea/The_Legend_of_Zelda_-_Breath_of_the_Wild_-_Map_icon_-_Shrine_%28completed%29.svg/revision/latest/scale-to-width-down/32?cb=20170308170322&path-prefix=en', new google.maps.Size(32, 32), new google.maps.Point(0, 0), new google.maps.Point(16, 16)),
  icon_stable = new google.maps.MarkerImage('http://vignette1.wikia.nocookie.net/nintendo/images/b/b0/The_Legend_of_Zelda_-_Breath_of_the_Wild_-_Map_icon_-_Stable.svg/revision/latest/scale-to-width-down/32?cb=20170308170323&path-prefix=en', new google.maps.Size(32, 32), new google.maps.Point(0, 0), new google.maps.Point(16, 16)),
  icon_tower = new google.maps.MarkerImage('https://vignette3.wikia.nocookie.net/nintendo/images/3/38/The_Legend_of_Zelda_-_Breath_of_the_Wild_-_Map_icon_-_Tower.svg/revision/latest/scale-to-width-down/40?cb=20170308170324&path-prefix=en', new google.maps.Size(40, 40), new google.maps.Point(0, 0), new google.maps.Point(20, 20)),
  icon_village = new google.maps.MarkerImage('https://vignette4.wikia.nocookie.net/nintendo/images/8/8a/The_Legend_of_Zelda_-_Breath_of_the_Wild_-_Map_icon_-_Village.svg/revision/latest/scale-to-width-down/32?cb=20170308170325&path-prefix=en', new google.maps.Size(32, 32), new google.maps.Point(0, 0), new google.maps.Point(16, 16)),
  skull_blue = new google.maps.MarkerImage('skull_blue.png', new google.maps.Size(32, 32), new google.maps.Point(0, 0), new google.maps.Point(16, 16)),
  skull_dark_blue = new google.maps.MarkerImage('skull_dkblue.png', new google.maps.Size(32, 32), new google.maps.Point(0, 0), new google.maps.Point(16, 16)),
  skull_green = new google.maps.MarkerImage('skull_green.png', new google.maps.Size(32, 32), new google.maps.Point(0, 0), new google.maps.Point(16, 16)),
  skull_orange = new google.maps.MarkerImage('skull_orange.png', new google.maps.Size(32, 32), new google.maps.Point(0, 0), new google.maps.Point(16, 16)),
  skull_pink = new google.maps.MarkerImage('skull_pink.png', new google.maps.Size(32, 32), new google.maps.Point(0, 0), new google.maps.Point(16, 16)),
  skull_purple = new google.maps.MarkerImage('skull_purple.png', new google.maps.Size(32, 32), new google.maps.Point(0, 0), new google.maps.Point(16, 16)),
  skull_red = new google.maps.MarkerImage('skull_red.png', new google.maps.Size(32, 32), new google.maps.Point(0, 0), new google.maps.Point(16, 16)),
  skull_yellow = new google.maps.MarkerImage('skull_yellow.png', new google.maps.Size(32, 32), new google.maps.Point(0, 0), new google.maps.Point(16, 16)),

function minWindow(elem) {
  var Id = $(elem).attr("id").replace("min-", "options-window-");
  $('#' + Id).slideToggle();
}

function getNormalizedCoord(coord, zoom) {
  if (!repeatOnXAxis) return coord;
  var y = coord.y,
    x = coord.x,
    tileRange = 1 << zoom;
  if (y < 0 || y >= tileRange) {
    return null;
  }
  if (x < 0 || x >= tileRange) {
    x = (x % tileRange + tileRange) % tileRange;
  }
  return {
    x: x,
    y: y
  };
}

window.onload = function() {
  var customMapType = new google.maps.ImageMapType({
    getTileUrl: function(coord, zoom) {
      var normalizedCoord = getNormalizedCoord(coord, zoom);
      if (normalizedCoord && (normalizedCoord.x < Math.pow(2, zoom)) && (normalizedCoord.x > -1) && (normalizedCoord.y < Math.pow(2, zoom)) && (normalizedCoord.y > -1)) {
        return 'map/' + zoom + '_' + normalizedCoord.x + '_' + normalizedCoord.y + '.jpg';
      } else {
        return 'map/empty.jpg';
      }
    },
    tileSize: new google.maps.Size(256, 256),
    maxZoom: 7,
    name: 'BotW.Hyrule'
  }),
    myOptions = {
      center: new google.maps.LatLng(0, 0),
      zoom: minZoomLevel,
      minZoom: 0,
      streetViewControl: false,
      mapTypeControl: false,
      mapTypeControlOptions: {
        mapTypeIds: ["custom"]
      }
    },
    map = new google.maps.Map(document.getElementById('map'), myOptions),
    strictBounds = new google.maps.LatLngBounds(new google.maps.LatLng(-71.41317683396565, -122.6953125), new google.maps.LatLng(71.52490903732816, 120.9375));

  map.mapTypes.set('custom', customMapType);
  map.setMapTypeId('custom');

  google.maps.event.addListener(map, 'dragend', function() {
    if (strictBounds.contains(map.getCenter())) return;
    var c = map.getCenter(),
      x = c.lng(),
      y = c.lat(),
      maxX = strictBounds.getNorthEast().lng(),
      maxY = strictBounds.getNorthEast().lat(),
      minX = strictBounds.getSouthWest().lng(),
      minY = strictBounds.getSouthWest().lat();
    if (x < minX) x = minX;
    if (x > maxX) x = maxX;
    if (y < minY) y = minY;
    if (y > maxY) y = maxY;
    map.setCenter(new google.maps.LatLng(y, x));
  });

  google.maps.event.addListener(map, 'zoom_changed', function() {
    if (map.getZoom() < minZoomLevel) map.setZoom(minZoomLevel);
  });

  google.maps.event.addListener(map, "rightclick", function(event) {
    var lat = event.latLng.lat();
    var lng = event.latLng.lng();
    // populate yor box/field with lat, lng
    prompt("Coordinates to be copied:", "['', " + lat + ", " + lng + "],");
  });

  google.maps.event.addListener(map, 'zoom_changed', function() {
    zoomLevel = map.getZoom();

    if (zoomLevel > 3) {
      for (it in region_markers) {
        region_markers[it].setVisible(false);
      }
      markerRegion.repaint();
    } else {
      for (var it in region_markers) {
        region_markers[it].setVisible(true);
      }
      markerRegion.repaint();
    }

    if (zoomLevel > 3 && zoomLevel < 6) {
      for (it in area_markers) {
        area_markers[it].setVisible(true);
      }
      markerArea.repaint();
    } else {
      for (it in area_markers) {
        area_markers[it].setVisible(false);
      }
      markerArea.repaint();
    }

    if (zoomLevel > 5) {
      for (it in area2_markers) {
        area2_markers[it].setVisible(true);
      }
      markerArea2.repaint();
    } else {
      for (it in area2_markers) {
        area2_markers[it].setVisible(false);
      }
      markerArea2.repaint();
    }

    if (zoomLevel > 4) {
      for (it in korok_markers) {
        korok_markers[it].setVisible(true);
      }
      markerKorok.repaint();
    } else {
      for (it in korok_markers) {
        korok_markers[it].setVisible(false);
      }
      markerKorok.repaint();
    }
  });

  document.getElementById("korok_count").innerHTML = koroks.length;
  document.getElementById("lynel_count").innerHTML = lynel.length;
  document.getElementById("hinox_count").innerHTML = hinox.length;
  document.getElementById("talus_count").innerHTML = talus.length;
  document.getElementById("molduga_count").innerHTML = talus.length;

  var markerArea = new MarkerClusterer(map, area_markers),
    markerArea2 = new MarkerClusterer(map, area2_markers),
    markerHinox = new MarkerClusterer(map, hinox_markers),
    markerKorok = new MarkerClusterer(map, korok_markers),
    markerLab = new MarkerClusterer(map, lab_markers),
    markerLynel = new MarkerClusterer(map, lynel_markers),
    markerMolduga = new MarkerClusterer(map, molduga_markers),
    markerOther = new MarkerClusterer(map, other_markers),
    markerRegion = new MarkerClusterer(map, region_markers),
    markerShrine = new MarkerClusterer(map, shrine_markers),
    markerTalus = new MarkerClusterer(map, talus_markers),
    markerTower = new MarkerClusterer(map, tower_markers),
    markerTown = new MarkerClusterer(map, town_markers);

  setMarkers(map);

  function setMarkers(map) {
    for (var i = 0; i < regions.length; i++) {
      var place = regions[i];
      var marker = new google.maps.Marker({
        position: { lat: place[1], lng: place[2] },
        map: map,
        label: {
          text: place[0],
          color: '#b5a268',
          fontSize: '20px'
        },
        icon: 'transparent.gif'
      });
      region_markers.push(marker);
    }

    for (i = 0; i < areas.length; i++) {
      place = areas[i];
      marker = new google.maps.Marker({
        position: { lat: place[1], lng: place[2] },
        map: map,
        label: {
          text: place[0],
          color: '#b5a268',
          fontSize: '20px'
        },
        icon: 'transparent.gif',
        visible: false
      });
      area_markers.push(marker);
    }

    for (i = 0; i < areas2.length; i++) {
      place = areas2[i];
      marker = new google.maps.Marker({
        position: { lat: place[1], lng: place[2] },
        map: map,
        label: {
          text: place[0],
          color: '#b5a268',
          fontSize: '20px'
        },
        icon: 'transparent.gif',
        visible: false
      });
      area2_markers.push(marker);
    }

    for (i = 0; i < towns.length; i++) {
      place = towns[i];
      marker = new google.maps.Marker({
        position: { lat: place[1], lng: place[2] },
        map: map,
        icon: icon_village
      });
      marker.info = new google.maps.InfoWindow({
        content: '<h3>' + place[0] + '</h3><p>' + place[1] + ', ' + place[2] + '</p>'
      });
      google.maps.event.addListener(marker, 'click', function() {
        this.info.open(map, this);
      });
      town_markers.push(marker);
    }

    for (i = 0; i < other.length; i++) {
      place = other[i];
      marker = new google.maps.Marker({
        position: { lat: place[1], lng: place[2] },
        map: map,
        icon: icon_other
      });
      marker.info = new google.maps.InfoWindow({
        content: '<h3>' + place[0] + '</h3><p>' + place[1] + ', ' + place[2] + '</p>'
      });
      google.maps.event.addListener(marker, 'click', function() {
        this.info.open(map, this);
      });
      other_markers.push(marker);
    }

    for (i = 0; i < labs.length; i++) {
      place = labs[i];
      marker = new google.maps.Marker({
        position: { lat: place[1], lng: place[2] },
        map: map,
        icon: icon_lab
      });
      marker.info = new google.maps.InfoWindow({
        content: '<h3>' + place[0] + ' Ancient Tech Lab</h3><p>' + place[1] + ', ' + place[2] + '</p>'
      });
      google.maps.event.addListener(marker, 'click', function() {
        this.info.open(map, this);
      });
      lab_markers.push(marker);
    }

    for (i = 0; i < stables.length; i++) {
      place = stables[i];
      marker = new google.maps.Marker({
        position: { lat: place[1], lng: place[2] },
        map: map,
        icon: icon_stable
      });
      marker.info = new google.maps.InfoWindow({
        content: '<h3>' + place[0] + ' Stable</h3><p>' + place[1] + ', ' + place[2] + '</p>'
      });
      google.maps.event.addListener(marker, 'click', function() {
        this.info.open(map, this);
      });
      stable_markers.push(marker);
    }

    for (i = 0; i < towers.length; i++) {
      place = towers[i];
      marker = new google.maps.Marker({
        position: { lat: place[1], lng: place[2] },
        map: map,
        icon: icon_tower
      });
      marker.info = new google.maps.InfoWindow({
        content: '<h3>' + place[0] + ' Tower</h3><p>' + place[1] + ', ' + place[2] + '</p>'
      });
      google.maps.event.addListener(marker, 'click', function() {
        this.info.open(map, this);
      });
      tower_markers.push(marker);
    }

    for (i = 0; i < shrines.length; i++) {
      place = shrines[i];
      marker = new google.maps.Marker({
        position: { lat: place[1], lng: place[2] },
        map: map,
        icon: icon_shrine
      });
      marker.info = new google.maps.InfoWindow({
        content: '<h3>' + place[0] + ' Shrine</h3><p>' + place[1] + ', ' + place[2] + '</p><p><a href="' + place[3] + '" target="_blank">' + place[3] + '</a></p>'
      });
      google.maps.event.addListener(marker, 'click', function() {
        this.info.open(map, this);
      });
      shrine_markers.push(marker);
    }

    for (i = 0; i < koroks.length; i++) {
      place = koroks[i];
      marker = new google.maps.Marker({
        position: { lat: place[1], lng: place[2] },
        map: map,
        icon: icon_korok,
        visible: false
      });
      marker.info = new google.maps.InfoWindow({
        content: '<h3>' + place[0] + '</h3><p>' + place[1] + ', ' + place[2] + '</p>'
      });
      google.maps.event.addListener(marker, 'click', function() {
        this.info.open(map, this);
      });
      korok_markers.push(marker);
    }

    for (i = 0; i < lynel.length; i++) {
      place = lynel[i];
      marker = new google.maps.Marker({
        position: { lat: place[1], lng: place[2] },
        map: map,
        icon: skull_red
      });
      marker.info = new google.maps.InfoWindow({
        content: '<h3>' + place[0] + '</h3><p>' + place[1] + ', ' + place[2] + '</p>'
      });
      google.maps.event.addListener(marker, 'click', function() {
        this.info.open(map, this);
      });
      lynel_markers.push(marker);
    }

    for (i = 0; i < hinox.length; i++) {
      place = hinox[i];
      marker = new google.maps.Marker({
        position: { lat: place[1], lng: place[2] },
        map: map,
        icon: skull_purple
      });
      marker.info = new google.maps.InfoWindow({
        content: '<h3>' + place[0] + '</h3><p>' + place[1] + ', ' + place[2] + '</p>'
      });
      google.maps.event.addListener(marker, 'click', function() {
        this.info.open(map, this);
      });
      hinox_markers.push(marker);
    }

    for (i = 0; i < talus.length; i++) {
      place = talus[i];
      marker = new google.maps.Marker({
        position: { lat: place[1], lng: place[2] },
        map: map,
        icon: skull_blue
      });
      marker.info = new google.maps.InfoWindow({
        content: '<h3>' + place[0] + '</h3><p>' + place[1] + ', ' + place[2] + '</p>'
      });
      google.maps.event.addListener(marker, 'click', function() {
        this.info.open(map, this);
      });
      talus_markers.push(marker);
    }

    for (i = 0; i < molduga.length; i++) {
      place = molduga[i];
      marker = new google.maps.Marker({
        position: { lat: place[1], lng: place[2] },
        map: map,
        icon: skull_yellow
      });
      marker.info = new google.maps.InfoWindow({
        content: '<h3>' + place[0] + '</h3><p>' + place[1] + ', ' + place[2] + '</p>'
      });
      google.maps.event.addListener(marker, 'click', function() {
        this.info.open(map, this);
      });
      molduga_markers.push(marker);
    }
  }
};

function toggleGroup(type) {
  for (var i = 0; i < markerGroups[type].length; i++) {
    var marker = markerGroups[type][i];
    if (marker.isHidden()) {
      marker.show();
    } else {
      marker.hide();
    }
  }
}
