import { render, screen, fireEvent } from '@testing-library/react';
import { Dialog } from '../../components/Dialog';

describe('Dialog component', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should not render when isOpen is false', () => {
    render(<Dialog isOpen={false} onClose={() => {}} />);

    expect(screen.queryByText(/×/)).not.toBeInTheDocument();
  });

  it('should render when isOpen is true', () => {
    render(<Dialog isOpen={true} onClose={() => {}} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should call onClose when close button is clicked', () => {
    const onClose = jest.fn();

    render(<Dialog isOpen={true} onClose={onClose} />);

    fireEvent.click(screen.getByRole('button'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should render header, body and footer when provided', () => {
    render(
      <Dialog
        isOpen={true}
        onClose={() => {}}
        header={<div>Header Content</div>}
        body={<div>Body Content</div>}
        footer={<div>Footer Content</div>}
      />,
    );

    expect(screen.getByText('Header Content')).toBeInTheDocument();
    expect(screen.getByText('Body Content')).toBeInTheDocument();
    expect(screen.getByText('Footer Content')).toBeInTheDocument();
  });
    
  it('should render header, body and footer when provided and isModal is false', () => {
    render(
      <Dialog
        isOpen={true}
        onClose={() => {}}
        isModal={false}
        header={<div>Header Content</div>}
        body={<div>Body Content</div>}
        footer={<div>Footer Content</div>}
      />
    );

    expect(screen.getByText('Header Content')).toBeInTheDocument();
    expect(screen.getByText('Body Content')).toBeInTheDocument();
    expect(screen.getByText('Footer Content')).toBeInTheDocument();
  });

  it('should render transparent background if isModal is false', () => {
    render(<Dialog isOpen={true} onClose={() => {}} isModal={false} />);

    const container = document.querySelector('div'); // seleciona o dialog inteiro

    expect(container?.className).not.toContain('bg-black');
  });

  it('should render dark overlay if isModal is true', () => {
    render(<Dialog isOpen={true} onClose={() => {}} isModal={true} />);

    const container = document.querySelector('div.fixed.inset-0');
    expect(container).toHaveClass('bg-black');
  });
});
