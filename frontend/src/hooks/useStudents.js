import { useCallback, useEffect, useState } from "react";
import { createStudent, deleteStudent, getStudents, updateStudent } from "../api/studentService";
import { toast } from "react-toastify"

export default function useStudents({ page, limit, search}) {
    const [students, setStudents] = useState([]);
    const [pagination, setPagination] = useState({ total: 0, page, limit });
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState(null);

    const fetchStudents = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await getStudents({ page, limit, search });
            setStudents(res.data);
            setPagination(res.pagination || { total: res.data.length, page, limit });
        } catch(err) {
            setError(err.message);
            toast.error(err.message);
        }finally {
            setLoading(false);
        }
    }, [page, limit, search]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchStudents();
    }, [fetchStudents]);

    const addStudent = async (values) => {
        try {
            await createStudent(values);
            toast.success("Student added successfullly");
            await fetchStudents();
            return { ok: true };
        }catch (err) {
            toast.error(err.message);
            return { ok: false, error: err};
        }
    };

    const editStudent = async (id, values) => {
        try {
            await updateStudent(id, values);
            toast.success("Student uptadet successfully");
            await fetchStudents();
            return { ok: true};

        }catch (err) {
            toast.error(err.message);
            return{ok: false, error: err};
        }
    };

    const removeStudent = async (id) => {
        setDeleting(true);
        try {
            await deleteStudent(id);
            toast.success("Student deleted successfully");
            await fetchStudents();
            return { ok: true};
        }catch (err) {
            toast.error(err.message);
            return { ok: false, error: err };
        }finally {
            setDeleting(false);
        }
    };

    return {
        students, pagination, loading, deleting, error, fetchStudents, addStudent, editStudent, removeStudent,
    };
}