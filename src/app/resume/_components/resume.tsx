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

Font.register({
  family: "Inter",
  fonts: [
    {
      src: "http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.ttf",
      fontWeight: 100,
    },
    {
      src: "http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyfMZhrib2Bg-4.ttf",
      fontWeight: 200,
    },
    {
      src: "http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuOKfMZhrib2Bg-4.ttf",
      fontWeight: 300,
    },
    {
      src: "http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf",
      fontWeight: 400,
    },
    {
      src: "http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fMZhrib2Bg-4.ttf",
      fontWeight: 500,
    },
    {
      src: "http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZhrib2Bg-4.ttf",
      fontWeight: 600,
    },
    {
      src: "http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYMZhrib2Bg-4.ttf",
      fontWeight: 700,
    },
    {
      src: "http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyYMZhrib2Bg-4.ttf",
      fontWeight: 800,
    },
    {
      src: "http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuBWYMZhrib2Bg-4.ttf",
      fontWeight: 900,
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    padding: 30,
    fontFamily: "Inter",
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
    margin: 10,
    padding: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: "semibold",
  },
  content: {
    fontSize: 10,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginVertical: 5,
  },
  summary: {
    fontSize: 12,
    margin: 10,
    padding: 10,
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
    fontWeight: "semibold",
  },
  em: {
    fontStyle: "italic",
  },
};

type ResumeProps = {
  data: Schema;
};

export default function Resume(props: ResumeProps) {
  const { data } = props;

  let summaryHtml = "";

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.sidebar}>
          {data.sections.map((section, sectionIdx) => {
            if (section.type === "personalDetails") {
              summaryHtml = section.summary;
              return (
                <View key={sectionIdx} style={styles.section}>
                  <Text style={styles.content}>
                    {section.firstName} {section.lastName}
                  </Text>
                  <Text style={styles.content}>{section.email}</Text>
                  <Text style={styles.content}>{section.phone}</Text>
                  <Text style={styles.content}>
                    {section.country}, {section.city}
                  </Text>
                  <Text style={styles.content}>{section.address}</Text>
                  <Text style={styles.content}>{section.postalCode}</Text>
                  <Text style={styles.content}>{section.drivingLicense}</Text>
                  <Text style={styles.content}>{section.nationality}</Text>
                  <Text style={styles.content}>{section.placeOfBirth}</Text>
                  <Text style={styles.content}>{section.dateOfBirth}</Text>
                  <Text style={styles.content}>{section.wantedJobTitle}</Text>
                </View>
              );
            }
            return null;
          })}
        </View>
        <View style={styles.mainContent}>
          <Html stylesheet={stylesheet}>{summaryHtml}</Html>
          {data.sections.map((section, sectionIdx) => {
            if (section.type !== "personalDetails") {
              return (
                <View key={sectionIdx} style={styles.section}>
                  <Text style={styles.title}>{section.title}</Text>
                  <View style={styles.divider} />
                  {section.type === "skills" &&
                    section.skills.map((skill, skillIdx) => (
                      <Text key={skillIdx} style={styles.content}>
                        {skill.name} ({skill.level})
                      </Text>
                    ))}
                  {section.type === "educations" &&
                    section.educations.map((edu, eduIdx) => (
                      <Html stylesheet={stylesheet} key={eduIdx}>
                        {edu.description}
                      </Html>
                    ))}
                  {section.type === "employmentHistory" &&
                    section.employments.map((job, jobIdx) => (
                      <Html stylesheet={stylesheet} key={jobIdx}>
                        {job.description}
                      </Html>
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
