import React, { useRef } from "react";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import UserDataService from "~/ctrl/services/userData";

interface CompletedCourseDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CompletedCourseDialog: React.FC<CompletedCourseDialogProps> = ({ isOpen, onClose }) => {
  const router = useRouter(),
    { courseId } = router.query as any;
  const cancelRef = useRef();

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Complete course
          </AlertDialogHeader>

          <AlertDialogBody>
            <VStack align={"start"}>
              <Text>Congratulations! You have completed every page in this course! 🥳</Text>
              <Text>
                <b>Would you like to mark this course as completed?</b>
              </Text>
            </VStack>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Return to page
            </Button>
            <Button
              colorScheme={"indigo"}
              onClick={async () => {
                await UserDataService.completeCourse(courseId);
                await router.push("/");
              }}
              ml={3}
            >
              Complete course
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
