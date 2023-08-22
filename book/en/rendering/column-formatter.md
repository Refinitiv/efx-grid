# Formatter (default)

Formatter is what Grid uses to render content. Grid's default formatter will render any data in plain text. When data is updated, Grid will bind the data from its own internal data source to render the data in plain text using the formatter. The data given to grid can be any data type.

> Note: The formatter will be repeatedly executed multiple times for every update and scrolling. 

Default rendering is already optimized for row virtualization. This means that grid uses the same text element to render different data for different rows. It should be fast enough to handle rendering a million of rows.

To update what is shown on the Grid, please use Grid's APIs to [manipulate the data](../general_concept/accessing-data.md) from the instance.

## Example

```live
<style>
	efx-grid {
		height: 200px;
	}
</style>
<efx-grid id="grid"></efx-grid>

<script>
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = DataGenerator.generateRecords(fields, { numRows: 40 });
	var configObj = {
		columns: [
			{name: "Company", field: fields[0]},
			{name: "Market", field: fields[1]},
			{name: "Last", field: fields[2]},
			{name: "Net. Chng", field: fields[3]},
			{name: "Industry", field: fields[4]}
		],
		staticDataRows: records
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```

## Internal Default Formatter Implementation

Internally, Grid implements the formatter as the following code: 

```js
var configObj = {
	columns: [
		{ binding: function(e){
				e.cell.setContent(e.data);
			}
		}
	]
};
```

# Custom Formatter

If we want anything other than simple text, we need to define a custom formatter. You can find more details about this in the [Custom Formatter section](custom-formatter.md). 
