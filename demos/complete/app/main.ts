import MapView = require("esri/views/MapView");

import config = require("esri/config");

import Demo = require("./Demo");

// disable prompting
config.request.useIdentity = false;

//----------------
//  map setup
//----------------

const view = new MapView({ container: "view" });

//----------------
//  widget setup
//----------------

const widget = new Demo({ view });

view.ui.add(widget, "top-right");
