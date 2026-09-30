import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <h1 className="text-6xl font-extrabold text-indigo-600 mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-8">The page you are looking for could not be found.</p>
      <Link to="/students" className="px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors">
        Back to Students Page
      </Link>
    </div>
  );
}