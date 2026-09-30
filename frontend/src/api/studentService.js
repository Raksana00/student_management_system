import axiosInstance from "./axiosInstance";

export const getStudents = ({ page = 1, limit = 10, search = ""} = {}) =>
    axiosInstance.get("/students", {
     params: { page, limit, search: search || undefined },
});

export const createStudent = (studentData) => axiosInstance.post("/students", studentData);
export const updateStudent = (id, studentData) => axiosInstance.put(`/students/${id}`, studentData);
export const deleteStudent = (id) => axiosInstance.delete(`/students/${id}`);

