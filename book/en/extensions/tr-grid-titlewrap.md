<link rel="stylesheet" href="../resources/styles/elf-template.css">

## Title Wrap

The Title Wrap Extension wraps column headers into multiple lines if the text is too long, instead of cutting off the text.

```live
<atlas-blotter id="grid"></atlas-blotter>

<script>
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 5 });
	var configObj = {
		columns: [
			{ title: "Company", field: fields[0] },
			{ title: "Very Long Column Header Name", field: fields[1], width: 120 },
			{ title: "Average Price (last year)", field: fields[2], width: 100, alignment: "right" },
			{ title: "Average Net. Change (last year)", field: fields[3], width: 100, alignment: "right" },
			{ title: "Industry", field: fields[4] }
		],
		staticDataRows: records,
		extensions: [
			new tr.TitleWrapExtension()
		]
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```

### Installation and how to import to a project

Installation examples and details of how to import the extension to a project are available on the [Overview](README.md) page.

### Title wrap with no padding top and bottom

```live
<atlas-blotter id="grid"></atlas-blotter>

<script>
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 5 });
	var configObj = {
		columns: [
			{ title: "Company", field: fields[0] },
			{ title: "Very Long Column Header Name", field: fields[1], width: 120 },
			{ title: "Average Price (last year)", field: fields[2], width: 100, alignment: "right" },
			{ title: "Average Net. Change (last year)", field: fields[3], width: 100, alignment: "right" },
			{ title: "Industry", field: fields[4] }
		],
		staticDataRows: records,
		titleWrap: {
			padding: 0
		},
		extensions: [
			new tr.TitleWrapExtension()
		]
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```

### Title wrap with group column

```live
<atlas-blotter id="grid"></atlas-blotter>

<script>
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 5 });
	var configObj = {
		columns: [
			{ id: "c1", title: "Company", field: fields[0] },
			{ id: "c2", title: "Long Column Header Name", field: fields[1], width: 120 },
			{ id: "c3", title: "Average Price (last year)", field: fields[2], width: 100, alignment: "right" },
			{ id: "c4", title: "Average Net. Change (last year)", field: fields[3], width: 100, alignment: "right" },
			{ id: "c5", title: "Industry", field: fields[4] }
		],
		staticDataRows: records,
		columnGrouping: [{
			id: "g1",
			title: "Company Information",
			alignment: "center",
			children: ["c1", "c2"]
		},
		{
			id: "g2",
			title: "Price",
			alignment: "center",
			children: ["c3", "c4"]
		}],
		extensions: [
			new tr.TitleWrapExtension(), new tr.ColumnGroupingExtension()
		]
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```

### Title wrap with nested group column

```live
<atlas-blotter id="grid"></atlas-blotter>

<script>
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 5 });
	var configObj = {
		columns: [
			{ id: "c1", title: "Company", field: fields[0] },
			{ id: "c2", title: "Very Long Column Header Name", field: fields[1], width: 120 },
			{ id: "c3", title: "Average Price (last year)", field: fields[2], width: 100, alignment: "right" },
			{ id: "c4", title: "Average Net. Change (last year)", field: fields[3], width: 100, alignment: "right" },
			{ id: "c5", title: "Industry", field: fields[4] }
		],
		staticDataRows: records,
		columnGrouping: [{
			id: "g1",
			title: "Company Information",
			alignment: "center",
			children: ["c1", "c2"]
		},
		{
			id: "g2",
			title: "Price",
			alignment: "center",
			children: ["c3", "c4"]
		}, {
			id: "g3",
			title: "Top 5 Companies",
			alignment: "center",
			children: ["g1", "g2", "c5"]
		}],
		extensions: [
			new tr.TitleWrapExtension(), new tr.ColumnGroupingExtension()
		]
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```


<div></div>

<h2 style="margin-bottom:5px" id="api-refs">API Reference</h2>
<div id="elf-api-container"><div id="main-template" class="elf-template">    <section><article>                                                                            <h3 class="subsection-title">Methods</h3>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="_adjustRowHeightRefByHost"><span class="type-signature"></span>_adjustRowHeightRefByHost<span class="signature">(host, sectionRef, from<span class="signature-attributes">opt</span>, to<span class="signature-attributes">opt</span>)</span><span class="type-signature"> → {boolean}</span></h4>                            <div class="description">        adjust row height using specific grid at a reference to other grid    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">host</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                                                </div>                                                    <div class="description">                    core grid instance                </div>                    </div>                <div class="param">                            <div class="name">sectionRef</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                                                </div>                                                    <div class="description">                    grid SectionReference                </div>                    </div>                <div class="param">                            <div class="name">from</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>                <div class="param">                            <div class="name">to</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">boolean</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="adjustRowHeight"><span class="type-signature"></span>adjustRowHeight<span class="signature">(sectionRef, from<span class="signature-attributes">opt</span>, to<span class="signature-attributes">opt</span>)</span><span class="type-signature"> → {boolean}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">sectionRef</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                                                </div>                                                    <div class="description">                    grid SectionReference                </div>                    </div>                <div class="param">                            <div class="name">from</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>                <div class="param">                            <div class="name">to</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">boolean</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="adjustRowHeightAt"><span class="type-signature"></span>adjustRowHeightAt<span class="signature">(sectionRef, rowIndex)</span><span class="type-signature"> → {boolean}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">sectionRef</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                                                    <div class="description">                    grid SectionReference                </div>                    </div>                <div class="param">                            <div class="name">rowIndex</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">boolean</span>    </div><div class="sub-content-desc">    True if the row height changes</div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="config"><span class="type-signature"></span>config<span class="signature">(options<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">options</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getConfigObject"><span class="type-signature"></span>getConfigObject<span class="signature">(gridOptions<span class="signature-attributes">opt</span>)</span><span class="type-signature"> → {Object}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">gridOptions</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Object</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getName"><span class="type-signature"></span>getName<span class="signature">()</span><span class="type-signature"> → {string}</span></h4>                                            <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">string</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="hasMultiTableSupport"><span class="type-signature"></span>hasMultiTableSupport<span class="signature">()</span><span class="type-signature"> → {boolean}</span></h4>                            <div class="description">        Plugin that has multi-table support means that it can have multiple hosts/tables and share its states across those hosts/tables.    </div>                        <div class="details">                    <dt class="tag-overrides">Overrides:</dt>    <dd class="tag-overrides">        <a href="">GridPlugin#hasMultiTableSupport</a>    </dd>                                                </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">boolean</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="initialize"><span class="type-signature"></span>initialize<span class="signature">(host, options<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">host</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                                                </div>                                                    <div class="description">                    core grid instance                </div>                    </div>                <div class="param">                            <div class="name">options</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="unload"><span class="type-signature"></span>unload<span class="signature">(host)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">host</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                                                    <div class="description">                    core grid instance                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                </article></section></div></div>