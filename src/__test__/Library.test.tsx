import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LibraryPage from '../pages/Library';
import '@testing-library/jest-dom';
import LibraryDataTable from "../components/LibraryDataTable";

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
    jest.doMock("../components/LibraryDataTable.tsx", () => () => <div>LibraryDataTable</div>);
    jest.doMock("../components/Footer.tsx", () => () => <div>Footer</div>);
});


describe('LibraryPage', () => {
    it('renders correctly', () => {
        const { asFragment } = render(
            <BrowserRouter>
                <LibraryPage />
            </BrowserRouter>
        );
        expect(asFragment()).toMatchSnapshot();
    });

    it('includes necessary subcomponents', () => {
        const { getByText } = render(
            <BrowserRouter>
                <LibraryPage />
            </BrowserRouter>
        );
        expect(document.querySelector('link[rel="icon"]')).toBeInTheDocument();
        expect(getByText('Library Hash Repository')).toBeInTheDocument();
        expect(getByText('Login')).toBeInTheDocument();
        expect(getByText('Register')).toBeInTheDocument();
        expect(getByText('Contact Us')).toBeInTheDocument();
        expect(getByText('Terms of Service')).toBeInTheDocument();
        expect(getByText('Privacy Policy')).toBeInTheDocument();
    });


    it('renders LibraryDataTable and checks for elements', () => {
        render(<LibraryDataTable />);

        const libraryNameField = screen.getByLabelText('Search by Library Name');
        expect(libraryNameField).toBeInTheDocument();

        const hashField = screen.getByLabelText('Search by Hash');
        expect(hashField).toBeInTheDocument();

        const searchByNameButton = screen.getByRole('button', { name: 'Search by Name' });
        expect(searchByNameButton).toBeInTheDocument();

        const searchByHashButton = screen.getByRole('button', { name: 'Search by Hash' });
        expect(searchByHashButton).toBeInTheDocument();

        fireEvent.change(libraryNameField, { target: { value: 'test library' } });
        fireEvent.click(searchByNameButton);

        fireEvent.change(hashField, { target: { value: 'test hash' } });
        fireEvent.click(searchByHashButton);


    });
});
