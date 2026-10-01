import { useState } from "react"
import useDebounce from "../hooks/useDebounce";
import useStudents from "../hooks/useStudents";
import SearchBar from "../components/students/SearchBar";
import StudentTable from "../components/students/StudentTable";
import Pagination from "../components/students/Pagination";
import StudentForm from "../components/students/StudentForm";
import ConfirmModal from "../components/common/ConfirmModal";


export default function StudentsPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 400);

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingStudentId, setDeletingStudentId] = useState(null);

  // useEffect(() => {
  //   setPage(1);
  // }, [debouncedSearch]);

  const handleSeacrhChange = (newSearch) => {
    setSearch(newSearch);
    setPage(1);
  }

  const {students, pagination, loading, deleting, addStudent, editStudent, removeStudent} = useStudents({ page, limit, search: debouncedSearch });

  const handleOpenAddModal = () => {
    setEditingStudent(null);
    setIsFormModalOpen(true);
  }
  
  const handleOpenEditModal = (student) => {
    setEditingStudent(student);
    setIsFormModalOpen(true);
  };

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
    setEditingStudent(null);
  };

  const handleFormSubmit = async (formData) => {
    let result;
    if(editingStudent) {
      result = await editStudent(editingStudent.id, formData);
    } else {
      result = await addStudent(formData);
    }

    if (result.ok) {
      handleCloseFormModal();
    }
    return result;
  };

  const handleOpenDeleteModal = (id) => {
    setDeletingStudentId(id);
    setIsDeleteModalOpen(true);
  }

  const handleConformDelete = async () => {
    if(!deletingStudentId) return;
    const result = await removeStudent(deletingStudentId);
    if(result.ok) {
      setIsDeleteModalOpen(false);
      setDeletingStudentId(null);
    }
  }





    return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Student Management System</h2>
        <button className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors cursor-pointer" onClick={handleOpenAddModal}>Add New Student</button>
      </div>
      
      <div className="w-full">
        <SearchBar value={search} onChange={handleSeacrhChange}/>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <StudentTable students={students} loading={loading} onEdit={handleOpenEditModal} onDelete={handleOpenDeleteModal}/>
      </div>

      <div>
        <Pagination page={page} limit={limit} total={pagination?.total || 0} onPageChange={(newPage) => setPage(newPage)}/>
      </div>

      {isFormModalOpen && (
        <div>
          <div>
            <StudentForm mode={editingStudent ? 'edit' : 'add'} initialValues={editingStudent} onSubmit={handleFormSubmit} onCancel={handleCloseFormModal}/>
          </div>
        </div>
      )}

      <ConfirmModal isOpen={isDeleteModalOpen} title="Delete Student" message="Are you sure you want to delete this student from the system? This action cannot ve undone"
      confirmText="Delete" loading={deleting} onConfirm={handleConformDelete} onCancel={() => setIsDeleteModalOpen(false)}/>

    </div>
  )
}
