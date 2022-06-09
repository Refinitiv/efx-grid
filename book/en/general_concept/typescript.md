# Adding TypeScript

[TypeScript](https://www.typescriptlang.org/) is a typed superset of JavaScript that compiles to plain JavaScript.


To apply Typescript for `EFX Grid`, first you are required to install `@grid/all-components` in your project.

```bash
npm install @grid/all-components --save
```

Next, rename any file to be a TypeScript file (for example, **src/index.js** to **src/index.tsx**) and restart your development server.

Then, use the named import `RealtimeGrid` with your file. Please note that `RealtimeGrid` is an engine that runs within `efx-grid`.

```js
import { RealtimeGrid, ColumnDefinition } from '@grid/all-components/types';
```

To define how the grid renders its layout and content, use the column propertires as shown below:

```js
let columns: ColumnDefinition.Options[] = [
    { id: "Header Text", field: "For Mapping Data" },
    // ... columns data
];
```

To define a configuration object, define it as shown below:

```js
let configObj: RealtimeGrid.GridOptions = {
    // ... other options
    columns: columns,
};
```

To access Grid's API, you can declare as shown below:

```js
import { RealtimeGrid, ColumnDefinition, CoreGrid, DataView } from '@grid/all-components/types';

let grid = document.getElementsByTagName("efx-grid")[0];
grid.config = {
    whenDefined: function() {
        let api: RealtimeGrid = grid.api as RealtimeGrid;
        let core: CoreGrid = api.getCoreGrid();
        let dv: DataView = e.api.getDataView();
        // Do something with grid with api...
    }
} as RealtimeGrid.GridOptions;
```

Grid's extensions configuration are exposed out-of-the-box.

```js
import { ZoomExtension } from '@grid/all-components';

let configObj: RealtimeGrid.GridOptions = {
    // ... other options
    zoom: {
        // ... zoom extension properties are compatible
    },
    extensions: [new ZoomExtension()]
};
```

For a complete list of APIs, please see the [API document](../apis/README.md).
