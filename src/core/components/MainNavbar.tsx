import React from "react";

import { Box, Flex, HStack, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { useWindowScroll, useWindowSize } from "react-use";
import tinycolor from "tinycolor2";

import { Logo } from "~/core/components/Logo";
import { MainAppbarLink } from "~/core/components/MainAppbarLink";
import theme from "~/core/util/theme";

const navbarGradient = `linear-gradient(90deg, ${tinycolor("#1E40AD").setAlpha(0.9).toString()} 0%, ${tinycolor(
  "#4255BD"
)
  .setAlpha(0.9)
  .toString()} 100%)`;

export const MainNavbar: React.FC<{ elevatedAt?: number }> = ({ elevatedAt }) => {
  const scroll = useWindowScroll();
  const { width } = useWindowSize();

  const elevated = elevatedAt ? scroll.y >= elevatedAt : true;

  return (
    <Flex
      as={"nav"}
      pos={"fixed"}
      top={0}
      left={0}
      zIndex={9}
      w={"100%"}
      h={20}
      justify={"center"}
      shadow={elevated ? "lg" : "unset"}
      bg={navbarGradient}
      sx={{ backdropFilter: "blur(10px)" }}
    >
      <Flex
        h={"100%"}
        overflow={"overlay"}
        sx={{
          "&::-webkit-scrollbar": { height: "6px" },
          "&::-webkit-scrollbar-thumb": { background: tinycolor(theme.colors.gray["50"]).setAlpha(0.7).toString() },
          "&::-webkit-scrollbar-track": { background: tinycolor(theme.colors.gray["50"]).setAlpha(0.2).toString() },
        }}
      >
        <HStack w={"7xl"} h={"100%"} justify={"space-between"} px={8}>
          <Menu>
            <MenuButton as={Box} cursor={"pointer"}>
              <HStack pr={8} color={"white"}>
                <Box w={8} h={8}>
                  {Logo}
                </Box>
                <Text fontSize={"2xl"} fontWeight={"bold"}>
                  {width >= 768 ? "LearnWhileDoing" : "LWD"}
                </Text>
              </HStack>
            </MenuButton>
            <MenuList>
              <NextLink href={"/"} passHref>
                <MenuItem as={"a"}>Dashboard</MenuItem>
              </NextLink>
              <a href={"https://learnwhiledoing.org"} target={"_blank"}>
                <MenuItem>LWD Homepage</MenuItem>
              </a>
            </MenuList>
          </Menu>
          <HStack>
            <MainAppbarLink path={"/"} title={"DASHBOARD"} />
            <MainAppbarLink path={"/certificates"} title={"CERTIFICATES"} />
            <MainAppbarLink path={"/completed-courses"} title={"COMPLETED COURSES"} />
          </HStack>
        </HStack>
      </Flex>
    </Flex>
  );
};
