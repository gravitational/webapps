import { displayDate, displayDateTime } from 'shared/services/loc';
import { MatchCallback } from './match';

export const dateMatcher =
  <T>(datePropNames: (keyof T & string)[]): MatchCallback<T> =>
  (targetValue, searchValue, propName) => {
    if (datePropNames.includes(propName)) {
      return displayDate(targetValue).toLocaleLowerCase().includes(searchValue);
    }
  };

export const dateTimeMatcher =
  <T>(dateTimePropNames: (keyof T & string)[]): MatchCallback<T> =>
  (targetValue, searchValue, propName) => {
    if (dateTimePropNames.includes(propName)) {
      return displayDateTime(targetValue)
        .toLocaleLowerCase()
        .includes(searchValue);
    }
  };
