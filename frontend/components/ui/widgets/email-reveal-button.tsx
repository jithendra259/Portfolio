'use client';

import React, { useState, useRef, useEffect } from 'react';
import { notify } from '@/components/ui/widgets/notification-card';

interface EmailRevealButtonProps {
  name?: string;
  email?: string;
}

export function EmailRevealButton({
  name = 'Kandula Jithendra Subramanyam',
  email = 'kandulajithendrasubramanyam@gmail.com',
}: EmailRevealButtonProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const copyToClipboard = async (text: string): Promise<boolean> => {
    // 1. Try modern navigator.clipboard
    if (typeof navigator !== 'undefined' && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (err) {
        console.warn('navigator.clipboard failed, attempting fallback...', err);
      }
    }

    // 2. Fallback: document.execCommand('copy')
    if (typeof document !== 'undefined') {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.left = '-999999px';
        textarea.style.top = '-999999px';
        textarea.setAttribute('readonly', '');
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        textarea.setSelectionRange(0, text.length);

        const successful = document.execCommand('copy');
        document.body.removeChild(textarea);
        if (successful) return true;
      } catch (err) {
        console.error('execCommand copy fallback failed:', err);
      }
    }

    return false;
  };

  const handleInteraction = async (e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsRevealed(true);

    const success = await copyToClipboard(email);

    if (success) {
      setCopied(true);
      notify('success', 'Email Copied to Clipboard!', email);
    } else {
      // Prompt user fallback
      setCopied(true);
      notify('info', 'Email Address', email);
    }

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setIsRevealed(false);
      setCopied(false);
    }, 4500);
  };

  const longestText = name.length > email.length ? name : email;

  return (
    <div className="email-reveal-wrapper my-8 pb-4 flex justify-center w-full px-4">
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
          max-width: calc(100vw - 2rem);
          min-height: 48px;
          touch-action: manipulation;
          user-select: none;
        }

        :is(.dark, [data-theme='dark']) .email-reveal-wrapper .btn-wrapper {
          --color: rgba(56, 189, 248, 0.16);
          --txt-color: #f8fafc;
          --txt-color-2: #38bdf8;
          --point-color: #38bdf8;
          --line-color: rgba(255, 255, 255, 0.25);
        }

        .email-reveal-wrapper .txt-sizer {
          visibility: hidden;
          pointer-events: none;
          user-select: none;
          padding: 0.75rem 1rem;
          font-family: "Inter", sans-serif;
          font-weight: 500;
          font-size: clamp(0.72rem, 3.2vw, 0.875rem);
          white-space: nowrap;
          opacity: 0;
        }

        @media (min-width: 640px) {
          .email-reveal-wrapper .txt-sizer {
            padding: 1.25rem 3.5rem;
            font-size: 1.25rem;
          }
        }

        .email-reveal-wrapper .txt-secondary {
          position: absolute;
          bottom: -2rem;
          font-family: "Inter", sans-serif;
          font-size: clamp(0.7rem, 2.8vw, 0.8rem);
          font-weight: 400;
          color: rgba(0, 0, 0, 0.6);
          font-style: italic;
          will-change: opacity;
          transition: opacity calc(var(--anim-speed, 1s) * 0.5) ease;
          opacity: 1;
          white-space: nowrap;
          pointer-events: none;
        }

        :is(.dark, [data-theme='dark']) .email-reveal-wrapper .txt-secondary {
          color: rgba(255, 255, 255, 0.65);
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
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
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
          padding: 0.75rem 1rem;

          z-index: 2;
          font-family: "Inter", sans-serif;
          font-weight: 500;
          font-size: clamp(0.72rem, 3.2vw, 0.875rem);
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

        @media (min-width: 640px) {
          .email-reveal-wrapper .txt {
            padding: 1rem 2rem;
            font-size: 1.25rem;
          }
        }

        .email-reveal-wrapper .txt:last-child {
          color: var(--txt-color-2, #15104c);
          opacity: 0;
          animation: none;
          user-select: text;
          -webkit-user-select: text;
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

        /* Hover and mobile revealed animations */
        .email-reveal-wrapper .btn:hover .txt,
        .email-reveal-wrapper .btn.is-revealed .txt {
          animation: txt-out calc(var(--anim-speed, 1s) * 0.5) forwards;
        }
        .email-reveal-wrapper .btn:hover .txt:last-child,
        .email-reveal-wrapper .btn.is-revealed .txt:last-child {
          animation: txt-in calc(var(--anim-speed, 1s) * 0.5) forwards;
        }

        .email-reveal-wrapper .btn:hover .txt-box,
        .email-reveal-wrapper .btn.is-revealed .txt-box {
          animation: frame var(--anim-speed, 1s) ease;
        }
        .email-reveal-wrapper .btn:hover .txt-box::after,
        .email-reveal-wrapper .btn.is-revealed .txt-box::after {
          background-size: 700%;
        }

        .email-reveal-wrapper .btn:hover .frame,
        .email-reveal-wrapper .btn.is-revealed .frame {
          animation: frame var(--anim-speed, 1s) ease;
        }

        .email-reveal-wrapper .btn:hover ~ #hint1,
        .email-reveal-wrapper .btn.is-revealed ~ #hint1 {
          opacity: 0;
        }
        .email-reveal-wrapper .btn:hover ~ #hint2,
        .email-reveal-wrapper .btn.is-revealed ~ #hint2 {
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

        .email-reveal-wrapper .btn:active .txt-box {
          filter: contrast(1.4) brightness(1.4);
        }
      `}</style>

      <div className="btn-wrapper">
        {/* Dynamic Width Sizer to fit text comfortably */}
        <span className="txt-sizer">{longestText}</span>

        <button
          type="button"
          className={`btn ${isRevealed ? 'is-revealed' : ''}`}
          onClick={handleInteraction}
          onTouchEnd={handleInteraction}
          onMouseEnter={() => setIsRevealed(true)}
          onMouseLeave={() => {
            if (!copied) setIsRevealed(false);
          }}
          aria-label={`Copy email address: ${email}`}
        >
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
        <div className="txt-secondary" id="hint1">
          Hover or tap to reveal address
        </div>
        <div className="txt-secondary" id="hint2">
          {copied ? 'Address copied to clipboard!' : 'Click or tap to copy'}
        </div>
      </div>
    </div>
  );
}
