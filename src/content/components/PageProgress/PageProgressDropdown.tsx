import React from "react";

import { Box, HStack, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { useAsync } from "react-use";

import UserDataRepository from "~/ctrl/repositories/userData";
import ErrorHandlingService from "~/ctrl/services/errorHandling";
import UserDataService from "~/ctrl/services/userData";
import useUserData from "~/ctrl/store/userData";

import PageProgressItems from "./PageProgressItems";

export const PageProgressDropdown = () => {
  const { courseId, chapter, pageId } = useRouter().query as any;

  const { loading: isDBLoading } = useAsync(() => UserDataRepository.I.dbReady, []);

  const courseProgress = useUserData(store => store.current[courseId]);

  let pageProgress = courseProgress?.[`${chapter}.${pageId}`];
  pageProgress = pageProgress == undefined ? 1 : pageProgress;

  useAsync(async () => {
    if (isDBLoading) return;

    if (!courseProgress?.[`${chapter}.${pageId}`]) {
      try {
        await UserDataService.I.updatePage(courseId, `${chapter}.${pageId}`, chapter !== "intro" ? 1 : 3);
      } catch (e) {
        ErrorHandlingService.I.notifyUserOfError(e, "Error updating page progress");
      }
    }
  }, [isDBLoading, courseId, chapter, pageId]);

  return (
    <Menu>
      <MenuButton
        px={4}
        py={2}
        transition="all 0.2s"
        borderRadius="md"
        borderWidth="1px"
        shadow={"sm"}
        _active={{ shadow: "md" }}
      >
        <HStack>
          <Box w={5} color={PageProgressItems[pageProgress].color}>
            {PageProgressItems[pageProgress].icon}
          </Box>
          <Text fontWeight={"medium"}>{PageProgressItems[pageProgress].text}</Text>
          <Box w={5}>
            <ChevronDownIcon />
          </Box>
        </HStack>
      </MenuButton>
      <MenuList minW={0}>
        {Object.entries(PageProgressItems).map(([key, value]) => (
          <MenuItem
            key={key}
            onClick={async () => UserDataService.I.updatePage(courseId, `${chapter}.${pageId}`, parseInt(key))}
          >
            <HStack>
              <Box w={5} color={value.color}>
                {value.icon}
              </Box>
              <Text flexShrink={0}>{value.text}</Text>
            </HStack>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
