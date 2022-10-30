export function removeItemAtIndex<TItem>(array: TItem[], index: number) {
  return [...array.slice(0, index), ...array.slice(index + 1)];
}

export function insertItemAtIndex<TItem>(
  array: TItem[],
  item: TItem,
  index: number
) {
  return [...array.slice(0, index), item, ...array.slice(index)];
}

export const moveItem = <TItem>(
  array: TItem[],
  from: number,
  to: number
): TItem[] => {
  if (from >= array.length) {
    return array;
  }
  const item = array[from];
  return insertItemAtIndex(removeItemAtIndex(array, from), item, to);
};
