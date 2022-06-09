# Vertical Scrollbar

By default, Grid behaves like a native div element that has CSS "display: block;". This means Grid's height will be expanded as the number of its rows is increasing. In other words, it has a dynamic height equal to its content height. So Grid will never show a vertical scrollbar by default, as the content height does not exceed its container (grid element) height.

If you want to enable the vertical scrollbar, two conditions must be met:
1. Grid must have some specific height (for example, 200px, 50%, or 100%).
2. Grid content height must exceed the height specified in #1. 

> Note: once Grid's vertical scrollbar is shown, Grid's row virtualization will also be activated. Not all elements will be created or rendered. The same cells will be shared across multiple rows.
> 
> Also, if the containers or Grid styles have been changed by JavaScript, you need to notify Grid about the change in order to update the layout. Use `getCoreGrid().updateLayout()` to force updating the layout.

## Example

```live
<button id="reset_btn">Reset Grid Height to Default</button>
<button id="set_200_btn">Set Grid Height to 200px</button>
<button id="set_600_btn">Set Grid Height to 600px</button>
<br><br>
<atlas-blotter id="grid" style="height: 200px"></atlas-blotter>

<script>
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 10 });
	var configObj = {
		columns: [
			{title: "Company", field: fields[0]},
			{title: "Market", field: fields[1], width: 100},
			{title: "Last", field: fields[2], width: 80},
			{title: "Net. Chng", field: fields[3], width: 80},
			{title: "Industry", field: fields[4]}
		],
		staticDataRows: records
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
	
	document.getElementById("reset_btn").addEventListener("click", function(e) {
		grid.style.height = "";
		grid.api.getCoreGrid().updateLayout(); // Notify grid that some CSS have been changed
	});
	document.getElementById("set_200_btn").addEventListener("click", function(e) {
		grid.style.height = "200px";
		grid.api.getCoreGrid().updateLayout(); // Notify grid that some CSS have been changed
	});
	document.getElementById("set_600_btn").addEventListener("click", function(e) {
		grid.style.height = "600px";
		grid.api.getCoreGrid().updateLayout(); // Notify grid that some CSS have been changed
	});
</script>
```

# Non-overlap vertical scrollbar

The Grid vertical scrollbar, by default, is shown on top of the grid. This is to avoid jittering the content when the layout is changed. However, in some cases, the vertical scrollbar may hinder or prevent interaction with the content, especially for the rightmost column. Use the `contentRightPadding` flag to reserve some space on the right to prevent this from happening.

`autoHideScrollbar` could also be used to stop automatic scrollbar hiding.

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
		contentRightPadding: 14,
		columns: [
			{title: "Company", field: fields[0]},
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

