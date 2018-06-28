import config = require("esri/config");
import MapView = require("esri/views/MapView");

import WebMapShowcase = require("./WebMapShowcase");

// disable prompting
config.request.useIdentity = false;

//----------------
//  map setup
//----------------

const view = new MapView({ container: "view" });

//----------------
//  widget setup
//----------------

const widget = new WebMapShowcase({ view });

view.ui.add(widget, "top-right");
