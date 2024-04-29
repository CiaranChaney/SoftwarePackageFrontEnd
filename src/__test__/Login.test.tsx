import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../pages/Login';
import {BrowserRouter, MemoryRouter} from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

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

describe('Login Page', () => {

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
                <Login />
            </BrowserRouter>
        );
        expect(asFragment()).toMatchSnapshot();
    });

    it('renders Login and checks for elements', () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        const usernameField = screen.getByRole('textbox', { name: /username/i });
        expect(usernameField).toBeInTheDocument();

        const passwordField = screen.getByLabelText(/password/i)
        expect(passwordField).toBeInTheDocument();

        const signInButton = screen.getByRole('button', { name: 'Sign in' });
        expect(signInButton).toBeInTheDocument();

    });

    it('renders Login and checks login functionality', () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        const usernameField = screen.getByRole('textbox', { name: /username/i });
        expect(usernameField).toBeInTheDocument();

        const passwordField = screen.getByLabelText(/password/i)
        expect(passwordField).toBeInTheDocument();

        const signInButton = screen.getByRole('button', { name: 'Sign in' });
        expect(signInButton).toBeInTheDocument();

        fireEvent.change(usernameField, { target: { value: 'username' } });
        fireEvent.change(passwordField, { target: { value: 'testPassword' } });
        fireEvent.click(signInButton);

    });

    it('successfully logs in and navigates to the library', async () => {
        const mockPost = jest.fn().mockResolvedValue({
            data: { token: 'fakeToken' }
        });

        axios.post = mockPost;

        render(
            <MemoryRouter>  // Use MemoryRouter for tests
                <Login />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
        fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

        await waitFor(() => expect(mockPost).toHaveBeenCalledWith('https://ciaranchaney.com:443/login', {
            username: 'testuser',
            password: 'password123'
        }));

        expect(localStorage.getItem('token')).toBe('fakeToken');
        expect(window.location.reload).toHaveBeenCalled();
    });

    it('fails login due to invalid username or password', async () => {
        const mockPost = jest.fn().mockRejectedValue({
            response: {
                status: 401,
                data: { message: "Invalid username or password" }
            }
        });
        axios.post = mockPost;

        const mockConsoleError = jest.spyOn(console, 'error').mockImplementation();

        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'wronguser' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrongpass' } });
        fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

        await waitFor(() => expect(mockPost).toHaveBeenCalledWith('https://ciaranchaney.com:443/login', {
            username: 'wronguser',
            password: 'wrongpass'
        }));

        expect(mockConsoleError).toHaveBeenCalledWith(
            "Error logging in:",
            expect.objectContaining({response: expect.objectContaining({
                    data: expect.objectContaining({
                        message: "Invalid username or password"
                    }),
                    status: 401
                })})
        );

        expect(toast.error).toHaveBeenCalledWith("Invalid username or password");

        mockConsoleError.mockRestore();
    });
});





