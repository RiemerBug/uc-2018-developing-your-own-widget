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
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "esri/core/accessorSupport/decorators", "esri/core/watchUtils", "esri/widgets/Widget", "esri/widgets/support/widget", "./WebMapShowcaseViewModel"], function (require, exports, __extends, __decorate, decorators_1, watchUtils_1, Widget, widget_1, WebMapShowcaseViewModel) {
    "use strict";
    // todo: a11y testing
    // todo: should show pause/play button to stop automatically changing.
    // homework: should show pause/play button to stop automatically changing.
    var CSS = {
        root: "esri-webmap-showcase",
        header: "esri-webmap-showcase__header",
        details: "esri-webmap-showcase__details",
        itemLink: "esri-webmap-showcase__item-link",
        modifiedDate: "esri-webmap-showcase__modified-date",
        panel: "esri-webmap-showcase__panel",
        item: "esri-webmap-showcase__item",
        image: "esri-webmap-showcase__image",
        description: "esri-webmap-showcase__description",
        loader: "esri-webmap-showcase__loader",
        countdownBar: "esri-webmap-showcase__countdown-bar",
        // common
        esriWidget: "esri-widget",
        esriHeader: "esri-widget__header"
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
            _this.view = null;
            _this.viewModel = new WebMapShowcaseViewModel();
            return _this;
        }
        WebMapShowcase.prototype.postInitialize = function () {
            var _this = this;
            this.own([
                watchUtils_1.once(this, "viewModel.webMaps", function () {
                    var intervalId = setInterval(function () {
                        _this._currentTick++;
                        if (_this._currentTick === ticksToNext) {
                            _this._currentTick = 0;
                            _this.viewModel.next();
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
        };
        //--------------------------------------------------------------------------
        //
        //  Public Methods
        //
        //--------------------------------------------------------------------------
        WebMapShowcase.prototype.render = function () {
            var active = this.viewModel.active;
            return (widget_1.tsx("div", { class: this.classes(CSS.esriWidget, CSS.root) }, active ? this.renderContent() : this.renderLoader()));
        };
        //--------------------------------------------------------------------------
        //
        //  Protected Methods
        //
        //--------------------------------------------------------------------------
        WebMapShowcase.prototype.renderContent = function () {
            return (widget_1.tsx("div", { class: CSS.panel, key: "content" }, this.renderInfoCard()));
        };
        WebMapShowcase.prototype.renderInfoCard = function () {
            var active = this.viewModel.active;
            return (widget_1.tsx("div", { class: CSS.details },
                widget_1.tsx("div", { class: CSS.item },
                    widget_1.tsx("img", { class: CSS.image, src: active.thumbnailUrl }),
                    this.renderCountdown()),
                widget_1.tsx("h1", { class: this.classes(CSS.esriHeader, CSS.header) }, this.renderIconLink(active.title, active.portal.url + "/home/item.html?id=" + active.id)),
                widget_1.tsx("div", { class: CSS.modifiedDate }, active.modified.toLocaleString()),
                widget_1.tsx("div", { class: CSS.description, innerHTML: active.description })));
        };
        WebMapShowcase.prototype.renderIconLink = function (label, href) {
            return (widget_1.tsx("a", { class: CSS.itemLink, href: href, target: "_blank" }, label));
        };
        WebMapShowcase.prototype.renderLoader = function () {
            return widget_1.tsx("div", { class: CSS.loader, key: "loader" });
        };
        WebMapShowcase.prototype.renderCountdown = function () {
            var max = 100;
            var value = max - this._currentTick * (ticksToNext + 1);
            return widget_1.tsx("progress", { class: CSS.countdownBar, value: value, max: max });
        };
        __decorate([
            decorators_1.aliasOf("viewModel.view")
        ], WebMapShowcase.prototype, "view", void 0);
        __decorate([
            decorators_1.property(),
            widget_1.renderable(["active"])
        ], WebMapShowcase.prototype, "viewModel", void 0);
        WebMapShowcase = __decorate([
            decorators_1.subclass("esri.widgets.WebMapShowcase")
        ], WebMapShowcase);
        return WebMapShowcase;
    }(decorators_1.declared(Widget)));
    return WebMapShowcase;
});
//# sourceMappingURL=WebMapShowcase.js.map