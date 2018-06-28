define(["require", "exports", "esri/views/MapView", "esri/config", "./Demo"], function (require, exports, MapView, config, Demo) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // disable prompting
    config.request.useIdentity = false;
    //----------------
    //  map setup
    //----------------
    var view = new MapView({ container: "view" });
    //----------------
    //  widget setup
    //----------------
    var widget = new Demo({ view: view });
    view.ui.add(widget, "top-right");
});
//# sourceMappingURL=main.js.map