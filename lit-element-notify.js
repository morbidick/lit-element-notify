export const notify = (baseElement) => class extends baseElement {
    constructor() {
        super();

        this._propertyEventMap = new Map();
        const props = this.constructor.properties;
      
        for (const prop of Object.getOwnPropertyNames(props)) {
            const config = props[prop];
            if (config.notify) {
                this._propertyEventMap.set(prop, this.constructor._eventName(prop, config));
            }
        }
    }

    update(props) {
        super.update(props);

        for (const [eventProp, eventName] of this._propertyEventMap.entries()) {
            if (props.has(eventProp)) {
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

    static _eventName(property, config) {
        if (config.notify && typeof config.notify === 'string')
            return config.notify;

        if (config.attribute && typeof config.attribute === 'string')
            return `${config.attribute}-changed`;

        return `${property.toLowerCase()}-changed`;
    }
};

export default notify;