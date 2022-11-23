import { render, screen   } from '@testing-library/react';
import NavBar from './NavBar';
import { MemoryRouter } from 'react-router-dom';

test('Load NavBar component', () => {
  render(<NavBar />, {wrapper: MemoryRouter});
  const UsersSection = screen.getByText('Users')
  const TasksSection = screen.getByText('Tasks')
  expect(UsersSection).toBeInTheDocument();
  expect(TasksSection).toBeInTheDocument();
});
