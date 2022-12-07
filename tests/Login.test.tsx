import Login from '../components/Login/Login';

import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
  }));
describe('login',()=>{
    it('check elments render or not', () => {
        render(<Login />);

        expect(screen.getByTestId('email')).toBeInTheDocument();
        expect(screen.getByTestId('email')).toHaveAttribute('type','email');

        expect(screen.getByTestId('password')).toBeInTheDocument();
        expect(screen.getByTestId('password')).toHaveAttribute('type','password');

        expect(screen.getByTestId('login')).toBeInTheDocument();

    })
    it('check the element change event', () => {
        render(<Login />);
        const email= screen.getByTestId('email');
        fireEvent.change(email, { target: {value: 'demo@gmail.com'}})
        expect(email.value).toBe('demo@gmail.com')
        const password= screen.getByTestId('password');
        fireEvent.change(password, { target: {value: 'demo@gmail.com'}})
        expect(password.value).toBe('demo@gmail.com')
    })
})