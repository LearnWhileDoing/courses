import React from "react";

import { Box } from "@chakra-ui/react";

export const Blockquote: React.FC = ({ children }) => (
  <Box borderLeftWidth={"6px"} borderColor={"gray.200"} pl={4} py={2} fontWeight={"medium"}>
    {children}
  </Box>
);
