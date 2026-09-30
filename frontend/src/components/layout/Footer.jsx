export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 text-center text-sm text-gray-500 mt-auto">
      <p>© {new Date().getFullYear()} Student Management System. All rights reserved.</p>
    </footer>
  );
}