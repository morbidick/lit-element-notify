import { PropertyDeclaration, LitElement, UpdatingElement } from 'lit-element';

type Constructor<T = LitElement> = new (...args: any[]) => T;

interface AugmentedPropertyDeclaration extends PropertyDeclaration {
  /** When true will notify. Pass a string to define the event name to fire. */
  notify: string|Boolean
}

declare class NotifyingElement {
  static createProperty(name: string, options: AugmentedPropertyDeclaration): void
}

export function LitNotify<T extends UpdatingElement>(baseElement: Constructor<T>): T & NotifyingElement
