import {Manager} from './index';
import {Entity} from '../entity';

export class EntityManager extends Manager<Entity> {
  constructor() {
    super('EntityManager');
  }
}
