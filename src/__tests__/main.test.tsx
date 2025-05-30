import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder as typeof global.TextEncoder;
global.TextDecoder = TextDecoder as typeof global.TextDecoder;
import '@testing-library/jest-dom';

import { screen } from '@testing-library/dom';

beforeEach(() => {
  document.body.innerHTML = '';
  jest.resetModules();
});

it('should render the app into #root', async () => {
  document.body.innerHTML = '<div id="root"></div>';

  const { bootstrapApp } = await import('../main');
  bootstrapApp();

  const heading = await screen.findByText(/Main Page/i);
  expect(heading).toBeInTheDocument();
});
