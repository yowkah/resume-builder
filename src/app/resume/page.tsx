"use client";

import React from "react";
import ResumeForm from "./_components/resume-form";
import ResumePreview from "./_components/resume-preview";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, DownloadIcon, FileIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Builder() {
  const [showPreview, setShowPreview] = React.useState(false);

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div
        className={cn(
          "lg:flex-none flex-1 lg:basis-1/2 max-h-full overflow-auto",
          {
            "hidden lg:block": showPreview,
          }
        )}
      >
        <ResumeForm />
        <Button
          className="lg:hidden fixed right-8 bottom-8"
          onClick={() => setShowPreview(true)}
        >
          <FileIcon className="w-4 h-4 mr-2" /> Preview
        </Button>
      </div>
      <div
        className={cn(
          "fixed lg:relative h-full w-screen flex-none invisible lg:visible lg:basis-1/2 bg-muted",
          {
            "visible flex-col flex": showPreview,
          }
        )}
      >
        <div className="lg:hidden bg-primary text-white flex justify-between items-center">
          <Button onClick={() => setShowPreview(false)}>
            <ChevronLeftIcon className="w-4 h-4 mr-2" /> Back to editor
          </Button>
          <Button size="lg">
            <DownloadIcon className="w-4 h-4 mr-2" /> Download PDF
          </Button>
        </div>
        <div className="overflow-hidden p-12 flex-1">
          <ResumePreview />
        </div>
      </div>
    </div>
  );
}
