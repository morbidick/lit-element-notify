/**
 * Returns the event name for the given property.
 * @param  {string}                       name    property name
 * @param  {PropertyDeclaration} options property declaration
 * @return                                event name to fire
 */
export function eventNameForProperty(name, { notify, attribute } = {}) {
    if (notify && typeof notify === 'string') {
        return notify;
    } else if (attribute && typeof attribute === 'string') {
        return `${attribute}-changed`;
    } else {
        return `${name.toLowerCase()}-changed`;
    }
}

// eslint-disable-next-line valid-jsdoc
/**
 * Enables the nofity option for properties to fire change notification events
 *
 * @template TBase
 * @param {Constructor<TBase>} baseElement
 */
export const LitNotify = (baseElement) => class NotifyingElement extends baseElement {
    /**
     * check for changed properties with notify option and fire the events
     */
    update(changedProps) {
        super.update(changedProps);

        for (const prop of changedProps.keys()) {
            const declaration = this.constructor._classProperties.get(prop)
            if (!declaration || !declaration.notify) continue;
            const type = eventNameForProperty(prop, declaration)
            const value = this[prop]
            this.dispatchEvent(new CustomEvent(type, { detail: { value } }));
        }
    }
};

export default LitNotify;
