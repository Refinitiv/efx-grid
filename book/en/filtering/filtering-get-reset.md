# Get/Reset State

The [Row Filtering Extension](../extensions/tr-grid-row-filtering.md) provides APIs such as:

- `getColumnFilterStates()` - API returns an array of the current filter states of each column's filter UI.
- `removeAllColumnFilters()`  - API removes all the currently applied filters.

For more details see the [Row Filter Extension API documentation](../extensions/tr-grid-row-filtering.md).

```live
<style>
	atlas-blotter {
		height: 448px;
	}
</style>
<button id="get_states_btn">Get Filter States</button>
<button id="reset_all_btn">Clear All Filters</button>
<atlas-blotter id="grid"></atlas-blotter>

<script>
	var filterInputExt = new tr.FilterInputExtension();
	var rowFilteringExt = new tr.RowFilteringExtension();

	var dateFormatter = function(e) {
  	var value = e.data;
  	var cell = e.cell;
  	var parts = value.toDateString().split(" ");
  	cell.setContent(parts[2] + "-" + parts[1] + "-" + parts[3]);
	}

	var configObj = {
		columns: [
			{ name: "Date", field: "date", sortBy: "date", filterInput: { type: "date" }, binding: dateFormatter, alignment: "c" },
			{ name: "Country", field: "country", sortBy: "country", width: 200, alignment: "c" },
			{ name: "Currency", field: "currency", sortBy: "currency", filterInput: { type: "select", entries: ["PLN", "EUR", "SEK", "GBP", "DKK"] }, width: 200, alignment: "c" },
			{ name: "Rate", field: "rate", sortBy: "rate", alignment: "right", filterInput: { type: "number" }, width: 200, alignment: "c" }
		],
		rowFiltering: {
			disabledUI: true
		},
		extensions: [
			rowFilteringExt,
			filterInputExt
		]
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;

	document.getElementById('get_states_btn').addEventListener('click', function () {
		var states = rowFilteringExt.getColumnFilterStates();
		alert(JSON.stringify(states));
	});

	document.getElementById('reset_all_btn').addEventListener('click', function () {
		// Remove all filters and update the UI where applicable (via reset() method)
		rowFilteringExt.removeAllColumnFilters();
	});

	fetch('../resources/scripts/data/euro-currency-rate.json').then(o => o.json()).then(response => {
		response = response.map(function(data) {
			return {
				date: new Date(data.date),
				country: data.country,
				currency: data.currency,
				rate: data.rate
			}
		});
		grid.api.addStaticDataRows(response);
	});
</script>
```
