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

### Subscribe directive

lit-html directive to subscribe an element property to a sibling property, adding two-way binding to lit-element.

```javascript
import { LitElement, html } from '@polymer/lit-element/lit-element.js';
import subscribe from '@morbidick/lit-element-notify/subscribe.js';

class SubscribingElement extends LitElement {
    static get properties() {
        return {
            myProperty: {type: String},
            myProperty2: {type: String},
        };
    }
    render() {
        return html`
            <notifying-element
                token=${subscribe(this, 'myProperty')}
                .anotherProperty=${subscribe(this, 'myProperty2', 'another-attribute-changed')}
            ></notifying-element>`;
    }
}
```
