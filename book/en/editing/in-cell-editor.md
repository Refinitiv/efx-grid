# In-Cell Editing

[In-Cell Editing Extension](../extensions/tr-grid-in-cell-editing.md) provides full editing abilities for your grid, including content and title editing in cell. It means data in each cell can be edited directly.

- To enable the editor at title section, set `editableTitle` to `true` in `inCellEditing` property
- Double click to open it
- The editing feature disables all columns by default. Set `editableContent` to `true` in a specific column to enable it.
- Use the API `openRowEditor` to edit all columns in a row

See more details at [In-Cell Editing Extension API Documentation](../extensions/tr-grid-in-cell-editing.md).