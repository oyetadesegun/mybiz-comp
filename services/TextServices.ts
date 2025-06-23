import { titleCase } from 'title-case';

export function titleCaseSpecialDelimiter(str: string, delimiter: string) {
  return titleCase(
    str,
    { wordSeparators: new Set([delimiter]) },
  ).replace(new RegExp(`\\${delimiter}`, 'g'), ' ');
}

export function titleCaseUnderscoreDash(str: string) {
  return titleCase(
    str,
    { wordSeparators: new Set(['_', '-']) },
  ).replace(/_/g, ' ').replace(/-/g, ' ');
}
