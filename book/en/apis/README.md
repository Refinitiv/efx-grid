# Overview

Grid API documents consist of `Core` and `Real-time Grid` libraries.
In this documents, you can find type definitions, methods and events for each class object.

- `efx-grid` is also a custom element which wraps [Real-time Grid](rt_grid/Grid.md), providing an easy way to display real-time data in a tabular format. It allows you to create list of multiple instruments with multiple real-time and fundamentals columns.
    - To initialize the element, use `config` property to define all the options. Available options are listed in the [typeDef section](rt_grid/Grid.html#~GridOptions).
    - The `api` property is actually a [Real-time Grid](rt_grid/Grid.md) instance. The property will not be available immediately after page loaded so subsequence `api` executions should start inside or after `configured` event.
    - For more internal APIs, use `api.getCoreGrid()` method. The method returns [Core](core/Grid.md) instance.
- [Real-time Grid](rt_grid/Grid.md) is built on top of `Core` with JET's Quotes support, providing an easy way to display real-time data in a tabular format.
- [Core](core/Grid.md) is a core engine of grid written in Javascript. It can be accessed from Real-time Grid through `getCoreGrid()` method. 

 > If you are looking for usage or how it looks like checkout [Usage Guide Document](../).

## Core APIs

- [Cell](core/Cell.md)
- [CellSpans](core/CellSpans.md)
- [ColumnStats](core/ColumnStats.md)
- [DataCache](core/DataCache.md)
- [DataTable](core/DataTable.md)
- [DataView](core/DataView.md)
- [DragAndDropTitlePlugin](core/DragAndDropTitlePlugin.md)
- [ElementWrapper](core/ElementWrapper.md)
- [EventDispatcher](core/EventDispatcher.md)
- [Grid](core/Grid.md)
- [HScrollbar](core/HScrollbar.md)
- [ILayoutGrid](core/ILayoutGrid.md)
- [LayoutGrid](core/LayoutGrid.md)
- [Scrollbar](core/Scrollbar.md)
- [SectionSettings](core/SectionSettings.md)
- [Segment](core/Segment.md)
- [SegmentCollection](core/SegmentCollection.md)
- [SortableTitlePlugin](core/SortableTitlePlugin.md)
- [VScrollbar](core/VScrollbar.md)


## Realtime Grid APIS

- [ColumnDefinition](rt_grid/ColumnDefinition.md)
- [Grid](rt_grid/Grid.md)
- [RowDefinition](rt_grid/RowDefinition.md)

