# Data From HTTP Request

Data in the `dataModel` can be retrieved using a normal HTTP request. You are free to retrieve data by any method. For instance, we can use [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch), or [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest). Once you get data from the request, you can use DataTable or DataView APIs to add data as described on the [Accessing Data](../general_concept/accessing-data.md) page.

## Example

```live
<style>
	emerald-grid {
		height: 200px;
	}
</style>
<button id="fetch_btn">Fetch Data Again</button>
<br>
<big><em id="msg_txt"></em></big>
<br>
<emerald-grid id="grid"></emerald-grid>

<script>
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var configObj = {
		columns: [
			{title: "Company", field: fields[0]},
			{title: "Market", field: fields[1], width: 100},
			{title: "Last", field: fields[2], width: 80},
			{title: "Net. Chng", field: fields[3], width: 80},
			{title: "Industry", field: fields[4]}
		],
		whenDefined: function(e) {
			loadData();
		}
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
	
	document.getElementById("fetch_btn").addEventListener("click", loadData);

	// Fetch data from data sample_rows.json
	function loadData() {
		grid.api.getDataTable().removeAllRows();
		msg_txt.textContent = "Start Loading...";
		
		setTimeout(function() { // Simulate network request time by delaying the request for 2 seconds
			fetch("../resources/scripts/data/sample_rows.json").then(o => o.json()).then(response => {
				var dt = grid.api.getDataTable();
				dt.addRows(response.result);

				msg_txt.textContent = "Data received";
			});
		}, 2000); 
	}
</script>
```

# Getting real-time data in Atlas Blotter

By default, Atlas Blotter can retrieve real-time data, if `JET.Quotes2` exists in the page. To specify what data to be requested, you can define `ric` in row configuration and `field` in column configuration. 

for more information about `JET.Quotes2`, see [JET page](../realtime_data/jet.md)

For more information about retrieving data from `RTK`, see [RTK page](../realtime_data/rtk.md)
