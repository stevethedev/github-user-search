import {render} from 'react-dom';
import {App} from "./components/App";

export const create = (element: string | Element | DocumentFragment) => {
  render(App(), getElement(element));
}

document.dispatchEvent(new Event('github-search-loaded'));

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
