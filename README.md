# Change notification helpers for LitElement

[![npm version](https://img.shields.io/npm/v/@morbidick/lit-element-notify.svg)](https://www.npmjs.com/package/@morbidick/lit-element-notify)

Small helpers for LitElement to dispatch change notifications and two-way binding to siblings.

## Install

```bash
npm install @morbidick/lit-element-notify
```

## Usage

### Notify mixin

Small mixin for LitElement to get easy change events via the `properties` getter.

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
      anotherProperty: {
        type: String,
        attribute: 'another-attribute',
        notify: true, // fires another-attribute-changed
      },

    };
  }
}
```

### Bind directive

Two way bind a property value via lit-html directive

```javascript
import { LitElement, html } from '@polymer/lit-element/lit-element.js';
import bind from '@morbidick/lit-element-notify/bind.js';

class BindingElement extends LitElement {
    render() {
        return html`
            <notifying-element
                token=${bind(this, 'myProperty')}
                thing=${bind(this, 'customProperty', 'success-event')}
            ></notifying-element>`;
    }
}
```
