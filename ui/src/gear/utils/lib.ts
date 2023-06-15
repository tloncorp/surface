function chunk<T>(arr: T[], size: number): T[][] {
  let chunk: T[] = [];
  let newArray = [chunk];

  for (let i = 0; i < arr.length; i++) {
    if (chunk.length < size) {
      chunk.push(arr[i]);
    } else {
      chunk = [arr[i]];
      newArray.push(chunk);
    }
  }

  return newArray;
}

export function decToUd(str: string): string {
  const transform = chunk(str.split('').reverse(), 3)
    .map(group => group.reverse().join(''))
    .reverse()
    .join('.');
  return transform.replace(/^[0\.]+/g, '');
}

export function udToDec(ud: string): string {
  return ud.replace(/\./g, '');
}

