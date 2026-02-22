declare module "freeice" {
  interface FreeIceOptions {
    stunCount?: number;
    turnCount?: number;
  }

  interface IceServer {
    urls: string | string[];
    username?: string;
    credential?: string;
  }

  function freeice(option?: FreeIceOptions): IceServer[];

  export = freeice;
}