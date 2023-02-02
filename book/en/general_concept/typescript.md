# Adding TypeScript

[TypeScript](https://www.typescriptlang.org/) is a typed superset of JavaScript that compiles to plain JavaScript.


## Atlas Blotter

Install `@grid/types` to your project.

```bash
npm install @grid/types --save-dev
```

Next, rename any file to be a TypeScript file (for example, **src/index.js** to **src/index.tsx**) and restart your development server.

Then, add the named imports `Grid` and `ColumnDefinition` to your file.

```js
import { RealtimeGrid, ColumnDefinition } from '@grid/types';
```

To define how Grid renders its layout and content, use the column propertires as shown below:

```js
let columns: ColumnDefinition.Options[] = [
    { title: "Header Text", field: "For Mapping Data" },
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
import { RealtimeGrid, CoreGrid } from '@grid/types';

let grid: any = document.getElementsByTagName("atlas-blotter")[0];
grid.addEventListener("configured", function (e: any) {
	let api: RealtimeGrid = e.detail.api;
	let core: CoreGrid = api.getCoreGrid();

	console.log("Grid has been configured.");
});

grid.config: RealtimeGrid.GridOptions = {};
```

Grid's extensions configuration are exposed out-of-the-box.

```js
import { Zoom } from '@grid/zoom';

let configObj: RealtimeGrid.GridOptions = {
    // ... other options
    zoom: {
        // ... zoom extension properties are compatible
    },
    extensions: [new Zoom()]
};
```

For a complete list of APIs, please see the [API document](../apis/rt_grid/Grid.md).

## Emerald Grid

Install `@grid/types` to your project.

```bash
npm install @grid/types --save-dev
```

Next, rename any file to be a TypeScript file (for example, **src/index.js** to **src/index.tsx**) and restart your development server.

Then, use the named import `CompositeGrid` with your file. Please note that `CompositeGrid` is an engine that runs within `emerald-grid`.

```js
import { CompositeGrid } from '@grid/types';
```

To define how the grid renders its layout and content, use the column propertires as shown below:

```js
let columns: CompositeGrid.Column[] = [
    { title: "Header Text", field: "For Mapping Data" },
    // ... columns data
];
```

To define a configuration object, define it as shown below:

```js
let configObj: CompositeGrid.Options = {
    // ... other options
    columns: columns,
};
```

To access Grid's API, you can declare as shown below:

```js
import { CompositeGrid, CoreGrid, DataView } from '@grid/types';

let grid: any = document.getElementsByTagName("emerald-grid")[0];
grid.addEventListener("configured", function (e: any) {
	let api: CompositeGrid = e.detail.api;
	let core: CoreGrid = api.getCoreGrid();
	let dv: DataView = api.getDataView();

	console.log("Grid has been configured.");
});
grid.config: CompositeGrid.Options = {};
```

Grid's extensions configuration are exposed out-of-the-box.

```js
import { Zoom } from '@grid/zoom';

let configObj: CompositeGrid.Options = {
    // ... other options
    zoom: {
        // ... zoom extension properties are compatible
    },
    extensions: [new Zoom()]
};
```

For a complete list of APIs, please see the [API document](../apis/composite_grid/tr.CompositeGrid.md).
