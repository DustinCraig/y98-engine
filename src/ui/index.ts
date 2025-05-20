import {STYLES} from './styles';
import {vec2} from 'gl-matrix';
import {ManagedObject} from '../engine/managers';

export class UIElement extends ManagedObject {
  visible: boolean;
  position: vec2;
  text: string;
  type: keyof typeof STYLES;
  id: string;

  constructor(
    id: string,
    type: keyof typeof STYLES,
    position?: vec2,
    text?: string
  ) {
    super();
    this.id = `Y98-${id}`;
    this.visible = false;
    this.type = type;
    this.position = position ?? vec2.create();
    this.text = text ?? '';
  }

  initialize(): void {}

  private injectBaseStyles() {}
}
