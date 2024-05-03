import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AdminPanel from "../pages/AdminPanel";
import UserList from "../components/UserList";
import '@testing-library/jest-dom';
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {act} from "react-dom/test-utils";

// Create a mock instance for axios
const mock = new MockAdapter(axios);

beforeEach(() => {
    // Mock NavBar and UserList if needed
    jest.mock("../components/NavBar", () => () => <nav>NavBar</nav>);
    jest.mock("../components/UserList", () => () => <div>Footer</div>);

    const mockToken = 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQURNSU4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IlRlc3QiLCJleHAiOjE3MTQ3Mzc5MTksImlhdCI6MTcxNDczNzkxOX0.fMN-b_fdtuHZmzMxikZzobdqUY7_YVCIEh5-qiOSp1s\n';
    Storage.prototype.getItem = jest.fn(() => mockToken); // Mock getItem method of localStorage

    // Setup Axios mocks
    mock.onGet("https://ciaranchaney.com:443/api/users").reply(200, [
        {
            userId: 1,
            username: 'testUser',
            email: 'test@example.com',
            role: 'user'
        }
    ]);
});

afterEach(() => {
    mock.resetHandlers();
    jest.restoreAllMocks();
});

describe('AdminPage', () => {
    it('renders correctly', () => {
        const { asFragment } = render(
            <BrowserRouter>
                <AdminPanel />
                <UserList />
            </BrowserRouter>
        );
        expect(asFragment()).toMatchSnapshot();
    });

    it('includes necessary subcomponents', async () => {
        await act(async () => {
            render(
                <BrowserRouter>
                    <AdminPanel />
                    <UserList />
                </BrowserRouter>
            );
        });

        expect(screen.getByText('Library Hash Repository')).toBeInTheDocument();
        expect(screen.getByText('Admin Dashboard')).toBeInTheDocument();
        expect(screen.getByText('Add User')).toBeInTheDocument();
        await waitFor(() => {
            const idFields = screen.getAllByText('ID');
            idFields.forEach(field => {
                expect(field).toBeInTheDocument();
            });

            const emailFields = screen.getAllByText('Email');
            emailFields.forEach(field => {
                expect(field).toBeInTheDocument();
            });

            const roleFields = screen.getAllByText('Role');
            roleFields.forEach(field => {
                expect(field).toBeInTheDocument();
            });

            const actionFields = screen.getAllByText('Actions');
            actionFields.forEach(field => {
                expect(field).toBeInTheDocument();
            });
        });
    });

    it('renders UserList and checks for elements', async () => {
        await act(async () => {
            render(
                <BrowserRouter>
                    <AdminPanel />
                    <UserList />
                </BrowserRouter>
            );
        });


        await waitFor(() => {

            const addUserButtons = screen.getAllByText('Add User');
            addUserButtons.forEach(field => {
                expect(field).toBeInTheDocument();
            });

            const editButtons = screen.getAllByText('Edit');
            editButtons.forEach(field => {
                expect(field).toBeInTheDocument();
            });

            const deleteButtons = screen.getAllByText('Delete');
            deleteButtons.forEach(field => {
                expect(field).toBeInTheDocument();
            });

        });

    });
});
