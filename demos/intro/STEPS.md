# TypeScript + JS API Setup

## go to project directory

```
cd <project-directory>
```

## Initialize project (`package.json` with defaults)

```
npm init --yes
```

## Install dependencies

```
npm install --save-dev typescript
```

## Install typings

```
npm install --save-dev @types/arcgis-js-api
```

## Provide TypeScript compiler options (taken from JS API guide page)

```json
{
  "compilerOptions": {
    "module": "amd",
    "noImplicitAny": true,
    "sourceMap": true,
    "jsx": "react",
    "jsxFactory": "tsx",
    "target": "es5",
    "experimentalDecorators": true,
    "preserveConstEnums": true,
    "suppressImplicitAnyIndexErrors": true
  },
  "include": [
    "./app/*"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

## Let's create a simple TypeScript file (`main.ts`) in the `app` directory

```ts
import EsriMap = require("esri/Map");
import MapView = require("esri/views/MapView");

const map = new EsriMap({
  basemap: "streets"
});

const view = new MapView({
  map: map,
  container: "viewDiv",
  center: [-118.244, 34.052],
  zoom: 12
});
```

## Let's build our app by running the TypeScript compiler and enabling the `watch` flag

```
tsc -w
```

## Our code is now compiled and we can now run our application
