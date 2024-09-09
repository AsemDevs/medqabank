"use client";  // Ensure this is marked as a client component

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axiosInstance from '../utils/axiosInstance';

const QuizList = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true); // Add loading state
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

    useEffect(() => {
        // Check if the token exists in localStorage
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true); // User is logged in
            // Fetch quizzes only if the user is authenticated
            axiosInstance
                .get('/quizzes', {
                    headers: {
                        Authorization: `Bearer ${token}`,  // Include the JWT token
                    },
                })
                .then((response) => {
                    setQuizzes(response.data);
                    setLoading(false); // Stop loading
                })
                .catch((err) => {
                    setError('Failed to fetch quizzes. Please try again later.');
                    setLoading(false); // Stop loading
                });
        } else {
            setIsLoggedIn(false); // User is not logged in
            setLoading(false); // Stop loading
        }
    }, []);

    if (loading) {
        return <p>Loading quizzes...</p>; // Show a loading message during fetch
    }

    if (!isLoggedIn) {
        return (
            <div>
                <h1 className="text-3xl font-bold mb-6">Available Quizzes</h1>
                <p className="text-blue-500">
                    Please <Link href="/login">log in</Link> to access the quizzes.
                </p>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Available Quizzes</h1>
            {error && <p className="text-red-500">{error}</p>}
            {quizzes.length > 0 ? (
                <ul>
                    {quizzes.map((quiz) => (
                        <li key={quiz.id} className="mb-4">
                            <h2 className="text-xl">{quiz.title}</h2>
                            <Link href={`/quiz/${quiz.id}`} legacyBehavior>
                                <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
                                    Start Quiz
                                </button>
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No quizzes available at the moment.</p>
            )}
        </div>
    );
};

export default QuizList;
