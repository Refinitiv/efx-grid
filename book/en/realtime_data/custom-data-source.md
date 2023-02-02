# Custom Data Source

In some case, you might want to update Atlas Blotter's data with your own data feed. The Grid team has exposed the APIs for these scenarios.

Here is an example of what the data provider might looks like:

```js
/**
 * NOTE: DO NOT COPY AND PASTE THIS CODE
 */ 
var MyBasicProvider = {
	subscribeSymbol(symbol) {
		// When a new row is added to a Grid, we will subscribe that symbol from the datasource.
	},
	unsubscribeSymbol(symbol) {
		// When row is removed from a Grid, we will stop subscribing that symbol from the datasource.
	},
	setDataChangeHandler(callback) {
		// Each time the datasource has some new updates, we will need to tell Grid to update its data row.
	}
}
```

Once we have our custom data provider, then you will have to plug it into the Grid. 

Take a look at the next example:

```js
var grid = document.getElementById("grid_id");
grid.addEventListener("configured", function(e) {
	var api = e.detail.api;
	api.listen("ricAdded", onRicAdded);
	api.listen("ricRemoved", onRicRemoved);
});

function onRicAdded(e) {
	var symbols = e.addedRics;
	for (var i = 0; i < symbols.length; i++) {
		MyBasicProvider.subscribeSymbol(symbols[i]);
	}
}
function onRicRemoved(e) {
	var symbols = e.addedRics;
	for (var i = 0; i < symbols.length; i++) {
		MyBasicProvider.unsubscribeSymbol(symbols[i]);
	}
}
```

In the above example, you are able to add a subscription to each symbol. Next you need to set the Grid's data according to the data received from the datasource.

```js
function onDataChanged(symbol, value) {
	grid.api.setRicData(symbol, value);
}

MyBasicProvider.setDataChangeHandler(onDataChanged);
```

Now all the data that is updated from the datasource will also be updated to the Grid.

## Live demo

```live
<style>
	atlas-blotter {
		height: 250px;
	}
</style>
<atlas-blotter></atlas-blotter>
<script>
	var dataGen = tr.DataGenerator;
	var Toolkit = tr.MockRTK;
	Toolkit.init({ ID: 'rtk-atlas-blotter' }, ['Quotes', 'Data']).then(onInit);

	/**
	* NOTE: DO NOT COPY AND PASTE THIS CODE
	* 
	* This is only an example of a simple data provider. In real world scenario, you would need to implement the logics base on your requirements.
	* For example:
	* 1. Define an endpoint to a real domain name.
	* 2. Store a data base on your need.
	* 3. Implement only neccessary methods.
	* 4, Remove any timer and setInterval.
	*/ 
	var MyBasicProvider = {
		_fields: {},
		_ricInterval: {},
		addField(field) {
			switch(field) { // Filter out non custom field
				case "X_RIC_NAME": return;
				case "CF_ASK": return;
				case "CF_LAST": return;
				default: break;
			}
			this._fields[field] = 1;
		},
		removeField(field) {
			delete this._fields[field];
		},
		subscribe(rics, callback) {
			for (var ric of rics) {
				this._ricInterval[ric] = setInterval(this.onSubscribeUpdate.bind(this, ric, callback), 1500);
			}
		},
		onSubscribeUpdate(ric, callback) {
			var res = {
				ric: ric,
				data: dataGen.generateRecord(Object.keys(this._fields))
			};
			callback(res);
		},
		unsubscribe(rics) {
			for (var ric of rics) {
				clearInterval(this._ricInterval[ric]);
				delete this._ricInterval[ric];
			}
		}
	};

	function onDataRecieved(res) {
		grid.api.setRicData(res.ric, res.data);
	}

	function onFieldAdded(e) {
		var addedFields = e.addedFields;
		for (var i = 0; i < addedFields.length; i++) {
			MyBasicProvider.addField(addedFields[i]);
		}
	}
	
	function onFieldRemoved(e) {
		var removedFields = e.removedFields;
		for (var i = 0; i < removedFields.length; i++) {
			MyBasicProvider.removeField(removedFields[i]); // Subscribe field update
		}
	}

	function onRicAdded(e) {
		var addedRics = e.addedRics;
		MyBasicProvider.subscribe(addedRics, onDataRecieved); // Subscribe ric update
	}

	function onRicRemoved(e) {
		MyBasicProvider.unsubscribe(e.removedRics); // Subscribe ric update
	}


	var grid = null;
	function onInit(rtk) {
		var config = {
			RTK: rtk,
			columns: [
				{
					"name": "Ric",
					"field": "X_RIC_NAME",
				},
				{
					"name": "Custom Field Name",
					"field": "fieldName",
					"className": "highlighted-column"
				},
				{
					"field": "CF_ASK"
				},
				{
					"field": "Combined fields",
					"requiredFields": ["fieldA", "fieldB"],
					"notRealTimeField": true,
				},
				{
					"field": "CF_LAST"
				}
			],
			rows: [
				{ "ric": "TRI.TO" },
				{ "ric": "" },
				{ "ric": ".SETI" },
				{ "ric": "0#.DJI" },
				{ "ric": ".SPX" },
				{ "ric": "TRI.TO" },
				{ "ric": ".SETI" },
				{ "ric": ".SPX" },
				{ }
			]
		};

		grid = document.getElementsByTagName("atlas-blotter")[0];
		grid.addEventListener("configured", function(e) {
			var api = e.detail.api;
			api.listen("fieldAdded", onFieldAdded);
			api.listen("fieldRemoved", onFieldRemoved);
			api.listen("ricAdded", onRicAdded);
			api.listen("ricRemoved", onRicAdded);
			
		});
		grid.config = config;
	}
</script>
```

## Events argument

| Event Name   | Arguments       | Description                          |
|--------------|-----------------|--------------------------------------|
| fieldAdded   | e.addedFields   | An array of newly added fields.      |
| fieldRemoved | e.removedFields | An array of recently removed fields. |
| ricAdded     | e.addedRics     | An array of newly added rics.        |
| ricRemoved   | e.removedRics   | An array of recently removed rics.   |

The following arguments are provided in every events:

| Event Name | Arguments | Description          |
|------------|-----------|----------------------|
| *          | e.fields  | All fields.          |
|            | e.rics    | All rics.            |
|            | e.rowDefs | All row definitions. |