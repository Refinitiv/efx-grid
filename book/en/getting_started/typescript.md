# Using TypeScript with Grid

[TypeScript](https://www.typescriptlang.org/) is a typed superset of JavaScript that compiles to plain JavaScript.

To apply Typescript for `EFX Grid`, first you are required to install `@refinitiv-ui/efx-grid` in your project.

```sh
npm install @refinitiv-ui/efx-grid
```

Use `import` syntax to import the Grid and theme into your app.

```js
// Import element and its Halo dark theme
import "@refinitiv-ui/efx-grid";
import "@refinitiv-ui/efx-grid/themes/halo/dark";

// Import native styles for typography, css variables, etc.
import "@refinitiv-ui/halo-theme/dark/imports/native-elements";
```

Then import types from `efx-grid` package to your file. These types are typically for properties on a configuration object or APIs defined by Grid components. You don't need to import every type, if you don't use them. All of the types are optional.

```js
import {
	RealtimeGrid, // Provide types for api object
	ColumnDefinition, // Provide types for column config and ColumnDefinition object
	CoreGrid // Provide types for core object
} from "@refinitiv-ui/efx-grid";
```

Optionally, you can also import Grid's [extensions](../extensions/README.md) from `efx-grid/extensions` package to extend its functionalities. 

```js
import { ColumnResizing } from "@refinitiv-ui/efx-grid/extensions";
```

To define how the grid renders its content, use `ColumnDefinition.Options` as shown below:

```js
let columns: ColumnDefinition.Options[] = [
	{ name: "Integer", field: "intCol" },
	{ name: "String", field: "strCol" },
	{ name: "Float", field: "floatCol" }
];
let records: Array<Object> = [
	{ intCol: 1, strCol: "Sample data", floatCol: 1.1 },
	{ intCol: 2, strCol: "Sample data", floatCol: 2.2 },
	{ intCol: 3, strCol: "Sample data", floatCol: 3.3 }
];
```

To define a configuration object, use `RealtimeGrid.GridOptions` as shown below:

```js
let configObj: RealtimeGrid.GridOptions = {
	columns: columns,
	staticDataRows: records,
	extensions: [
		new ColumnResizing()
	]
};
```

Finally assign configuration to `efx-grid` element. Note that `efx-grid` element already has type defined. There is no need to cast it to some other types.

```js
let grid = document.getElementsByTagName("efx-grid")[0];
grid.addEventListener("configured", function (e: any) {
	let api: RealtimeGrid = e.detail.api;
	let core: CoreGrid = api.getCoreGrid();

	console.log("Grid has been configured.");
});

grid.config = configObj;
```

> Grid element is not immediately initialized when it is put on to the document. Only after it has been configured, then you can use its `api` to perform any runtime change or custom task.

For a complete list of APIs, please see the [API document](../apis/README.md).
