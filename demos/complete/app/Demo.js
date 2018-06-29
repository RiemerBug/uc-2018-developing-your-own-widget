/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />
var __extends =
  (this && this.__extends) ||
  (function() {
    var extendStatics =
      Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array &&
        function(d, b) {
          d.__proto__ = b;
        }) ||
      function(d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
      };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
    };
  })();
var __decorate =
  (this && this.__decorate) ||
  function(decorators, target, key, desc) {
    var c = arguments.length,
      r = c < 3 ? target : desc === null ? (desc = Object.getOwnPropertyDescriptor(target, key)) : desc,
      d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
define([
  "require",
  "exports",
  "esri/core/tsSupport/declareExtendsHelper",
  "esri/core/tsSupport/decorateHelper",
  "esri/WebMap",
  "esri/portal/Portal",
  "esri/portal/PortalQueryParams",
  "esri/core/accessorSupport/decorators",
  "esri/core/watchUtils",
  "esri/widgets/Widget",
  "esri/widgets/support/widget"
], function(
  require,
  exports,
  __extends,
  __decorate,
  WebMap,
  Portal,
  PortalQueryParams,
  decorators_1,
  watchUtils_1,
  Widget,
  widget_1
) {
  "use strict";
  var CSS = {
    root: "esri-widget esri-demo",
    header: "esri-demo__header esri-widget__header",
    details: "esri-demo__details"
  };
  var ticksToNext = 10;
  var tickRateInMs = 1000;
  var Demo = /** @class */ (function(_super) {
    __extends(Demo, _super);
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    function Demo(props) {
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
      _this.webMaps = null;
      _this.view = null;
      return _this;
    }
    Demo.prototype.initialize = function() {
      var _this = this;
      var portal = new Portal();
      this.own(
        watchUtils_1.once(this, "webMaps", function() {
          _this._next();
          var intervalId = setInterval(function() {
            _this._currentTick++;
            if (_this._currentTick === ticksToNext) {
              _this._currentTick = 0;
              _this._next();
            }
            _this.own({
              remove: function() {
                clearInterval(intervalId);
              }
            });
            _this.scheduleRender();
          }, tickRateInMs);
        })
      );
      // TODO: extract to method
      var query = 'type:"Web Map" AND -type:"Web Mapping Application"';
      portal
        .load()
        .then(function() {
          return portal.queryItems(new PortalQueryParams({ query: query }));
        })
        .then(function(queryResults) {
          return _this._set("webMaps", queryResults.results);
        });
    };
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    Demo.prototype.render = function() {
      return widget_1.tsx("div", { class: CSS.root }, this.active ? this.renderContent() : this.renderLoader());
    };
    //--------------------------------------------------------------------------
    //
    //  Protected Methods
    //
    //--------------------------------------------------------------------------
    Demo.prototype.renderContent = function() {
      return widget_1.tsx("div", { class: "demo-panel" }, this.renderInfoCard(), this.renderCountdown());
    };
    Demo.prototype.renderInfoCard = function() {
      var portalItem = this.active;
      return widget_1.tsx(
        "div",
        { class: CSS.details, key: "card" },
        widget_1.tsx("h1", { class: CSS.header }, portalItem.title),
        widget_1.tsx(
          "div",
          { class: "demo-item" },
          widget_1.tsx("h2", { class: "esri-widget__header" }, "Description"),
          widget_1.tsx("div", { class: "avenir-italic demo-description", innerHTML: portalItem.description })
        ),
        widget_1.tsx(
          "div",
          { class: "demo-item" },
          widget_1.tsx("h2", { class: "esri-widget__header" }, "Last updated"),
          widget_1.tsx("div", null, portalItem.modified)
        ),
        widget_1.tsx(
          "div",
          { class: "demo-item" },
          widget_1.tsx("h2", { class: "esri-widget__header" }, "Links"),
          widget_1.tsx(
            "div",
            { class: "demo-urls" },
            this.renderIconLink("Item", "https://www.arcgis.com/home/item.html?id=" + portalItem.id)
          )
        )
      );
    };
    Demo.prototype.renderIconLink = function(label, href) {
      return widget_1.tsx(
        "a",
        { class: "demo-link-item", href: href, target: "_blank" },
        widget_1.tsx("span", { class: "demo-icon esri-icon-link-external" }),
        " ",
        label
      );
    };
    Demo.prototype.renderLoader = function() {
      return widget_1.tsx("div", { class: "demo-loader", key: "loader" });
    };
    Demo.prototype.renderCountdown = function() {
      var styles = {
        width: 100 - this._currentTick * 11 + "%"
      };
      return widget_1.tsx(
        "div",
        { class: "demo-countdown", key: "countdown" },
        widget_1.tsx("div", { class: "demo-countdown-bar", styles: styles })
      );
    };
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    Demo.prototype._next = function() {
      var webMaps = this.webMaps;
      var index = webMaps.indexOf(this.active) + 1;
      if (index === webMaps.length) {
        index = 0;
      }
      var portalItem = webMaps[index];
      this._set("active", portalItem);
      this.view.map = new WebMap({ portalItem: portalItem });
    };
    __decorate([decorators_1.property({ readOnly: true }), widget_1.renderable()], Demo.prototype, "active", void 0);
    __decorate([decorators_1.property({ readOnly: true })], Demo.prototype, "webMaps", void 0);
    __decorate([decorators_1.property()], Demo.prototype, "view", void 0);
    Demo = __decorate([decorators_1.subclass("esri.widgets.WebMapShowcase")], Demo);
    return Demo;
  })(decorators_1.declared(Widget));
  return Demo;
});
//# sourceMappingURL=Demo.js.map
