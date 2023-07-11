export class GenericUtil {

  static getStringifyObj(obj: any) {
    return JSON.stringify(obj);
  }

  static parseObj(obj: any) {
    return JSON.parse(obj);
  }
}
