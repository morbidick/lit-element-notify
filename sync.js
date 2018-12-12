import {directive} from "lit-html/lib/directive.js";
import {eventNameForProperty} from "./notify.js";

/**
 * Mixin that provides a lit-html directive to sync a property to a child property
 *
 * @param {LitElement} baseElement - the LitElement to extend
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
                    this[property] = e.detail.value;
                });
            }
        });
    }
}

export default LitSync;
