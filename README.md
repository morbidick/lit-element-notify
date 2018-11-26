# Change notification helpers for LitElement

[![npm version](https://img.shields.io/npm/v/@morbidick/lit-element-notify.svg)](https://www.npmjs.com/package/@morbidick/lit-element-notify)

Small helpers for LitElement to dispatch change notifications and two-way binding.

## Install

```bash
npm install @morbidick/lit-element-notify
```

## Usage

### Notify mixin

Small mixin for LitElement to get easy change events via the `properties` getter.

This mixin adds the `notify` option to the property definition. Similar to the LitElement `attribute` option (which reflects a property to the dom) it fires an event as soon as the property value changes. The event name depends on the following conditions:

0. `notify: true`: the property gets lowercased and `-changed` is appended (note: contrary to PolymerElement and similar to LitElements attribute handling no camelCase to kebap-case conversion is done)
0. the notify option contains a string: `notify: 'success-event` fires an event named `success-event`
0. `notify: true` is set and the attribute option is a string (`attribute: 'attribute-name`): the attribute name will be suffixed with `-changed`

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

### Subscribe directive

lit-html directive to subscribe an element property to a childs property, adding two-way binding to lit-element. The function takes three parameters:

1. the element on which the property will be updated
2. the element property name to update
3. (optional) the childss event name to subscribe to, by default the property name will be lowercased and suffixed with `-changed` (main use case is the conversion from the camelCase property to the kebap-case event as PolymerElement does by default)

The element property will be updated to the `event.detail.value` supplied by the childs element.

```javascript
import { LitElement, html } from '@polymer/lit-element/lit-element.js';
import subscribe from '@morbidick/lit-element-notify/subscribe.js';

class SubscribingElement extends LitElement {
    static get properties() {
        return {
            myProperty: {type: String},
        };
    }
```

### Subscribing to the child property `token` will update `myProperty` when `token-changed` is fired and update `token` when `myProperty` is set

```javascript
    render() {
        return html`
            <notifying-element .token=${subscribe(this, 'myProperty')}></notifying-element>`;
    }
```

### Subscribing to the child property `myMessage` with the event explicitly set to `my-message-changed`

```
    render() {
        return html`
            <notifying-element .myMessage=${subscribe(this, 'myProperty', 'my-message-changed')}></notifying-element>`;
    }
```
