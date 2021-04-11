import React, { EventHandler, KeyboardEvent, MouseEvent } from 'react';
import styles from './Button.module.css';

interface Props extends ClassProps {
  label: string | JSX.Element;
  onClick: EventHandler<MouseEvent | KeyboardEvent>;
  before?: string | null;
  after?: string | null;
}

interface ClassProps {
  inline?: boolean;
  disabled?: boolean;
  color?: 'blue' | null;
}

const getClasses = ({ inline, disabled, color }: ClassProps): string => {
  const classes: string[] = [styles.button];

  if (inline) {
    classes.push(styles['button--inline']);
  }

  if (disabled) {
    classes.push(styles['button--disabled']);
  }

  if (color === 'blue') {
    classes.push(styles['button--blue']);
  }

  return classes.join(' ');
};

export const Button = ({
  label, onClick, inline, disabled, color, before, after,
}: Props): JSX.Element => (
  <div
    role="button"
    tabIndex={0}
    onClick={disabled ? () => void 0 : onClick}
    data-before={before}
    data-after={after}
    onKeyPress={(event) => (event.key === 'Enter' && !disabled && onClick(event))}
    className={getClasses({ inline, disabled, color })}
  >
    {label}
  </div>
);

Button.defaultProps = {
  inline: false,
  disabled: false,
  color: null,
  before: null,
  after: null,
};
