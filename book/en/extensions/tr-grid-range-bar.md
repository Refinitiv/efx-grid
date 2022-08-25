<link rel="stylesheet" href="../resources/styles/elf-template.css">

## Range Bar

The Range Bar Extension provides graphical bar for last value ranking visualization based on low and high value.

```live
<style>
	atlas-blotter {
		height: 208px;
	}
</style>

<atlas-blotter id="grid"></atlas-blotter>

<script>
	var fields = ["CFLOW", "CF_LAST", "CFHIGH", "percent"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 20 });
	
	var configObj = {
		scrollbar: true,
		columns: [
			{
				title: "Low",
				field: fields[0],
				width: 60
			},
			{
				title: "Last",
				field: fields[1],
				width: 60
			},
			{
				title: "High",
				field: fields[2],
				width: 60
			},
			{
				title: "Range (Low, Last, High)",
				field: fields[1],
				rangeBar: {
					low: "CFLOW",
					high: "CFHIGH",
					last: "CF_LAST"
				}
			},
			{
				title: "Percent",
				field: fields[3],
				width: 60
			},
			{
				title: "Range 1",
				field: fields[3],
				rangeBar: {
					field: fields[3]
				}
			},
			{
				title: "Range 2",
				field: fields[3],
				rangeBar: {
					field: fields[3],
					start: 10, // default 0
					end: 70 // default 100
				}
			},
			{
				title: "Range 3",
				field: fields[1],
				rangeBar: {
					field: fields[3]
				}
			}
		],
		staticDataRows: records,
		extensions: [
			new tr.RangeBarExtension()
		]
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```

### Installation and how to import to a project

Installation examples and details of how to import the extension to a project are available on the [Overview](README.md) page.


<div></div>

<div id="elf-api-container"><h2 style="margin-bottom:5px" id="api-refs">API Reference</h2><div id="main-template" class="elf-template">    <section><article>                                                                        <h3 class="subsection-title">Type Definitions</h3>                        <div class="item">            <div class="item-type">typedef</div>    <h4 class="name" id="~ColumnOptions">ColumnOptions</h4><div class="description">    Extension column options that can be specified on each individual grid's column option:</div>    <h5>Type:</h5>    <span class="param-type">Object</span>    <h5>Properties:</h5>    <div class="props"><table>    <thead>    <tr>                <th>Name</th>                <th>Type</th>                <th>Attributes</th>                        <th class="last">Description</th>    </tr>    </thead>    <tbody>            <tr>                            <td class="name"><code>rangeBar</code></td>                        <td class="type">                            <span class="param-type"><a href="RangeBarPlugin.html#~RangeDefinition">RangeBarPlugin~RangeDefinition</a></span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                    <td class="description last">Range definition object</td>        </tr>        </tbody></table></div><div class="details">                                                            </div></div>                            <div class="item">            <div class="item-type">typedef</div>    <h4 class="name" id="~RangeDefinition">RangeDefinition</h4><div class="description">    Available options describing `rangeBar` object specified in grid's column option</div>    <h5>Type:</h5>    <span class="param-type">Object</span> | <span class="param-type">boolean</span>    <h5>Properties:</h5>    <div class="props"><table>    <thead>    <tr>                <th>Name</th>                <th>Type</th>                <th>Attributes</th>                        <th>Default</th>                <th class="last">Description</th>    </tr>    </thead>    <tbody>            <tr>                            <td class="name"><code>field</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    THIS_COLUMN                                </td>                        <td class="description last">Field used as percentage. If specified, `low`, `high`, and `last` fields will be ignored.</td>        </tr>            <tr>                            <td class="name"><code>start</code></td>                        <td class="type">                            <span class="param-type">number</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    0                                </td>                        <td class="description last">minimum value used with percentage `field`</td>        </tr>            <tr>                            <td class="name"><code>end</code></td>                        <td class="type">                            <span class="param-type">number</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    100                                </td>                        <td class="description last">maximum value used with percentage `field`</td>        </tr>            <tr>                            <td class="name"><code>low</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    ""                                </td>                        <td class="description last">Field used as minimum range</td>        </tr>            <tr>                            <td class="name"><code>high</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    ""                                </td>                        <td class="description last">Field used as maximum range</td>        </tr>            <tr>                            <td class="name"><code>last</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    ""                                </td>                        <td class="description last">Field used as current absolute value (white bar)</td>        </tr>        </tbody></table></div><div class="details">                                                            </div></div>                            <h3 class="subsection-title">Methods</h3>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="_afterInit"><span class="type-signature"></span>_afterInit<span class="signature">()</span><span class="type-signature"></span></h4>                                            <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="config"><span class="type-signature"></span>config<span class="signature">(options<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">options</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getConfigObject"><span class="type-signature"></span>getConfigObject<span class="signature">(out_obj<span class="signature-attributes">opt</span>)</span><span class="type-signature"> → {Object}</span></h4>                            <div class="description">        Get a current state of grid and extension config    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">out_obj</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Object</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getName"><span class="type-signature"></span>getName<span class="signature">()</span><span class="type-signature"> → {string}</span></h4>                                            <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">string</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="hasMultiTableSupport"><span class="type-signature"></span>hasMultiTableSupport<span class="signature">()</span><span class="type-signature"> → {boolean}</span></h4>                            <div class="description">        Plugin that has multi-table support means that it can have multiple hosts/tables and share its states across those hosts/tables.    </div>                        <div class="details">                <dt class="inherited-from">Inherited From:</dt>    <dd class="inherited-from">        <a href="GridPlugin.html#hasMultiTableSupport">GridPlugin#hasMultiTableSupport</a>    </dd>                                                    </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">boolean</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="initialize"><span class="type-signature"></span>initialize<span class="signature">(host, options<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">host</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                                                </div>                                                    <div class="description">                    core grid object                </div>                    </div>                <div class="param">                            <div class="name">options</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="unload"><span class="type-signature"></span>unload<span class="signature">(host)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">host</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                                                    <div class="description">                    core grid object                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                </article></section></div></div>