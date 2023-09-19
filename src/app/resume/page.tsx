"use client";

import React from "react";
import ResumeForm, {
  educationsSchema,
  employmentHistorySchema,
  personalDetailsSchema,
  skillsSchema,
} from "./_components/resume-form";
import Resume from "./_components/resume";
import { Button } from "@/components/ui/button";
import {
  ChevronLeftIcon,
  DownloadIcon,
  FileIcon,
  Loader2Icon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import PDFPreview from "@/components/shared/pdf-preview";

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { debounce } from "lodash";
import NoSSR from "react-no-ssr";

const defaultValues: Schema = {
  sections: [
    {
      title: "Personal Details",
      type: "personalDetails",
      firstName: "",
      lastName: "",
      city: "",
      country: "",
      postalCode: "",
      drivingLicense: "",
      dateOfBirth: "",
      placeOfBirth: "",
      nationality: "",
      address: "",
      email: "",
      phone: "",
      summary: "",
      wantedJobTitle: "",
    },
    {
      title: "Skills",
      type: "skills",
      skills: [],
    },
    {
      title: "Educations",
      type: "educations",
      educations: [],
    },
    {
      title: "Employment History",
      type: "employmentHistory",
      employments: [],
    },
  ],
};

const schema = z.object({
  sections: z.array(
    z.discriminatedUnion("type", [
      personalDetailsSchema,
      skillsSchema,
      educationsSchema,
      employmentHistorySchema,
    ])
  ),
});

export type Schema = z.infer<typeof schema>;

export default function Builder() {
  const [showPreview, setShowPreview] = React.useState(false);

  function calculateDefaultValues() {
    if (typeof window === "undefined") return defaultValues;

    let result = null;

    try {
      result = schema.parse(JSON.parse(localStorage.getItem("resume") || ""));
    } catch (error) {
      result = defaultValues;
    }

    return result;
  }

  const methods = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: calculateDefaultValues(),
  });

  const formData = methods.watch();

  const autoSave = React.useCallback(
    debounce((data) => {
      localStorage.setItem("resume", JSON.stringify(data));
    }, 1000),
    []
  );

  React.useEffect(() => {
    autoSave(formData);
  }, [formData, autoSave]);

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
        <ResumeForm methods={methods} />
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
          <NoSSR>
            <PDFDownloadLink
              document={<Resume data={formData} />}
              fileName="resume.pdf"
            >
              {({ blob, url, loading, error }) =>
                loading ? (
                  <Button size="lg" disabled>
                    <Loader2Icon
                      className={cn("mr-2 h-4 w-4 animate-spin", {
                        hidden: !loading,
                      })}
                    />
                    Download PDF
                  </Button>
                ) : (
                  <Button size="lg">
                    <DownloadIcon className="w-4 h-4 mr-2" /> Download
                  </Button>
                )
              }
            </PDFDownloadLink>
          </NoSSR>
        </div>
        <div className="overflow-hidden p-12 flex-1 space-y-4">
          <div className="hidden lg:flex justify-end">
            <NoSSR>
              <PDFDownloadLink
                document={<Resume data={formData} />}
                fileName="resume.pdf"
              >
                {() => (
                  <Button>
                    <DownloadIcon className="w-4 h-4 mr-2" /> Download
                  </Button>
                )}
              </PDFDownloadLink>
            </NoSSR>
          </div>
          <PDFPreview>
            <Resume data={formData} />
          </PDFPreview>
        </div>
      </div>
    </div>
  );
}
