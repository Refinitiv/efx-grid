# Horizontal Scrollbar

By default, Grid behaves like a native div element that has CSS "display: block;". So, Grid has a default size of 100% of the parent width. 

Grid's default column widths have no fixed size. The column size will be divided equally on the available space. And Grid columns will fit within the available space. So, Grid will never show a horizontal scrollbar by default, as the content (column) width does not exceed its container (grid element) width.

If you want to enable the horizontal scrollbar, two conditions must be met:
1. All of the grid columns must have a fixed size.
2. The total column width must exceed the grid width.

> Note: once Grid's horizontal scrollbar is shown, column virtualization will be activated as well.

## Example

```live
<button id="reset_btn">Reset All Column Widths to Default</button>
<button id="fixate_all_btn">Fixate All Column Widths</button>
<button id="fixate_first_btn">Fixate the First Column</button>
<br><br>
<atlas-blotter id="grid"></atlas-blotter>

<script>
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 6 });
	var configObj = {
		columns: [
			{title: "Company", field: fields[0]},
			{title: "Market", field: fields[1]},
			{title: "Last", field: fields[2]},
			{title: "Net. Chng", field: fields[3]},
			{title: "Industry", field: fields[4]}
		],
		staticDataRows: records
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
	
	document.getElementById("reset_btn").addEventListener("click", function(e) {
		grid.api.getCoreGrid().setColumnWidths([1, 1, 1, 1, 1], true); // All columns will have equal width
	});
	document.getElementById("fixate_all_btn").addEventListener("click", function(e) {
		grid.api.getCoreGrid().setColumnWidths([300, 150, 150, 150, 200], false); // Set all column widths to the specified size.
	});
	document.getElementById("fixate_first_btn").addEventListener("click", function(e) {
		var core = grid.api.getCoreGrid();
		core.setColumnWidth(0, 200); // Set the first column to have fixed width (200px);
		core.setColumnWidths([null, 1, 1, 1, 3], true); // Set the last four columns to have no size
	});
</script>
```

# Non-overlap horizontal scrollbar

The Grid horizontal scrollbar, by default, is shown on top of the grid. This is to avoid the content jittering when the layout is changed. However, in some cases, the horizontal scrollbar may hinder or prevent interaction with the content, especially for the bottommost row. Use the `contentBottomPadding` flag to reserve some space on the bottom to stop this from happening.

`autoHideScrollbar` can also be used to stop automatic scrollbar hiding.

## Example

```live
<atlas-blotter id="grid"></atlas-blotter>

<script>
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 10 });
	var configObj = {
		autoHideScrollbar: false,
		contentBottomPadding: 9,
		columns: [
			{title: "Company", field: fields[0], width: 300},
			{title: "Market", field: fields[1], width: 150},
			{title: "Last", field: fields[2], width: 150},
			{title: "Net. Chng", field: fields[3], width: 150},
			{title: "Industry", field: fields[4], width: 200}
		],
		staticDataRows: records
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```