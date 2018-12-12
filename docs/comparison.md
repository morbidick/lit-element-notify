# Comparison

This section tries to make the individual use cases clearer.

## Firing an event on property change

### PolymerElement

```js
class NotifyingElement extends PolymerElement {
    static get properties() {
        return {
            message: {
                type: String,
                notify: true
}}}}
```

### LitElement

```js
class NotifyingElement extends LitElement {
    static get properties() {
        return {
            message: {
                type: String
    }}}
    update(props) {
        super.update(props);
        if (props.has('message')) {
            this.dispatchEvent(new CustomEvent('message-changed', {
                detail: {
                    value: this.message,
                },
                bubbles: false,
                composed: true
        }));
    }
}
```

### LitElement with LitNotify mixin

```js
class NotifyingElement extends LitNotify(LitElement) {
    static get properties() {
        return {
            message: {
                type: String,
                notify: true
}}}}
```

mapping a camelCase property to a kebap-case event (as PolymerElement does automaticly)

```js
class NotifyingElement extends LitNotify(LitElement) {
    static get properties() {
        return {
            myMessage: {
                type: String,
                notify: 'my-message-changed'
}}}}
```

## Two-way data binding

Synchronizing a parent property with a childs property.

### PolymerElement*

```js
html`<element value="{{myProperty}}></element>
```

### Lit Element - upwards binding only

```js
html`<element @value-changed=${(e) => this.myProperty = e.detail.value}></element>`
```

### LitElement*

```js
html`<element .value=${this.myProperty} @value-changed=${(e) => this.myProperty = e.detail.value}></element>`
```

### LitElement with sync directive*

```js
html`<element .value=${this.sync('myProperty')}></element>`
```

<sub>* two-way binding so also updating the child when the parent property changes</sub>
