# Using EFX Grid with Angular

For using `EFX Grid` with Angular, first you are required to install `@refinitiv-ui/efx-grid` in your project.

```sh
npm install @refinitiv-ui/efx-grid --save-dev
```

In component logic file, for example `src/app/app.component.ts`, use `import` syntax to import the Grid and theme into your app.

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

Prepare grid data and configuration object by follow following steps.
1) Define how the grid renders its content in each column by using type `ColumnDefinition.Options`
2) Define rows of data for displaying in the grid
3) Define a configuration object by using type `RealtimeGrid.GridOptions`
4) Define a function for assigning run time tasks to grid after grid is initialized. (Optional)

```js
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
class AppComponent {
	// Step 1)
	columns: ColumnDefinition.Options[] = [
		{ name: "Integer", field: "intCol" },
		{ name: "String", field: "strCol" },
		{ name: "Float", field: "floatCol" }
	];
	// Step 2)
	records: Array<Object> = [
		{ intCol: 1, strCol: "Sample data", floatCol: 1.1 },
		{ intCol: 2, strCol: "Sample data", floatCol: 2.2 },
		{ intCol: 3, strCol: "Sample data", floatCol: 3.3 }
	];
	// Step 3)
	configObj: RealtimeGrid.GridOptions = {
		columns: this.columns,
		staticDataRows: this.records,
		extensions: [
			new ColumnResizing()
		]
	};
	// Step 4)
	gridConfigured(e: any) {
		let api: RealtimeGrid = e.detail.api;
		let core: CoreGrid = api.getCoreGrid();

		console.log("Grid has been configured.");
	}
}
```

In HTML template file, `src/app/app.component.html`, finally assign configuration to `efx-grid` element. Note that `efx-grid` element already has type defined. There is no need to cast it to some other types.

`src/app/app.component.html`
```html
	<efx-grid [config]="configObj" (configured)="gridConfigured($event)" #grid ></efx-grid>
```

> Grid element is not immediately initialized when it is put on to the document. Only after it has been configured, then you can use its `api` to perform any runtime change or custom task.

For a complete list of APIs, please see the [API document](../apis/README.md).
