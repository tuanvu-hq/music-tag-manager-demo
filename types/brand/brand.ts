// Tells TS not to compile this code.
declare const __brand: unique symbol;

export type Branded<Type, Brand> = Type & {
  readonly [__brand]: Brand;
};
