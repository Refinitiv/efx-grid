# Using EFX Grid with React

For using `EFX Grid` with React, first you are required to install `@refinitiv-ui/efx-grid` and `@lit-labs/react` in your project.

```sh
npm install @refinitiv-ui/efx-grid
npm install @lit-labs/react
```

Use `import` syntax to import the Grid and theme into your app.

```js
// Import element and its Halo dark theme
import "@refinitiv-ui/efx-grid";
import "@refinitiv-ui/efx-grid/themes/halo/dark";

// Import native styles for typography, css variables, etc.
import "@refinitiv-ui/halo-theme/dark/imports/native-elements";
```

Import `createComponent` from `@lit-labs/react`, which will be used to transform custom element into React component.

```js
import { createComponent } from '@lit-labs/react';
```

Then import types from `efx-grid` package to your file. Type `Grid` is mandatory for making grid as React component and all other types are typically for properties on a configuration object or APIs defined by Grid components. You don't need to import every type, if you don't use them.

```js
import {
	Grid, // Provide type for making EFX Grid as React component
	RealtimeGrid, // Provide types for api object
	ColumnDefinition, // Provide types for column config and ColumnDefinition object
	CoreGrid // Provide types for core object
} from "@refinitiv-ui/efx-grid";
```

Optionally, you can also import Grid's [extensions](../extensions/README.md) from `efx-grid/extensions` package to extend its functionalities. 

```js
import { ColumnResizing } from "@refinitiv-ui/efx-grid/extensions";
```

Define grid as React component using `createComponent`, then `EfxGrid` will be used instead of `efx-grid` in React project

```js
const EfxGrid = createComponent({
  tagName: 'efx-grid',
  elementClass: Grid,
  react: React,
  events: {
    onConfigured: 'configured' //Grid custom event handler
  }
});
```

To define how the grid renders its content. First, create a function `App` which will be the main entry point. Then use `ColumnDefinition.Options` as shown below:

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

To define a configuration object, use type `RealtimeGrid.GridOptions` as shown below.
Then, finally assign configuration to `EfxGrid` component by passing through `config` attribute of grid component.

```js
function gridConfigured(e: any) {
	let api: RealtimeGrid = e.detail.api;
	let core: CoreGrid = api.getCoreGrid();

	console.log("Grid has been configured.");
}

function App() {
	//Extensions are recommended to use with useState to prevent multiple re-initializatioin
	const [colResizingExt, setColResizingExt] = React.useState<ColumnResizing>(new ColumnResizing())
	const [configObj, setConfigObj] = React.useState<RealtimeGrid.GridOptions>(
		{
			columns: columns,
			staticDataRows: records,
			extensions: [
				colResizingExt
			]
		}
	)
	return (
		<EfxGrid config={configObj} onConfigured={gridConfigured}></EfxGrid>
	)
} 
```

> Grid element is not immediately initialized when it is put on to the document. Only after it has been configured, then you can use its `api` to perform any runtime change or custom task.

For a complete list of APIs, please see the [API document](../apis/README.md).
