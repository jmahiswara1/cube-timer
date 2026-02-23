import { X, Trash2 } from "lucide-react";

interface SettingsModalProps {
    onClose: () => void;
    onOpenClearModal: () => void;
}

export default function SettingsModal({ onClose, onOpenClearModal }: SettingsModalProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="neo-box bg-white max-w-md w-full p-6 flex flex-col gap-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex justify-between items-center border-b-2 border-black pb-2">
                    <h3 className="text-2xl font-bold">Settings</h3>
                    <button onClick={onClose} className="hover:text-red-500 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center neo-box p-4 bg-gray-50">
                        <div>
                            <h4 className="font-bold text-lg">Clear Session History</h4>
                            <p className="text-sm text-gray-500">Delete all your solved times</p>
                        </div>
                        <button
                            onClick={onOpenClearModal}
                            className="neo-button p-2 bg-red-500 hover:bg-red-600 text-black"
                            title="Clear Session"
                        >
                            <Trash2 size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
