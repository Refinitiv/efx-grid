# Grid Builder

The grid configuration builder provide a quick start way of using grid in your application. This will help new users to getting started with grid easier. You can try with different grid customization and grid extensions with a realtime result, then this configuration can be copy and paste into any application to get the same result as seen from this section.

```live(builder)
<coral-sidebar-layout sidebar-width="0px" class="main-layout">
	<coral-panel slot="main-content" class="main-content" spacing>
		<coral-tab-bar id="tabs"></coral-tab-bar>
		<coral-panel spacing>
			<div id="section-detail"></div>
		</coral-panel>
		<atlas-blotter id="grid"></atlas-blotter>
		<emerald-popup-menu id="menu"></emerald-popup-menu>
		<textarea id="configArea"></textarea>
	</coral-panel>
</coral-sidebar-layout>

<script></script>

<style>
	html,
	body {
		margin: 0;
	}
	body {
		padding: 20px;
		box-sizing: border-box;
		font-family: Arial, Helvetica, sans-serif;
	}
	a {
		font: 1.2em Arial;
		display: inline-block;
		padding: 10px;
		margin: 4px;
		box-sizing: border-box;
		border-radius: 8px;
		border: 1px solid #eeeeee;
		width: 32%;
		text-align: center;
		vertical-align: middle;
		box-shadow: 0 5px 5px lightgrey;
	}
	.main-layout {
		height: 95vh;
		display: flex;
	}
	.content-title {
		padding-top: 5px;
		padding-bottom: 5px;
		font-size: 14px;
	}
	.main-content {
		flex: 1;
		display: flex;
		flex-direction: column;
	}
	#grid {
		height: 350px;
	}
	div {
		min-height: 24px;
	}
	hr  {
		margin-top: 15px;
		margin-bottom: 15px;
		width: 100%;
	}
	#configArea {
		flex: 1;
		width: 100%;
		margin-top: 10px;
		font-family: monospace;
	}
	#section-detail{
		height: 160px;
		overflow-y: scroll;
		padding-bottom: 10px;
		border: grey solid 1px;
	}
	.two-columns {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
	.two-columns > *:not(hr) {
		padding:2px;
		display: flex;
		align-items: center;
	}
	label {
		padding-right: 10px;
	}
</style>
```

## Grid Loader 

In this section, you can try to paste your configuration object here to see an live result. This allow user to make advance customization to grid configuration object before using with their real application.

```live(loader)
<coral-sidebar-layout sidebar-width="0px" style="height: 95vh;">
	<coral-header slot="main-header" level="1">
		<coral-button id="run" icon="play">RUN</coral-icon></coral-button>
	</coral-header>
	<coral-panel slot="main-content" class="main-content" spacing>
		<textarea id="configArea"></textarea>
		<div id="container">
			<atlas-blotter id="grid"></atlas-blotter>
		</div>
		<emerald-popup-menu id="menu"></emerald-popup-menu>
	</coral-panel>
</coral-sidebar-layout>

<script></script>

<style>
	html,
	body {
		margin: 0;
	}
	body {
		padding: 20px;
		box-sizing: border-box;
		font-family: Arial, Helvetica, sans-serif;
	}
	a {
		font: 1.2em Arial;
		display: inline-block;
		padding: 10px;
		margin: 4px;
		box-sizing: border-box;
		border-radius: 8px;
		border: 1px solid #eeeeee;
		width: 32%;
		text-align: center;
		vertical-align: middle;
		box-shadow: 0 5px 5px lightgrey;
	}
	.content-title {
		padding-top: 5px;
		padding-bottom: 5px;
		font-size: 14px;
	}
	.main-content {
		flex: 1;
		display: flex;
		flex-direction: column;
	}
	#container {
		height: 400px;
	}
	#grid{
		height: 100%;
	}
	div {
		min-height: 24px;
	}
	hr  {
		margin-top: 15px;
		margin-bottom: 15px;
	}
	#configArea {
		width: 100%;
		padding-top: 15px;
		height: 300px;
		margin-bottom: 8px;
		font-family: monospace;
	}
	#sidebar-content{
		display: flex;
		flex-direction: column;
	}
</style>
```