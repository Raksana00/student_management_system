export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full">
      <input
        type="text"
        className="w-full px-4 py-2.5 pl-10 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm"
        placeholder="Search by first or last name..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
      </div>
    </div>
  );
}