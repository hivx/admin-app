import { describe, test } from 'vitest';

import { renderWithProviders, waitFor } from '@/test/test-utils';

import { Head } from '../Head';

describe('Correct path', () => {
  test('should add proper page title and meta description', async () => {
    const title = 'Hello World';
    const description = 'This is a description';

    renderWithProviders(<Head title={title} description={description} />);
    await waitFor(() => expect(document.title).toEqual(title));

    const metaDescription = document.querySelector("meta[name='description']");

    expect(metaDescription?.getAttribute('content')).toEqual(description);
  });
});
