import { search } from '../api/user';
import { useToken } from './token';
import { useSearchText } from './search-text';
import { useSearchCount } from './search-count';
import { useSearchCursor } from './search-cursor';
import { useSearchResults } from './search-results';

export type SearchSubmit = (text: string | null) => Promise<void>;

export const useSearchSubmit = (): SearchSubmit => {
  const [token] = useToken();
  const [searchText, setSearchText] = useSearchText();
  const [, setSearchCount] = useSearchCount();
  const [searchCursor, setSearchCursor] = useSearchCursor();
  const [, setSearchResults] = useSearchResults();

  return async (text) => {
    setSearchText(text);

    if (!text) {
      return;
    }

    const isContinuedQuery = text === searchText;

    if (!isContinuedQuery) {
      setSearchCount(0);
      setSearchResults([]);
      setSearchCursor(null);
    }

    const after = isContinuedQuery ? searchCursor : null;
    const results = await search(token, { text, after });
    if (!results) {
      return;
    }

    setSearchCount(results.count);
    setSearchCursor(results.cursor);
    // putSearchResults(results.users);

    // Cursor Logic:
    // 1. Select way more cursors than I need
    // 2. Pick out the relevant page-start IDs
    // 3. Register empty pages for each page-start ID if it doesn't yet exist
  };
};
