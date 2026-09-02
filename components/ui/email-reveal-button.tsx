'use client';

import React, { useState } from 'react';
import { notify } from '@/components/ui/notification-card';

interface EmailRevealButtonProps {
  name?: string;
  email?: string;
}

export function EmailRevealButton({
  name = 'Kandula Jithendra Subramanyam',
  email = 'kandulajithendrasubramanyam@gmail.com',
}: EmailRevealButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    notify('success', 'Address copied!', email);
    setTimeout(() => setCopied(false), 2500);
  };

  const longestText = name.length > email.length ? name : email;

  return (
    <div className="email-reveal-wrapper my-8 flex justify-center w-full px-4">
      <style>{`
        .email-reveal-wrapper .btn-wrapper {
          --color: #b5faff31;
          --txt-color: #283a3b;
          --txt-color-2: #283a3b;
          --point-size: 8px;
          --point-color: #ffffff;
          --line-color: #00000015;
          --line-style: solid;
          --line-weight: 1px;
          --anim-speed: 1s;

          position: relative;
          display: grid;
          place-items: center;
          width: fit-content;
          max-width: 92vw;
          min-height: 48px;

          user-select: none;
        }

        .email-reveal-wrapper .txt-sizer {
          visibility: hidden;
          pointer-events: none;
          user-select: none;
          padding: 1.25rem 3.5rem;
          font: 500 1.25em "Inter", sans-serif;
          white-space: nowrap;
          opacity: 0;
        }

        .email-reveal-wrapper .txt-secondary {
          position: absolute;
          bottom: -2rem;
          font: 400 0.75em "Inter", sans-serif;
          color: #0006;
          font-style: italic;
          will-change: opacity;
          transition: opacity calc(var(--anim-speed, 1s) * 0.5) ease;
          opacity: 1;
        }

        .email-reveal-wrapper #hint2 {
          opacity: 0;
        }

        .email-reveal-wrapper .btn {
          filter: drop-shadow(0 6px 2px #00000055) drop-shadow(0 14px 4px #00000055)
            drop-shadow(0 32px 8px #00000055) drop-shadow(0 64px 16px #00000055);

          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border: none;
          background: none;
          width: 100%;
          height: 100%;
        }

        .email-reveal-wrapper .txt-box {
          position: absolute;
          display: grid;
          place-items: center;
          text-wrap: nowrap;
          inset: 0 0%;
          overflow: clip;
          will-change: inset, filter;
          transition: filter 0.25s ease;
          animation: frame-half calc(var(--anim-speed, 1s) * 0.5) forwards;
        }

        .email-reveal-wrapper .txt-box::after {
          content: "";
          position: absolute;
          inset: var(--point-size, 8px);
          background: repeating-linear-gradient(45deg, #3f87a6, #ebf8e1 15%, #fff 20%);
          mix-blend-mode: hard-light;
          background-size: 440%;
          transition: background-size 0.4s ease-in;
          filter: blur(1px);
          z-index: 3;
          opacity: 0.1;
        }

        .email-reveal-wrapper .txt {
          position: absolute;
          padding: 1rem 2rem;

          z-index: 2;
          font: 500 1.25em "Inter", sans-serif;
          color: var(--txt-color, #15104c);

          will-change: opacity, display, text-shadow;

          text-shadow:
            0 -1px 1px #ffffff60,
            0 2px 1px #00000015,
            0 4px 2px #00000015,
            0 8px 4px #00000015,
            0 16px 8px #00000015;
          white-space: nowrap;
        }

        .email-reveal-wrapper .txt:last-child {
          color: var(--txt-color-2, #15104c);
          opacity: 0;
          animation: none;
        }

        .email-reveal-wrapper .frame {
          position: absolute;
          inset: 0 0%;
          z-index: 1;
          border: var(--line-style, solid) var(--line-weight, 1px)
            var(--line-color, #000000);
          background-color: var(--color, #f9d323);
          transition-delay: calc(var(--anim-speed, 1s) * 0.5);
          box-shadow: inset 0 1px 4px 1px #fff5;
          animation: frame-half calc(var(--anim-speed, 1s) * 0.5) forwards;
        }

        .email-reveal-wrapper .point {
          position: absolute;
          box-sizing: border-box;
          width: var(--point-size, 8px);
          aspect-ratio: 1;
          border-radius: 25%;
          border: solid var(--line-weight, 1px) var(--line-color, #000000);
          background-color: var(--point-color, #fff);
          background-image: radial-gradient(circle at 50% 120%, #0005, #ffff);
        }

        .email-reveal-wrapper .point.top {
          top: calc(var(--point-size, 8px) * -0.5);
        }
        .email-reveal-wrapper .point.bottom {
          bottom: calc(var(--point-size, 8px) * -0.5);
        }
        .email-reveal-wrapper .point.left {
          left: calc(var(--point-size, 8px) * -0.5);
        }
        .email-reveal-wrapper .point.right {
          right: calc(var(--point-size, 8px) * -0.5);
        }

        .email-reveal-wrapper .btn:hover .txt {
          animation: txt-out calc(var(--anim-speed, 1s) * 0.5) forwards;
        }
        .email-reveal-wrapper .btn:hover .txt:last-child {
          animation: txt-in calc(var(--anim-speed, 1s) * 0.5) forwards;
        }

        .email-reveal-wrapper .btn:hover .txt-box {
          animation: frame var(--anim-speed, 1s) ease;
        }
        .email-reveal-wrapper .btn:hover .txt-box::after {
          background-size: 700%;
        }

        .email-reveal-wrapper .btn:hover .frame {
          animation: frame var(--anim-speed, 1s) ease;
        }

        .email-reveal-wrapper .btn:hover ~ #hint1 {
          opacity: 0;
        }
        .email-reveal-wrapper .btn:hover ~ #hint2 {
          opacity: 1;
        }

        @keyframes txt-in {
          0% {
            opacity: 0;
          }
          90% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes txt-out {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes frame-half {
          0% {
            inset: 0 50%;
          }
          100% {
            inset: 0 0%;
          }
        }

        @keyframes frame {
          0% {
            inset: 0 0%;
          }
          50% {
            inset: 0 50%;
          }
          100% {
            inset: 0 0%;
          }
        }

        .email-reveal-wrapper .btn::before {
          content: "Address copied";
          position: absolute;
          inset: 0;
          font: 400 1em "Inter", sans-serif;
          letter-spacing: 0.03em;
          color: #000a;
          z-index: -1;
          filter: blur(16px);
          opacity: 0;
        }

        .email-reveal-wrapper .btn:active .txt-box {
          filter: contrast(1.4) brightness(1.4);
        }

        .email-reveal-wrapper .btn:focus::before {
          animation: appear calc(var(--anim-speed, 1s) * 1.5)
            cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        @keyframes appear {
          70% {
            opacity: 0.75;
            filter: blur(0px);
          }
          100% {
            transform: translateY(-24px);
          }
        }
      `}</style>

      <div className="btn-wrapper">
        {/* Dynamic Width Sizer to fit any text length perfectly */}
        <span className="txt-sizer">{longestText}</span>

        <button className="btn" onClick={handleCopy}>
          <span className="frame">
            <span className="point top left"></span>
            <span className="point top right"></span>
            <span className="point bottom left"></span>
            <span className="point bottom right"></span>
          </span>
          <span className="txt-box">
            <span className="txt">{name}</span>
            <span className="txt">{email}</span>
          </span>
        </button>
        <div className="txt-secondary" id="hint1">Hover to reveal address</div>
        <div className="txt-secondary" id="hint2">Click to copy</div>
      </div>
    </div>
  );
}
