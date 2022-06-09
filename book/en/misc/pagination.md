# Server Side Pagination

In case you want to retrieve a chunk of data from the server and do not want to load all of the data at once, you need to do server side pagination. The [pagination](https://elf.int.refinitiv.com/elements/emerald-pagination.html) component is enough to do this. **Do not** use the Pagination Extension for server side pagination. 

All related logics (such as data requesting, validation, and transformation) must be implemented on the application side. Once data is received, you can just assign data to Grid's `data` property. 

See more details about data setting at [Columns and Data Properties](../data/columns-and-data.md).

## Example

```js
	// ...
	function onServerResponse(data) {
		hideLoadingMask();
		grid.data = data; // Setting data from server
	}
	function onGettingTotalPage(total) {
		pagination_ui.totalItems = total;
	}
	function onPageChanged(e) {
		requestData(e.detail.value, e.target.pageSize, onServerResponse);
	}
	// ...
```

```live
<style>
	atlas-blotter {
		height: 169px;
	}
	emerald-pagination {
		margin-bottom: 30px;
	}
	.blur {
		filter: blur(2px);
	}
</style>
<div id="container_div">
	<atlas-blotter id="grid"></atlas-blotter>
	<emerald-pagination id='pagination_ui' page="1" page-size="5"></emerald-pagination>
</div>

<script>
	var paginationUI = document.getElementById("pagination_ui");
	var SERVER_DELAY = 300;
	var loading_mask = document.createElement("amber-loader");

	function showLoadingMask() {
		if (!loading_mask.parentElement) {
			container_div.classList.add('blur');
			container_div.append(loading_mask);
		}

		paginationUI.disabled = true;
	}
	function hideLoadingMask() {
		if (loading_mask.parentElement) {
			container_div.classList.remove('blur');
			loading_mask.parentElement.removeChild(loading_mask);
		}

		paginationUI.disabled = false;
	}
	
	// Event handlers
	function onServerResponse(data) {
		hideLoadingMask();
		grid.data = data; // Setting data from server
	}
	function onGettingTotalPage(total) {
		paginationUI.totalItems = total;
	}
	function onPageChanged(e) {
		requestData(e.detail.value, e.target.pageSize, onServerResponse);
	}

	// Mocking Server
	function requestTotalPage(callback) {
		setTimeout(function () { // Simulate network delay when requesting data from server
			callback(serverData.length);
		}, SERVER_DELAY);
	}
	function requestData(page, itemPerPage, callback) {
		showLoadingMask();
		page = parseInt(page);
		itemPerPage = parseInt(itemPerPage);
		setTimeout(function () { // Simulate network delay when requesting data from server
			var start = itemPerPage * (page - 1);
			var end = start + itemPerPage;
			callback(serverData.slice(start, end));
		}, SERVER_DELAY);
	}
	
	// Mocking Data
	var totalCount = 100;
	tr.DataGenerator.addFieldInfo("rowNumber", {
		type: "function",
		generate: function(info, seed) {
			return ++info.count;
		},
		count: 0,
	});
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry", "rowNumber"];
	var serverData = tr.DataGenerator.generateRecords(fields, { numRows: totalCount });

	// Initializing UIs
	var configObj = {
		rowHighlight: true,
		columns: [
			{name: "ID", field: fields[5], alignment: "center", width: 40},
			{name: "Company", field: fields[0]},
			{name: "Market", field: fields[1], width: 120},
			{name: "Last", field: fields[2], width: 100},
			{name: "Net. Chng", field: fields[3], width: 100},
			{name: "Industry", field: fields[4]}
		]
		// ,dataModel: {...} Initial data is optional
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;

	paginationUI.addEventListener('page-changed', onPageChanged);

	// Start app by getting total number of items and data
	requestTotalPage(onGettingTotalPage);
	requestData(paginationUI.page, paginationUI.pageSize, onServerResponse);
</script>
```

# Client side pagination

If you have all the data available on the client side and want to show data in pagination style, you can use the Pagination Extension and the [pagination](https://elf.int.refinitiv.com/elements/emerald-pagination.html) element. The current page and page size can be configured using the `pagination` option. The pagination behaviors are then implemented by the extension. See [Pagination Extension](../extensions/tr-grid-pagination.md) for more details.

## Example

```live
<style>
	atlas-blotter {
		height: 169px;
	}
	emerald-pagination {
		margin-bottom: 30px;
	}
</style>
<atlas-blotter id="grid"></atlas-blotter>
<emerald-pagination id='pagination'></emerald-pagination>

<script>
	tr.DataGenerator.addFieldInfo("rowNumber", {
		type: "function",
		generate: function(info, seed) {
			return ++info.count;
		},
		count: 0,
	});
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry", "rowNumber"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 100 });
	var configObj = {
		rowHighlight: true,
		columns: [
			{name: "ID", field: fields[5], alignment: "center", width: 40},
			{name: "Company", field: fields[0]},
			{name: "Market", field: fields[1], width: 120},
			{name: "Last", field: fields[2], width: 100},
			{name: "Net. Chng", field: fields[3], width: 100},
			{name: "Industry", field: fields[4]}
		],
		dataModel: {
			data: records
		},
		pagination: {
			element: document.getElementById("pagination"),
			page: 1,
			pageSize: 5
		},
		extensions: [
			new tr.PaginationExtension()
		]
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```
