## Column Groups

This is a deprecated built-in feature and superceded by [Column Grouping Extension](./tr-grid-column-grouping.md)

```live
<atlas-blotter id="grid"></atlas-blotter>

<script>
var records = [
	{intCol: 1, strCol: 'CLUCK & DUCK WINGS', floatCol: 5.5, floatCol2: 7.24},
	{intCol: 2, strCol: 'BAKED CHEDDAR MUSHROOMS', floatCol: 7, floatCol2: 9.21},
	{intCol: 3, strCol: 'RIBEYE 16OZ', floatCol: 25, floatCol2: 32.9},
	{intCol: 4, strCol: 'SLOW COOKED BONELESS BEEF RIB', floatCol: 20, floatCol2: 26.32},
	{intCol: 5, strCol: 'CLASSIC CRÈME BRÛLÉE (V)', floatCol: 5.75, floatCol2: 7.57}
];

var grid = document.getElementById('grid');
grid.config = {
	columnReorder: true,
	sorting: {
		sortableColumns: true
	},
	columns: [
		{ id: 'c1', title: 'No.', field: 'intCol', width: 70 },
		{ id: 'c2', title: 'Name', field: 'strCol', minWidth: 550 },
		{ id: 'c3', title: '£', field: 'floatCol', alignment: 'center', columnGroup: 'price' },
		{ id: 'c4', title: '$', field: 'floatCol2', alignment: 'center', columnGroup: 'price' }
	],
	columnGroups: [
		{ id: 'price', title: 'Price', alignment: 'center' }
	],
	staticDataRows: records
};
</script>

<style>
	atlas-blotter {
		height: 240px;
	}
</style>
```

### Installation and how to import to a project

Installation examples and details of how to import the extension to a project are available on the [Overview](README.md) page.
