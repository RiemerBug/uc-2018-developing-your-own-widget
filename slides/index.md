<!-- .slide: data-background="img/bg-1.png" data-background-size="cover" -->
<!-- Presenter: Matt -->

# Building Your Own Widget with the ArcGIS API for JavaScript

## Matt Driscoll – [@driskull](https://twitter.com/driskull)

## JC Franco – [@arfncode](https://twitter.com/arfncode)

---

# Agenda

- Set up dev environment
- Write a custom class
- Write a widget
- Going further

---

<!-- Presenter: Franco -->
<!-- .slide: data-background="img/bg-4.png" data-background-size="cover" -->

# Setting up the Dev Environment

---

# Developer environment

<!-- background: section/content will tie into widget dev -->
<!-- background: including TS in all steps because it's needed for widget dev -->

JS API + TypeScript

---

# TypeScript

- Typed JavaScript <!-- .element: class="fragment" data-fragment-index="1" -->
- JS of the future, now <!-- .element: class="fragment" data-fragment-index="2" -->
- IDE support <!-- .element: class="fragment" data-fragment-index="3" -->
  - Visual Studio <!-- .element: class="fragment" data-fragment-index="3" -->
  - WebStorm <!-- .element: class="fragment" data-fragment-index="3" -->
  - Sublime <!-- .element: class="fragment" data-fragment-index="3" -->
  - and more! <!-- .element: class="fragment" data-fragment-index="3" -->

---

# Demo: Dev Environment

- Install TypeScript + JS API typings

---

# Demo Recap: Dev Environment

- JS API ❤️️ TypeScript
- Used TypeScript to build a simple application

---

<!-- .slide: data-background="img/bg-4.png" data-background-size="cover" -->

# Creating a Class

---

# `esri/core/Accessor`

- JS API Foundation
- Consistent developer experience

---

# Demo: Custom Class

- Write custom class

```ts
interface CustomClass {
  // used to fetch webmaps items
  portal: Portal;
  webMapGroupId: string;

  // active webmap and all fetched ones
  readonly active: PortalItem;
  readonly webMaps: PortalItem[];

  // will be updated with the active webmap
  view: MapView;

  // moves to the next webmap
  next(): void;
}
```

---

# Demo Recap: Development Setup

- Implemented `CustomClass`
  - properties
  - methods
- Used TypeScript to ensure correctness

---

<!-- .slide: data-background="img/bg-4.png" data-background-size="cover" -->
<!-- Presenter: Matt -->

# Writing a Widget

---

# Widgets

- What? <!-- .element: class="fragment" data-fragment-index="1" -->
  - Encapsulated UI components
  - Cohesive (integrated, unified)
  - Single-purpose pieces of functionality
- Why? <!-- .element: class="fragment" data-fragment-index="2" -->
  - Reusable
  - Interchangeable
- How? <!-- .element: class="fragment" data-fragment-index="3" -->
  - `esri/Widgets/Widget`

---

# `esri/widgets/Widget`

- Lifecycle
- API consistency
  - Unified object constructor
  - Properties
  - Watching

---

# Lifecycle

- `constructor`
- `postInitialize`
- `render`
- `destroy`

---

# `render`

- Defines UI
- Reacts to state
- Uses JSX
- VDOM

---

# `render` example

```ts
render() {
  const { x, y, scale }  = this;

  return (
    <div bind={this} class={CSS.base} onclick={this._handleClick}
         title="map info" tabIndex={0}>
      <p>x: {x}</p>
      <p>y: {y}</p>
      <p>scale: {scale}</p>
    </div>
  );
}
```

---

# Demo: Simple View

Write simple widget that renders "Hello World"

---

# Demo Recap: Simple View

- Extended `esri/widgets/Widget`
- Implemented `render` to render text

---

<!-- .slide: data-background="img/bg-4.png" data-background-size="cover" -->

# Improving Our Widget

---

# Architecture

- Separation of concerns <!-- .element: class="fragment" data-fragment-index="2" -->
  - Views + ViewModels
  - UI replacement
  - Easier integration

---

# Views

- <!-- .element: class="fragment" data-fragment-index="1" --> Extend `esri/widgets/Widget`
- Rely on ViewModel <!-- .element: class="fragment" data-fragment-index="2" -->
- Focus on UI <!-- .element: class="fragment" data-fragment-index="3" -->

---

# ViewModels

<!-- front-loaded to fade entire fragment -->

- <!-- .element: class="fragment" data-fragment-index="1" --> Extend `esri/core/Accessor`
- Provide APIs to support view <!-- .element: class="fragment" data-fragment-index="2" -->
- Focus on business logic <!-- .element: class="fragment" data-fragment-index="3" -->

---

# View + ViewModel in action

- View renders its state <!-- .element: class="fragment" data-fragment-index="1" -->
  - state = view + ViewModel props <!-- .element: class="fragment" data-fragment-index="2" -->
- View calls VMs APIs <!-- .element: class="fragment" data-fragment-index="3" -->
  - causes a change (e.g., property or result) <!-- .element: class="fragment" data-fragment-index="4" -->
- View updates <!-- .element: class="fragment" data-fragment-index="5" -->

---

# Demo: Update View

- Enhance `WebMapShowCase` to use `CustomClass` as a view model
- Render details from the active webmap portal item

<!--- mention BEM -->

---

# Demo Recap: Update View

- Paired view and viewmodel
- Rendered property from viewmodel
- Wired up interactivity
- Learned to apply styles
- Dynamically rendered UI based on a property value

---

<!-- Presenter: Franco -->

# Going Further

<!-- .slide: data-background="img/bg-4.png" data-background-size="cover" -->

---

# Going Further

- `i18n`
- `a11y`
- Improve UX

---

# Demo: Going Further

---

# Demo Recap: Going Further

---

# Extras

- Sass
- Prettier
- Testing
- `iconClass` and `label`

---

<!-- .slide: data-background="img/bg-4.png" data-background-size="cover" -->
<!-- Presenter: Franco -->

# Final Recap

- Set up dev environment
- Write a custom class
- Write a widget
- Going further

---

## Additional Resources

- [Implementing Accessor](https://developers.arcgis.com/javascript/latest/guide/implementing-accessor/index.html)
- [Setting up TypeScript](https://developers.arcgis.com/javascript/latest/guide/typescript-setup/index.html)
- [Widget Development](https://developers.arcgis.com/javascript/latest/guide/custom-widget/index.html)
- [JS API SDK](https://developers.arcgis.com/javascript/)
- [Styling](https://developers.arcgis.com/javascript/latest/guide/styling/index.html)
- [Widget Patterns](https://github.com/jcfranco/4x-widget-patterns)

---

<!-- **please rate us** -->
<!-- .slide: data-background="img/uc18-survey.png" -->

---

# Question Time

> 🤔 Where can I find the slides/source?

👉 [esriurl.com/developwidgetsuc2018](http://esriurl.com/developwidgetsuc2018) 👈

---

<!-- .slide: data-background="img/bg-final.png" -->
