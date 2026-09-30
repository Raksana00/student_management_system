import { formatDate } from "../../utils/formatDate"

export default function StudentRow({ student, index, onEdit, onDelete }) {

  return (
   <tr className="hover:bg-gray-50 transition-colors border-b border-gray-200">
        <td className="px-6 py-4 text-sm text-gray-500 font-medium">{index}</td>
        <td className="px-6 py-4 text-sm font-medium text-gray-900">{student.first_name}</td>
        <td className="px-6 py-4 text-sm font-medium text-gray-900">{student.last_name}</td>
        <td className="px-6 py-4 text-sm text-gray-600">{student.major}</td>
        <td className="px-6 py-4 text-sm text-gray-600">{student.email}</td>
        <td className="px-6 py-4 text-sm text-gray-600">{student.gpa}</td>
        <td className="px-6 py-4 text-sm text-gray-500">{formatDate(student.created_at)}</td>
        <td className="px-6 py-4 text-sm font-medium text-right space-x-2">
            <button className="text-indigo-600 hover:text-indigo-900 font-semibold cursor-pointer" onClick={() => onEdit(student)}>Edit</button>
            <button className="text-red-600 hover:text-red-900 font-semibold cursor-pointer" onClick={() => onDelete(student)}>Delete</button>
        </td>
    </tr>
  )
}
