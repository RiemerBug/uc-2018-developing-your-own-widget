# Simple View Steps

## 1. Setup Basic Class

Open `WebMapShowcase.tsx` and add the following basic class to the empty file.

```tsx
/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

import Widget = require("esri/widgets/Widget");

import { declared, subclass } from "esri/core/accessorSupport/decorators";

@subclass("esri.demo.WebMapShowcase")
class WebMapShowcase extends declared(Widget) {}

export = WebMapShowcase;
```

## 2. Add Lifecycle Section

```ts
//--------------------------------------------------------------------------
//
//  Lifecycle
//
//--------------------------------------------------------------------------

constructor() {
  super();
}
```

## 3. Add Render

Add the `render()` public method

```tsx
//--------------------------------------------------------------------------
//
//  Public Methods
//
//--------------------------------------------------------------------------

render() {
  return <div>Hello World</div>;
}
```

Add tsx

```ts
import { tsx } from "esri/widgets/support/widget";
```

## 4. Setup Main

Open `main.ts` and setup the widget initialization.

First require the widget

```ts
import WebMapShowcase = require("./WebMapShowcase");
```

Then initialize the widget.

```ts
//----------------
//  widget setup
//----------------

const widget = new WebMapShowcase();

view.ui.add(widget, "top-right");
```

## Complete

We're done with this set of steps! Compile, view, and proceed to the [next steps](../4-updated-view/STEPS.md).
