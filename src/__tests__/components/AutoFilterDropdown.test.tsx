import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AutoFilterDropdown } from '../../components/AutoFilterDropdown';
import { act } from '@testing-library/react';

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
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should not render list initially', () => {
    render(
      <AutoFilterDropdown
        items={items}
        labelKey="name"
        valueChange={() => {}}
      />,
    );

    items.forEach(item => {
      expect(screen.queryByText(item.name)).toBeNull();
    });
  });

  it('should render filtered items after input', async () => {
    render(
      <AutoFilterDropdown
        items={items}
        labelKey="name"
        valueChange={() => {}}
      />,
    );

    const input = screen.getByPlaceholderText('Type to filter...');
    fireEvent.change(input, { target: { value: 'ap' } });

    await act(async () => {
      jest.advanceTimersByTime(300);
    });

    const listItems = await screen.findAllByRole('listitem');

    const appleItem = listItems.find(li => li.textContent === 'Apple');
    const pineappleItem = listItems.find(li => li.textContent === 'Pineapple');

    expect(appleItem).toBeDefined();
    expect(pineappleItem).toBeDefined();
  });

  it('should call valueChange and hide list when item is clicked', async () => {
    const handleChange = jest.fn();

    render(
      <AutoFilterDropdown
        items={items}
        labelKey="name"
        valueChange={handleChange}
      />,
    );

    const input = screen.getByPlaceholderText('Type to filter...');
    fireEvent.change(input, { target: { value: 'ba' } });

    await act(async () => {
      jest.advanceTimersByTime(300);
    });

    const listItems = await screen.findAllByRole('listitem');

    const bananaItem = listItems.find(li => li.textContent === 'Banana');

    expect(bananaItem).toBeDefined();

    if (bananaItem) {
      fireEvent.click(bananaItem);
    }

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith({ id: 2, name: 'Banana' });

    const listAfterClick = screen.queryAllByRole('listitem');
    expect(listAfterClick.length).toBe(0);
  });

  it('should show "No results found" when nothing matches', async () => {
    render(
      <AutoFilterDropdown
        items={items}
        labelKey="name"
        valueChange={() => {}}
      />,
    );

    const input = screen.getByPlaceholderText('Type to filter...');
    fireEvent.change(input, { target: { value: 'zzz' } });

    await waitFor(() => {
      expect(screen.getByText('No results found')).toBeInTheDocument();
    });
  });

  it('should highlight matched text', async () => {
    render(
      <AutoFilterDropdown
        items={items}
        labelKey="name"
        valueChange={() => {}}
      />,
    );

    const input = screen.getByPlaceholderText('Type to filter...');
    fireEvent.change(input, { target: { value: 'an' } });

    const listItems = await screen.findAllByRole('listitem');

    const banana = listItems.find(li => li.textContent === 'Banana');
    const orange = listItems.find(li => li.textContent === 'Orange');

    expect(banana).toBeDefined();
    expect(orange).toBeDefined();

    expect(banana?.querySelector('b')).not.toBeNull();
    expect(orange?.querySelector('b')).not.toBeNull();
  });
});
