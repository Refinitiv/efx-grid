# Text Selection

Text selection has 2 scopes. It's grid scope and column scope. The default value of text selection is disabled, but you can enable it. If you enable it, users can select text in scope.

- The grid scope can enable by set textSelect property to `true` in configuration of [Grid](../apis/rt_grid/Grid.md)
- The column scope can enable by set textSelect property to `true` in configuration of [Columns](../apis/rt_grid/ColumnDefinition.md)

## Limitation

- When you use Text selection with [Row Dragging](../extensions/tr-grid-row-dragging.html), Safari is unable to select text.
- Safari is unable to listening pointer events such as clicks, hovers, and so on. When you use [Custom Formatter](../rendering/custom-formatter.html) in a cell, it looks like this example.

### Example
If you use Safari, try clicking the button in column `Market` from the sample below. You won't be able to receive the click event.

```live
<atlas-blotter id="grid"></atlas-blotter>

<script>
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
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

