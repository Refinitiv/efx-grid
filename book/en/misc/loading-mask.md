# Loading Mask

Loading mask is not part of Grid. To follow the standard theme, the UI and functionalities are provided by [loader](https://elf.int.refinitiv.com/elements/amber-loader.html) component. So, you need to put an overlay on top of the grid and not inside of it. For more advanced UI and behaviors, the implementation has to be done on the application side.

## Basic Example

```live
<style>
	#container_div {
		position: relative; /*amber-loader has position absolute*/
		height: 250px;
	}
	atlas-blotter {
		height: 100%;
	}
</style>
<button id="show_btn">Show Masking</button>
<button id="hide_btn">Hide Masking</button>
<br><br>
<div id="container_div">
	<atlas-blotter id="grid"></atlas-blotter>
</div>

<script>
	var loadingMaskEl = document.createElement("amber-loader"); // Element can be created at runtime 

	tr.DataGenerator.addFieldInfo("rowNumber", {
		type: "function",
		generate: function(info, seed) {
			return ++info.count;
		},
		count: 0,
	});
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry", "rowNumber"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 10 });
	var configObj = {
		columns: [
			{name: "ID", field: fields[5], alignment: "center", width: 80},
			{name: "Company", field: fields[0]},
			{name: "Market", field: fields[1], width: 120},
			{name: "Last", field: fields[2], width: 100},
			{name: "Net. Chng", field: fields[3], width: 100},
			{name: "Industry", field: fields[4]}
		],
		dataModel: {
			data: records
		}
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
	
	document.getElementById("show_btn").addEventListener("click", function() {
		document.getElementById("container_div").appendChild(loadingMaskEl);
	});
	
	document.getElementById("hide_btn").addEventListener("click", function() {
		loadingMaskEl.remove();
	});
</script>
```

## Infinite Scrolling with Data Fetching Example

```live
<style>
	atlas-blotter {
		height: 250px;
	}
	.blur {
		filter: blur(2px);
	}
	#container_div {
		position: relative; /*amber-loader has position absolute*/
	}
</style>

<button id="fetch_btn">Fetch Data</button>
<button id="clear_btn">Clear Data</button>
<big>Total rows: <span id="total_row">0</span></big>
<br>
<div id="container_div">
	<atlas-blotter id="grid"></atlas-blotter>
</div>

<script>
	var loading_mask = null; // Cache the element for re-using multiple times
	tr.DataGenerator.addFieldInfo("rowNumber", {
		type: "function",
		generate: function(info, seed) {
			return ++info.count;
		},
		count: 0,
	});
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry", "rowNumber"];

	function fetchData() { // Simulate Data Fetching
		if (!loading_mask) { // If we are not loading anything
			toggleLoadingMask();
			setTimeout(onDataReceived, 1500); // Simulate delay for communication with a server
		}
	};

	function clearData() {
		grid.api.removeAllRows();
		document.getElementById("total_row").textContent = 0;
	};

	function onDataReceived() {
		toggleLoadingMask(); // Remove loading mask
		
		var records = tr.DataGenerator.generateRecords(fields, { numRows: 20 });
		grid.api.addStaticDataRows(records);
		
		document.getElementById("total_row").textContent = grid.api.getRowCount(); // Update UI
	}

	function onScrollEnd(e) {
		var vScrollbar = grid.api.getCoreGrid().getVScrollbar();
		if (vScrollbar.isEndOfVerticalScroll()) {
			fetchData();
		}
	}

	function toggleLoadingMask() {
		if (loading_mask) {
			grid.classList.remove("blur");
			
			loading_mask.remove();
			loading_mask = null;
		} else {
			grid.classList.add("blur");
			
			loading_mask = document.createElement("amber-loader");
			document.getElementById("container_div").appendChild(loading_mask);
		}
	}

	var configObj = {
		columns: [
			{name: "ID", field: fields[5], alignment: "center", width: 80},
			{name: "Company", field: fields[0]},
			{name: "Market", field: fields[1], width: 120},
			{name: "Last", field: fields[2], width: 100},
			{name: "Net. Chng", field: fields[3], width: 100},
			{name: "Industry", field: fields[4]}
		],
		whenDefined: function(e) {
			fetchData();
			var vScrollbar = e.api.getCoreGrid().getVScrollbar();
			vScrollbar.listen("scroll", onScrollEnd);
		}
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;

	document.getElementById("fetch_btn").addEventListener("click", fetchData);
	document.getElementById("clear_btn").addEventListener("click", clearData);
```