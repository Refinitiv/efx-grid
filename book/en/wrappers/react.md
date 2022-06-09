# Wrapper for React

`@grid/react-grid` is the official wrapper of EFX Grid. It provides a high-performance data grid to handle a large data set and essential features such as grouping, sorting and custom rendering.

## EFX Grid and React Integration

Make sure you set up integration between EF Components and React. You can find the information for this [here](https://cdn.ppe.refinitiv.com/public/apps/elf-docs/book/en/framework-integration/react.html)

## Installation

```bash
npm install @refinitiv-ui/elements @refinitiv-ui/halo-theme @refinitiv-ui/efx-grid @grid/react-grid
npm ddp
```

## Basic usage

For basic usage, import the `efx-grid` to your project:

```js
// index.js
import '@refinitiv-ui/efxgrid'; // efx-grid
import '@refinitiv-ui/efxgrid/themes/halo/light'; // can be any theme
import '@refinitiv-ui/halo-theme/light/imports/native-elements'; // can be any theme
```

Then use `@grid/react-grid` for React component in your codebase:

```js
import React from 'react'
import EfxGrid from '@grid/react-grid'

const mockData = [
  //... some data
];

const mockColumns = [
  // ... columns data
];

const App = () => {
  return (
    <EfxGrid
      data={mockData}
      columns={mockColumns}
      config={{
        // other configs...
        columnReorder: true
      }}
    />
  )
}
```

### `whenDefined`

`whenDefined` is helpful when you want to use Grid's API. Like `componentDidMount` in React, the onWhenDefined callback is fired when the grid is mounted.

You can access the grid's `element` and `api` by accessing the first argument in a callback.

```js
const App = () => {

  const onWhenDefined = (e) => {
    const elem = e.element;
    const api = e.api;
    api.listen('columnSorted', onSortChange);
  };

  return (
    <EfxGrid
      // other configs...
      whenDefined={onWhenDefined}
    />
  )
}
```

### Referencing

Since Grid has its own lifecycle, any change to its state should be done using the `api`.

> Note: Two-way binding is not recomended.

```js
const App = () => {
  const grid = React.useRef(null);
  
  const someAction = () => {
    const api = grid.current.api;
    // Do something with grid via api
  }

  return (
    <EfxGrid
      // other configs...
      ref={grid}
    />
  )
}
```

## Configuration object

It's best to create a configuration object only once throughout the component life cycle, because of each creation of config object will trigger the grid instance to create a new grid element, hence slowing the performance.

*** This behavior can be achieved by using `React.useMemo` or holding a config object somewhere outside the `render()`. ***

This will guarantee that config object will not be created again (However, this is still depends on various use case).

See all available options for `EFX Grid` [here](../apis/composite_grid/tr.CompositeGrid.md).

> Note: Any change to the config directly is not recommended. Please use Grid's API instead.

```js
const App = () => {
  // useMemo on config can greatly increase performance
  const config = React.useMemo(() => {
    return {
      sorting: {
        sortableColumns: true,
        columnReorder: true
      },
    }
  }, []);
  return (
    <EfxGrid
      // Other properties
      config={config}
    />
  )
}
```

## TypeScript

The `@grid/react-grid` wrapper can easily integrated with TypeScript.

```js
import { RealtimeGrid, ColumnDefinition } from '@refinitiv-ui/efxgrid/types';

const data: any[] = [
  //... some data
];

const columns: ColumnDefinition.Options[] = [
  // ... columns data
];

const App = () => {
  const grid = React.useRef<EfxGrid>(null);

  const someAction = () => {
    const api: RealtimeGrid = grid.current.api as RealtimeGrid;
    // Do something with grid via api
  }

  const config: RealtimeGrid.GridOptions = React.useMemo(() => {
    return {
      columnReorder: true
    }
  }, []);

  return (
    <EfxGrid
      ref={grid}
      config={config}
      data={data}
      columns={columns}
    />
  )
}
```

### Extensions and formatters

[Extensions](../extensions/README.md) and [formatters](../rendering/predefined-formatter.md) are exported with TypeScript out of the box.

The following is an example of how to use `getExtension` in TypeScript.

```js
import { RowSelectionExtension } from '@refinitiv-ui/efxgrid/extensions';

const someAction = () => {
  const rowSelection: RowSelectionExtension = grid.current?.getExtension('RowSelection');
  rowSelection.getSelectedRows();
}
```
