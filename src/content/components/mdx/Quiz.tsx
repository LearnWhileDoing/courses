import React, { ReactNode, useLayoutEffect, useRef, useState } from "react";

import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Radio,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { BeakerIcon } from "@heroicons/react/solid";
import constate from "constate";
import { useRouter } from "next/router";
import tinycolor from "tinycolor2";

import theme from "~/core/util/theme";

import { useCourseIndex } from "~/ctrl/providers/courseIndex";
import DatabaseService from "~/ctrl/services/database";
import ErrorHandlingService from "~/ctrl/services/errorHandling";
import UserDataService from "~/ctrl/services/userData";
import useCourseData from "~/ctrl/store/courseData";

interface _QuizOption {
  children?: ReactNode;
  isCorrect: boolean;
  i: any;
}

function QuizContext({ title = "", onOpenModal = () => undefined }) {
  const question = useState<string>();
  const [options, setOptions] = useState<_QuizOption[]>([]);
  const addOption = (option: _QuizOption) => {
    if (!options.find(other => other.i === option.i)) setOptions(options => [...options, option]);
  };
  const answer = useState<string>();
  return { question, options, addOption, answer, title, onOpenModal };
}

const [QuizContextProvider, useQuizContext] = constate(QuizContext);

/**
 * @see https://www.notion.so/learnwhiledoing/Edit-create-a-page-cd2bdc0554eb4f47a0c74fe672e097a0#935a59bc24464968aeaff0bf59e03d4e
 *
 * @param children
 */
export const Quiz: React.FC = ({ children }) => {
  const { chapter, pageId } = useRouter().query as any,
    index = useCourseIndex();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <QuizContextProvider title={index[chapter].content[pageId].name} onOpenModal={onOpen}>
      <_QuizPreview />
      {children}
      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior={"outside"}>
        <ModalOverlay />
        <ModalContent mx={2} maxW={"2xl"} overflow={"hidden"}>
          <ModalHeader>Quiz — {index[chapter].content[pageId].name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody p={6} overflowX={"hidden"}>
            <_QuizModalBody />
          </ModalBody>
        </ModalContent>
      </Modal>
    </QuizContextProvider>
  );
};

const _QuizPreview = () => {
  const { title, question, onOpenModal } = useQuizContext();

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
                Quiz — {title}
              </Text>
              <Text fontWeight={"medium"} color={"gray.700"} lineHeight={"shorter"}>
                {question[0]}
              </Text>
            </VStack>
            <Box>
              <Box w={10} p={2} bg={"gray.50"} borderRadius={"50%"} shadow={"xs"} color={color}>
                <BeakerIcon />
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
          Comprehension quiz — test your knowledge on what you just read!
        </Text>
      </Box>
    </>
  );
};

export const QuizQuestion = ({ children = "" }) => {
  const quizContext = useQuizContext();
  quizContext.question[1](children);
  return <></>;
};

export const QuizOption: React.FC<{ isCorrect: boolean; i: any }> = option => {
  const quizContext = useQuizContext();
  quizContext.addOption(option);
  return <></>;
};

export const QuizAnswer = ({ children = "" }) => {
  const quizContext = useQuizContext();
  quizContext.answer[1](children);
  return <></>;
};

export const _QuizModalBody = () => {
  const { courseId, chapter, pageId } = useRouter().query as any;
  const { question, options, answer } = useQuizContext();

  const [correct, setCorrect] = useState<string>(undefined);
  const [selected, setSelected] = useState<string>(undefined);
  const [submitted, setSubmitted] = useState(false);

  const answerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    answerRef.current?.scrollIntoView();
  }, [submitted]);

  async function submitAnswer() {
    if (selected !== undefined) {
      setSubmitted(true);
      try {
        await UserDataService.I.completeQuiz(courseId, `${chapter}.${pageId}`, selected === correct);
      } catch (e) {
        ErrorHandlingService.I.notifyUserOfError(e, "Error submitting quiz");
      }
    }
  }

  return (
    <Box>
      <Heading>{question[0]}</Heading>
      <VStack w={"full"} mt={4} spacing={6}>
        <VStack w={"full"} spacing={2}>
          {options.map(option => {
            option.isCorrect && !correct && setCorrect(option.i);
            return (
              <_QuizModalOption
                key={option.i}
                onClick={() => !submitted && setSelected(option.i)}
                isSelected={selected === option.i}
                isCorrect={submitted ? option.isCorrect || false : undefined}
              >
                {option.children}
              </_QuizModalOption>
            );
          })}
        </VStack>
        <Button colorScheme={"green"} disabled={selected === undefined || submitted} onClick={submitAnswer} w={"full"}>
          Check answer
        </Button>
        {submitted && <Text ref={answerRef}>{answer[0]}</Text>}
      </VStack>
    </Box>
  );
};

const _QuizModalOption: React.FC<{
  onClick: () => void;
  isSelected: boolean;
  isCorrect: boolean;
}> = ({ onClick, isSelected, isCorrect, children }) => (
  <Flex
    onClick={onClick}
    cursor={"pointer"}
    px={4}
    py={3}
    align={"start"}
    borderRadius={"md"}
    w={"full"}
    overflow={"hidden"}
    bg={
      isCorrect === undefined
        ? isSelected
          ? tinycolor(theme.colors.indigo["400"]).setAlpha(0.4).toString()
          : "white"
        : isCorrect
        ? tinycolor(theme.colors.green["400"]).setAlpha(0.4).toString()
        : tinycolor(theme.colors.red["400"]).setAlpha(0.4).toString()
    }
    transition={"background .1s"}
  >
    <Radio isChecked={isSelected} colorScheme={"indigo"} mt={1} mr={4} />
    <Box flex={1} overflow={"hidden"}>
      {children}
    </Box>
  </Flex>
);
