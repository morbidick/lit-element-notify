import {directive} from "lit-html/lib/directive.js";
import {eventNameForProperty} from "./notify.js";

/**
 * lit-html directive to sync an element property to a child property
 *
 * @param {HTMLElement} element - The parent element
 * @param {string} property - The property name
 * @param {string} [eventName] - Optional event name to sync on, defaults to propertyname-changed
 */
export const sync = directive((element, property, eventName) => (part) => {
    part.setValue(element[property]);

    // mark the committer so the listener is only attached once
    if (!part.syncInitialized) {
        part.syncInitialized = true;

        const notifyingElement = part.committer.element;
        const notifyingProperty = part.committer.name;
        const notifyingEvent = eventName || eventNameForProperty(notifyingProperty);

        notifyingElement.addEventListener(notifyingEvent, (e) => {
            element[property] = e.detail.value;
        });
    }
});

export default sync;
