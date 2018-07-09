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
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "esri/widgets/Widget", "esri/core/accessorSupport/decorators", "esri/widgets/support/widget"], function (require, exports, __extends, __decorate, Widget, decorators_1, widget_1) {
    "use strict";
    var CSS = {
        base: "custom-widget",
        enabled: "custom-widget--enabled"
    };
    var CustomWidget = /** @class */ (function (_super) {
        __extends(CustomWidget, _super);
        //--------------------------------------------------------------------------
        //
        //  Lifecycle
        //
        //--------------------------------------------------------------------------
        function CustomWidget() {
            var _this = _super.call(this) || this;
            //--------------------------------------------------------------------------
            //
            //  Properties
            //
            //--------------------------------------------------------------------------
            _this.enabled = false;
            return _this;
        }
        //--------------------------------------------------------------------------
        //
        //  Public Methods
        //
        //--------------------------------------------------------------------------
        CustomWidget.prototype.render = function () {
            var enabled = this.enabled;
            var rootClasses = (_a = {},
                _a[CSS.enabled] = enabled,
                _a);
            var text = enabled ? "Enabled" : "Disabled";
            return (widget_1.tsx("div", { bind: this, onclick: this._toggle, class: this.classes(CSS.base, rootClasses) }, text));
            var _a;
        };
        //--------------------------------------------------------------------------
        //
        //  Public Methods
        //
        //--------------------------------------------------------------------------
        CustomWidget.prototype._toggle = function () {
            this.enabled = !this.enabled;
        };
        __decorate([
            decorators_1.property(),
            widget_1.renderable()
        ], CustomWidget.prototype, "enabled", void 0);
        CustomWidget = __decorate([
            decorators_1.subclass("esri.demo.CustomWidget")
        ], CustomWidget);
        return CustomWidget;
    }(decorators_1.declared(Widget)));
    return CustomWidget;
});
//# sourceMappingURL=CustomWidget.js.map