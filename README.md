# Change notification helpers for LitElement

[![npm version](https://img.shields.io/npm/v/@morbidick/lit-element-notify.svg)](https://www.npmjs.com/package/@morbidick/lit-element-notify)

Small helpers for LitElement to dispatch change notifications and two-way binding. For a comparison to PolymerElement and pure LitElement see [comparison section](docs/comparison.md) in the docs.

## Install

```bash
npm install @morbidick/lit-element-notify
```

## Notify mixin

Small mixin for LitElement to get easy change events via the `properties` getter.

This mixin adds the `notify` option to the property definition. Similar to the LitElement `attribute` option (which reflects a property to the dom) it fires an event as soon as the property value changes. The event name depends on the following conditions:

1. `notify: true`: the property gets lowercased and `-changed` is appended (note: contrary to PolymerElement and similar to LitElements attribute handling no camelCase to kebap-case conversion is done).
2. the notify option contains a string: `notify: 'success-event'` fires an event named `success-event`.
3. `notify: true` is set and the attribute option is a string (`attribute: 'attribute-name'`): the attribute name will be suffixed with `-changed`.

The updated value of the property is available in `event.detail.value`.

```javascript
import { LitElement, html } from 'lit-element';
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

## Sync directive

lit-html directive to synchronize an element property to a childs property, adding two-way binding to lit-element.
The directive takes two parameters, the property name and an optional event name on which to sync.

### Usage

```javascript
import { LitElement, html } from 'lit-element';
import LitSync from '@morbidick/lit-element-notify/sync.js';

class SyncElement extends LitSync(LitElement) {

    // Syncing the child property `token` with the parent property `myProperty` when `token-changed`
    // is fired or `myProperty` set.
    render() { return html`
        <notifying-element .token=${this.sync('myProperty')}></notifying-element>
    `}

    // Syncing the child property `myMessage` with the event explicitly set to `my-message-changed` 
    // (mainly used to map from the camelCase property to the kebap-case event as PolymerElement does).
    render() { return html`
        <notifying-element .myMessage=${this.sync('myProperty', 'my-message-changed')}></notifying-element>
    `}

}
```
