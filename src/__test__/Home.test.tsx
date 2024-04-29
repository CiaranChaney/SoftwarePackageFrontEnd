import {screen, render} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '../pages/Home';
import '@testing-library/jest-dom';

beforeEach(() => {
    jest.doMock("../components/NavBar.tsx", () => {
        return () => (
            <div>
                <nav>
                    <ul>
                        <li>NavBar</li>
                    </ul>
                </nav>
            </div>
        );
    });
    jest.doMock("../components/Footer.tsx", () => () => <div>Footer</div>);
});


describe('HomePage', () => {
    it('renders correctly', () => {
        const { asFragment } = render(
            <BrowserRouter>
                <HomePage />
            </BrowserRouter>
        );
        expect(asFragment()).toMatchSnapshot();
    });

    it('includes necessary subcomponents', () => {
        const { getByText } = render(
            <BrowserRouter>
                <HomePage />
            </BrowserRouter>
        );
        expect(document.querySelector('link[rel="icon"]')).toBeInTheDocument();
        expect(getByText('Library Hash Repository')).toBeInTheDocument();
        expect(getByText('Libraries')).toBeInTheDocument();
        expect(getByText('Login')).toBeInTheDocument();
        const registerButtons = screen.getAllByText('Register');
        registerButtons.forEach(button => {
            expect(button).toBeInTheDocument();
        });
        expect(getByText('Contact Us')).toBeInTheDocument();
        expect(getByText('Terms of Service')).toBeInTheDocument();
        expect(getByText('Privacy Policy')).toBeInTheDocument();
    });

    it('should render text', () => {
        const { getByText } = render(
            <BrowserRouter>
                <HomePage />
            </BrowserRouter>
        );
        expect(getByText('Welcome to the Library Data Repository')).toBeInTheDocument();
        expect(getByText('Recent Malicious Libraries Found')).toBeInTheDocument();
        expect(getByText('About Us')).toBeInTheDocument();
        expect(getByText('Get Started')).toBeInTheDocument();
    });


});
