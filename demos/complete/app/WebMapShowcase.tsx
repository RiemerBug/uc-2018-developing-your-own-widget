/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

import MapView = require("esri/views/MapView");
import Widget = require("esri/widgets/Widget");

import WebMapShowcaseViewModel = require("./WebMapShowcaseViewModel");

import i18n = require("dojo/i18n!./nls/WebMapShowcase");

import { aliasOf, declared, property, subclass } from "esri/core/accessorSupport/decorators";
import { once } from "esri/core/watchUtils";
import { accessibleHandler, renderable, tsx } from "esri/widgets/support/widget";

const CSS = {
  root: "esri-webmap-showcase",
  header: "esri-webmap-showcase__header",
  details: "esri-webmap-showcase__details",
  itemLink: "esri-webmap-showcase__item-link",
  modifiedDate: "esri-webmap-showcase__modified-date",

  panel: "esri-webmap-showcase__panel",
  item: "esri-webmap-showcase__item",
  itemControl: "esri-webmap-showcase__item-control",
  image: "esri-webmap-showcase__image",
  description: "esri-webmap-showcase__description",

  loader: "esri-webmap-showcase__loader",
  countdownBar: "esri-webmap-showcase__countdown-bar",

  // common
  esriWidget: "esri-widget",
  esriHeader: "esri-widget__header",
  esriIconPlay: "esri-icon-play",
  esriIconPause: "esri-icon-pause"
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
    this.own(
      once(this, "viewModel.webMaps", () => {
        this._playing = true;

        const intervalId = setInterval(() => {
          if (!this._playing) {
            return;
          }

          this._currentTick++;

          if (this._currentTick === ticksToNext) {
            this._currentTick = 0;
            this.viewModel.next();
          }

          this.own({
            remove: () => clearInterval(intervalId)
          });

          this.scheduleRender();
        }, tickRateInMs);
      })
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Variables
  //
  //--------------------------------------------------------------------------

  private _currentTick: number = 0;

  private _playing: boolean = false;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  //----------------------------------
  //  view
  //----------------------------------

  @aliasOf("viewModel.view") view: MapView = null;

  //----------------------------------
  //  viewModel
  //----------------------------------

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

    const { _playing } = this;

    const iconClasses = {
      [CSS.esriIconPlay]: !_playing,
      [CSS.esriIconPause]: _playing
    };

    const buttonText = _playing ? i18n.pause : i18n.play;

    return (
      <div class={CSS.details}>
        <div
          class={CSS.item}
          bind={this}
          tabIndex={0}
          role="button"
          title={buttonText}
          aria-label={buttonText}
          onclick={this._toggleCountdown}
          onkeydown={this._toggleCountdown}
        >
          <span aria-hidden="true" class={this.classes(CSS.itemControl, iconClasses)} />
          <img alt={active.title} class={CSS.image} src={active.thumbnailUrl} />
          {this.renderCountdown()}
        </div>

        <h1 class={this.classes(CSS.esriHeader, CSS.header)}>
          {this.renderIconLink(active.title, `${active.portal.url}/home/item.html?id=${active.id}`)}
        </h1>

        <div class={CSS.modifiedDate}>
          {i18n.lastUpdated} {active.modified.toLocaleString()}
        </div>

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

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  @accessibleHandler()
  private _toggleCountdown(): void {
    this._playing = !this._playing;
    this.scheduleRender();
  }
}

export = WebMapShowcase;
