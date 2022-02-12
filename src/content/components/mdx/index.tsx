import React from "react";

import { Box, Divider, Heading, Text, VStack } from "@chakra-ui/react";

import { Anchor } from "./Anchor";
import { Bookmark } from "./Bookmark";
import { Callout } from "./Callout";
import { Challenge, ChallengeAnswer, ChallengeDescription } from "./Challenge";
import { Image } from "./Image";
import { Quiz, QuizAnswer, QuizOption, QuizQuestion } from "./Quiz";
import { Video } from "./Video";
import { Blockquote } from "~/content/components/mdx/Blockquote";
import { CodeBlock } from "~/content/components/mdx/CodeBlock";

export const inlineCodeStyle = {
  "& code:not(pre > code)": { color: "gray.800", bg: "gray.50", px: 1, borderRadius: "md", shadow: "xs" },
};

const mdxComponents: Record<string, React.ReactNode> = {
  p: props => <Text w={"full"} {...props} />,
  h1: props => (
    <Heading as={"h2"} fontSize={"3xl"} color={"gray.800"} w={"full"} pt={5}>
      {props.children}
    </Heading>
  ),
  h2: props => (
    <Heading as={"h3"} fontSize={"2xl"} color={"gray.800"} w={"full"} pt={4}>
      {props.children}
    </Heading>
  ),
  h3: props => (
    <Heading as={"h4"} fontSize={"xl"} color={"gray.800"} w={"full"} pt={3}>
      {props.children}
    </Heading>
  ),
  ul: props => (
    <Box w={"full"}>
      <VStack
        as={"ul"}
        spacing={2}
        pl={8}
        align={"start"}
        w={"full"}
        sx={{
          listStyle: "none",
          "li::before": {
            content: `"•"`,
            fontFamily: "mono",
            color: "indigo.500",
            fontWeight: "black",
            position: "absolute",
            transform: "translateX(-100%) translateX(-6px)",
          },
        }}
      >
        {props.children}
      </VStack>
    </Box>
  ),
  ol: props => (
    <Box w={"full"}>
      <VStack
        as={"ol"}
        spacing={2}
        pl={8}
        align={"start"}
        w={"full"}
        sx={{
          counterReset: "number",
          listStyle: "none",
          "& li": { counterIncrement: "number" },
          "& li:before": {
            content: `counters(number,".") "."`,
            fontFamily: "mono",
            color: "indigo.500",
            fontWeight: "medium",
            position: "absolute",
            transform: "translateX(-100%) translateX(-4px)",
          },
        }}
      >
        {props.children}
      </VStack>
    </Box>
  ),
  li: props => (
    <Box as={"li"} w={"full"} sx={{ "& > code": inlineCodeStyle }}>
      {props.children}
    </Box>
  ),
  hr: () => (
    <Box py={5} w={"full"}>
      <Divider />
    </Box>
  ),
  blockquote: Blockquote,
  pre: CodeBlock,
  a: Anchor,
  img: Image,
  Callout,
  Bookmark,
  Video,
  Quiz,
  QuizQuestion,
  QuizOption,
  QuizAnswer,
  Challenge,
  ChallengeDescription,
  ChallengeAnswer,
};

export default mdxComponents;
