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
grid.config = {
    // ... other config
    whenDefined(e) {
        e.api.listen("ricAdded", onRicAdded);
        e.api.listen("ricRemoved", onRicRemoved);
    }
}

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
	var gen = tr.DataGenerator;

    function timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
    * NOTE: DO NOT COPY AND PASTE THIS CODE
    * 
    * This is only an example of a simple data provider. In real world scenario, you would need to implement the logics base on your requirement.
    * For example:
    * 1. Define an endpoint to a real domain name.
    * 2. Store a data base on your need.
    * 3. Implement only neccessary methods.
    * 4, Remove timeout and interval.
    */ 
    var MyBasicProvider = {
        _fields: {},
        _ricInterval: {},
        addField(field) {
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
                data: gen.generateRecord(Object.keys(this._fields))
            };
            callback(res);
        },
        unsubscribe(rics) {
            for (var ric of rics) {
                clearInterval(this._ricInterval[ric]);
                delete this._ricInterval[ric];
            }
        }
    }

    var config = {
        "columns": [
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
                "field": "CF_ASK",
                "requiredFields": "X_RIC_NAME",
            },
            {
                "field": "Combined fields",
                "requiredFields": ["X_RIC_NAME", "Custom Binding"],
                "notRealTimeField": true,
            },
            {
                "field": "CF_LAST"
            }
        ],
        "rows": [
            {
                "ric": "TRI.TO"
            },
            {
                "ric": "" // Empty ric
            },
            {
                "ric": ".SETI"
            },
            {
                "ric": "0#.DJI"
            },
            {
                "ric": ".SPX"
            },
            {
                "ric": "TRI.TO"
            },
            {
                "ric": ".SETI"
            },
            {
                "ric": ".SPX"
            },
            { // Empty definition
            }
        ],
        whenDefined(e) {
            e.api.listen("fieldAdded", onFieldAdded);
            e.api.listen("fieldRemoved", onFieldRemoved);
            e.api.listen("ricAdded", onRicAdded);
            e.api.listen("ricRemoved", onRicAdded);
        }
    };

	var grid = document.getElementsByTagName("atlas-blotter")[0];
	grid.config = config;

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

    async function onRicAdded(e) {
        var addedRics = e.addedRics;
        MyBasicProvider.subscribe(addedRics, onDataRecieved); // Subscribe ric update
    }

    function onRicRemoved(e) {
        MyBasicProvider.unsubscribe(e.removedRics); // Subscribe ric update
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