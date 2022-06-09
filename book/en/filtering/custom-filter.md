# Custom Filter UI

Apart from the built-in filter UIs, [Filter Input Extension](../extensions/tr-grid-filter-input.md) also supports UI customizations, which allows users to create their UI.

The Filter Input Extension provides an `inputCreated` event callback passed through the extension's configuration and is allowed to modify UI elements in this callback handler. More details about the configuration are available [here](../extensions/tr-grid-filter-input.md). The following example shows the first column:

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

	var onInputCreated = function(e) {
		// Perform ui customization on the fourth column only
		if(e.colIndex !== 0) { return; }

		// Create <option> elements. See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
		var items = [
			[">=", "GTE"],
			["<=", "LTE"],
			["==", "EQ"],
			["<", "LT"],
			[">", "GT"]
		];
		var options = items.map(function(item) {
			var optElem = document.createElement("option");
			optElem.textContent = item[0]; // Label
			optElem.value = item[1];
			return optElem;
		});

		// Create <select> element
		var selElem = document.createElement("select");
		selElem.style.display = "inline-block";
		selElem.style.width = "40%";
		selElem.style.maxHeight = "unset";
		options.forEach(function(optElem) {
			selElem.appendChild(optElem);
		});

		// Save variables for later use
		selElem.colIndex = e.colIndex;
		selElem.input = e.input;
		e.input.filterType = options[0].value;
		e.input.style.width = "60%";

		// Add event listener for business logic
		selElem.addEventListener("mousedown", function(e){
			e.stopPropagation();
		}, false);
		selElem.addEventListener("click", function(e){
			e.stopPropagation();
		}, false);
		selElem.addEventListener("change", function(e){
			e.stopPropagation();

			var elem = e.currentTarget;
			var selectedOption = elem.options[elem.selectedIndex];
			var colIndex = elem.colIndex;
			console.log("Selection changed on colIndex: ", colIndex);

			// Update filter type
			elem.input.filterType = selectedOption.value;

			// Force recalculation of filtering
			filterInputExt.refresh();
		}, false);

		// Insert select element before the input element
		var parentInput = e.input.parentNode;
		parentInput.insertBefore(selElem, parentInput.firstChild);
	}

	var myFilterLogic = function(e, rowData) {
		if(e.inputText) {
			var num = +(e.inputText);
			var cellValue = rowData[e.field];

			switch(e.input.filterType) {
				case "GTE": return (cellValue >= num);
				case "LTE": return (cellValue <= num);
				case "GT": return (cellValue > num);
				case "LT": return (cellValue < num);
				default: return (cellValue == num);
			}
		} else {
			return true;
		}
	}

	var configObj = {
		rowHighlight: true,
		columns: [
			{
				title: "Rate",
				field: "rate",
				sortBy: "rate",
				alignment: "right",
				filterInput: {
					defaultLogic: myFilterLogic,
					placeholder: "e.g. 1, 0, or -1"
				},
				width: 200,
				alignment: "c"
			},
			{ title: "Date", field: "date", sortBy: "date", filterInput: { type: "date" }, binding: dateFormatter, alignment: "c" },
			{ title: "Country", field: "country", sortBy: "country", width: 200, alignment: "c" },
			{ title: "Currency", field: "currency", sortBy: "currency", filterInput: { type: "select", entries: ["PLN", "EUR", "SEK", "GBP", "DKK"] }, width: 200, alignment: "c" }
		],
		rowFiltering: {
			disabledUI: true
		},
		extensions: [
			rowFilteringExt,
			filterInputExt
		],
		filterInput: {
			inputCreated: onInputCreated
		}
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
