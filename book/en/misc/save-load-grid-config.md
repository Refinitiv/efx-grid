
# Save/Load grid config
In atlas-blotter, we provide the developer with can implement save/load grid config for restoring config to the grid. This behavior helps the developer with implementation, Such as undo/redo functionality.
Where the grid has static data, which you can use `setStaticData` or `setStaticRowData` in runtime, the grid will store this information, and then when you want to use this config, you can just set this config into the grid.
We divide the example into two examples.

First, we have the grid and some data in the grid. You can set static data by clicking the button, and then the grid will change states, such as row coloring and segment color. And then, when you want to save this state, you can click “Save config,” and the grid will return the current state and copied to your clipboard. Then when you have a clipboard, you can pass it into example 2. Then click "Start Grid" and both grids look the same. 


```live

<style>
		html body {
			padding: 20px;
			box-sizing: border-box;
		}

		html hr {
			margin: 5px;
		}

		atlas-blotter {
			height: 300px;
		}
		
		#copy_success {
			color: green;
		}

		input[type="number"] {
			width: 40px;
		}
</style>
	
	<!--  Set predifined color with api  -->
    <h4>Example 1 save data from grid</h4>
	<span>Row Index</span>
	<input value="1" type="number" id="row_index">
	<hr>
	<span> Set row coloring</span>
	<button id="set_row_coloring_color1"> Row color 1 </button>
	<button id="set_row_coloring_color2"> Row color 2 </button>
	<button id="set_row_coloring_color3"> Row color 3 </button>
	<button id="unset_row_coloring_color"> Unset row color </button>
	<hr>
	<span> Save grid config for restore </span>
	<button id="save_config"> Save config </button>
	<span id="copy_success"> </span>
	<atlas-blotter></atlas-blotter>

	<script type="module">

		var rowColoringExt = window.rowColoringExt = new tr.RowColoringExtension();

		var fields = ["companyName", "industry", "CF_NETCHNG", "PCTCHNG", "CF_VOLUME"];

		var records = tr.DataGenerator.generateRecords(fields, { seed: 1, rowCount: 12 });

		var predefinedColorsSet1 = {
			"color-1": {
				backgroundColor: "#FF2848"
			},
			"color-2": {
				backgroundColor: "#FFB27B"
			},
			"color-3": {
				backgroundColor: "#EEF3B4"
			}
		};

		var predefinedRowColorsSet1 = {
			"c-yellow": {
				backgroundColor: "#FFFF00"
			},
			"c-blue": {
				backgroundColor: "#00FFFF"
			},
			"c-green": {
				backgroundColor: "#80FF80"
			},
			"c-red": {
				backgroundColor: "#FF8080"
			}
		};

		var configObj = {
			columns: [
				{
					name: "Company Name",
					field: fields[0],
					width: 120
				},
				{
					name: "Industry",
					field: fields[1]
				},
				{
					name: "Net. Chng",
					field: fields[2]
				},
				{
					name: "Price. Chng",
					field: fields[3]
				},
				{
					name: "Volume",
					field: fields[4]
				}
			],
			extensions: [rowColoringExt],
			rowColoring: {
				predefinedColors: predefinedRowColorsSet1,
				predefinedColoring: true,
				cssField: "rowColoringClass"
			},
			staticDataRows: records,
		};

		var grid = window.grid = document.getElementsByTagName("atlas-blotter")[0];
		grid.config = configObj;
		window.grid = grid;

		// listening Click Events
		set_row_coloring_color1.addEventListener("click", function (e) {
			var rowIndex = + row_index.value;
			grid.api.setStaticData(rowIndex, "rowColoringClass", "c-yellow");
		});

		set_row_coloring_color2.addEventListener("click", function (e) {
			var rowIndex = + row_index.value;
			grid.api.setStaticData(rowIndex, "rowColoringClass", "c-blue");
		});

		set_row_coloring_color3.addEventListener("click", function (e) {
			var rowIndex = + row_index.value;
			grid.api.setStaticData(rowIndex, "rowColoringClass", "c-green");
		});

		unset_row_coloring_color.addEventListener("click", function (e) {
			var rowIndex = + row_index.value;
			grid.api.setStaticData(rowIndex, "rowColoringClass", null);
		});

		save_config.addEventListener("click", function (e) {
			var config = grid.api.getConfigObject();
			var configStr = JSON.stringify(config, null, 2);
			navigator.clipboard.writeText(configStr);
			copy_success.textContent = "Copied grid config to clipboard success";
			setTimeout(function (e) { copy_success.textContent = "" }, 5000); // clear alert user
		});

	</script>

```

- - -


```live
<style>
		html body {
			padding: 20px;
			box-sizing: border-box;
		}

		html hr {
			margin: 5px;
		}

		atlas-blotter {
			height: 300px;
		}

		#area_config {
			width: 100%;
			height: 100px;
		}
</style>

	<!-- For restore config to grid -->
    <h4>Example 2 load data to grid</h4>
	<span> You can load the grid config with pase in below text area and then click "Start Grid" </span>
	<hr>
	<button id="start_grid"> Start Grid </button>
	<hr>
	<textarea id="area_config" placeholder="Patse grid config and click Start Grid"></textarea>
	<hr>
	<atlas-blotter></atlas-blotter>

	<script type="module">

		var rowColoringExt = window.rowColoringExt = new tr.RowColoringExtension();

		var fields = ["companyName", "industry", "CF_NETCHNG", "PCTCHNG", "CF_VOLUME"];

		start_grid.addEventListener("click", function (e) {
			var grid = window.grid = window.grid = document.getElementsByTagName("atlas-blotter")[0];

			var valueConfig = JSON.parse(area_config.value);
			var configObj = valueConfig;
			configObj.extensions = [rowColoringExt];
			grid.config = configObj;
		});

	</script>

```