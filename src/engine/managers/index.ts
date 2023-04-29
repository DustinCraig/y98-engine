import {EntityManager} from './entityManager';

export abstract class ManagedObject {
  abstract initialize(): void;
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

export const managers: {entityManager: EntityManager} = {
  entityManager: {} as EntityManager,
};
