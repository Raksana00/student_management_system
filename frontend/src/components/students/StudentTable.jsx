import LoadingSpinner from "../common/LoadingSpinner"
import StudentRow from "./StudentRow";

export default function StudentTable({ students, loading, onEdit, onDelete }) {
    if(students.length === 0) {
        return loading ? (
            <LoadingSpinner />
        ) : (
        <div>No students found in the system</div>
    );
    }
  return (
    <div className="relative overflow-x-auto">
        {loading && <LoadingSpinner overlay />}
        <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">#</th>
              <th className="px-6 py-3.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">First Name</th>
              <th className="px-6 py-3.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">Last Name</th>
              <th className="px-6 py-3.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">Major</th>
              <th className="px-6 py-3.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">GPA</th>
              <th className="px-6 py-3.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">Registration Date</th>
              <th className="px-6 py-3.5 text-xs font-semibold text-gray-600 uppercase tracking-wider text-right">Actions</th>
            </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
            {students.map((student, index) => (
                <StudentRow key={student.id} student={student} index={index + 1} onEdit={onEdit} onDelete={onDelete}/>
            ))}
        </tbody>

        </table>
    </div>
  )
}
