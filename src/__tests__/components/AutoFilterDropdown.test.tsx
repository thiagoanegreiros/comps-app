import { render, screen, fireEvent } from '@testing-library/react';
import { AutoFilterDropdown } from '../../components/AutoFilterDropdown';

interface TestItem {
  id: number;
  name: string;
}

const items: TestItem[] = [
  { id: 1, name: 'Apple' },
  { id: 2, name: 'Banana' },
  { id: 3, name: 'Orange' },
  { id: 4, name: 'Pineapple' },
];

describe('AutoFilterDropdown', () => {
  it('should render all items initially', () => {
    render(
      <AutoFilterDropdown
        items={items}
        labelKey="name"
        valueChange={() => {}}
      />,
    );

    items.forEach(item => {
      expect(
        screen.getByText((_, el) => el?.textContent === item.name),
      ).toBeInTheDocument();
    });
  });

  it('should filter items based on input query', () => {
    render(
      <AutoFilterDropdown
        items={items}
        labelKey="name"
        valueChange={() => {}}
      />,
    );

    const input = screen.getByPlaceholderText('Type to filter...');
    fireEvent.change(input, { target: { value: 'ap' } });

    // Use matcher por função:
    expect(
      screen.getByText((_, element) => element?.textContent === 'Apple'),
    ).toBeInTheDocument();
    expect(
      screen.getByText((_, element) => element?.textContent === 'Pineapple'),
    ).toBeInTheDocument();

    expect(
      screen.queryByText((_, element) => element?.textContent === 'Banana'),
    ).toBeNull();
    expect(
      screen.queryByText((_, element) => element?.textContent === 'Orange'),
    ).toBeNull();
  });

  it('should call valueChange when item is clicked', () => {
    const handleChange = jest.fn();

    render(
      <AutoFilterDropdown
        items={items}
        labelKey="name"
        valueChange={handleChange}
      />,
    );

    const bananaItem = screen.getByText(
      (_, element) => element?.textContent === 'Banana',
    );
    fireEvent.click(bananaItem);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith({ id: 2, name: 'Banana' });
  });

  it('should show "No results found" when nothing matches', () => {
    render(
      <AutoFilterDropdown
        items={items}
        labelKey="name"
        valueChange={() => {}}
      />,
    );

    const input = screen.getByPlaceholderText('Type to filter...');
    fireEvent.change(input, { target: { value: 'zzz' } });

    expect(screen.getByText('No results found')).toBeInTheDocument();
  });

  it('should highlight matched text', () => {
    render(
      <AutoFilterDropdown
        items={items}
        labelKey="name"
        valueChange={() => {}}
      />,
    );

    const input = screen.getByPlaceholderText('Type to filter...');
    fireEvent.change(input, { target: { value: 'an' } });

    // Banana and Orange contain 'an'
    const banana = screen.getByText(
      (_, node) => node?.textContent === 'Banana',
    );
    const orange = screen.getByText(
      (_, node) => node?.textContent === 'Orange',
    );

    expect(banana).toBeInTheDocument();
    expect(orange).toBeInTheDocument();

    // Verifica que há pelo menos um <b> no DOM (onde ocorre o highlight)
    expect(banana.querySelector('b')).not.toBeNull();
    expect(orange.querySelector('b')).not.toBeNull();
  });
});
