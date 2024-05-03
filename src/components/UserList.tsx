import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface User {
    userId: number;
    username: string;
    email: string;
    role: string;
}

const UserList = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.log('No token found');
                    return;
                }

                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };

                const response = await axios.get<User[]>('http://localhost:7050/api/users', config);
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.log('No token found');
                return;
            }

            const confirmDelete = window.confirm(`Are you sure you want to delete user ${id}?`);
            if (!confirmDelete) {
                return;
            }

            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            await axios.delete(`http://localhost:7050/api/users/${id}`, config);
            setUsers(prevUsers => prevUsers.filter(user => user.userId !== id)); // Remove deleted user from the list
        } catch (error) {
            console.error('Error deleting user: ', error);
        }
    };

    return (
        <div>
            <h2>User List</h2>
            <table className="table table-dark table-striped">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.userId}>
                        <td>{user.userId}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                            <Link className="btn btn-secondary mr-2" to={`/user/edit/${user.userId}`}>Edit</Link>
                            <button className="btn btn-danger" onClick={() => handleDelete(user.userId)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
