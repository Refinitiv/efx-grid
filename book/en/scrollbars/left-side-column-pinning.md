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

# Pinning column at runtime

Pinning column at runtime can be done through `pinColumn` method from Grid's API. The pinned column will be move to the right most of frozen area. To unpin a column, call `unpinColumn`. The unpinned column will be moved to the left most of unfrozen area.

## Example

```live
<style>
html hr, button {
	margin: 5px;
}
</style>

<fieldset id="pinning_set">
	<legend>Pinning</legend>
</fieldset>
<fieldset id="unpinning_set">
	<legend>Unpinning</legend>
</fieldset>
<atlas-blotter id="grid"></atlas-blotter>

<script>
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry", "Column 6", "Column 7"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 10 });
	
	var onClickPinning = function(e) {
		var btn = e.currentTarget;
		grid.api.pinColumn(btn.colIndex);
	};
	var onClickUnpinning = function(e) {
		var btn = e.currentTarget;
		grid.api.unpinColumn(btn.colIndex);
	};
	
	var len = fields.length; 
	for(var i = 0; i < 4; ++i) {
		var btn = document.createElement("button");
		btn.colIndex = i;
		btn.addEventListener("click", onClickPinning);
		btn.textContent = "Column " + (i + 1);
		pinning_set.appendChild(btn);
		
		btn = document.createElement("button");
		btn.colIndex = i;
		btn.addEventListener("click", onClickUnpinning);
		btn.textContent = "Column " + (i + 1);
		unpinning_set.appendChild(btn);
	}
	
	var configObj = {
		columns: [
			{name: "Company", field: fields[0], width: 250},
			{name: "Market", field: fields[1], width: 150},
			{name: "Last", field: fields[2], width: 150},
			{name: "Net. Chng", field: fields[3], width: 150},
			{name: "Industry", field: fields[4], width: 200},
			{field: fields[5], width: 150},
			{field: fields[6], width: 150}
		],
		staticDataRows: records
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```

<br><br><br>
