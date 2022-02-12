import React from "react";

import { Box } from "@chakra-ui/react";
import tinycolor from "tinycolor2";

import theme from "~/core/util/theme";

/**
 * Renders a block of code using Prism.js
 *
 * @example
 * <CodeBlock value="var hello = 'howdy';" language="javascript" />
 * @example
 * ```javascript
 * var hello = 'howdy';
 * ```
 *
 * @param children
 */
export const CodeBlock: React.FC = ({ children }) => {
  return (
    <Box
      as={"pre"}
      bg={"gray.50"}
      w={"full"}
      p={6}
      shadow={"xs"}
      borderRadius={"md"}
      overflow={"overlay"}
      sx={{
        // scrollbar
        "&::-webkit-scrollbar": { height: "6px" },
        "&::-webkit-scrollbar-thumb": { background: tinycolor(theme.colors.gray["50"]).setAlpha(0.7).toString() },
        "&::-webkit-scrollbar-track": { background: tinycolor(theme.colors.gray["50"]).setAlpha(0.2).toString() },
        // line numbers
        code: {
          counterReset: "step",
          counterIncrement: "step 0",
          ".line::before": {
            content: "counter(step)",
            counterIncrement: "step",
            width: "1rem",
            marginRight: "1.5rem",
            display: "inline-block",
            textAlign: "right",
            color: theme.colors.gray["300"],
          },
        },
      }}
    >
      {children}
    </Box>
  );
};
