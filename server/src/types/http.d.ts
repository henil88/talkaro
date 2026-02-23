declare module "http" {
  interface IncomingMessage {
    user: {
      _id: string;
    };
  }
}
