'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Document, Page, Thumbnail, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { CircleMinus, CirclePlus, Loader2, RotateCcw, RotateCw, Search } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '@/components/blocks/sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined' && pdfjs?.GlobalWorkerOptions) {
  pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
}

const ZOOM_OPTIONS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 4, 8];

function highlightPattern(text: string, pattern: string, itemIndex: number) {
  if (!pattern) return text;
  return text.replace(
    pattern,
    (value: string) => `<mark id="search-result-${itemIndex}">${value}</mark>`
  );
}

function Component({ url }: { url: string }) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const textRenderer = useCallback(
    (textItem: { str: string; itemIndex: number }) =>
      highlightPattern(textItem.str, searchQuery, textItem.itemIndex),
    [searchQuery]
  );

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  useEffect(() => {
    if (!viewportRef.current) return;

    const options = {
      root: viewportRef.current,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Get the page number from the closest parent with data-page-number
          const pageElement = entry.target.closest('[data-page-number]');
          if (pageElement) {
            const pageNumber = parseInt(pageElement.getAttribute('data-page-number') || '1', 10);
            setCurrentPage(pageNumber);
          }
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    // Use a mutation observer to watch for when pages are added
    const mutationObserver = new MutationObserver(() => {
      const pages = viewportRef.current?.querySelectorAll('.react-pdf__Page');
      if (pages) {
        pages.forEach((page) => {
          observer.observe(page);
        });
      }
    });

    mutationObserver.observe(viewportRef.current, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [numPages]);

  return (
    <SidebarProvider>
      <style>{`
        @media print {
          .react-pdf__Document, .react-pdf__Page {
            display: none !important;
          }
        }
      `}</style>
      <Document
        file={url}
        onLoadSuccess={onDocumentLoadSuccess}
        onContextMenu={(e: React.MouseEvent) => e.preventDefault()}
        className={'flex h-full w-full flex-row select-none'}
        loading={
          <div className="text-muted-foreground flex h-full min-h-[300px] w-full flex-col items-center justify-center gap-2">
            <Loader2 className="text-primary size-6 animate-spin" />
            <span className="font-mono text-xs">Loading PDF document...</span>
          </div>
        }
      >
        <Sidebar>
          <SidebarRail />
          <SidebarContent className="flex flex-col items-center p-8">
            {Array.from(new Array(numPages || 0), (el, index) => (
              <div
                className={cn(
                  'hover:bg-muted mb-4 flex w-48 cursor-pointer flex-col gap-2 rounded-lg p-2 transition',
                  index + 1 === currentPage && 'bg-muted ring-border ring-1'
                )}
                key={`thumbnail_${index + 1}`}
                onClick={() => {
                  const el = viewportRef.current?.querySelector(
                    `[data-page-number="${index + 1}"]`
                  );
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Thumbnail
                  pageNumber={index + 1}
                  className="overflow-hidden rounded-sm border shadow-xs"
                  width={170}
                  height={100}
                  rotate={rotation}
                />
                <div className="flex flex-row justify-center">
                  <span className="text-muted-foreground font-mono text-xs">{index + 1}</span>
                </div>
              </div>
            ))}
          </SidebarContent>
        </Sidebar>
        <div className="w-full min-w-0 flex-1 flex-row">
          <div className="flex h-full w-full grow flex-col">
            <div className="bg-card/40 flex items-center justify-between border-b p-2 backdrop-blur-xs">
              <div className="flex flex-row items-center gap-2">
                <SidebarTrigger />
                <div className="text-muted-foreground font-mono text-xs">
                  Page {currentPage} of {numPages ?? '...'}
                </div>
              </div>
              <div className="flex flex-row items-center gap-1.5 sm:gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-7"
                  onClick={() => setRotation(rotation - 90)}
                  title="Rotate Counter-Clockwise"
                >
                  <RotateCcw className="size-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-7"
                  onClick={() => setRotation(rotation + 90)}
                  title="Rotate Clockwise"
                >
                  <RotateCw className="size-4" />
                </Button>
                <Separator orientation="vertical" className="h-4" />
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-7"
                  disabled={zoom <= ZOOM_OPTIONS[0]}
                  onClick={() => setZoom(Math.max(ZOOM_OPTIONS[0], zoom - 0.25))}
                  title="Zoom Out"
                >
                  <CircleMinus className="size-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-7"
                  disabled={zoom >= ZOOM_OPTIONS[ZOOM_OPTIONS.length - 1]}
                  onClick={() =>
                    setZoom(Math.min(ZOOM_OPTIONS[ZOOM_OPTIONS.length - 1], zoom + 0.25))
                  }
                  title="Zoom In"
                >
                  <CirclePlus className="size-4" />
                </Button>

                <Select value={zoom.toString()} onValueChange={(value) => setZoom(Number(value))}>
                  <SelectTrigger className="h-7 w-20 rounded-sm font-mono text-xs sm:w-24">
                    <SelectValue placeholder="Zoom">{`${Math.round(zoom * 100)}%`}</SelectValue>
                  </SelectTrigger>
                  <SelectContent align="end">
                    {ZOOM_OPTIONS.map((option) => (
                      <SelectItem
                        key={option}
                        value={option.toString()}
                        className="font-mono text-xs"
                      >
                        {`${option * 100}%`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Separator orientation="vertical" className="h-4" />
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-7" title="Search Text">
                      <Search className="size-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="end" className="w-64 p-2">
                    <Input
                      placeholder="Search text in document..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-8 text-xs"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <ScrollArea className="h-[calc(100vh-160px)] min-h-[400px] w-full grow">
              <div className="flex h-full grow flex-row">
                <ScrollArea className="h-full w-full grow" ref={viewportRef}>
                  <ScrollBar orientation="horizontal" />
                  <div className="flex w-full grow flex-col items-center bg-neutral-100/60 p-4 sm:p-8 dark:bg-[#0b0d12]">
                    {Array.from(new Array(numPages || 0), (el, index) => (
                      <Page
                        key={`page_${index + 1}`}
                        pageNumber={index + 1}
                        className="border-border/80 mb-8 overflow-hidden rounded-sm border bg-white shadow-md dark:bg-neutral-900"
                        data-page-number={index + 1}
                        renderAnnotationLayer={false}
                        scale={zoom}
                        rotate={rotation}
                        loading={
                          <div className="bg-card border-border/40 text-muted-foreground mb-8 flex h-96 w-72 animate-pulse items-center justify-center rounded-sm border font-mono text-xs">
                            Loading page {index + 1}...
                          </div>
                        }
                        customTextRenderer={textRenderer}
                      />
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </ScrollArea>
          </div>
        </div>
      </Document>
    </SidebarProvider>
  );
}

export { Component, Component as PdfViewer };
