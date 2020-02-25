import {directive} from "lit-html/lib/directive.js";
import {eventNameForProperty} from "./notify.js";

// eslint-disable-next-line valid-jsdoc
/**
 * Mixin that provides a lit-html directive to sync a property to a child property
 *
 * @template TBase
 * @param {Constructor<TBase>} baseElement
 */
export const LitSync = (baseElement) => class extends baseElement {
    constructor() {
        super();

        /**
         * lit-html directive to sync a property to a child property
         *
         * @param {string} property - The property name
         * @param {string} [eventName] - Optional event name to sync on, defaults to propertyname-changed
         */
        this.sync = directive((property, eventName) => (part) => {
            part.setValue(this[property]);

            // mark the part so the listener is only attached once
            if (!part.syncInitialized) {
                part.syncInitialized = true;

                const notifyingElement = part.committer.element;
                const notifyingProperty = part.committer.name;
                const notifyingEvent = eventName || eventNameForProperty(notifyingProperty);

                notifyingElement.addEventListener(notifyingEvent, (e) => {
                    const oldValue = this[property];
                    this[property] = e.detail.value;
                    if (this.__lookupSetter__(property) === undefined) {
                        this.updated(new Map([[property, oldValue]]));
                    }
                });
            }
        });
    }
}

export default LitSync;
