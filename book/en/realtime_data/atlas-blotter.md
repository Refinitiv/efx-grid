# Using JET.Quotes2 with Atlas Blotter

The `atlas-blotter` is a grid component that wraps **rt-grid** (also known as [Realtime Grid library](https://git.sami.int.thomsonreuters.com/tr-grid/rt-grid)). It provides an easy way to display real-time data in a tabular format. It allows you to create lists of multiple instruments with multiple real-time and fundamentals columns.

```live
<style>
	atlas-blotter {
		height: 250px;
	}
</style>
<atlas-blotter></atlas-blotter>
<script>
	JET = new tr.MockJET(); // Use Mock for illustrative purpose only

	var columns = [
	{
		field: "X_RIC_NAME",
		tickColor: "CF_NETCHNG"
	},
	{
		field: "CF_NAME"
	},
	{
		field: "CF_LAST",
		tickColor: "CF_NETCHNG",
		blinking: true
	},
	{
		field: "CF_NETCHNG",
		tickColor: true,
		blinking: true
	},
	{
		field: "PCTCHNG",
		tickColor: "CF_NETCHNG",
		blinking: true
	}
	];
	var configObj = {
		rows: [
			{ ric: "EUR=" },
			{ ric: "GBP=" },
			{ ric: "JPY=" },
			{ ric: "AUD=" },
			{ ric: "THB=" },
			{ ric: "ARS=" },
			{ ric: "AZN=" },
			{ ric: "BND=" }
		],
		columns: columns,
	};
	var grid = document.getElementsByTagName("atlas-blotter")[0];
	grid.config = configObj;
</script>
```

## Next steps

Proceed to the [integration guide](jet.md) for `JET.Qoutes2` with real-time market data.
