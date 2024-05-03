import { Route, Link, Routes } from 'react-router-dom';
import UserList from '../components/UserList';
import UserForm from '../components/UserForm';
import NavBar from "../components/NavBar";

const AdminPanel = () => {
    return (
        <><NavBar></NavBar>
            <div className="container bg-dark text-white">
                <h1 className="pt-4 pb-2">Admin Dashboard</h1>
                <nav>
                    <ul className="nav">
                        <li className="nav-item">
                            <Link className="nav-link text-light" to="/AdminPanel/user/new">Add User</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<UserList/>}/>
                    <Route path="/user/new" element={<UserForm/>}/>
                    <Route path="/user/edit/:id" element={<UserForm/>}/>
                </Routes>
            </div>
        </>
    );
};

export default AdminPanel;
