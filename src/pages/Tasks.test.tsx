import { render, screen, fireEvent } from '@testing-library/react';
import Tasks from "./Tasks"

test('Load Tasks component', () => {
  render(<Tasks />);
  const button = screen.getByText('Reset filters')
  expect(button).toBeInTheDocument();
});

test('should renders the search elements', async () => {
  render(<Tasks />);
  const inputElement = screen.getByPlaceholderText('Search...')
  fireEvent.change(inputElement, {target: {value: 'delectus aut autem'}})
  const wordMeaning = await screen.findByText('delectus aut autem')
  expect(wordMeaning).toBeInTheDocument();
})