import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import {Button, createTheme, CssBaseline, Grid, TextField, ThemeProvider} from "@mui/material";
import Favicon from "./Favicon";
import NavBar from "./NavBar";

interface User {
    userId: number;
    username: string;
    email: string;
    role: string;
}

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

const EditUser = () => {
    const { userId } = useParams<{ userId: string }>();
    const [userData, setUserData] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.log('No token found');
                    return;
                }

                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };

                const response = await axios.get(`https://ciaranchaney.com:443/api/users/${userId}`, config);
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data: ', error);
            }
        };

        fetchUser();
    }, [userId]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const token = localStorage.getItem("token");

            const username = (event.currentTarget.querySelector("#username") as HTMLInputElement)?.value || '';
            const email = (event.currentTarget.querySelector("#email") as HTMLInputElement)?.value || '';
            const role = (event.currentTarget.querySelector("#role") as HTMLInputElement)?.value || '';

            const updatedUserData = {
                username,
                email,
                role,
            };

            await axios.put(
                `https://ciaranchaney.com:443/api/users/${userId}`,
                updatedUserData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            navigate("/AdminPanel");
            window.location.reload();
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };


    return (
        <ThemeProvider theme={darkTheme}>
            <Favicon />
            <CssBaseline />
            <NavBar />
            <div>
                <h2>Edit User</h2>
                {userData && (
                    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    id="username"
                                    label="Username"
                                    variant="outlined"
                                    name="username"
                                    required
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    defaultValue={userData.username}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="email"
                                    label="Email"
                                    variant="outlined"
                                    name="email"
                                    required
                                    fullWidth
                                    autoFocus
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    defaultValue={userData.email}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="role"
                                    label="Role"
                                    variant="outlined"
                                    name="role"
                                    required
                                    fullWidth
                                    autoFocus
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    defaultValue={userData.role || ''} // Handle nullability
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                >
                                    Edit
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </div>
        </ThemeProvider>
    );
};

export default EditUser;
