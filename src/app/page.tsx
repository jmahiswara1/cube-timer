"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { generateScramble } from "@/lib/scramble";
import { getSolves, saveSolve, clearSession, calculatePB, calculateAo5, calculateAo12, Solve } from "@/lib/sessionUtils";

import Header from "@/components/Header";
import ScrambleDisplay from "@/components/ScrambleDisplay";
import TimerDisplay from "@/components/TimerDisplay";
import StatsPanel from "@/components/StatsPanel";
import SessionPanel from "@/components/SessionPanel";
import SettingsModal from "@/components/SettingsModal";
import ClearSessionModal from "@/components/ClearSessionModal";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateTimerRef = useRef<(() => void) | null>(null);

  const updateTimer = useCallback(() => {
    const elapsedTime = performance.now() - startTimeRef.current;
    setTime(elapsedTime);
    if (updateTimerRef.current) {
      requestRef.current = requestAnimationFrame(updateTimerRef.current);
    }
  }, []);

  useEffect(() => {
    updateTimerRef.current = updateTimer;
  }, [updateTimer]);

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
    if (e.type === "mousedown" && (e as React.MouseEvent).button !== 0) return; // Only left click
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
  };

  const isTimerActive = timerState !== "idle";

  // Calculate stats
  const pb = calculatePB(sessionData);
  const ao5 = calculateAo5(sessionData);
  const ao12 = calculateAo12(sessionData);

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center gap-6 select-none">
      {!isTimerActive && <Header onOpenSettings={() => setShowSettingsModal(true)} />}

      <main className={`w-full max-w-4xl grid gap-6 flex-1 ${!isTimerActive ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1"}`}>
        <section className={`${!isTimerActive ? "md:col-span-2" : "col-span-1"} flex flex-col gap-6 h-full`}>
          <ScrambleDisplay
            scramble={scramble}
            isTimerRunning={isTimerActive}
            onRegenerate={() => setScramble(generateScramble())}
          />
          <TimerDisplay
            time={time}
            timerState={timerState}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchLeave={timerState === "ready" ? handleTouchEnd : undefined}
          />
        </section>

        {!isTimerActive && (
          <aside className="flex flex-col gap-6 h-full">
            <StatsPanel pb={pb} ao5={ao5} ao12={ao12} />
            <SessionPanel sessionData={sessionData} />
          </aside>
        )}
      </main>

      {showClearModal && (
        <ClearSessionModal onCancel={() => setShowClearModal(false)} onConfirm={confirmClearSession} />
      )}

      {showSettingsModal && (
        <SettingsModal
          onClose={() => setShowSettingsModal(false)}
          onOpenClearModal={() => setShowClearModal(true)}
        />
      )}
    </div>
  );
}
