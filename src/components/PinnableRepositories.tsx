import React from 'react';

interface Props {
  repositories: unknown[];
}

export const PinnableRepositories = ({ repositories }: Props): JSX.Element => (
  <ol>
    {repositories.map(() => (<li>Repository</li>))}
  </ol>
);
