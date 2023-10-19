# Custom header/title

You can display anything you want on grid's column header/title by using `headerBinding`. The binding works in similar way to content binding, where the method will be executed each time grid's header gets updated. `columnDef` is supplied in the event argument to provide additional information about the column header being rendered. 

```js
var customFormatter = function(e){
	e.cell.setContent("Custom " + e.columnDef.getName());
}

var configObj = {
	// Other grid's config
	columns: [
		{name: "Column 1", field: "intCol", headerBinding: customFormatter},
	]
}
grid.config = configObj;
```

## Additional element example

```live
<efx-grid id="grid"></efx-grid>

<script>
var fields = ["id", "companyName", "market", "CF_LAST", "PCTCHNG"];
var columns = fields.map(function (f) {
	return {
		field: f
	};
});

columns[0].headerBinding = function headerWithLink(e) {
	var cell = e.cell;
	var content = cell.getContent();
	if(!content || !content._myHeaderWithLink) {
		content = document.createElement("div");
		content._myHeaderWithLink = true;

		var span = content._span = document.createElement("span");
		span.style.marginRight = "5px";
		var link = content._link = document.createElement("ef-icon");
		link.icon = "link";
		link.addEventListener("click", function(arg) {
			arg.stopPropagation();
			alert("Icon clicked");
		});
		content.appendChild(span);
		content.appendChild(link);
	}

	content._span.textContent = e.columnDef.getName();
	cell.setContent(content);
};

columns[2].headerBinding = function headerWithCheckbox(e) {
	var cell = e.cell;
	var content = cell.getContent();
	if(!content || !content._myHeaderWithCheckbox) {
		content = document.createElement("div");
		content._myHeaderWithCheckbox = true;

		var span = content._span = document.createElement("span");
		span.style.marginRight = "5px";
		// You will need to import the checkbox theme files for this to be shown
		var chkbox = content._chkbox = document.createElement("ef-checkbox");
		chkbox.addEventListener("checked-changed", function(arg) {
			alert("Checkbox changed");
		});
		chkbox.addEventListener("click", function(arg) {
			arg.stopPropagation();
		});
		content.appendChild(span);
		content.appendChild(chkbox);
	}

	content._span.textContent = e.columnDef.getName();
	cell.setContent(content);
};

var ROW_COUNT = 10;
var records = DataGenerator.generateRecords(fields, {
	seed: 0,
	numRows: ROW_COUNT
});

var configObj = {
	columns: columns,
	staticDataRows: records
};

var grid = document.getElementById("grid");
grid.config = configObj;
</script>
```

## Floating element example

```live
<efx-grid id="grid"></efx-grid>

<script>
	function TitleColorTagFormatter(color, e) {
		var tag = document.createElement('div');
		tag.style.width = "0px";
		tag.style.height = "0px";
		tag.style.borderStyle = "solid";
		tag.style.borderWidth = "0 15px 15px 0";
		tag.style.position = "absolute";
		tag.style.top = "0px";
		tag.style.right = "0px";
		tag.style.borderColor = "transparent "+ color +" transparent transparent";
		
		e.cell.addContent(tag);
		e.cell.setContent(e.columnDef.getName());
	}
	
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = DataGenerator.generateRecords(fields, { numRows: 6 });
	var configObj = {
		columns: [
			{
				name: "Company", field: fields[0], 
				headerBinding: TitleColorTagFormatter.bind(null, "#ff9933")
			},
			{
				name: "Market", field: fields[1], width: 100, 
				headerBinding: TitleColorTagFormatter.bind(null, "#f5475b")
				},
			{
				name: "Last", field: fields[2], width: 80,
				headerBinding: TitleColorTagFormatter.bind(null, "#39c46e")
			},
			{
				name: "Net. Chng", field: fields[3], width: 80,
				headerBinding: TitleColorTagFormatter.bind(null, "#46a0f0")
			},
			{
				name: "Industry", field: fields[4],
				headerBinding: TitleColorTagFormatter.bind(null, "#2fb4c8")
			}
		],
		staticDataRows: records
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```
