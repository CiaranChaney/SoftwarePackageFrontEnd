
import {useNavigate, useParams} from 'react-router-dom';
import {useEffect, useState} from "react";

const UserForm = () => {
    const [user, setUser] = useState({ username: '', email: '' });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            // Fetch user from API and set to state
            setUser({ username: 'john_doe', email: 'john@example.com' }); // Placeholder
        }
    }, [id]);

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log('User Submitted:', user);
        navigate('/'); // Redirect to user list after submit
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{id ? 'Edit User' : 'Add User'}</h2>
            <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input type="text" className="form-control" id="username" name="username" value={user.username} onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" name="email" value={user.email} onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-primary">{id ? 'Update' : 'Submit'}</button>
        </form>
    );
};

export default UserForm;
