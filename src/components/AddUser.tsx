import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Button, createTheme, CssBaseline, Grid, TextField, ThemeProvider} from "@mui/material";
import Favicon from "./Favicon";
import NavBar from "./NavBar";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

const AddUser = () => {
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const token = localStorage.getItem("token");

            const username = (event.currentTarget.querySelector("#username") as HTMLInputElement)?.value || '';
            const email = (event.currentTarget.querySelector("#email") as HTMLInputElement)?.value || '';
            const password = (event.currentTarget.querySelector("#password") as HTMLInputElement)?.value || '';
            const role = (event.currentTarget.querySelector("#role") as HTMLInputElement)?.value || '';

            const UserData = {
                username,
                email,
                password,
                role,
            };

            await axios.post(
                `https://ciaranchaney.com:443/api/users`,
                UserData,
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
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="password"
                                    label="Password"
                                    variant="outlined"
                                    name="password"
                                    required
                                    fullWidth
                                    autoFocus
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
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
            </div>
        </ThemeProvider>
    );
};

export default AddUser;
