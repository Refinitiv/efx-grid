# Realtime Data

```live(formatters)
	<atlas-blotter id="grid"></atlas-blotter>
<script>
	
	var heatMapExt = new tr.HeatMapExtension();
	var textFormattingExt = new tr.TextFormattingExtension();
	var contextMenuExt = new tr.ContextMenuExtension();
	var rowColoringExt = new tr.RowColoringExtension();
	var inCellEditingExt = new tr.InCellEditingExtension();
	var rowSelectionExt = new tr.RowSelectionExtension();

	var grid = document.getElementById("grid");
	var Toolkit = tr.MockRTK ? tr.MockRTK : MockRTK;
	Toolkit.init({ ID: 'rtk-atlas-blotter', minInterval: 100, maxInterval: 800 }, ['Quotes', 'Data']).then(onInit);
	function onInit(rtk) {
		const contextMenuModel = {
			items: {
				INSERT_ROW: {
					text: "Insert Row",
					callback: function (e) {
						var rowIndex = e.rowIndex;
						grid.api.insertRow({}, rowIndex);
						inCellEditingExt.openEditor(0, rowIndex);
					}
				},
				REMOVE_ROW: {
					text: "Remove Row",
					callback: function (e) {
						var selectionRows = rowSelectionExt.getSelectedRows();
						grid.api.removeRows(selectionRows);
					}
				}
			},
			onMenu: function (e) {
				var context = e.context;
				var menu = e.menu;
				var rowIndex = e.rowIndex;
				if (context === "content") {
					if (grid.api.getRowDefinition(rowIndex).getType() !== "CONSTITUENT") {
						menu.addItems(["INSERT_ROW", "REMOVE_ROW"]);
					} else {
						menu.addItems(["INSERT_ROW"]);
					}
				}
			}
		};

		var configObj = {
			rowSelection: true,
			fieldCaching: true,
			RTK: rtk,
			columns: [
				{
					field: "X_RIC_NAME",
					name: "RIC",
					tickColor: "CF_NETCHNG",
					minWidth: 100,
					editableContent: true
				},
				{
					field: "CF_TICK",
					name: "Tick",
					binding: onTickBinding,
				},
				{
					field: "CF_LAST",
					tickColor: "CF_TICK",
					blinking: true,
				},
				{
					field: "CF_NETCHNG",
					blinking: true,
					tickColor: "CF_TICK"
				},
				{
					field: "PCTCHNG",
					heatmap: true,
					formatType: "percent",
				}
			],
			rows: [
				{ ric: "BA.N" },
				{ ric: "AAPL.O" },
				{ ric: "MSFT.O" },
				{ ric: "TSLA.O" },
				{ ric: "PTT.BK" },
				{ ric: "AOT.BK" },
				{ ric: ".DJI", asChain: true, collapsed: false },
			],
			extensions: [heatMapExt, textFormattingExt, contextMenuExt, rowColoringExt, inCellEditingExt, rowSelectionExt],
			contextMenu: contextMenuModel,
			inCellEditing: {
				editableTitle: true,
				editableContent: false,
				autoSuggest: autoSuggest
			},
		};

		grid.config = configObj;
	}

	function onTickBinding(e) {
		var cell = e.cell;
		var data = e.data;
		var content = cell.getContent();
		if (!content) {
			content = document.createElement("coral-icon");
		}
		if (data != null) {

			var dataColor = {};
			if (data === 2) {
				dataColor.icon = "arrow-down-fill";
				dataColor.color = "rgb(245, 71, 91)";
			} else if (data == 1) {
				dataColor.icon = "arrow-up-fill";
				dataColor.color = "rgb(57, 196, 110)";
			}
			content.icon = dataColor.icon;
			content.style.color = dataColor.color;
		}
		cell.setContent(content);
	};

	var autoSuggest = (window.autoSuggest = document.createElement(
		"atlas-autosuggest"
	));
	autoSuggest.moreSearchDisabled = true; // Disable more search result, if you want to enable it follow https://amp.int.refinitiv.com/#/package/@elf/atlas-autosuggest

	// ========== MOCK data server. Don't copy this section =================
	const flattenResponse = (response) => {
		const { result, search, header, action } = response;
		const suggestions = [];
		const meta = {
			url: search,
			keyword: header.request.query
		};
		if (result && result.length) {
			result.forEach(row => {
				const rowAsDefault = row.default === true;
				const rowHits = row.hits;
				if (rowHits && rowHits.length) {
					rowHits.forEach((rowHit, hitIdx) => {
						suggestions.push({
							label: rowHit.cmd,
							value: rowHit,
							highlighted: rowAsDefault && hitIdx === 0,
							meta
						});
						const relations = rowHit.relations;
						if (relations) {
							Object.keys(relations).forEach(key => {
								const relation = relations[key];
								const relationAsDefault = relation.default === true;
								const relationHits = relation.hits;
								if (relationHits && relationHits.length) {
									relationHits.forEach((relationHit, relationHitIdx) => {
										suggestions.push({
											label: relationHit.cmd,
											value: relationHit,
											parent: rowHit,
											asSub: true,
											highlighted: relationAsDefault && relationHitIdx === 0,
											meta
										});
									});
								}
							});
						}
					});
				}
			});
		}
		return {
			header,
			meta,
			suggestions,
			action,
			searchUrl: search
		};
	};
	autoSuggest.addEventListener("suggestions-fetch-requested", suggest);
	function suggest(ev) {
		// Stop default data fetching

		ev.preventDefault();

		// construct cache key off the query object
		var cacheKey = JSON.stringify(ev.detail.query);

		// (optional) use util to parse response
		var responseData = {
			"header": {
				"request": {
					"filter": "",
					"highlight": true,
					"userProfileAssetClass": "CSH",
					"api-key": "czZTQ5MjY4",
					"eikon_version": "Eikon Web",
					"profile": "AlertsUI2",
					"query": "IBV",
					"uuid": "PATESTCPA724",
					"appl_category": []
				},
				"response": {
					"duration": 57,
					"server": "c962fkkaswb04.int.thomsonreuters.com",
					"num_results": 10
				}
			},
			"result": [
				{
					"name": "Equities",
					"hits": [
						{
							"score": 6867489,
							"navigation": null,
							"id": "1097326",
							"title": "International Business Vehicle Corp",
							"subtitle": "Ordinary Share - NYSE Consolidated - IBV",
							"symbol": "" + "<b>" + ev.detail.query + "</b>" + "",
							"cmd": "IBV",
							"relations": {},
							"position": 0,
							"source": "12",
							"explanation": null,
							"p": {
								"RIC": "IBV",
								"IsChain": false,
								"PermID": "55839165994",
								"OAPermID": "4295904307"
							},
							"ac": [
								"A:1",
								"A:1L"
							],
							"s": "IBV",
							"vc": "EQ",
							"fr": false,
							"st": "RIC",
							"preview": true
						},
						{
							"score": 2762007,
							"navigation": null,
							"id": "131770829",
							"title": "International Business Vehicle Corp",
							"subtitle": "Ordinary Share - MiFID Composite Cross Market Service - IBV",
							"symbol": "" + "<b>" + ev.detail.query + "</b>" + "IUSD.xbo",
							"cmd": "IBVIUSD.xbo",
							"relations": {},
							"position": 1,
							"source": "12",
							"explanation": null,
							"p": {
								"RIC": "IBVIUSD.xbo",
								"IsChain": false,
								"PermID": "21523029548",
								"OAPermID": "4295904307"
							},
							"ac": [
								"A:1",
								"A:1L"
							],
							"s": "IBVIUSD.xbo",
							"vc": "EQ",
							"fr": false,
							"st": "RIC",
							"preview": true
						}
					],
					"hasMore": true,
					"default": false,
					"size": 2,
					"moreLink": "cpurl://views.cp./Explorer/SRCHxALL.aspx?vcn=SearchAllEquities&Search.Value=ibV"
				},
				{
					"name": "Portfolios & Lists",
					"hits": [
						{
							"score": 2952687,
							"navigation": null,
							"id": "599195610",
							"title": "nam123",
							"subtitle": "",
							"symbol": "nam123",
							"cmd": "nam123",
							"relations": {},
							"position": 2,
							"source": "62",
							"explanation": null,
							"p": {
								"t": "FundedPortfolio"
							},
							"s": "599195610",
							"vc": "PORT",
							"fr": false,
							"st": "PortfolioID",
							"preview": false
						},
						{
							"score": 2932687,
							"navigation": null,
							"id": "215781232",
							"title": "BILL SHARE_AA IBV T",
							"subtitle": "",
							"symbol": "BILL SHARE_AA " + "<b>" + ev.detail.query + "</b>" + " T",
							"cmd": "BILL SHARE_AA IBV T",
							"relations": {},
							"position": 3,
							"source": "62",
							"explanation": null,
							"p": {
								"t": "FundedPortfolio"
							},
							"s": "215781232",
							"vc": "PORT",
							"fr": false,
							"st": "PortfolioID",
							"preview": false
						}
					],
					"hasMore": true,
					"default": false,
					"size": 2,
					"moreLink": "cpurl://views.cp./Explorer/SRCHxPORTF.aspx?Search.Value=ibV"
				},
				{
					"name": "Funds",
					"hits": [
						{
							"score": 2741047,
							"navigation": null,
							"id": "298223588",
							"title": "iShares iBonds Dec 2024 Term Muni Bond ETF",
							"subtitle": "Bond ETF - US123712312 - USD - Cboe Consolidated - IBVM",
							"symbol": "" + "<b>" + ev.detail.query + "</b>" + "M.K",
							"cmd": "IBVM.K",
							"relations": {},
							"position": 4,
							"source": "24",
							"explanation": null,
							"p": {
								"RIC": "IBVM.K",
								"IsChain": false,
								"PermID": "21642135445",
								"lipperId": "40215430"
							},
							"ac": [
								"A:5",
								"A:2X",
								"A:L0",
								"A:7",
								"A:GL"
							],
							"s": "IBVM.K",
							"vc": "FND",
							"fr": false,
							"st": "RIC",
							"preview": true
						}
					],
					"hasMore": true,
					"default": false,
					"size": 1,
					"moreLink": "cpurl://views.cp./Explorer/SRCHxALL.aspx?vcn=SearchAllFunds&Search.Value=ibV"
				},
				{
					"name": "Options",
					"hits": [
						{
							"score": 2157436,
							"navigation": null,
							"id": "585064349",
							"title": "OPRA International Business Vehicle Equity Option 145 Call Oct 2022 - IBV",
							"subtitle": "Equity Cash Option - OPRA - IBVJ2122C145000",
							"symbol": "" + "<b>" + ev.detail.query + "</b>" + "J212214500.U",
							"cmd": "IBVJ212214500.U",
							"relations": {},
							"position": 5,
							"source": "14",
							"explanation": null,
							"p": {
								"RIC": "IBVJ212214500.U",
								"IsChain": false,
								"PermID": "21873654768"
							},
							"ac": [
								"A:1",
								"A:2K",
								"A:1T",
								"A:7",
								"A:G1",
								"A:60"
							],
							"s": "IBVJ212214500.U",
							"vc": "OPT",
							"fr": false,
							"st": "RIC",
							"preview": false
						}
					],
					"hasMore": true,
					"default": false,
					"size": 1,
					"moreLink": "cpurl://views.cp./Explorer/SRCHxALL.aspx?vcn=SearchAllOptions&Search.Value=ibV"
				},
				{
					"name": "Indices",
					"hits": [
						{
							"score": 2157150,
							"navigation": null,
							"id": "215781470",
							"title": "INTL BUSINES Single Stock Dividend",
							"subtitle": "Equity Index",
							"symbol": "0#.IBVDIV",
							"cmd": "0#.IBVDIV",
							"relations": {},
							"position": 6,
							"source": "7",
							"explanation": null,
							"p": {
								"RIC": "0#.IBVDIV",
								"OAPermID": "4298427948"
							},
							"ac": [
								"M:D6",
								"I:M",
								"I:17",
								"A:1"
							],
							"s": "0#.IBVDIV",
							"vc": "INDX",
							"fr": false,
							"st": "RIC",
							"preview": true
						}
					],
					"hasMore": true,
					"default": false,
					"size": 1,
					"moreLink": "cpurl://views.cp./Explorer/SRCHxALL.aspx?vcn=SearchAllIndices&Search.Value=ibV"
				},
				{
					"name": "Commodities",
					"hits": [
						{
							"score": 1598945,
							"navigation": null,
							"id": "606788540",
							"title": "Argus Ice Brent Month 2 Snapshot PA5000637",
							"subtitle": "Crude Oil - Commodity Spot - ARGUS",
							"symbol": "" + "<b>" + ev.detail.query + "</b>" + "SST=ARG",
							"cmd": "IBVSST=ARG",
							"relations": {},
							"position": 7,
							"source": "15",
							"explanation": null,
							"p": {
								"RIC": "IBVSST=ARG",
								"IsChain": false,
								"PermID": "21891574387"
							},
							"ac": [
								"A:4",
								"A:1Q"
							],
							"s": "IBVSST=ARG",
							"vc": "COM",
							"fr": false,
							"st": "RIC",
							"preview": true
						}
					],
					"hasMore": true,
					"default": false,
					"size": 1,
					"moreLink": "cpurl://apps.cp./apps/SearchAll?Search.Value=ibV"
				},
				{
					"name": "Fixed Income",
					"hits": [
						{
							"score": 1465259,
							"navigation": null,
							"id": "0x00102c80bf6b046c",
							"title": "International Business Vehicle Corp - " + "<b>" + ev.detail.query + "</b>" + " 2.875% 09-Nov-2022",
							"subtitle": "Plain Vanilla Fixed Coupon Bond - Underwritten",
							"symbol": "US459200JC60",
							"cmd": "US459200JC60",
							"relations": {},
							"position": 8,
							"source": "3",
							"explanation": null,
							"p": {
								"RIC": "459200JC6=",
								"OAPermID": "4295904307"
							},
							"ac": [
								"A:2",
								"A:J"
							],
							"s": "459200JC6=",
							"vc": "BOND",
							"fr": false,
							"st": "RIC",
							"preview": true
						}
					],
					"hasMore": true,
					"default": false,
					"size": 1,
					"moreLink": "cpurl://apps.cp./apps/SearchAll?Search.Value=ibV"
				},
				{
					"name": "FX",
					"hits": [
						{
							"score": 237124,
							"navigation": null,
							"id": "47051538460",
							"title": "US Dollar/Chinese Renminbi 6 Month FX Forecast",
							"subtitle": "IBV INDIA - 6 Month",
							"symbol": "CNY6MP=0631",
							"cmd": "CNY6MP=0631",
							"relations": {},
							"position": 9,
							"source": "23",
							"explanation": null,
							"p": {
								"RIC": "CNY6MP=0631",
								"PermID": "47051538460"
							},
							"ac": [
								"M:D6",
								"A:55",
								"A:3",
								"A:9",
								"M:1MN"
							],
							"s": "CNY6MP=0631",
							"vc": "FX",
							"fr": false,
							"st": "RIC",
							"preview": false
						}
					],
					"hasMore": true,
					"default": false,
					"size": 1,
					"moreLink": "cpurl://views.cp./Explorer/SRCHxALL.aspx?vcn=SearchAllFXMoney&Search.Value=ibV"
				}
			],
			"search": "cpurl://apps.cp./apps/SearchAll?Search.Value=ibV",
			"action": "\"IBV\" SRCH",
			"assetClassifierStatus": "NOT_INVOKED",
			"assetClassifierExplanation": "Current profile is not in the list of the silent mode profiles for asset classifier."
		};
		var parsed = flattenResponse(responseData);

		// cache the response
		autoSuggest.cacheModel.set(cacheKey, parsed);

		// set suggestions data
		autoSuggest.setSuggestions(parsed);
	}
	// ========== End mock data server section ======================================

</script>

<style>
	body {
		padding: 24px;
	}

	atlas-blotter {
		height: 300px;
	}

	hr {
		margin: 8px;
	}
</style>
```

In the example above, we use MockRTK to mimic real-time data from the server. In this case, we have the ability to select a row to highlight it. Right-clicking on the row brings up a menu where you can insert or delete the row.

Furthermore, we have both regular RIC and chain RIC. They automatically add children to their respective rows. Additionally, there's a heat map extension that visually represents the data values. This visualization helps to decide when to make trades based on a midpoint.