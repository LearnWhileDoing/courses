import React from "react";

import { Box, Flex, Img, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Zoom from "react-medium-image-zoom";

import APIService from "~/ctrl/services/api";

interface ImageProps {
  src: string;
  alt: string;
}

/**
 * Renders a local image via the given src. Fetches media from the _media folder of the course content.
 *
 * @example
 * ![image](image.png)
 *
 * @param {string} src
 * @param {string} alt
 */
export const Image: React.FC<ImageProps> = ({ src, alt }) => {
  const { courseId } = useRouter().query as any;

  return (
    <Flex justify={"center"} w={"full"}>
      <Zoom wrapStyle={{ outline: "none !important" }} zoomMargin={50}>
        <VStack>
          <Box borderRadius={"md"} overflow={"hidden"}>
            <Img src={`${APIService.GITHUB_CONTENT_URL}${courseId}/_media/${src}`} w={"xl"} />
          </Box>
          <Text fontStyle={"italic"} color={"gray.600"}>
            {alt}
          </Text>
        </VStack>
      </Zoom>
    </Flex>
  );
};
