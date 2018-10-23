import {directive} from "lit-html/lib/directive.js";
import {eventNameForProperty} from "./notify.js";

/**
 * lit-html directive to bind an element property to a sibling property
 *
 * @param {HTMLElement} element - The element to update
 * @param {string} property - The property to bind to
 * @param {string} [eventName] - Optional event name to bind to, defaults to *-changed
 */
export const bind = (element, property, eventName) => directive((part) => {
    part.setValue(element[property]);

    // mark the committer so the listener is only attached once
    if (!part.committer.bindInitialized) {
        part.committer.bindInitialized = true;

        const notifyingElement = part.committer.element;
        const notifyingProperty = part.committer.name;
        const notifyingEvent = eventName || eventNameForProperty(notifyingProperty);

        notifyingElement.addEventListener(notifyingEvent, () => {
            element[property] = notifyingElement[notifyingProperty];
        });
    }
});

export default bind;
