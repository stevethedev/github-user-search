import type { EventHandler, KeyboardEvent, MouseEvent } from 'react';
import React from 'react';
import styles from './Button.module.css';

interface Props extends ClassProps {
  label: string | JSX.Element;
  onClick?: EventHandler<MouseEvent | KeyboardEvent>;
  before?: string | null;
  after?: string | null;
  href?: string | null;
}

interface ClassProps {
  /** Display the button inline instead of as a block */
  inline?: 'block' | 'text' | 'flex';

  /** Display the button with link behaviors */
  link?: boolean;

  /** Disable the button so it does nothing */
  disabled?: boolean;

  /** Color the button */
  color?: 'blue' | null;

  /** Omit the border on the button */
  borderless?: boolean;

  /** Invert the foreground and background colors */
  invert?: boolean;
}

const getClasses = ({
  inline, disabled, color, borderless, link, invert,
}: ClassProps): string => {
  const classes: string[] = [styles.button];

  if (inline === 'block') {
    classes.push(styles['button--inline-block']);
  }

  if (inline === 'text') {
    classes.push(styles['button--inline-text']);
  }

  if (inline === 'flex') {
    classes.push(styles['button--inline-flex']);
  }

  if (disabled) {
    classes.push(styles['button--disabled']);
  }

  if (color === 'blue') {
    classes.push(styles['button--blue']);
  }

  if (borderless) {
    classes.push(styles['button--borderless']);
  }

  if (link) {
    classes.push(styles['button--link']);
  }

  if (invert) {
    classes.push(styles['button--color-invert']);
  }

  return classes.join(' ');
};

export const Button = ({
  label, onClick, inline, disabled, color, before, after, borderless, link, invert, href,
}: Props): JSX.Element => {
  const button = (
    <div
      role="button"
      tabIndex={0}
      onClick={disabled ? () => void 0 : onClick}
      data-before={before}
      data-after={after}
      onKeyPress={(event: KeyboardEvent) => (event.key === 'Enter' && !disabled && onClick?.(event))}
      className={getClasses({
        inline, disabled, color, borderless, link, invert,
      })}
    >
      {label}
    </div>
  );

  return href
    ? (<a className={styles['button-href']} target="_blank" href={href} rel="noreferrer">{button}</a>)
    : (button);
};

Button.defaultProps = {
  onClick: () => void 0,
  inline: false,
  link: false,
  disabled: false,
  color: null,
  before: null,
  after: null,
  borderless: false,
  invert: false,
  href: null,
};
