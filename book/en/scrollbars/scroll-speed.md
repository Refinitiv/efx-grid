# Scroll Speed

Generally, Grid will contain a large number of rows. Grid elements could block page scrolling due to slow native wheel scrolling speed and long scroll distance. So, by default, Grid's wheel scroll speed will increase exponentially once the content height exceeds a certain threshold. This behavior may not be wanted, so to return to the native wheel default behavior enable `linearWheelScrolling`.

You can also force scrolling to move for the whole row by using the `stepScroll` property.

## Example

```live
<style>
	atlas-blotter {
		height: 400px;
	}
</style>
<atlas-blotter id="grid"></atlas-blotter>
<script>
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry", "id"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 1000 });
	var configObj = {
		linearWheelScrolling: true,
		stepScroll: true,
		columns: [
		  {title: "ID", field: fields[5], width: 40},
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
