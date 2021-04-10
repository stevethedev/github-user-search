import React, { ChangeEventHandler, KeyboardEventHandler, useState } from 'react';
import styles from './SearchForm.module.css';

export type OnSearchHandler = (text: string) => void;
export type OnChangeHandler = (text: string) => void;

export interface Props {
  onSubmit?: OnSearchHandler;
  onChange?: OnChangeHandler;
  value?: string | null;
}

export const SearchForm = (
  { onSubmit, onChange: onChangeHandler, value: preValue }: Props,
): JSX.Element => {
  const [value, setValue] = useState(preValue ?? '');
  const onKeyPress: KeyboardEventHandler = (event) => void (event.key === 'Enter' ? onSubmit?.(value) : null);
  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const newValue = event.target.value ?? '';
    onChangeHandler?.(newValue);
    setValue(newValue);
  };

  return (
    <div className={styles['search-form']}>
      <input
        className={styles['search-form__input']}
        onKeyPress={onKeyPress}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

SearchForm.defaultProps = {
  onSubmit: () => void 0,
  onChange: () => void 0,
  value: '',
};