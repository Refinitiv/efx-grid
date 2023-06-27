# Custom Formatter

Since Grid utilizes a row virtualization technique, where the same cell is reused across different rows, you cannot simply just create any content and stop there. With row virtualization the custom content that you are trying to create or render will be reused in the different rows. So you have to create the content once and reuse it from the cache. Then, you need to bind data from Grid's data store to the content for each data update and scrolling.

The process for writing the formatter is usually something like the following code:

```js
var formatter = function(e) {
	var cell = e.cell;
	// Cache checking part (Reuse the same element)
	var element = cell.getContent();
	if (!element) {
		// Element creation part
		element = document.createElement('tag-name');

		// Apply common static settings (once per element creation) here
		// This could be attributes, styles, event listeners, and etc.
		element.style.color = "red";
	}

	// Element updating part (bind data to the UI element)
	element.value = e.data; // IMPORTANT

	// The below code is required. It does not post any significant performance impact
	cell.setContent(element);
};
```

## Defining the formatter

The formatter can be specified as a function on the `binding` property of the column configuration object.

```js
var configObj = {
	...
	columns: [
		{
			field: "Field 1", 
			binding: function(e) {
				e.cell.setContent(e.data);
			}
		},
		...
	],
	...
}
```

> For displaying simple text you do not need to create a custom formatter, as Grid already has simple text as its default formatter.

### Common form and structure

`binding` method will be called multiple times during user scrolling. The key here is to create a DOM element only once, reuse the same element and update the data every time the method is called. 

In general, the steps are as the following steps:
1. Check if the content already exists
2. If it exists, skip to the next step. If the content does not exist, create the content
3. Update the data to the content
4. Set the content to the cell

Below is the most common form of formatter. It is recommended to write most custom formatters in this form and structure. 

```js
var formatter = function(e){
	var cell = e.cell;
	var content = cell.getContent(); // Utilize cache
	if (!content) { // Check if cache exists
		content = document.createElement("xxx-xxxx");
		// Initialize element once
		var subContent = document.createElement("yyyy");
		subContent.style.color = "brown"; 
		
		var subContent2 = document.createElement("zz-zzz");
		content._myContent = subContent2;
		
		content.appendChild(subContent);
		content.appendChild(subContent2);
	}
	
	content._myContent.textContent = e.data; // IMPORTANT
	
	cell.setContent(content); // Always set the content to allow multiple types of content in the same column
};
```

### Setting styles in the formatter

When making any type of modification in the `binding` method, you must reset the value back because the same cell will be reused by different rows.

```js
var formatter = function(e){
	var cell = e.cell;
	var data = e.data;
	var content = cell.getContent();
	if (!content) {
		content = document.createElement("span");
		content.style.color = "salmon"; // Static styling
	}
	
	// Dynamic styling
	if(data > 0) {
		content.style.backgroundColor = "green";
	} else if(data < 0) {
		content.style.backgroundColor = "red";
	} else {
		content.style.backgroundColor = ""; // Reset the background
	}
	cell.setStyle("fontSize", Math.abs(data) > 10 ? "1.5em" : ""); // Styles can be applied to either the cell content or the cell itself.
	
	content.textContent = data;
	cell.setContent(content);
};
```

### Interactive content

States must be saved back to Grid after users make changes to the content. This is because Grid's row virtualization will reuse the same content during the scroll. Also note that user interaction does not happen during the data binding. User interaction is an asynchronous operation. So do not rely on closure variables or inline functions. 

Contexts and values may be a different. You will need to resolve the position or context at runtime by using [getRelativePosition()](../apis/rt_grid/Grid.md).

```js
var formatter = function(e){
	var cell = e.cell;
	var dropdown = cell.getContent();
	if (!dropdown) {
		dropdown = document.createElement("select");
		dropdown.addEventListener("change", dropdownChangeHandler); // Handle user interaction
		
		for(var i = 0; i < 3; ++i) {
			var option = document.createElement("option");
			option.value = i;
			option.textContent = "Value " + i;
			dropdown.appendChild(option);
		}
	}
	
	dropdown.selectedIndex = e.data;
	cell.setContent(dropdown);
};
var dropdownChangeHandler = function(e) {
	var dropdown = e.currentTarget;
	var selectedIndex = dropdown.selectedIndex;
	
	var pos = grid.api.getRelativePosition(e);
	var rowDef = grid.api.getRowDefinition(pos.rowIndex);
	
	rowDef.setData("Field XXXX", selectedIndex); // It is important to set the new data
};
```

> Find out more information about event handling [here](formatter-event-handling).

### Content with multiple states

Content with multiple states (for example, colors, disabled and invalid states) must have all states stored in the Grid. You can have as many columns' data or fields as we want in order to represent the content. 

The example below shows input with multiple states depending on the data on other fields.

```js
var formatter = function(e){
	var cell = e.cell;
	var rowData = e.rowData;
	var inputElem = cell.getContent();
	if (!inputElem) {
		inputElem = document.createElement("input");
	}
	
	var state1 = rowData["someField"];
	if(state1) {
		inputElem.setAttribute("disabled", "");
	} else {
		inputElem.removeAttribute("disabled");
	}
	
	var state2 = rowData["anotherField"];
	if(state2) {
		inputElem.setAttribute("error", "");
	} else {
		inputElem.removeAttribute("error");
	}
	
	inputElem.value = e.data;
	cell.setContent(inputElem);
};
```

> Note: **data is completely independent from column UIs**. This means you do not have to create a column for data to exist. Data can be added or removed separately from Grid's columns.

## Formatter/binding method parameters

Event argument `binding` method has the following parameter list:
* *data* : The data value corresponding to the field and row of the cell
* *cell* : The cell object that provides access to the DOM element of the cell
* *rowIndex* : Index of the current row of the cell being rendered
* *rowDef* : The row definition object
* *rowData* : The data object that stores data of the entire row
* *colIndex* : Index of the current column of the cell being rendered
* *secton* : The section object hosting the current column

## Understanding row virtualization

The row virtualization technique is **different from the lazy initialization** technique, which creates more content as users scroll down through all the available rows. For example, suppose you have 10,000 rows and Grid's view port can show 20 rows. With row virtualization Grid will create content for around 24 rows (20 rows + buffer rows) throughout Grid's life cycle. With lazy initialization Grid will create content for 24 rows at first load. As users scroll down through the available rows, more and more content will be created. Eventually, all content will be created for all 10,000 rows when using the lazy initialization technique.

A web page will get slower as more content/elements are put into the DOM tree. So it's better to reuse the same element whenever possible.

## Examples

Click the green button on the bottom right corner of the live example to see the code.

```live
<style>
	efx-grid {
		height: 200px;
	}
</style>
<efx-grid id="grid"></efx-grid>

<script>
	var rangeBarFormatter = function(e) {
		var cell = e.cell;
		var bar = cell.getContent();	// Utilize caching
		if(!bar) {
			bar = document.createElement("div");
			bar.style.height = "8px";
			bar.style.position = "relative";
			bar.style.backgroundColor = "#EA7D22";
			
			var indi = bar.indi = document.createElement("div");
			indi.style.position = "absolute";
			indi.style.top = "0";
			indi.style.left = "10px";
			indi.style.width = "3px";
			indi.style.height = "100%";
			indi.style.backgroundColor = "white";
			bar.appendChild(indi);
		}
		cell.setContent(bar);
		bar.indi.style.left = (e.data * 100)+"%";
	};

	var capitalizer = function(e) {
		e.cell.setContent(e.data.toString().toUpperCase());
	};

	var yearDisplay = function(e) {
		var cell = e.cell;
		cell.setStyle("color", "black");
		cell.setStyle("background-color", "#EA7D22");
		cell.setContent("Year " + e.data.getFullYear());
	};

	var fields = ["companyName", "market", "CF_LAST", "float_1", "ISODate"];
	var records = DataGenerator.generateRecords(fields, { numRows: 40 });
	var configObj = {
		columns: [
			{title: "Company", field: fields[0], binding: capitalizer},
			{title: "Market", field: fields[1], width: 100},
			{title: "Last", field: fields[2], width: 80},
			{title: "Buy/Sell", field: fields[3], width: 100, binding: rangeBarFormatter},
			{title: "IPO", field: fields[4], alienment: "center", binding: yearDisplay}
		],
		staticDataRows: records
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```

# Formatting custom content with Text Formatting Extension

When using Text Formatting Extension, by default, custom content will be overwritten due to the need for rendering a formatted text by the extension. To format the text inside the custom content and avoid the overriding, you will need to instruct the extension on how and where to do the formatting. See [this page](../extensions/tr-grid-textformatting.md) for more information.

# Writing a good formatter

Be mindful that the `binding` method will be executed repeatedly and multiple times during data updates and scrolling. Performance is crucial, so you should write the code with caution. See the following guidelines for writing a good formatter.

## Use predefined formatters

The most common formatters are already prewritten for you. Predefined formatters are optimized and easy to use. See [this page for more details](predefined-formatter.md).

## Avoid using innerHTML and innerText

**innerHTML** and **innerText** from native elements involve text parsing and element creation, both of which are computationally expensive. You can improve performance by avoiding using them.

```js
function binding1(e) {
	var content = document.createElement("div"); // Unneccessary creation as it will be called and created multiple times
	content.innerHTML = "<span>" + e.data + "</span><span>2</span>"; // Slow due to text parsing and element creations
	
	e.cell.setContent(content);
}

// The above function can be re-writen as the following function
function binding2(e) {
	var cell = e.cell;
	var content = cell.getContent();
	if(!content) {
		content = document.createElement("div");
		var span1 = content._span1 = document.createElement("span"); 
		var span2 = document.createElement("span");
		span2.textContent = 2;
		
		content.appendChild(span1);
		content.appendChild(span2);
	}
	content._span1.textContent = e.data;
	cell.setContent(content);
}
```
 
## Avoid creating an element for simple text

`setContent` method is already optimized for simple text.

```js
function binding1(e) {
	var content = document.createElement("div"); // Unneccessary creation
	content.textContent = e.data + " text";
	
	e.cell.setContent(content);
}

// The above function can be re-writen as the following function
function binding2(e) {
	e.cell.setContent(e.data + " text");
}
```

## Reuse the same content to avoid element creation

Bind method will be executed repeatedly and multiple times during data update and scrolling. Minimize element creation by using cache.

```js
function binding1(e) {
	var content = document.createElement("input"); // Slow
	content.value = e.data;
	e.cell.setContent(content);
}

// The above function can be re-writen as the following function
function binding2(e) {
	var cell = e.cell;
	var content = cell.getContent(); // Get previous content
	if(!content) {
		content = document.createElement("input");
	}
	content.value = e.data;
	cell.setContent(content);
}
```

## Store element in a variable for easy access

For complex structure content, it is faster and easier to use a variable for referencing rather than navigating through a DOM tree.

```js
function binding1(e) {
	var cell = e.cell;
	var content = cell.getContent();
	if(!content) {
		content = document.createElement("div");
		var span1 = document.createElement("span");
		var span2 = document.createElement("span");
		
		content.appendChild(span1);
		content.appendChild(span2);
	}
	cell.setContent(content);
	var spans = content.getElementsByTagName("span"); // Slow
	spans[0].textContent = e.data % 5;
	spans[1].textContent = e.data % 3;
}

// The above function can be re-writen as the following function
function binding2(e) {
	var cell = e.cell;
	var content = cell.getContent();
	if(!content) {
		content = document.createElement("div");
		var span1 = content._span1 = document.createElement("span");
		var span2 = content._span2 = document.createElement("span");
		
		content.appendChild(span1);
		content.appendChild(span2);
	}
	content._span1.textContent = e.data % 5;
	content._span2.textContent = e.data % 3;
	cell.setContent(content);
}
```

> Note: Cell can contain only one top level node/element (such as, single content). But a content element can have multiple nested elements.

## Use RowDefinition object for asynchronous operation

When dealing with asynchronous operations such as server request and response, it is important to use the correct context and data. Row index, cell element, and page can all be changed during the waiting time. Sorting, filtering, grouping, and pagination can also affect row order. So the most reliable way to identify Grid's row is to use RowDefinition object. 

```js
function binding1(e) {
	var cell = e.cell;
	var content = cell.getContent();
	if(!content) {
		content = document.createElement("button");
		content.addEventListener("click", onRequestingData);
	}
	cell.setContent(content);
}

function onRequestingData(e) {
	var pos = grid.api.getRelativePosition(e);
	var rowDef = grid.api.getRowDefinition(pos.rowIndex);
	
	requestServerData({}, onServerResponse.bind(null, rowDef));
}

function onServerResponse(rowDef, resp) {
	// do something
}
```
