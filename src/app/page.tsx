"use client";

import { Settings, RotateCcw, Trash2, X } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { formatTime } from "@/lib/timerUtils";
import { generateScramble } from "@/lib/scramble";
import { getSolves, saveSolve, clearSession, calculatePB, calculateAo5, calculateAo12, Solve } from "@/lib/sessionUtils";

type TimerState = "idle" | "ready" | "running";

export default function Home() {
  const [time, setTime] = useState(0);
  const [scramble, setScramble] = useState("");
  const [timerState, setTimerState] = useState<TimerState>("idle");
  const [sessionData, setSessionData] = useState<Solve[]>([]);

  const requestRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  // Initialize scramble on first load
  useEffect(() => {
    setScramble(generateScramble());
    setSessionData(getSolves());
  }, []);

  const updateTimer = useCallback((timestamp: number) => {
    const elapsedTime = timestamp - startTimeRef.current;
    setTime(elapsedTime);
    requestRef.current = requestAnimationFrame(updateTimer);
  }, []);

  const startTimer = useCallback(() => {
    setTimerState("running");
    startTimeRef.current = performance.now();
    requestRef.current = requestAnimationFrame(updateTimer);
  }, [updateTimer]);

  const stopTimer = useCallback(() => {
    setTimerState("idle");
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }

    // Hitung final time dan simpan
    const finalTime = performance.now() - startTimeRef.current;
    setTime(finalTime);

    saveSolve(finalTime, scramble);
    setSessionData(getSolves());

    // Set scramble baru setelah solve
    setScramble(generateScramble());
  }, [scramble]);

  // Memastikan cleanup frame saat komponen dibongkar
  useEffect(() => {
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // Handle Spacebar Logic
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault(); // Mencegah scrolling
        if (timerState === "idle") {
          setTimerState("ready");
          setTime(0);
        } else if (timerState === "running") {
          stopTimer();
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space" && timerState === "ready") {
        startTimer();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [timerState, startTimer, stopTimer]);

  // Touch area logic for mobile
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    if (e.type === 'mousedown' && (e as React.MouseEvent).button !== 0) return; // Only left click
    if (timerState === "idle") {
      setTimerState("ready");
      setTime(0);
    } else if (timerState === "running") {
      stopTimer();
    }
  };

  const handleTouchEnd = () => {
    if (timerState === "ready") {
      startTimer();
    }
  };

  const [showClearModal, setShowClearModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const confirmClearSession = () => {
    clearSession();
    setSessionData([]);
    setShowClearModal(false);
    setShowSettingsModal(false);
  }

  // Determine main timer color
  let timerColor = "text-black";
  if (timerState === "ready") timerColor = "text-green-500";
  else if (timerState === "running") timerColor = "text-black";

  const isTimerActive = timerState !== "idle";

  // Calculate stats
  const pb = calculatePB(sessionData);
  const ao5 = calculateAo5(sessionData);
  const ao12 = calculateAo12(sessionData);

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center gap-6 select-none">

      {/* Header Panel */}
      {!isTimerActive && (
        <header className="w-full max-w-4xl flex justify-between items-center text-xl font-bold neo-box px-6 py-4">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Cube Timer Neo Logo" width={24} height={24} className="w-6 h-6 object-contain" />
            <h1>CUBE TIMER</h1>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setShowSettingsModal(true)}
              className="neo-button bg-bg-color hover:bg-yellow-400 p-2"
              title="Settings"
            >
              <Settings size={24} />
            </button>
          </div>
        </header>
      )}

      {/* Main Content Grid */}
      <main className={`w-full max-w-4xl grid gap-6 flex-1 ${!isTimerActive ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1"}`}>

        {/* Timer & Scramble Section (Left + Center) */}
        <section className={`${!isTimerActive ? "md:col-span-2" : "col-span-1"} flex flex-col gap-6 h-full`}>

          {/* Scramble Display */}
          {!isTimerActive && (
            <div className="neo-box p-4 md:p-6 bg-accent-blue text-center relative group min-h-[104px] flex items-center justify-center">
              <p className="text-lg md:text-2xl font-bold tracking-wider leading-relaxed">{scramble}</p>
              <button
                onClick={() => setScramble(generateScramble())}
                className="absolute -bottom-4 right-4 neo-button bg-bg-color hover:bg-yellow-400 p-2 rounded-full z-10"
                title="Next Scramble"
              >
                <RotateCcw size={20} />
              </button>
            </div>
          )}

          {/* Main Timer Display */}
          <div
            className="neo-box flex-1 flex flex-col items-center justify-center min-h-[400px] bg-white text-center cursor-pointer transition-colors duration-75"
            onPointerDown={handleTouchStart}
            onPointerUp={handleTouchEnd}
            onPointerLeave={timerState === "ready" ? handleTouchEnd : undefined}
          >
            <h2 className={`text-7xl md:text-[8rem] font-bold tabular-nums tracking-tighter ${timerColor}`}>
              {timerState === 'idle' && time === 0 ? "0.00" : formatTime(time)}
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

        </section>

        {/* Sidebar (Stats & Session) */}
        {!isTimerActive && (
          <aside className="flex flex-col gap-6 h-full">

            {/* Stats Summary */}
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

            {/* Session History */}
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
                    No solves yet.<br />Get started!
                  </div>
                ) : (
                  sessionData.map((solve, index) => (
                    <div key={solve.id} className="flex justify-between items-center p-2 border-2 border-transparent hover:border-black bg-gray-50 text-sm font-bold">
                      <span className="text-gray-500 w-6">{sessionData.length - index}.</span>
                      <span className="flex-1 text-right">{formatTime(solve.time)}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

          </aside>
        )}

      </main>

      {/* Clear Session Modal */}
      {showClearModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="neo-box bg-white max-w-sm w-full p-6 flex flex-col gap-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-2xl font-bold border-b-2 border-black pb-2">Hapus Sesi?</h3>
            <p className="font-bold text-gray-600">
              Apakah Anda yakin ingin menghapus semua riwayat waktu? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex justify-end gap-4 mt-2">
              <button
                onClick={() => setShowClearModal(false)}
                className="neo-button px-4 py-2 bg-gray-200 hover:bg-gray-300 font-bold"
              >
                Batal
              </button>
              <button
                onClick={confirmClearSession}
                className="neo-button px-4 py-2 bg-red-500 hover:bg-red-600 text-black font-bold tracking-wide"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="neo-box bg-white max-w-md w-full p-6 flex flex-col gap-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex justify-between items-center border-b-2 border-black pb-2">
              <h3 className="text-2xl font-bold">Settings</h3>
              <button onClick={() => setShowSettingsModal(false)} className="hover:text-red-500 transition-colors">
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
                  onClick={() => setShowClearModal(true)}
                  className="neo-button p-2 bg-red-500 hover:bg-red-600 text-black"
                  title="Clear Session"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
