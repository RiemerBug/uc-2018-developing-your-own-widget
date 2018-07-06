# Updated View Steps

## 1. Convert `CustomClass` to `WebMapShowcaseViewModel`

Rename `CustomClass.ts` to `WebMapShowcaseViewModel.ts`. We will use the CustomClass as our widget's ViewModel.

Rename class within file.

```ts
@subclass("esri.demo.WebMapShowcaseViewModel")
class WebMapShowcaseViewModel extends declared(Accessor) {
```

Remove references to `CustomClass` in `main.ts`. The following should be removed

```ts
//----------------
//  Custom Class setup
//----------------

const customClass = new CustomClass({ view });

// show next webmap every 10 seconds
setInterval(() => customClass.next(), 10000);
```

## Import ViewModel into Widget View

Lets get the ViewModel to use it as the logic for our widget.

```ts
import WebMapShowcaseViewModel = require("./WebMapShowcaseViewModel");
```

Add Widget Properties

```ts
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
```

Import `aliasOf` & `property` from accessor decorators

```ts
import { aliasOf, declared, property, subclass } from "esri/core/accessorSupport/decorators";
```

Import `renderable` from widget decorators

```ts
import { renderable, tsx } from "esri/widgets/support/widget";
```

Import MapView

```ts
import MapView = require("esri/views/MapView");
```

## Modify Widget Rendering

Lets modify what the widget will render.

```tsx
render() {
  const { active } = this.viewModel;

  return (
    <div class={this.classes(CSS.esriWidget, CSS.root)}>
      {active ? this.renderContent() : this.renderLoader()}
    </div>
  );
}
```

Add CSS constant

```ts
const CSS = {
  root: "esri-webmap-showcase",
  header: "esri-webmap-showcase__header",
  infoCard: "esri-webmap-showcase__info-card",
  link: "esri-webmap-showcase__link",
  modifiedDate: "esri-webmap-showcase__modified-date",

  panel: "esri-webmap-showcase__panel",
  itemControl: "esri-webmap-showcase__item-control",
  itemControlIcon: "esri-webmap-showcase__item-control-icon",
  thumbnail: "esri-webmap-showcase__thumbnail",
  description: "esri-webmap-showcase__description",

  loader: "esri-webmap-showcase__loader",
  countdownBar: "esri-webmap-showcase__countdown-bar",

  // common
  esriWidget: "esri-widget",
  esriHeader: "esri-widget__header",
  esriIconPlay: "esri-icon-play",
  esriIconPause: "esri-icon-pause"
};
```

Add loading method

```tsx
//--------------------------------------------------------------------------
//
//  Protected Methods
//
//--------------------------------------------------------------------------

protected renderLoader() {
  return <div class={CSS.loader} key="loader" />;
}
```

Add method to render content

```tsx
protected renderContent() {
  const { active } = this.viewModel;

  return (
    <div class={CSS.panel} key="content">
      {active.title}
    </div>
  );
}
```

## Modify `renderContent()` to add a card

```tsx
protected renderContent() {
  return (
    <div class={CSS.panel} key="content">
      {this.renderInfoCard()}
    </div>
  );
}
```

Add method to render a card

```tsx
protected renderInfoCard() {
  const { active } = this.viewModel;

  return (
    <div class={CSS.infoCard}>
      <div class={CSS.itemControl}>
        <img alt={active.title} class={CSS.thumbnail} src={active.thumbnailUrl} />
      </div>

      <h1 class={this.classes(CSS.esriHeader, CSS.header)}>{active.title}</h1>

      <div class={CSS.modifiedDate}>Last updated {active.modified.toLocaleString()}</div>

      <div class={CSS.description} innerHTML={active.description} />
    </div>
  );
}
```

## Modify `renderContent()` to add a Link

Modify the header node to add a link

```tsx
<h1 class={this.classes(CSS.esriHeader, CSS.header)}>{this.renderLink()}</h1>
```

Add method to render a link

```tsx
protected renderLink() {
  const { active } = this.viewModel;
  const itemDetailsURL = `${active.portal.url}/home/item.html?id=${active.id}`;

  return (
    <a class={CSS.link} href={itemDetailsURL} target="_blank">
      {active.title}
    </a>
  );
}
```

## Make image clickable

Modify the item control node to make it a button

```tsx
<div
  class={CSS.itemControl}
  bind={this}
  tabIndex={0}
  role="button"
  onclick={this._toggleWebMap}
  onkeydown={this._toggleWebMap}
>
```

Add a private method to be executed when the button is clicked

```tsx
//--------------------------------------------------------------------------
//
//  Private Methods
//
//--------------------------------------------------------------------------

private _toggleWebMap(): void {
  this.viewModel.next();
  this.scheduleRender();
}
```

Import `accessibleHandler` widget decorator

```ts
import { accessibleHandler, renderable, tsx } from "esri/widgets/support/widget";
```

add `accessibleHandler` widget decorator to private method we added

```ts
@accessibleHandler()
```

## Complete
