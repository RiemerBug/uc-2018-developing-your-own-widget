/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

import Widget = require("esri/widgets/Widget");

import { declared, subclass } from "esri/core/accessorSupport/decorators";

import { tsx } from "esri/widgets/support/widget";

@subclass("esri.widgets.WebMapShowcase")
class WebMapShowcase extends declared(Widget) {
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  constructor() {
    super();
  }

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  render() {
    return <div>Hello World</div>;
  }
}

export = WebMapShowcase;
