import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { error, success } from '../util/Toastify';

export default function FormUpdate({ user }) {

    const [id] = useState(user ? user.id : '');
    const [username, setUsername] = useState(user ? user.username : ''); // Initialize with user.username if user exists
    const [email, setEmail] = useState(user ? user.email : '');
    const [role, setRole] = useState(user && user.roles ? user.roles[0].name.toLowerCase() : [' ']); // Check if user and user.roles exist
    const [address, setAddress] = useState(user ? user.address : '');
    const [usergroup, setUsergroup] = useState(user ? user.usergroup : '');
    const [tel, setTel] = useState(user ? user.tel : '')

    const navigate = useNavigate();

    // console.log("Starting of my form......." + user);
    // console.log("username:", username);
    // console.log("email:", email);
    // console.log("role:", role);
    // console.log("address:", address);
    // console.log("usergroup:", usergroup);
    // console.log("tel:", tel);

    // if (user) {
    //     console.log("user is there");
    // }

    const handleSubmit = () => {

        const allowedRoles = ['admin', 'user'];

        const validateForm = z.object({
            username: z.string().min(1, { message: "Enter your name" }),
            address: z.string().min(1, { message: "Enter your address" }),
            tel: z.string().min(1, { message: "Enter your contact number" }),
            // password: z.string().min(8, 'Password must be at least 8 characters long'),
            email: z.string().email('Invalid email address'),
            roles: z.array(z.string()).nonempty('Please select a role!').refine((role) => allowedRoles.includes(role[0]), {
                message: 'Role is not defined.'
            })
        });

        // console.log("id of role is..........." + role.toUpperCase());

        const userId = user.roles[0].id;
        const roleName = role.toUpperCase();

        const updatedUser = {
            id: id,
            username: username,
            email: email,
            address: address,
            usergroup: usergroup,
            tel: tel,
            roles: [{ id: userId, name: roleName }] // Send role as an array containing the selected role
        };


        // console.log("thisklkdklwejdlkwed"+email);
        // console.log("thisklkdklwejdlkwed", updatedUser);

        const result = validateForm.safeParse(updatedUser);
        if (!result.success) {
            console.log("hiiiii", updatedUser);
            axios.put(`http://localhost:8080/api/auth/updateUser`, updatedUser)
                .then(() => {
                    success("User updated successfully");
                    navigate('/login/welcome/employeelistad');
                }).catch(() => error("Undefined User!"))
        } else {
            const formattedError = result.error.format();
            if (formattedError.username?._errors) {
                error(String(formattedError.username?._errors));
            } else if (formattedError.email?._errors) {
                error(String(formattedError.email?._errors));
            } else if (formattedError.roles?._errors) {
                error(String(formattedError.roles?._errors));
            } else if (formattedError.address?._errors) {
                error(String(formattedError.address?._errors));
            } else if (formattedError.tel?._errors) {
                error(String(formattedError.tel?._errors));
            } else if (formattedError.usergroup?._errors) {
                error(String(formattedError.usergroup?._errors));
            }
        }

    };

    return (
        <>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '80%' },
                    textAlign: 'center',
                    mt: 3
                }}
                noValidate
                autoComplete="off"
            >

                <TextField
                    label="Username"
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <TextField
                    label="Address"
                    type="text"
                    multiline
                    rows={4}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />

                <TextField
                    label="User group"
                    type="text"
                    value={usergroup}
                    onChange={(e) => setUsergroup(e.target.value)}
                />


                <TextField
                    label="Email"
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <TextField
                    label="Contact No"
                    type='text'
                    value={tel}
                    onChange={(e) => setTel(e.target.value)}
                />

                <TextField
                    select
                    label="Designation"
                    onChange={(e) => setRole(e.target.value)}
                    value={role}
                    // onChange={(e) => setRole(e.target.value.JSON.stringify(e))}
                    SelectProps={{ native: true }}
                >
                    <option value=""></option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                </TextField><br /><br />
                <Button variant="contained" onClick={handleSubmit}>
                    Update
                </Button><br /><br />
            </Box>


        </>

    );
}
