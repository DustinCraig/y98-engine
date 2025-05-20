import {SETTINGS, SETTINGS_KEY} from './engine/constants';

const defaultSettings = {
  [SETTINGS.MOVE_FORWARD]: 'w',
  [SETTINGS.MOVE_LEFT]: 'a',
  [SETTINGS.MOVE_RIGHT]: 'd',
  [SETTINGS.MOVE_BACKWARD]: 's',
  [SETTINGS.MOUSE_MOVE]: SETTINGS.MOUSE_SPEED,
};

export class Settings {
  private static _settings: {[key: string]: any} | undefined = undefined;

  public static initialize() {
    this._settings = Settings.getSettings();
  }

  public static getSettings() {
    if (this._settings) return this._settings;
    const settingsString = localStorage.getItem(SETTINGS_KEY);
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

  public static setSetting(settingName: keyof typeof SETTINGS, value: string) {
    // TODO: All events tied to this setting will have to be updated
    if (!this._settings) this._settings = {...defaultSettings};
    this._settings[settingName] = value;
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(this._settings));
  }
}
