import {EntityManager} from './entityManager';
import {PlayerManager} from './playerManager';

export abstract class ManagedObject {
  eventListeners: {[listener: string]: (e: any) => any};

  constructor() {
    this.eventListeners = {};
  }

  abstract initialize(): void;

  _addEventListener(listener: string, callback: (event: any) => any) {
    this.eventListeners[listener] = callback;
  }

  _removeEventListener(listener: string) {
    delete this.eventListeners[listener];
  }

  addWindowEventListener(
    listener: keyof WindowEventMap,
    callback: (event: any) => any
  ) {
    this._addEventListener(listener, callback);
    window.addEventListener(listener, callback);
  }

  removeWindowEventListener(
    listener: keyof WindowEventMap,
    callback: (event: any) => any
  ) {
    this._addEventListener(listener, callback);
    window.removeEventListener(listener, callback);
  }

  addDocumentEventListener(
    listener: keyof DocumentEventMap,
    callback: (event: any) => any
  ) {
    this._addEventListener(listener, callback);
    document.addEventListener(listener, callback);
  }

  removeDocumentEventListener(
    listener: string,
    callback: EventListenerOrEventListenerObject
  ) {
    this._removeEventListener(listener);
    document.removeEventListener(listener, callback);
  }
}

export abstract class Manager<T extends ManagedObject> {
  name: string;
  objects: Set<T>;

  protected constructor(name: string) {
    this.name = name;
    this.objects = new Set<T>();
  }

  add(obj: T) {
    obj.initialize();
    this.objects.add(obj);
  }

  remove(obj: T) {
    this.objects.delete(obj);
  }

  has(obj: T) {
    return this.objects.has(obj);
  }
}

export const managers: {
  entityManager: EntityManager;
  playerManager: PlayerManager;
} = {
  entityManager: {} as EntityManager,
  playerManager: {} as PlayerManager,
};
