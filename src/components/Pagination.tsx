import React from 'react';
import { bound, range } from '../util/math';
import { Button } from './Button';
import styles from './Pagination.module.css';

interface Props {
  start: number;
  end: number;
  current: number;
  buffer: number;
  onSelected: (value: number) => void;
}

const getButtonRange = (start: number, current: number, end: number, buffer: number): number[] => {
  const realCurrent = bound(current, start + buffer, end - buffer);
  return range(start, end).filter((i) => {
    // Eliminate if out-of-bounds
    if (i < start || i > end) {
      return false;
    }

    // Eliminate the items between the end of the left-array and start of middle-array
    if (i > start + buffer && i < realCurrent - buffer) {
      return false;
    }

    // Eliminate the items between the end of the middle-array and the start of the right-array
    return !(i < end - buffer && i > realCurrent + buffer);
  });
};

export const Pagination = ({
  start, end, current, buffer, onSelected,
}: Props): JSX.Element => {
  const buttonRange = getButtonRange(start, current, end, buffer);

  return (
    <section className={styles.pagination}>
      <Button label="Previous" before="<" onClick={() => onSelected(current - 1)} disabled={current <= 1} inline />
      {buttonRange.reduce<JSX.Element[]>(
        (acc, page, i, arr) => {
          acc.push(<Button
            key={page}
            label={`${page}`}
            onClick={() => onSelected(page)}
            inline
            color={page === current ? 'blue' : null}
          />);
          if (i !== arr.length - 1 && page !== arr[i + 1] - 1) {
            acc.push(<span key={page + 1} className={styles.pagination__spreader} />);
          }
          return acc;
        },
        [],
      )}
      <Button label="Next" after=">" onClick={() => onSelected(current + 1)} disabled={current >= end - 1} inline />
    </section>
  );
};
