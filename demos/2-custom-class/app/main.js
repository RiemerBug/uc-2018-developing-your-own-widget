define(["require", "exports", "esri/Map", "esri/views/MapView", "./WebMapShowcase"], function (require, exports, Map, MapView, WebMapShowcase) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    var showcase = new WebMapShowcase({ view: view });
    // show next webmap every 10 seconds
    setInterval(function () { return showcase.next(); }, 10000);
});
//# sourceMappingURL=main.js.map