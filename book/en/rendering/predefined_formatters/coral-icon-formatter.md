# Coral Icon Formatter

This formatter creates a coral-icon from the column's field by default.

> A full list of available icons can be found [here](https://elf.int.refinitiv.com/styles/icons.html). 

## Specific options

| Name   | Type             | Attributes | Description                                               |
| ------ | ---------------- | ---------- | --------------------------------------------------------- |
| icon   | string or object | optional   | Icon shown in the cell                                    |
| size   | string or number | optional   | Size of an icon in pixels                                 |

## Example

```live(formatters)
<style>
	atlas-blotter {
		height: 320px;
	}
</style>
<atlas-blotter id="grid"></atlas-blotter>

<script>
	var icons = ["up", "down", "phone", "calendar", "flame"];
	var fields = ["icon_1", "icon_2", "icon_3"];
	var records = new Array(40);
	for(var i = 0; i < 40; ++i) {
		var record = records[i] = {};
		record[fields[0]] = i;
		record[fields[1]] = i % 5;
		record[fields[2]] = icons[(i + 3) % 5];
	}
	var configObj = {
		sorting: {
			sortableColumns: true
		},
		columns: [
			{
				name: "Static Icon",
				alignment: "c",
				field: fields[0],
				binding: tr.CoralIconFormatter.create({
					icon: "up",
				})
			},
			{
				name: "Dynamic Icon With Mapper",
				field: fields[1],
				alignment: "c",
				binding: tr.CoralIconFormatter.create({
					icon: {
						0: icons[0],
						1: icons[1],
						2: icons[2],
						3: icons[3],
						4: icons[4]
					},
					size: 20
				})
			},
			{
				name: "Dynamic Icon",
				field: fields[2],
				alignment: "c",
				binding: tr.CoralIconFormatter.create()
			},
		],
		staticDataRows: records
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```

### Static icon

```js
var configObj = {
	columns: [
		{
			name: "Icon",
			field: "someField",
			binding: CoralIconFormatter.create({
				icon: "up",
				size: 18
			})
		}
	]
}
```

### Mapping icon from field (field as icon name)

```js
var configObj = {
	columns: [
		{
			name: "Icon",
			field: "someField",
			binding: CoralIconFormatter.create()
		}
	]
}
```

### Mapping an icon from an object (field as key or index)

```js
var configObj = {
	columns: [
		{
			name: "Icon",
			field: "someField",
			binding: CoralIconFormatter.create({
				icon: {
					0: "up",
					1: "down",
					2: "phone",
					3: "calendar",
					4: "flame",
				},
			})
		}
	]
}
```