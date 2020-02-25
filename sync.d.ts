import { LitElement, UpdatingElement } from 'lit-element';

type Constructor<T = LitElement> = new (...args: any[]) => T;

declare class SyncElement {
  sync(property: string, eventName?: string): void
}

export function LitSync<T extends UpdatingElement>(baseElement: Constructor<T>): T & SyncElement
