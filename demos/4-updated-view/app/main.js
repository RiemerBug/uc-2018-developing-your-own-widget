define(["require", "exports", "esri/config", "esri/Map", "esri/views/MapView", "./WebMapShowcase"], function (require, exports, config, Map, MapView, WebMapShowcase) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // disable prompting
    config.request.useIdentity = false;
    //----------------
    //  map setup
    //----------------
    var map = new Map({
        basemap: "streets-vector"
    });
    var view = new MapView({
        map: map,
        container: "viewDiv",
        center: [-117.1628487109789, 32.706813240831096],
        zoom: 15
    });
    //----------------
    //  widget setup
    //----------------
    var widget = new WebMapShowcase({ view: view });
    view.ui.add(widget, "top-right");
});
//# sourceMappingURL=main.js.map