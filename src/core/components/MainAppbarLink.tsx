import React from "react";
import { useRouter } from "next/router";
import { Button } from "@chakra-ui/react";
import Link from "next/link";

export const MainAppbarLink: React.FC<{
  path: string;
  title: string;
}> = ({ path, title }) => {
  const { pathname } = useRouter();

  return (
    <Link href={path} passHref>
      <Button as={"a"} isActive={pathname === path} colorScheme={"indigo"}>
        {title}
      </Button>
    </Link>
  );
};
