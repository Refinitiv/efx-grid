# Filter UI

Rows can be filtered automatically using the [Filter Input Extension](../extensions/tr-grid-filter-input.md) and [Row Filter Extension](../extensions/tr-grid-row-filtering.md).

The `Filter Input Extension` provides built-in filter UIs, which is a form input element appearing between the title section and content section.

The `Row Filtering Extension` provides filtering programmatically due to UIs changing.

> Note that, the `Filter Input Extension` is using the `Row Filter Extension` and both extensions will synchronize together. So, in the `extensions` field the `Row Filter Extension` and `Filter Input Extension` instance must be included.

```js
var configObj = {
	extensions: [
		rowFilteringExt,
		filterInputExt
	]
}
```

## Built-in filter UIs

The Filter Input Extension provides many types of input UIs. The available UIs are text input, number input, dropdown selector and date-time picker.

```live
<style>
	atlas-blotter {
		height: 448px;
	}
</style>
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
			{ title: "Date", field: "date", sortBy: "date", filterInput: { type: "date" }, binding: dateFormatter, alignment: "c" },
			{ title: "Country", field: "country", sortBy: "country", width: 200, alignment: "c" },
			{ title: "Currency", field: "currency", sortBy: "currency", filterInput: { type: "select", entries: ["PLN", "EUR", "SEK", "GBP", "DKK"] }, width: 200, alignment: "c" },
			{ title: "Rate", field: "rate", sortBy: "rate", alignment: "right", filterInput: { type: "number" }, width: 200, alignment: "c" }
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

> Note that, without a `defaultLogic` property set, the function will perform a string search.

## Custom filter logic

In several use cases, we may need more than a default string search which we can achieve by creating a new function that filters data in each row, then attach the function itself to `defaultLogic`, the property of Filter Input Extension options (Find more available options at [Filter Input Extension](../extensions/tr-grid-filter-input.md)). Let's see column "rate" in the following example.

```live
<style>
	atlas-blotter {
		height: 448px;
	}
</style>
<atlas-blotter id="grid"></atlas-blotter>
<script>
	var filterInputExt = new tr.FilterInputExtension();
	var rowFilteringExt = new tr.RowFilteringExtension();
	var numericFilter = {
		defaultLogic: function (e, rowData) {
			if (e.inputText) {
				var num = +(e.inputText);
				var cellValue = rowData[e.field];
				return cellValue < num;
			}
			return false;
		},
		placeholder: "less than",
		type: "number"
	};

	var dateFormatter = function(e) {
  	var value = e.data;
  	var cell = e.cell;
  	var parts = value.toDateString().split(" ");
  	cell.setContent(parts[2] + "-" + parts[1] + "-" + parts[3]);
	}

	var configObj = {
		columns: [
			{ title: "Date", field: "date", sortBy: "date", filterInput: { type: "date" }, binding: dateFormatter, alignment: "c" },
			{ title: "Country", field: "country", sortBy: "country", width: 200, alignment: "c" },
			{ title: "Currency", field: "currency", sortBy: "currency", filterInput: { type: "select", entries: ["PLN", "EUR", "SEK", "GBP", "DKK"] }, width: 200, alignment: "c" },
			{ title: "Rate", field: "rate", sortBy: "rate", alignment: "right", filterInput: numericFilter, width: 200, alignment: "c" }
		],
		dataModel: {
			fields: ["date", "country", "currency", "rate"],
			format: "rows",
			data: []
		},
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
