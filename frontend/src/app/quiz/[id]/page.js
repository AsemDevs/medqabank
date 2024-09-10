"use client"; // Ensure this is a client component

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Ensure you use 'next/navigation' instead of 'next/router'
import axiosInstance from '../../../utils/axiosInstance';

const QuizPage = ({ params }) => {
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track the current question index
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    axiosInstance.get(`/quizzes/${id}`).then((response) => {
      setQuiz(response.data);
    });
  }, [id]);

  const handleAnswerChange = (questionId, answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answer,
    });
  };

  const handleSubmit = async () => {
    const resultData = {
      quiz: { id: quiz.id },
      score: calculateScore(),
      selectedAnswers: Object.keys(selectedAnswers).map((questionId) => ({
        questionId: parseInt(questionId, 10),
        answer: selectedAnswers[questionId],
      })),
    };

    // Submit the quiz result
    await axiosInstance.post('/results', resultData);
    setSubmitted(true);
  };

  const calculateScore = () => {
    let score = 0;
    quiz.questions.forEach((question) => {
      if (question.correctAnswer === selectedAnswers[question.id]) {
        score += 10; // Assuming 10 points per correct answer
      }
    });
    return score;
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  if (!quiz) return <p>Loading...</p>;

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">{quiz.title}</h1>

      {/* Progress Bar */}
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
              Progress
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
          <div
            style={{
              width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%`,
            }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
          ></div>
        </div>
      </div>

      {/* Question Number */}
      <p className="text-lg font-bold">
        Question {currentQuestionIndex + 1} of {quiz.questions.length}
      </p>

      <p className="text-xl">{currentQuestion.text}</p>
      <ul className="mt-2">
        {currentQuestion.options.map((option) => (
          <li key={option}>
            <input
              type="radio"
              name={`question-${currentQuestion.id}`}
              value={option}
              onChange={() => handleAnswerChange(currentQuestion.id, option)}
              checked={selectedAnswers[currentQuestion.id] === option}
            />{' '}
            {option}
          </li>
        ))}
      </ul>

      {/* Navigation Buttons */}
      <div className="mt-4 flex justify-between">
        <button
          className="px-4 py-2 bg-gray-300 text-black rounded"
          onClick={goToPreviousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>
        {currentQuestionIndex < quiz.questions.length - 1 ? (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={goToNextQuestion}
          >
            Next
          </button>
        ) : (
          <button
            className="px-4 py-2 bg-green-500 text-white rounded"
            onClick={handleSubmit}
          >
            Submit Quiz
          </button>
        )}
      </div>

      {/* Display feedback after submission */}
      {submitted && <p className="mt-4 text-green-500">Quiz submitted successfully!</p>}
    </div>
  );
};

export default QuizPage;
