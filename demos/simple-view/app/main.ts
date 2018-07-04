import config = require("esri/config");
import WebMap = require("esri/WebMap");
import MapView = require("esri/views/MapView");

import WebMapShowcase = require("./WebMapShowcase");

// disable prompting
config.request.useIdentity = false;

//----------------
//  map setup
//----------------

const map = new WebMap({
  portalItem: {
    id: "aa1f66346ab24b37a2b544f8a94529d2"
  }
});

const view = new MapView({ container: "view", map });

//----------------
//  widget setup
//----------------

const widget = new WebMapShowcase();

view.ui.add(widget, "top-right");
