# Using Core APIs

Core Grid is the internal part of Grid, containing logics for UI and layout manipulation. Grid is just a wrapper that make the JavaScript grid component (Core Grid) become a [custom element](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) in the [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) standard. 

Some of the APIs are already propagated and exposed to the `api` property of the element. However, most of the APIs are still only available in the core part of Grid. 

To unlock all the APIs you need to get a reference to the Core Grid by using the `getCoreGrid` method from `api` as shown in the below sample:

```js
var configObj = {
	// ...
	whenDefined: function(e) {
		var core = e.api.getCoreGrid(); // Getting Core Grid reference
		
		var titleSection = core.getSection("title");
		var contentSection = core.getSection("content");
		var colCount = core.getColumnCount();
		// etc.
	},
	// ...
}
```

> Note: The [custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) are not defined immediately after the page load. `api` will only be available after the element is defined. So, use the `whenDefined` method to ensure the existence of the `api` property.

For all available Core Grid APIs, see [this page](../apis/README.md).

## Getting built-in plugins and extensions

Due to the long history of its development, Grid contains a lot of legacy codes, including built-in plugins. A plugin is just an old name for an extension. So, to get a reference for **plugins or extensions**, you can use the `getPlugin` method from the Core Grid. 

> Note: The "SortableTitlePlugin" is the only notable plugin worth mentioning among built-in plugins, since it manages how Grid sorts the data. 

The following example shows how you can listen to the `columnSorted` event fired after each sorting state change from the SortableTitlePlugin.

## Example

```live
<style>
	atlas-blotter {
		height: 200px;
	}
	html hr {
		margin: 5px;
	}
</style>
<big id="msg_div">Click grid top section to sort</big>
<hr>
<atlas-blotter id="grid"></atlas-blotter>

<script>
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 6 });
	
	var onColumnSorted = function(e) {
		msg_div.textContent = "Column " + e.colIndex + " is sorted in " + (e.sortOrder === "a" ? "ascending" : "descending") + " order";
	};

	var configObj = {
		sorting: {
			sortableColumns: true,
		},
		columns: [
			{name: "Company", field: fields[0]},
			{name: "Market", field: fields[1], width: 120},
			{name: "Last", field: fields[2], width: 100},
			{name: "Net. Chng", field: fields[3], width: 100},
			{name: "Industry", field: fields[4]}
		],
		staticDataRows: records,
		whenDefined: function(e) {
			var core = e.api.getCoreGrid();
			
			var plugin = core.getPlugin("SortableTitle");
			plugin.listen("columnSorted", onColumnSorted);
		}
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```

> Note: you can use the `listen` method to listen to a custom event fired from Grid and Grid's plugins, instead of the conventional `addEventListener` method.