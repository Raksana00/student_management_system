export default function ConfirmModal({isOpen, title = "Confirm Action", message, confirmText = "Confirm", onConfirm, onCancel, loading = false,}) {
    if(!isOpen) return null;

    const handleOverlayClick = (e) => {
        if(e.target === e.currentTarget && !loading) {
            onCancel();
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={handleOverlayClick}>
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 transform transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-600 mb-6">{message}</p>
                <div className="flex justify-end space-x-3">
                    <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer" onClick={onCancel} disabled={loading}>Cancel</button>
                    <button className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50 cursor-pointer" onClick={onConfirm} disabled={loading}>{loading ? "Deleting..." : confirmText }</button>
                </div>
            </div>
        </div>
    )
}