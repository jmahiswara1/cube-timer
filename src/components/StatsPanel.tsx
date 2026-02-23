import { formatTime } from "@/lib/timerUtils";

interface StatsPanelProps {
    pb: number | null;
    ao5: number | null;
    ao12: number | null;
}

export default function StatsPanel({ pb, ao5, ao12 }: StatsPanelProps) {
    return (
        <div className="neo-box p-4 bg-accent-green flex flex-col gap-3">
            <h3 className="font-bold text-xl border-b-2 border-black pb-2">STATISTICS</h3>
            <div className="flex justify-between font-bold text-lg">
                <span>PB</span>
                <span>{pb ? formatTime(pb) : "--:--"}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
                <span>Ao5</span>
                <span>{ao5 ? formatTime(ao5) : "--:--"}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
                <span>Ao12</span>
                <span>{ao12 ? formatTime(ao12) : "--:--"}</span>
            </div>
        </div>
    );
}
