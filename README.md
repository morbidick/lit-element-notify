# Change notification mixin for LitElement

[![npm version](https://img.shields.io/npm/v/@morbidick/lit-element-notify.svg)](https://www.npmjs.com/package/@morbidick/lit-element-notify)

Small mixin for LitElement to get easy change events via the `properties` getter.

## Install

```bash
npm install @morbidick/lit-element-notify
```

## Usage

```javascript
import { LitElement, html } from '@polymer/lit-element/lit-element.js';
import notify from '@morbidick/lit-element-notify/lit-element-notify.js';

class notifyingElement extends notify(LitElement) {
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