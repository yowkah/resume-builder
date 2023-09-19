"use client";

import React from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import { pdf } from "@react-pdf/renderer";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ChevronLeftIcon, ChevronRightIcon, Loader2Icon } from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.6.172/pdf.worker.min.js";

function setWithinRange(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

type PDFPreviewProps = {
  children: React.JSX.Element;
  width?: number;
};

export default function BasePDFPreview(props: PDFPreviewProps) {
  const [file, setFile] = React.useState<Blob>();
  const [loading, setLoading] = React.useState(true);
  const [numPages, setNumPages] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [width, setWidth] = React.useState(450);
  const [timeoutId, setTimeoutId] = React.useState<NodeJS.Timeout | null>();

  const parentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    window.addEventListener("resize", () => {
      if (parentRef.current) {
        setWidth(setWithinRange(parentRef.current.offsetWidth, 200, 450));
      }
    });

    if (parentRef.current) {
      setWidth(setWithinRange(parentRef.current.offsetWidth, 200, 450));
    }

    () => {
      removeEventListener("resize", () => {});
    };
  }, [parentRef]);

  React.useEffect(() => {
    // Use timeout for debounce effect to prevent constant rerender.
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeoutId = setTimeout(() => {
      pdf(props.children)
        .toBlob()
        .then((blob) => {
          setFile(blob);
        });
    }, 1000);

    setTimeoutId(newTimeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.children]);

  return (
    <div ref={parentRef} className="w-full h-full">
      <div
        className={cn("flex w-full justify-center", {
          hidden: !loading,
        })}
      >
        <Loader2Icon className="mt-16 h-6 w-6 animate-spin" />
      </div>
      <div
        className={cn("flex flex-col items-center gap-4", { hidden: loading })}
      >
        <Document
          file={file}
          renderMode="canvas"
          key={width}
          onLoadSuccess={(document) => {
            setNumPages(document.numPages);
            setLoading(false);
          }}
          onLoadStart={() => {
            setLoading(true);
          }}
        >
          <Page
            pageNumber={currentPage}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            width={width}
          />
        </Document>
        <div className="flex gap-2">
          <Button
            size="icon"
            variant="ghost"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((page) => page - 1)}
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            disabled={currentPage === numPages}
            onClick={() => setCurrentPage((page) => page + 1)}
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
