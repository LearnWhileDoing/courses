import React from "react";

import {
  BanIcon,
  BookOpenIcon,
  ChevronDoubleRightIcon,
  ClipboardCheckIcon,
  PencilAltIcon,
  XIcon,
} from "@heroicons/react/solid";

import PageProgress from "~/ctrl/util/PageProgress";

const PageProgressItems = {
  [PageProgress.NOT_STARTED]: {
    color: "gray.800",
    icon: <BanIcon />,
    text: "Not Started",
  },
  [PageProgress.READING]: {
    color: "blue.500",
    icon: <BookOpenIcon />,
    text: "Reading",
  },
  [PageProgress.PRACTICING]: {
    color: "amber.600",
    icon: <PencilAltIcon />,
    text: "Practicing",
  },
  [PageProgress.COMPLETE]: {
    color: "green.500",
    icon: <ClipboardCheckIcon />,
    text: "Complete",
  },
  [PageProgress.SKIPPED]: {
    color: "teal.500",
    icon: <ChevronDoubleRightIcon />,
    text: "Skipped",
  },
  [PageProgress.IGNORED]: {
    color: "purple.500",
    icon: <XIcon />,
    text: "Ignored",
  },
};

export default PageProgressItems;
