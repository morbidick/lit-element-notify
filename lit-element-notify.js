export const LitNotify = (baseElement) => class extends baseElement {
    /**
     * Extend the LitElement `createProperty` method to map properties to events
     */
    static createProperty(name, options) {
        super.createProperty(name, options);

        if (!this.hasOwnProperty('_propertyEventMap')) {
            this._propertyEventMap = new Map();
        }

        if (options.notify) {
            this._propertyEventMap.set(name, this._eventNameForProperty(name, options));
        }
    }

    /**
     * check for changed properties with notify option and fire the events
     */
    update(changedProps) {
        super.update(changedProps);

        if (!this.constructor._propertyEventMap) {
            return;
        }

        for (const [eventProp, eventName] of this.constructor._propertyEventMap.entries()) {
            if (changedProps.has(eventProp)) {
                this.dispatchEvent(new CustomEvent(eventName, {
                    detail: {
                        value: this[eventProp],
                    },
                    bubbles: false,
                    composed: true,
                }));
            }
        }
    }

    /**
     * Returns the event name for the given property.
     */
    static _eventNameForProperty(name, options) {
        if (options.notify && typeof options.notify === 'string') {
            return options.notify;
        }

        if (options.attribute && typeof options.attribute === 'string') {
            return `${options.attribute}-changed`;
        }

        return `${name.toLowerCase()}-changed`;
    }
};

export default LitNotify;
