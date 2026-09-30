import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { studentSchema } from "../../utils/validation";

const FIELDS = [
    {name: "first_name", label: "First Name", type: "text"},
    {name: "last_name", label: "Last Name", type: "text"},
    {name: "major", label: "Major", type: "text"},
    {name: "email", label: "Email Address", type: "email"},
    {name: "gpa", label: "GPA", type: "number", min: 0, max: 100},
];

const toFormValues = (student) => ({
    first_name: student?.first_name ?? "",
    last_name: student?.last_name ?? "",
    major: student?.major ?? "",
    email: student?.email ?? "",
    gpa: student?.gpa != null ? String(student.gpa) : "",
})

export default function StudentForm({
  mode = "add",
  initialValues,
  onSubmit,
  onCancel,
}) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(studentSchema),
    defaultValues: toFormValues(initialValues),
  });

  const submitHandler = async (data) => {
    const result = await onSubmit(data);

    if (!result.ok && result.error?.code === "EMAIL_EXISTS") {
      setError("email", { type: "server", message: result.error?.message || "This email has already been used" });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 transform transition-all">
        <h3 className="text-xl font-bold text-gray-900 mb-6">{mode === "edit" ? "Edit Student" : "Add New Student"}</h3>

        <form onSubmit={handleSubmit(submitHandler)} noValidate>
          <fieldset disabled={isSubmitting} className="space-y-4">
            {FIELDS.map(({ name, label, ...inputProps }) => (
              <div key={name} className="flex flex-col">
                <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <input
                  id={name}
                  className="w-full px-3.5 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm disabled:bg-gray-50 disabled:text-gray-500"
                  {...inputProps}
                  {...register(name)}
                />
                {errors[name] && (
                  <span className="text-xs text-red-600 mt-1">{errors[name].message}</span>
                )}
              </div>
            ))}
          </fieldset>

          <div className="flex justify-end space-x-3 mt-8">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Saving..."
                : mode === "edit"
                ? "Update"
                : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
