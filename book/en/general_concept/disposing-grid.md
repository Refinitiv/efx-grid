# Disposing Grid

Grid holds a lot of resources and event listeners. Removing Grid from a document may not enough to clear all references to Grid, and thus memory occupied by Grid cannot be collected by the browser's garbage collector. If Grid is created and removed multiple times without refreshing the page, it could cause huge memory leak. It is very important to properly dispose existing Grid before creating a new instance of Grid.

To dispose grid, you can set `config` property to `null` as shown below:

```js
var grid = document.getElementById('grid_id');
grid.config = null; // Clear all resources held by Grid
```

> Note: after setting config to null, the element is still intact and in the same place in the document. You can then choose either creating a new grid with a new configuration or completely removing grid from the document.

## Replacing Grid

If you want to replace existing grid with a new one with the new configuration, setting `config` property to `null` is unnecessary. All existing resources held by Grid are still removed after the replacing.

```js
var grid = document.getElementById('grid_id');
grid.config = { // New configuration
	// ...
};
```

## Removing Grid from the document

If you intent not to use Grid anymore, then setting `config` property to `null` is required to prevent memory leak. Once `config` is set to `null`, you can remove the element like usual. 

```js
var grid = document.getElementById('grid_id');
grid.config = null;
grid.parentNode.removeChild(grid);
```

Temporary removing grid from the document is also an option, if you intent to reuse the same grid. Setting `config` property to `null` is not always necessary. It depends on the use cases in your application.

```js
grid = document.getElementById('grid_id');
// Temporarily remove grid from the document while keeping the configuration
grid.parentNode.removeChild(grid); 

// ...
// Some time later...
// ...

document.body.appendChild(grid); // Restore the same grid 
```