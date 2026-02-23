export interface Solve {
    id: string;
    time: number; // in milliseconds
    scramble: string;
    date: number; // timestamp
}

const STORAGE_KEY = "cube_timer_sessions";

export function getSolves(): Solve[] {
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

export function saveSolve(time: number, scramble: string): Solve {
    const solves = getSolves();
    const newSolve: Solve = {
        id: crypto.randomUUID(),
        time,
        scramble,
        date: Date.now(),
    };

    const updatedSolves = [newSolve, ...solves];
    if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSolves));
    }
    return newSolve;
}

export function clearSession() {
    if (typeof window !== "undefined") {
        localStorage.removeItem(STORAGE_KEY);
    }
}

// Menghitung waktu tercepat
export function calculatePB(solves: Solve[]): number | null {
    if (solves.length === 0) return null;
    return Math.min(...solves.map((s) => s.time));
}

// Menghitung Average of N (membuang 1 terbaik & 1 terburuk)
export function calculateAoN(solves: Solve[], n: number): number | null {
    if (solves.length < n) return null;

    // Ambil N solve terakhir (karena array kita [baru, lama], kita ambil 0 sampai n)
    const recentSolves = solves.slice(0, n);
    const times = recentSolves.map((s) => s.time).sort((a, b) => a - b);

    // Buang tercepat (index 0) dan terlama (index terakhir)
    times.pop();
    times.shift();

    const sum = times.reduce((acc, curr) => acc + curr, 0);
    return sum / times.length;
}

export function calculateAo5(solves: Solve[]): number | null {
    return calculateAoN(solves, 5);
}

export function calculateAo12(solves: Solve[]): number | null {
    return calculateAoN(solves, 12);
}
