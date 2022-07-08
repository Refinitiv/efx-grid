# Wrapper for Angular

`@grid/angular-grid` is the official wrapper of EFX Grid. It provides a high-performance data grid to handle a large data set and essential features such as grouping, sorting and custom rendering.

## EFX Grid and Angular Integration

Make sure you set up integration between EF Components and Angular. You can find the information for this [here](https://cdn.ppe.refinitiv.com/public/apps/elf-docs/book/en/framework-integration/angular.html)

## Installation

```bash
npm install @refinitiv-ui/elements @refinitiv-ui/halo-theme @refinitiv-ui/efx-grid @grid/angular-grid
npm ddp
```

## Basic Usage

For basic usage, import the `efx-grid` to your project:

```js
// index.js
import '@refinitiv-ui/efx-grid'; // efx-grid
import '@refinitiv-ui/efx-grid/themes/halo/light'; // can be any theme
import '@refinitiv-ui/halo-theme/light/imports/native-elements'; // can be any theme
```

Then use `@grid/angular-grid` for the Angular component in your codebase:

```js
//app.module.ts
import { AngularGridModule } from '@grid/angular-grid';

@NgModule({
  imports: [
    //... other imports
    AngularGridModule
  ],
  //... other configs
})
export class AppModule { }
```

And then finally use an `angular-efx-grid` in your template:

```js
//example.component.ts
import { Component } from '@angular/core';

@Component({
  template: `
    <angular-efx-grid [columns]="columns" [data]="data" [config]="config"></angular-efx-grid>
  `
})
export class ExampleComponent {
  data = [
  //... some data
  ];
  columns = [
  // ... columns data
  ];
  config = {
    // other configs...
    columnReorder: true,
    rowSelection: true,
  };
}
```

### `whenDefined`

`whenDefined` is helpful when you want to use Grid's API. Like `ngOnInit` in Angular, the onWhenDefined callback is fired when the grid is mounted.

You can access the grid's `element` and `api` by using its event argument in callback.

```js
@Component({
  template: `
    <angular-efx-grid
      [columns]="columns"
      [data]="data"
      [config]="config"
      [whenDefined]="onWhenDefined">
    </angular-efx-grid>
  `
})
export class ExampleComponent {
  onWhenDefined = (e: any) => {
    const elem = e.element;
    const api = e.api;
    api.listen('columnSorted', onSortChange);
  }
}
```

### Referencing

Since Grid has its own lifecycle, any change to its state should be done using `api`.

> Note: Two-way binding is not recomended.

```js
@Component({
  template: `
    <angular-efx-grid
      [columns]="columns"
      [data]="data"
      [config]="config"
      [whenDefined]="onWhenDefined"
      #grid
    >
    </angular-efx-grid>
  `
})
export class ExampleComponent {
  @ViewChild('grid') element: any;
  someAction = () => {
    const api = this.element.api;
    // Do something with grid via api
  }
}
```

## Configuration Object

See all available options for `EFX Grid` [here](../apis/composite_grid/tr.CompositeGrid.md).

> Note: Any change to config directly is not recommended. Please use grid's API instead.

## TypeScript

The `@grid/angular-grid` wrapper plays well with TypeScript.

```js
import { Component } from '@angular/core';
import { RealtimeGrid, ColumnDefinition } from '@refinitiv-ui/efx-grid';

@Component({
  template: `
    <angular-efx-grid [columns]="columns" [data]="data" [config]="config"></angular-efx-grid>
  `
})
export class BasicPageComponent {
  data: any[] = [
    //... some data
  ];
  columns: ColumnDefinition.Options[] = [
    // ... columns data
  ];
  config: RealtimeGrid.GridOptions = {
    columnReorder: true,
    rowSelection: true,
  };
  someAction = () => {
    const api: RealtimeGrid = this.api as RealtimeGrid;
    // Do something with grid via api
  }
}
```

### Extensions and Formatters

[Extensions](../extensions/README.md) and [Formatters](../rendering/predefined-formatter.md) are exported with TypeScript out of the box.

The following is an example of how to use `getExtension` in TypeScript:

```js
import { RowSelection } from '@refinitiv-ui/efx-grid/extensions';
import { Component, ViewChild } from '@angular/core';

@Component({
  template: `
    <angular-efx-grid #grid></angular-efx-grid>
  `
})
export class BasicPageComponent {
  @ViewChild('grid') grid: any;

  someAction() {
    const rowSelection: RowSelection = this.grid.getExtension('RowSelection');
    rowSelection.getSelectedRows();
  }
}
```
