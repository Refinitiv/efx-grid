# Text Selection

Text selection has 2 scopes. It's grid scope and column scope. The default value of text selection is disabled, but you can enable it. If you enable it, users can select text in scope.

- The grid scope can enable by set textSelect property to `true` in configuration of [Grid](../apis/rt_grid/Grid.md)
- The column scope can enable by set textSelect property to `true` in configuration of [Columns](../apis/rt_grid/ColumnDefinition.md)

## Limitation with safari
- When you use Text selection with [Row Dragging](../extensions/tr-grid-row-dragging.html), Safari is unable to select text.
- Safari is unable to listening pointer events such as clicks, hovers, and so on. When you use [Custom Formatter](../rendering/custom-formatter.html) in a cell, it looks like this example.

### Example
If you use Safari, try clicking the button in column `Market` from the sample below. You won't be able to receive the click event.

```live
<atlas-blotter id="grid"></atlas-blotter>

<script>
	var fields = ["companyName", "market"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 10 });
	var buttonDisplay = {
	binding: function (e) {
		var cellData = e.cell;
		var buttonContent = document.createElement("button");
		var spanContent = document.createElement("span");
		buttonContent.addEventListener('click' , () => {
			alert(e.data);
		});
		spanContent.textContent = `${e.data}`;
		buttonContent.appendChild(spanContent);
		cellData.setContent(buttonContent);
		}
	};

	var configObj = {
		rowVirtualRendering: false,
		textSelect : true,
		columns: [
			{title: "Company", field: fields[0]},
			{title: "Market", field: fields[1], formatter: buttonDisplay , width: 120}
		],
		dataModel: {
			data: records
		},
		whenDefined: function(e) {
			var section = e.api.getSection('content');
			// section.setCellRowSpan(colIndex, rowIndex, spanSlot);
			section.setCellRowSpan(1, 0, 2);
			section.setCellRowSpan(4, 4, 3);
		}
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```

## Limitation with row virtualization
Text selection with row virtualization cannot select all data in the grid.
In the example below, the grid has text selection enabled and uses row virtualization.
When you try to select and copy text from the grid and paste it into a text area, you will see that not all data from the grid is obtained.
This is because row virtualization render only the rows that is visible in the grid's viewport. 
For example, if you have 50 rows of data, but the grid can only show the first 10 rows at a time, then when you try to select the text, it will only select the first 14 rows (10 rows + buffer rows). 
If you want to know about row virtualization in more detail, you can refer to the 'Understanding row virtualization' section in the [Custom Formatter](../rendering/custom-formatter.html) page.

### Example
```live
<style>
atlas-blotter {
	height: 300px;
}
textarea {
	height: 200px;
	width: 100%;
}
</style>
<atlas-blotter id="grid"></atlas-blotter>
<hr>
<textarea placeholder="Paste text here"></textarea>

<script>
		var fields = [
			"id",
			"companyName",
			"market",
			"CF_LAST",
			"CF_NETCHNG",
			"industry"
		];
		var records = tr.DataGenerator.generateRecords(fields, { numRows: 50, seed: 0 });
		var config = {
			textSelect: true,
			columns: [
				{
					field: fields[0],
					name: "ID"
				},
				{
					field: fields[1],
					name: "Company Name"
				},
				{
					field: fields[2],
					name: "Market"
				},
				{
					field: fields[3],
					name: "Last"
				},
				{
					field: fields[4],
					name: "Net. Chng"
				},
				{
					field: fields[5],
					name: "Industry"
				},
			],
			staticDataRows: records
		};

		var grid = document.getElementById("grid");
		grid.config = config;
		window.grid = grid;
</script>
```

## Copying all content in the grid without text selection

If you want to copy all the data in the grid, you can do it by focusing on the grid element and modifying the clipboard without text selection.
To do this, you can listen for the 'click' event on the grid element and call the focus method on the grid API to focus on the grid.
Then, you can listen for the 'copy' event on the grid element and modify the clipboard as shown in the example below.
### Example

```live

<style>
atlas-blotter {
	height: 300px;
}
textarea {
	height: 200px;
	width: 100%;
}
#feedback {
	color: green;
}
</style>
<div id="header"> Click for focus in the grid and copy text with "ctrl+c" inside grid, it will be write your clipboard with all data in the grid </div>
<div id="feedback"></div>
<atlas-blotter id="grid"></atlas-blotter>
<hr>
<textarea placeholder="Paste text here"></textarea>
<script>

		var fields = [
			"id",
			"companyName",
			"market",
			"CF_LAST",
			"CF_NETCHNG",
			"industry"
		];
		var records = tr.DataGenerator.generateRecords(fields, { numRows: 50, seed: 0 });
		var config = {
			columns: [
				{
					field: fields[0],
					name: "ID"
				},
				{
					field: fields[1],
					name: "Company Name"
				},
				{
					field: fields[2],
					name: "Market"
				},
				{
					field: fields[3],
					name: "Last"
				},
				{
					field: fields[4],
					name: "Net. Chng"
				},
				{
					field: fields[5],
					name: "Industry"
				},
			],
			staticDataRows: records
		};

		var grid = document.getElementById("grid");
		grid.config = config;
		window.grid = grid;
		
		grid.addEventListener("click", onGridClick);
		grid.addEventListener("copy", onGridCopy);

		function onGridClick(e) {
			// We need to listen for a click event on the grid to focus on it, which will allow us to track the copy event
			grid.api.focus();
		}

		function onGridCopy(e) {
			// When the grid is focused, the listen function will be triggered and we can provide data to be copied to the clipboard before the copy event occurs
			var allNames = grid.api.getColumnNames();

			var i;
			var colValues = allNames;

			var rows = grid.api.getMultipleRowData();

			// We can use the join method to map the rows of object data to a string, separating each row with a tab character. This can be useful when trying to paste the data into an Excel spreadsheet.
			var rowValues = rows.map(function (row) {
				return [
					row["id"],
					row["companyName"],
					row["market"],
					row["CF_LAST"],
					row["CF_NETCHNG"],
					row["industry"]
				].join("\t");
			});
			var text = colValues.join("\t") + "\n" + rowValues.join("\n");
			e.clipboardData.setData("text/plain", text);
			// Below is a feedback message that is displayed to the user when they have successfully copied text. The message will automatically clear after 3 seconds
			feedback.textContent = "Successfully copied text from the grid";
			setTimeout(function (e) {
				feedback.textContent = "";
			}, 3000);

			e.preventDefault();
		}

</script>
```
