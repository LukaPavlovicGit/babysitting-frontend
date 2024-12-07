
declare module "*.css" {
    interface IClassNames {
      [className: string]: string;
    }
  
    const classNames: IClassNames;
    export = classNames;
  }
  
  declare module "*.scss" {
    interface IClassNames {
      [className: string]: string;
    }
  
    const classNames: IClassNames;
    export = classNames;
  }
  
  declare module "*.svg" {
    const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    export default content;
  }
  
  declare module "*.png" {
    const content: React.FunctionComponent<React.ImgHTMLAttributes<HTMLImageElement>>;
    export default content;
  }
  
  declare module "*.gif" {
    const content: string;
    export default content;
  }
  
  declare class Stringified<T> extends String {
    private ___stringified: T;
  }
  
  declare const VERSION_STRING: string;
  
  interface JSON {
    stringify<T>(
      value: T,
      replacer?: (key: string, value: any) => any,
      space?: string | number,
    ): string & Stringified<T>;
    parse<T>(text: Stringified<T>, reviver?: (key: any, value: any) => any): T;
    parse(text: string | any, reviver?: (key: any, value: any) => any): any;
  }
  
  interface Window {
    Cypress: any;
    store: any;
  }
  
  type ObjectKeys<T> = T extends object
    ? (keyof T)[]
    : T extends number
      ? []
      : T extends Array<any> | string
        ? string[]
        : any;
  
  interface ObjectConstructor {
    keys<T>(o: T): ObjectKeys<T>;
  }
  