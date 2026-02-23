import { formatTime } from "@/lib/timerUtils";

type TimerState = "idle" | "ready" | "running";

interface TimerDisplayProps {
    time: number;
    timerState: TimerState;
    onTouchStart: (e: React.TouchEvent | React.MouseEvent) => void;
    onTouchEnd: () => void;
    onTouchLeave?: () => void;
}

export default function TimerDisplay({
    time,
    timerState,
    onTouchStart,
    onTouchEnd,
    onTouchLeave,
}: TimerDisplayProps) {
    let timerColor = "text-black";
    if (timerState === "ready") timerColor = "text-green-500";
    else if (timerState === "running") timerColor = "text-black";

    return (
        <div
            className="neo-box flex-1 flex flex-col items-center justify-center min-h-[400px] bg-white text-center cursor-pointer transition-colors duration-75"
            onPointerDown={onTouchStart}
            onPointerUp={onTouchEnd}
            onPointerLeave={onTouchLeave}
        >
            <h2 className={`text-7xl md:text-[8rem] font-bold tabular-nums tracking-tighter ${timerColor}`}>
                {timerState === "idle" && time === 0 ? "0.00" : formatTime(time)}
            </h2>

            {timerState !== "running" && (
                <>
                    <p className="mt-8 text-sm font-bold text-gray-400 uppercase tracking-widest hidden md:block">
                        Press and hold spacebar to start
                    </p>
                    <p className="mt-8 text-sm font-bold text-gray-400 uppercase tracking-widest md:hidden">
                        Tap and hold to start
                    </p>
                </>
            )}
        </div>
    );
}
