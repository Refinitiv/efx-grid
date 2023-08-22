# Scrollbar Visibility

Instead of fading in or out on hover (default behavior), Grid scrollbars can be set to always be visible whenever the content is scrollable.

This behavior can be enabled upon grid initialization using the `autoHideScrollbar` option. The values can be *false* for always-on, and *true* for fade in/out (default).

## Example

```live
<style>
	atlas-blotter {
		height: 200px;
	}
</style>
<atlas-blotter id="grid"></atlas-blotter>

<script>
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 10 });
	var configObj = {
		autoHideScrollbar: false,
		columns: [
			{name: "Company", field: fields[0], width: 250},
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
