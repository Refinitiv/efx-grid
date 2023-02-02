# Data conversion

Sometimes data adding to Grid is not sanitized, for example the value represented changed price can be -2, +4, "-0.3", "+5" or even null. To prevent Grid from displaying unexpected data, data parser or data sanitizer need to verify data before rendering. So Grid provides `dataComposed` event and `autoDateConversion` for this kind of task.

## dataComposed event

Once Grid get data the `dataComposed` event will be triggered. The event will be fired before rendering. Performing any data update during the `dataComposed` event will not cause more dataChanged events.

To add event listener for `dataComposed` event, just set the listener to the `dataComposed` property of Grid's configuration like the following:

```js
	function onDataComposed(e) {
		var grid = e.grid;
		var rowDef = e.rowDef;
		var values = e.changes;

		// parse or sanitize data here

		// save the parsed data through RowDefinition's API 
	}

	var config = {
		// other grid's options
		dataComposed: onDataComposed
	};
```

```live
<style>
	atlas-blotter {
		height: 168px
	}
</style>

<atlas-blotter id="grid"></atlas-blotter>

<script>
	var onDataComposed = function(e) {
		// Perform any data update during the event will NOT cause more dataChanged events
		var grid = e.grid;
		var rowDef = e.rowDef;
		var values = e.changes;

		if (!values) {
			return;
		}

		var value = values["change"];
		rowDef.setData("change_RAW", value);

		if (value == null || value === "N/A") {
			value = null;
			rowDef.setData("change_STATUS", "Invalid");
		} else {
			value = parseFloat(value);
		}

		rowDef.setData("change", value);
	};

	var records = [{ 
		values: {
			id: "1",
			change: "-0.58"
		}
	}, {
		values: {
			id: "2",
			change: "0.78"
		}
	}, {
		values: {
			id: "3",
			change: "+0.0475"
		}
	}, {
		values: {
			id: "4",
			change: null
		}
	}, {
		values: {
			id: "5",
			change: "N/A"
		}
	}];

	var configObj = {
		defaultColumnOptions: {
			notRealTimeField: true
		},
		columns: [
			{
				name: "Id",
				field: "id"
			},
			{
				name: "Raw data",
				field: "change_RAW"
			},
			{
				name: "Converted data",
				field: "change"
			},
			{
				name: "Status",
				field: "change_STATUS"
			}
		],
		dataComposed: onDataComposed, // attach handler for dataComposed event
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;

	// To emitate the dalay of reqeusting data from server
	setTimeout(function(e) {
		grid.api.insertRows(records);
	}, 4000);
</script>
```

## Auto date conversion

When dealing with date-time data it may be hard to handle the various types of incoming data, which can be number, string, ISO date string, seconds or milliseconds. So it is better to enable `autoDateConversion` in the Grid's configuration and let Grid automatically convert data to JavaScript native Date object. To let Grid know that the column's data is data-time, the `dataType: "datatime"` should be specified in the column's options.

```live
<atlas-blotter id="grid"></atlas-blotter>

<script>
	var descriptions = [
		"Invalid",
		"Negative value (milliseconds)",
		"Excel date",
		"Second",
		"Millisecond",
		"Native date object (now)",
		"ISO date-time string"
	];

	var dateSamples = [
		"abc",
		-1,
		1,
		Date.UTC(2021, 11, 24, 10)/1000,
		Date.UTC(2021, 11, 24, 10),			
		new Date(),
		"2021-11-25T10:00:00"
	];
	
	var records = [];
	for (var i = 0; i < descriptions.length; i++) {
		records.push({
			des: descriptions[i],
			date: dateSamples[i]
		});
	}

	var configObj = {
		autoDateConversion: true,
		defaultColumnOptions: {
			notRealTimeField: true
		},
		columns: [
			{
				name: "Description",
				field: "des"
			},
			{
				name: "Raw data",
				field: "date_RAW"
			},
			{
				name: "Converted data",
				field: "date",
				dataType: "datetime"
			},
			{
				name: "Formatted data",
				field: "date",
				formatType: {
					formatType: "DateTime",
					dateTimeFormat: "DD/MM/YYYY HH:mm",
					useUTCTime: true
				}
			},
			{
				name: "Realtime Data",
				field: "last_update",
				dataType: "datetime",
				alignment: "center",
				formatType: {
					formatType: "DateTime",
					dateTimeFormat: "DD/MM/YYYY HH:mm:ss",
					useUTCTime: true
				}
			}
		],
		staticDataRows: records,
		extensions: [
			new tr.TextFormattingExtension()
		]
	};

	var grid = document.getElementById("grid");
	grid.addEventListener("configured", function(e) {
		var api = e.detail.api;
		var randIndex = tr.DataGenerator.randIndex;
		setInterval(function() {
			var index = randIndex(records.length);
			api.setRowData(index, {
				last_update: Date.now()
			});
		}, 400);
	});
	grid.config = configObj;
</script>
```
