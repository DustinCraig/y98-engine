import {Manager} from './index';
import {Player} from '../player';

export class PlayerManager extends Manager<Player> {
  constructor() {
    super('PlayerManager');
  }
}
