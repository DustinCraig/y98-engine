import {
  MOUSE_SPEED,
  MOVE_BACKWARD,
  MOVE_FORWARD,
  MOVE_LEFT,
  MOVE_RIGHT,
  SETTINGS_KEY,
} from './engine/constants';

const defaultSettings = {
  [MOVE_FORWARD]: 'w',
  [MOVE_LEFT]: 'a',
  [MOVE_RIGHT]: 'd',
  [MOVE_BACKWARD]: 's',
  MOUSE_SPEED,
};

export class Settings {
  private static _settings: {[key: string]: string | number} | undefined =
    undefined;

  public static initialize() {
    this._settings = Settings.getSettings();
  }

  public static getSettings() {
    if (this._settings) return this._settings;
    const settingsString = localStorage.getItem(SETTINGS_KEY);
    console.log('str ', settingsString);
    if (!settingsString) {
      this._settings = {...defaultSettings};
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
    if (!this._settings) this._settings = {...defaultSettings};
    this._settings[settingName] = value;
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(this._settings));
  }
}
