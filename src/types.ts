export type Id = string;

export type HashMap<T> = { [id: string]: T };

export type Without<T, K> = Pick<T, Exclude<keyof T, K>>;
