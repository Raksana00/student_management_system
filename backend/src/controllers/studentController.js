const db = require('../config/db');

const getStudents = async (req, res, next) => {
    try {
        const { search, page = 1, limit = 10 } = req.query;
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const offset = (pageNum - 1) * limitNum;

        let query = "SELECT * FROM students";
        let countQuery = "SELECT COUNT(*) as total FROM students";
        let queryParams = [];
        let countParams = [];

        if (search) {
            query += " WHERE first_name LIKE ? OR last_name LIKE ?";
            countQuery += " WHERE first_name LIKE ? OR last_name LIKE ?";
            const searchParam = `%${search}%`;
            queryParams.push(searchParam, searchParam);
            countParams.push(searchParam, searchParam);
        }

        query += " ORDER BY created_at DESC LIMIT ? OFFSET ?";
        queryParams.push(limitNum, offset);

        const [students] = await db.query(query, queryParams);
        const [countResult] = await db.query(countQuery, countParams);
        const total = countResult[0].total;

        res.status(200).json({
            success: true,
            data: students,
            pagination: {
                total,
                page: pageNum,
                limit: limitNum
            }
        });
    } catch (error) {
        next(error);
    }
};

const createStudent = async (req, res, next) => {
    try {
        const { first_name, last_name, major, email, gpa } = req.body;

        const [existing] = await db.query("SELECT * FROM students WHERE email = ?", [email]);
        if (existing.length > 0) {
            const error = new Error("A student with this email address is already registered.");
            error.statusCode = 400;
            error.code = "DUPLICATE_EMAIL";
            return next(error);
        }

        const [result] = await db.query(
            "INSERT INTO students (first_name, last_name, major, email, gpa) VALUES (?, ?, ?, ?, ?)",
            [first_name, last_name, major, email, gpa]
        );

        const [newStudent] = await db.query("SELECT * FROM students WHERE id = ?", [result.insertId]);

        res.status(201).json({
            success: true,
            data: newStudent[0]
        });
    } catch (error) {
        next(error);
    }
};

const updateStudent = async (req, res, next) => {
    try {
        const studentId = req.params.id;
        const { first_name, last_name, major, email, gpa } = req.body;

        const [studentCheck] = await db.query("SELECT * FROM students WHERE id = ?", [studentId]);
        if (studentCheck.length === 0) {
            const error = new Error("The requested student was not found.");
            error.statusCode = 404;
            error.code = "STUDENT_NOT_FOUND";
            return next(error);
        }

        if (email && email !== studentCheck[0].email) {
            const [emailCheck] = await db.query("SELECT * FROM students WHERE email = ? AND id != ?", [email, studentId]);
            if (emailCheck.length > 0) {
                const error = new Error("This email is already in use by another student.");
                error.statusCode = 400;
                error.code = "DUPLICATE_EMAIL";
                return next(error);
            }
        }

        await db.query(
            "UPDATE students SET first_name = ?, last_name = ?, major = ?, email = ?, gpa = ? WHERE id = ?",
            [first_name, last_name, major, email, gpa, studentId]
        );

        const [updatedStudent] = await db.query("SELECT * FROM students WHERE id = ?", [studentId]);

        res.status(200).json({
            success: true,
            data: updatedStudent[0]
        });
    } catch (error) {
        next(error);
    }
};

const deleteStudent = async (req, res, next) => {
    try {
        const studentId = req.params.id;

        const [studentCheck] = await db.query("SELECT * FROM students WHERE id = ?", [studentId]);
        if (studentCheck.length === 0) {
            const error = new Error("The student to be deleted was not found.");
            error.statusCode = 404;
            error.code = "STUDENT_NOT_FOUND";
            return next(error);
        }

        await db.query("DELETE FROM students WHERE id = ?", [studentId]);

        res.status(200).json({
            success: true,
            data: { message: "Student successfully deleted." }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getStudents,
    createStudent,
    updateStudent,
    deleteStudent
};