import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-indigo-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/students" className="text-xl font-bold text-white hover:text-indigo-100 transition-colors">
          Student Management System
        </Link>
      </div>
    </header>
  );
}