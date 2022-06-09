# Left Side Column Pinning/Freezing

Sometimes Grid can contain a large number of columns and when scrolled to the right, without the row header, users might lose track of what kind of data is in the row.
To solve this, you can freeze or pin columns on the left side to act like a row indicator. To do this, use the `freezeColumn` property to specify the "index" of the last column on the left side you want to be frozen/pinned.

## Example

```live
<atlas-blotter id="grid"></atlas-blotter>

<script>
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 10 });
	var configObj = {
		freezeColumn: 1, // Index of the last column to be frozen/pinned. In this case, 1 is the second column
		columns: [
			{width: 20},
			{title: "Company", field: fields[0], width: 250},
			{title: "Market", field: fields[1], width: 150},
			{title: "Last", field: fields[2], width: 150},
			{title: "Net. Chng", field: fields[3], width: 150},
			{title: "Industry", field: fields[4], width: 300}
		],
		staticDataRows: records
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```
