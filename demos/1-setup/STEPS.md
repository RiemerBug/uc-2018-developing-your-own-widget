# TypeScript + JS API Setup

## go to project directory

```
cd <project-directory>
```

## Initialize project with defaults (for demo purposes)

```
npm init --yes
```

## Install dependencies and JS API typings

```
npm install --save-dev typescript @types/arcgis-js-api
```

## Create a config file (`tsconfig.json`) for the TypeScript compiler (https://developers.arcgis.com/javascript/latest/guide/typescript-setup/index.html#compile-typescript)

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

## Let's build our app by running the TypeScript compiler and enabling the `watch` flag

```
tsc -w
```

## Let's update `main.ts` in the `app` directory

```ts
import Map = require("esri/Map");
import MapView = require("esri/views/MapView");

//----------------
//  map setup
//----------------

const map = new Map({
  basemap: "streets-vector"
});

const view = new MapView({
  map: map,
  container: "viewDiv",
  center: [-117.1628487109789, 32.706813240831096],
  zoom: 15
});
```
