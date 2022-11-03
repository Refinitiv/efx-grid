# Grid

Grid has been created to handle a large number of rows. It achieves high performance by utilizing a **row virtualization** technique, and all of the display logics and layouts are calculated programmatically. So, it lacks the flexibility of managing the layout when compared to the [native table](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table). Grid can be viewed to have 3 layers of controls. The outer layer is EFX Grid, which provides high level configuration through HTML properties and attributes. The middle layer is API instance, which provides most runtime interactions through JavaScript methods. The inner layer is Core Grid, which provides internal interaction with UI elements.

## Installation

EFX Grid element and extensions are published under single package.

```sh
npm install @refinitiv-ui/efx-grid
```

The element is required theme to instantiate itself in the app. Refinitiv's design system is called Halo theme and you can install it from npm command.

```sh
npm install @refinitiv-ui/halo-theme
```

## Setup guide

Use `import` syntax to import the Grid and theme into your app.

```javascript
// import element and its Halo dark theme
import '@refinitiv-ui/efx-grid';

import '@refinitiv-ui/halo-theme/dark/imports/native-elements'; // import native styles for typography, css variables, etc.
import '@refinitiv-ui/efx-grid/themes/halo/dark';
```

Now, you can use Grid in your app.

```html
<efx-grid></efx-grid>
```

## License for the Grid

Please see the license [here](./license.html).

## License for the Halo Theme
The font “Proxima Nova Fin” shall only be used within Refinitiv products or services. The copyright owner must approve any use of such font outside of Refinitiv products or services, which may be subject to a fee. Please see the license [here](https://www.fontspring.com/lic/fontspring/webfont#license_text).
