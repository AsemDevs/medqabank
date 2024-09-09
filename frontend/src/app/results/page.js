"use client"; // Add this at the top

import { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';

const ResultsPage = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Fetch user's quiz results
    axiosInstance.get('/results/user/1').then((response) => {
      setResults(response.data);
    });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Your Quiz Results</h1>
      <ul>
        {results.map((result) => (
          <li key={result.id} className="mb-4">
            <h2 className="text-xl">{result.quiz.title}</h2>
            <p>Score: {result.score}</p>
            <h3 className="mt-2">Your Answers:</h3>
            <ul>
              {result.selectedAnswers.map((answer) => (
                <li key={answer.questionId}>
                  Question {answer.questionId}: {answer.answer}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResultsPage;
