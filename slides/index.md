<!-- .slide: data-background="img/bg-1.png" data-background-size="cover" -->
<!-- Presenter: Matt -->

# Building Your Own Widget with the ArcGIS API for JavaScript

## Matt Driscoll – [@driskull](https://twitter.com/driskull)

## JC Franco – [@arfncode](https://twitter.com/arfncode)

---

# Agenda

- Setup dev environment
- Write a custom class
- Write a simple widget
- Write a custom widget
- Enhance our custom widget
- Discuss Widget extras

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

---

# Typed JavaScript

```ts
interface Person {
  name: string;
  age: number;
}

const person: Person = { name: "Franco", age: 33 };

person.age = "24"; // TS2322: Type '"24"' is not assignable to type 'number'
person.height = 5.11; // TS2339: property 'height' does not exist on type 'Person'
```

---

# JS of the future, now

```ts
// let and const
let canChange = 5;
const cannotChange = 5;

// fat arrow functions
const logName = (person) => console.log(person.name);

// template strings
const text = `Hello. My name is ${person.name} and I am ${person.age} years old.`;

// destructuring
const { name, age } = person;

// property shorthand
const shorthand = { person };
```

---

# IDE Support

- Visual Studio
- WebStorm
- Sublime Text
- and more!

---

<!-- .slide: data-background="img/bg-5.png" data-background-size="cover" -->

# Demo: [Dev Environment](../demos/1-setup/)

- Install TypeScript + JS API

---

<!-- .slide: data-background="img/bg-5.png" data-background-size="cover" -->

# Demo Recap: Dev Environment

- JS API ❤️️ TypeScript
- Built mapping application

---

<!-- .slide: data-background="img/bg-4.png" data-background-size="cover" -->

# Creating a Class

---

# `esri/core/Accessor`

- JS API foundation
- Consistent developer experience

---

<!-- .slide: data-background="img/bg-5.png" data-background-size="cover" -->

# Demo: [Custom Class](../demos/2-custom-class/)

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

<!-- .slide: data-background="img/bg-5.png" data-background-size="cover" -->

# Demo Recap: Development Setup

- Implemented `CustomClass`
  - Properties + methods
  - TypeScript

---

<!-- .slide: data-background="img/bg-4.png" data-background-size="cover" -->
<!-- Presenter: Matt -->

# Writing a Widget

---

# About Widgets

- What? <!-- .element: class="fragment" data-fragment-index="1" -->
  - Encapsulated UI components
  - Cohesive (integrated, unified)
  - Single-purpose pieces of functionality
- Why? <!-- .element: class="fragment" data-fragment-index="2" -->
  - Reusable
  - Interchangeable
- How? <!-- .element: class="fragment" data-fragment-index="3" -->
  - Extend `esri/Widgets/Widget`

---

# `esri/widgets/Widget`

- Base widget class
- API consistency
  - Unified object constructor
  - Properties
  - Watching
  - Rendering
- Lifecycle

---

# Lifecycle

- `constructor`
- `postInitialize`
- `render`
- `destroy`

---

# `render`

- Defines UI
- Reacts to state changes
- Uses JSX
- VDOM

---

<!-- .slide: data-background="img/bg-5.png" data-background-size="cover" -->

# Demo: [Simple View](../demos/3-simple-view/)

Write simple widget that renders "Hello World"

---

# Demo Recap: Simple View

- Extended `esri/widgets/Widget`
- Implemented `render()`
- Added a `renderable()` property
- Added `onclick` event
- Toggled property with event to re-render

---

<!-- .slide: data-background="img/bg-4.png" data-background-size="cover" -->

# Improving Our Widget

---

# Architecture

- Separation of concerns
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

- View renders the state of the ViewModel <!-- .element: class="fragment" data-fragment-index="1" -->
- View calls VMs APIs <!-- .element: class="fragment" data-fragment-index="2" -->
  - property modified or method called
  - causes a change on state of VM
- View updates <!-- .element: class="fragment" data-fragment-index="5" -->

---

<!-- .slide: data-background="img/bg-5.png" data-background-size="cover" -->

# Demo: [Updated View](../demos/4-updated-view/)

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

<!-- .slide: data-background="img/bg-5.png" data-background-size="cover" -->

# Demo: [Going Further](../demos/5-final-view/)

---

<!-- .slide: data-background="img/bg-5.png" data-background-size="cover" -->

# Demo Recap: Going Further

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
