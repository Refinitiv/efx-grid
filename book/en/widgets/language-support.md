# Internationalization

Widgets support localization, including translated messages and formatting. In your app, setting your html lang attribute will trigger that language to be applied to widget elements.

```html
<html lang="ja">

</html>
```

Alternatively, setting the lang attribute directly on elements will have the same effect.

> `lang` on an element supersedes the html lang, meaning multiple languages can exist on the same page.

```js
var dialog = document.createElement("column-selection-dialog");
dialog.lang = "ja";
```

Currently, the following languages are supported:

|     **Language**    | **lang value** |
|---------------------|----------------|
| English (default)   |       en       |
| Japanese            |       ja       |
| German              |       de       |
| Simplified Chinese  |       zh       |
| Traditional Chinese |     zh-Hant    |

> If an unsupported language is set, English is the default fallback.

# Element Framework

More details about localization is avaiable on [Internationalization](https://ui.refinitiv.com/intl/internationalization)