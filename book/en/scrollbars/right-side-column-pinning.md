# Right Side Column Pinning/Freezing

When Grid contains controls or buttons on the right side you should freeze or pin these columns, as they should not be part of the scrollable content. To do this use the `rightPinned` property on the column configuration object.

## Example

```live
<style>
	atlas-blotter {
		height: 200px;
	}
</style>
<atlas-blotter id="grid"></atlas-blotter>

<script>
	var buttonFormatter = function(e) {
		var cell = e.cell;
		var btn = cell.getContent();
		if(!btn) {
			btn = document.createElement("button");
		}
		btn.textContent = e.data;
		cell.setContent(btn);
	};

	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry", "id"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 10 });
	var configObj = {
		columns: [
			{title: "Company", field: fields[0], width: 250},
			{title: "Market", field: fields[1], width: 100},
			{title: "Last", field: fields[2], width: 100},
			{title: "Net. Chng", field: fields[3], width: 100},
			{title: "Industry", field: fields[4], width: 300},
			{title: "Op.1", field: fields[5], width: 60, rightPinned: true, binding: buttonFormatter, alignment: "center"},
			{title: "Op.2", field: fields[5], width: 60, rightPinned: true, binding: buttonFormatter, alignment: "center"},
			{title: "Op.3", field: fields[5], width: 60, rightPinned: true, binding: buttonFormatter, alignment: "center"}
		],
		staticDataRows: records
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```
