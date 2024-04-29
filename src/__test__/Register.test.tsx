import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Register from '../pages/Register';
import {BrowserRouter, MemoryRouter} from 'react-router-dom';
import axios from 'axios';
import {toast} from "react-toastify";

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
}));

jest.mock('react-toastify', () => {
    const actualToast = jest.requireActual('react-toastify');
    return {
        ...actualToast,
        toast: {
            ...actualToast.toast,
            error: jest.fn()
        }
    };
});

describe('Register Page', () => {

    beforeAll(() => {
        Object.defineProperty(window, 'location', {
            writable: true,
            value: { reload: jest.fn() }
        });

        jest.clearAllMocks();
    });

    it('renders correctly', () => {
        const { asFragment } = render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        );
        expect(asFragment()).toMatchSnapshot();
    });

    it('renders Register and checks for elements', () => {
        render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        );

        const usernameField = screen.getByRole('textbox', { name: /username/i });
        expect(usernameField).toBeInTheDocument();

        const emailField = screen.getByLabelText(/email address/i)
        expect(emailField).toBeInTheDocument();

        const passwordField = screen.getByLabelText(/password/i)
        expect(passwordField).toBeInTheDocument();

        const signUpButton = screen.getByRole('button', { name: /Sign up/i });
        expect(signUpButton).toBeInTheDocument();

    });

    it('renders Register and checks register functionality', () => {
        render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        );

        const usernameField = screen.getByRole('textbox', { name: /username/i });
        expect(usernameField).toBeInTheDocument();

        const emailField = screen.getByLabelText(/email address/i)
        expect(emailField).toBeInTheDocument();

        const passwordField = screen.getByLabelText(/password/i)
        expect(passwordField).toBeInTheDocument();

        const signUpButton = screen.getByRole('button', { name: /Sign up/i });
        expect(signUpButton).toBeInTheDocument();

        fireEvent.change(usernameField, { target: { value: 'username' } });
        fireEvent.change(emailField, { target: { value: 'testEmail@email.com' } });
        fireEvent.change(passwordField, { target: { value: 'testPassword' } });
        fireEvent.click(signUpButton);

    });

    it('successfully registers and navigates to the library', async () => {
        const mockPost = jest.fn().mockResolvedValue({
            data: { token: 'fakeToken' }
        });

        axios.post = mockPost;

        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );

        const usernameField = screen.getByRole('textbox', { name: /username/i });
        const emailField = screen.getByLabelText(/email address/i)
        const passwordField = screen.getByLabelText(/password/i)
        const signUpButton = screen.getByRole('button', { name: /Sign up/i });

        fireEvent.change(usernameField, { target: { value: 'username' } });
        fireEvent.change(emailField, { target: { value: 'testEmail@email.com' } });
        fireEvent.change(passwordField, { target: { value: 'testPassword' } });
        fireEvent.click(signUpButton);

        await waitFor(() => expect(mockPost).toHaveBeenCalledWith('https://ciaranchaney.com:443/register', {
            username: 'username',
            email: 'testEmail@email.com',
            password: 'testPassword'
        }));

        expect(localStorage.getItem('token')).toBe('fakeToken');
        expect(window.location.reload).toHaveBeenCalled();

        localStorage.clear();
    });

    it('fails register due to existing user', async () => {
        const mockPost = jest.fn().mockRejectedValue({
            response: {
                status: 500,
                data: {
                    error: "Internal Server Error" ,
                    path:  "/register",
                }
            }
        });

        axios.post = mockPost;

        const mockConsoleError = jest.spyOn(console, 'error').mockImplementation();

        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByRole('textbox', { name: /username/i }), { target: { value: 'wronguser' } });
        fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'wrongemail@email.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrongpass' } });
        fireEvent.click(screen.getByRole('button', { name: /Sign up/i }));

        await waitFor(() => expect(mockPost).toHaveBeenCalledWith('https://ciaranchaney.com:443/register', {
            username: 'wronguser',
            email: 'wrongemail@email.com',
            password: 'wrongpass'
        }));


        await waitFor(() => expect(axios.post).toHaveBeenCalled());

        expect(toast.error).toHaveBeenCalledWith("User already exists with that email or username. Please try again.");

        expect(localStorage.getItem('token')).toBeNull();

        mockConsoleError.mockRestore();
    });
});





