import { Route, Link, Routes } from 'react-router-dom';
import UserList from '../components/UserList';
import NavBar from "../components/NavBar";
import Favicon from "../components/Favicon";

const AdminPanel = () => {
    return (
        <><NavBar></NavBar>
            <Favicon></Favicon>
            <div className="container bg-dark text-white">
                <h1 className="pt-4 pb-2">Admin Dashboard</h1>
                <nav>
                    <ul className="nav">
                        <li className="nav-item">
                            <Link className="nav-link text-light" to="/addUser">Add User</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<UserList/>}/>

                </Routes>
            </div>
        </>
    );
};

export default AdminPanel;
