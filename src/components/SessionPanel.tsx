import { formatTime } from "@/lib/timerUtils";
import { Solve } from "@/lib/sessionUtils";

interface SessionPanelProps {
    sessionData: Solve[];
}

export default function SessionPanel({ sessionData }: SessionPanelProps) {
    return (
        <div className="neo-box p-4 flex-1 flex flex-col gap-3 bg-white overflow-hidden min-h-[300px]">
            <div className="flex justify-between items-center border-b-2 border-black pb-2">
                <h3 className="font-bold text-xl">SESSION</h3>
                <div className="flex items-center gap-2">
                    <span className="text-xs bg-black text-white px-2 py-1 font-bold">{sessionData.length} Solves</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-2">
                {sessionData.length === 0 ? (
                    <div className="text-center text-sm font-bold text-gray-400 py-8">
                        No solves yet.
                        <br />
                        Get started!
                    </div>
                ) : (
                    sessionData.map((solve, index) => (
                        <div
                            key={solve.id}
                            className="flex justify-between items-center p-2 border-2 border-transparent hover:border-black bg-gray-50 text-sm font-bold"
                        >
                            <span className="text-gray-500 w-6">{sessionData.length - index}.</span>
                            <span className="flex-1 text-right">{formatTime(solve.time)}</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
