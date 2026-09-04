"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RobotCanvas } from "@/components/ui/robot-hero";
import { ShieldCheck, Cpu, Radio, Sparkles, Terminal, X } from "lucide-react";

interface CinematicIntroProps {
  onComplete?: () => void;
  forceShow?: boolean;
}

// Optional synthetic web audio for sci-fi boot sound without external mp3 dependencies
function playSciFiChime() {
  if (typeof window === "undefined") return;
  try {
    const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.35);
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  } catch {
    // AudioContext blocked or not allowed by browser autoplay policy
  }
}

export function CinematicIntro({ onComplete, forceShow = false }: CinematicIntroProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [stage, setStage] = useState<"scanning" | "handshake" | "unlocking" | "done">("scanning");
  const [robotAwake, setRobotAwake] = useState(false);
  const timerRef = useRef<NodeJS.Timeout[]>([]);

  const handleFinish = useCallback(() => {
    timerRef.current.forEach(clearTimeout);
    setIsVisible(false);
    setStage("done");
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem("cinematic_intro_seen", "true");
      } catch {}
    }
    onComplete?.();
  }, [onComplete]);

  // Initial setup & session detection
  useEffect(() => {
    if (typeof window === "undefined") return;

    const seen = sessionStorage.getItem("cinematic_intro_seen");
    if (!seen || forceShow) {
      setIsVisible(true);
      setStage("scanning");
      playSciFiChime();

      // Timeline sequence:
      // 0.0s - 1.2s: Biometric scanning of Jithendra
      // 1.2s - 2.3s: Neural link & Robot wake-up
      // 2.3s - 3.1s: Cinematic shockwave & reveal
      const t1 = setTimeout(() => {
        setStage("handshake");
        setRobotAwake(true);
        window.dispatchEvent(new CustomEvent("trigger-robot-love"));
        playSciFiChime();
      }, 1200);

      const t2 = setTimeout(() => {
        setStage("unlocking");
      }, 2300);

      const t3 = setTimeout(() => {
        handleFinish();
      }, 3100);

      timerRef.current = [t1, t2, t3];
    } else {
      onComplete?.();
    }

    // Keyboard listener for Escape key to skip instantly
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleFinish();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // Global listener to replay intro on demand
    const handleReplay = () => {
      setIsVisible(true);
      setStage("scanning");
      setRobotAwake(false);
      const t1 = setTimeout(() => {
        setStage("handshake");
        setRobotAwake(true);
        window.dispatchEvent(new CustomEvent("trigger-robot-love"));
      }, 1200);
      const t2 = setTimeout(() => setStage("unlocking"), 2300);
      const t3 = setTimeout(() => handleFinish(), 3100);
      timerRef.current = [t1, t2, t3];
    };
    window.addEventListener("replay-cinematic-intro", handleReplay);

    return () => {
      timerRef.current.forEach(clearTimeout);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("replay-cinematic-intro", handleReplay);
    };
  }, [forceShow, handleFinish, onComplete]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="cinematic-overlay"
        initial={{ opacity: 1 }}
        animate={{ opacity: stage === "unlocking" ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.65, ease: "easeInOut" }}
        className="fixed inset-0 z-[200] bg-[#07090e] text-white flex flex-col justify-between overflow-hidden select-none"
      >
        {/* Top Anamorphic Letterbox Bar */}
        <motion.div
          initial={{ scaleY: 1 }}
          animate={{ scaleY: stage === "unlocking" ? 0 : 1 }}
          transition={{ duration: 0.65, ease: "easeInOut" }}
          className="origin-top w-full h-12 sm:h-16 bg-black z-30 flex items-center justify-between px-6 sm:px-12 border-b border-white/10"
        >
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-cyan-400">
            <Radio className="size-3.5 animate-pulse text-cyan-400" />
            <span className="hidden sm:inline">SYS_BOOT // AGENTIC_CORE_V2.6</span>
            <span className="sm:hidden">SYS_BOOT</span>
          </div>

          <button
            onClick={handleFinish}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white border border-white/20 transition duration-200 cursor-pointer"
          >
            <span>Skip [ESC]</span>
            <X className="size-3" />
          </button>
        </motion.div>

        {/* Center Stage: Holographic Biometric Scan & Robot Awakening */}
        <div className="relative flex-1 w-full max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 my-auto">
          
          {/* Ambient Cybernetic Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ffff08_1px,transparent_1px),linear-gradient(to_bottom,#00ffff08_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

          {/* Left / Center Node: Operator Biometric HUD (jithendra.jpeg) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative flex flex-col items-center"
          >
            {/* Holographic HUD Frame */}
            <div className="relative p-2.5 rounded-2xl bg-slate-900/80 border border-cyan-500/40 shadow-[0_0_40px_rgba(0,255,198,0.2)] backdrop-blur-md group">
              
              {/* Corner targeting reticles */}
              <div className="absolute -top-1 -left-1 w-3.5 h-3.5 border-t-2 border-l-2 border-cyan-400" />
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 border-t-2 border-r-2 border-cyan-400" />
              <div className="absolute -bottom-1 -left-1 w-3.5 h-3.5 border-b-2 border-l-2 border-cyan-400" />
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 border-b-2 border-r-2 border-cyan-400" />

              {/* Laser Scanline */}
              <motion.div
                initial={{ top: "0%" }}
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#00ffc6] z-20 pointer-events-none"
              />

              {/* Operator Photo */}
              <div className="relative w-44 sm:w-56 aspect-[3/4] rounded-xl overflow-hidden bg-black/60">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/jithendra.jpeg"
                  alt="Kandula Jithendra Subramanyam"
                  className="w-full h-full object-cover filter contrast-[1.08] brightness-[0.95]"
                />
                <div className="absolute inset-0 bg-cyan-950/20 mix-blend-overlay pointer-events-none" />
              </div>

              {/* Status Badge */}
              <div className="mt-2.5 flex items-center justify-between px-1 text-[10px] font-mono text-cyan-300">
                <span className="flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-cyan-400 animate-ping" />
                  OPERATOR // AUTH_OK
                </span>
                <span className="text-neutral-400">ROOT_256</span>
              </div>
            </div>

            {/* Operator Telemetry Caption */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-3 text-center"
            >
              <h3 className="text-sm sm:text-base font-mono uppercase tracking-wider text-white font-semibold">
                Kandula Jithendra
              </h3>
              <p className="text-[11px] font-mono text-cyan-400/90 tracking-wide">
                Agentic AI & Quantitative Systems
              </p>
            </motion.div>
          </motion.div>

          {/* Center Connector: Neural Synapse Handshake Pulse */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{
              opacity: stage === "handshake" || stage === "unlocking" ? 1 : 0.3,
              scaleX: 1,
            }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center text-center px-4"
          >
            <div className="relative flex items-center justify-center w-24 sm:w-32 h-1 bg-gradient-to-r from-cyan-500/80 via-emerald-400 to-cyan-500/80 rounded-full shadow-[0_0_15px_#00ffc6]">
              <motion.div
                animate={{ x: [-20, 20, -20] }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                className="size-3 rounded-full bg-white shadow-[0_0_10px_#ffffff]"
              />
            </div>
            <span className="mt-2 text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
              {stage === "scanning" ? "HANDSHAKE PENDING..." : "NEURAL LINK ACTIVE"}
            </span>
          </motion.div>

          {/* Right Node: 3D Robot Awakening */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative flex flex-col items-center justify-center"
          >
            <div className="relative w-48 sm:w-60 h-48 sm:h-60 flex items-center justify-center">
              {/* Radial Energy Ring behind Robot */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0.2 }}
                animate={{
                  scale: robotAwake ? [1, 1.15, 1] : 0.85,
                  opacity: robotAwake ? [0.4, 0.7, 0.4] : 0.2,
                }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 rounded-full bg-cyan-500/10 blur-xl pointer-events-none"
              />

              {/* 3D Robot Canvas */}
              <RobotCanvas
                className="w-full h-full pointer-events-none"
                scale={0.9}
                pantallaColor="#00ffc6"
                pantallaBrillo={robotAwake ? 1.8 : 0.15}
              />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-1 text-center"
            >
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-300 flex items-center justify-center gap-1.5">
                <Cpu className="size-3 text-cyan-400" />
                <span>AI COMPANION // ONLINE</span>
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Anamorphic Letterbox Bar */}
        <motion.div
          initial={{ scaleY: 1 }}
          animate={{ scaleY: stage === "unlocking" ? 0 : 1 }}
          transition={{ duration: 0.65, ease: "easeInOut" }}
          className="origin-bottom w-full h-12 sm:h-16 bg-black z-30 flex items-center justify-between px-6 sm:px-12 border-t border-white/10"
        >
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <Terminal className="size-3.5 text-cyan-400" />
            <span className="hidden sm:inline">INITIALIZING ENVIRONMENT TELEMETRY & MULTI-AGENT SWARM...</span>
            <span className="sm:hidden">SYSTEM READY</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-neutral-500">
              {stage === "scanning" && "01 / VERIFYING"}
              {stage === "handshake" && "02 / LINKED"}
              {stage === "unlocking" && "03 / ENTERING"}
            </span>
          </div>
        </motion.div>

        {/* Final Outward Shockwave on Unlock */}
        {stage === "unlocking" && (
          <motion.div
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="absolute inset-0 m-auto size-96 rounded-full border-2 border-cyan-400 shadow-[0_0_80px_#00ffc6] pointer-events-none"
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default CinematicIntro;
