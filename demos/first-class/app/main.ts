import EsriMap = require("esri/Map");
import MapView = require("esri/views/MapView");

import WebMapShowcase = require("./WebMapShowcase");

//----------------
//  map setup
//----------------

const map = new EsriMap({
  basemap: "streets-vector"
});

const view = new MapView({
  map: map,
  container: "viewDiv",
  center: [-117.1628487109789, 32.706813240831096],
  zoom: 15
});

//----------------
//  widget setup
//----------------

const showcase = new WebMapShowcase({ view });

// show next webmap every 10 seconds
setInterval(() => showcase.next(), 10000);
