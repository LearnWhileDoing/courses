import React from "react";

import { Box, ResponsiveValue, SimpleGrid, Text } from "@chakra-ui/react";
import { ArrowNarrowLeftIcon, ArrowNarrowRightIcon } from "@heroicons/react/solid";
import * as CSS from "csstype";

const PaginationLink: React.FC<{
  color: string;
  textAlign: ResponsiveValue<CSS.Property.TextAlign>;
  label: string;
  onClick: () => void;
}> = ({ color, textAlign, label, onClick, children }) => (
  <Box
    as={"button"}
    textAlign={textAlign}
    flex={"1"}
    borderRadius={"md"}
    borderWidth={"1px"}
    borderColor={"gray.100"}
    p={2}
    _hover={{ textDecor: "none", borderColor: color, boxShadow: "sm" }}
    transition={"all .1s"}
    onClick={onClick}
  >
    <Box>
      <Text fontSize={"sm"} px={"2"}>
        {label}
      </Text>
      <Box px={"2"} fontSize={"lg"} fontWeight={"bold"} color={color} display={"flex"}>
        {children}
      </Box>
    </Box>
  </Box>
);

interface PaginationProps {
  prev: { slug: string; title: string };
  next: { slug: string; title: string };
  color: string;
  onNavigate: (string) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ prev, next, color, onNavigate }) => (
  <Box>
    <SimpleGrid gridTemplateColumns={{ base: "1fr", lg: "1fr 1fr" }} gridGap={4}>
      {prev ? (
        <PaginationLink color={color} textAlign={"right"} label={"Previous"} onClick={() => onNavigate(prev.slug)}>
          <Box w={6}>
            <ArrowNarrowLeftIcon />
          </Box>
          <div style={{ flex: "1" }} />
          <span>{prev.title}</span>
        </PaginationLink>
      ) : (
        <div />
      )}
      {next ? (
        <PaginationLink color={color} textAlign={"left"} label={"Next"} onClick={() => onNavigate(next.slug)}>
          <span>{next.title}</span>
          <div style={{ flex: "1" }} />
          <Box w={6}>
            <ArrowNarrowRightIcon />
          </Box>
        </PaginationLink>
      ) : (
        <div />
      )}
    </SimpleGrid>
  </Box>
);
