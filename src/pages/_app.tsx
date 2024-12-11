import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { MainLayout } from "@/layouts/MainLayout";
import { AppKit } from "@/utils/connection"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 3,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppKit>
    <QueryClientProvider client={queryClient}>
      <MainLayout>
      <Component {...pageProps} />
      </MainLayout>
    </QueryClientProvider>
    </AppKit>
  );
}
