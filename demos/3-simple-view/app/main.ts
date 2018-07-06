import Map = require("esri/Map");
import MapView = require("esri/views/MapView");

import WebMapShowcase = require("./CustomClass");

//----------------
//  map setup
//----------------

const map = new Map({
  basemap: "streets-vector"
});

const view = new MapView({
  map,
  container: "viewDiv",
  center: [-117.1628487109789, 32.706813240831096],
  zoom: 15
});

//----------------
//  Custom Class setup
//----------------

const showcase = new CustomClass({ view });

// show next webmap every 10 seconds
setInterval(() => showcase.next(), 10000);
