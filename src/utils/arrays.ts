import { HashMap } from '../types';

export function normalizeArrayOfObjectsByKey<O, K extends keyof O>(
  arr: O[],
  key: string
): [O[K][], HashMap<O>] {
  const obj: HashMap<O> = {};
  const keys: O[K][] = [];

  arr.forEach(item => {
    obj[item[key]] = item;
    keys.push(item[key]);
  });

  return [keys, obj];
}

type ObjectWithPosition = {
  position: number;
};

export function sortArrayOfIdsByPosition<O extends ObjectWithPosition>(
  arr: string[],
  obj: HashMap<O>
) {
  return arr.sort((l, r) => obj[l].position - obj[r].position);
}
