# Event Listeners

Since Grid is element, you can directly listen for events from it. It's recommended to listen for native events and then use the `getRelativePosition()` method to resolve which cell, area, or position are the target of the event. This is because Grid does not render every cell, and the cells are being reused across different rows. So it's important to resolve the position inside the event handler (such as, runtime resolving). You can use any native event and resolve the position by using the `getRelativePosition()` method.

## Click

If you want to do something on the click event, you could do the following code snippet:

```js
var grid = document.getElementById("grid_id");

grid.addEventListener("click", function(e){ // Notice that api property is not required here
	var pos = grid.api.getRelativePosition(e); // Resolve the position at runtime
	
	console.log(pos.sectionType, pos.colIndex, pos.rowIndex); // pos object contains a lot of information
});
```

## Right click

Simply use native `contextmenu` event to detect right click on the grid element. Use `preventDefault()` method to prevent default context menu behaviors from triggering.

## Mouse events

The common native events, such as `mousemove`, `mouseup`, and `mousedown`, can be listened on the grid element.

> Note: Grid internally divides itself into several sections. The top section is called `title` and the lower part is called `content`. So the `sectionType` from the position object can be one of the following values: `title`, `content`, `footer`.

## Listening to native events example

```live
<style>
	html hr {
		margin: 5px;
	}
	textarea {
		width: 100%;
		height: 80px;
		font-size: 20px;
	}
	atlas-blotter {
		height: 300px;
	}
</style>
<textarea id="msg_ta"></textarea>
<hr>
<atlas-blotter></atlas-blotter>

<script>
	var fields = ["id", "companyName", "market", "CF_NETCHNG", "CF_VOLUME"];
	var columnNames = ["Id", "Company Name", "Market", "Net Chng.", "Volume"];
	var columns = fields.map(function(f, idx) {
		return {
			field: f,
			name: columnNames[idx]
		}
	});
	var records = tr.DataGenerator.generateRecords(fields, {seed: 1, rowCount: 20});

	var configObj = {
		columns: columns,
		staticDataRows: records
	};
	var grid = document.getElementsByTagName("atlas-blotter")[0];
	grid.config = configObj;
	
	grid.addEventListener("click", function(e) {
		var pos = grid.api.getRelativePosition(e);
		var ary = [
			"Clicked",
			"Section: " + pos.sectionType,
			"Col Idx: " + pos.colIndex,
			"Row Idx: " + pos.rowIndex
		];
		alert(ary.join("\n"));
	});
	grid.addEventListener("contextmenu", function(e) {
		var pos = grid.api.getRelativePosition(e);
		var ary = [
			"Right clicked",
			"Section: " + pos.sectionType,
			"Col Idx: " + pos.colIndex,
			"Row Idx: " + pos.rowIndex
		];
		alert(ary.join("\n"));
		
		e.preventDefault();
		e.stopPropagation();
	});
	grid.addEventListener("mousemove", function(e) {
		var pos = grid.api.getRelativePosition(e);
		var ary = [
			"Section: " + pos.sectionType,
			"Col Idx: " + pos.colIndex,
			"Row Idx: " + pos.rowIndex
		];
		msg_ta.value = ary.join("\n");
	});
</script>
```

# Getting a cell and its content

With row virtualization and column virtualization, Grid only renders cells that are on the current view. So, only cells and their content that are in range of the current view can be retrieved. To retrieve cell content, use `getCoreGrid` to get core grid instance first. Then, use `getCell(section, colIndex, rowIndex)` from the core to get cell object. Finally, use `getContent()` from the cell object to get the cell content. If you want all the data content (not the content elements), please use grid [data related APIs](../data/read.md) instead.

If you are inside an event listener, the corresponding cell object is already provided from the returned value of `getRelativePosition` method. You can then get cell content from the cell object using `getContent()` method. Alternatively, you can use [composedPath](https://developer.mozilla.org/en-US/docs/Web/API/Event/composedPath) method from native event argument to get a path to actual target element.

> Note: Grid is a custom element which encapusulate all of its content under its shadow root. Hence, `target` property from the native Event argument will always return Grid element and not actual target element inside the grid.

## Getting cell content example

```live
<style>
	html hr {
		margin: 5px;
	}
	textarea {
		width: 100%;
		height: 30px;
		font-size: 20px;
	}
	input[type="number"] {
		width: 60px;
	}
	i:empty {
		padding-left: 10px;
	}
	atlas-blotter {
		height: 300px;
	}
</style>
<div>
	<button id="get_btn">Get cell content</button>
	<label for="col_in">Column index:</label>
	<input id="col_in" value="2" type="number">
	<i></i>
	<label for="row_in">Row index:</label>
	<input id="row_in" value="2" type="number">
</div>
<hr>
<textarea id="msg_ta"></textarea>
<hr>
<atlas-blotter></atlas-blotter>

<script>
	get_btn.addEventListener("click", function(e) {
		var colIndex = +col_in.value || 0;
		var rowIndex = +row_in.value || 0;
		
		var core = grid.api.getCoreGrid();
		var cell = core.getCell("content", colIndex, rowIndex);
		var cellContent = cell ? cell.getContent() : null;
		var ary = [
			"Getting cell: " + colIndex + ", " + rowIndex,
			"Cell content: " + (cellContent ? cellContent.textContent : "")
		];
		alert(ary.join("\n"));
	});

	var fields = ["id", "companyName", "market", "CF_NETCHNG", "CF_VOLUME"];
	var columnNames = ["Id", "Company Name", "Market", "Net Chng.", "Volume"];
	var columns = fields.map(function(f, idx) {
		return {
			field: f,
			name: columnNames[idx]
		}
	});
	var records = tr.DataGenerator.generateRecords(fields, {seed: 1, rowCount: 20});

	var configObj = {
		columns: columns,
		staticDataRows: records
	};
	var grid = document.getElementsByTagName("atlas-blotter")[0];
	grid.config = configObj;
	
	grid.addEventListener("mousemove", function(e) {
		var pos = grid.api.getRelativePosition(e);
		var cell = pos.cell;
		var cellContent = cell ? cell.getContent() : null;
		msg_ta.value = cellContent ? cellContent.textContent : "null";
	});
</script>
```

<br>
<br>
<br>
