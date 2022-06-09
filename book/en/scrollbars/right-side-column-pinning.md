# Right Side Column Pinning/Freezing

When Grid contains controls or buttons on the right side you should freeze or pin these columns, as they should not be part of the scrollable content. To do this use the `pinnedRightColumns` property to specify the "number" of columns to be frozen/pinned on the right side.

## Example

```live
<style>
	atlas-blotter {
		height: 200px;
	}
</style>
<atlas-blotter id="grid"></atlas-blotter>

<script>
	var buttonFormatter = {
		render: function() {},
		bind: function(r, c, val, cell) {
			var btn = cell.getContent();
			if(!btn) {
				btn = document.createElement("button");
			}
			btn.textContent = val;
			cell.setContent(btn);
		}
	};

	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry", "id"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 10 });
	var configObj = {
		pinnedRightColumns: 3, // Number of columns to be frozen/pinned
		columns: [
			{title: "Company", field: fields[0], width: 250},
			{title: "Market", field: fields[1], width: 100},
			{title: "Last", field: fields[2], width: 100},
			{title: "Net. Chng", field: fields[3], width: 100},
			{title: "Industry", field: fields[4], width: 300},
			{title: "Op.1",field: fields[5], width: 60, formatter: buttonFormatter, alignment: "center"},
			{title: "Op.2",field: fields[5], width: 60, formatter: buttonFormatter, alignment: "center"},
			{title: "Op.3",field: fields[5], width: 60, formatter: buttonFormatter, alignment: "center"}
		],
		staticDataRows: records
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```
