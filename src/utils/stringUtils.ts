export function isEmptyOrSpaces(str: string) {
  return str === null || str.match(/^ *$/) !== null;
}
