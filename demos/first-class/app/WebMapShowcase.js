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
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "esri/WebMap", "esri/portal/Portal", "esri/portal/PortalQueryParams", "esri/core/accessorSupport/decorators", "esri/core/Accessor"], function (require, exports, __extends, __decorate, WebMap, Portal, PortalQueryParams, decorators_1, Accessor) {
    "use strict";
    var WebMapShowcase = /** @class */ (function (_super) {
        __extends(WebMapShowcase, _super);
        //--------------------------------------------------------------------------
        //
        //  Lifecycle
        //
        //--------------------------------------------------------------------------
        function WebMapShowcase(props) {
            var _this = _super.call(this) || this;
            //--------------------------------------------------------------------------
            //
            //  Properties
            //
            //--------------------------------------------------------------------------
            //----------------------------------
            //  active
            //----------------------------------
            _this.active = null;
            //----------------------------------
            //  portal
            //----------------------------------
            _this.portal = Portal.getDefault();
            //----------------------------------
            //  webMapGroupId
            //----------------------------------
            _this.webMapGroupId = "a09a1595fd944f17a47a244e67d804f9";
            //----------------------------------
            //  webMaps
            //----------------------------------
            _this.webMaps = null;
            //----------------------------------
            //  view
            //----------------------------------
            _this.view = null;
            return _this;
        }
        WebMapShowcase.prototype.initialize = function () {
            var _this = this;
            this._fetchWebMaps()
                .then(function (results) {
                _this._set("webMaps", results);
                _this._setActive(results[0]); // set first as `active`
            });
        };
        //--------------------------------------------------------------------------
        //
        //  Public Methods
        //
        //--------------------------------------------------------------------------
        WebMapShowcase.prototype.next = function () {
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
        WebMapShowcase.prototype._fetchWebMaps = function () {
            var _a = this, portal = _a.portal, webMapGroupId = _a.webMapGroupId;
            var webMapsFromGroupQuery = "group:" + webMapGroupId + " AND type:\"Web Map\" AND -type:\"Web Mapping Application\"";
            return portal
                .load()
                .then(function () { return portal.queryItems(new PortalQueryParams({ query: webMapsFromGroupQuery })); })
                .then(function (queryResults) { return queryResults.results; });
        };
        WebMapShowcase.prototype._setActive = function (portalItem) {
            var view = this.view;
            this._set("active", portalItem);
            var webMap = new WebMap({ portalItem: portalItem });
            webMap.when(function () { return (view.viewpoint = webMap.initialViewProperties.viewpoint); });
            view.map = webMap;
        };
        __decorate([
            decorators_1.property({ readOnly: true })
        ], WebMapShowcase.prototype, "active", void 0);
        __decorate([
            decorators_1.property()
        ], WebMapShowcase.prototype, "portal", void 0);
        __decorate([
            decorators_1.property()
        ], WebMapShowcase.prototype, "webMapGroupId", void 0);
        __decorate([
            decorators_1.property({ readOnly: true })
        ], WebMapShowcase.prototype, "webMaps", void 0);
        __decorate([
            decorators_1.property()
        ], WebMapShowcase.prototype, "view", void 0);
        WebMapShowcase = __decorate([
            decorators_1.subclass("esri.widgets.WebMapShowcase")
        ], WebMapShowcase);
        return WebMapShowcase;
    }(decorators_1.declared(Accessor)));
    return WebMapShowcase;
});
//# sourceMappingURL=WebMapShowcase.js.map