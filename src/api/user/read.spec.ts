import { mockToken } from '../request';
import { read } from './read';
import createSpy = jasmine.createSpy;

it('passes the query parameters to the graphql client', async () => {
  const login = 'My Username' as const;

  const spy = createSpy();
  const token = mockToken(spy);

  await read(token, { login });

  expect(spy)
    .toHaveBeenCalledWith(
      expect.stringMatching(/.*/),
      expect.objectContaining({ login }),
    );
});

it('parses invalid responses to "null"', async () => {
  const login = 'My Username' as const;

  const spy = createSpy()
    .and
    .callFake(async () => ({}));
  const token = mockToken(spy);

  const result = await read(token, { login });

  expect(result)
    .toEqual({
      user: null,
      organizations: [],
      repositories: [],
    });
});

it('parses the response into a usable format', async () => {
  const login = 'My Username' as const;

  const spy = createSpy()
    .and
    .callFake(async () => ({
      user: {
        id: 'foo',
        login: 'bar',
        organizations: {
          nodes: [
            { id: 'org' },
          ],
        },
        pinnedItems: {
          totalCount: 1,
          repositories: [
            { name: 'big repo', id: 'repo' },
          ],
        },
      },
    }));
  const token = mockToken(spy);

  const result = await read(token, { login });

  expect(result)
    .toEqual({
      user: {
        id: 'foo',
        login: 'bar',
        organizations: {
          totalCount: 0,
          ids: ['org'],
        },
        pinnableItems: {
          totalCount: 0,
          ids: [],
        },
        pinnedItems: {
          totalCount: 1,
          ids: ['repo'],
        },
      },
      organizations: [{ id: 'org' }],
      repositories: [{
        id: 'repo',
        languages: [],
        name: 'big repo',
        resourcePath: 'big repo',
      }],
    });

  expect(spy)
    .toHaveBeenCalledWith(
      expect.stringMatching(/.*/),
      expect.objectContaining({ login }),
    );
});
