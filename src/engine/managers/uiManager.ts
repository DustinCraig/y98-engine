import {Manager} from './index';
import {UIElement} from '../../ui';

export class UIManager extends Manager<UIElement> {
  constructor() {
    super('UIManager');
  }
}
