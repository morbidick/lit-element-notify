import {directive} from "lit-html/lib/directive.js";
import {eventNameForProperty} from "./notify.js";

/**
 * lit-html directive to subscribe an element property to a sibling property
 *
 * @param {HTMLElement} element - The element to update
 * @param {string} property - The property to update on change
 * @param {string} [eventName] - Optional event name to subscribe to, defaults to propertyname-changed
 */
export const subscribe = (element, property, eventName) => directive((part) => {
    part.setValue(element[property]);

    // mark the committer so the listener is only attached once
    if (!part.subscribeInitialized) {
        part.subscribeInitialized = true;

        const notifyingElement = part.committer.element;
        const notifyingProperty = part.committer.name;
        const notifyingEvent = eventName || eventNameForProperty(notifyingProperty);

        notifyingElement.addEventListener(notifyingEvent, (e) => {
            element[property] = e.detail.value;
        });
    }
});

export default subscribe;
