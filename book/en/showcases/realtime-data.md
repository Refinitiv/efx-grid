# Realtime Data

```live(formatters)
	<fieldset>
		<legend>Operations</legend>
		<input value="DOWN.N" id="ric_txt">
		<button id="insert_ric_btn">Insert RIC</button>
		<button id="bkr_btn">BKR.OQ</button>
		<button id="usd_btn">USD=</button>
		<button id="jyp_btn">JYP=</button>
		<button id="ndx_btn">.NDX</button>
	</fieldset>
	<hr>
	<atlas-blotter id="grid"></atlas-blotter>
<script>
	var heatMapExt = new tr.HeatMapExtension();
	var textFormattingExt = new tr.TextFormattingExtension();

	var Toolkit = tr.MockRTK ? tr.MockRTK : MockRTK; // WORKAROUND for v6
	Toolkit.init({ ID: 'rtk-atlas-blotter', minInterval: 100, maxInterval: 800 }, ['Quotes', 'Data']).then(onInit);

	function onInit(rtk) {
		var configObj = {
			rowSelection: true,
			fieldCaching: true,
			columns: [
				{
					field: "X_RIC_NAME",
					name: "RIC",
					tickColor: "CF_NETCHNG",
					minWidth: 100,
				},
				{
					field: "CF_TICK",
					name: "Tick",
					binding: onTickBinding,
				},
				{
					field: "CF_LAST",
					tickColor: "CF_TICK",
					blinking: true,
				},
				{
					field: "CF_NETCHNG",
					blinking: true,
					tickColor: "CF_TICK"
				},
				{
					field: "PCTCHNG",
					heatmap: true,
					formatType: "percent",
				}
			],
			rows: [
				{ ric: "BA.N" },
				{ ric: "AAPL.O" },
				{ ric: "MSFT.O" },
				{ ric: "TSLA.O" },
				{ ric: "PTT.BK" },
				{ ric: "AOT.BK" },
				{ ric: ".DJI", asChain: true, collapsed: false },

			],
			extensions: [heatMapExt, textFormattingExt],
			RTK: rtk
		};

		grid.config = configObj;
	}

	function onTickBinding(e) {
		var cell = e.cell;
		var data = e.data;
		var content = cell.getContent();
		if (!content) {
			content = document.createElement("coral-icon");
		}
		if (data != null) {
			content.icon = data === 2 ? "arrow-down-fill" : "arrow-up-fill";
			content.style.color = data === 2 ? "rgb(245, 71, 91)" : "rgb(57, 196, 110)";
		}
		cell.setContent(content);
	};

	bkr_btn.addEventListener("click", addRic.bind(null, bkr_btn.textContent));
	usd_btn.addEventListener("click", addRic.bind(null, usd_btn.textContent));
	jyp_btn.addEventListener("click", addRic.bind(null, jyp_btn.textContent));
	ndx_btn.addEventListener("click", function(e) {
		grid.api.insertRow("0#.NDX", 0);

	});
	insert_ric_btn.addEventListener("click", addRic.bind(null, ric_txt.value));
	function addRic(ric) {
		grid.api.insertRow(ric, 0);
	}
</script>

<style>
	body {
		padding: 24px;
	}

	atlas-blotter {
		height: 300px;
	}

	hr {
		margin: 8px;
	}
</style>
```

As demonstrated in the example above, we utilize mock data to simulate real-time data streaming, with each RIC receiving periodic data updates. We use the heat map extension to visually represent this data to users.