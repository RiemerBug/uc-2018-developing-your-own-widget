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
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "esri/WebMap", "esri/portal/Portal", "esri/portal/PortalQueryParams", "dojo/i18n!./nls/WebMapShowcase", "esri/core/accessorSupport/decorators", "esri/core/watchUtils", "esri/widgets/Widget", "esri/widgets/support/widget"], function (require, exports, __extends, __decorate, WebMap, Portal, PortalQueryParams, i18n, decorators_1, watchUtils_1, Widget, widget_1) {
    "use strict";
    // todo: a11y testing
    // todo: should show pause/play button to stop automatically changing.
    // homework: should show pause/play button to stop automatically changing.
    var CSS = {
        root: "esri-webmap-showcase",
        header: "esri-webmap-showcase__header",
        headerMain: "esri-webmap-showcase__header--main",
        details: "esri-webmap-showcase__details",
        panel: "esri-webmap-showcase__panel",
        item: "esri-webmap-showcase__item",
        image: "esri-webmap-showcase__image",
        description: "esri-webmap-showcase__description",
        urls: "esri-webmap-showcase__urls",
        link: "esri-webmap-showcase__link-item",
        loader: "esri-webmap-showcase__loader",
        countdownBar: "esri-webmap-showcase__countdown-bar",
        linkIcon: "esri-webmap-showcase__icon",
        // common
        esriWidget: "esri-widget",
        esriHeader: "esri-widget__header",
        esriIconLinkExternal: "esri-icon-link-external"
    };
    var ticksToNext = 10;
    var tickRateInMs = 1000;
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
            //  Variables
            //
            //--------------------------------------------------------------------------
            _this._currentTick = 0;
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
        WebMapShowcase.prototype.postInitialize = function () {
            var _this = this;
            this.own([
                watchUtils_1.once(this, "webMaps", function () {
                    _this._next();
                    var intervalId = setInterval(function () {
                        _this._currentTick++;
                        if (_this._currentTick === ticksToNext) {
                            _this._currentTick = 0;
                            _this._next();
                        }
                        _this.own({
                            remove: function () {
                                clearInterval(intervalId);
                            }
                        });
                        _this.scheduleRender();
                    }, tickRateInMs);
                })
            ]);
            var portal = this.portal;
            var webMapsFromGroupQuery = "group:" + this.webMapGroupId + " AND type:\"Web Map\" AND -type:\"Web Mapping Application\"";
            portal
                .load()
                .then(function () { return portal.queryItems(new PortalQueryParams({ query: webMapsFromGroupQuery })); })
                .then(function (queryResults) { return _this._set("webMaps", queryResults.results); });
        };
        //--------------------------------------------------------------------------
        //
        //  Public Methods
        //
        //--------------------------------------------------------------------------
        WebMapShowcase.prototype.render = function () {
            return (widget_1.tsx("div", { class: this.classes(CSS.esriWidget, CSS.root) }, this.active ? this.renderContent() : this.renderLoader()));
        };
        //--------------------------------------------------------------------------
        //
        //  Protected Methods
        //
        //--------------------------------------------------------------------------
        WebMapShowcase.prototype.renderContent = function () {
            return (widget_1.tsx("div", { class: CSS.panel, key: "content" },
                this.renderInfoCard(),
                this.renderCountdown()));
        };
        WebMapShowcase.prototype.renderInfoCard = function () {
            var portalItem = this.active;
            return (widget_1.tsx("div", { class: CSS.details },
                widget_1.tsx("h1", { class: this.classes(CSS.esriHeader, CSS.header, CSS.headerMain) }, portalItem.title),
                widget_1.tsx("div", { class: CSS.item },
                    widget_1.tsx("img", { class: CSS.image, src: portalItem.thumbnailUrl })),
                widget_1.tsx("div", { class: CSS.item },
                    widget_1.tsx("h2", { class: CSS.header }, "Description"),
                    widget_1.tsx("div", { class: CSS.description, innerHTML: portalItem.description })),
                widget_1.tsx("div", { class: CSS.item },
                    widget_1.tsx("h2", { class: CSS.header }, i18n.lastUpdated),
                    widget_1.tsx("div", null, portalItem.modified)),
                widget_1.tsx("div", { class: CSS.item },
                    widget_1.tsx("h2", { class: CSS.header }, i18n.links),
                    widget_1.tsx("div", { class: CSS.urls }, this.renderIconLink(i18n.item, "https://www.arcgis.com/home/item.html?id=" + portalItem.id // todo: should use portal url
                    )))));
        };
        WebMapShowcase.prototype.renderIconLink = function (label, href) {
            return (widget_1.tsx("a", { class: CSS.link, href: href, target: "_blank" },
                widget_1.tsx("span", { class: this.classes(CSS.esriIconLinkExternal, CSS.linkIcon) }),
                " ",
                label));
        };
        WebMapShowcase.prototype.renderLoader = function () {
            return widget_1.tsx("div", { class: CSS.loader, key: "loader" });
        };
        WebMapShowcase.prototype.renderCountdown = function () {
            var max = 100;
            var value = max - this._currentTick * (ticksToNext + 1);
            return widget_1.tsx("progress", { class: CSS.countdownBar, value: value, max: max });
        };
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        WebMapShowcase.prototype._next = function () {
            var _a = this, webMaps = _a.webMaps, view = _a.view;
            var index = webMaps.indexOf(this.active) + 1;
            if (index === webMaps.length) {
                index = 0;
            }
            var portalItem = webMaps[index];
            this._set("active", portalItem);
            var webMap = new WebMap({ portalItem: portalItem });
            webMap.when(function () { return view.viewpoint = webMap.initialViewProperties.viewpoint; });
            view.map = webMap;
        };
        __decorate([
            decorators_1.property({ readOnly: true }),
            widget_1.renderable()
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
    }(decorators_1.declared(Widget)));
    return WebMapShowcase;
});
//# sourceMappingURL=WebMapShowcase.js.map