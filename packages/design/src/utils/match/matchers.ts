import { displayDate, displayDateTime } from 'shared/services/loc';
import { MatchCallback } from './match';

export function dateMatcher<T>(
  datePropNames: (keyof T & string)[]
): MatchCallback<T> {
  return (targetValue, searchValue, propName) => {
    searchValue = searchValue.toLocaleLowerCase();
    if (datePropNames.includes(propName)) {
      return displayDate(targetValue).toLocaleLowerCase().includes(searchValue);
    }
  };
}

export function dateTimeMatcher<T>(
  dateTimePropNames: (keyof T & string)[]
): MatchCallback<T> {
  return (targetValue, searchValue, propName) => {
    searchValue = searchValue.toLocaleLowerCase();
    if (dateTimePropNames.includes(propName)) {
      return displayDateTime(targetValue)
        .toLocaleLowerCase()
        .includes(searchValue);
    }
  };
}
