/* eslint-disable prettier/prettier */
import Login from '../components/Login/Login';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));
describe('login', () => {
  it('check elments render or not and its event', () => {
    render(<Login />);
    const button = screen.getByTestId('login');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'submit');
    expect(fireEvent.click(button)).toBeTruthy();
  });
});
