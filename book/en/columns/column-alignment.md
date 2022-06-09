# Column Alignment

Column content can be aligned to the *left*, *center*, or *right* using the property `alignment` in the column definition. The `alignment` property will be applied for both column content and header by default. 

Column header alignment can be separately set on `headerAlignment` property. The `headerAlignment` property will override the `alignment` property for the column header. 

The default value for both `alignment` and `headerAlignment` is *left*.

```js
var configObj = {
	...
	columns: [
		{
			alignment: "left",
			headerAlignment: "center"
		}, 
		...
	],
	...
}
```

## Example

```live
<style>
	html hr {
		margin: 5px;
	}
	atlas-blotter {
		height: 200px;
	}
</style>
<button id="lft_btn">Left Alignment</button>
<button id="ctr_btn">Center Alignment</button>
<button id="rgt_btn">Right Alignment</button>
<button id="reset_btn">Reset Alignment</button>
<hr>
<atlas-blotter id="grid"></atlas-blotter>

<script>
	function setAlignment(alignment) { 
		var core = grid.api.getCoreGrid();
		var colCount = core.getColumnCount();
		for(var c = 0; c < colCount; ++c) {
			core.setColumnAlignment(c, alignment);
		}
	}
	
	lft_btn.addEventListener("click", function(e) { 
		setAlignment("l");
	});
	ctr_btn.addEventListener("click", function(e) { 
		setAlignment("c");
	});
	rgt_btn.addEventListener("click", function(e) { 
		setAlignment("r");
	});
	reset_btn.addEventListener("click", function(e) { 
		setAlignment("");
	});
	
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 5 });
	var configObj = {
		columns: [
			{name: "Default", field: fields[0]},
			{name: "Center Header", field: fields[1], alignment: "center", headerAlignment: "center"},
			{name: "Last", field: fields[2],alignment: "right", headerAlignment: "left"},
			{name: "Net. Chng", field: fields[3], alignment: "right"},
			{name: "Center Header", field: fields[4], headerAlignment: "center"}
		],
		staticDataRows: records
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```
