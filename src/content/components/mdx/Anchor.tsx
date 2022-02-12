import React from "react";

import { Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";

import isURL from "~/content/helpers/isURL";

interface AnchorProps {
  href: string;
}

/**
 * Links to either external URL or internal link.
 *
 * External link will open in new tab; internal link (determined by {@link isURL} helper function) will use
 * {@link NextLink} to route within page.
 *
 * @example
 * [link to internal course page](example/page)
 *
 * @param {string} href
 * @param children
 */
export const Anchor: React.FC<AnchorProps> = ({ href, children }) => {
  const { courseId } = useRouter().query as any;
  return (
    <NextLink href={isURL(href) ? href : `/course/${courseId}/${href}`} passHref>
      <Link isExternal={isURL(href)} color={"indigo.500"} fontWeight={"medium"}>
        {children}
      </Link>
    </NextLink>
  );
};
