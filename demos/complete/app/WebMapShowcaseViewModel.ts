/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

import MapView = require("esri/views/MapView");
import WebMap = require("esri/WebMap");

import Portal = require("esri/portal/Portal");
import PortalItem = require("esri/portal/PortalItem");
import PortalQueryParams = require("esri/portal/PortalQueryParams");

import { declared, property, subclass } from "esri/core/accessorSupport/decorators";

import Accessor = require("esri/core/Accessor");

interface WebMapShowcaseViewModelProperties {
  readonly active: PortalItem;
  readonly webMaps: PortalItem[];

  view: MapView;
  portal: Portal;
  webMapGroupId: string;
}

@subclass("esri.widgets.WebMapShowcaseViewModel")
class WebMapShowcaseViewModel extends declared(Accessor) {
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  constructor(props?: WebMapShowcaseViewModelProperties) {
    super();
  }

  initialize() {
    const { portal, webMapGroupId } = this;
    const webMapsFromGroupQuery = `group:${webMapGroupId} AND type:"Web Map" AND -type:"Web Mapping Application"`;

    portal
      .load()
      .then(() => portal.queryItems(new PortalQueryParams({ query: webMapsFromGroupQuery })))
      .then((queryResults) => {
        const { results } = queryResults;
        this._set("webMaps", results);
        this._setActive(results[0]); // set first as active
      });
  }

  //--------------------------------------------------------------------------
  //
  //  Variables
  //
  //--------------------------------------------------------------------------

  private _setup: IHandle;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  @property({ readOnly: true })
  readonly active: PortalItem = null;

  @property() portal: Portal = Portal.getDefault();

  @property() webMapGroupId: string = "a09a1595fd944f17a47a244e67d804f9";

  @property({ readOnly: true })
  readonly webMaps: PortalItem[] = null;

  @property() view: MapView = null;

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  next(): void {
    const { webMaps } = this;

    let index = webMaps.indexOf(this.active) + 1;

    if (index === webMaps.length) {
      index = 0;
    }

    this._setActive(webMaps[index]);
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private _setActive(portalItem: PortalItem): void {
    const { view } = this;

    this._set("active", portalItem);

    const webMap = new WebMap({ portalItem });

    webMap.when(() => (view.viewpoint = webMap.initialViewProperties.viewpoint));

    view.map = webMap as any;
  }
}

export = WebMapShowcaseViewModel;
