import React from "react";

import { VStack } from "@chakra-ui/react";

import { CoursePage } from "~/core/models/CourseIndex";

import { ContentHeader } from "~/content/components/ContentHeader";
import { PageProgressDisplay } from "~/content/components/PageProgress/PageProgressDisplay";
import { inlineCodeStyle } from "~/content/components/mdx";

export const PageContent: React.FC<CoursePage> = ({ name, description, children }) => (
  <>
    <ContentHeader title={name} desc={description} />
    <VStack align={"start"} spacing={5} mb={6} sx={inlineCodeStyle}>
      {children}
    </VStack>
    <PageProgressDisplay />
  </>
);
