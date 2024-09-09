import QuizList from '../components/QuizList';
import Link from 'next/link'; // Import Link for navigation

export default function Home() {
  return (
    <div className="container mx-auto p-8">
      {/* Add the login link */}
      <div className="mb-6">
        <Link href="/login" className="text-blue-500">
          Login
        </Link>
      </div>

      {/* Keep the QuizList as it is */}
      <QuizList />
    </div>
  );
}
