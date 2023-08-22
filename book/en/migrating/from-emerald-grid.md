# Migrating from Emerald Grid

Emerald Grid has a lot of built-in features which make it big. Moving from Emerald Grid to EFX Grid usually involves around using extensions as a replacement for the built-ins. In this guide, we are going to list out all the differences and how you can migrate those features to EFX grid. 

## Deprecated properties

The following properties are available in Emerald Grid configuration object, but not available in EFX Grid configuration object. 

### `formatter` property

#### Change

`formatter`, `formatter.render`, and `formatter.bind` properties should be replaced by `binding` property. Any logic in `formatter.render` method should be combined with `formatter.bind` method for simplication. The parameters passed to `formatter.render` and `formatter.bind` methods are grouped into a single parameter in `binding` method.

#### Reason

`formatter` property requires `render` and `bind` methods to be defined, which is quite clunky. In addition, there are too many parameters passed to the methods. Most of them are not useful in most cases. They are locked into the function signature. They are inflexible and cumbersome to write.

#### Sample

If you have the following Emerald Grid configuration:

```js
var configObj = {
	columns: [
		{
			// Column options
			formatter: {
				render: function() {},
				binding: function(rowIndex, colIndex, data, cell) {
					var inputElem = cell.getContent();
					if (!inputElem) {
						inputElem = document.createElement("input");
					}
					
					inputElem.value = data;
					cell.setContent(inputElem);
				}
			}
		},
		...
	]
		
};
```

then you would change to the following EFX Grid configuration:

```js
var configObj = {
	columns: [
		{
			// Column options
			binding: function(e) {
				var cell = e.cell;
				var inputElem = cell.getContent();
				if (!inputElem) {
					inputElem = document.createElement("input");
				}
				
				inputElem.value = e.data;
				cell.setContent(inputElem);
			}
		},
		...
	]
	
};
```

> Note that the parameter names are now defined by the event argument. Some parameters may have its name changed. Please use the debugger to check for the parameters' availability.

### `dataModel` property

#### Change

`dataModel` property is replaced by `staticDataRows` property. value in `dataModel.data` should be used as `staticDataRows` value. `dataModel.fields` and `dataModel.format` will be automatically resolved by EFX Grid and should be safely removed. For reliable conversion, array of object maps should be used instead of two dimentional array. 

#### Reason

A row in EFX Grid can contains some information (i.e., real-time related metadata) other than just data content. `rows` property is created to hold the additional information. In the same sense, `staticDataRows` property is created for rows with only data content.

#### Sample

If you have the following Emerald Grid configuration:

```js
var configObj = {
	dataModel: {
		fields: ["field1", "field2"],
		format: "array",
		data: [
			[1, 2],
			[3, 4]
		]
	}
};
```

then you would change to the following EFX Grid configuration:

```js
var configObj = {
	staticDataRows: [
		{"field1": 1, "field2": 2},
		{"field1": 3, "field2": 4}
	]
};
```

### `title` and `titleAlignment` properties

Title keyword is used in HTML tag as [global attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/title) for tooltips. To avoid confusion between tooltip and header text, `title` and `titleAlignment` properties are renamed to `name` and `headerAlignment`, respectively.

### `blinkBy` and `blinker` properties

Blinking related features have been moved to [Conditional Coloring extension](../extensions/tr-grid-conditional-coloring.html). 

### `cellEditing` and `autoEdit` properties

Cell editing related features have been moved to [In-Cell Editing extension](../extensions/tr-grid-in-cell-editing.html).

### `checkboxSelector` property

Checkbox related features have been moved to [Checkbox extension](../extensions/tr-grid-checkbox.html).

### `filterRow` property

Filter row feature has been moved to [Filter Input extension](../extensions/tr-grid-filter-input.html).

## Built-in filter related methods and events

Filter related feature has been moved to [Row Filtering extension](../extensions/tr-grid-row-filtering.html).

The following filter related methods are not available in EFX Grid. Use methods provided from the extension instead. 

- filter
- addFilter
- removeFilter
- modifyFilter
- execFilter
- getFilterStates
- getColumnFilterStates
- restoreColumnFilterStates
- clearAllFilters
- showFilterRow
- hideFilterRow

The following custom events are not available in EFX Grid. Use events provided from the extension instead.

- filterAdded
- filterRemoved
- filterModified
- filterCleared

## Built-in cell editing related methods and events

Cell editing related features have been moved to [In-Cell Editing extension](../extensions/tr-grid-in-cell-editing.html).

The following cell editing related methods are not available in EFX Grid. Use methods provided from the extension instead. 

- editCell
- detachEditor

The following custom events are not available in EFX Grid. Use events provided from the extension instead.

- editorDetached
- editorAttached

## Built-in formatters

All provided built-in formatters (`formatter/AsyncFormatter`, `formatter/CheckBox`, and `formatter/UpDownColor`) are replaced by [predefined formatters](../rendering/predefined-formatter.html).

## Built-in plugins

the following table shows plugins and its equivalent extension 

| Plugin: | Extension |
| --- | --- |
| CellBlinkingPlugin | [Conditional Coloring extension](../extensions/tr-grid-conditional-coloring.html) |
| CellEditingPlugin | [In-Cell Editing extension](../extensions/tr-grid-in-cell-editing.html) |
| ColumnGroupingPlugin | [Column Stack extension](../extensions/tr-grid-column-stack.html) |
| GroupStatisticsPlugin | [Statistics Row extension](../extensions/statistics-row.html) |
| RowHeightAdjustingPlugin | [Content Wrap extension](../extensions/tr-grid-content-wrap.html) |
| ColumnWidthAdjustingPlugin | [Column Fitter extension](../extensions/tr-grid-column-fitter.html) |

## Accessing Data

Accessing data in Emerald Grid is done directly to its internal data stores (i.e., `DataTable` and `DataView`). This works fine, since rows in Emerald Grid contain only data content. However, the direct interaction with internal data store can cause out of synchronization with other parts in EFX Grid. 

### Change

Direct access to grid's internal data stores are removed. Data can be set or retrieved through grid's APIs or row definition objects instead.

### Reason

The change in data has to be recognized by Grid in order to synchronize with their corresponding rows and real-time data requests. 

### Sample

If you have the following code with Emerald Grid:

```js
var dv = grid.api.getDataView();

dv.getRowDataAt(1);

dv.getMultipleRowData(["1", "2"]);

dv.getAllRowData();
```

then you would change to the following code for EFX Grid:

```js
grid.api.getRowData(1); // Note getRowDataAt is shorthen to getRowData
grid.api.getRowDefinition(1).getRowData(); // Alternatively, RowDefinition object can be used for referencing

grid.api.getMultipleRowData(["1", "2"]);

grid.api.getMultipleRowData(); // getAllRowData is replaced with getMultipleRowData() for simplicity
```