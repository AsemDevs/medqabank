"use client"; // Add this at the top

import { useEffect, useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import { useRouter } from 'next/navigation'; // Correct import

const QuizPage = ({ params }) => {
  const [quiz, setQuiz] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    // Fetch quiz by ID
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
    router.push('/results');
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

  if (!quiz) return <p>Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">{quiz.title}</h1>
      <ul className="mt-4">
        {quiz.questions.map((question) => (
          <li key={question.id} className="mb-6">
            <p className="text-xl">{question.text}</p>
            <ul className="mt-2">
              {question.options.map((option) => (
                <li key={option}>
                  <input
                    type="radio"
                    name={`question-${question.id}`}  // Ensure unique names per question
                    value={option}
                    onChange={() => handleAnswerChange(question.id, option)}
                    checked={selectedAnswers[question.id] === option} // Check if the option is selected
                  />{' '}
                  {option}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <button
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
        onClick={handleSubmit}
      >
        Submit Quiz
      </button>
    </div>
  );
};

export default QuizPage;
