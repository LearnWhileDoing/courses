import React, { useLayoutEffect, useRef, useState } from "react";

import {
  Box,
  Button,
  Divider,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { AnnotationIcon } from "@heroicons/react/solid";
import constate from "constate";
import { useRouter } from "next/router";

import { useCourseIndex } from "~/ctrl/providers/courseIndex";
import DatabaseService from "~/ctrl/services/database";
import ErrorHandlingService from "~/ctrl/services/errorHandling";
import UserDataService from "~/ctrl/services/userData";
import useCourseData from "~/ctrl/store/courseData";

import { inlineCodeStyle } from "~/content/components/mdx/index";

function ChallengeContext({ title = "", onOpenModal = () => undefined }) {
  const description = useState<React.ReactNode>();
  const answer = useState<React.ReactNode>();
  return { description, answer, title, onOpenModal };
}

const [ChallengeContextProvider, useChallengeContext] = constate(ChallengeContext);

/**
 * @see https://www.notion.so/learnwhiledoing/Edit-create-a-page-cd2bdc0554eb4f47a0c74fe672e097a0#73293fc6a0c041b2b232d5e5519e8b48
 *
 * @param children
 */
export const Challenge: React.FC = ({ children }) => {
  const { chapter, pageId } = useRouter().query as any,
    index = useCourseIndex();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <ChallengeContextProvider title={index[chapter].content[pageId].name} onOpenModal={onOpen}>
      <_ChallengePreview />
      {children}
      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior={"outside"}>
        <ModalOverlay />
        <ModalContent mx={2} maxW={"2xl"} overflow={"hidden"}>
          <ModalHeader>Challenge — {index[chapter].content[pageId].name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pt={4} pb={6} px={6} overflowX={"hidden"}>
            <_ChallengeModalBody />
          </ModalBody>
        </ModalContent>
      </Modal>
    </ChallengeContextProvider>
  );
};

const _ChallengePreview = () => {
  const { title, onOpenModal } = useChallengeContext();

  const color = useCourseData(store => store?.color) + ".600";

  return (
    <>
      <Box w={"full"}>
        <Divider my={6} color={"gray.200"} />
      </Box>
      <Box
        as={"button"}
        onClick={onOpenModal}
        shadow={"sm"}
        borderWidth={1}
        borderColor={color}
        borderRadius={"md"}
        textAlign={"left"}
        w={"full"}
        overflow={"hidden"}
        cursor={"pointer"}
        bg={"white"}
        _hover={{ bg: "gray.50" }}
      >
        <Box borderTopWidth={"var(--chakra-radii-md)"} borderColor={color} w={"full"} px={6} py={3}>
          <HStack justify={"space-between"} spacing={3}>
            <VStack my={1}>
              <Text fontSize={"xl"} fontWeight={"medium"} color={"black"} lineHeight={"shorter"}>
                Challenge — {title}
              </Text>
            </VStack>
            <Box>
              <Box w={10} p={2} bg={"gray.50"} borderRadius={"50%"} shadow={"xs"} color={color}>
                <AnnotationIcon />
              </Box>
            </Box>
          </HStack>
        </Box>
        <Text
          borderTopWidth={1}
          borderColor={"gray.100"}
          px={6}
          py={3}
          fontSize={"xs"}
          color={"gray.500"}
          fontStyle={"italic"}
        >
          Lesson challenge — put in to use what you just learned!
        </Text>
      </Box>
    </>
  );
};

export const ChallengeDescription: React.FC = ({ children }) => {
  const { description } = useChallengeContext();
  description[1](children);
  return <></>;
};

export const ChallengeAnswer: React.FC = ({ children }) => {
  const { answer } = useChallengeContext();
  answer[1](children);
  return <></>;
};

export const _ChallengeModalBody = () => {
  const { courseId, chapter, pageId } = useRouter().query as any;
  const { description, answer } = useChallengeContext();

  const [submitted, setSubmitted] = useState(false);

  const answerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    answerRef.current?.scrollIntoView();
  }, [submitted]);

  async function submitAnswer() {
    setSubmitted(true);
    try {
      await UserDataService.I.completeChallenge(courseId, `${chapter}.${pageId}`);
    } catch (e) {
      ErrorHandlingService.I.notifyUserOfError(e, "Error submitting challenge");
    }
  }

  return (
    <Box>
      <VStack w={"full"} align={"start"}>
        <Box pb={2} sx={inlineCodeStyle}>
          {description}
        </Box>
        <Button colorScheme={"green"} onClick={submitAnswer} w={"full"}>
          Check answer
        </Button>
        {submitted && (
          <Box ref={answerRef} pt={4} w={"full"}>
            {answer[0]}
          </Box>
        )}
      </VStack>
    </Box>
  );
};
