export type Identifier =
  | {
      email: string;
      phone?: never;
    }
  | {
      email?: never;
      phone: string;
    };

