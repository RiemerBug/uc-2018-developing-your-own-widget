# Updated View Steps

## 1. Convert `CustomClass` to `WebMapShowcaseViewModel`

Rename `CustomClass.ts` to `WebMapShowcaseViewModel.ts`. We will use the CustomClass as our widget's ViewModel.

Rename class within file

```ts
@subclass("esri.demo.WebMapShowcaseViewModel")
class WebMapShowcaseViewModel extends declared(Accessor) {
```
