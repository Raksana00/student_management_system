export default function LoadingSpinner({ text = "Loading...", overlay = false }) {
  return (
    <div className={overlay ? "fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm" : "flex flex-col items-center justify-center p-8"}>
      <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-3" />
      {!overlay && <span className="text-sm font-medium text-gray-600">{text}</span>}
    </div>
  );
}