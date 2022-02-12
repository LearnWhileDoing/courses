import React, { useEffect, useLayoutEffect, useRef } from "react";

import {
  Box,
  Button,
  Divider,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { MenuIcon } from "@heroicons/react/solid";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useAsync, useObservable } from "react-use";

import CourseIndex from "~/core/models/CourseIndex";

import { useBreakpointSpy } from "~/ctrl/providers/breakpointSpy";
import UserDataRepository from "~/ctrl/repositories/userData";
import UserDataStore from "~/ctrl/store/userData";
import useUserData from "~/ctrl/store/userData";
import PageProgress from "~/ctrl/util/PageProgress";

const _IndexLink = {
  Container: {
    px: 4,
    alignItems: "stretch",
    w: "full",
    borderRadius: "md",
    overflow: "hidden",
    transition: "background .1s",
  },
  Bubble: {
    h: "8px",
    w: "8px",
    borderRadius: "50%",
    transform: "translate(-3px, -50%)",
    top: "50%",
    left: 0,
    zIndex: 99,
    pos: "absolute",
    ".link:hover &": {
      transition: "background .1s",
      bg: "currentColor",
    },
  },
  Line: {
    h: "full",
    w: "2px",
    transition: "background .1s",
  },
  Text: {
    fontSize: "sm",
    fontWeight: "medium",
    textAlign: "left",
    transition: "color .1s",
  },
};

const PageProgressColors = {
  [PageProgress.READING]: { line: "blue.500", text: "blue.500" },
  [PageProgress.PRACTICING]: { line: "amber.600", text: "amber.600" },
  [PageProgress.COMPLETE]: { line: "green.500", text: "green.600" },
  [PageProgress.SKIPPED]: { line: "teal.500", text: "teal.600" },
  [PageProgress.IGNORED]: { line: "purple.500", text: "yellow.500" },
};

const _IndexDisplay: React.FC<{
  index: CourseIndex;
}> = ({ index }) => {
  const { courseId, chapter: _chapterId, pageId: _pageId } = useRouter().query as any;

  const courseProgress = useUserData(store => store.current[courseId]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    scrollRef.current?.scroll(0, activeRef.current.offsetTop - 100);
  }, [_chapterId, _pageId]);

  return (
    <VStack
      ref={scrollRef}
      divider={<Divider color={"gray.200"} />}
      align={"start"}
      w={"full"}
      h={"full"}
      overflow={"scroll"}
      spacing={0}
    >
      {Object.entries(index).map(([chapterId, chapter], i) => {
        const active = _chapterId === chapterId;
        return (
          <VStack
            ref={active ? activeRef : undefined}
            key={i}
            px={4}
            spacing={2}
            align={"start"}
            w={"full"}
            bg={active && "white"}
            py={6}
          >
            <Text fontWeight={"semibold"} lineHeight={"short"}>
              {chapter.name}
            </Text>
            <Box w={"full"}>
              {Object.entries(chapter.content).map(([pageId, page], j) => {
                const active = `${_chapterId}/${_pageId}` === `${chapterId}/${pageId}`;
                return (
                  <NextLink key={j} href={`/${courseId}/${chapterId}/${pageId}`} passHref>
                    <HStack
                      as={"a"}
                      sx={_IndexLink.Container}
                      _hover={{ bg: "gray.200", color: "gray.700", textDecoration: "none" }}
                      className={"link"}
                    >
                      <Box pos={"relative"} mr={2}>
                        <Box
                          sx={_IndexLink.Bubble}
                          bg={
                            PageProgressColors[courseProgress?.[`${chapterId}.${pageId}`]]?.line ||
                            (active ? "blue.500" : "gray.300")
                          }
                        />
                        {!(j === 0 && j === Object.entries(chapter.content).length - 1) && (
                          <Box
                            sx={_IndexLink.Line}
                            transform={
                              j === 0
                                ? "translateY(1.125rem)"
                                : j === Object.entries(chapter.content).length - 1
                                ? "translateY(-1.125rem)"
                                : ""
                            }
                            bg={
                              PageProgressColors[courseProgress?.[`${chapterId}.${pageId}`]]?.line ||
                              (active ? "blue.500" : "gray.300")
                            }
                          />
                        )}
                      </Box>
                      <Box py={2}>
                        <Text
                          sx={_IndexLink.Text}
                          color={
                            active
                              ? PageProgressColors[courseProgress?.[`${chapterId}.${pageId}`]]?.text || "blue.500"
                              : "gray.600"
                          }
                        >
                          {page.name}
                        </Text>
                      </Box>
                    </HStack>
                  </NextLink>
                );
              })}
            </Box>
          </VStack>
        );
      })}
    </VStack>
  );
};

export const CourseIndexDisplay: React.FC<{
  index: CourseIndex;
}> = ({ index }) => {
  const { chapter, pageId } = useRouter().query as any;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { md: isMD } = useBreakpointSpy();

  useEffect(() => {
    onClose();
  }, [chapter, pageId]);

  return (
    <>
      {isMD && (
        <Box w={80} h={"full"} pt={20} pos={"fixed"} borderRight={"1px solid"} borderColor={"gray.200"} bg={"gray.100"}>
          <_IndexDisplay index={index} />
        </Box>
      )}
      {!isMD && (
        <Box pos={"fixed"} right={6} bottom={6}>
          <Button colorScheme={"gray"} shadow={"md"} onClick={onOpen}>
            <Box w={5}>
              <MenuIcon />
            </Box>
          </Button>
        </Box>
      )}
      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior={"inside"}>
        <ModalOverlay />
        <ModalContent mx={2} overflow={"hidden"} h={"100%"}>
          <ModalCloseButton />
          <ModalBody p={0} overflowX={"hidden"} bg={"gray.100"} h={"100%"}>
            <_IndexDisplay index={index} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
