define(["require", "exports", "esri/config", "esri/WebMap", "esri/views/MapView", "./WebMapShowcase"], function (require, exports, config, WebMap, MapView, WebMapShowcase) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // disable prompting
    config.request.useIdentity = false;
    //----------------
    //  map setup
    //----------------
    var map = new WebMap({
        portalItem: {
            id: "aa1f66346ab24b37a2b544f8a94529d2"
        }
    });
    var view = new MapView({ container: "view", map: map });
    //----------------
    //  widget setup
    //----------------
    var widget = new WebMapShowcase();
    view.ui.add(widget, "top-right");
});
//# sourceMappingURL=main.js.map