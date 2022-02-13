import React from "react";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { AppProps } from "next/app";
import Head from "next/head";
import { Router } from "next/router";
import NProgress from "nprogress";
import "react-medium-image-zoom/dist/styles.css";
import { useEffectOnce } from "react-use";

import "~/core/util/base.css";
import "~/core/util/nprogress.css";
import theme from "~/core/util/theme";

import { BreakpointSpyProvider } from "~/ctrl/providers/breakpointSpy";
import UserDataRepository from "~/ctrl/repositories/userData";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

dayjs.extend(relativeTime);

export default function App(props: AppProps) {
  useEffectOnce(() => {
    UserDataRepository.I.init();
  });

  return (
    <BreakpointSpyProvider>
      <Head>
        <title>LearnWhileDoing</title>

        <meta name={"viewport"} content={"width=device-width, initial-scale=1.0"} />

        <meta name={"apple-mobile-web-app-title"} content={"LWD"} />
        <meta name={"apple-mobile-web-app-capable"} content={"yes"} />
        <link rel="apple-touch-icon" href={"/apple-icon.png"} />

        <link rel={"manifest"} href={"/manifest.json"} />
        <link rel={"icon"} href={"/favicon.png"} />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={"anonymous"} />
        <link
          href="https://fonts.googleapis.com/css2?family=Spline+Sans:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ChakraProvider resetCSS theme={extendTheme(theme)}>
        <props.Component {...props.pageProps} />
      </ChakraProvider>
    </BreakpointSpyProvider>
  );
}
