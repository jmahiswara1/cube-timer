interface ClearSessionModalProps {
    onCancel: () => void;
    onConfirm: () => void;
}

export default function ClearSessionModal({ onCancel, onConfirm }: ClearSessionModalProps) {
    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="neo-box bg-white max-w-sm w-full p-6 flex flex-col gap-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="text-2xl font-bold border-b-2 border-black pb-2">Hapus Sesi?</h3>
                <p className="font-bold text-gray-600">
                    Apakah Anda yakin ingin menghapus semua riwayat waktu? Tindakan ini tidak dapat dibatalkan.
                </p>
                <div className="flex justify-end gap-4 mt-2">
                    <button onClick={onCancel} className="neo-button px-4 py-2 bg-gray-200 hover:bg-gray-300 font-bold">
                        Batal
                    </button>
                    <button
                        onClick={onConfirm}
                        className="neo-button px-4 py-2 bg-red-500 hover:bg-red-600 text-black font-bold tracking-wide"
                    >
                        Hapus
                    </button>
                </div>
            </div>
        </div>
    );
}
