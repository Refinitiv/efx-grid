<link rel="stylesheet" href="../../resources/styles/elf-template.css">



<div id="main-template" class="elf-template">    <section><header>            <h1 class="subsection-title"><span class="attribs"></span>SectionSettings<span class="signature">(grid<span class="signature-attributes">non-null</span>)</span></h1>            </header><article>    <div class="container-overview">            
<div class="item">                                <div class="item-type">class</div>                        <h4 class="name" id="SectionSettings">new SectionSettings<span class="signature">(grid<span class="signature-attributes">non-null</span>)</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">grid</div>                        <div class="type">                            <span class="param-type"><a href="ILayoutGrid.html">ILayoutGrid</a></span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>        </div>            <h3 class="subsection-title">Extends</h3>            <dd class="argument-list">        <ul>            <li><a href="EventDispatcher.html">EventDispatcher</a></li>        </ul>    </dd>                                                <h3 class="subsection-title">Methods</h3>                    
<div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="activateColumns">activateColumns<span class="signature">(activations, firstIndex, lastIndex)</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">activations</div>                        <div class="type">                            <span class="param-type">Array.&lt;(boolean|undefined)&gt;</span>                        </div>                                            </div>                <div class="param">                            <div class="name">firstIndex</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                                            </div>                <div class="param">                            <div class="name">lastIndex</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    
<div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="disableConflation">disableConflation<span class="signature">(opt_disabled)</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">opt_disabled</div>                        <div class="type">                            <span class="param-type">boolean</span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    
<div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="disableDataBinding">disableDataBinding<span class="signature">(opt_disabled<span class="signature-attributes">opt</span>)</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">opt_disabled</div>                        <div class="type">                            <span class="param-type">boolean</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    
<div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="enableColumnVirtualization">enableColumnVirtualization<span class="signature">(opt_enabled<span class="signature-attributes">opt</span>)</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">opt_enabled</div>                        <div class="type">                            <span class="param-type">boolean</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    
<div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="extendDataEventArg">extendDataEventArg<span class="signature">(e<span class="signature-attributes">opt</span>, begin<span class="signature-attributes">opt</span>, end<span class="signature-attributes">opt</span>)</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">e</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>                <div class="param">                            <div class="name">begin</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                                    <div class="description">                    INCLUSIVE. The value can be undefined or NaN                </div>                    </div>                <div class="param">                            <div class="name">end</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                                    <div class="description">                    INCLUSIVE. The value can be undefined or NaN                </div>                    </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Object</span>    </div>                </div>                    
<div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="extendEventArg">extendEventArg<span class="signature">(e<span class="signature-attributes">opt</span>)</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">e</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Object</span>    </div>                </div>                    
<div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="extendRenderEventArg">extendRenderEventArg<span class="signature">(e, fromR, toR)</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">e</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                                            </div>                <div class="param">                            <div class="name">fromR</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                                            </div>                <div class="param">                            <div class="name">toR</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Object</span>    </div>                </div>                    
<div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getAutoSyncRowCount">getAutoSyncRowCount<span class="signature">()</span></h4>                            <div class="description">        When the parameter is not specifically set by user, The mode will be switched automatically based on SectionSettings type    </div>                        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">boolean</span>    </div>                </div>                    
<div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getChildren">getChildren<span class="signature">()</span></h4>                            <div class="description">        Clone a copy of the list of SectionSettingss. If there is no tree relationship, return null    </div>                        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Array.&lt;<a href="SectionSettings.html">SectionSettings</a>&gt;</span>    </div>                </div>                    
<div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getData">getData<span class="signature">(colName, rowRef)</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">colName</div>                        <div class="type">                            <span class="param-type">string</span>                        </div>                                            </div>                <div class="param">                            <div class="name">rowRef</div>                        <div class="type">                            <span class="param-type">number</span> | <span class="param-type">string</span>                        </div>                                                    <div class="description">                    Number is treated as row index relative to this section data view. String is data view row id                </div>                    </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">*</span>    </div><div class="sub-content-desc">    Returns undefined if not success</div>                </div>                    
<div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getDataChangedConflator">getDataChangedConflator<span class="signature">()</span></h4>                                            <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type"><a href="Conflator.html">Conflator</a></span>    </div>                </div>                    
<div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getDataSource">getDataSource<span class="signature">()</span></h4>                                            <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type"><a href="DataView.html">DataView</a></span>    </div>                </div>                    
<div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getId">getId<span class="signature">()</span></h4>                                            <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">string</span>    </div>                </div>                    
<div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getIndex">getIndex<span class="signature">()</span></h4>                                            <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">number</span>    </div>                </div>                    
<div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getParent">getParent<span class="signature">()</span></h4>                                            <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type"><a href="SectionSettings.html">SectionSettings</a></span>    </div>                </div>                    
<div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getRootDataSource">getRootDataSource<span class="signature">()</span></h4>                                            <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type"><a href="DataTable.html">DataTable</a></span> | <span class="param-type"><a href="DataView.html">DataView</a></span>    </div>                </div>                    
<div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getRowData">getRowData<span class="signature">(rowRef)</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">rowRef</div>                        <div class="type">                            <span class="param-type">number</span> | <span class="param-type">string</span>                        </div>                                                    <div class="description">                    Row Index of the display section or row id of the data table                </div>                    </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Object.&lt;string, *&gt;</span>    </div>                </div>                    
<div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getSection">getSection<span class="signature">()</span></h4>                                            <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type"><a href="ILayoutGrid.html">ILayoutGrid</a></span>    </div>                </div>                    
<div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getSectionName">getSectionName<span class="signature">()</span></h4>                                            <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">string</span>    </div>                </div>                    
<div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getType">getType<span class="signature">()</span></h4>                                            <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">string</span>    </div>                </div>                    
<div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="isBinding">isBinding<span class="signature">()</span></h4>                                            <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">boolean</span>    </div>                </div>                    
<div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="listen">listen<span class="signature">(type, handler, opt_priority<span class="signature-attributes">opt</span>)</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">type</div>                        <div class="type">                            <span class="param-type">string</span>                        </div>                            <div class="attributes">                                                                </div>                                                    <div class="description">                    Any event provided by derived class                </div>                    </div>                <div class="param">                            <div class="name">handler</div>                        <div class="type">                            <span class="param-type">function</span>                        </div>                            <div class="attributes">                                                                </div>                                                    <div class="description">                    Callback method                </div>                    </div>                <div class="param">                            <div class="name">opt_priority</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                                    <div class="description">                    The higher the priority, the sooner the listener get executed. Undefined priority listener will be executed last                </div>                    </div>            </div>        <div class="details">                <dt class="inherited-from">Inherited From:</dt>    <dd class="inherited-from">        <a href="EventDispatcher.html#listen">EventDispatcher#listen</a>    </dd>                                                    </div>                                            <h5>Example:</h5>            <pre><code>var grid = new Grid();
grid.listen("click", function(e) { console.log("Grid is clicked"); });</code></pre>    </div>                    
<div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="removeRowData">removeRowData<span class="signature">(rowRef)</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">rowRef</div>                        <div class="type">                            <span class="param-type">number</span> | <span class="param-type">string</span>                        </div>                                                    <div class="description">                    Row Index of the display section or row id of the data table                </div>                    </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">boolean</span>    </div><div class="sub-content-desc">    Returns true for successful data removing</div>                </div>                    
<div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="rerender">rerender<span class="signature">()</span></h4>                            <div class="description">        Rerender section content. If the section is bound with the data source, dataChanged event is fired. Otherwise, rowAvailable event is fired instead.    </div>                        <div class="details">                                                            </div>                                    </div>                    
<div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="setAutoSyncRowCount">setAutoSyncRowCount<span class="signature">(bool)</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">bool</div>                        <div class="type">                            <span class="param-type">boolean</span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    
<div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="setData">setData<span class="signature">(colName, rowRef, data)</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">colName</div>                        <div class="type">                            <span class="param-type">string</span>                        </div>                                            </div>                <div class="param">                            <div class="name">rowRef</div>                        <div class="type">                            <span class="param-type">number</span> | <span class="param-type">string</span>                        </div>                                                    <div class="description">                    Number is treated as row index relative to this section data view. String is data view row id                </div>                    </div>                <div class="param">                            <div class="name">data</div>                        <div class="type">                            <span class="param-type">*</span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">boolean</span>    </div><div class="sub-content-desc">    Returns true for successful data setting</div>                </div>                    
<div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="setDataSource">setDataSource<span class="signature">(dataView)</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">dataView</div>                        <div class="type">                            <span class="param-type"><a href="DataView.html">DataView</a></span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    
<div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="setId">setId<span class="signature">(str<span class="signature-attributes">opt</span>)</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">str</div>                        <div class="type">                            <span class="param-type">string</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">string</span>    </div>                </div>                    
<div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="setType">setType<span class="signature">(type)</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">type</div>                        <div class="type">                            <span class="param-type">string</span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    
<div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="snapshot">snapshot<span class="signature">(clone)</span></h4>                            <div class="description">        Regenerate the section (UI part) on a different object    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">clone</div>                        <div class="type">                            <span class="param-type"><a href="ILayoutGrid.html">ILayoutGrid</a></span>                        </div>                                                    <div class="description">                    A LayoutGrid that will be rendered                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    
<div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="unlisten">unlisten<span class="signature">(type, handler)</span></h4>                            <div class="description">        Removes an event listener which was added with listen(). The same function handler must be sent in, or else it will not be removed    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">type</div>                        <div class="type">                            <span class="param-type">string</span>                        </div>                                                    <div class="description">                    The name of the event without the 'on' prefix.                </div>                    </div>                <div class="param">                            <div class="name">handler</div>                        <div class="type">                            <span class="param-type">function</span>                        </div>                                                    <div class="description">                    The listener function to remove.                </div>                    </div>            </div>        <div class="details">                <dt class="inherited-from">Inherited From:</dt>    <dd class="inherited-from">        <a href="EventDispatcher.html#unlisten">EventDispatcher#unlisten</a>    </dd>                                                    </div>                                    </div>                    
<div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="unlistenAll">unlistenAll<span class="signature">(type<span class="signature-attributes">opt</span>)</span></h4>                            <div class="description">        Removes all listeners from an object. If no type is specified, it will remove all listeners that have been registered. <br>You can also optionally remove listeners of a particular type.    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">type</div>                        <div class="type">                            <span class="param-type">string</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                                    <div class="description">                    Type of event to, default is all types.                </div>                    </div>            </div>        <div class="details">                <dt class="inherited-from">Inherited From:</dt>    <dd class="inherited-from">        <a href="EventDispatcher.html#unlistenAll">EventDispatcher#unlistenAll</a>    </dd>                                                    </div>                                    </div>                    
<div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="updateRowData">updateRowData<span class="signature">(fromRowIndex<span class="signature-attributes">opt</span>, lastRowIndex<span class="signature-attributes">opt</span>, e<span class="signature-attributes">opt</span>)</span></h4>                            <div class="description">        Fires data binding event without actual change in the data source.This will force visual elements to be re-rendered with the latest data in the data source.    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">fromRowIndex</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                                    <div class="description">                    INCLUSIVE If the value is undefined, the first row index will be used                </div>                    </div>                <div class="param">                            <div class="name">lastRowIndex</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                                    <div class="description">                    INCLUSIVE If the value is undefined, the last row index will be used                </div>                    </div>                <div class="param">                            <div class="name">e</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                                    <div class="description">                    Additional parameters to be fired with the event                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                </article></section></div>