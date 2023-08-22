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
				name: "Column 1",
				field: fields[0],
				alignment: "center"
			},
			{
				name: "DateTimePicker",
				field: fields[1],
				binding: tr.EmeraldDateTimePickerFormatter.create()
			},
			{ 
				name: "Column 3",
				field: fields[2]
			}
		],
		staticDataRows: records
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```