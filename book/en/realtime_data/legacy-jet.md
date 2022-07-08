# Real-time Market Data with Legacy JET

> This libary is deprecated. Please use [JET.Qoutes2](jet.md) instead.

`JET.Quotes` is a legacy way of retrieving real-time data. The data provided from `JET.Quotes` is two-level nested data, so it cannot be consumed directly. Custom formatters are required to render the data. The data consists of two properties, which are `raw` and `formatted`. This also means you need to define custom sorting logic to sort the data through `sorting` and `sortLogic` in the configuration object.

## JET.Quotes example

```live
<style>
    emerald-grid {
        height: 250px;
    }
</style>
<input id="ric_in" placeholder="Enter RIC" value="CHF=">
<button id="insert_btn">Click To Insert</button>
<br><br>
<emerald-grid></emerald-grid>

<script>
    var ricList = ["EUR=","JPY=","THB=","GBP="];
    var fields = ["X_RIC_NAME", "CF_NAME", "CF_LAST", "CF_BID", "CF_ASK", "NETCHNG_1", "PCTCHNG"];

    JET = new tr.MockJET(); // Use Mock for illustrative purpose only

    document.getElementById('insert_btn').addEventListener("click", onClickInsertButton);

    var realtimeDataFormatter = {
        reunder: function() {},
        bind: function(rowIndex, columnIndex, value, cell, columnDef, dataRow, dataTable) {
            var color = "";
            var content = "";
            if (value) { // Some RIC may not have all the fields so need to check if value is available
                content = value.formatted;
                var pct = dataRow["PCTCHNG"] ? dataRow["PCTCHNG"].raw : NaN;

                if (pct > 0) {
                    color = "red";
                } else if (pct < 0) {
                    color = "green";
                }
            }
            cell.setStyle("color", color);
            cell.setContent(content);
        }
    };

    var configObj = {
        rowSelection: true,
        sorting: {
            sortLogic: {
                "*" : function(a, b, order) { // "*" means this sorting logic is used for any column
                    return (a.raw - b.raw) * order;
                },
                "X_RIC_NAME": function(a, b, order) {
                    if(b.raw < a.raw) {
                        return order
                    } else if(a.raw < b.raw) {
                        return -order;
                    }
                    return 0;
                }
            }
        },
        columns: [
            {title: "RIC", field: "X_RIC_NAME", formatter: realtimeDataFormatter},
            {title: "Name", field: "CF_NAME", formatter: realtimeDataFormatter},
            {title: "Last", field: "CF_LAST", formatter: realtimeDataFormatter},
            {title: "Bid", field: "CF_BID", formatter: realtimeDataFormatter},
            {title: "Ask", field: "CF_ASK", formatter: realtimeDataFormatter},
            {title: "Net Change", field: "NETCHNG_1", formatter: realtimeDataFormatter},
            {title: "Pct.Change", field: "PCTCHNG", formatter: realtimeDataFormatter}
        ]
    };

    var grid = document.getElementsByTagName("emerald-grid")[0];
    grid.config = configObj;
    addRics(ricList);

    function onSubscriptionUpdate(sub, ric, data) {
		if (grid.api) {
			var dt = grid.api.getDataTable();
			dt.setRowData(ric, data);
		}
    }

    function addRics(rics) {
        var newSubscription = JET.Quotes.create().rics(rics).rawFields(fields);
        newSubscription.onUpdate(onSubscriptionUpdate);
        newSubscription.start();
    }

    function onClickInsertButton(e) {
        var ric = document.getElementById("ric_in").value;
        ric = ric.toUpperCase();
        if (ric && ricList.indexOf(ric) < 0) {
            ricList.push(ric);
            addRics(ric);
        }
    }
</script>
```
