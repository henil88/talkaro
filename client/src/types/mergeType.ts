type Id<T> = T extends infer S ? { [K in keyof S]: S[K] } : never;

export type Merge<T, U> = Id<Omit<T, keyof U> & U>;