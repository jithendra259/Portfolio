'use client';

import React, { useMemo } from 'react';
import katex from 'katex';

interface MathBlockProps {
  math: string;
  className?: string;
  caption?: string;
}

export function MathBlock({ math, className = '' }: MathBlockProps) {
  const { cleanMath, tag } = useMemo(() => {
    let clean = math.trim();
    let extractedTag: string | null = null;

    const tagMatch = clean.match(/\\tag\{([^}]+)\}/);
    if (tagMatch) {
      extractedTag = tagMatch[1].replace(/^\(|\)$/g, '').trim();
      clean = clean.replace(/\\tag\{[^}]+\}/g, '').trim();
    } else {
      const parenMatch = clean.match(/\s+\((\d+)\)$/);
      if (parenMatch) {
        extractedTag = parenMatch[1];
        clean = clean.replace(/\s+\(\d+\)$/, '').trim();
      }
    }

    return { cleanMath: clean, tag: extractedTag };
  }, [math]);

  const html = useMemo(() => {
    try {
      return katex.renderToString(cleanMath, {
        displayMode: true,
        throwOnError: false,
        trust: true,
      });
    } catch {
      return cleanMath;
    }
  }, [cleanMath]);

  return (
    <div className={`my-4 flex items-center justify-between gap-4 w-full py-1 ${className}`}>
      {tag && <div className="w-8 shrink-0 hidden sm:block" aria-hidden="true" />}
      <div className="flex-1 overflow-x-auto py-1 text-center">
        <div
          className="inline-block text-slate-900 dark:text-neutral-100 [&_.katex-display]:m-0 text-sm sm:text-base"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
      {tag && (
        <span className="shrink-0 text-xs sm:text-sm font-mono text-slate-400 dark:text-neutral-500 select-none pr-1">
          ({tag})
        </span>
      )}
    </div>
  );
}

interface MathInlineProps {
  math: string;
  className?: string;
}

export function MathInline({ math, className = '' }: MathInlineProps) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math.trim(), {
        displayMode: false,
        throwOnError: false,
        trust: true,
      });
    } catch {
      return math;
    }
  }, [math]);

  return (
    <span
      className={`inline-block align-baseline text-slate-900 dark:text-white [&_.katex]:text-[0.92em] ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

/**
 * Parses and renders text that contains:
 * - $$math$$ for block/display equations
 * - $math$ for inline equations
 * - Plain text and newlines
 */
export function FormattedLatexText({
  text,
  className = '',
  as: Component = 'span',
}: {
  text: string;
  className?: string;
  as?: 'span' | 'div' | 'p';
}) {
  // If the text is purely a $$...$$ block
  const trimmed = text.trim();
  if (trimmed.startsWith('$$') && trimmed.endsWith('$$') && trimmed.length > 4) {
    const formula = trimmed.slice(2, -2).trim();
    return <MathBlock math={formula} className={className} />;
  }

  // Split by $$ first for block formulas
  const blockParts = text.split(/(\$\$[\s\S]*?\$\$)/g);

  return (
    <Component className={`leading-relaxed ${className}`}>
      {blockParts.map((bPart, bIdx) => {
        if (bPart.startsWith('$$') && bPart.endsWith('$$') && bPart.length > 4) {
          const formula = bPart.slice(2, -2).trim();
          return <MathBlock key={bIdx} math={formula} />;
        }

        // Inside regular text, split by single $ for inline formulas: $formula$
        const inlineParts = bPart.split(/(\$[^\$\n]+?\$)/g);

        return (
          <span key={bIdx} className="whitespace-pre-line">
            {inlineParts.map((iPart, iIdx) => {
              if (iPart.startsWith('$') && iPart.endsWith('$') && iPart.length > 2) {
                const inlineFormula = iPart.slice(1, -1).trim();
                return <MathInline key={iIdx} math={inlineFormula} />;
              }
              return <React.Fragment key={iIdx}>{iPart}</React.Fragment>;
            })}
          </span>
        );
      })}
    </Component>
  );
}
