/**
 * @file GitHub Cursor Codec
 *
 * Encode and decode the GitHub cursor strings to a numerical format. The GitHub cursors are
 * base-64 encoded strings of the form <code>"cursor:${n}"</code> where <code>n &ge; 0</code>.
 * Note that <code>n = 0</code> is a special case that is equivalent to not passing a cursor
 * value, and has the same behavior as not passing a cursor.
 */

import { isNumber } from '../util/types';

/**
 * A zero-cursor that can be used as a sensible default starting value.
 */
export const CURSOR_ZERO = btoa('cursor:0');

/**
 * Encodes a numerical index into a GitHub cursor value.
 * @param index
 */
export const encode = (index: number | null | undefined): string | null => {
  if (!isNumber(index) || !Number.isSafeInteger(index) || index < 0) {
    return null;
  }

  return btoa(`cursor:${index}`);
};

/**
 * Decodes a numerical index from a GitHub cursor value.
 * @param cursor
 */
export const decode = (cursor: string): number | null => {
  const indexString = atob(cursor).match(/^cursor:(\d+)$/)?.[1];

  if (indexString === null) {
    return null;
  }

  const indexNumber = Number(indexString);
  if (Number.isNaN(indexNumber)) {
    return null;
  }

  return indexNumber;
};
