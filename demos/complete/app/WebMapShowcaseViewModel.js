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
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "esri/WebMap", "esri/portal/Portal", "esri/portal/PortalQueryParams", "esri/core/accessorSupport/decorators", "esri/widgets/support/widget", "esri/core/Accessor"], function (require, exports, __extends, __decorate, WebMap, Portal, PortalQueryParams, decorators_1, widget_1, Accessor) {
    "use strict";
    var WebMapShowcaseViewModel = /** @class */ (function (_super) {
        __extends(WebMapShowcaseViewModel, _super);
        //--------------------------------------------------------------------------
        //
        //  Lifecycle
        //
        //--------------------------------------------------------------------------
        function WebMapShowcaseViewModel(props) {
            var _this = _super.call(this) || this;
            //--------------------------------------------------------------------------
            //
            //  Properties
            //
            //--------------------------------------------------------------------------
            _this.active = null;
            _this.portal = Portal.getDefault();
            _this.webMapGroupId = "a09a1595fd944f17a47a244e67d804f9";
            _this.webMaps = null;
            _this.view = null;
            return _this;
        }
        WebMapShowcaseViewModel.prototype.initialize = function () {
            var _this = this;
            this._setup = this.watch("view", function () {
                var _a = _this, portal = _a.portal, webMapGroupId = _a.webMapGroupId;
                var webMapsFromGroupQuery = "group:" + webMapGroupId + " AND type:\"Web Map\" AND -type:\"Web Mapping Application\"";
                portal
                    .load()
                    .then(function () { return portal.queryItems(new PortalQueryParams({ query: webMapsFromGroupQuery })); })
                    .then(function (queryResults) {
                    var results = queryResults.results;
                    _this._set("webMaps", results);
                    _this._setActive(results[0]); // set first as active
                });
            });
        };
        WebMapShowcaseViewModel.prototype.destroy = function () {
            this._setup.remove();
            this._setup = null;
        };
        //--------------------------------------------------------------------------
        //
        //  Public Methods
        //
        //--------------------------------------------------------------------------
        WebMapShowcaseViewModel.prototype.next = function () {
            var webMaps = this.webMaps;
            var index = webMaps.indexOf(this.active) + 1;
            if (index === webMaps.length) {
                index = 0;
            }
            this._setActive(webMaps[index]);
        };
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        WebMapShowcaseViewModel.prototype._setActive = function (portalItem) {
            var view = this.view;
            this._set("active", portalItem);
            var webMap = new WebMap({ portalItem: portalItem });
            webMap.when(function () { return (view.viewpoint = webMap.initialViewProperties.viewpoint); });
            view.map = webMap;
        };
        __decorate([
            decorators_1.property({ readOnly: true }),
            widget_1.renderable()
        ], WebMapShowcaseViewModel.prototype, "active", void 0);
        __decorate([
            decorators_1.property()
        ], WebMapShowcaseViewModel.prototype, "portal", void 0);
        __decorate([
            decorators_1.property()
        ], WebMapShowcaseViewModel.prototype, "webMapGroupId", void 0);
        __decorate([
            decorators_1.property({ readOnly: true })
        ], WebMapShowcaseViewModel.prototype, "webMaps", void 0);
        __decorate([
            decorators_1.property()
        ], WebMapShowcaseViewModel.prototype, "view", void 0);
        WebMapShowcaseViewModel = __decorate([
            decorators_1.subclass("esri.widgets.WebMapShowcaseViewModel")
        ], WebMapShowcaseViewModel);
        return WebMapShowcaseViewModel;
    }(decorators_1.declared(Accessor)));
    return WebMapShowcaseViewModel;
});
//# sourceMappingURL=WebMapShowcaseViewModel.js.map