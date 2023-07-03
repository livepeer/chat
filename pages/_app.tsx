import "@/styles/globals.css";
import "@/styles/satoshi.css";
import "@livekit/components-styles";
import "@livekit/components-styles/prefabs";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from "@livepeer/react";

const client = createReactClient({
  provider: studioProvider({
    apiKey: process.env.NEXT_PUBLIC_LP_AUTH as string,
  }),
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <LivepeerConfig client={client}>
        <Toaster />
        <Component {...pageProps} />
      </LivepeerConfig>
    </ThemeProvider>
  );
}
