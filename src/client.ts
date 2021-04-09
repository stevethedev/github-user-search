import { render } from 'react-dom';
import { App } from './components/App';

function getElement(element: unknown): Element | DocumentFragment {
  if (element instanceof DocumentFragment || element instanceof Element) {
    return element;
  }

  if (typeof element !== 'string') {
    throw new Error('Unexpected element provided');
  }

  const result = document.querySelector(element) || document.getElementById(element);
  if (!result) {
    throw new Error(`Could not find element: ${element}`);
  }

  return result;
}

export const create = (element: string | Element | DocumentFragment): void => {
  render(App(), getElement(element));
};
