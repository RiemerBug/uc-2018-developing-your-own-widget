<!-- .slide: data-background="img/bg-1.png" data-background-size="cover" -->
<!-- Presenter: Matt -->

# Building Your Own Widget with the ArcGIS API for JavaScript

## Matt Driscoll – [@driskull](https://twitter.com/driskull)

## JC Franco – [@arfncode](https://twitter.com/arfncode)

---

# Agenda

- Setup dev environment
- Create a...
  - Custom Class
  - Simple Widget
  - Custom Widget
- Enhance Custom Widget
- Going further with Widgets

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

- JavaScript API ❤️️ TypeScript
- Built mapping application

---

<!-- .slide: data-background="img/bg-4.png" data-background-size="cover" -->

# Creating a Class

---

# `esri/core/Accessor`

- JavaScript API foundation <!-- .element: class="fragment" data-fragment-index="0" -->
- Consistent developer experience <!-- .element: class="fragment" data-fragment-index="1" -->

```ts
// unified object constructor
const person = new Person({ name: "Franco", age: 33 });

// watch for changes to `age`
person.watch("age", handleAgeChange);
```

<!-- .element: class="fragment" data-fragment-index="1" -->

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

- Base widget class (View)
- Extends `esri/core/Accessor`
  - Properties
  - Watching properties
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

- Extend `esri/widgets/Widget`
- Rely on ViewModel
- Focus on UI

---

# ViewModels

- Extend `esri/core/Accessor`
- Provide APIs to support View
- Focus on business logic

---

# View + ViewModel in action

<!-- todo: maybe create graphic for this -->

- View renders the state of the VM <!-- .element: class="fragment" data-fragment-index="1" -->
  - Looks at properties on VM and renders accordingly
- User interacts with View <!-- .element: class="fragment" data-fragment-index="2" -->
  - Causes a change on VM (property/method)
- View updates <!-- .element: class="fragment" data-fragment-index="5" -->
  - Renders again due to changes on VM

---

<!-- .slide: data-background="img/bg-5.png" data-background-size="cover" -->

# Demo: [Updated View](../demos/4-updated-view/)

- Create `WebMapShowCase` to use `CustomClass` as VM
- Render details from the `active` portal item

<!--- mention BEM -->

---

# Demo Recap: Update View

- Paired View and ViewModel
- Rendered property from ViewModel
- Wired up interactivity
- Learned to apply styles
- Dynamically rendered UI based on a property value

---

<!-- Presenter: Franco -->

# Going Further

<!-- .slide: data-background="img/bg-4.png" data-background-size="cover" -->

---

# Going Further

- <!-- .element: class="fragment" data-fragment-index="0" -->Improve UX
- <!-- .element: class="fragment" data-fragment-index="1" -->Internationalization (`i18n`)
- <!-- .element: class="fragment" data-fragment-index="2" -->Accessibility (`a11y`)

---

<!-- .slide: data-background="img/bg-5.png" data-background-size="cover" -->

# Demo: [Going Further (UX)](../demos/5-final-view/)

- Auto-cycle through webmaps
- Show timer in UI
- Allow cycle play/pause

---

<!-- .slide: data-background="img/bg-5.png" data-background-size="cover" -->

# Demo: [Going Further (`i18n`)](../demos/6-i18n-view/)

- Localize widget

---

<!-- .slide: data-background="img/bg-5.png" data-background-size="cover" -->

# Demo: [Going Further (`a11y`)](../demos/5-final-view/)

- Update markup to be accessible

---

<!-- .slide: data-background="img/bg-5.png" data-background-size="cover" -->

# Demo Recap: Going Further

- Improved UX
- Added support for extra locale
- Made accessible

---

<!-- .slide: data-background="img/bg-4.png" data-background-size="cover" -->

# Final Recap

- Setup dev environment <!-- .element: class="fragment" data-fragment-index="0" -->
- Wrote a custom class <!-- .element: class="fragment" data-fragment-index="1" -->
- Developed a custom Widget <!-- .element: class="fragment" data-fragment-index="2" -->
- Enhanced a Widget <!-- .element: class="fragment" data-fragment-index="3" -->
- Went further <!-- .element: class="fragment" data-fragment-index="4" -->

---

## Additional Resources

- [Implementing Accessor](https://developers.arcgis.com/javascript/latest/guide/implementing-accessor/index.html)
- [Setting up TypeScript](https://developers.arcgis.com/javascript/latest/guide/typescript-setup/index.html)
- [Widget Development](https://developers.arcgis.com/javascript/latest/guide/custom-widget/index.html)
- [JavaScript API SDK](https://developers.arcgis.com/javascript/)
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
