import { RotateCcw } from "lucide-react";

interface ScrambleDisplayProps {
    scramble: string;
    isTimerRunning: boolean;
    onRegenerate: () => void;
}

export default function ScrambleDisplay({ scramble, isTimerRunning, onRegenerate }: ScrambleDisplayProps) {
    if (isTimerRunning) return null;

    return (
        <div className="neo-box p-4 md:p-6 bg-accent-blue text-center relative group min-h-[104px] flex items-center justify-center">
            <p className="text-lg md:text-2xl font-bold tracking-wider leading-relaxed">{scramble}</p>
            <button
                onClick={onRegenerate}
                className="absolute -bottom-4 right-4 neo-button bg-bg-color hover:bg-yellow-400 p-2 rounded-full z-10"
                title="Next Scramble"
            >
                <RotateCcw size={20} />
            </button>
        </div>
    );
}
