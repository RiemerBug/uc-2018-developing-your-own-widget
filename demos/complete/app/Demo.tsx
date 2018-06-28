/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

import MapView = require("esri/views/MapView");
import WebMap = require("esri/WebMap");

import Portal = require("esri/portal/Portal");
import PortalItem = require("esri/portal/PortalItem");
import PortalQueryParams = require("esri/portal/PortalQueryParams");

// esri.core.accessorSupport
import {
  declared,
  property,
  subclass
} from "esri/core/accessorSupport/decorators";

// esri.core
import { once } from "esri/core/watchUtils";

// esri.widgets
import Widget = require("esri/widgets/Widget");

// esri.widgets.support
import {
  accessibleHandler,
  renderable,
  tsx
} from "esri/widgets/support/widget";

const CSS = {
  root: "esri-widget esri-demo",
  header: "esri-demo__header esri-widget__header",
  details: "esri-demo__details",
};

const ticksToNext = 10;
const tickRateInMs = 1000;

interface DemoProperties {
  view: MapView;
}

@subclass("esri.widgets.Demo")
class Demo extends declared(Widget) {

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  constructor(props: DemoProperties) {
    super();
  }

  initialize() {
    const portal = new Portal();

    this.own(
      once(this, "webMaps", () => {
        this._next();

        const intervalId = setInterval(() => {
          this._currentTick++;

          if (this._currentTick === ticksToNext) {
            this._currentTick = 0;
            this._next();
          }

          this.own({
            remove() {
              clearInterval(intervalId);
            }
          });

          this.scheduleRender();

        }, tickRateInMs);
      })
    );

    // TODO: extract to method
    const query = `type:"Web Map" AND -type:"Web Mapping Application"`;

    portal.load()
      .then(() => portal.queryItems(new PortalQueryParams({ query })))
      .then(queryResults => this._set("webMaps", queryResults.results));
  }

  //--------------------------------------------------------------------------
  //
  //  Variables
  //
  //--------------------------------------------------------------------------

  private _currentTick: number = 0;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  @property({ readOnly: true })
  @renderable()
  readonly active: PortalItem = null;

  @property({ readOnly: true })
  readonly webMaps: PortalItem[] = null;

  @property()
  view: MapView[] = null;

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  render() {
    return (
      <div class={CSS.root}>
        {
          this.active ? this.renderContent() : this.renderLoader()
        }
      </div>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Protected Methods
  //
  //--------------------------------------------------------------------------

  protected renderContent() {
    return (
      <div class="demo-panel">
        {this.renderInfoCard()}
          {this.renderCountdown()}
      </div>
    );
  }

  protected renderInfoCard() {
    const portalItem: PortalItem = this.active;

    return (
      <div class={CSS.details} key="card">
        <h1 class={CSS.header}>{portalItem.title}</h1>

        <div class="demo-item">
          <h2 class="esri-widget__header">Description</h2>
          <div class="avenir-italic demo-description"
             innerHTML={portalItem.description} />
        </div>

        <div class="demo-item">
          <h2 class="esri-widget__header">Last updated</h2>
          <div>{portalItem.modified}</div>
        </div>

        <div class="demo-item">
          <h2 class="esri-widget__header">Links</h2>
          <div class="demo-urls">
            {this.renderIconLink("Item", `https://www.arcgis.com/home/item.html?id=${portalItem.id}`)}
          </div>
        </div>
      </div>
    );
  }

  protected renderIconLink(label: string, href: string) {
    return (
      <a class="demo-link-item" href={href} target="_blank">
        <span class="demo-icon esri-icon-link-external" /> {label}
      </a>
    );
  }

  protected renderLoader() {
    return (
      <div class="demo-loader" key="loader" />
    )
  }

  protected renderCountdown() {
    const styles = {
      width: `${100 - ((this._currentTick) * 11)}%`
    };

    return (
      <div class="demo-countdown" key="countdown">
        <div class="demo-countdown-bar" styles={styles} />
      </div>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private _next(): void {
    const { webMaps } = this;

    let index = webMaps.indexOf(this.active) + 1;

    if (index === webMaps.length) {
      index = 0;
    }

    const portalItem = webMaps[index];

    this._set("active", portalItem);

    this.view.map = new WebMap({ portalItem }) as any;
  }

}

export = Demo;
