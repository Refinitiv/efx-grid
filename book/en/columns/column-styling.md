# Column Styling

Columns can be styled by using CSS in the `styles` property of the column definition.

## Example

```live
<atlas-blotter id="grid"></atlas-blotter>

<script>
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 5 });
	var styles = {
		"font-weight": "bold",
		"font-size": "15px",
		"color": "#32ab60",
		"background-color":"#0b2615"
	};
	var configObj = {
		columns: [
			{title: "Company", field: fields[0], styles: styles},
			{title: "Market", field: fields[1], width: 100},
			{title: "Last", field: fields[2], width: 80},
			{title: "Net. Chng", field: fields[3], width: 80},
			{title: "Industry", field: fields[4]}
		],
		staticDataRows: records
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```