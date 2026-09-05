'use client';

import React from 'react';
import { PORTFOLIO_DATA } from '@/lib/portfolio-data';

export function SocialTooltipIcons() {
  const socials = [
    {
      name: 'GitHub',
      className: 'github',
      url: PORTFOLIO_DATA.developer.socials.github,
      color: '#24292e',
      icon: (
        <svg viewBox="0 0 24 24" height="1.4em" width="1.4em" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      className: 'linkedin',
      url: PORTFOLIO_DATA.developer.socials.linkedin,
      color: '#0077b5',
      icon: (
        <svg viewBox="0 0 24 24" height="1.4em" width="1.4em" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      name: 'Email',
      className: 'email',
      url: `mailto:${PORTFOLIO_DATA.developer.email}`,
      color: '#ea4335',
      icon: (
        <svg viewBox="0 0 24 24" height="1.3em" width="1.3em" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      ),
    },
    {
      name: 'Phone',
      className: 'phone',
      url: `tel:${PORTFOLIO_DATA.developer.phone}`,
      color: '#10b981',
      icon: (
        <svg viewBox="0 0 24 24" height="1.3em" width="1.3em" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
        </svg>
      ),
    },
    {
      name: 'ORCID',
      className: 'orcid',
      url: 'https://orcid.org/0009-0000-8802-5355',
      color: '#a6ce39',
      icon: (
        <svg viewBox="0 0 256 256" height="1.3em" width="1.3em" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M128 0C57.31 0 0 57.31 0 128s57.31 128 128 128 128-57.31 128-128S198.69 0 128 0zM70.7 197.6H50.5V81.3h20.2v116.3zm-10.1-131c-6.8 0-12.3-5.5-12.3-12.3s5.5-12.3 12.3-12.3 12.3 5.5 12.3 12.3-5.5 12.3-12.3 12.3zm139.9 76.5c0 30.5-24.4 54.5-54.8 54.5h-37.4V81.3h38.3c29.7 0 53.9 23.6 53.9 61.8zm-20.6 0c0-20.8-14.8-37.4-33.8-37.4h-17.6v74.8h17.6c19.5 0 33.8-16.1 33.8-37.4z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="social-tooltip-wrapper flex justify-center items-center w-full py-2">
      <style>{`
        .social-tooltip-wrapper .wrapper {
          display: inline-flex;
          list-style: none;
          height: 80px;
          width: 100%;
          padding-top: 15px;
          font-family: var(--font-sans), sans-serif;
          justify-content: center;
          align-items: center;
          margin: 0;
          padding-left: 0;
        }

        .social-tooltip-wrapper .wrapper .icon {
          position: relative;
          background: #ffffff;
          color: #334155;
          border-radius: 50%;
          margin: 8px;
          width: 48px;
          height: 48px;
          font-size: 16px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(0, 0, 0, 0.06);
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          text-decoration: none;
        }

        .social-tooltip-wrapper .wrapper .tooltip {
          position: absolute;
          top: 0;
          font-size: 12px;
          font-weight: 600;
          background: #ffffff;
          color: #ffffff;
          padding: 5px 10px;
          border-radius: 6px;
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.12);
          opacity: 0;
          pointer-events: none;
          transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          white-space: nowrap;
        }

        .social-tooltip-wrapper .wrapper .tooltip::before {
          position: absolute;
          content: "";
          height: 8px;
          width: 8px;
          background: #ffffff;
          bottom: -3px;
          left: 50%;
          transform: translate(-50%) rotate(45deg);
          transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .social-tooltip-wrapper .wrapper .icon:hover .tooltip {
          top: -42px;
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
        }

        .social-tooltip-wrapper .wrapper .icon:hover span,
        .social-tooltip-wrapper .wrapper .icon:hover .tooltip {
          text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.15);
        }

        .social-tooltip-wrapper .wrapper .github:hover,
        .social-tooltip-wrapper .wrapper .github:hover .tooltip,
        .social-tooltip-wrapper .wrapper .github:hover .tooltip::before {
          background: #24292e;
          color: #ffffff;
        }

        .social-tooltip-wrapper .wrapper .linkedin:hover,
        .social-tooltip-wrapper .wrapper .linkedin:hover .tooltip,
        .social-tooltip-wrapper .wrapper .linkedin:hover .tooltip::before {
          background: #0077b5;
          color: #ffffff;
        }

        .social-tooltip-wrapper .wrapper .email:hover,
        .social-tooltip-wrapper .wrapper .email:hover .tooltip,
        .social-tooltip-wrapper .wrapper .email:hover .tooltip::before {
          background: #ea4335;
          color: #ffffff;
        }

        .social-tooltip-wrapper .wrapper .phone:hover,
        .social-tooltip-wrapper .wrapper .phone:hover .tooltip,
        .social-tooltip-wrapper .wrapper .phone:hover .tooltip::before {
          background: #10b981;
          color: #ffffff;
        }

        .social-tooltip-wrapper .wrapper .orcid:hover,
        .social-tooltip-wrapper .wrapper .orcid:hover .tooltip,
        .social-tooltip-wrapper .wrapper .orcid:hover .tooltip::before {
          background: #a6ce39;
          color: #ffffff;
        }

        .social-tooltip-wrapper .wrapper .icon:hover {
          color: #ffffff;
          transform: translateY(-2px) scale(1.05);
        }
      `}</style>

      <ul className="wrapper">
        {socials.map((item) => (
          <a
            key={item.name}
            href={item.url}
            target={item.url.startsWith('http') ? '_blank' : undefined}
            rel={item.url.startsWith('http') ? 'noopener noreferrer' : undefined}
            className={`icon ${item.className}`}
            aria-label={item.name}
          >
            <span className="tooltip">{item.name}</span>
            {item.icon}
          </a>
        ))}
      </ul>
    </div>
  );
}
