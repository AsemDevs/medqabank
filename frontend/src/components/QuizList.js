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
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            axiosInstance
                .get('/quizzes', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    setQuizzes(response.data);
                    setLoading(false);
                })
                .catch(() => {
                    setError('Failed to fetch quizzes. Please try again later.');
                    setLoading(false);
                });
        } else {
            setIsLoggedIn(false);
            setLoading(false);
        }
    }, []);

    if (loading) {
        return <p>Loading quizzes...</p>;
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
                            {/* Use Link without <a> tag */}
                            <Link href={`/quiz/${quiz.id}`}>
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
