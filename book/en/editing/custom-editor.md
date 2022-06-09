# Custom Cell Editor

Apart from the default [In-Cell Editing Extension](../extensions/tr-grid-in-cell-editing.md), a custom editor can be easily created by implementing an event `editorOpened`. The extension calls this event when the user has `double click` to cells.

In this situation, you need to specify options for the user to select. There are `yes`, `no` or `none`, which can be selected in `Column 3`. The code example below shows how to implement this.

## Example

```live
<style>
	atlas-blotter {
		height: 200px;
	}
</style>
<atlas-blotter id="grid"></atlas-blotter>

<script>
	var extension = new tr.InCellEditingExtension();
	var onEditorOpened = function (e) {
		var ed = e.editor;

		while (ed.lastChild) {
			ed.removeChild(ed.lastChild);
		}

		var elem;
		if (e.colIndex === 2) {
			elem = ed.selectButton;

			if (!elem) {
				elem = ed.selectButton = document.createElement('select');
				elem.style.width = "100%";
				elem.style.height = "100%";
				elem.style.maxHeight = "unset";

				var items = ['true', 'false', 'none'];
				for(var i = 0; i < items.length; ++i) {
					var opt = document.createElement('option');
					opt.textContent = opt.value = items[i];
					elem.appendChild(opt);
				}

				elem.addEventListener('change', function(e) {
					var tgt = e.currentTarget;
					var selectedItem = tgt.options[tgt.selectedIndex];
					var selectedValue = selectedItem.value;
					extension.commitText(selectedValue);
				});
			}

			elem.value = e["initialText"];
		} else {
			elem = e.inputElement;
		}

		ed.appendChild(elem);
	};

	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry", "boolean"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 6 });
	var configObj = {
		rowHighlight: true,
		columns: [
			{title: "Company", field: fields[0]},
			{title: "Market (editable)", field: fields[1], width: 150, editableContent: true},
			{title: "Watch (editable)", field: fields[5], with: 150, editableContent: true},
			{title: "Last", field: fields[2], width: 150},
			{title: "Net. Chng", field: fields[3], width: 80},
			{title: "Industry", field: fields[4]}
		],
		staticDataRows: records,
		inCellEditing: {
			editableTitle: false,
			editorOpened: onEditorOpened,
			balloonMode: true
		},
		extensions: [
			extension
		]
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```
