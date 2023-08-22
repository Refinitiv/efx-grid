# Non-overlap Scrollbars

Normally, Grid's scrollbars are shown on top of its content. This behavior can result in scrollbars blocking the display and interaction of the content. You can work around this issue by adding extra content to allow space for the scrollbars. To do this set `contentRightPadding` and `contentBottomPadding` properties in the configuration, as shown in the example below.

## Content padding example

```live
<style>
	atlas-blotter {
		height: 200px;
	}
</style>
<atlas-blotter id="grid"></atlas-blotter>

<script>
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 20 });
	var configObj = {
		contentRightPadding: 14,
		contentBottomPadding: 14,
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

This extra content may not be desirable though, as it can add to the amount of scroll distance and not actually reserve space for the scrollbars. Instead, you can change the parent of the scrollbars and reserve some space using CSS paddings. To change the parent of the scrollbars supply the parent element to the `scrollbarParent` property in the configuration object, as shown below.

> Note: `autoHideScrollbar` is turned off by default if `scrollbarParent` is supplied.

##  Changing the scrollbar parent example

```live
<style>
	#grid_container {
		height: 200px; 
		padding-right: 14px;
		padding-bottom: 14px;
		box-sizing: border-box;
	}
	atlas-blotter {
		height: 100%;
	}
</style>
<div id="grid_container">
	<atlas-blotter id="grid"></atlas-blotter>
</div>

<script>
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 20 });
	var configObj = {
		scrollbarParent: document.getElementById("grid_container"),
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