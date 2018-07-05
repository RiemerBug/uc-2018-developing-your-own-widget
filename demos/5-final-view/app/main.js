define(["require", "exports", "esri/config", "esri/views/MapView", "./WebMapShowcase"], function (require, exports, config, MapView, WebMapShowcase) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // disable prompting
    config.request.useIdentity = false;
    //----------------
    //  map setup
    //----------------
    var view = new MapView({ container: "viewDiv" });
    //----------------
    //  widget setup
    //----------------
    var widget = new WebMapShowcase({ view: view });
    view.ui.add(widget, "top-right");
});
//# sourceMappingURL=main.js.map