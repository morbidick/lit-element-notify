# Change notification helpers for LitElement

[![npm version](https://img.shields.io/npm/v/@morbidick/lit-element-notify.svg)](https://www.npmjs.com/package/@morbidick/lit-element-notify)

Small helpers for LitElement to dispatch change notifications and two-way binding.

## Install

```bash
npm install @morbidick/lit-element-notify
```

## Notify mixin

Small mixin for LitElement to get easy change events via the `properties` getter.

This mixin adds the `notify` option to the property definition. Similar to the LitElement `attribute` option (which reflects a property to the dom) it fires an event as soon as the property value changes. The event name depends on the following conditions:

1. `notify: true`: the property gets lowercased and `-changed` is appended (note: contrary to PolymerElement and similar to LitElements attribute handling no camelCase to kebap-case conversion is done).
2. the notify option contains a string: `notify: 'success-event` fires an event named `success-event`.
3. `notify: true` is set and the attribute option is a string (`attribute: 'attribute-name`): the attribute name will be suffixed with `-changed`.

The updated value of the property is available in `event.detail.value`.

```javascript
import { LitElement, html } from '@polymer/lit-element/lit-element.js';
import LitNotify from '@morbidick/lit-element-notify/notify.js';

class NotifyingElement extends LitNotify(LitElement) {
  static get properties() {
    return {

      // property names get lowercased and the -changed suffix is added
      token: {
        type: String,
        notify: true, // fires token-changed
      },
      camelCase: {
        type: String,
        notify: true, // fires camelcase-changed
      },

      // an explicit event name can be set
      thing: {
        type: String,
        notify: 'success-event', // fires success-event
      },

      // if an attribute value is set, -changed is appended
      myMessage: {
        type: String,
        attribute: 'my-message',
        notify: true, // fires my-message-changed
      },

    };
  }
}
```

## Subscribe directive

lit-html directive to subscribe an element property to a childs property, adding two-way binding to lit-element. 

### Import

```javascript
import subscribe from '@morbidick/lit-element-notify/subscribe.js';
```

### Usage

The function takes three parameters, the element on which to update, the property to update and third an optional event name on which to update.

* Subscribing to the child property `token` will update `myProperty` when `token-changed` is fired and update `token` when `myProperty` is set.
    ```javascript
    html`<notifying-element .token=${subscribe(this, 'myProperty')}></notifying-element>`;
    ```

* Subscribing to the child property `myMessage` with the event explicitly set to `my-message-changed` (mainly used to map from the camelCase property to the kebap-case event as PolymerElement does by default).
    ```javascript
    html`<notifying-element .myMessage=${subscribe(this, 'myProperty', 'my-message-changed')}></notifying-element>`;
    ```
