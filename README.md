# GitHub Search

This TypeScript project provides a basic reimplementation of Github's Search
feature using the public API without any authentication steps to be performed
by the user.

## Technical Decisions

1. TypeScript instead of JavaScript
2. React for the visualization library
3. Redux for the data-store (Flux pattern)
4. WebPack to bring it all together
5. Primarily targeting Firefox
6. Build the auth token into the source, but keep it out of source-control

## Capabilities

- [X] As a user, I can search and see a paginated list of results.
- [X] As a user, I can navigate through the next and previous pages of the
      paginated results.
- [X] As a user, I see the total count of search results.
- [ ] As a user, I see notable information for each search result,
      such as the description, star/follower count, profile pictures, etc.
- [ ] As a user, I can select a search result and be taken to the applicable
      page on github.com API
