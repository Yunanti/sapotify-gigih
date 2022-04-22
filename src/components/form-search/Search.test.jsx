import { screen, fireEvent, render } from '@testing-library/react';
import React from 'react';
import Search from './Search';
import { Provider } from 'react-redux';
import store from '../../redux/store';

test('should test action input', () => {
  render(<Search onChange={() => null} onSubmit={() => null} />);

  const input = screen.getByTestId('input-search');
  fireEvent.change(input, { target: { value: 'test' } });
  expect(input.value).toBe('test');
});

test('should test action submit', () => {
  render(<Search onChange={() => null} onSubmit={() => null} />);

  const submit = screen.getByTestId('input-submit');
  fireEvent.submit(submit);
});

test('Renders with search input component', async () => {
  render(
    <Provider store={store}>
      <Search />
    </Provider>
  );

  const inputElement = screen.getByPlaceholderText('Search for a song');

  expect(inputElement).toBeInTheDocument();
});
