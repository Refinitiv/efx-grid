# Realtime Market Data with JET.Qoutes2

JET is a library that creates a communication channel between applications and container for retrieving data from the Refinitiv platform. JET will provide all the real-time data, so there's no need to initialize and use the `dataModel` property in the configuration object.

Please note that you can no longer use the row index to refer to row data anymore, as Grid will asynchronously receive the data and updates from JET or a server data provider. For reference, you must specify the row ID (string) for each row that is inserted into Grid's data table.

In the examples below, the RIC name is used as the row ID. You can then keep updating the same RIC on the correct row position using the row ID.

```live
<style>
	atlas-blotter {
		height: 250px;
	}
</style>
<input id="ric_in" placeholder="Enter RIC" value="CHF=">
<button id="insert_btn">Click To Insert</button>
<button id="insert_usd">USD</button>
<button id="insert_eur">EUR</button>
<button id="insert_jpy">JPY</button>
<br><br>
<atlas-blotter></atlas-blotter>
<script>
	JET = new tr.MockJET(); // Use Mock for illustrative purpose only

	document.getElementById('insert_btn').addEventListener("click", onClickInsertButton);
	document.getElementById('insert_usd').addEventListener("click", insertRic.bind(null, "USD="));
	document.getElementById('insert_eur').addEventListener("click", insertRic.bind(null, "EUR="));
	document.getElementById('insert_jpy').addEventListener("click", insertRic.bind(null, "JPY="));

	var configObj = {
		rowHighlight: true,
		rowSelection: true,
		columns: [
			{
				field: "X_RIC_NAME",
				tickColor: "CF_NETCHNG"
			},
			{
				field: "CF_NAME"
			},
			{
				field: "CF_LAST",
				tickColor: "CF_NETCHNG",
				blinking: true
			},
			{
				field: "CF_NETCHNG",
				tickColor: true,
				blinking: true
			},
			{
				field: "PCTCHNG",
				tickColor: "CF_NETCHNG",
				blinking: true
			}
		],
		rows: [
			{ ric: "EUR=" },
		]
	};

	var grid = document.getElementsByTagName("atlas-blotter")[0];
	grid.config = configObj;

	function onClickInsertButton(e) {
		var ric = document.getElementById("ric_in").value;
		insertRic(ric.toUpperCase());
	}

	function insertRic(ric) {
		grid.api.insertRow(ric, 0);
	}
</script>
```

To use `atlas-blotter` on your application and run it on the Eikon container follow the steps below.

1. Install `jet-api`, `jet-plugin-quotes2` and `jet-plugin-settings` by running the following commands.

```bash
npm install jet-api
npm install jet-plugin-quotes2
npm install jet-plugin-settings
```

2. create an `atlas-blotter` in your index.html

```html
<atlas-blotter id="blotter"></atlas-blotter>
```

3. Import the JET library and plugin to your application.

```js
import 'jet-api/dist/JET.min.js';
import 'jet-plugin-quotes2/src/jet-plugin-quotes2.js';
import 'jet-plugin-settings/src/jet-plugin-settings.js';
```

4. Initialize JET. `ID` is your application's ID.

```js
JET.init({
  ID: 'atlas-blotter-app'
});
```

5. Then you can configure `atlas-blotter` using `config` property.

```js
var grid = document.getElementById('blotter');
grid.config = {
    'columns': [
        { 'field': 'X_RIC_NAME' },
        { 'field': 'CF_ASK' },
        { 'field': 'CF_LAST' }
    ],
    'rows': [
        { 'ric': 'TRI.TO' },
        { 'ric': '.SETI' },
        { 'ric': '.SPX' },
        { 'ric': 'TRI.TO' },
        { 'ric': 'IBM' }
    ]
};
```

## Next steps

Read the [full documentation](https://amp.int.refinitiv.com/#/package/@elf/atlas-blotter) about `atlas-blotter` features.
