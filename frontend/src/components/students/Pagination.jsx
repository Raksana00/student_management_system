import { ChevronLeft, ChevronRight } from "lucide-react"
export default function Pagination({ page, limit, total, onPageChange }) {
    const totalPages = Math.ceil(total / limit);

    if(totalPages <= 1) return null;
  return (
   <div className="flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm mt-4">
        <button className="flex items-center px-3.5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer" onClick={() => onPageChange(page - 1)} disabled={page - 1 <= 0}> <ChevronLeft className="w-4 h-4 mr-1" /> <span>Previous</span></button>
        <span className="text-sm font-medium text-gray-700">Page <span className="font-semibold">{page}</span> of <span className="font-semibold">{totalPages}</span></span>
        <button className="flex items-center px-3.5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer" onClick={() => onPageChange(page + 1)} disabled={page >= totalPages}><span className="mr-1">Next</span> <ChevronRight className="w-4 h-4" /></button>
    </div>
  )
}
