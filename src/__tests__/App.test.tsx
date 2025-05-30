import { render, screen } from '@testing-library/react';
import App from '../App';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

describe('App component', () => {
  it('should render the main page', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const heading = await screen.findByText(/Main Page/i);
    expect(heading).toBeInTheDocument();
  });
});
