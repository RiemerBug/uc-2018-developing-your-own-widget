/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

import MapView = require("esri/views/MapView");

// esri.core.accessorSupport
import { aliasOf, declared, property, subclass } from "esri/core/accessorSupport/decorators";

// esri.core
import { once } from "esri/core/watchUtils";

// esri.widgets
import Widget = require("esri/widgets/Widget");

// esri.widgets.support
import { accessibleHandler, renderable, tsx } from "esri/widgets/support/widget";
import WebMapShowcaseViewModel = require("./WebMapShowcaseViewModel");

const CSS = {
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

const ticksToNext = 10;
const tickRateInMs = 1000;

interface WebMapShowcaseProperties {
  view: MapView;
}

@subclass("esri.widgets.WebMapShowcase")
class WebMapShowcase extends declared(Widget) {
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  constructor(props: WebMapShowcaseProperties) {
    super();
  }

  postInitialize() {
    this.own([
      once(this, "viewModel.webMaps", () => {
        const intervalId = setInterval(() => {
          this._currentTick++;

          if (this._currentTick === ticksToNext) {
            this._currentTick = 0;
            this.viewModel.next();
          }

          this.own({
            remove() {
              clearInterval(intervalId);
            }
          });

          this.scheduleRender();
        }, tickRateInMs);
      })
    ]);
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

  @aliasOf("viewModel.view") view: MapView = null;

  @property()
  @renderable(["active"])
  viewModel: WebMapShowcaseViewModel = new WebMapShowcaseViewModel();

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  render() {
    const { active } = this.viewModel;

    return (
      <div class={this.classes(CSS.esriWidget, CSS.root)}>
        {active ? this.renderContent() : this.renderLoader()}
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
      <div class={CSS.panel} key="content">
        {this.renderInfoCard()}
      </div>
    );
  }

  protected renderInfoCard() {
    const { active } = this.viewModel;

    return (
      <div class={CSS.details}>
        <div class={CSS.item}>
          <img class={CSS.image} src={active.thumbnailUrl} />
          {this.renderCountdown()}
        </div>

        <h1 class={this.classes(CSS.esriHeader, CSS.header)}>
          {this.renderIconLink(active.title, `${active.portal.url}/home/item.html?id=${active.id}`)}
        </h1>

        <div class={CSS.modifiedDate}>{active.modified.toLocaleString()}</div>

        <div class={CSS.description} innerHTML={active.description} />
      </div>
    );
  }

  protected renderIconLink(label: string, href: string) {
    return (
      <a class={CSS.itemLink} href={href} target="_blank">
        {label}
      </a>
    );
  }

  protected renderLoader() {
    return <div class={CSS.loader} key="loader" />;
  }

  protected renderCountdown() {
    const max = 100;
    const value = max - this._currentTick * (ticksToNext + 1);

    return <progress class={CSS.countdownBar} value={value} max={max} />;
  }
}

export = WebMapShowcase;
