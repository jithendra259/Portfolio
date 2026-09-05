'use client';

import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '@/lib/portfolio-data';
import { Download } from 'lucide-react';

export function ResumePrinter({ className }: { className?: string }) {
  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrintTrigger = () => {
    setIsPrinting((prev) => !prev);
  };

  const handleDownloadPDF = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.print();
  };

  return (
    <div className={`resume-printer-scope relative z-20 flex flex-col items-center justify-center ${className || ''}`}>
      <style>{`
        .resume-printer-scope .wrapper {
          --printer-color: #dcdac4;
          --printer-color-2: #c0beaa;
          --receipt-color: #f5f5f5;

          font-size: 14px;
          position: relative;
          user-select: none;
          margin-top: 35px;
          z-index: 10;
        }

        .resume-printer-scope .printer {
          width: 320px;
          height: 80px;
          border-radius: 0 0 8px 8px;

          background-color: var(--printer-color);
          background-image: radial-gradient(#00000015 1px, transparent 0);
          background-size: 4px 4px;
          border: 2px solid var(--printer-color-2);
          box-shadow:
            0 16px 32px 0px rgba(0, 0, 0, 0.25),
            0 -30px 16px 0px rgba(0, 0, 0, 0.08);
          position: relative;
          z-index: 5;
        }

        .resume-printer-scope .printer::before {
          content: "";
          position: absolute;
          top: -30px;
          left: -2px;
          width: calc(100% + 4px);
          height: 70px;
          border-radius: 12px 12px 0 0;
          border-bottom: 2px solid rgba(0, 0, 0, 0.2);
          box-shadow:
            0 12px 16px -12px rgba(255, 255, 255, 0.6) inset,
            0 -6px 16px -6px rgba(0, 0, 0, 0.2) inset,
            0 6px 8px -6px rgba(0, 0, 0, 0.25);
          box-sizing: border-box;
          background-color: inherit;
          background-image: inherit;
          filter: brightness(1.12);
          z-index: 8;
        }

        .resume-printer-scope .printer::after {
          content: "";
          position: absolute;
          top: 20px;
          left: 30px;
          width: 260px;
          height: 40px;
          border-radius: 0 0 4px 4px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.2);
          background-color: inherit;
          background-image: linear-gradient(
            to top,
            var(--printer-color),
            60%,
            var(--printer-color-2)
          );
          box-shadow: 0 4px 4px -2px rgba(0, 0, 0, 0.25);
          z-index: 6;
        }

        .resume-printer-scope .printer-display {
          z-index: 10;
          display: flex;
          align-items: center;
          padding: 6px 8px;
          position: absolute;
          top: -10px;
          left: 30px;
          width: 160px;
          height: 32px;

          background-color: #000;
          background-image: linear-gradient(transparent 0, rgba(255, 255, 255, 0.15) 90%, transparent 100%);
          background-size: 100% 8px;
          background-repeat: no-repeat;
          border: 3px solid var(--printer-color-2);
          border-radius: 6px;
          box-sizing: border-box;
          box-shadow:
            -1px -1px 2px 0 rgba(255, 255, 255, 0.6) inset,
            1px 1px 5px 1px #000 inset,
            0 0 1px 2px rgba(0, 0, 0, 0.15);

          font-family: "Courier New", Courier, monospace;
          font-size: 0.8em;
          color: #5aff5a;
          filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.2));
          overflow: hidden;
        }

        .resume-printer-scope .printer-message {
          position: absolute;
          transition: opacity 0.2s ease;
          white-space: nowrap;
        }

        .resume-printer-scope .letter-wrapper {
          position: inherit;
          display: flex;
        }

        .resume-printer-scope .letter {
          display: inline-block;
          opacity: 0;
        }

        .resume-printer-scope .print-button {
          z-index: 12;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2em;
          position: absolute;
          top: -30px;
          right: 0;
          margin: 16px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 6px;
          width: 48px;
          height: 36px;
          background-color: var(--printer-color);
          box-shadow:
            1px 1px 2px 0 rgba(255, 255, 255, 0.6) inset,
            -1px -1px 2px 0 rgba(0, 0, 0, 0.15) inset,
            0 2px 6px 0px rgba(0, 0, 0, 0.15);
          transition:
            box-shadow 0.1s ease-in-out,
            transform 0.1s ease-in-out;
        }

        .resume-printer-scope .print-button:hover {
          box-shadow:
            2px 2px 2px 0 rgba(255, 255, 255, 0.7) inset,
            -2px -2px 2px 0 rgba(0, 0, 0, 0.15) inset,
            0 2px 10px 0px rgba(0, 0, 0, 0.15);
          transform: scale(1.05);
        }

        .resume-printer-scope .print-button:active {
          box-shadow:
            2px 2px 2px 0 rgba(0, 0, 0, 0.15) inset,
            -2px -2px 2px 0 rgba(255, 255, 255, 0.7) inset,
            0 0px 4px 0px rgba(255, 255, 255, 0.7);
          transform: scale(0.95);
        }

        .resume-printer-scope .receipt-wrapper {
          position: absolute;
          top: 0;
          left: 44px;
          filter: drop-shadow(0 8px 24px rgba(0, 0, 0, 0.3));
          transform: translateY(-100%);
          clip-path: inset(100% -100px -100px -100px);
          transition: clip-path 0.5s;
          z-index: 4;
        }

        .resume-printer-scope .receipt {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 0.8em;
          padding: 16px 14px;
          width: 230px;
          min-height: 200px;
          font-size: 0.75em;
          font-family: var(--font-mono), monospace;
          font-weight: 400;
          color: #444;
          background-color: var(--receipt-color);
          box-shadow:
            0 12px 12px 0 rgba(0, 0, 0, 0.15),
            0 24px 24px 0 rgba(0, 0, 0, 0.15),
            0 36px 36px 0 rgba(0, 0, 0, 0.15);
        }

        .resume-printer-scope .receipt::before,
        .resume-printer-scope .receipt::after {
          --angle: 45deg;
          content: "";
          display: block;
          position: absolute;
          left: 0px;
          width: 100%;
          height: 8px;
          background: linear-gradient(
              calc(var(--angle) * -1),
              var(--receipt-color) 4px,
              transparent 0
            ),
            linear-gradient(var(--angle), var(--receipt-color) 4px, transparent 0);
          background-position: 4px 0;
          background-repeat: repeat-x;
          background-size: 8px 8px;
        }

        .resume-printer-scope .receipt::before {
          top: -8px;
          background-position: 4px 0;
        }

        .resume-printer-scope .receipt::after {
          bottom: -8px;
          background-position: 0 100%;
          --angle: 225deg;
        }

        .resume-printer-scope .receipt-header {
          text-align: center;
          border-bottom: 1px dashed #ccc;
          padding-bottom: 6px;
        }

        .resume-printer-scope .receipt-subheader {
          border-bottom: 1px dashed #ccc;
          padding-bottom: 6px;
          display: flex;
          justify-content: space-between;
          font-size: 0.9em;
        }

        .resume-printer-scope .receipt-table {
          width: 100%;
          line-height: 1.5em;
          border-collapse: collapse;
        }

        .resume-printer-scope .receipt-table td:last-child {
          text-align: right;
          font-weight: 700;
        }

        .resume-printer-scope .receipt-footer {
          border-top: 1px dashed #ccc;
          padding-top: 6px;
          text-align: center;
        }

        /* Active Print State Animations with correct z-index layering */
        .resume-printer-scope.is-active .receipt-wrapper,
        .resume-printer-scope .wrapper:has(.print-button:focus) .receipt-wrapper {
          z-index: 25;
          animation:
            printReceiptAnim 1.2s 1 forwards ease-in,
            displayReceiptAnim 0.4s 1 forwards cubic-bezier(0, 0.63, 0.96, 1.1);
          animation-delay: 0s, 1.35s;
        }

        .resume-printer-scope.is-active .printer-message,
        .resume-printer-scope .wrapper:has(.print-button:focus) .printer-message {
          opacity: 0;
        }

        .resume-printer-scope.is-active .letter,
        .resume-printer-scope .wrapper:has(.print-button:focus) .letter {
          animation: show-letter-text 0.6s 1 forwards linear;
        }

        .resume-printer-scope .letter:nth-child(1) { animation-delay: 0.05s; }
        .resume-printer-scope .letter:nth-child(2) { animation-delay: 0.1s; }
        .resume-printer-scope .letter:nth-child(3) { animation-delay: 0.15s; }
        .resume-printer-scope .letter:nth-child(4) { animation-delay: 0.2s; }
        .resume-printer-scope .letter:nth-child(5) { animation-delay: 0.25s; }
        .resume-printer-scope .letter:nth-child(6) { animation-delay: 0.3s; }
        .resume-printer-scope .letter:nth-child(7) { animation-delay: 0.35s; }
        .resume-printer-scope .letter:nth-child(8) { animation-delay: 0.4s; }
        .resume-printer-scope .letter:nth-child(9) { animation-delay: 0.45s; }
        .resume-printer-scope .letter:nth-child(10) { animation-delay: 0.5s; }
        .resume-printer-scope .letter:nth-child(11) { animation-delay: 0.55s; }

        @keyframes printReceiptAnim {
          0% {
            z-index: 4;
            transform: translateY(-100%);
            clip-path: inset(100% -100px -100px -100px);
          }
          99% {
            z-index: 4;
          }
          100% {
            z-index: 25;
            transform: translateY(10%);
            clip-path: inset(-20% -100px -100px -100px);
          }
        }

        @keyframes displayReceiptAnim {
          0% {
            z-index: 25;
          }
          30% {
            transform: translateY(22%) rotate3d(1, 0, 1, -5deg);
            z-index: 30;
          }
          70% {
            z-index: 30;
          }
          100% {
            z-index: 30;
            transform: translateY(-25%) scale(1.15);
          }
        }

        @keyframes show-letter-text {
          10%,
          100% {
            opacity: 1;
          }
        }
      `}</style>

      <div className={`wrapper ${isPrinting ? 'is-active' : ''}`}>
        <div className="printer" />
        
        {/* LCD Display */}
        <div className="printer-display">
          <span className="printer-message"> Click to print</span>
          <div className="letter-wrapper">
            <span className="letter">P</span>
            <span className="letter">r</span>
            <span className="letter">i</span>
            <span className="letter">n</span>
            <span className="letter">t</span>
            <span className="letter">i</span>
            <span className="letter">n</span>
            <span className="letter">g</span>
            <span className="letter">.</span>
            <span className="letter">.</span>
            <span className="letter">.</span>
          </div>
        </div>

        {/* Print Button */}
        <button
          onClick={handlePrintTrigger}
          className="print-button"
          title="Click to print resume"
          aria-label="Click to print resume"
        >
          🖨
        </button>

        {/* Receipt Container */}
        <div className="receipt-wrapper">
          <div className="receipt">
            {/* Receipt Header */}
            <div className="receipt-header">
              <div className="font-bold text-sm tracking-tight text-black">
                {PORTFOLIO_DATA.developer.fullName.toUpperCase()}
              </div>
              <div className="text-[10px] text-stone-600 mt-0.5">
                AI &amp; DATA SCIENCE ENGINEER
              </div>
              <div className="text-[9px] text-stone-500">
                {PORTFOLIO_DATA.developer.location}
              </div>
            </div>

            {/* Receipt Subheader */}
            <div className="receipt-subheader">
              <span>ORDER: #RESUME-01</span>
              <span>{new Date().toISOString().slice(0, 10)}</span>
            </div>

            {/* Receipt Content */}
            <table className="receipt-table text-[10px]">
              <tbody>
                <tr>
                  <td>M.Tech AI &amp; DS</td>
                  <td>8.06 CGPA</td>
                </tr>
                <tr>
                  <td>B.Tech ECE</td>
                  <td>8.44 CGPA</td>
                </tr>
                <tr>
                  <td>Elsevier / Springer</td>
                  <td>2 Papers</td>
                </tr>
                <tr>
                  <td>Multi-Agent Swarms</td>
                  <td>Expert</td>
                </tr>
                <tr>
                  <td>PyTorch / LangGraph</td>
                  <td>Production</td>
                </tr>
                <tr>
                  <td>Next.js 15 / WebRTC</td>
                  <td>Full-Stack</td>
                </tr>
              </tbody>
            </table>

            {/* Receipt Footer with Download */}
            <div className="receipt-footer flex flex-col items-center gap-1.5 pt-1">
              <button
                onClick={handleDownloadPDF}
                className="w-full py-1.5 px-2 rounded bg-black text-white text-[9px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 hover:bg-stone-800 transition-colors cursor-pointer"
              >
                <Download className="size-3" /> Save / Print PDF
              </button>
              <div className="text-[8px] text-stone-500">
                THANK YOU!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumePrinter;
