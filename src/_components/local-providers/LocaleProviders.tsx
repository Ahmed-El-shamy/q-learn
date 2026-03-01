"use client";
import { ReactNode } from "react";
import {
  HydrationBoundary,
  QueryClientProvider,
  DehydratedState,
} from "@tanstack/react-query";
import { NextIntlClientProvider } from "next-intl";
import queryClient from "@/_lib/react-qyery";
import { CartProvider } from "@/store/CartProvider";

type Props = {
  children: ReactNode;
  locale: string;
  messages: Record<string, string>;
  dehydratedState?: DehydratedState;
};

export default function LocaleProviders({
  children,
  locale,
  messages,
  dehydratedState,
}: Props) {
  const content = (
    <NextIntlClientProvider
      locale={locale}
      timeZone="UTC"
      messages={messages}
    >
      <CartProvider>{children}</CartProvider>
    </NextIntlClientProvider>
  );

  return (
    <QueryClientProvider client={queryClient}>
      {dehydratedState ? (
        <HydrationBoundary state={dehydratedState}>{content}</HydrationBoundary>
      ) : (
        content
      )}
    </QueryClientProvider>
  );
}
