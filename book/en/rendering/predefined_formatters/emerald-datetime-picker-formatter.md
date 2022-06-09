# Emerald DateTime Picker Formatter

This formatter creates `emerald-datetime-picker` without margin. 

## Specific options

There are no specific options for this formatter.

## Example

```live(formatters)
<style>
	atlas-blotter {
		height: 320px;
	}
</style>
<atlas-blotter id="grid"></atlas-blotter>

<script>
	var fields = ["number_1", "date", "words"];
	var records = tr.DataGenerator.generateRecords(fields, 40);

	var configObj = {
		columns: [
			{ 
				title: "Column 1",
				field: fields[0],
				alignment: "center"
			},
			{
				title: "DateTimePicker",
				field: fields[1],
				binding: tr.EmeraldDateTimePickerFormatter.create()
			},
			{ 
				title: "Column 3",
				field: fields[2]
			}
		],
		staticDataRows: records
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```