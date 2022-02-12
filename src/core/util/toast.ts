import { createStandaloneToast, extendTheme } from "@chakra-ui/react";

import theme from "~/core/util/theme";

const toast = createStandaloneToast({
  theme: extendTheme(theme),
  colorMode: "light",
  defaultOptions: { position: "bottom-right", variant: "solid" },
});

export default toast;
