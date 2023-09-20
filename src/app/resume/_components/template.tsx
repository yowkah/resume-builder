"use client";

import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { Html } from "react-pdf-html";
import { Schema } from "./resume-form";
import { format } from "date-fns";

Font.register({
  family: "Inter",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.ttf",
      fontWeight: 100,
    },
    {
      src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyfMZhrib2Bg-4.ttf",
      fontWeight: 200,
    },
    {
      src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuOKfMZhrib2Bg-4.ttf",
      fontWeight: 300,
    },
    {
      src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf",
      fontWeight: 400,
    },
    {
      src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fMZhrib2Bg-4.ttf",
      fontWeight: 500,
    },
    {
      src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZhrib2Bg-4.ttf",
      fontWeight: 600,
    },
    {
      src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYMZhrib2Bg-4.ttf",
      fontWeight: 700,
    },
    {
      src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyYMZhrib2Bg-4.ttf",
      fontWeight: 800,
    },
    {
      src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuBWYMZhrib2Bg-4.ttf",
      fontWeight: 900,
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Inter",
    flexDirection: "row",
  },
  sidebar: {
    width: "30%",
    padding: 10,
  },
  mainContent: {
    width: "70%",
    padding: 10,
  },
  section: {
    marginBottom: 15,
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
  },
  content: {
    fontSize: 10,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginVertical: 5,
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
  },
  subSection: {
    marginBottom: 10,
  },
  subSectionTitle: {
    fontSize: 10,
    fontWeight: "bold",
  },
  subSectionDate: {
    fontSize: 8,
    color: "#666",
    marginBottom: 2,
  },
  summary: {
    marginBottom: 10,
  },
});

const stylesheet = {
  p: {
    fontSize: 10,
    margin: 0,
    padding: 0,
    fontFamily: "Inter",
  },
  strong: {
    fontWeight: 400,
  },
  em: {
    fontStyle: "italic",
  },
};

type TemplateProps = {
  data: Schema;
};

export function Template(props: TemplateProps) {
  const { data } = props;

  let summaryHtml = "";
  let personalDetails = null;

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.sidebar}>
          {data.sections.map((section, sectionIdx) => {
            if (section.type === "personalDetails") {
              summaryHtml = section.summary;
              return (
                <View key={sectionIdx} style={styles.section}>
                  <Text style={styles.name}>
                    {section.firstName} {section.lastName}
                  </Text>
                  <Text style={styles.content}>{section.wantedJobTitle}</Text>
                  <Text style={styles.content}>{section.email}</Text>
                  <Text style={styles.content}>{section.phone}</Text>
                  <Text style={styles.content}>
                    {section.country}, {section.city}
                  </Text>
                  <Text style={styles.content}>{section.placeOfBirth}</Text>
                  <Text style={styles.content}>
                    {section.dateOfBirth &&
                      format(section.dateOfBirth, "MMMM d, yyyy")}
                  </Text>
                  <Text style={styles.content}>{section.address}</Text>
                  <Text style={styles.content}>{section.postalCode}</Text>
                  <Text style={styles.content}>
                    <Text>License: </Text>
                    {section.drivingLicense}
                  </Text>
                  <Text style={styles.content}>{section.nationality}</Text>
                </View>
              );
            } else if (section.type === "skills") {
              return (
                <View key={sectionIdx} style={styles.section}>
                  <Text style={styles.title}>{section.title}</Text>
                  <View style={styles.divider} />
                  {section.skills.map((skill, skillIdx) => (
                    <Text key={skillIdx} style={styles.content}>
                      {skill.name} ({skill.level})
                    </Text>
                  ))}
                </View>
              );
            }
            return null;
          })}
        </View>

        <View style={styles.mainContent}>
          {summaryHtml && (
            <View style={styles.summary}>
              <Html stylesheet={stylesheet}>{summaryHtml}</Html>
            </View>
          )}

          {data.sections.map((section, sectionIdx) => {
            if (section.type === "educations") {
              return (
                <View key={sectionIdx} style={styles.section}>
                  <Text style={styles.title}>{section.title}</Text>
                  <View style={styles.divider} />
                  {section.educations.map((edu, eduIdx) => (
                    <View key={eduIdx} style={styles.subSection}>
                      <Text style={styles.subSectionTitle}>{edu.school}</Text>
                      <Text style={styles.subSectionDate}>
                        {edu.startDate
                          ? format(edu.startDate, "MMMM yyyy")
                          : "N/A"}{" "}
                        -{" "}
                        {edu.endDate
                          ? format(edu.endDate, "MMMM yyyy")
                          : "Present"}
                      </Text>
                      <Html stylesheet={stylesheet}>{edu.description}</Html>
                    </View>
                  ))}
                </View>
              );
            } else if (section.type === "employmentHistory") {
              return (
                <View key={sectionIdx} style={styles.section}>
                  <Text style={styles.title}>{section.title}</Text>
                  <View style={styles.divider} />
                  {section.employments.map((job, jobIdx) => (
                    <View key={jobIdx} style={styles.subSection}>
                      <Text style={styles.subSectionTitle}>{job.jobTitle}</Text>
                      <Text style={styles.subSectionDate}>
                        {job.startDate
                          ? format(job.startDate, "MMMM yyyy")
                          : "N/A"}{" "}
                        -{" "}
                        {job.endDate
                          ? format(job.endDate, "MMMM yyyy")
                          : "Present"}
                      </Text>
                      <Html stylesheet={stylesheet}>{job.description}</Html>
                    </View>
                  ))}
                </View>
              );
            }
            return null;
          })}
        </View>
      </Page>
    </Document>
  );
}
