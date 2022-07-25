# Left Side Column Pinning/Freezing

Sometimes Grid can contain a large number of columns and when scrolled to the right, without the row header, users might lose track of what kind of data is in the row.
To solve this, you can freeze or pin columns on the left side to act like a row indicator. To do this, set the `leftPinned` property to true on the column configuration object for the column you want to be frozen/pinned.

Similarly, `rightPinned` property can be used to pin the columns on the right side.  

## Example

```live
<atlas-blotter id="grid"></atlas-blotter>

<script>
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 10 });
	var configObj = {
		columns: [
			{name: " ", width: 24},
			{name: "Company", field: fields[0], width: 250, leftPinned: true },
			{name: "Market", field: fields[1], width: 150},
			{name: "Last", field: fields[2], width: 150},
			{name: "Net. Chng", field: fields[3], width: 150},
			{name: "Industry", field: fields[4], width: 300}
		],
		staticDataRows: records
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```
