"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarRail,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/blocks/sidebar";
import { cn } from "@/lib/utils";
import {
  CircleMinus,
  CirclePlus,
  Loader2,
  RotateCcw,
  RotateCw,
  Search,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs, Thumbnail } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

if (typeof window !== "undefined" && pdfjs?.GlobalWorkerOptions) {
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;
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
  const [searchQuery, setSearchQuery] = useState("");

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
      rootMargin: "0px",
      threshold: 0.5,
    };

    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Get the page number from the closest parent with data-page-number
          const pageElement = entry.target.closest("[data-page-number]");
          if (pageElement) {
            const pageNumber = parseInt(
              pageElement.getAttribute("data-page-number") || "1",
              10
            );
            setCurrentPage(pageNumber);
          }
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    // Use a mutation observer to watch for when pages are added
    const mutationObserver = new MutationObserver(() => {
      const pages = viewportRef.current?.querySelectorAll(".react-pdf__Page");
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
        className={"w-full flex flex-row h-full select-none"}
        loading={
          <div className="flex flex-col items-center justify-center h-full w-full min-h-[300px] text-muted-foreground gap-2">
            <Loader2 className="size-6 animate-spin text-primary" />
            <span className="text-xs font-mono">Loading PDF document...</span>
          </div>
        }
      >
        <Sidebar>
          <SidebarRail />
          <SidebarContent className="flex flex-col p-8 items-center">
            {Array.from(new Array(numPages || 0), (el, index) => (
              <div
                className={cn(
                  "flex flex-col gap-2 mb-4 w-48 hover:bg-muted transition p-2 rounded-lg cursor-pointer",
                  index + 1 === currentPage && "bg-muted ring-1 ring-border"
                )}
                key={`thumbnail_${index + 1}`}
                onClick={() => {
                  const el = viewportRef.current?.querySelector(
                    `[data-page-number="${index + 1}"]`
                  );
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <Thumbnail
                  pageNumber={index + 1}
                  className="border shadow-xs rounded-sm overflow-hidden"
                  width={170}
                  height={100}
                  rotate={rotation}
                />
                <div className="flex flex-row justify-center">
                  <span className="text-xs font-mono text-muted-foreground">{index + 1}</span>
                </div>
              </div>
            ))}
          </SidebarContent>
        </Sidebar>
        <div className="flex-row w-full flex-1 min-w-0">
          <div className="w-full h-full flex flex-col grow">
            <div className="flex p-2 border-b justify-between items-center bg-card/40 backdrop-blur-xs">
              <div className="flex flex-row gap-2 items-center">
                <SidebarTrigger />
                <div className="text-xs font-mono text-muted-foreground">
                  Page {currentPage} of {numPages ?? "..."}
                </div>
              </div>
              <div className="flex flex-row gap-1.5 sm:gap-2 items-center">
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
                  onClick={() => setZoom(Math.min(ZOOM_OPTIONS[ZOOM_OPTIONS.length - 1], zoom + 0.25))}
                  title="Zoom In"
                >
                  <CirclePlus className="size-4" />
                </Button>

                <Select
                  value={zoom.toString()}
                  onValueChange={(value) => setZoom(Number(value))}
                >
                  <SelectTrigger className="h-7 rounded-sm w-20 sm:w-24 text-xs font-mono">
                    <SelectValue placeholder="Zoom">
                      {`${Math.round(zoom * 100)}%`}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent align="end">
                    {ZOOM_OPTIONS.map((option) => (
                      <SelectItem key={option} value={option.toString()} className="text-xs font-mono">
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

            <ScrollArea className="grow w-full h-[calc(100vh-160px)] min-h-[400px]">
              <div className="flex flex-row grow h-full">
                <ScrollArea className="grow w-full h-full" ref={viewportRef}>
                  <ScrollBar orientation="horizontal" />
                  <div className="items-center flex p-4 sm:p-8 flex-col grow w-full bg-neutral-100/60 dark:bg-[#0b0d12]">
                    {Array.from(new Array(numPages || 0), (el, index) => (
                      <Page
                        key={`page_${index + 1}`}
                        pageNumber={index + 1}
                        className="border border-border/80 shadow-md mb-8 bg-white dark:bg-neutral-900 rounded-sm overflow-hidden"
                        data-page-number={index + 1}
                        renderAnnotationLayer={false}
                        scale={zoom}
                        rotate={rotation}
                        loading={
                          <div className="h-96 w-72 flex items-center justify-center bg-card border border-border/40 rounded-sm mb-8 animate-pulse text-muted-foreground text-xs font-mono">
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
