# Duplex Emerald DateTime Picker Formatter

This formatter creates `emerald-datatime-picker` in duplex mode without margin.

## Specific options

| Name   | Type   | Attributes | Description    |
| ------ | ------ | ---------- | -------------- |
| from   | String | required   | Field          |
| to     | String | required   | Field          |

## Example

```live(formatters)
<style>
	atlas-blotter {
		height: 320px;
	}
</style>
<atlas-blotter id="grid"></atlas-blotter>

<script>
	var generatingfields = ["number_1", "date"];
	var dataRows = tr.DataGenerator.generate(generatingfields, 40);
	dataRows = dataRows.map(function(row) {
	  return [row[0], row[1], new Date(row[1].getTime() + 1209600000)];
	});

	var fields = ["number", "fromDate", "toDate"];
	var configObj = {
		columns: [
			{
				title: "Column 1",
				field: fields[0],
				alignment: "center"
			},
			{
				title: "DateTimePicker",
				field: "date",
				binding: tr.DuplexEmeraldDateTimePickerFormatter.create({
					from: fields[1],
					to: fields[2]
				})
			}
		],
		dataModel: {
			fields: fields,
			format: "array",
			data: dataRows
		}
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```