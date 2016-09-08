app.module.contactPage = (function() {
  var el = {};
  var mapScriptUrl = "https://maps.googleapis.com/maps/api/js";

  function init(config) {
    el.container = config.container;
    render();
    collectDom();
    loadMap();
  }

  function render() {
    el.container.innerHTML = Templates.contactPage();
  }

  function collectDom() {
    el.map = document.getElementById('map');
  }

  function loadMap() {
    if (!scriptOnPage()) {
      loadMapScript(function() {
        initMap(el.map)
      });
      return;
    }

    initMap(el.map);
  }

  function scriptOnPage() {
    return !!document.querySelector('script[src="' + mapScriptUrl + '"]')
  }

  function loadMapScript(cb) {
    var script = document.createElement('script');
    script.src = mapScriptUrl;
    document.body.appendChild(script);

    script.onload = function() {
      cb();
    };

    script.onreadystatechange = function() {
      if (this.readyState == "loaded") {
        this.onload()
      }
    };
  }

  function initMap(mapContainer) {
    var map = new google.maps.Map(mapContainer, {
      center: { lat: 50.467322, lng: 30.514726 },
      zoom: 16,
      draggable: true,
      zoomControl: true,
      styles: [{ "featureType": "administrative", "elementType": "labels.text.fill", "stylers": [{ "color": "#444444" }] }, { "featureType": "landscape", "elementType": "all", "stylers": [{ "color": "#f2f2f2" }] }, { "featureType": "poi", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "road", "elementType": "all", "stylers": [{ "saturation": -100 }, { "lightness": 45 }] }, { "featureType": "road.highway", "elementType": "all", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "road.arterial", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "color": "#59C0ED" }, { "visibility": "on" }] }]
    });

    var marker = new google.maps.Marker({
      position: { lat: 50.467322, lng: 30.514726 },
    });

    marker.setMap(map);
  }

  function destroy() {
    el.container.innerHTML = "";
  }

  return {
    init: init,
    destroy: destroy
  }
})();
