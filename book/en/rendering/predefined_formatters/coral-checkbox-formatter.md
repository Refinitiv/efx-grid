# Coral Checkbox Formatter

This formatter creates a checkbox which will be unchecked by default.

### Using ELF's checkbox

This extension is only for using [coral-checkbox](https://elf.int.refinitiv.com/elements/coral-checkbox.html) and the following dependency is required:

```bash
npm install @elf/coral-checkbox
```

Then import this required dependencies to your project `index.js` file.

```jsx
import "@elf/coral-checkbox";
import "@elf/elf-theme-halo/dark/coral-checkbox"; // Can be any theme.
```

## Example

```live(formatters)
<style>
	atlas-blotter {
		height: 320px;
	}
</style>
<atlas-blotter id="grid"></atlas-blotter>

<script>
	var fields = ["word"];
	var records = tr.DataGenerator.generateRecords(fields, { seed: 1, numRows: 100 });

	var configObj = {
		sorting: {
			sortableColumns: true
		},
		columns: [
			{
				alignment: "c",
				field: "myCheckBoxState",
				width: 34,
				binding: tr.CoralCheckboxFormatter.create({
					events: {
						"click": function(e) {
							console.log("clicked");
						}
					}
				})
			},
			{
				title: "Grid Checkbox State",
				field: "myCheckBoxState",
				alignment: "c",
			},
			{
				title: "Text",
				field: fields[0],
				alignment: "c",
			}
		],
		staticDataRows: records
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```

### Checkbox with a label

```live(formatters)
<style>
	atlas-blotter {
		height: 320px;
	}
</style>
<atlas-blotter id="grid"></atlas-blotter>

<script>
	var fields = ["word", "words"];
	var records = tr.DataGenerator.generateRecords(fields, { seed: 1, numRows: 30 });

	var configObj = {
		sorting: {
			sortableColumns: true
		},
		columns: [
			{
				alignment: "l",
				field: "myCheckBoxState",
				width: 150,
				binding: tr.CoralCheckboxFormatter.create({
					events: {
						"click": function(e) {
							console.log("clicked");
						}
					},
					labelField: "word"
				})
			},
			{
				title: "Grid Checkbox State",
				field: "myCheckBoxState",
				alignment: "c",
			},
			{
				title: "Text",
				field: fields[1],
				alignment: "c",
			}
		],
		staticDataRows: records
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```
