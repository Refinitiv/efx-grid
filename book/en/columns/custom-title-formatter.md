# Column - Custom Title

In addition to formatting the cells in content rows, you can also create a custom formatter for the column title. 

```js
var customFormatter = function(e){
	e.cell.setContent("Custom " + e.columnDef.getName());
}

var configObj = {
	// Other grid's config
	columns: [
		{name: "Column 1", field: "intCol", headerBinding: customFormatter},
	]
}
grid.config = configObj;
```

## Example

```live
<efx-grid id="grid"></efx-grid>

<script>
	function TitleColorTagFormatter(color, e) {
		var tag = document.createElement('div');
		tag.style.width = "0px";
		tag.style.height = "0px";
		tag.style.borderStyle = "solid";
		tag.style.borderWidth = "0 15px 15px 0";
		tag.style.position = "absolute";
		tag.style.top = "0px";
		tag.style.right = "0px";
		tag.style.borderColor = "transparent "+ color +" transparent transparent";
		
		e.cell.addContent(tag);
		e.cell.setContent(e.columnDef.getName());
	}
	
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = DataGenerator.generateRecords(fields, { numRows: 6 });
	var configObj = {
		columns: [
			{
				name: "Company", field: fields[0], 
				headerBinding: TitleColorTagFormatter.bind(null, "#ff9933")
			},
			{
				name: "Market", field: fields[1], width: 100, 
				headerBinding: TitleColorTagFormatter.bind(null, "#f5475b")
				},
			{
				name: "Last", field: fields[2], width: 80,
				headerBinding: TitleColorTagFormatter.bind(null, "#39c46e")
			},
			{
				name: "Net. Chng", field: fields[3], width: 80,
				headerBinding: TitleColorTagFormatter.bind(null, "#46a0f0")
			},
			{
				name: "Industry", field: fields[4],
				headerBinding: TitleColorTagFormatter.bind(null, "#2fb4c8")
			}
		],
		staticDataRows: records
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```
