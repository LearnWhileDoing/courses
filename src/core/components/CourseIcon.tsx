import React from "react";

import { Img } from "@chakra-ui/react";

import APIService from "~/ctrl/services/api";

interface CourseIconProps {
  courseId: string;
  size: number;
}

export const CourseIcon: React.FC<CourseIconProps> = ({ courseId, size }) => (
  <Img h={size} w={size} src={`${APIService.GITHUB_CONTENT_URL}${courseId}/THUMBNAIL.png`} />
);
