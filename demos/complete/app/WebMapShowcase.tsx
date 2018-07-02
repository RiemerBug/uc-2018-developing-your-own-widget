/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

import MapView = require("esri/views/MapView");
import WebMap = require("esri/WebMap");

import Portal = require("esri/portal/Portal");
import PortalItem = require("esri/portal/PortalItem");
import PortalQueryParams = require("esri/portal/PortalQueryParams");

// esri.core.accessorSupport
import { declared, property, subclass } from "esri/core/accessorSupport/decorators";

// esri.core
import { once } from "esri/core/watchUtils";

// esri.widgets
import Widget = require("esri/widgets/Widget");

// esri.widgets.support
import { accessibleHandler, renderable, tsx } from "esri/widgets/support/widget";

// todo: rtl support with sass
// todo: iconclass and label
// todo: a11y testing
// todo: Should show item thumbnail image
// todo: should show pause/play button to stop automatically changing.
// todo: instead of random query, pull from a group id. Use this one by default: http://www.arcgis.com/home/group.html?id=a09a1595fd944f17a47a244e67d804f9#overview

const CSS = {
  root: "esri-webmap-showcase",
  header: "esri-webmap-showcase__header",
  headerMain: "esri-webmap-showcase__header--main",
  details: "esri-webmap-showcase__details",
  panel: "esri-webmap-showcase__panel",
  item: "esri-webmap-showcase__item",
  description: "esri-webmap-showcase__description",
  urls: "esri-webmap-showcase__urls",
  link: "esri-webmap-showcase__link-item",
  loader: "esri-webmap-showcase__loader",
  countdown: "esri-webmap-showcase__countdown",
  countdownBar: "esri-webmap-showcase__countdown-bar",
  linkIcon: "esri-webmap-showcase__icon",

  // common
  esriWidget: "esri-widget",
  esriHeader: "esri-widget__header",
  esriIconLinkExternal: "esri-icon-link-external"
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

  initialize() {
    // todo: should this be portal.getDefault()?
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

    portal
      .load()
      .then(() => portal.queryItems(new PortalQueryParams({ query })))
      .then((queryResults) => this._set("webMaps", queryResults.results));
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

  @property() view: MapView[] = null;

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  render() {
    return (
      <div class={this.classes(CSS.esriWidget, CSS.root)}>
        {this.active ? this.renderContent() : this.renderLoader()}
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
        {this.renderCountdown()}
      </div>
    );
  }

  protected renderInfoCard() {
    // todo: i18n.
    const portalItem: PortalItem = this.active;

    return (
      <div class={CSS.details}>
        <h1 class={this.classes(CSS.esriHeader, CSS.header, CSS.headerMain)}>{portalItem.title}</h1>

        <div class={CSS.item}>
          <h2 class={CSS.header}>Description</h2>
          <div class={CSS.description} innerHTML={portalItem.description} />
        </div>

        <div class={CSS.item}>
          <h2 class={CSS.header}>Last updated</h2>
          <div>{portalItem.modified}</div>
        </div>

        <div class={CSS.item}>
          <h2 class={CSS.header}>Links</h2>
          <div class={CSS.urls}>
            {this.renderIconLink(
              "Item",
              `https://www.arcgis.com/home/item.html?id=${portalItem.id}` // todo: should use portal url
            )}
          </div>
        </div>
      </div>
    );
  }

  protected renderIconLink(label: string, href: string) {
    return (
      <a class={CSS.link} href={href} target="_blank">
        <span class={this.classes(CSS.esriIconLinkExternal, CSS.linkIcon)} /> {label}
      </a>
    );
  }

  protected renderLoader() {
    return <div class={CSS.loader} key="loader" />;
  }

  protected renderCountdown() {
    const styles = {
      width: `${100 - this._currentTick * 11}%`
    };

    // todo: maybe HTML5 progress bar? Would get rid of the inline style

    return (
      <div class={CSS.countdown}>
        <div class={CSS.countdownBar} styles={styles} />
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

export = WebMapShowcase;
