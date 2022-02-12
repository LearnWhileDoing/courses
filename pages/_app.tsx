import React, { useState } from "react";

import { ChakraProvider, extendTheme, useColorMode, useColorModePreference } from "@chakra-ui/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { motion } from "framer-motion";
import { AppProps } from "next/app";
import Head from "next/head";
import { Router } from "next/router";
import NProgress from "nprogress";
import "react-medium-image-zoom/dist/styles.css";
import { useAsync, useEffectOnce } from "react-use";
import { firstValueFrom } from "rxjs";
import { filter } from "rxjs/operators";

import { LoadingView } from "~/core/components/LoadingView";
import "~/core/util/base.css";
import "~/core/util/nprogress.css";
import theme from "~/core/util/theme";

import { BreakpointSpyProvider } from "~/ctrl/providers/breakpointSpy";
import UserDataRepository from "~/ctrl/repositories/userData";
import AuthService from "~/ctrl/services/auth";
import DatabaseService from "~/ctrl/services/database";
import UserDataService from "~/ctrl/services/userData";
import FirebaseStore from "~/ctrl/store/firebase";
import UserStore from "~/ctrl/store/user";

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
      </Head>
      <ChakraProvider resetCSS theme={extendTheme(theme)}>
        <props.Component {...props.pageProps} />
      </ChakraProvider>
    </BreakpointSpyProvider>
  );
}
