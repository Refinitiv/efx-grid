# Row Grouping

> **Note:** Built-in row grouping is deprecated in favor of the [Row Grouping Extension](../extensions/README.md). In terms of both functionalities and UIs, the extension provides more control and flexibility over the current APIs.

Row grouping can be done by using the [Row Grouping Extension](../extensions/tr-grid-row-grouping.md).  To do the grouping, you will need to provide grouping criteria to the `groupBy` property of the `rowGrouping` option in the grid configuration object.

```js
var configObj = {
	...
	rowGrouping: {
		groupBy: ["field1", "criteria"],
	},
	...
}
```

## Example

```live
<style>
	atlas-blotter {
		height: 320px;
	}
</style>

<big>Group By:</big>
<button id="g1_btn">Market</button>
<button id="g2_btn">Industry</button>
<button id="g23_btn">Market and Industry</button>
<button id="clear_btn">Reset Grouping</button>
<br><br>
<big>Expand:</big>
<button id="expand_btn">Expand All Groups</button>
<button id="collapse_btn">Collapse All Groups</button>
<br><br>
<atlas-blotter id="grid"></atlas-blotter>

<script>
  var rowGroupingExt = new tr.RowGroupingExtension();
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 100 });
	var configObj = {
		rowGrouping: {
			groupBy: ["market", "industry"],
			headerBinding: function(e) {
				e.cell.setContent(e.groupId + " (" + e.dataSource.getAllRowIds().length + ")");
			},
			groupSortLogic: function(a, b) { // Optional
					return (a < b ? -1 : ( a > b ? 1 : 0));
			},
			headerSpanning: true // Optional
		},
		columns: [
			{name: "Company", field: fields[0]},
			{name: "Market", field: fields[1], width: 100},
			{name: "Last", field: fields[2], width: 80},
			{name: "Net. Chng", field: fields[3], width: 80},
			{name: "Industry", field: fields[4]}
		],
		staticDataRows: records,
		extensions: [rowGroupingExt]
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;

	g1_btn.addEventListener("click", function(e) {
		rowGroupingExt.groupBy(fields[1]);
	});
	g2_btn.addEventListener("click", function(e) {
		rowGroupingExt.groupBy(fields[4]);
	});
	g23_btn.addEventListener("click", function(e) {
		rowGroupingExt.groupBy([fields[1], fields[4]]);
	});
	clear_btn.addEventListener("click", function(e) {
		rowGroupingExt.groupBy(null);
	});
	expand_btn.addEventListener("click", function(e) {
		rowGroupingExt.expandAll();
	});
	collapse_btn.addEventListener("click", function(e) {
		rowGroupingExt.collapseAll();
	});
</script>
```