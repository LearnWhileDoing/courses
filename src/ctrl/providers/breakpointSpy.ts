import { useState } from "react";

import constate from "constate";
import { useEffectOnce } from "react-use";

import { mapOf } from "~/core/util/expressions/mapOf";
import theme from "~/core/util/theme";

const [BreakpointSpyProvider, useBreakpointSpy] = constate(() => {
  const [results, setResults] = useState(
    mapOf(...Object.entries(theme.breakpoints).map(bkp => [bkp[0], false] as [keyof typeof theme.breakpoints, boolean]))
  );

  useEffectOnce(() => {
    let mounted = true;

    const mediaQueries = Object.entries(theme.breakpoints).map(
      val => [val[0], window.matchMedia(`(min-width: ${val[1]})`)] as [string, MediaQueryList]
    );
    const onChange = () => {
      if (mounted) setResults(mapOf(...mediaQueries.map(query => [query[0], !!query[1].matches] as [string, boolean])));
    };

    mediaQueries.map(query => query[1].addEventListener("change", onChange));
    onChange();

    return () => {
      mounted = false;
      mediaQueries.map(query => query[1].removeEventListener("change", onChange));
    };
  });

  return results;
});

export { BreakpointSpyProvider, useBreakpointSpy };
