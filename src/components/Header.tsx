import Image from "next/image";
import { Settings } from "lucide-react";

interface HeaderProps {
    onOpenSettings: () => void;
}

export default function Header({ onOpenSettings }: HeaderProps) {
    return (
        <header className="w-full max-w-4xl flex justify-between items-center text-xl font-bold neo-box px-6 py-4">
            <div className="flex items-center gap-2">
                <Image src="/logo.png" alt="Cube Timer Neo Logo" width={24} height={24} className="w-6 h-6 object-contain" />
                <h1>CUBE TIMER</h1>
            </div>
            <div className="flex gap-4">
                <button
                    onClick={onOpenSettings}
                    className="neo-button bg-bg-color hover:bg-yellow-400 p-2"
                    title="Settings"
                >
                    <Settings size={24} />
                </button>
            </div>
        </header>
    );
}
