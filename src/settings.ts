import {
  MOVE_BACKWARD,
  MOVE_FORWARD,
  MOVE_LEFT,
  MOVE_RIGHT,
  SETTINGS_KEY,
} from './engine/constants';

const defaultKeybinds = {
  [MOVE_FORWARD]: 'w',
  [MOVE_LEFT]: 'a',
  [MOVE_RIGHT]: 'd',
  [MOVE_BACKWARD]: 's',
};

export class Settings {
  private static _settings: {[key: string]: string} | undefined = undefined;

  public static initialize() {
    const settingsString = localStorage.getItem(SETTINGS_KEY);
    if (settingsString) this._settings = JSON.parse(settingsString);
    else this._settings = {...defaultKeybinds};
  }

  public static getSettings() {
    if (this._settings) return this._settings;
    const settingsString = localStorage.getItem(SETTINGS_KEY);
    if (!settingsString) {
      this._settings = {...defaultKeybinds};
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(this._settings));
    } else {
      this._settings = JSON.parse(settingsString);
    }
    return this._settings ?? {};
  }

  public static getSetting(settingName: string) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return Settings.getSettings()[settingName];
  }

  public static setSetting(settingName: string, value: string) {
    // TODO: All events tied to this setting will have to be updated
    if (!this._settings) this._settings = {...defaultKeybinds};
    this._settings[settingName] = value;
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(this._settings));
  }
}
