# Event Listeners

Since Grid is element, you can directly listen for events from it. It's recommended to listen for native events and then use the `getRelativePosition()` method to resolve which cell, area, or position are the target of the event. This is because Grid does not render every cell, and the cells are being reused across different rows. So it's important to resolve the position inside the event handler (such as, runtime resolving). You can use any native event and resolve the position by using the `getRelativePosition()` method.

## Click

For example, if you want to do something on the click event you could do the following:

```js
var grid = document.getElementById('grid_id');

grid.addEventListener("click", function(e){ // Notice that api property is not required here
	var pos = grid.api.getRelativePosition(e); // Resolve the position at runtime
	
	console.log(pos.sectionType, pos.colIndex, pos.rowIndex); // pos object contains a lot of information
});
```

## Right click

```js
var grid = document.getElementById('grid_id');

grid.addEventListener("contextmenu", function(e){ // Notice that api property is not required here
	var pos = grid.api.getRelativePosition(e);
	
	console.log(pos.sectionType, pos.colIndex, pos.rowIndex);
});
```

## Mouse move

```js
var grid = document.getElementById('grid_id');

grid.addEventListener("mousemove", function(e){ // Notice that api property is not required here
	var pos = grid.api.getRelativePosition(e);
	
	console.log(pos.sectionType, pos.colIndex, pos.rowIndex);
});
```

> Note: Grid internally divides itself into several sections. The top section is called `title` and the lower part is called `content`. So the `sectionType` from the position object can be one of the following values: `title`, `content`, `footer`.
