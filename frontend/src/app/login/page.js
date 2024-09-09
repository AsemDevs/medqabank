"use client";  // Ensure this is a client component

import { useState } from 'react';
import axios from 'axios';  // Use axios directly for login

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Perform login request to the backend
            const response = await axios.post('http://localhost:3001/auth/login', {
                username,
                password,
            });

            // Ensure the backend is sending the token in 'access_token' or 'token' field
            if (response.data.access_token) {
                // Save the JWT token to localStorage
                localStorage.setItem('token', response.data.access_token);  // Correct key name based on backend response
                // Redirect to homepage after successful login
                window.location.href = '/';
            } else {
                throw new Error('Invalid token response from the server');
            }

        } catch (err) {
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={handleLogin} className="w-full max-w-sm p-4 bg-gray-100 rounded">
                <h1 className="text-2xl font-bold mb-4">Login</h1>
                {error && <p className="text-red-500">{error}</p>}
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        placeholder="Enter username"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        placeholder="Enter password"
                        required
                    />
                </div>
                <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded">
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
