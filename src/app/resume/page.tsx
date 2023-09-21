"use client";

import React from "react";
import ResumeForm, {
  educationsSchema,
  employmentHistorySchema,
  languagesSchema,
  personalDetailsSchema,
  skillsSchema,
} from "./_components/resume-form";
import { Template } from "./_components/template";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, DownloadIcon, FileIcon } from "lucide-react";
import { useBreakpoint } from "@/lib/utils";
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
      dateOfBirth: null,
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
      languagesSchema,
    ])
  ),
});

export type Schema = z.infer<typeof schema>;

export default function Page() {
  const [showPreview, setShowPreview] = React.useState(false);

  const isLargeScreen = useBreakpoint("lg");

  const createDefaultValues = React.useMemo(() => {
    if (typeof window === "undefined") return defaultValues;

    let result = null;

    try {
      result = schema.parse(JSON.parse(localStorage.getItem("resume") || ""));
    } catch (error) {
      console.log(error);
      result = defaultValues;
    }

    return result;
  }, []);

  const methods = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: createDefaultValues,
  });

  const formData = methods.watch();

  const autoSave = React.useRef(
    debounce((data) => {
      if (typeof window === "undefined") return;

      localStorage.setItem("resume", JSON.stringify(data));
    }, 1000)
  );

  React.useEffect(() => {
    autoSave.current(formData);
  }, [formData, autoSave]);

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {(isLargeScreen || !showPreview) && (
        <div className="lg:flex-none flex-1 lg:basis-1/2 max-h-full lg:overflow-auto">
          <NoSSR>
            <ResumeForm methods={methods} />
          </NoSSR>
          <Button
            className="lg:hidden fixed right-8 bottom-8"
            onClick={() => setShowPreview(true)}
          >
            <FileIcon className="w-4 h-4 mr-2" /> Preview
          </Button>
        </div>
      )}
      {(isLargeScreen || showPreview) && (
        <div className="lg:relative h-full w-screen flex-none lg:basis-1/2 bg-muted">
          <div className="bg-primary text-white flex lg:hidden justify-between items-center">
            <Button onClick={() => setShowPreview(false)}>
              <ChevronLeftIcon className="w-4 h-4 mr-2" /> Back to editor
            </Button>
            <NoSSR>
              <PDFDownloadLink
                document={<Template data={formData} />}
                fileName="resume.pdf"
              >
                <Button size="lg">
                  <DownloadIcon className="w-4 h-4 mr-2" /> Download
                </Button>
              </PDFDownloadLink>
            </NoSSR>
          </div>
          <div className="overflow-hidden p-12 flex-1 space-y-4">
            <div className="hidden lg:flex justify-end">
              <NoSSR>
                <PDFDownloadLink
                  document={<Template data={formData} />}
                  fileName="resume.pdf"
                >
                  <Button>
                    <DownloadIcon className="w-4 h-4 mr-2" /> Download
                  </Button>
                </PDFDownloadLink>
              </NoSSR>
            </div>
            <PDFPreview>
              <Template data={formData} />
            </PDFPreview>
          </div>
        </div>
      )}
    </div>
  );
}
