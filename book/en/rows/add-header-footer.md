# Adding Header and Footer Sections

Additional header and footer sections can be added, and are automatically frozen. Both methods (header and footer) return the new section (with the row count of one), which can then be populated programmatically.

## Example

```live
<style>
	html hr {
		margin: 5px;
	}
	atlas-blotter {
		height: 200px;
	}
</style>
<button id="header_btn">Add Header Section</button>
<button id="footer_btn">Add Footer Section</button>
<hr>
<atlas-blotter id="grid"></atlas-blotter>

<script>
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 6 });
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
	
	document.getElementById("header_btn").addEventListener("click", function() {
		var newSection = grid.api.addHeaderSection("My_Header");
		if(newSection) { // New section can only be created, if the name of the section is unique
			newSection.setCellColSpan(0, 0, 5);
			var cell = newSection.getCell(0, 0);
			cell.setContent("Header");
		}
	});
	
	document.getElementById("footer_btn").addEventListener("click", function() {
		var newSection = grid.api.addFooterSection("My_Footer");
		if(newSection) { // New section can only be created, if the name of the section is unique
			newSection.getCell(0, 0).setContent("Footer");
			newSection.getCell(1, 0).setContent("100");
			newSection.getCell(2, 0).setContent("200");
			newSection.getCell(3, 0).setContent("300");
			newSection.getCell(4, 0).setContent("400");
		}
	});
</script>
```
