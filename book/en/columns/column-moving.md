# Column Moving

## Drag and drop

The ability of drag and drop column is enabled by default. But it can be turned off by setting `noColumnDragging` to *true*. The default value is *false*. 

### Example

#### Enabled (default)

```live
<style>
	atlas-blotter {
		height: 200px;
	}
</style>
<atlas-blotter id="grid"></atlas-blotter>

<script>
  var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 10 });
	var configObj = {
		columns: [
			{title: "Company", field: fields[0]},
			{title: "Market", field: fields[1], width: 100},
			{title: "Last", field: fields[2], width: 80},
			{title: "Net. Chng", field: fields[3], width: 80},
			{title: "Industry", field: fields[4]}
		],
		staticDataRows: records
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```

#### Disabled

```live
<style>
	atlas-blotter {
		height: 200px;
	}
</style>
<atlas-blotter id="grid"></atlas-blotter>

<script>
  var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 10 });
	var configObj = {
		noColumnDragging: true, // disabled column re-order
		columns: [
			{title: "Company", field: fields[0]},
			{title: "Market", field: fields[1], width: 100},
			{title: "Last", field: fields[2], width: 80},
			{title: "Net. Chng", field: fields[3], width: 80},
			{title: "Industry", field: fields[4]}
		],
		staticDataRows: records
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```

## API

Columns can be moved using the `grid.api.moveColumn(from, to)` API, which allows you to specify a column index or an array of column indices to be moved, and the target index position. See [APIs](../apis/rt_grid/Grid.md) for more details of `moveColumn` API.

### Example

```live
<style>
	atlas-blotter {
		height: 200px;
	}
</style>
<button id="move_1">Move Index 0 -&gt; 2</button>
<button id="move_2">Move Index 3,4 -&gt; 1</button>
<br>
<atlas-blotter id="grid"></atlas-blotter>

<script>
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 5 });
	var configObj = {
		columns: [
			{name: "Company", field: fields[0]},
			{name: "Market", field: fields[1], width: 100},
			{name: "Last", field: fields[2], width: 80},
			{name: "Net. Chng", field: fields[3], width: 80},
			{name: "Industry", field: fields[4]}
		],
		dataModel: {
			data: records
		}
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;

	document.getElementById('move_1').addEventListener('click', function() {
		grid.api.moveColumn(0, 2);
	});

	document.getElementById('move_2').addEventListener('click', function() {
		grid.api.moveColumn([3,4], 1);
	});
</script>
```

## Colum move prevention

By setting a column to be a stationary column, all previous columns on the left (up to the stationary column) will be locked in position. A column can be added to or removed from the locked panel but still not be able to switch positions. All columns will be able to change their position only when the stationary column is unmarked. See [Column Definition](../apis/rt_grid/ColumnDefinition.md) for more details of column options.

### Example

```live
<style>
	atlas-blotter {
		height: 200px;
	}
</style>
<atlas-blotter id="grid"></atlas-blotter>

<script>
  var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 10 });
	var configObj = {
		columns: [
			{title: "Company (stationary)", field: fields[0], stationary: true},
			{title: "Market", field: fields[1], width: 100},
			{title: "Last", field: fields[2], width: 80},
			{title: "Net. Chng", field: fields[3], width: 80},
			{title: "Industry", field: fields[4]}
		],
		staticDataRows: records,
		extensions: [new tr.CheckboxExtension()]
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```





