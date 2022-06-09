# EF Icon Formatter

This formatter creates a [ef-icon](https://ui.refinitiv.com/elements/icon) from the column's field by default.

> A full list of available icons can be found [here](https://ui.refinitiv.com/elements/icon). 

## Specific options

| Name   | Type             | Attributes | Description                                               |
| ------ | ---------------- | ---------- | --------------------------------------------------------- |
| icon   | string or object | optional   | Icon shown in the cell                                    |
| size   | string or number | optional   | Size of an icon in pixels                                 |

## Example

```live
<style>
	efx-grid {
		height: 320px;
	}
</style>
<efx-grid id="grid"></efx-grid>

<script>
	var icons = ["3d-surface", "api", "eye", "conference", "flame"];
	DataGenerator.addFieldInfo("number", { type: "number", min: 0, max: 5	});
	DataGenerator.addFieldInfo("icon", { type: "set",	members: icons	});
	var fields = ["number", "icon"];
	var records = DataGenerator.generateRecords(fields, { seed: 1, numRows: 20 });

	var configObj = {
		columns: [
			{
				name: "Static Icon",
				alignment: "c",
				binding: EFIconFormatter.create({
					icon: "3d-surface",
				})
			},
			{
				name: "Dynamic Icon With Mapper",
				field: fields[0],
				sort: fields[0],
				alignment: "c",
				binding: EFIconFormatter.create({
					icon: {
						0: "up",
						1: "down",
						2: "left",
						3: "right",
						4: "line"
					},
					size: 20
				})
			},
			{
				name: "Dynamic Icon",
				field: fields[1],
				sort: fields[1],
				alignment: "c",
				binding: EFIconFormatter.create()
			}
		],
		staticDataRows: records
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```
