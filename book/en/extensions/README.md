# Overview

**Grid extensions** provide enhancements for the `efx-grid` element and the underlying core library. This allows for greater extensibility without increasing the size of the main code base.

## Setup guide

Use `import` syntax to import the extension into your app.

```js
import { EXTENSION_NAME } from '@refinitiv-ui/efx-grid/extensions';
```

For example

```js
import { AutoTooltip } from '@refinitiv-ui/efx-grid/extensions';
```

## Basic usage

The simplest way to add extensions to Grid is by passing the extension's instances through the `extensions` property in the configuration object.

```js
var grid = document.getElementById('grid');
grid.config = {
  // main option
  extensions: [
    EXTENTION_INSTANCE
  ]
};
```

There are two kinds of extension options, the main option and the column-specific option.

The main option is an option declared as a first-level property. Generally, the main option's attribute name is the extension's name but starting with a lower case letter. For example, `autoTooltip`.

The column specific option is defined in the column option under the `columns` property of Grid's configuration.

Details about both kinds of options are available on each extension's page.

**Example of an extension option:**

```js
var grid = document.getElementById('grid');
grid.config = {
  // main option
  columns: [
    // column-specific option
    {
    	name: "Number",
    	field: "number",
    	autoTooltip: true // column's specific option
    }
  ],

  extensions: [
    new AutoTooltip()
  ],

  // extension option
  autoTooltip: {
    title: true,
    content: false
  }
};
```

## Required dependencies

For details on how to install and use the EF-element see the [Element Framework - Quick Start document](https://ui.refinitiv.com/quick-start).

### Checkbox Extension

The Checkbox Extension supports both the native checkbox and the [ef-checkbox](https://ui.refinitiv.com/elements/checkbox). To use with the ef-checkbox, the following dependency is also required:

```sh
npm install @refinitiv-ui/elements
npm install @refinitiv-ui/halo-theme
```

Then import to your project `index.js`.

```js
// import element
import '@refinitiv-ui/elements/checkbox';

// import element's Halo dark theme
import '@refinitiv-ui/elements/checkbox/themes/halo/dark'; // Can be any theme
```

### Range Bar Extension

The Range Bar Extension provides graphical bar for last value ranking visualization based on low and high value with used [ef-led-gauge](https://ui.refinitiv.com/elements/led-gauge). To use the ef-led-gauge, the following dependency is also required:

```sh
npm install @refinitiv-ui/elements
npm install @refinitiv-ui/halo-theme
```

Then import to your project `index.js`.
```jsx
// import element
import '@refinitiv-ui/elements/led-gauge';

// import element's Halo dark theme
import '@refinitiv-ui/elements/led-gauge/themes/halo/dark'; // Can be any theme
```

### Filter Input Extension

The Filter Input extension supports various types of input elements. These can be archived by specifying the `type` property through `FilterInputPlugin options`. The EF component for each type of inputs is shown below:

| Type     | Import Name   |  Required EF Element   |
|----------|---------------|------------------------|
| default  |search-field   | ef-search-field        |
| number   |number-field   | ef-number-field        |
| select   |select         | ef-select              |
| dropdown |select         | ef-select              |
| date     |datetime-picker| ef-datetime-picker     |

> Note: there is no need to specify a type for the default input element.

Additional dependencies are required according to the `type` of input. For example, if specified `type` is `date`, the additional dependency is ef-datetime-picker.

### Pagination Extension

The Pagination Extension does not provide any UI. You will need to install `@refinitiv-ui/elements` separately for the UI. The extension will automatically wire the functionalities to the UI element once it is presented.

The pagination element is **completely independent** from the grid element and the Pagination Extension. So, any customization and feature request regarding the element has to be sent to the [ELF team](https://ui.refinitiv.com). The documentation for the element can be found on LSEG UI's [Pagination](https://ui.refinitiv.com/elements/pagination) page.


## Available extensions


- [Auto Tooltip](tr-grid-auto-tooltip.md)
- [Cell Selection](tr-grid-cell-selection.md)
- [Checkbox Column](tr-grid-checkbox.md)
- [Column Dragging](column-dragging.md)
- [Column Fitter](tr-grid-column-fitter.md)
- [Column Formatting](tr-grid-column-formatting.md)
- [Column Grouping](tr-grid-column-grouping.md)
- [Column Resizing](tr-grid-column-resizing.md)
- [Column Selection](tr-grid-column-selection.md)
- [Column Stack](tr-grid-column-stack.md)
- [Conditional Coloring](tr-grid-conditional-coloring.md)
- [Content Wrap](tr-grid-content-wrap.md)
- [Context Menu](tr-grid-contextmenu.md)
- [Filter Input](tr-grid-filter-input.md)
- [Heat Map](tr-grid-heat-map.md)
- [In-Cell Editing](tr-grid-in-cell-editing.md)
- [Pagination](tr-grid-pagination.md)
- [Percent Bar](tr-grid-percent-bar.md)
- [Range Bar](tr-grid-range-bar.md)
- [Row Dragging](tr-grid-row-dragging.md)
- [Row Filtering](tr-grid-row-filtering.md)
- [Row Grouping](tr-grid-row-grouping.md)
- [Row Segmenting](row-segmenting.md)
- [Row Selection](tr-grid-row-selection.md)
- [Row Coloring](tr-grid-rowcoloring.md)
- [Statistics Row](statistics-row.md)
- [Text Formatting](tr-grid-textformatting.md)
- [Title Wrap](tr-grid-titlewrap.md)
- [Zoom](zoom.md)

Visit the relevant extensions' sections to see the APIs, their usage and live demos.

