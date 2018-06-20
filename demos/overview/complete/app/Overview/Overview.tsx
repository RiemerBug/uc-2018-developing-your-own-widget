/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

import {
  declared,
  property,
  subclass
} from "esri/core/accessorSupport/decorators";

import { /*storeNode, */ tsx } from "esri/widgets/support/widget";

import watchUtils = require ("esri/core/watchUtils");

import Extent = require ("esri/geometry/Extent");
import Point = require ("esri/geometry/Point");

import Graphic = require ("esri/Graphic");
import Map = require ("esri/Map");
import Widget = require ("esri/widgets/Widget");
import MapView = require ("esri/views/MapView");
import SceneView = require ("esri/views/SceneView");

const CSS = {
  base: "esri-overview",
  overlay: "esri-overview__overlay",
  view: "esri-overview__view"
};

function isExtent(item: any): item is Extent {
  return item.declaredClass && item.declaredClass === "esri.geometry.Extent";
}

// TODO: SceneView support?
// TODO: show NLS?
// TODO: animate entry       ¡

@subclass("Overview")
class Overview extends declared(Widget) {

  //--------------------------------------------------------------------------
  //
  //  Variables
  //
  //--------------------------------------------------------------------------

  private _userViewGraphic: Graphic = new Graphic({
    symbol: {
      type: "simple-fill",
      color: "rgba(0, 94, 149, 0.75)",
      outline: null
    } as any
  });

  private _internalMap: Map = new Map({
    basemap: "topo" as any
  });

  private _internalView: MapView | SceneView;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  // TODO: revisit public props

  //----------------------------------
  //  mode
  //----------------------------------

  @property()
  mode: "bidirectional" | "mirror-view";

  //----------------------------------
  //  type
  //----------------------------------

  @property()
  type: "2d" | "3d" = "2d";

  //----------------------------------
  //  view
  //----------------------------------

  @property()
  view: MapView | SceneView;

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  render() {
    return (
      <div class={CSS.base}>
        <div afterCreate={this._wireInternalView} bind={this} class={CSS.view} />
      </div>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  // TODO: rename
  private _syncUserViewToOverviewView(animate: boolean = false): void {
    const target = (this._userViewGraphic.geometry as Extent).center;
    (this.view as any).goTo(target, { animate });
  }

  private _syncViewToOverviewView(): void {
    if (!this._internalView) {
      return;
    }

    // TODO: whenify
    this._internalView.then(() => {
      (this._internalView as any).goTo(this.view.extent.clone().expand(2))
    });
  }

  private _syncToUserExtent(): void {
    if (!this._internalView) {
      return;
    }
    this._updateExtentGraphic(this.view.extent);
  }

  private _updateExtentGraphic(extentOrXY: Extent | Point): void {
    let targetGeometry: Extent;

    if (isExtent(extentOrXY)) {
      targetGeometry = extentOrXY;
    }
    else {
      const moved = this._userViewGraphic.geometry.clone() as Extent;
      moved.centerAt(extentOrXY);
      targetGeometry = moved;
    }

    this._internalView.graphics.remove(this._userViewGraphic);
    this._userViewGraphic.geometry = targetGeometry;
    this._userViewGraphic = this._userViewGraphic.clone();
    this._internalView.graphics.add(this._userViewGraphic);
  }

  private _wireInternalView(node: HTMLElement): void {
    // TODO: tidy up

    const userView = this.view;

    userView.then(() => {

      const iv = new MapView({
        container: node as any,

        map: this._internalMap,

        extent: userView.extent.clone().expand(2),

        ui: {
          components: []
        }

      });

      iv.on("pointer-down", event => {
        iv.hitTest(event)
          .then(result => {
            const [graphic] = result.results;

            if (graphic) {
              const moveHandle = iv.on("pointer-move", event => {
                this._updateExtentGraphic(iv.toMap(event));
                event.stopPropagation();
              });

              const dragHandle = iv.on("drag", event => {
                event.stopPropagation();
              });

              const upHandle = iv.on("pointer-up", () => {
                dragHandle.remove();
                upHandle.remove();
                moveHandle.remove();
                this._syncUserViewToOverviewView(true);
              });

            }
          });

        event.stopPropagation();
      });

      iv.then(() => {
        // TODO: whenify
      // this._internalView.when(() => {

        watchUtils.whenTrue(userView, "stationary", () => {
          // TODO: check mode
          this._syncViewToOverviewView();
        });

        watchUtils.init(userView, "center, size", () => {
          this._syncToUserExtent();
        });

      });

      this._internalView = iv;

    });

  }

}

export = Overview;
