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
            const response = await axios.post('http://localhost:3001/auth/login', {
                username,
                password,
            });

            if (response.data.access_token) {
                console.log('Access token:', response.data.access_token);  // Log the token for debugging
                localStorage.setItem('token', response.data.access_token);
                window.location.href = '/';  // Redirect after successful login
            } else {
                throw new Error('Invalid token response from the server');
            }
        } catch (err) {
            setError('Login failed. Please check your credentials.');
        }
    };



    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-full max-w-sm p-4 bg-gray-100 rounded">
                <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleLogin}>
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

                {/* Divider for better separation between login methods */}
                <div className="mt-6 text-center">
                    <span className="text-sm text-gray-500">or</span>
                </div>

                {/* Google Login Button */}
                <div className="mt-4">
                    <a href="http://localhost:3001/auth/google">
                        <button className="w-full py-2 bg-red-500 text-white rounded">
                            Login with Google
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
