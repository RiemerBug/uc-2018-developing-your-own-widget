/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "esri/core/accessorSupport/decorators", "esri/widgets/support/widget", "esri/core/watchUtils", "esri/Graphic", "esri/Map", "esri/widgets/Widget", "esri/views/MapView"], function (require, exports, __extends, __decorate, decorators_1, widget_1, watchUtils, Graphic, Map, Widget, MapView) {
    "use strict";
    var CSS = {
        base: "esri-overview",
        overlay: "esri-overview__overlay",
        view: "esri-overview__view"
    };
    function isExtent(item) {
        return item.declaredClass && item.declaredClass === "esri.geometry.Extent";
    }
    // TODO: SceneView support?
    // TODO: show NLS?
    // TODO: animate entry       ¡
    var Overview = /** @class */ (function (_super) {
        __extends(Overview, _super);
        function Overview() {
            //--------------------------------------------------------------------------
            //
            //  Variables
            //
            //--------------------------------------------------------------------------
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._userViewGraphic = new Graphic({
                symbol: {
                    type: "simple-fill",
                    color: "rgba(0, 94, 149, 0.75)",
                    outline: null
                }
            });
            _this._internalMap = new Map({
                basemap: "topo"
            });
            //----------------------------------
            //  type
            //----------------------------------
            _this.type = "2d";
            return _this;
        }
        //--------------------------------------------------------------------------
        //
        //  Public Methods
        //
        //--------------------------------------------------------------------------
        Overview.prototype.render = function () {
            return (widget_1.tsx("div", { class: CSS.base },
                widget_1.tsx("div", { afterCreate: this._wireInternalView, bind: this, class: CSS.view })));
        };
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        // TODO: rename
        Overview.prototype._syncUserViewToOverviewView = function (animate) {
            if (animate === void 0) { animate = false; }
            var target = this._userViewGraphic.geometry.center;
            this.view.goTo(target, { animate: animate });
        };
        Overview.prototype._syncViewToOverviewView = function () {
            var _this = this;
            if (!this._internalView) {
                return;
            }
            // TODO: whenify
            this._internalView.then(function () {
                _this._internalView.goTo(_this.view.extent.clone().expand(2));
            });
        };
        Overview.prototype._syncToUserExtent = function () {
            if (!this._internalView) {
                return;
            }
            this._updateExtentGraphic(this.view.extent);
        };
        Overview.prototype._updateExtentGraphic = function (extentOrXY) {
            var targetGeometry;
            if (isExtent(extentOrXY)) {
                targetGeometry = extentOrXY;
            }
            else {
                var moved = this._userViewGraphic.geometry.clone();
                moved.centerAt(extentOrXY);
                targetGeometry = moved;
            }
            this._internalView.graphics.remove(this._userViewGraphic);
            this._userViewGraphic.geometry = targetGeometry;
            this._userViewGraphic = this._userViewGraphic.clone();
            this._internalView.graphics.add(this._userViewGraphic);
        };
        Overview.prototype._wireInternalView = function (node) {
            // TODO: tidy up
            var _this = this;
            var userView = this.view;
            userView.then(function () {
                var iv = new MapView({
                    container: node,
                    map: _this._internalMap,
                    extent: userView.extent.clone().expand(2),
                    ui: {
                        components: []
                    }
                });
                iv.on("pointer-down", function (event) {
                    iv.hitTest(event)
                        .then(function (result) {
                        var graphic = result.results[0];
                        if (graphic) {
                            var moveHandle_1 = iv.on("pointer-move", function (event) {
                                _this._updateExtentGraphic(iv.toMap(event));
                                event.stopPropagation();
                            });
                            var dragHandle_1 = iv.on("drag", function (event) {
                                event.stopPropagation();
                            });
                            var upHandle_1 = iv.on("pointer-up", function () {
                                dragHandle_1.remove();
                                upHandle_1.remove();
                                moveHandle_1.remove();
                                _this._syncUserViewToOverviewView(true);
                            });
                        }
                    });
                    event.stopPropagation();
                });
                iv.then(function () {
                    // TODO: whenify
                    // this._internalView.when(() => {
                    watchUtils.whenTrue(userView, "stationary", function () {
                        // TODO: check mode
                        _this._syncViewToOverviewView();
                    });
                    watchUtils.init(userView, "center, size", function () {
                        _this._syncToUserExtent();
                    });
                });
                _this._internalView = iv;
            });
        };
        __decorate([
            decorators_1.property()
        ], Overview.prototype, "mode", void 0);
        __decorate([
            decorators_1.property()
        ], Overview.prototype, "type", void 0);
        __decorate([
            decorators_1.property()
        ], Overview.prototype, "view", void 0);
        Overview = __decorate([
            decorators_1.subclass("Overview")
        ], Overview);
        return Overview;
    }(decorators_1.declared(Widget)));
    return Overview;
});
//# sourceMappingURL=Overview.js.map