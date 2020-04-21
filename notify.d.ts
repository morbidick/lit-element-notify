import { LitElement, UpdatingElement } from 'lit-element';

type Constructor<T = LitElement> = new (...args: any[]) => T;

declare module 'lit-element/lib/updating-element' {
  export interface PropertyDeclaration {
    /** When true will notify. Pass a string to define the event name to fire. */
    notify?: string|Boolean
  }
}

export function LitNotify<T extends Constructor<UpdatingElement>>(baseElement: T): T
