# Real-time Market Data with Refinitiv Web Toolkit (RTK)

Refinitiv Web Toolkit (RTK) is a new real-time standard option that could be used other than the current JET.Quote2.

You can find more information on [Refinitiv Web Toolkit](https://api.doccloud.int.refinitiv.com/content/refinitiv-web-toolkit/1.0.0/63/books/docs/book/en/sections/overview/getting-started.html) page.


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
<atlas-blotter id='grid'></atlas-blotter>
<script>
  var Toolkit = tr.MockRTK;
  Toolkit.init({ ID: 'rtk-atlas-blotter' }, ['Quotes', 'Data']).then(onInit);

  function onInit(rtk) {
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
      ],
      RTK: rtk // add rtk to grid config
    };

    grid.config = configObj;
  }

	function onClickInsertButton(e) {
		var ric = document.getElementById("ric_in").value;
		insertRic(ric.toUpperCase());
	}

	function insertRic(ric) {
		grid.api.insertRow(ric, 0);
	}
</script>
```

Using `atlas-blotter` on your application and run it on the Eikon container follow the steps below.

> Note: RTK dependencies need to be bundled before use.

1. Install RTK and Types dependencies as shown below.

```bash
npm install @refinitiv/web-toolkit-loader
npm install @types/refinitiv-web-toolkit-core
npm install @types/refinitiv-web-toolkit-data
npm install @types/refinitiv-web-toolkit-quotes
```

2. create an `atlas-blotter` in your html template or file.

```html
<atlas-blotter id="blotter"></atlas-blotter>
```

3. Import the RTK library to your application.

```js
import * as Toolkit from '@refinitiv/web-toolkit-loader';
```

4. Initialize RTK with Quotes and Data plugins.

```js
Toolkit.init({ ID: 'your-app-id' }, ['Quotes', 'Data']).then(onInit);
```

5. Then you can configure `atlas-blotter` using `config` property.

```js
function onInit(rtk) {
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
      ],
      'RTK': rtk // add rtk to grid config
  };
}
```
