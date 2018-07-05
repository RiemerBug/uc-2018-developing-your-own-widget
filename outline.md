# Developing widget

Use a single widget and keep enhancing it @ each section

Section Outline

- Intro/Setup (Franco)
- Simple View (Matt)
- Simple ViewModel ... viewModel with just one webmap set to `active` property?
- Enhance View to use one webmap
- Enhance ViewModel to paginate webmaps & have next method
- Enhance View to final. Add NLS
- Completed

## Section I

- Dev environment setup (focus: walkthrough widget dev from scratch)
- Create a class, which will be the base for our widget (focus: TS + Accessor + decorators)

```ts
// simple class will be converted into a widget in the next sections
interface WebMapShowcase extends Accessor {
  readonly title: string; // from activeWebMap

  portal: Portal; // use default or portalItem
  webmaps: WebMap[]; // default group webmaps

  readonly activeWebMap: WebMap; // auto selected after a timeout (configurable?)

  // load data from portal, resolves when ready, rejects in case of error
  // could load internally after initialization
  load(): IPromise<void>;
}
```

### Recap Section I

## Section II

- Create a widget that shows title of active webmap (focus: `esri/widgets/Widget` basics: part lifecycle, rendering, BEM)

```ts
interface WebMapShowcase extends Widget {
  // ... previous members

  // render stylized title
  render();
}
```

### Recap Section II

## Section III

- Enhance widget to display list of available webmaps and possibly timer before next one is shown (focus: lifecycle contd. (destroy), rendering (contd.) dynamic classes, decorators)

```ts
interface WebMapShowcase extends Widget {
  // ... previous members

  // enhance render
  render();
}
```

### Recap Section III

## Section IV

- Enhance widget to be interactive and allow webmaps to be selected by click or enter/space press (focus: lifecycle contd., interactivity (`accessibilityHandler`?), eventing?)

### Recap Section IV

## Section V

- Extract non-UI logic from :point-up: to ViewModel

```ts
// will this part be too confusing?
interface WebMapShowcase extends Widget {
  // ... previous members

  viewModel: WebMapListViewModel;
}
```

### Recap Section V

## Quick Tips

- Sass (devpower++)
- Prettier (devpower++)
- Intern (devpower++)
- Other decorators
- Showcase reactiveness
