# Column Moving

## Drag and drop

The ability of drag and drop column is enabled by default. But it can be turned off by setting `noColumnDragging` to *true*. The default value is *false*. 

### Drag and drop to move a column example (default)

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
			{name: "Company", field: fields[0]},
			{name: "Market", field: fields[1], width: 100},
			{name: "Last", field: fields[2], width: 80},
			{name: "Net. Chng", field: fields[3], width: 80},
			{name: "Industry", field: fields[4]}
		],
		staticDataRows: records
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```

### Disabled drag and drop example

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
			{name: "Company", field: fields[0]},
			{name: "Market", field: fields[1], width: 100},
			{name: "Last", field: fields[2], width: 80},
			{name: "Net. Chng", field: fields[3], width: 80},
			{name: "Industry", field: fields[4]}
		],
		staticDataRows: records
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```

## Using APIs to move a column

Columns can be moved using the `grid.api.moveColumnById(sourceColumn, destinationPosition)` API, which allows you to move specified column by index or id to the position before the specified destination. If the specified destination is invalid or doesnot exist, the column will be moved to the end of Grid.

To move multiple columns at once, use `reorderColumns` API. 

See [available APIs](../apis/rt_grid/Grid.md) for more details.

### Example

```live
<style>
	atlas-blotter {
		height: 200px;
	}
	html hr {
		margin: 5px;
	}
	button {
		margin: 2px;
	}
</style>
<big>Move</big>
<select id="source_sel"></select>
<big>to the position before</big>
<div id="destination_div"></div>
<hr>
<atlas-blotter id="grid"></atlas-blotter>

<script>
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var colNames = ["Company", "Market", "Last", "Net. Chng", "Industry"];
	var columns = fields.map(function(f, idx) {
		var colName = colNames[idx];
		var colId = "c" + idx;
		return {
			id: colId,
			field: f,
			name: colName
		};
	});
	columns[1].width = 100;
	columns[2].width = 80;
	columns[3].width = 80;
	
	columns.forEach(function(col, idx) {
		var opt = document.createElement("option");
		opt.value = col.id;
		opt.textContent = col.name + " column";
		if(col.name === "Industry") {
			opt.selected = true;
		}
		source_sel.appendChild(opt);
		
		var btn = document.createElement("button");
		btn.colId = col.id;
		btn.textContent = col.name;
		btn.addEventListener("click", onClickMoveBtn);
		destination_div.appendChild(btn);
	});
	
	var lastBtn = document.createElement("button");
	lastBtn.textContent = "End of Grid";
	lastBtn.addEventListener("click", onClickMoveBtn);
	destination_div.appendChild(lastBtn);
	
	function onClickMoveBtn(e) {
		var btn = e.currentTarget;
		var destId = btn.colId;
		
		var sourceOpt = source_sel.selectedOptions[0];
		var srcId = sourceOpt.value;
		grid.api.moveColumnById(srcId, destId);
	}
	
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 5 });
	var configObj = {
		columns: columns,
		staticDataRows: records
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```

## Preventing a column from moving

By marking a column to be a `stationary` column, any column on the left and the stationary column will be locked in the position (i.e., columns cannot be moved). A column can still be added to or removed from the stationary section. Once stationary column is removed or unmarked as `stationary`, the columns in the section will be free to be moved. See [Column Definition](../apis/rt_grid/ColumnDefinition.md) for more details of column options.

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
			{name: "Company (stationary)", field: fields[0], stationary: true},
			{name: "Market", field: fields[1], width: 100},
			{name: "Last", field: fields[2], width: 80},
			{name: "Net. Chng", field: fields[3], width: 80},
			{name: "Industry", field: fields[4]}
		],
		staticDataRows: records,
		extensions: [new tr.CheckboxExtension()]
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```

<br><br><br>
