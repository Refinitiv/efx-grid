# Adding TypeScript

[TypeScript](https://www.typescriptlang.org/) is a typed superset of JavaScript that compiles to plain JavaScript.

To apply Typescript for `EFX Grid`, first you are required to install `@refinitiv-ui/efx-grid` in your project.

```sh
npm install @refinitiv-ui/efx-grid --save
```

Use `import` syntax to import the Grid and theme into your app.

```js
// Import element and its Halo dark theme
import '@refinitiv-ui/efx-grid';
import '@refinitiv-ui/efx-grid/themes/halo/dark';

// Import native styles for typography, css variables, etc.
import '@refinitiv-ui/halo-theme/dark/imports/native-elements';
```

Then import `Grid`, `RealtimeGrid` and other types to your file. Please note that `RealtimeGrid` is an engine that runs within `efx-grid`.

```js
import { Grid, RealtimeGrid, ColumnDefinition, CoreGrid, DataView } from "@refinitiv-ui/efx-grid";
```

Optionally import [extensions](../extensions/README.md) to your app. 

```js
import { ColumnResizing } from "@refinitiv-ui/efx-grid/extensions";
```

To define how the grid renders its layout and content, use the column properties as shown below:

```js
let columns: ColumnDefinition.Options[] = [
  { name: "Integer", field: "intCol" },
  { name: "String", field: "strCol" },
  { name: "Float", field: "floatCol" },
  // Other column definition objects
];
```

To define a configuration object, define it as shown below:

```js
let records:Array<Object> = [
  { "intCol": 1, "strCol": "Sample data", "floatCol": 1.1 },
  { "intCol": 2, "strCol": "Sample data", "floatCol": 2.2 },
  { "intCol": 3, "strCol": "Sample data", "floatCol": 3.3 },
  // Other records
];

let configObj = {
  columns: columns,
  staticDataRows: records,
  whenDefined: function(e:any) {
    let api: RealtimeGrid = grid.api as RealtimeGrid;
    let core: CoreGrid = api.getCoreGrid();
    let dv: DataView = e.api.getDataView();
    // Do something with Grid's API
  },
  extensions: [
    new ColumnResizing()
  ]
} as RealtimeGrid.GridOptions;
```

Finally assign configuration to `efx-grid` element.

```js
let grid: Grid = document.getElementsByTagName("efx-grid")[0];
grid.config = configObj;
```

For a complete list of APIs, please see the [API document](../apis/README.md).
